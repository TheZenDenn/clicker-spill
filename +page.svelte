<script>
let antallOppgradering = 0
let poeng = 0
let test = 0
function faaPoeng(){
poeng = poeng + (2 + antallOppgradering)
}
function oppgradering(){
    poeng = poeng - 100
    antallOppgradering = antallOppgradering +1 

}


</script>

<button on:click={faaPoeng}>Trykk</button>
<h1>Kjeks Clicker</h1>
<button on:click={oppgradering}>Kjøp oppgradering</button>
<p>{poeng}</p>


<style>



</style>

<p>hei</p>