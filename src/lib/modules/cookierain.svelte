<script>
    let cookies = [];
    for (let i = 0; i < 10; i++) {
        cookies.push("🎉")
        cookies.push("🍪");
    }
</script>

<div class="cookieraindiv">
    {#each cookies as cookie, i}
    {#if (cookies.length / 2) < i}
    <div class="cookierain right" style="margin-left: {(Math.random() * 80)}vw">{cookie}</div>
    {:else}
    <div class="cookierain left" style="margin-right: {(Math.random() * 80)}vw">{cookie}</div>
    {/if}
    
    {/each}
</div>


<style>
    @keyframes cookierain {
        0% {
            display: block;
            top: 100vh;
        }
        50% {
            top: -40vh;
        }
        100% {
            top: 100vh;
            display: none;
        }
    }
    :root {
        --max: 40vw;
        --min: 0vw;
    }
    @keyframes right {
        0% {
            left: var(--min); 
        }

        100% {
            left: var(--max);
        }
    }

    @keyframes left {
        0% {
            right: var(--min);
        }

        100% {
            right: var(--max);
        }
    }

    .cookierain {
        top: 200vh;
        font-size: 5em;
        position: absolute;
    }

    .left {
        animation: cookierain 3s, left 3s;
    }

    .right {
        animation: cookierain 3s, right 3s;
    }
</style>