<script>
    import kjeks from "$lib/bilder/kjeks.png";
    import {items} from "$lib/meny";
    import * as localstorageAPI from "$lib/localstorageAPI";
    import Lootbox from "$lib/modules/lootbox.svelte" 
    import * as gambling from "$lib/gambling";
    import {sleep} from "$lib/index";
    import Resize from "$lib/modules/resize.svelte"
    import Luckybox from "$lib/modules/luckybox.svelte";
    import Slots from "$lib/modules/slots.svelte";

    let settings = false;

    /**
     * Disable denne før production.
     */
    let debug = true;
    let debugPoeng = 0; 

    let antallFysiskeKlikk = 0;
    let antallCookiesTotalt = 0;
    let poeng = 0;
    let antallAutoOppgradering = 1;
    let kjøpteLootbox = 0;
    /**
     * @type {Object}
     */
    let aktivItems = {};
    /**
     * Viser errorfunds melding. Bruk errorFunds funksjon eller lag en lignende.
     */
    let error = false;
    let timeForAutosave = 1000;
    async function resetVars() {
        console.log(1)
        antallFysiskeKlikk = 0;
        antallCookiesTotalt = 0;
        poeng = 0;
        antallAutoOppgradering = 1;
        kjøpteLootbox = 0;
        timeForAutosave = 100000;
        aktivItems = {};
        await sleep(3600);
        timeForAutosave = 1000;
    }

    //få lagrede data først - hvis ikke default
    async function getSave() {
        let data = await localstorageAPI.getData();
        if (!data)
            return;
        // @ts-ignore bc fuck readability 
        antallCookiesTotalt = data.AntallCookiesTotalt; poeng = data.Poeng; antallAutoOppgradering = data.CookiesPerSekund;aktivItems = data.ActiveItems; kjøpteLootbox = data.KjøpteLootbox;
    }
    getSave();
    
    //Trykke for på kjeksen for å få kjeks og få kjeks automatisk. Bestemmer antallet kjeks man får for hvert sekund 
    function faaPoeng(){
        poeng += antallAutoOppgradering
        antallCookiesTotalt += antallAutoOppgradering;

        if (poeng > antallCookiesTotalt) { //gambling hotfix
            let diff = poeng - antallCookiesTotalt;
            antallCookiesTotalt += diff;
        }
    }

    const autoSave = setInterval(async () => {
        //finn alle dataene 
        let datastruct = new localstorageAPI.CookieDataStruct(poeng, antallCookiesTotalt, antallAutoOppgradering, aktivItems, kjøpteLootbox);
        await localstorageAPI.writeData({...datastruct})
        console.log("saved")
    }, timeForAutosave);

    //Automatisk få kjeks hvert sekund
    setInterval(function(){ 
        faaPoeng(); 
    }, 1000);
    /**
     * Oppgraderer basert etter pris og bestemmer hvor mye cookiespersekund øker med
     * @param {number} pris
     * @param {number} addition
     * @param {string} navn
     * @param {number} multiplier 
     */
    function upgrade(pris, addition, navn, multiplier) {
        if (aktivItems[navn])
            pris = pris * aktivItems[navn] * multiplier;
        console.log(pris, aktivItems[navn])
        if (pris > poeng)
            return errorFunds();

        antallAutoOppgradering += addition;
        poeng -= pris;
        if (aktivItems[navn]) 
            aktivItems[navn] = aktivItems[navn] + 1;
        else
            aktivItems[navn] = 1;
    }
    let lootboxVis = false;
    /**
     * @type {string}
     */
    let winner;
    const lootboxCB = async () => {
        poeng = await gambling.lootBoxResults(winner, poeng);
    }

    function kjøpLootbox(pris = (poeng/100)*10) {
        if (typeof(pris) != "number") 
            throw "pris trenger å bli gitt i svelte for en eller annen grunn. Dev feil fra deg, ikke meg";

        if (poeng < pris) 
            return errorFunds();

        kjøpteLootbox += 1;
        poeng -= pris;
        console.log(poeng, pris);
        lootboxVis = true;
    } 

    async function errorFunds() {
        error = true;
        await sleep(500);
        error = false;
    }

    let luckyboxVis = false;
    let luckyboxPoeng = undefined;
    let visLuckyboxSpillIgjen = false;
    function kjøpLuckybox() {
        visLuckyboxSpillIgjen = false;
        let pris = 2000//(poeng / 100) * 10;
        if (poeng < pris)
            return errorFunds();

        poeng -= pris;
        luckyboxPoeng = undefined;
        luckyboxVis = true;
    }
    async function luckyboxCallback() {
        console.log(1);
        await sleep(2000);
        visLuckyboxSpillIgjen = true;
        //luckyboxVis = false;
        //endre poeng 
        console.log(luckyboxPoeng);
        poeng += luckyboxPoeng;
        //Sigma fix 
        kjøpteLootbox += 1
        //luckyboxPoeng = undefined;
    }

    let visSlots = false;
    let slotsPris = 1000;
    let visSlotsSpillIgjenKnapp = false;
    /**
     * @type {number|undefined}
     */
    let vinnerSlots = undefined;
    function slotsKjøp() {
        visSlots = false;
        if (slotsPris > poeng)
            return errorFunds()

        poeng -= slotsPris
        vinnerSlots = undefined;
        visSlots = true;

    }
    
    async function slotsCB() {
        await sleep(2000);
        poeng += vinnerSlots
        visSlotsSpillIgjenKnapp = true;

    }

