<script> 
    export let tittel = "Gambling"
</script>
<div id="tittel">
    <h1>{tittel}</h1>
    <p>Du kan vinne millioner!</p>
</div>

<style>
    /*skamløst stjelt fra https://stackoverflow.com/questions/57218443/how-to-animate-a-radial-gradient-using-css*/
    @property --x {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
    }

    #tittel {
        padding: 0.5em;
        border-radius: 10px;
        background: radial-gradient(ellipse farthest-corner at var(--x) 0%, #FFFFFF 0%, #ffb3ff 8%, #ff33ff 25%, #800080 62.5%, #b300b3 100%);
        animation: colorChange 5s infinite alternate;
        color: blueviolet;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
        font-size: 1.5em;
        line-height: 5px;
        font-family: sans-serif;
        letter-spacing: 5px;
        font-weight: bolder;
    }

    @keyframes colorChange {
        0% {
            --x:0%;
        }
        50% {
            --x:50%;
        }
        100% {
            --x:100%;
        }
    }
</style>