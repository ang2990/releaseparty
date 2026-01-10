<script>
    // No dynamic guest cycling needed on this page anymore, all logic moved to layout.
    // Keeping script block for potential future Svelte-specific logic.
</script>

<svelte:head>
    <title>Guest List - Release Party</title>
</svelte:head>

<div class="grid-container">
        <!-- GUEST LIST SECTION -->
        <div class="grid-row grid-sidebar" id="guestlist">
            <!-- LEFT: THE LIST -->
            <div class="grid-item" style="background: #e5e3de;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; flex-wrap: wrap; gap:10px;">
                    <div>
                        <h2>The Guest List</h2>
                        <p style="font-size: 0.9rem;">Packed their bags.</p>
                    </div>
                    <input type="text" class="guest-search-input" placeholder="Search...">
                </div>
                <div class="guest-list-wrapper">
                    <!-- Static representation of guests -->
                    <div class="guest-item">
                        <span style="color: var(--accent-color);">Ray Bull</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Artist</span>
                    </div>
                    <div class="guest-item">
                        <span style="color: var(--accent-color);">DIIV</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Artist</span>
                    </div>
                    <div class="guest-item">
                        <span style="color: var(--accent-color);">Mitski</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Artist</span>
                    </div>
                    <div class="guest-item">
                        <span style="color: var(--accent-color);">Deerhoof</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Artist</span>
                    </div>
                    <div class="guest-item">
                        <span style="color: var(--accent-color);">King Krule</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Artist</span>
                    </div>
                    <div class="guest-item">
                        <span style="color: var(--accent-color);">Big Thief</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Artist</span>
                    </div>
                    <div class="guest-item">
                        <span>Listener #9941</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Listener</span>
                    </div>
                    <div class="guest-item">
                        <span>Listener #8821</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Listener</span>
                    </div>
                    <div class="guest-item">
                        <span>Listener #1102</span>
                        <span style="font-size: 0.8rem; opacity: 0.6;">Listener</span>
                    </div>
                </div>
            </div>
            <!-- RIGHT: Simplified Profile Preview -->
            <div class="grid-item-nopad">
                <div class="profile-view" style="background-image: url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'); min-height: 300px;">
                    <div class="profile-content">
                        <span class="highlight-text" style="background:var(--accent-color);">Artist</span>
                        <div style="margin-top:5px;">
                            <span class="highlight-text profile-name" style="font-size: 2rem;">Ray Bull</span>
                        </div>
                        <span class="highlight-text" style="font-size: 1rem;">"Indie Pop duo from NYC fighting for fair pay."</span>
                    </div>
                </div>
            </div>
        </div>
</div>