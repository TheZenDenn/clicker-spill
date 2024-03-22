<script>
    import Resize from "$lib/modules/resize.svelte";
</script>
<!-- ikke for å hindre brukeren, men for å fortelle dem at de gjør noe dumt -->
<Resize width={830} />
<slot></slot>

<style>
    :global(body) {
        -webkit-user-select: none;
        -ms-user-select: none; 
        user-select: none; 
        overflow: hidden;
        margin: 0;
        padding: 0;
        height: 100%;
    }
</style>