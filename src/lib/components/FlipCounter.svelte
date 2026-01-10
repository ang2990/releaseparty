<script>
    import FlipDigit from './FlipDigit.svelte';
    
    let { value = "0000000000" } = $props();
    
    let digits = $derived(value.toString().split(''));
    let showTooltip = $state(false);
</script>

<div 
    class="flip-counter-wrapper"
    role="region"
    aria-label="Stream Count"
    onmouseenter={() => showTooltip = true}
    onmouseleave={() => showTooltip = false}
>
    {#each digits as digit, i (i)}
        {#if digit === ',' || digit === '.'}
            <span class="separator">{digit}</span>
        {:else}
            <FlipDigit value={digit} />
        {/if}
    {/each}

    <!-- TOOLTIP -->
    <div class="tooltip" class:visible={showTooltip}>
        <div class="tooltip-header">DATA_SOURCE: VERIFIED</div>
        <p>
            This number represents the real-time collective count of streams pledged by artists joining the Exodus.
            <br><br>
            <span class="text-accent" style="font-weight: 900;">TARGET: 50,000,000,000</span>
        </p>
    </div>
</div>

<style>
    .flip-counter-wrapper {
        display: inline-flex;
        align-items: center;
        position: relative;
        cursor: help;
        padding: 20px; 
    }

    .separator {
        font-family: 'Courier New', monospace;
        font-size: 0.8em; 
        font-weight: 900;
        color: var(--text-color);
        margin: 0 0.1em;
        align-self: flex-end;
        padding-bottom: 0.1em;
    }

    /* TOOLTIP STYLES - FLAT & BRUTALIST */
    .tooltip {
        position: absolute;
        top: 100%; 
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        width: 320px;
        background: var(--text-color);
        color: var(--bg-color);
        border: none;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.1s ease, transform 0.1s ease; /* Faster, snappier */
        z-index: 1000; /* High Z-Index */
        text-align: left;
        pointer-events: none;
    }

    .tooltip.visible {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }

    .tooltip-header {
        font-family: 'Courier New', monospace;
        font-weight: 700;
        border-bottom: 2px solid var(--bg-color);
        margin-bottom: 10px;
        padding-bottom: 5px;
        font-size: 0.8rem;
        text-transform: uppercase;
    }

    .tooltip p {
        font-family: var(--font-main); /* Use main font for readability */
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0;
        font-weight: 500;
    }
</style>