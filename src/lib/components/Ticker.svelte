<script lang="ts">
	import { onMount } from 'svelte';
	import TickerDigit from './TickerDigit.svelte';

	let { value = 0 } = $props();
	const numDigits = 11; // Display 11 digits as requested

	// Initialize the digits to a starting state (all zeros)
	let digits = $state(Array(numDigits).fill(0));

	onMount(() => {
		// On component mount, start with a random set of digits for the initial "spin"
		digits = Array(numDigits)
			.fill(0)
			.map(() => Math.floor(Math.random() * 10));

		// After a brief moment, transition to the actual stream count value.
		// This delay allows the component to render before the animation starts.
		const timeoutId = setTimeout(() => {
			const stringValue = value.toString().padStart(numDigits, '0');
			digits = stringValue.split('').map(Number);
		}, 100);

		// Cleanup on unmount
		return () => clearTimeout(timeoutId);
	});
</script>

<!-- This container applies the large font size and flexbox layout. -->
<div class="ticker-container">
	{#each digits as digit, i (i)}
		<!-- 
		  Apply 'bg-group' to specific indices for visual grouping (thousands separators).
		  Indices 2,3,4 (Millions) and 8,9,10 (Hundreds) get the background.
		-->
		<div class="digit-wrapper" class:bg-group={(i >= 2 && i <= 4) || (i >= 8 && i <= 10)}>
			<TickerDigit {digit} />
		</div>
	{/each}
</div>

<style>
	.ticker-container {
		display: flex;
		gap: 0;
		font-family: var(--font-heading);
		font-weight: 900;
		font-size: clamp(3.5rem, 10vw, 12rem);
		line-height: 0.9;
		letter-spacing: -0.05em;
		font-variant-numeric: tabular-nums;
		border: 3px solid var(--line-color);
		background: var(--bg-color); /* Ensure background is opaque */
	}

	.digit-wrapper {
		border-right: 3px solid var(--line-color);
		
		/* 
		   Revised Sizing: 
		   0.75em is typically wide enough for the widest digit (0 or 4) in heavy fonts.
		   We rely on the inner TickerDigit to handle the overflow/clipping safety.
		*/
		width: 0.75em; 
		height: 1.1em;
		padding: 0;
		
		display: inline-flex;
		align-items: center;
		justify-content: center;
		
		position: relative;
		overflow: hidden; /* Ensure nothing leaks out */
	}

	.digit-wrapper:last-child {
		border-right: none;
	}

	/* Faint gray background for grouped digits */
	.digit-wrapper.bg-group {
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
