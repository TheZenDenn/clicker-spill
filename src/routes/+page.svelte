<script>
    import kjeks from "$lib/bilder/kjeks.png";
    import {items} from "$lib/meny";
    import * as localstorageAPI from "$lib/localstorageAPI";
    import Lootbox from "$lib/modules/lootbox.svelte" 
    import * as gambling from "$lib/gambling";
    import {sleep} from "$lib/index";

    let settings = false;

    /**
     * Disable denne før production.
     */
    const debug = true;
    let debugPoeng = 0; 

    let antallFysiskeKlikk = 0;
    let antallCookiesTotalt = 0;
    let poeng = 0;
    let antallAutoOppgradering = 1;
    /**
     * @type {Object}
     */
    let aktivItems = {};
    /**
     * Viser errorfunds melding. Bruk errorFunds funksjon eller lag en lignende.
     */
    let error = false;

    //få lagrede data først - hvis ikke default
    async function getSave() {
        let data = await localstorageAPI.getData();
        if (!data)
            return; //defaults

        //antallFysiskeKlikk = 
        antallCookiesTotalt = data.AntallCookiesTotalt
        poeng = data.Poeng
        antallAutoOppgradering = data.CookiesPerSekund
        aktivItems = data.ActiveItems
        console.log(data)
    }
    getSave();
    
    //Trykke for på kjeksen for å få kjeks
    function faaPoeng(){
        poeng += antallAutoOppgradering
        antallCookiesTotalt += antallAutoOppgradering;

        if (poeng > antallCookiesTotalt) { //gambling hotfix
            let diff = poeng - antallCookiesTotalt;
            antallCookiesTotalt += diff;
        }
    }

    let timeForAutosave = 10 * 1000;
    const autoSave = setInterval(async () => {
        //finn alle dataene 
        let datastruct = new localstorageAPI.CookieDataStruct(poeng, antallCookiesTotalt, antallAutoOppgradering, aktivItems);
        await localstorageAPI.writeData({...datastruct})
        console.log("Wrote data")
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
        console.log(poeng);
        poeng = await gambling.lootBoxResults(winner, poeng);
        console.log(poeng);
    }

    function kjøpLootbox(pris = (poeng/100)*10) {
        if (typeof(pris) != "number") 
            throw "pris trenger å bli gitt i svelte for en eller annen grunn. Dev feil fra deg, ikke meg";

        if (poeng < pris) 
            return errorFunds();

        
        poeng -= pris;
        console.log(poeng, pris);
        lootboxVis = true;
    } 

    async function errorFunds() {
        error = true;
        await sleep(500);
        error = false;
    }

</script>
    {#if settings}
        <div class="settings">
            test
            <button on:click={() => settings = settings ? false : true}>Settings</button>
            <button on:click={localstorageAPI.resetLagring}>Reset lagring</button>
        </div>
    {/if}

    {#if debug}
        Set poeng: <input type="number" bind:value={debugPoeng}> <button on:click={() => poeng = debugPoeng}>Set poeng</button>
    {/if}
    {#if error} 
        <p>Ikke nok cookies!</p>
    {/if}
    <div class="minigames">
        {#if lootboxVis}
            <Lootbox items={gambling.lootboxOptions} bind:winner={winner} callback={lootboxCB}/>
            {#if winner}
            <button class="gamblingknapp" on:click={() => {lootboxVis = false; winner = undefined;}}>Lukk lootbox</button>
            <button id="spilligjen" class="gamblingknapp" on:click={async () => {lootboxVis = false; winner = undefined; await sleep(500); kjøpLootbox();}}>Spill igjen!</button>
            {/if}
        {/if}
    </div>

    <div class="master">
        {#key antallFysiskeKlikk} <!-- animasjon ting -->
        <div class="kjeks"><h1 on:click={() => {faaPoeng(); antallFysiskeKlikk = antallFysiskeKlikk + 1;}}><img src="{kjeks}" alt=""></h1></div>
    
        {/key}

        <div class="stats grid">
            <h1>Kjeks Clicker</h1>
            <button on:click={() => settings = settings ? false : true}>Settings</button>
            <p>Cookes per sekund {Math.floor(antallAutoOppgradering)}</p>
            <h2>Stats</h2>
            <p>Poeng: {Math.floor(poeng)}</p>
            <p>Antall cookies totalt {Math.floor(antallCookiesTotalt)}</p>
            <button on:click={() => kjøpLootbox()}>Åpne Lootbox ({Math.floor((poeng/100)*10)} cookies)!</button>
            <button>Spill Memory Card!</button>
            <button>Spill Poker!</button>
            <button>Spill Blackjack!</button>
            <button>Spill Slots!</button>
        </div>

        <div class="shop grid">
            {#each items as item, i}
                {#key aktivItems}
                {#if aktivItems[item.navn]}
                <button on:click={() => {upgrade(item.pris, item.addition, item.navn, item.multiplier)}}>{item.navn} - {Math.ceil(item.pris * item.multiplier * aktivItems[item.navn])} cookies - {aktivItems[item.navn]} kjøpt</button>
                {:else}
                <button on:click={() => {upgrade(item.pris, item.addition, item.navn, item.multiplier)}}>{item.navn} - {item.pris} cookies - 0 kjøpt</button>
                {/if}
                {/key}
                
            {/each}
        </div>
    
    </div>
<style>
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
        height: 50px;
        gap: 0;
    }
</style>