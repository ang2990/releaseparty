<script lang="ts">
	let { symbol = '' } = $props();

	// Calculate vertical translation.
	// We map symbols to indices: "" -> 0, "$" -> 1.
    // If we add more symbols later, we can expand this map.
    const symbolMap = {
        '': 0,
        '$': 1
    };

    const index = $derived(symbolMap[symbol] ?? 0);
	const reelY = $derived(`-${index * 100}%`); // Move full height
</script>

<!-- 
  The container defines the visible window. 
-->
<div class="symbol-reel-container">
	<div class="symbol-reel" style="transform: translateY({reelY});">
        <!-- 
             The order must match the indices:
             0: Empty string
             1: $
        -->
		<span class="symbol-item">&nbsp;</span> <!-- Non-breaking space for empty height -->
        <span class="symbol-item">$</span>
	</div>
</div>

<style>
	.symbol-reel-container {
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.symbol-reel {
		display: flex;
		flex-direction: column;
		transition: transform 2.5s cubic-bezier(0.23, 1, 0.32, 1);
		will-change: transform;
        height: 100%; /* Ensure it takes up space */
	}

	.symbol-item {
		height: 100%; /* Each item takes full height of container */
        flex-shrink: 0; /* Prevent shrinking */
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
</style>