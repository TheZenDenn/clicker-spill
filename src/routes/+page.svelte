<script>
    import kjeks from "$lib/bilder/kjeks.png";
    import {items} from "$lib/meny";

    let antallCookiesTotalt = 0;
    let poeng = 0;
    let antallAutoOppgradering = 1;
    
    //Trykke for på kjeksen for å få kjeks
    function faaPoeng(){
        poeng += antallAutoOppgradering
        antallCookiesTotalt += antallAutoOppgradering;
    }

    //Automatisk få kjeks hvert sekund
    setInterval(function(){ 
        faaPoeng(); 
    }, 1000);
    /**
     * Oppgraderer basert etter pris og bestemmer hvor mye cookiespersekund øker med
     * @param pris
     * @param addition
     */
    function upgrade(pris, addition) {
        if (pris > poeng)
            return;
        
        antallAutoOppgradering += addition;
        poeng -= pris;
        //console.log(pris, antallAutoOppgradering);
    }
    
    </script>
    <p>Trykk på kjeksen</p>
    <h1 on:click={() => {faaPoeng();}}><img src="{kjeks}" alt=""></h1>
    <!--<button on:click={faaPoeng}>Trykk</button>-->
    <h1>Kjeks Clicker</h1><!--
    <button on:click={oppgradering}>Kjøp oppgradering</button>
    <button on:click={autoOppgradering}>Kjøp auto oppgradering</button>
-->
    <p>Cookes per sekund {antallAutoOppgradering}</p>
    <div class="stats">
        <h2>Stats</h2>
        <p>Poeng: {poeng}</p>
        <p>Antall cookies totalt {antallCookiesTotalt}</p>
    </div>

    <div class="shop">
        {#each items as item}
            <button on:click={() => {upgrade(item.pris, item.addition)}}>{item.navn} - {item.pris} cookies</button>
        {/each}
    </div>
    
    
    
    <style>
        .shop {
            float: right;
            display: block;
        }
        .shop button {
            width: 100%;
        }
        .stats {
            text-align: center;

        }
    </style>
    
    