<script lang="ts">
	import { onMount } from 'svelte';
	import TickerDigit from './TickerDigit.svelte';
	import TickerSeparator from './TickerSeparator.svelte';

	let { value = 0, size = 'large', prefix = '' } = $props();
	const numDigits = 11; 

	// We'll store the display items as an array of strings (digits or commas)
	let displayItems = $state([]);

	const formatNumber = (num) => {
		// Pad with leading zeros first
		const padded = num.toString().padStart(numDigits, '0');
		// Add commas using regex
		return padded.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	onMount(() => {
		// Initial random state (digits only for chaos effect)
		const randomDigits = Array(numDigits + 3) // Approx length with commas
			.fill(0)
			.map(() => Math.floor(Math.random() * 10));
        
        displayItems = [prefix, ...randomDigits]; // Start with prefix

		const timeoutId = setTimeout(() => {
			const formatted = formatNumber(value);
			// Split into array of characters and prepend prefix (or placeholder)
            // If prefix is empty, we still want a placeholder slot to keep the grid stable?
            // "it can be a blank orange highlight for the pledged streams"
            // So yes, always prepend a slot.
            const p = prefix || ''; 
			displayItems = [p, ...formatted.split('')];
		}, 100);

		return () => clearTimeout(timeoutId);
	});

    // Reactively update when value or prefix changes
    $effect(() => {
        const formatted = formatNumber(value);
        displayItems = [prefix, ...formatted.split('')];
    });
</script>

<div class="ticker-container" class:small={size === 'small'}>
	{#each displayItems as item, i (i)}
		<!-- Check if item is a number or a comma -->
		{#if item === ','}
			<div class="digit-wrapper separator">
				<TickerSeparator />
			</div>
        {:else if i === 0}
            <!-- First slot is the prefix (or blank) -->
            <div class="digit-wrapper symbol">
                <span>{item}</span>
            </div>
		{:else}
			<div class="digit-wrapper">
				<!-- Force item to number for TickerDigit -->
				<TickerDigit digit={parseInt(item)} />
			</div>
		{/if}
	{/each}
</div>

<style>
	.ticker-container {
		display: flex;
		gap: 4px; /* Small gap between highlight blocks */
		font-family: var(--font-heading);
		font-weight: 900;
		font-size: clamp(2.5rem, 8vw, 10rem); 
		line-height: 0.9;
		letter-spacing: -0.05em;
		font-variant-numeric: tabular-nums;
	}

    .ticker-container.small {
        font-size: clamp(1.2rem, 4vw, 3.5rem);
        gap: 2px;
    }

	.digit-wrapper {
		/* HIGHLIGHT STYLE */
		background: var(--accent-color);
		color: #fff;
		
		width: 0.75em; 
		height: 1.1em;
		padding: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		border-radius: 2px; /* Slight rounding for the highlight block look */
	}

    .digit-wrapper.symbol {
        font-size: 1em; /* Ensure symbol scales with parent */
        /* If item is empty string, background is still visible as a blank block */
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

	/* Separator (Comma) Style - No highlight */
	.digit-wrapper.separator {
		background: transparent;
		color: var(--accent-color);
		width: 0.2em; /* Reduced width */
		margin-left: 0;
        border-radius: 0;
	}
</style>