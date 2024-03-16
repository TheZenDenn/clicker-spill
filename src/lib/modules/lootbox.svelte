<script>
    import {fade, slide, fly} from "svelte/transition";
    import Gambling from "$lib/modules/gambling.svelte"
    import Resize from "$lib/modules/resize.svelte"
    import Cookierain from "$lib/modules/cookierain.svelte"
    
    export let items = [ /* burde kunne ha så mange som man har lyst til */ 
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "seks"
    ];
    export let winner = undefined;
    export let callback = () =>  {console.log("Du vant " + winner)};
    /**
     * Dette er en test
     * @param items
     */
    export let resetKnappVis = false;

    /**
     * Finner random element og index i et array
     * Burde lage prototype funksjon? 
     * @param {Array<string>} items
     * @returns {Array<string|number>} [item, index]
     */
    function finnRandom(items = []) {
        let lengde = items.length;
        let index = Math.floor(Math.random () * (lengde ));
        return [items[index], index];
    }

    let aktiv = items;
    /**
     * Den som er i vinnersetet typ
     * @type {string}
     */
    let aktivString = "-1";
    let aniIndex = 0;
    const sleep = (/** @type {number} */ ms) => new Promise(r => setTimeout(r, ms));
    function doBasic() {
        aniIndex++;
            if (aniIndex > items.length)
                aniIndex = 0;
        
        aktiv.unshift(aktiv.pop());
        aktiv = aktiv;
    }
    let won = false;
    async function openLootbox() {
        let won = false;
        await sleep(1000);
        //bestem en vinner
        let vinner = finnRandom(items);
        
        let times = 30;
        let sleepTime = 100;
        /**
         * Må gjøre denne frem til at aktiv[2] er den vi vil ha
        */
        for (let i = 0; i < times; i++) {
            doBasic();
            //gjør dette bedre - js er fortsatt js
            if (i > (times * 0.6)) { await sleep(sleepTime * 2); continue;}
            await sleep(sleepTime);
        }
        while (aktivString != vinner[0]) {
            doBasic()
            aktivString = aktiv[2]

            await sleep(sleepTime)
        } 
        winner = vinner[0];
        won = true;
        callback();
        await sleep(2000);
        if (resetKnappVis)
            knappVis = true;

    }
    let knappVis = false; //legacy 
    openLootbox();
</script>
<!--
    @component
    Lager CS-style lootbox.

    #### Viktig: Om du ønsker å ha alerts må du gjøre det i implimentasjonen på selve filen.

    ### Usage:

        - items {Array<string>} er mulige items
        - bind:winner er vinneren 
        - resetKnappVis er om den skal gi muligheten til å åpne lootboxen en gang til. Default = false      

    ### Eksempel:
    ```js
    <Lootbox items={items} bind:winner={vinner} resetKnappVis={false} />
    ```
-->

<div class="altlootbox" in:slide out:slide>
    {#if winner}
        <Cookierain />
    {/if}

    <div class="lootbox">
        <Gambling tittel="Lootbox"/>
        <Resize width={1090}/>
        <div class="fade" transition:fade={{duration: 400}}>
            {#key aktiv}
            {#each aktiv as item, i}
                {#if i < 5}
                    {#if i == 2} <!-- pain -->
                    {#if aniIndex == i}
                    <div class="item ani vinner">{item}</div>
                    {:else}
                    <div class="item vinner">{item}</div>
                    {/if}
                    {:else}
                    {#if aniIndex == i}
                    <div class="item ani">{item}</div>
                    {:else}
                    <div class="item">{item}</div>
                    {/if}
                    {/if}
                {/if}
            {/each} 
            {/key}
        </div>
    </div>

</div>
<style>
    :root {
        --max: 40vw;
        --min: 0vw;
    }
    @keyframes update {
        0% {
            transform: scale(0.85);
        }
        100% {
            transform: scale(1);
        }
    }
    .altlootbox {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
    }

    .knapp {
        text-align: center;
        font-family: sans-serif;
        font-weight: bold;
    }
    .lootbox {
        text-align: center;
        background-color: aliceblue;
        padding: 3em;
    } 
    
    .item {
        display: inline-block;
        padding: 2em;
        margin: 1.5em;
        margin-bottom: 10em;
        border: 2px solid teal;
        width: 5em;
        font-weight: bolder;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
    }

    .ani {
        animation: update 0.15s;
    }

    .vinner {
        background: linear-gradient(gold, gold) no-repeat center/2px 100%;
        background-color: green;
        border: 3px solid gold;
        padding: 2.5em;
    }
</style>