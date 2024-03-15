<script>
    import forside from "$lib/bilder/forside.png";

    function poeng() {
        let a = Math.floor(Math.random() * 11);
        return a;
    }

    function mistpoeng() {
        let b = Math.floor(Math.random() * -1000) - 1;
        return b;
    }

    function VinnEllerTap() {
        let c = Math.random();
        let poengElement = document.getElementById("poeng");

        if (c < 0.5) {
            let vunnetPoeng = poeng();
            poengElement.innerHTML = "Poeng:" + vunnetPoeng;
        } else {
            let mistetPoeng = mistpoeng();
            poengElement.innerHTML = "Poeng:" +  mistetPoeng;
        }
    }
</script>

<style>
    @import './style.css';
</style>

<table>
    <tr>
        <td><h1 id="poeng">Poeng:</h1></td>
    </tr>
    <tr>
        <div class="wrapper">
            <li class="card" on:click={VinnEllerTap}>
                <div class="img">
                    <img src={forside} alt="">
                </div>
            </li>
        </div>
    </tr>
</table>




