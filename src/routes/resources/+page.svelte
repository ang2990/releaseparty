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

        <div class="grid-row">
            <div class="grid-item">
                <h2 class="text-large">Takedown toolkit</h2>
                <p style="margin-top: 20px;">This guide is specifically for independent artists who use distributors like DistroKid, TuneCore, etc. It helps you remove your music from major streaming services. It includes templates for takedown notices, contact info for labels and distributors, and advice on handling the removal process.</p>
                <button class="btn" style="margin-top: 20px;">Download toolkit &darr;</button>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-item">
                <h2 class="text-large">The ethical rider</h2>
                <p style="margin-top: 20px;">This rider exists because many signed artists are currently contractually barred from removing their music from specific platforms. The rider is a tool for future negotiations: if labels refuse to listen to current demands, we collectively agree to include this clause in all future deals to guarantee the right to digital disassociation for ethical reasons.</p>
                <button class="btn" style="margin-top: 20px;">Download rider PDF &darr;</button>
            </div>
        </div>
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