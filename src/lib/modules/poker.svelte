<script>
    import Gambling from "$lib/modules/gambling.svelte";
    import * as Kort from "$lib/kort";
    
    let aktivKortStokk = Kort.genererKortstokk();
    let dealtKort = [];
    let kortUtAvSpill = [];
    let _spillere = ["Karen", "Jens", "Deg", "Live"];
    let spillere = Kort.genererSpillere(_spillere);

    /**
     * 
     * @param antallKort
     * @returns {Array<Object>}
     */
    function dealKort(antallKort = 2) {
        //deal kort til spiller
        let _kort = [];
        for (let i = 0; i < antallKort; i++) {
            //ta et random kort fra bunken 
            let ind = Math.floor(Math.random() * aktivKortStokk.length);
            console.log(ind);
            _kort.push(aktivKortStokk[ind]);
            aktivKortStokk.splice(ind, 1)
        }

        return _kort;
    }

    function runde(spillere, kortIRunden) {
        
    }

</script>

<Gambling tittel="Poker"/>
<style>


</style>