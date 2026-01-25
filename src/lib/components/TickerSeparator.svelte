<script lang="ts">
	// Simple component for the comma separator
</script>

<div class="separator-container">
	<span>,</span>
</div>

<style>
	.separator-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-end; /* Align to bottom */
		justify-content: center;
		padding-bottom: 0.2em; /* Lift slightly more from bottom edge */
	}

	span {
		font-family: var(--font-heading);
		font-weight: 900;
		font-size: 0.6em; /* Smaller size */
		line-height: 1;
		color: var(--accent-color); /* Match theme orange */
	}
</style>