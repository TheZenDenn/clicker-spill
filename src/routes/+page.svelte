<script>
    import kjeks from "$lib/bilder/kjeks.png";
    import {items} from "$lib/meny";
    import * as localstorageAPI from "$lib/localstorageAPI"; 

    let antallFysiskeKlikk = 0;
    let antallCookiesTotalt = 0;
    let poeng = 0;
    let antallAutoOppgradering = 1;

    //få lagrede data først - hvis ikke default
    async function getSave() {
        let data = await localstorageAPI.getData();
        if (!data)
            return; //defaults

        //antallFysiskeKlikk = 
        antallCookiesTotalt = data.AntallCookiesTotalt
        poeng = data.Poeng
        antallAutoOppgradering = data.CookiesPerSekund
    }
    getSave();
    
    //Trykke for på kjeksen for å få kjeks
    function faaPoeng(){
        poeng += antallAutoOppgradering
        antallCookiesTotalt += antallAutoOppgradering;
    }

    let timeForAutosave = 10 * 1000;
    const autoSave = setInterval(async () => {
        //finn alle dataene 
        let datastruct = new localstorageAPI.CookieDataStruct(poeng, antallCookiesTotalt, antallAutoOppgradering);
        await localstorageAPI.writeData({...datastruct})
        console.log("Wrote data")
    }, timeForAutosave);

    //Automatisk få kjeks hvert sekund
    setInterval(function(){ 
        faaPoeng(); 
    }, 1000);
    /**
     * Oppgraderer basert etter pris og bestemmer hvor mye cookiespersekund øker med
     * @param {number} pris
     * @param {number} addition
     */
    function upgrade(pris, addition) {
        if (pris > poeng)
            return;
        
        antallAutoOppgradering += addition;
        poeng -= pris;
    }
</script>
    <h1>Todo: Lage en måte å save en fil - eksportere/importere den</h1>
    <div class="master">
        {#key antallFysiskeKlikk}
        <div class="kjeks"><h1 on:click={() => {faaPoeng(); antallFysiskeKlikk = antallFysiskeKlikk + 1;}}><img src="{kjeks}" alt=""></h1></div>
    
        {/key}

        <div class="stats grid">
            <h1>Kjeks Clicker</h1>
            <p>Cookes per sekund {antallAutoOppgradering}</p>
            <h2>Stats</h2>
            <p>Poeng: {poeng}</p>
            <p>Antall cookies totalt {antallCookiesTotalt}</p>
        </div>

        <div class="shop grid">
            {#each items as item}
                <button on:click={() => {upgrade(item.pris, item.addition)}}>{item.navn} - {item.pris} cookies</button>
            {/each}
        </div>
    
    </div>
    <style>
        @keyframes kjeks {
            0% {
                transform: scale(0.85);
            }
            100% {
                transform: scale(1);
            }
        }

        .kjeks {
            animation: kjeks 0.15s;
        }

        .master {
            display: grid;
            grid-template-columns: 30vw 40vw 30vw ;
        } 
        .grid {
            display: inline-grid;
        }
    
    </style>