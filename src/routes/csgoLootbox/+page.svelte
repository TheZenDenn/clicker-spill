<script>
    import Lootbox from "$lib/modules/lootbox.svelte";
    /**
     * @type {Array<string>}
     */
    let custom = [];
    for (let i = 0; i < 10; i++) {
        custom.push("ting"+i);
    }
    /**
     * @type {string}
     */
    let vinner;
</script>
Vinner: {vinner}
<Lootbox items={custom} bind:winner={vinner} resetKnappVis={false}/>