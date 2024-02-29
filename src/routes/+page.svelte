<script>
    import kjeks from "$lib/bilder/kjeks.png";

    let antallOppgradering = 0
    let poeng = 0
    let eksponent = 1.3
    let k = 1 
    let pris = Math.round(10 * (k**eksponent))
    let antallAutoOppgradering = 0
    

    function faaPoeng(){
    poeng = poeng + (1 + antallOppgradering)
    }

    setInterval(function(){ 
    poeng = poeng + (1+antallAutoOppgradering)   
}, 1000);

    function oppgradering(){
        if (poeng >= pris){
        poeng = poeng - pris
        antallOppgradering = antallOppgradering +1 
        k = k + 1 
        pris = Math.round (10 * (k**eksponent))
     }
        else {
            alert("Ikke nok poeng")
        }
    }

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
    
    </script>
    <p>Trykk på kjeksen</p>
    <a href="" on:click={faaPoeng}><img src="{kjeks}" alt=""></a>
    <!--<button on:click={faaPoeng}>Trykk</button>-->
    <h1>Kjeks Clicker</h1>
    <button on:click={oppgradering}>Kjøp oppgradering</button>
    <button on:click={autoOppgradering}>Kjøp auto oppgradering</button>

    <p>{poeng}</p>
    <p>{pris}</p>
    
    
    <style>
    
    
    
    </style>
    
    