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
        const Odometer = (await import('odometer')).default;
        
        const el = document.getElementById('odometer');
        const odometer = new Odometer({
            el: el,
            value: streamCount,
            format: '(,ddd)',
            theme: 'minimal',
            duration: 2000
        });

        const interval = setInterval(() => {
            const increment = Math.floor(Math.random() * 150) + 50;
            streamCount += increment;
            odometer.update(streamCount);
        }, 3000); 

        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    <title>Release party | The exodus</title>
    <meta name="description" content="We're leaving Spotify to support better payment models for artists.">
</svelte:head>

<!-- HERO SECTION -->
<div class="grid-row">
    <div class="hero-title-box" style="border-right: none;">
        <h1 class="text-huge">We are leaving <span class="text-accent">Spotify.</span></h1>
    </div>
</div>

<!-- LIVE TICKER SECTION -->
<div class="grid-row">
    <div class="hero-counter-box" style="border-right: none; width: 100%;">
        <div 
            style="position: relative; display: inline-block;"
            onmouseenter={() => showTooltip = true}
            onmouseleave={() => showTooltip = false}
            role="region"
            aria-label="Live stream count"
        >
            <div id="odometer" class="progress-value odometer">1450221161</div>
            
            <div class="tooltip" class:visible={showTooltip}>
                <div class="tooltip-header">Source: Verified data</div>
                <p>
                    This is the total number of streams pledged by artists who are joining the exodus.
                    <br><br>
                    <span class="text-accent" style="font-weight: 900;">Goal: 50,000,000,000 streams</span>
                </p>
            </div>
        </div>

        <div class="progress-label">Streams pledged</div>
        
        <div class="progress-container">
            <div class="progress-bar" style="width: {progressWidth}%;"></div>
        </div>
    </div>
</div>

<!-- CALL TO ACTION -->
<div class="grid-row grid-2-col">
    <div class="grid-item">
        <h2 class="text-large" style="line-height: 1.1;">
            We're building leverage to get a better deal for artists. 
            <span class="text-accent">When we hit our goal, we'll move our music to other platforms.</span>
        </h2>
    </div>
    
    <div class="grid-item" style="justify-content: center;">
        <p class="text-large" style="margin-bottom: 30px;">Will you come with us?</p>
        <div style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
            <button class="btn" onclick={() => openModal('ARTIST')}>I am an artist (Pledge streams)</button>
            <button class="btn btn-outline" onclick={() => openModal('LISTENER')}>I am a listener (Pledge support)</button>
        </div>
    </div>
</div>

<!-- THE VISION (Horizontal Scroll) -->
<div class="grid-row">
    <div class="grid-item" style="border-bottom: none; border-right: none;">
        <a href="/vision" class="nav-link"><h2 class="text-large">The vision</h2></a>
        <div class="scroll-hint">Swipe to see more &rarr;</div>
    </div>
</div>

<div class="h-scroll-container">
    <div class="h-card">
        <span class="text-accent text-large">01.</span>
        <h3>User-centric payments</h3>
        <p style="margin-top: 20px;">We want subscription fees to go directly to the artists you actually listen to, instead of being pooled and shared based on platform totals.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">02.</span>
        <h3>Ethical divestment</h3>
        <p style="margin-top: 20px;">We're asking platforms to stop investing in military technology and companies that fund border surveillance.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">03.</span>
        <h3>Artist safety net</h3>
        <p style="margin-top: 20px;">We want a portion of revenue to go into a fund that helps artists pay for healthcare and mental health support.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">04.</span>
        <h3>AI consent</h3>
        <p style="margin-top: 20px;">AI models shouldn't be trained on an artist's work without their permission and fair pay.</p>
    </div>
    <div class="h-card">
        <span class="text-accent text-large">05.</span>
        <h3>Ownership</h3>
        <p style="margin-top: 20px;">Artists should own their masters, their data, and have full control over their work.</p>
    </div>
</div>

<!-- VISION / UCPS -->
<div class="grid-row grid-sidebar" id="vision">
    <div class="grid-item">
        <a href="/vision" class="nav-link"><h2 class="text-large" style="margin-bottom: 40px;">Pooling vs <span class="text-accent">fair pay</span></h2></a>
        
        <div style="margin-bottom: 40px;">
            <h3>The problem with pro-rata</h3>
            <p>Right now, your subscription money goes into one big bucket. This means you often end up paying for music you never listen to.</p>
        </div>

        <div>
            <h3 class="text-accent">The user-centric fix</h3>
            <p>We want a model where your money goes to the artists you choose. It's fairer and makes it harder for bots to take a cut.</p>
            <br/>
            <p>Data from the <a href="/resources" style="text-decoration: underline; font-weight: bold;">2023 Pro Musik Study</a> shows that almost 20% of artists would double their revenue under this system.</p>
        </div>
    </div>
    <div class="grid-item-nopad">
        <div class="video-container">
            <div class="video-aspect-ratio">
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: #666; margin-bottom: 10px;">Video guide</h3>
                    <p style="font-size: 0.8rem; color: #666;">How user-centric payments work compared to the current system.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ATTENDEE LIST -->
<div class="grid-row grid-sidebar" id="guestlist">
    <div class="grid-item" style="background: var(--bg-color);">
        <div class="attendee-header">
            <div>
                <h2 class="text-large">Attendees</h2>
                <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// Active group 001</p>
            </div>
            <a href="/guest-list" class="font-mono" style="text-decoration: underline; font-weight: 700;">Full list -></a>
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
    
    <div class="grid-item-nopad">
        <AttendeeCard {...selectedAttendee} />
    </div>
</div>

<!-- THE EXODUS / DESTINATIONS -->
<div class="grid-row grid-sidebar" id="destinations">
    <div class="grid-item">
        <a href="/exodus" class="nav-link"><h2 class="text-large">The exodus</h2></a>
        <p>When the release happens, we'll move our music to these platforms. You can support them now.</p>
        
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
            <li style="margin-bottom: 15px;"><a href="/resources" class="nav-link" style="text-decoration: underline; background: none; border: none; color: inherit; padding: 0;">Takedown toolkit</a></li>
            <li style="margin-bottom: 15px;"><a href="/resources" class="nav-link" style="text-decoration: underline; background: none; border: none; color: inherit; padding: 0;">The ethical rider</a></li>
            <li style="margin-bottom: 15px;"><a href="/resources" class="nav-link" style="text-decoration: underline;">Pro Musik study</a></li>
        </ul>
    </div>
</div>

<!-- RESOURCES PREVIEW SECTION -->
<div class="grid-row" id="resources-preview">
    <div class="grid-item">
        <a href="/resources" class="nav-link"><h2 class="text-large">Resources</h2></a>
        <p style="margin-top: 20px;">We're putting together tools to help artists and listeners change how the music industry works.</p>
        <ul style="list-style: disc; margin-left: 20px; margin-top: 15px;">
            <li>The takedown toolkit: A guide to removing your music from platforms.</li>
            <li>The ethical rider: Contracts that prioritize fair treatment for artists.</li>
            <li>Pro Musik study: Research on payment models.</li>
        </ul>
        <p style="margin-top: 20px;"><a href="/resources" class="text-accent" style="font-weight: 700;">All resources &rarr;</a></p>
    </div>
</div>