<script lang="ts">
	// A component for a single digit reel
	let { digit = 0 } = $props();

	// Calculate the vertical translation.
	// Since there are 10 items, each item is 10% of the total reel height.
	const reelY = $derived(`-${digit * 10}%`);
</script>

<!-- 
  The container defines the visible window. 
  It must match the height of exactly ONE digit.
-->
<div class="digit-reel-container">
	<div class="digit-reel" style="transform: translateY({reelY});">
		{#each Array(10) as _, i}
			<span>{i}</span>
		{/each}
	</div>
</div>

<style>
	.digit-reel-container {
		overflow: hidden;
		width: 100%;
		height: 100%; /* Fill the parent wrapper completely */
		position: relative;
	}
	
	.digit-reel {
		display: flex;
		flex-direction: column;
		transition: transform 2.5s cubic-bezier(0.23, 1, 0.32, 1); /* Smoother "mechanical" ease */
		will-change: transform;
	}

	.digit-reel span {
		/* 
		   CRITICAL: Each number must be exactly the height of the container 
		   for the percentage-based transform to align perfectly.
		*/
		height: 1.1em; 
		line-height: 1.1em; 
		
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1em; 
		width: 100%;
	}
</style>
