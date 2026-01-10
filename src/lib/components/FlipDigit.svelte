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
            
            // Reset flipping after animation
            // Using a slightly shorter timeout to be safe
            setTimeout(() => {
                isFlipping = false;
                // Once flipping is done, previous becomes current for steady state if needed
                previousValue = currentValue;
            }, 600); 
        }
    });
</script>

<div class="flip-digit">
    <!-- Static Background (Next Value) -->
    <div class="card top">{currentValue}</div>
    <div class="card bottom">{currentValue}</div>
    
    <!-- Animating Flaps -->
    {#if isFlipping}
        <!-- Front flap (Old Value Top) flipping down -->
        <div class="card top flip-front">{previousValue}</div>
        <!-- Back flap (New Value Bottom) flipping down -->
        <div class="card bottom flip-back">{currentValue}</div>
    {:else}
        <!-- Static Top (current) -->
        <div class="card top">{currentValue}</div>
    {/if}
</div>

<style>
    .flip-digit {
        position: relative;
        display: inline-block;
        width: 0.7em; 
        height: 1.1em;
        font-family: 'Courier New', monospace; /* Fallback */
        font-weight: 900;
        perspective: 1000px;
        background: #111;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.5);
        margin: 0 2px;
    }

    .card {
        position: absolute;
        left: 0;
        width: 100%;
        height: 50%;
        overflow: hidden;
        background: #222;
        color: var(--accent-color);
        display: flex;
        justify-content: center;
        backface-visibility: hidden;
        /* Text Styling */
        font-size: 1em;
        line-height: 2em; /* Double height to center when cropped */
    }

    .top {
        top: 0;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        align-items: flex-start;
        transform-origin: bottom;
        border-bottom: 1px solid rgba(0,0,0,0.5);
    }

    .bottom {
        bottom: 0;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        align-items: flex-end;
        transform-origin: top;
        /* Align text for bottom half */
        line-height: 0; 
    }
    
    /* Correction for bottom text alignment: needs to pull text up */
    .bottom {
        display: block; /* Flex messes up the negative margin trick sometimes */
    }
    .bottom::before {
        content: "";
        display: block;
        height: 100%; /* Push text down? No. */
    }
    /* Let's use flex but offset the text */
    .card {
        display: flex;
        justify-content: center;
    }
    .top { align-items: flex-start; } /* Shows top of text */
    .bottom { align-items: flex-end; } /* Shows bottom of text */
    
    /* Text adjustment */
    /* Since line-height is 2em (full height), top box shows top half.
       Bottom box shows bottom half. */
    .card { line-height: 200%; }
    .bottom { line-height: 0; } /* Reset for bottom container? */
    
    /* Better alignment trick */
    .top { line-height: 1.1em; /* Full container height */ } 
    .bottom { line-height: 0; } /* Hide top part */
    /* Actually simple absolute positioning of text is best */
    
    /* RESTART CSS FOR CARDS */
    .card {
        position: absolute;
        left: 0;
        width: 100%;
        height: 50%;
        overflow: hidden;
        background: #222;
        color: var(--accent-color);
        text-align: center;
    }
    
    /* Inner text span for precise positioning */
    /* We assume the slot content is just text */
    
    .top {
        top: 0;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #000;
        transform-origin: bottom;
        line-height: 2em; /* Pushes text to correct vertical spot */
    }
    
    .bottom {
        bottom: 0;
        border-radius: 0 0 4px 4px;
        transform-origin: top;
        line-height: 0; /* Pulls text up */
    }

    .flip-front {
        z-index: 2;
        animation: flipDown 0.6s ease-in-out forwards;
    }

    .flip-back {
        z-index: 1;
        transform: rotateX(180deg);
        animation: flipUp 0.6s ease-in-out forwards;
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