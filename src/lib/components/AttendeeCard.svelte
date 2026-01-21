<script lang="ts">
    let { 
        id = "000", 
        name = "Unknown Passenger", 
        role = "LISTENER", 
        streams = "---", 
        origin = "NYC", 
        status = "VERIFIED", 
        classType = "A" 
    } = $props();
</script>

<div class="ticket-view no-image">
    <div class="ticket-overlay"></div>
    <div class="ticket-stamp">ATTENDING</div>
    
    <div class="ticket-data">
        <div class="font-mono ticket-id-line">GUEST_ID: #{id}</div>
        <h2 class="ticket-name-display">{name}</h2>
        
        <div class="ticket-stats-grid">
            <div class="stat-box">
                <span class="stat-label">ROLE</span>
                <span class="stat-value">{role}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">{role === 'LISTENER' ? 'MONTHLY_PLEDGE' : '2025_STREAMS'}</span>
                <span class="stat-value text-accent">{streams}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">STATUS</span>
                <span class="stat-value">{status}</span>
            </div>
        </div>
    </div>
</div>

<style>
    .ticket-id-line {
        font-size: 0.8rem;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding-bottom: 10px;
        margin-bottom: 15px;
        opacity: 0.6;
    }

    .ticket-name-display {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 0.9;
        margin-bottom: 30px;
        overflow-wrap: break-word; /* Allow breaking on long words, but prefer spaces */
        word-break: normal; /* Reset word-break */
    }

    .ticket-stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        border-top: 2px solid var(--line-color);
        padding-top: 20px;
    }

    .stat-box {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .stat-label {
        font-family: 'Courier New', monospace;
        font-size: 0.7rem;
        font-weight: 700;
        opacity: 0.5;
    }

    .stat-value {
        font-family: var(--font-heading);
        font-weight: 900;
        font-size: 1.2rem;
        text-transform: uppercase;
    }

    /* Style override for no-image version */
    :global(.ticket-view.no-image) {
        background-color: var(--bg-color);
        background-image: 
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0);
        background-size: 20px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-left: 2px solid var(--line-color);
    }

    :global(.ticket-view.no-image .ticket-data) {
        position: relative;
        background: transparent;
        color: var(--text-color);
        padding: 60px 40px;
    }
</style>