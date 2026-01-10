<script>
    // Component-specific logic if needed
</script>

<svelte:head>
    <title>RELEASE PARTY | The Exodus</title>
    <meta name="description" content="We are leaving Spotify. A collective exodus to force a user-centric payment model.">
</svelte:head>

<!-- HERO SECTION (Flexbox for safety) -->
<div class="hero-flex-row">
    <div class="hero-title-box">
        <h1 class="text-huge">We Are<br/>Leaving<br/><span class="text-accent">Spotify.</span></h1>
    </div>
    <div class="hero-counter-box">
        <h3 style="margin-bottom: 20px;">The Countdown</h3>
        <div class="text-countdown" id="mainCounter">1.4B</div>
        <p style="font-weight: 700; margin-top: 10px;">Streams Pledged</p>
        <div style="margin-top: 20px; border-top: 2px solid #fff; padding-top: 10px;">
            Target: 50,000,000,000
        </div>
    </div>
</div>

<!-- CALL TO ACTION -->
<div class="grid-row grid-2-col">
    <div class="grid-item">
        <p class="text-large">Will you come with us?</p>
        <p style="margin-top: 20px;">We are building the leverage to force a fair deal. When the ticker hits the target, we launch the Release Party and move our music elsewhere.</p>
    </div>
    <div class="grid-item" style="gap: 20px;">
        <button class="btn" on:click={() => openModal('Artist')}>I am an Artist (Pledge Streams)</button>
        <button class="btn btn-outline" on:click={() => openModal('Listener')}>I am a Listener (Pledge Support)</button>
    </div>
</div>

<!-- THE VISION (Horizontal Scroll) -->
<div class="grid-row">
    <div class="grid-item" style="border-bottom: none; border-right: none;">
        <a href="/vision" class="nav-link"><h2 class="text-large">The Vision</h2></a>
        <div class="scroll-hint">Swipe to see more &rarr;</div>
    </div>
</div>

<div class="h-scroll-container">
    <div class="h-card">
        <span class="text-accent text-large">01.</span>
        <h3>User-Centric Payments</h3>
        <p style="margin-top: 20px;">Adopt a User-Centric Payment System (UCPS) to kill the bot economy and pay artists fairly based on fan dedication.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">02.</span>
        <h3>Ethical Divestment</h3>
        <p style="margin-top: 20px;">Complete divestment of corporate funds from military defense technology (Helsing) and ICE advertising.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">03.</span>
        <h3>Artist Safety Net</h3>
        <p style="margin-top: 20px;">A fixed percentage of revenue allocated to a collective fund for artist healthcare and mental health.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">04.</span>
        <h3>AI Consent</h3>
        <p style="margin-top: 20px;">No training generative AI models on our music without explicit, opt-in consent and compensation.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">05.</span>
        <h3>Ownership</h3>
        <p style="margin-top: 20px;">A future where artists own their data and their masters, not leased back to them by tech giants.</p>
    </div>
</div>

<!-- MANIFESTO / UCPS -->
<div class="grid-row grid-sidebar" id="manifesto">
    <div class="grid-item">
        <a href="/vision" class="nav-link"><h2 class="text-large" style="margin-bottom: 40px;">The Big Pot <span style="color: #999;">vs</span> <span class="text-accent">Fair Pay</span></h2></a>
        
        <div style="margin-bottom: 40px;">
            <h3>The Problem: Pro-Rata</h3>
            <p>Right now, your subscription money goes into a giant bucket. You are subsidizing artists you don't listen to.</p>
        </div>

        <div>
            <h3 class="text-accent">The Fix: User-Centric</h3>
            <p>We demand a model where <strong>your</strong> subscription fee goes to the artists <strong>you</strong> actually listen to. Simple. Fair. Anti-Fraud.</p>
            <br/>
            <p><em>"Data from the <a href="/resources" style="text-decoration: underline; font-weight: bold;">2023 Pro Musik Study</a> confirms that nearly 1 in 5 artists would see their revenue DOUBLE under this model."</em></p>
        </div>
    </div>
    <div class="grid-item-nopad">
        <div class="video-container">
            <div class="video-aspect-ratio">
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: #666; margin-bottom: 10px;">EXPLAINER VIDEO</h3>
                    <p style="font-size: 0.8rem; color: #666;">[ Vertical Video (9:16) ]<br/>User-Centric vs. Pro-Rata</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- GUEST LIST SECTION -->
