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
        <!-- Using index as key might be okay if length is constant, 
             but if length changes, it might be weird. 
             Ideally use a stable ID but for a counter growing in length, simple index is usually fine 
             if we just append/prepend. -->
        {#if digit === ',' || digit === '.'}
            <span class="separator">{digit}</span>
        {:else}
            <FlipDigit value={digit} />
        {/if}
    {/each}

    <!-- TOOLTIP -->
    <div class="tooltip" class:visible={showTooltip}>
        <div class="tooltip-header">LIVE_DATA_FEED</div>
        <p>
            Aggregated real-time stream pledges from artist catalogs (2024 verified stats).
            <br><br>
            <span class="text-accent">Goal: 50 Billion Streams</span>
        </p>
    </div>
</div>

<style>
    .flip-counter-wrapper {
        display: inline-flex;
        align-items: center;
        position: relative;
        cursor: help;
        padding: 20px; /* Hit area */
    }

    .separator {
        font-family: var(--font-heading);
        font-size: 0.8em; /* Relative to parent font size */
        font-weight: 900;
        color: var(--text-color);
        margin: 0 0.1em;
        align-self: flex-end;
        padding-bottom: 0.1em;
    }

    /* TOOLTIP STYLES */
    .tooltip {
        position: absolute;
        top: 100%; /* Below the counter */
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        width: 300px;
        background: var(--bg-color);
        border: 2px solid var(--line-color);
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        z-index: 100;
        box-shadow: 10px 10px 0 rgba(0,0,0,0.2);
        pointer-events: none;
        text-align: left;
    }

    .tooltip.visible {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }

    .tooltip-header {
        font-family: 'Courier New', monospace;
        font-weight: 700;
        border-bottom: 1px solid var(--line-color);
        margin-bottom: 10px;
        padding-bottom: 5px;
        font-size: 0.8rem;
    }

    .tooltip p {
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0;
    }
</style>