<script>
    import kjeks from "$lib/bilder/kjeks.png";
    import cookie from "$lib/bilder/cookie.jpg"
    import {items} from "$lib/meny";

    let antallOppgradering = 0
    let poeng = 0
    let eksponent = 1.3
    let k = 1 
    let pris = Math.round(10 * (k**eksponent))
    let antallAutoOppgradering = 1
    
    //Trykke for på kjeksen for å få kjeks
    function faaPoeng(){
    poeng = poeng + (1 + antallOppgradering)
    }

    //Automatisk få kjeks hvert sekund
    setInterval(function(){ 
    poeng = poeng + (1+antallAutoOppgradering)   
}, 1000);

    //Oppgraderinger. Sjekke hvor mange kjeks man har, og trekke fra prisen av oppgradering. 
    function oppgradering(){
        if (poeng >= pris){
        poeng = poeng - pris
        antallOppgradering = antallOppgradering +1 
        k = k + 1 
        //Prisskifte
        pris = Math.round (10 * (k**eksponent))
     }
        else {
            alert("Ikke nok poeng")
        }
    }

    //Automatisk kjeks oppgradering 
        function autoOppgradering(){
        if (poeng >= pris){
        poeng = poeng - pris
        antallAutoOppgradering = antallAutoOppgradering +1 
        k = k + 1 
        pris = Math.round (10 * (k**eksponent))
     }
        else {
            alert("Ikke nok poeng")
        }
   
}

    function upgrade(pris, multi) {
        if (pris > poeng) {
            return;
        }

        antallAutoOppgradering *= multi;
        poeng -= pris;
        console.log(pris, antallAutoOppgradering);


    }
    
    </script>
    <p>Trykk på kjeksen</p>
    <a href="" on:click={faaPoeng}><img src="{kjeks}" alt=""></a>
    <!--<button on:click={faaPoeng}>Trykk</button>-->
    <h1>Kjeks Clicker</h1>
    

    <div class="shop">
        {#each items as item}
            <button on:click={() => {upgrade(item.pris, item.multi)}}>{item.navn} - {item.pris} cookies</button>
        {/each}
    </div>
    <p>{poeng}</p>
    <p>{pris}</p>
    
    
    <style>
    
        .shop {
            float: right;
            display: block;
        }
        .shop button {
            width: 100%;
        }
    
        
    </style>
    
    