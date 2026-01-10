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
    <div class="card top">{currentValue}</div>
    <div class="card bottom">{currentValue}</div>
    
    <!-- Animating Flaps -->
    {#if isFlipping}
        <div class="card top flip-front">{previousValue}</div>
        <div class="card bottom flip-back">{currentValue}</div>
    {:else}
        <div class="card top">{currentValue}</div>
    {/if}
    
    <!-- Mechanical Split Line -->
    <div class="split-line"></div>
</div>

<style>
    .flip-digit {
        position: relative;
        display: inline-block;
        width: 0.6em; 
        height: 1em;
        /* Train Station / Mechanical Font */
        font-family: 'Courier New', monospace; 
        font-weight: 900;
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
        text-align: center;
        backface-visibility: hidden;
    }
    
    .top {
        top: 0;
        line-height: 2em; /* Shows top half */
    }
    
    .bottom {
        bottom: 0;
        line-height: 0; /* Shows bottom half */
        transform-origin: top;
    }

    /* Flat Animation - No Shadows */
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
        height: 2px;
        background: var(--bg-color);
        z-index: 10;
        transform: translateY(-50%);
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