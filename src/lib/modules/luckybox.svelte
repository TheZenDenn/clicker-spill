<script>
    import forside from "$lib/bilder/forside.png";
    import {sleep} from "$lib/index";
    import Cookierain from "$lib/modules/cookierain.svelte"

    export let kjeks = undefined;
    let visKjeks = false;
    export let callback = () => {console.log("callback")}

    function fåPoeng(min = 0, max = 11) {
        let points = Math.floor(Math.random() * (max - min)) + min;
        return points;
    }

    async function game() {
        if (kjeks != undefined)
            return;
        visKjeks = false;
        let rand = Math.random();
        if (rand < 0.5)
            kjeks = fåPoeng();
        else    
            kjeks = fåPoeng(-1000, -1);

        await sleep(2000);
        visKjeks = true;
        console.log("calling callback", kjeks);
        callback();
    }

    game();
</script>

<!-- 
    @component
    Burde egentlig få pakken til å bli pakket opp, for å så eksplodere
    Deretter vis poengene
-->
<div class="all">
<table>
    <tr>
        <td>
            <!--{#if !kjeks}
            <h1>Klikk for få poeng!</h1>
            {/if}-->
        </td>
    </tr>
    <tr>
        <div class="wrapper">
            <li class="card">
                {#if kjeks}
                    <div class="img anim">
                        {#if visKjeks}
                            <Cookierain />
                            <h1>
                                {#if kjeks > -0.5}
                                    +{kjeks}🍪
                                {:else}
                                    {kjeks}🍪
                                {/if}</h1>
                        {:else}
                            <img src={forside} alt="">
                        {/if}
                    </div>
                {:else}
                    <div class="img">
                        <img src={forside} alt="">
                    </div>
                {/if}
                
            </li>
        </div>
    </tr>
</table>

</div>

<style>
    :root {
        --pad: 1.5em;
    }

    @keyframes blistørre {
        0% {
            display: block;
            padding: 0em;
        }

        100% {
            padding: var(--pad);
        }
    }

    .anim img {
        padding: var(--pad);
        animation: blistørre 2s;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    .all {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #6563FF;
    }

    .wrapper {
        padding: 25px;
        border-radius: 10px;
        background: #F8F8F8;   
    }

    .card {  
        list-style: none;  
        height: 200x;
        width: 280px;
    }

    .img { 
        display: flex;
        justify-content: center;   
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out; 
    }

    .img:hover {
        transform: scale(1.05);
    }
</style>



