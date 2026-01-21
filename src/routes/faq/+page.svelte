<svelte:head>
    <title>FAQ | Release party</title>
</svelte:head>

<div class="grid-container">
    <!-- PAGE HEADER -->
    <div class="grid-row">
        <div class="grid-item">
            <h1 class="text-huge">F.A.Q.</h1>
        </div>
    </div>

    <!-- Q+A ITEM: WHY SPOTIFY? -->
    <div class="grid-row grid-sidebar">
        <div class="grid-item">
            <h2 class="text-large" style="margin-bottom: 20px;">Why Spotify?</h2>
            <div class="qa-content">
                <p>Spotify is the architect of the current streaming paradigm. Other companies like Apple, YouTube, and Amazon don’t rely on their streaming services to support their business. Spotify is the achilles heel of the music industry. If we break their hold, we break the model.</p>
            </div>
        </div>
        <div class="grid-item-nopad sidebar-cell sidebar-dark">
            <div style="font-family: 'Courier New', monospace; font-weight: 700;">// TARGET_PRIMARY</div>
        </div>
    </div>

    <!-- Q+A ITEM: WHERE ARE WE GOING? -->
    <div class="grid-row grid-sidebar">
        <div class="grid-item">
            <h2 class="text-large" style="margin-bottom: 20px;">Where are we going?</h2>
            <div class="qa-content">
                <p>To be honest there is no clear answer. Artists have been left out of the conversation for far too long but we’re taking control imagining how our art can exist in the world uninhibited. We are moving to infrastructure that prioritizes artist ownership, direct payments, and ethical transparency. This isn't just about one competitor; it's about a diverse ecosystem of tools.</p>
                <p>Our "Alternatives" protocol recommends platforms like subvert.fm (for direct sales), Resonate (a stream-to-own co-op), and others that adhere to our core principles. See the full <a href="/exodus" class="text-accent" style="text-decoration: underline;">Alternatives</a> page for the vetted list.</p>
            </div>
        </div>
        <div class="grid-item-nopad sidebar-cell">
             <div class="sidebar-list">
                <div>[01] DIRECT_SALES</div>
                <div>[02] COOPERATIVES</div>
                <div>[03] P2P_PROTOCOLS</div>
                <div>[04] ETHICAL_STREAMS</div>
             </div>
        </div>
    </div>

    <!-- Q+A ITEM: EXPOSURE -->
    <div class="grid-row grid-sidebar">
        <div class="grid-item">
            <h2 class="text-large" style="margin-bottom: 20px;">Won’t I lose my exposure and audience if I leave?</h2>
            <div class="qa-content">
                <p>The "exposure" offered by major streaming platforms is often a trap. It provides passive listening metrics but rarely converts to sustainable income or active fan engagement. You are trading your labor for lottery tickets.</p>
                <p>By moving, you may lose passive algorithmic plays, but you will gain a deeper connection with active supporters who follow you to new platforms. 1,000 true fans on Bandcamp are worth more than 100,000 passive streams on Spotify. This is a shift from quantity to quality, and from dependence to sovereignty.</p>
            </div>
        </div>
        <div class="grid-item-nopad sidebar-cell">
             <div class="sidebar-data">
                <div class="data-row">
                    <span>PASSIVE_REACH</span>
                    <span>HIGH</span>
                </div>
                <div class="data-row">
                    <span>VALUE</span>
                    <span>LOW</span>
                </div>
                <div class="data-row" style="margin-top: 20px;">
                    <span>ACTIVE_REACH</span>
                    <span>LOW</span>
                </div>
                <div class="data-row">
                    <span>VALUE</span>
                    <span>HIGH</span>
                </div>
             </div>
        </div>
    </div>

    <!-- Q+A ITEM: STREAMS -->
    <div class="grid-row grid-sidebar">
        <div class="grid-item" style="border-bottom: none;">
            <h2 class="text-large" style="margin-bottom: 20px;">How do I find my total streams from last year?</h2>
            <div class="qa-content">
                <p>To pledge your streams accurately, you can find your 2025 totals in a few places:</p>
                <ul style="list-style: square; padding-left: 20px; margin-top: 10px;">
                    <li><strong>Spotify for Artists:</strong> Check your yearly wrap-up or analytics dashboard.</li>
                    <li><strong>Distributor Reports:</strong> Services like DistroKid, TuneCore, or CD Baby provide detailed breakdowns of your streams across all platforms.</li>
                    <li><strong>Royalty Statements:</strong> Your PRO (ASCAP, BMI, etc.) or label statements will also have this data.</li>
                </ul>
                <p>Estimates are acceptable for the pledge. The goal is to show collective leverage.</p>
            </div>
        </div>
        <div class="grid-item-nopad sidebar-cell" style="border-bottom: none;">
             <div class="sidebar-list">
                <div>> DISTRIBUTOR_LOGS</div>
                <div>> ROYALTY_STMTS</div>
                <div>> SPOTIFY_4_ARTISTS</div>
                <div>> ESTIMATES_OK</div>
             </div>
        </div>
    </div>
</div>

<style>
    .qa-content p {
        margin-bottom: 20px;
        line-height: 1.6;
        opacity: 0.9;
    }
    .qa-content ul li {
        margin-bottom: 10px;
        opacity: 0.9;
    }

    /* Sidebar Data Styles */
    .sidebar-cell {
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 250px; /* Ensure height on desktop */
    }

    .sidebar-dark {
        background: var(--text-color);
        color: var(--bg-color);
    }

    .sidebar-data, .sidebar-list {
        font-family: 'Courier New', monospace;
        font-weight: 700;
        font-size: 0.9rem;
        width: 100%;
    }

    .data-row {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid currentColor;
        padding: 8px 0;
    }

    .sidebar-list div {
        margin-bottom: 10px;
        opacity: 0.8;
    }

    @media(max-width: 900px) {
        .sidebar-cell {
            padding: 30px;
            min-height: auto; /* Let it shrink on mobile */
            border-bottom: 2px solid var(--line-color);
        }
    }
</style>
