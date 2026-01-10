<script>
    let { value = '0' } = $props();
    
    let currentValue = $state(value);
    let previousValue = $state(value);
    let isFlipping = $state(false);

    $effect(() => {
        if (value !== currentValue) {
            previousValue = currentValue;
            currentValue = value;
            isFlipping = true;
            
            setTimeout(() => {
                isFlipping = false;
                previousValue = currentValue;
            }, 600); 
        }
    });
</script>

<div class="flip-digit">
    <!-- Static Background -->
    <div class="card top"><span class="text">{currentValue}</span></div>
    <div class="card bottom"><span class="text">{currentValue}</span></div>
    
    <!-- Animating Flaps -->
    {#if isFlipping}
        <div class="card top flip-front"><span class="text">{previousValue}</span></div>
        <div class="card bottom flip-back"><span class="text">{currentValue}</span></div>
    {:else}
        <div class="card top"><span class="text">{currentValue}</span></div>
    {/if}
    
    <!-- Mechanical Split Line -->
    <div class="split-line"></div>
</div>

<style>
    .flip-digit {
        position: relative;
        display: inline-block;
        width: 0.7em; /* Slightly wider to prevent clipping */
        height: 1em;
        font-family: 'Courier New', monospace; 
        font-weight: 700;
        perspective: 1000px;
        background: var(--text-color);
        color: var(--bg-color);
        margin: 0 1px;
    }

    .card {
        position: absolute;
        left: 0;
        width: 100%;
        height: 50%;
        overflow: hidden;
        background: var(--text-color);
        color: var(--bg-color);
        backface-visibility: hidden;
    }
    
    /* Inner text positioning wrapper */
    .text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 200%; /* Double the height of the card (half) = 100% of digit */
        position: absolute;
        left: 0;
        /* Ensure text doesn't wrap or overflow weirdly */
        line-height: 1; 
    }
    
    .top {
        top: 0;
        transform-origin: bottom;
    }
    
    .top .text {
        top: 0; /* Shows top half */
    }
    
    .bottom {
        bottom: 0;
        transform-origin: top;
    }
    
    .bottom .text {
        bottom: 0; /* Shows bottom half */
    }

    /* Flat Animation */
    .flip-front {
        z-index: 2;
        transform-origin: bottom;
        animation: flipDown 0.6s ease-in-out forwards;
    }

    .flip-back {
        z-index: 1;
        transform-origin: top;
        transform: rotateX(180deg);
        animation: flipUp 0.6s ease-in-out forwards;
    }
    
    .split-line {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background: var(--bg-color);
        z-index: 10;
        transform: translateY(-50%);
        opacity: 0.5;
    }

    @keyframes flipDown {
        0% { transform: rotateX(0deg); }
        100% { transform: rotateX(-180deg); }
    }

    @keyframes flipUp {
        0% { transform: rotateX(180deg); }
        100% { transform: rotateX(0deg); }
    }
</style>