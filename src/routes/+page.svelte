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
    const revenueCount = $derived(Math.floor((data.totalListenerValue || 0) * 12));
    
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
        <h1 class="text-huge">We are leaving <span class="text-accent">Spotify</span> together. <br>Join the pact.</h1>
        <p class="hero-notice-text">
            We’re organizing a mass exodus of artists and listeners they can’t ignore.
        </p>
    </div>
</div>

<!-- LIVE TICKER SECTION -->
<div class="grid-row">
    <div class="hero-counter-box" style="border-right: none; width: 100%; gap: 60px; padding: 80px 20px;">
        
        <!-- STREAMS PLEDGED -->
        <div 
            style="position: relative; display: flex; flex-direction: column; align-items: center;"
            onmouseenter={() => showTooltip = true}
            onmouseleave={() => showTooltip = false}
            role="region"
            aria-label="Live stream count"
        >
            <Ticker value={streamCount} />
            <div class="progress-label" style="margin-top: 20px;">STREAMS TO BE REMOVED</div>
            
            <div class="tooltip" class:visible={showTooltip}>
                <div class="tooltip-header">Source: Verified 2024 data</div>
                <p>
                    This number represents the real-time collective count of streams pledged by artists joining the move.
                    <br><br>
                    <span class="text-accent" style="font-weight: 900;">Goal: 50,000,000,000</span>
                </p>
            </div>
        </div>

        <!-- REVENUE CANCELLED -->
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="text-accent" style="font-family: var(--font-heading); font-weight: 900; font-size: clamp(2.5rem, 8vw, 10rem); line-height: 0.9;">$</span>
                <Ticker value={revenueCount} />
            </div>
            <div class="progress-label" style="margin-top: 20px;">ANNUAL REVENUE TO BE CANCELLED</div>
        </div>

        <!-- PROGRESS BAR (Global) -->
        <div class="progress-container" style="margin-top: 40px;">
            <div class="progress-bar" style="width: {progressWidth}%;"></div>
        </div>
    </div>
</div>

<!-- MAIN CTA BUTTON -->
<div class="grid-row">
    <div class="grid-item" style="border-bottom: none; align-items: center; padding: 60px 40px;">
        <button class="btn" style="width: auto; padding: 25px 60px; font-size: 1.2rem;" onclick={() => openModal()}>
            Make it official. [ Join the Pact ]
        </button>
    </div>
</div>

<!-- MANIFESTO SECTION (Combined Vision) -->
<div class="grid-row">
    <div class="grid-item" style="padding: 80px 40px;">
        <h2 class="text-large">MUSIC IS NOT A <span class="text-accent">UTILITY.</span></h2>
        <p style="margin-top: 30px; font-size: 1.5rem; line-height: 1.4; max-width: 45ch;">
            The current streaming model is designed to extract value, not support art. We demand fair pay, ethical standards, and direct control over our future.
        </p>
        <a href="/vision" class="nav-link" style="margin-top: 40px; display: inline-block; font-size: 1.2rem;">Read the full demands &rarr;</a>
    </div>
</div>

<!-- WHO'S JOINING (Guest List) -->
<div class="grid-row grid-sidebar" id="guestlist">
    <div class="grid-item" style="background: var(--bg-color); display: flex; flex-direction: column; height: 100%;">
        <div class="attendee-header">
            <div>
                <a href="/guest-list" class="nav-link"><h2 class="text-large">Who’s Joining</h2></a>
                <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// Verified Coalition Members</p>
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