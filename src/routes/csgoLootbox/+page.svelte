<script>
    let items = [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
    ];

    function finnRandom(items = []) {
        let lengde = items.length;
        let index = Math.floor(Math.random () * (lengde ));
        return [items[index], index];
    }

    let aktiv = items;
    let aktivIndex = "noen ting endrer seg aldri";
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let ending = 0;
    async function openLootbox() {
        //bestem en vinner
        let vinner = finnRandom(items);
        //aktivIndex = vinner[1];
        console.log(aktivIndex)
        
        let times = 20;
        let sleepTime = 100;
        /**
         * Må gjøre denne frem til at aktiv[2] er den vi vil ha
        */
        for (let i = 0; i < times; i++) {
            aktiv.unshift(aktiv.pop());
            aktiv = aktiv;
            console.log(aktiv)
            ending++;
            await sleep(sleepTime);
        }
        while (aktivIndex != vinner[0]) {
            aktiv.unshift(aktiv.pop());
            aktiv = aktiv;
            aktivIndex = aktiv[2]

            await sleep(sleepTime)
        } 

        alert("Vinneren er " + vinner[0])


    }


</script>
<button on:click={openLootbox}>Spin hjul og vinn!</button>
<div class="lootbox">
    {#each aktiv as item, i}
        {#if i == 2}
        <div class="item vinner">{item}</div>
        {:else}
        <div class="item">{item} </div>
        {/if}
        
    {/each}
</div>
<h1>CSGO lootbox</h1>

<style>
    .lootbox {
        text-align: center;
    } 
    

    .item {
        display: inline-block;
        margin: 1em;
    }

    .vinner {
        background-color: green;
    }

</style>
