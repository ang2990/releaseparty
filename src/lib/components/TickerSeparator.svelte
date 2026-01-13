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
		padding-bottom: 0.15em; /* Lift slightly from bottom edge */
	}

	span {
		font-family: var(--font-heading);
		font-weight: 900;
		font-size: 1em;
		line-height: 1;
	}
</style>