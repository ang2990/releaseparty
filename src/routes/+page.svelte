<script>
    import { onMount } from 'svelte';
    import AttendeeRow from '$lib/components/AttendeeRow.svelte';
    import AttendeeCard from '$lib/components/AttendeeCard.svelte';
    import 'odometer/themes/odometer-theme-minimal.css';

    let { data } = $props();
    let attendees = $derived(data.attendees || []);

    let selectedAttendee = $state(null);
    
    // Ticker Logic
    let streamCount = $state(1450221161);
    let odometerElement;
    let showTooltip = $state(false);
    let progressWidth = $derived((streamCount / 50000000000) * 100);

    // Set initial selection
    $effect(() => {
        if (!selectedAttendee && attendees.length > 0) {
            selectedAttendee = attendees[0];
        }
    });

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
    <title>Release party | Home</title>
    <meta name="description" content="A coordinated effort to reclaim the music industry through direct action.">
</svelte:head>

<!-- HERO SECTION (PUBLIC NOTICE) -->
<div class="grid-row">
    <div class="hero-title-box">
        <h1 class="text-huge">We are leaving <span class="text-accent">Spotify.</span></h1>
        <p class="hero-notice-text">
            Major streaming platforms have built an industry that prioritizes corporate growth over creators and listeners. We're organizing a mass exit to secure direct control over our music and secure fair pay.
        </p>
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
                <div class="tooltip-header">Source: Verified 2024 data</div>
                <p>
                    This number represents the real-time collective count of streams pledged by artists joining the move.
                    <br><br>
                    <span class="text-accent" style="font-weight: 900;">Goal: 50,000,000,000</span>
                </p>
            </div>
        </div>

        <div class="progress-label">Streams pledged</div>
        
        <div class="progress-container">
            <div class="progress-bar" style="width: {progressWidth}%;"></div>
        </div>
    </div>
</div>

<!-- DIRECTIVE GRID -->
<div class="grid-row">
    <div class="grid-item" style="border-bottom: none;">
        <a href="/vision" class="nav-link"><h2 class="text-large">The vision &rarr;</h2></a>
    </div>
</div>
<div class="directive-grid">
    <div class="directive-item">
        <span class="directive-number">01.</span>
        <h3>User-centric payments</h3>
        <p>Current models pool subscription fees and distribute them based on platform totals. We're forcing a move toward systems where your money goes directly to the artists you actually listen to.</p>
    </div>
    <div class="directive-item">
        <span class="directive-number">02.</span>
        <h3>Ethical divestment</h3>
        <p>We demand that platforms stop investing music revenue in military technology and surveillance. This move is a direct action to stop funding systemic harm with our art.</p>
    </div>
    <div class="directive-item">
        <span class="directive-number">03.</span>
        <h3>Artist safety net</h3>
        <p>Artists lack basic labor protections. We're organizing to secure a percentage of platform revenue for a collective fund providing healthcare and mental health support.</p>
    </div>
    <div class="directive-item">
        <span class="directive-number">04.</span>
        <h3>AI consent</h3>
        <p>We require explicit, opt-in consent and fair pay for any use of artist likeness or creations to train AI models. We will not allow corporate algorithms to appropriate our work.</p>
    </div>
</div>

<!-- CALL TO ACTION -->
<div class="grid-row grid-2-col">
    <div class="grid-item">
        <h2 class="text-large">We're building leverage to get a better deal.</h2>
        <p style="margin-top: 20px;">When the ticker hits the goal, we move our music to fairer infrastructure. Join the list to coordinate our next steps.</p>
    </div>
    
    <div class="grid-item" style="justify-content: center;">
        <h2 class="text-large" style="margin-bottom: 30px; text-transform: uppercase;">Will you join us?</h2>
        <div style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
            <button class="btn" onclick={() => openModal('ARTIST')}>I am an artist (Pledge streams)</button>
            <button class="btn btn-outline" onclick={() => openModal('LISTENER')}>I am a listener (Pledge support)</button>
        </div>
    </div>
</div>

<!-- ORGANIZING STEPS -->
<div class="grid-row">
    <div class="grid-item">
        <a href="/resources" class="nav-link"><h2 class="text-large">Next steps &rarr;</h2></a>
        <div class="organizing-steps" style="margin-top: 40px;">
            <div class="step-row">
                <span class="step-number">01</span>
                <div class="step-content">
                    <h4>Register your support</h4>
                    <p>Add your name or catalog to our list to increase our collective leverage.</p>
                </div>
                <button class="btn btn-outline" style="padding: 10px 20px; width: auto;" onclick={() => openModal('ARTIST')}>Join now</button>
            </div>
            <div class="step-row">
                <span class="step-number">02</span>
                <div class="step-content">
                    <h4>Spread the data</h4>
                    <p>Share the 2023 Pro Musik study to show why user-centric payments are necessary.</p>
                </div>
                <a href="/resources" class="btn btn-outline" style="padding: 10px 20px; width: auto;">Get study</a>
            </div>
            <div class="step-row" style="border-bottom: none;">
                <span class="step-number">03</span>
                <div class="step-content">
                    <h4>Prepare the move</h4>
                    <p>Review the Migration Protocol to understand where we're moving and why.</p>
                </div>
                <a href="/exodus" class="btn btn-outline" style="padding: 10px 20px; width: auto;">The move</a>
            </div>
        </div>
    </div>
</div>

<!-- GUEST LIST -->
<div class="grid-row grid-sidebar" id="guestlist">
    <div class="grid-item" style="background: var(--bg-color);">
        <div class="attendee-header">
            <div>
                <a href="/guest-list" class="nav-link"><h2 class="text-large">Guest list &rarr;</h2></a>
                <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// Verified joining artists</p>
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