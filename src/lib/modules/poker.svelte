<script>
    import { sleep } from "$lib/index";
    /*
        Fire kort-typer: Spar, Hjerter, Ruter og Kløver

        Må kunne generere en kortstokk av 52 som går i sirkulasjon
        Hver av kort-typene har 2->10 J Q K A altså 13 x 4 kort
        Lag arrayer og representer dem med bokstaver enn så lenge
    
        Slik jeg ser for meg oversikten:
        <Array<Object>>
            <Object>
                Identitet altså 2, 3, 4 osv.
                Type: Hjerter
                Eier: Spiller 1, Ingen, osv.
    */
    export let spillernavn = "Deg";

    class Kort {
        constructor(identitet, type, eier) {
            this.identitet = identitet;
            this.type = type;
            this.eier = eier;
        }
    }
    const kortStokk = [];
    const spillere = [
        "Bernt",
        "Arnie",
        spillernavn,
        "Marie"
    ]

    const typer = [
        "Spar",
        "Hjerter",
        "Ruter",
        "Kløver",
    ];
    const kortIdentiter = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
    ]
                
    function lagKortForType(type = "Hjerter") {
        for (let i = 1; i < 14; i++) {
            let kort = new Kort(kortIdentiter[i-1], type, undefined);
            kortStokk.push({...kort});
        }
    }
    for (let entry in typer) {
        lagKortForType(typer[entry]);
    }

    function finnSpillerensKort() {

    }


    function gameLoop() {
        /* sett inn enkel game logic her etter vanlige poker regler */

        /* randomise de andre spillerne sine handlinger? */ 
    }

    console.log(kortStokk);


</script>

<!--
    @component
    ### Usage
        - spillernavn - navn på spilleren
    
    Tenker å ha tre spillere du spiller imot

    Ha en gameloop, balance osv.

    Gamble med cookies

    Viktig å kunne generere typer kort


-->
<div class="poker">
    <div class="bord">
        {#each spillere as spiller, i}
            <div class="spiller">{spiller}</div>
        {/each}
        <div class="midten"></div>
    </div>
</div>

<style></style>