</script>
    <Resize width={830} />
    {#if settings}
        <div class="settings">
            <button on:click={() => debug = debug ? false : true}>Toggle debug mode</button>
            <button on:click={() => settings = settings ? false : true}>Lukk instillinger</button>
            <button on:click={() => {resetVars(); localstorageAPI.resetLagring()}}>Reset lagring</button>
        </div>
    {/if}

    {#if debug}
        Set poeng: <input type="number" bind:value={debugPoeng}> <button on:click={() => poeng = debugPoeng}>Set poeng</button>
    {/if}
    {#if error} 
        <p>Ikke nok cookies! Du er fattig</p>
    {/if}
    <div class="minigames">
        {#if lootboxVis}
            <Lootbox items={gambling.lootboxOptions} bind:winner={winner} callback={lootboxCB}/>
            {#if winner}
            <button class="gamblingknapp" on:click={() => {lootboxVis = false; winner = undefined;}}>Lukk lootbox</button>
            <button id="spilligjen" class="gamblingknapp" on:click={async () => {lootboxVis = false; winner = undefined; await sleep(500); kjøpLootbox();}}>Spill igjen!</button>
            {/if}
        {:else if luckyboxVis}
            <Luckybox callback={luckyboxCallback} bind:kjeks={luckyboxPoeng}/>
            {#if visLuckyboxSpillIgjen}
                <div class="bro" style="position: absolute">
                    <button class="gamblingknapp" on:click={() => {luckyboxVis = false; luckyboxPoeng = undefined;}}>Lukk Luckybox</button>
                    <button id="spilligjen" class="gamblingknapp" on:click={async () => {luckyboxVis = false; luckyboxPoeng = undefined; await sleep(500); kjøpLuckybox();}}>Spill igjen</button>
                </div>
            {/if}
        {:else if visSlots}
                <Slots bind:vinner={vinnerSlots} callback={slotsCB}/>
                {#if visSlotsSpillIgjenKnapp}
                    <div class="bro">
                        <button class="gamblingknapp" on:click={() => {visSlots = false; vinnerSlots = undefined;}}>Lukk Slots</button>
                        <button id="spilligjen" class="gamblingknapp" on:click={async () => {visSlots = false; vinnerSlots = undefined; await sleep(500); slotsKjøp();}}>Spill igjen</button>
                    
                    </div>
                {/if}
        {/if}
    </div>

    <div class="master">
        {#key antallFysiskeKlikk} <!-- animasjon ting -->
        <div class="kjeks"><h1 on:click={() => {faaPoeng(); antallFysiskeKlikk = antallFysiskeKlikk + 1;}}><img src="{kjeks}" alt=""></h1></div>
    
        {/key}

        <div class="stats grid">
        {#if poeng < 0}
            <h1 style="color: brown;">Fattig</h1>
        {/if}
            <h1>Kjeks Klikker</h1>
            <button on:click={() => settings = settings ? false : true}>Instillinger</button>
            <p>Cookes per sekund {Math.floor(antallAutoOppgradering)}</p>
            <details open>
                <summary><b>Statistikk<b/></summary>
                <!-- lagre all relevant statestikk -->
                <p>Poeng: {Math.floor(poeng)}🍪</p>
                <p>Antall kjeks totalt: {Math.floor(antallCookiesTotalt)}🍪</p>
                <p>Antall kjøpte lootboxer: {kjøpteLootbox}</p>
            </details>
            
            
            <button on:click={() => kjøpLootbox()}>Åpne Lootbox ({Math.abs(Math.floor((poeng/100)*10))}🍪)!</button>
            <button on:click={kjøpLuckybox}>Spill Luckybox! (2000🍪)</button>
            <button on:click={slotsKjøp}>Spill Slots! (1000🍪)</button>
        
        </div>

        <div class="shop grid" style="var(--image, {kjeks})">
            {#each items as item, i}
                {#if aktivItems}
                    {#key aktivItems}
                        {#if aktivItems[item.navn]}
                        <button on:click={() => {upgrade(item.pris, item.addition, item.navn, item.multiplier)}}>{item.navn} - {Math.ceil(item.pris * item.multiplier * aktivItems[item.navn])}🍪 - {aktivItems[item.navn]} kjøpt</button>
                        {:else}
                        <button on:click={() => {upgrade(item.pris, item.addition, item.navn, item.multiplier)}}>{item.navn} - {item.pris}🍪 - 0 kjøpt</button>
                        {/if}
                    {/key}
                {/if}
            {/each}
        </div>
    
    </div>

<style>
    .bro {
        text-align: center;
        position: absolute;
        top: 0;
        z-index: 9999;
        width: 100%;
    }

    :global(body) {
        font-family: sans-serif;
    }

    :global(button) {
        font-family: sans-serif;
        font-weight: bolder !important;
        background: none;
    }

    @property --x {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
    }
    .gamblingknapp {
        float: right;
        padding: 0.25em;
        font-size: 10px;
    }
    #spilligjen {
        font-size: larger;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5em;
        margin: 1em;
        float: none;
        text-align: center;
        /*background-color: gold;*/
        background: radial-gradient(ellipse farthest-corner at var(--x) 0%, #FFFFFF 0%, rgb(255, 237, 137) 8%, rgb(247, 220, 71) 25%, rgb(248, 214, 23) 62.5%, gold 100%);
        animation: colourChange 3s infinite alternate;

    }

    @keyframes colourChange { /*stavet på den riktige måten*/
        0% {
            --x:0%;
        }
        50% {
            --x:50%;
        }
        100% {
            --x:100%;
        }
    }

    .minigames {
        position: absolute;
        background-color: aliceblue;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .minigames:empty {
        display: none;
    }

    @keyframes kjeks {
        0% {
            transform: scale(0.85);
        }
        100% {
            transform: scale(1);
        }
    }

    .kjeks {
        animation: kjeks 0.15s;
    }

    .master {
        padding: 0;
        margin: 0;
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: 30vw 40vw 30vw ;
        height: 100vh;
        width: 100%;
        gap: 0;
    } 

    .grid {
        display: inline-grid;
        overflow: scroll;
    }

    .shop button {
        height: 70px;
        gap: 0;
    }

    .stats button {
        height: 50px;
        gap: 0;
    }
</style>