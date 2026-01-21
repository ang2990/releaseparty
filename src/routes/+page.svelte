<script>
    import { onMount } from 'svelte';
    import AttendeeRow from '$lib/components/AttendeeRow.svelte';
    import AttendeeCard from '$lib/components/AttendeeCard.svelte';
    import Ticker from '$lib/components/Ticker.svelte'; // Import the new Ticker

    let { data } = $props();
    let attendees = $derived(data.attendees || []);

    let selectedAttendee = $state(null);
    
    // Ticker Logic - Use live total from server or fallback to 0
    const streamCount = $derived(data.totalStreams || 0); 
    let showTooltip = $state(false);
    const progressWidth = $derived((streamCount / 50000000000) * 100);

    // Set initial selection
    $effect(() => {
        if (attendees.length > 0) {
            if (!selectedAttendee || !attendees.find(a => a.id === selectedAttendee.id)) {
                selectedAttendee = attendees[0];
            }
        } else {
            selectedAttendee = null;
        }
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
            <Ticker value={streamCount} />
            
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
            <div class="progress-overlay-text">When we hit 50 billion streams we’re leaving Spotify.</div>
        </div>
    </div>
</div>

<!-- CALL TO ACTION & EXPLAINER (Moved here) -->
<div class="grid-row grid-2-col">
    <div class="grid-item">
        <h2 class="text-large">We’re uniting artists to demand a new reality in music.</h2>
        <p style="margin-top: 20px;">When we hit our target, we move our music to fairer infrastructure. Pledge your streams and support to break free from the boring world they’ve built.</p>
    </div>
    
    <div class="grid-item" style="justify-content: center;">
        <h2 class="text-large" style="margin-bottom: 30px; text-transform: uppercase;">Will you join us?</h2>
        <div style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
            <button class="btn" onclick={() => openModal('ARTIST')}>I am an artist (Pledge streams)</button>
            <button class="btn btn-outline" onclick={() => openModal('LISTENER')}>I am a listener (Pledge support)</button>
        </div>
    </div>
</div>

<!-- DIRECTIVE GRID -->
<div class="directive-grid">
    <div class="directive-item" style="border-bottom: none; justify-content: center;">
        <a href="/vision" class="nav-link"><h2 class="text-huge" style="line-height: 0.8;">The<br>vision</h2></a>
    </div>
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
        <h3>AI consent</h3>
        <p>We require explicit, opt-in consent and fair pay for any use of artist likeness or creations to train AI models. We will not allow corporate algorithms to appropriate our work.</p>
    </div>
</div>

<!-- GUEST LIST -->
<div class="grid-row grid-sidebar" id="guestlist">
    <div class="grid-item" style="background: var(--bg-color); display: flex; flex-direction: column; height: 100%;">
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
        {#if selectedAttendee}
            <AttendeeCard {...selectedAttendee} />
        {/if}
    </div>
</div>

<!-- Q+A PREVIEW SECTION -->
<div class="grid-row grid-2-col">
    <div class="grid-item" style="border-bottom: none;">
        <h2 class="text-large" style="margin-bottom: 20px;">Why Spotify?</h2>
        <p>Spotify doesn’t exist without our music. We are targeting them because they are the face of algorithmic exploitation and systemic harm in music. If we break their hold, we break the model.</p>
        <a href="/faq" class="btn btn-outline" style="margin-top: 30px; display: inline-block; width: auto; padding: 15px 30px;">Read full FAQ &rarr;</a>
    </div>
    <div class="grid-item" style="border-bottom: none; background: var(--text-color); color: var(--bg-color); display: flex; align-items: center; justify-content: center;">
        <h2 class="text-huge" style="color: var(--accent-color);">?</h2>
    </div>
</div>