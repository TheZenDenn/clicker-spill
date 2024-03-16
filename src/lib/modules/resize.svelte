<script>
    import { error } from "@sveltejs/kit";
    import { onMount } from "svelte";

    /**
     * @type {number}
     */
    export let height = 1;
    /**
     * @type {number}
     */
    export let width = 1;

    let errorMelding = "";
    let anbefaling = "Vi anbefaler at du gjør browser-vinduet ditt stort nok!";
    
    onMount(()=> resize());
    function resize() {
        let iw = window.innerWidth;
        let ih = window.innerHeight;
        console.log(iw, ih)

        if (width > iw || height > ih)
            errorMelding = anbefaling;
        else
            errorMelding = "";
    }
</script>
<svelte:window on:resize={resize}/>
{#if errorMelding}
    <p>{errorMelding}</p>
{/if}
<!--
    @component
    Bruk denne hvis du ikke ønsker at folk skal gjøre skjermen for liten
    Bru
    
-->