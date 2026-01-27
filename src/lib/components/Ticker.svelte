<script lang="ts">
	import { onMount } from 'svelte';
	import TickerDigit from './TickerDigit.svelte';
	import TickerSeparator from './TickerSeparator.svelte';
    import TickerSymbol from './TickerSymbol.svelte';

	let { value = 0, size = 'large', prefix = '' } = $props();
	const numDigits = 11; 

	const formatNumber = (num) => {
		// Pad with leading zeros first
		return num.toString().padStart(numDigits, '0');
	};

    const getItems = (val, pre) => {
        const formatted = formatNumber(val);
        const p = pre || '';
        // Return prefix + digits (no commas in array)
        return [p, ...formatted.split('')];
    };

	// Initialize state immediately for SSR
	let displayItems = $state(getItems(value, prefix));

	onMount(() => {
		const randomDigits = Array(numDigits)
			.fill(0)
			.map(() => Math.floor(Math.random() * 10));
        
        const p = prefix || '';
        displayItems = [p, ...randomDigits];

		const timeoutId = setTimeout(() => {
			displayItems = getItems(value, prefix);
		}, 100);

		return () => clearTimeout(timeoutId);
	});

    $effect(() => {
        displayItems = getItems(value, prefix);
    });
</script>

<div class="ticker-container" class:small={size === 'small'}>
	{#each displayItems as item, i (i)}
        <!-- 
           Comma Logic: 
           Indices 2, 5, 8 correspond to positions followed by a comma.
           (Prefix, D1, D2[comma], D3, D4, D5[comma], D6, D7, D8[comma], D9, D10, D11)
        -->
        {@const hasComma = i === 2 || i === 5 || i === 8}

        {#if i === 0}
            <!-- First slot is the prefix -->
            <div class="digit-wrapper symbol">
                <TickerSymbol symbol={item} />
            </div>
		{:else}
			<div class="digit-wrapper" class:comma-notch={hasComma}>
				<TickerDigit digit={parseInt(item)} />
			</div>
		{/if}
	{/each}
</div>

<style>
	.ticker-container {
		display: flex;
		gap: 2px; /* Tight gap for the cutout effect */
		font-family: var(--font-heading);
		font-weight: 900;
		font-size: clamp(1.2rem, 8vw, 10rem); 
		line-height: 0.9;
		letter-spacing: -0.05em;
		font-variant-numeric: tabular-nums;
	}

    .ticker-container.small {
        font-size: clamp(1.2rem, 4vw, 3.5rem);
        gap: 1px;
    }

	.digit-wrapper {
		/* HIGHLIGHT STYLE - Spotify Green */
		background: var(--accent-color);
		color: #fff;
		
		width: 0.75em; 
		height: 1.1em;
		padding: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: visible; /* Allow notch to extend */
		border-radius: 2px;
	}

    /* THE NEGATIVE SPACE COMMA (NOTCH) */
    .digit-wrapper.comma-notch::after {
        content: '';
        position: absolute;
        right: -6px; /* Adjusted for wider bulge */
        bottom: 0.12em; /* Moved down slightly (from 0.15em) */
        width: 10px; /* Increased width (from 6px) */
        height: 0.12em; 
        background-color: var(--bg-color); 
        z-index: 10;
        border-radius: 1px;
    }

    /* Adjust notch for small size */
    .ticker-container.small .digit-wrapper.comma-notch::after {
        right: -4px;
        width: 6px; /* Increased relative width for small size */
        height: 0.1em;
        bottom: 0.1em;
    }

    .digit-wrapper.symbol {
        font-size: 1em; 
    }
    
    .digit-wrapper.symbol span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

	.digit-wrapper:first-child {
		margin-left: 0;
	}
</style>