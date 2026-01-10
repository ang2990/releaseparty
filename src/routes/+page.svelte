<script>
    import { onMount } from 'svelte';
    import AttendeeRow from '$lib/components/AttendeeRow.svelte';
    import AttendeeCard from '$lib/components/AttendeeCard.svelte';
    import 'odometer/themes/odometer-theme-minimal.css';

    let attendees = [
        { id: "041", name: "Ray Bull", role: "ARTIST", image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", isAccent: true },
        { id: "042", name: "DIIV", role: "ARTIST", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "043", name: "Mitski", role: "ARTIST", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "891", name: "Listener 891", role: "LISTENER", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "892", name: "Listener 892", role: "LISTENER", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
    ];

    let selectedAttendee = $state(attendees[0]);
    
    // Ticker Logic
    let streamCount = $state(1450221161);
    let odometerElement;
    let showTooltip = $state(false);
    let progressWidth = $derived((streamCount / 50000000000) * 100);

    onMount(async () => {
        // Dynamic import for client-side only library
        const Odometer = (await import('odometer')).default;
        
        const el = document.getElementById('odometer');
        const odometer = new Odometer({
            el: el,
            value: streamCount,
            format: '(,ddd)',
            theme: 'minimal',
            duration: 2000 // Slower animation
        });

        const interval = setInterval(() => {
            // Simulate live streams coming in
            const increment = Math.floor(Math.random() * 150) + 50; // Larger increment for visibility
            streamCount += increment;
            odometer.update(streamCount);
        }, 3000); 

        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    <title>RELEASE PARTY | The Exodus</title>
    <meta name="description" content="We are leaving Spotify. A collective exodus to force a user-centric payment model.">
</svelte:head>

<!-- HERO SECTION -->
<div class="grid-row">
    <div class="hero-title-box" style="border-right: none;">
        <h1 class="text-huge">We Are Leaving <span class="text-accent">Spotify.</span></h1>
    </div>
</div>

<!-- LIVE TICKER SECTION -->
<div class="grid-row">
    <div class="hero-counter-box" style="border-right: none; width: 100%;">
        <!-- TOOLTIP WRAPPER -->
        <div 
            style="position: relative; display: inline-block;"
            onmouseenter={() => showTooltip = true}
            onmouseleave={() => showTooltip = false}
            role="region"
            aria-label="Live Stream Count"
        >
            <div id="odometer" class="progress-value odometer">1450221161</div>
            
            <!-- TOOLTIP -->
            <div class="tooltip" class:visible={showTooltip}>
                <div class="tooltip-header">DATA_SOURCE: VERIFIED</div>
                <p>
                    This number represents the real-time collective count of streams pledged by artists joining the Exodus.
                    <br><br>
                    <span class="text-accent" style="font-weight: 900;">TARGET: 50,000,000,000</span>
                </p>
            </div>
        </div>

        <div class="progress-label">Streams Pledged</div>
        
        <div class="progress-container">
            <div class="progress-bar" style="width: {progressWidth}%;"></div>
        </div>
    </div>
</div>

<!-- CALL TO ACTION -->
<div class="grid-row grid-2-col">
    <!-- LEFT: THE PITCH -->
    <div class="grid-item">
        <h2 class="text-large" style="line-height: 1.1;">
            We are building the leverage to force a fair deal. 
            <span class="text-accent">When the ticker hits the target, we launch the Release Party and move our music elsewhere.</span>
        </h2>
    </div>
    
    <!-- RIGHT: THE CHOICE -->
    <div class="grid-item" style="justify-content: center;">
        <p class="text-large" style="margin-bottom: 30px;">Will you come with us?</p>
        <div style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
            <button class="btn" onclick={() => openModal('ARTIST')}>I am an Artist (Pledge Streams)</button>
            <button class="btn btn-outline" onclick={() => openModal('LISTENER')}>I am a Listener (Pledge Support)</button>
        </div>
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

<!-- VISION / UCPS -->
<div class="grid-row grid-sidebar" id="vision">
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

<!-- ATTENDEE LIST -->
<div class="grid-row grid-sidebar" id="guestlist">
    <!-- LEFT: THE ATTENDEE LIST -->
    <div class="grid-item" style="background: var(--bg-color);">
        <div class="attendee-header">
            <div>
                <h2 class="text-large">Attendees</h2>
                <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// BATCH_001_ACTIVE</p>
            </div>
            <a href="/guest-list" class="font-mono" style="text-decoration: underline; font-weight: 700;">FULL_LIST -></a>
        </div>
        
        <div class="attendee-list">
            {#each attendees as attendee}
                <AttendeeRow 
                    {...attendee} 
                    onhover={() => selectedAttendee = attendee}
                />
            {/each}
        </div>
    </div>
    
    <!-- RIGHT: THE TICKET / ID CARD -->
    <div class="grid-item-nopad">
        <AttendeeCard {...selectedAttendee} />
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