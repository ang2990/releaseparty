<script lang="ts">
	import { onMount } from 'svelte';
	import TickerDigit from './TickerDigit.svelte';
	import TickerSeparator from './TickerSeparator.svelte';

	let { value = 0 } = $props();
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
		displayItems = Array(numDigits + 3) // Approx length with commas
			.fill(0)
			.map(() => Math.floor(Math.random() * 10));

		const timeoutId = setTimeout(() => {
			const formatted = formatNumber(value);
			// Split into array of characters
			displayItems = formatted.split('');
		}, 100);

		return () => clearTimeout(timeoutId);
	});
</script>

<div class="ticker-container">
	{#each displayItems as item, i (i)}
		<!-- Check if item is a number or a comma -->
		{#if item === ','}
			<div class="digit-wrapper separator">
				<TickerSeparator />
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
		gap: 0;
		font-family: var(--font-heading);
		font-weight: 900;
		font-size: clamp(2.5rem, 8vw, 10rem); 
		line-height: 0.9;
		letter-spacing: -0.05em;
		font-variant-numeric: tabular-nums;
	}

	.digit-wrapper {
		border: 3px solid var(--line-color);
		width: 0.75em; 
		height: 1.1em;
		padding: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		background: var(--bg-color);
		margin-left: -3px; /* Prevent double borders between digit boxes */
	}

	.digit-wrapper:first-child {
		margin-left: 0;
	}

	/* Separator (Comma) Style */
	.digit-wrapper.separator {
		border-top: none;
		border-bottom: none;
		/* Keep side borders to maintain the grid vertical lines */
		border-left: 3px solid var(--line-color);
		border-right: 3px solid var(--line-color);
		width: 0.35em;
		background: transparent;
		margin-left: -3px;
	}
</style>