<div class="grid-row grid-sidebar" id="guestlist">
    <div class="grid-item" style="background: #e5e3de;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; flex-wrap: wrap; gap:10px;">
            <div>
                <a href="/guest-list" class="nav-link"><h2 class="text-large">The Guest List</h2></a>
                <p style="font-size: 0.9rem;">Packed their bags.</p>
            </div>
            <input type="text" class="guest-search-input" placeholder="Search...">
        </div>
        <p>Featuring independent artists and listeners committed to fair pay and ethical streaming.</p>
        <ul style="list-style: disc; margin-left: 20px; margin-top: 15px;">
            <li>Ray Bull (Artist)</li>
            <li>DIIV (Artist)</li>
            <li>Mitski (Artist)</li>
            <li>Listener #9941 (Listener)</li>
        </ul>
        <p style="margin-top: 20px;"><a href="/guest-list" class="text-accent" style="font-weight: 700;">View full guest list &rarr;</a></p>
    </div>
    <div class="grid-item-nopad">
        <div class="profile-view" style="background-image: url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');">
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

<!-- THE EXODUS / DESTINATIONS -->
<div class="grid-row grid-sidebar" id="destinations">
    <div class="grid-item">
        <a href="/exodus" class="nav-link"><h2 class="text-large">The Exodus</h2></a>
        <p>When the Release happens, we aren't just disappearing. We are moving here. Support these ethical alternatives now.</p>
        
        <div class="destinations-grid">
            <a href="https://bandcamp.com" target="_blank" class="destination-link">Bandcamp</a>
            <a href="https://subvert.fm" target="_blank" class="destination-link">Subvert.fm</a>
            <a href="https://resonate.coop" target="_blank" class="destination-link">Resonate</a>
            <a href="https://www.qobuz.com" target="_blank" class="destination-link">Qobuz</a>
            <a href="https://tidal.com" target="_blank" class="destination-link">Tidal</a>
        </div>
    </div>
    <div class="grid-item" style="background: var(--text-color); color: var(--bg-color);">
        <h3>Tools</h3>
        <ul style="list-style: none; margin-top: 20px;">
            <li style="margin-bottom: 15px;"><a href="/resources" class="nav-link" style="text-decoration: underline; background: none; border: none; color: inherit; padding: 0;">Download Takedown Toolkit &darr;</a></li>
            <li style="margin-bottom: 15px;"><a href="/resources" class="nav-link" style="text-decoration: underline; background: none; border: none; color: inherit; padding: 0;">The Ethical Rider PDF &darr;</a></li>
            <li style="margin-bottom: 15px;"><a href="/resources" class="nav-link" style="text-decoration: underline;">Pro Musik Study &darr;</a></li>
        </ul>
    </div>
</div>

<!-- RESOURCES PREVIEW SECTION -->
<div class="grid-row" id="resources-preview">
    <div class="grid-item">
        <a href="/resources" class="nav-link"><h2 class="text-large">Resources</h2></a>
        <p style="margin-top: 20px;">Empowering artists and listeners with the tools and knowledge to navigate and transform the music industry.</p>
        <ul style="list-style: disc; margin-left: 20px; margin-top: 15px;">
            <li>The Takedown Toolkit: Your guide to reclaiming your music.</li>
            <li>The Ethical Rider: A legal framework for fair artist contracts.</li>
            <li>Pro Musik Study: Data supporting user-centric payment models.</li>
        </ul>
        <p style="margin-top: 20px;"><a href="/resources" class="text-accent" style="font-weight: 700;">Explore all resources &rarr;</a></p>
    </div>
</div>