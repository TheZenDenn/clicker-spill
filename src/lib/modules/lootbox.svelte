<script>
    import {fade} from "svelte/transition";
    export let items = [ /* burde kunne ha så mange som man har lyst til */ 
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "seks"
    ];
    export let winner = undefined;
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
    const sleep = (/** @type {number} */ ms) => new Promise(r => setTimeout(r, ms));
    async function openLootbox() {
        await sleep(1000);
        //bestem en vinner
        let vinner = finnRandom(items);
        
        let times = 20;
        let sleepTime = 100;
        /**
         * Må gjøre denne frem til at aktiv[2] er den vi vil ha
        */
        for (let i = 0; i < times; i++) {
            // @ts-ignore
            aktiv.unshift(aktiv.pop());
            aktiv = aktiv;
            //gjør dette bedre - js er fortsatt js
            if (i > (times * 0.6)) { await sleep(sleepTime * 2); continue;}
            await sleep(sleepTime);
        }
        while (aktivString != vinner[0]) {
            // @ts-ignore
            aktiv.unshift(aktiv.pop());
            aktiv = aktiv; //svelte update call
            aktivString = aktiv[2]

            await sleep(sleepTime)
        } 
        winner = vinner[0];

        await sleep(2000);
        if (resetKnappVis)
            knappVis = true;

    }
    let knappVis = true;
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

<div class="altlootbox">


<div class="lootbox">
    {#if knappVis}
        <div class="knapp">
            <button on:click={() => {openLootbox(); knappVis = knappVis ? false : true;}}>Spin hjul og vinn!</button>
        </div>
    {/if}
    {#if !knappVis}
        <div class="fade" transition:fade={{duration: 400}}>
            {#each aktiv as item, i}
            {#if i < 5}
                {#if i == 2}
                <div class="item vinner">{item}</div>
                {:else}
                <div class="item">{item}</div>
                {/if}
            {/if}
        {/each} 
        </div>
    {/if}
</div>

</div>
<style>

    .knapp {
        text-align: center;
    }
    .lootbox {
        text-align: center;
        background-color: aliceblue;
        padding: 3em;
    } 
    
    .item {
        display: inline-block;
        padding: 1em;
        margin: 1em;
        border: 2px solid teal;
    }

    .vinner {
        background: linear-gradient(gold, gold) no-repeat center/2px 100%;
        background-color: green;
        border: 3px solid gold;
        padding: 1.5em;
    }

</style>
