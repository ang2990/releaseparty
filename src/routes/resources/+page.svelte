<svelte:head>
    <title>Resources | Release party</title>
</svelte:head>

<div class="grid-container">
    <div class="grid-row">
        <div class="grid-item">
            <h1 class="text-huge">Resources</h1>
            <p class="text-large" style="margin-top: 20px;">Guides and data to help you move away from major streaming platforms.</p>
        </div>
    </div>

    <!-- RESOURCE GRID -->
    <div class="resource-grid">
        <!-- TAKEDOWN TOOLKIT -->
        <div class="resource-card">
            <div>
                <h2 class="text-large">Takedown toolkit</h2>
                <p style="margin-top: 20px;">A specific guide for independent artists using distributors like DistroKid or TuneCore. Includes templates and contact lists.</p>
            </div>
            <button class="btn" style="margin-top: 20px;">Download toolkit &darr;</button>
        </div>

        <!-- ETHICAL RIDER -->
        <div class="resource-card">
            <div>
                <h2 class="text-large">The ethical rider</h2>
                <p style="margin-top: 20px;">A legal addendum for future contracts. Protects your work from AI training and ensures data transparency rights.</p>
            </div>
            <button class="btn" style="margin-top: 20px;">Download rider PDF &darr;</button>
        </div>

        <!-- UMAW -->
        <div class="resource-card">
            <div>
                <h2 class="text-large">UMAW</h2>
                <p style="margin-top: 20px;">The Union of Musicians and Allied Workers. Join the collective fight for a more just music industry.</p>
            </div>
            <a href="https://weareumaw.org/" target="_blank" class="btn" style="margin-top: 20px;">Join UMAW &rarr;</a>
        </div>
    </div>

    <!-- READING LIST -->
    <div class="grid-row">
        <div class="grid-item">
            <h2 class="text-large">Reading list</h2>
            <div class="reading-list" style="margin-top: 40px;">
                <a href="https://greenlightbookstore.com/book/9781668083505" target="_blank" class="reading-item">
                    <span class="font-mono">"Mood Machine"</span>
                    <span class="text-accent">— Liz Pelly</span>
                </a>
                <a href="https://www.ucpress.edu/books/derivative-media/paper" target="_blank" class="reading-item">
                    <span class="font-mono">"Derivative Media"</span>
                    <span class="text-accent">— Andrew DeWaard</span>
                </a>
                <a href="https://paymentoptiontransparency.com/pdfs/en-US/Payment%20Option%20Study.pdf" target="_blank" class="reading-item">
                    <span class="font-mono">"Payment Option Transparency"</span>
                    <span class="text-accent">— The Pro Musik Study</span>
                </a>
                <a href="https://impalamusic.org/wp-content/uploads/2025/06/Combating-the-Emergence-of-a-Two-Tier-Industry-for-release.pdf" target="_blank" class="reading-item">
                    <span class="font-mono">"Combating the Emergence of a Two-Tier Music Streaming Market"</span>
                    <span class="text-accent">— IMPALA Report</span>
                </a>
                <a href="https://www.mediekultur.dk/article/view/121216" target="_blank" class="reading-item">
                    <span class="font-mono">"Datafication and the Push for Ubiquitous Listening"</span>
                    <span class="text-accent">— Rasmus Rex Pedersen</span>
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    /* Resource Grid Styles */
    .resource-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        border-bottom: 2px solid var(--line-color);
    }

    .resource-card {
        padding: 40px;
        border-right: 2px solid var(--line-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 400px;
    }

    /* Remove right border for the last item in a row if needed, 
       but standard grid usually keeps them. 
       We can remove border-right on mobile. */
    
    @media(max-width: 900px) {
        .resource-card {
            border-right: none;
            border-bottom: 2px solid var(--line-color);
        }
        .resource-card:last-child {
            border-bottom: none;
        }
    }

    .reading-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .reading-item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        font-size: 1.1rem;
        font-weight: 700;
        text-decoration: none;
        transition: opacity 0.2s;
    }
    .reading-item:hover {
        opacity: 0.6;
        border-bottom-color: var(--accent-color);
    }
    @media(max-width: 900px) {
        .reading-item {
            flex-direction: column;
            gap: 5px;
        }
    }
</style>