<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import AttendeeRow from '$lib/components/AttendeeRow.svelte';
    import AttendeeCard from '$lib/components/AttendeeCard.svelte';
    import Ticker from '$lib/components/Ticker.svelte'; 

    let { data } = $props();
    let attendees = $derived(data.attendees || []);

    let selectedAttendee = $state(null);
    
    // Ticker Logic
    const streamCount = $derived(data.totalStreams || 0);
    const revenueCount = $derived(Math.floor((data.totalListenerValue || 0) * 12));
    
    // Cycle between 'STREAMS' and 'REVENUE'
    let tickerMode = $state('STREAMS'); 
    let currentTickerValue = $derived(tickerMode === 'STREAMS' ? streamCount : revenueCount);
    
    // Auto-cycle every 8 seconds
    onMount(() => {
        const interval = setInterval(() => {
            tickerMode = tickerMode === 'STREAMS' ? 'REVENUE' : 'STREAMS';
        }, 8000);
        return () => clearInterval(interval);
    });

    let showTooltip = $state(false);

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
        <h1 class="text-huge">WE ARE LEAVING <span class="text-accent">SPOTIFY</span> TOGETHER. <br>JOIN THE PARTY.</h1>
        <p class="hero-notice-text">
            We’re organizing a mass exodus of artists and listeners they can’t ignore.
        </p>
    </div>
</div>

<!-- LIVE TICKER SECTION -->
<div class="grid-row">
    <div class="hero-counter-box" style="border-right: none; width: 100%; gap: 40px; padding: 80px 20px;">
        
        <!-- CYCLING HEADER -->
        <h3 class="text-large" style="text-align: center; margin-bottom: 20px; display: flex; justify-content: center; align-items: center; gap: 0.2em; white-space: nowrap; font-size: clamp(1rem, 5vw, 3rem);">
            <span>WHEN WE HIT</span>
            <span style="display: grid; place-items: center; width: 15ch; position: relative; height: 1em;">
                {#key tickerMode}
                    <span 
                        in:fly={{ y: 15, duration: 500, delay: 200, opacity: 0 }} 
                        out:fly={{ y: -15, duration: 500, opacity: 0 }}
                        style="color: var(--accent-color); position: absolute; width: 100%; text-align: center;"
                    >
                        {tickerMode === 'STREAMS' ? '50 BILLION STREAMS' : '50 MILLION DOLLARS'}
                    </span>
                {/key}
            </span>
            <span>WE LEAVE.</span>
        </h3>

        <!-- CYCLING TICKER -->
        <div 
            style="position: relative; display: flex; flex-direction: column; align-items: center; min-height: 120px; justify-content: center;"
            role="region"
            aria-label="Live stats"
        >
            <div style="display: flex; align-items: center; gap: 10px;">
                <Ticker value={currentTickerValue} prefix={tickerMode === 'REVENUE' ? '$' : ''} />
            </div>

            <!-- Use a wrapper to contain the label transitions without absolute positioning causing overlaps -->
            <div style="height: 30px; position: relative; width: 100%; display: flex; justify-content: center; margin-top: 10px;">
                {#key tickerMode}
                    <div 
                        in:fly={{ y: 10, duration: 300, delay: 300 }}
                        out:fly={{ y: -10, duration: 300 }}
                        class="progress-label" 
                        style="position: absolute;"
                    >
                        {tickerMode === 'STREAMS' ? 'Artist Streams Pledged to Be Removed' : 'Listener Dollars Pledged to be cancelled'}
                    </div>
                {/key}
            </div>
        </div>

        <!-- JOIN BUTTON (Integrated) -->
        <button class="btn" style="width: auto; padding: 25px 80px; font-size: 1.5rem; margin-top: 20px; box-shadow: 10px 10px 0 var(--text-color);" onclick={() => openModal()}>
            Join The Party
        </button>
    </div>
</div>

<!-- MANIFESTO SECTION (Combined Vision) -->
<div class="grid-row grid-2-col">
    <!-- LEFT: HEADER & INTRO -->
    <div class="grid-item" style="padding: 80px 40px; border-bottom: none;">
        <h2 class="text-large" style="position: sticky; top: 40px; margin-bottom: 30px;">MUSIC IS NOT A <span class="text-accent">UTILITY.</span></h2>
        
        <div style="font-size: 1.1rem; line-height: 1.6; display: flex; flex-direction: column; gap: 20px;">
            <p>
                We know the reasons to leave: the $0.003 payout per stream, the ICE ads, the “Discovery Mode” payola schemes, the billion dollar military AI investments, the prioritization of “ghost artists,” and the secretive label deals.
            </p>
            <p>
                Artists fear losing their hard-won audience, and listeners fear losing the convenience of the world’s largest library. But long as we act as individuals we are powerless.
            </p>
            <p>
                <strong>This is a collective jailbreak.</strong> If we trickle out, nothing changes. But if we act as one giant bloc, we create a paradigm shift. No one gets left behind, and no one risks obscurity. When we move, we move together to a system that actually values the art we create and listen to.
            </p>
        </div>

        <a href="/vision" class="nav-link" style="margin-top: 40px; display: inline-block; font-size: 1.2rem;">Read the full vision &rarr;</a>
    </div>

    <!-- RIGHT: VISION POINTS -->
    <div class="grid-item" style="border-bottom: none; background: var(--text-color); color: var(--bg-color);">
        <div style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h3 class="text-accent" style="margin-bottom: 10px;">01. FAIR PAY</h3>
                <p style="font-size: 1rem; opacity: 0.9;">User-centric payments that reward fan dedication, not passive volume.</p>
            </div>
            <div>
                <h3 class="text-accent" style="margin-bottom: 10px;">02. ETHICAL INFRASTRUCTURE</h3>
                <p style="font-size: 1rem; opacity: 0.9;">Divestment from military technology and surveillance.</p>
            </div>
            <div>
                <h3 class="text-accent" style="margin-bottom: 10px;">03. AI CONSENT</h3>
                <p style="font-size: 1rem; opacity: 0.9;">Strict protections against unauthorized training on our catalogs.</p>
            </div>
            <div>
                <h3 class="text-accent" style="margin-bottom: 10px;">04. DATA SOVEREIGNTY</h3>
                <p style="font-size: 1rem; opacity: 0.9;">Full transparency and the right to take our fanbase with us.</p>
            </div>
            <div>
                <h3 class="text-accent" style="margin-bottom: 10px;">05. PLATFORMS FOR PEOPLE</h3>
                <p style="font-size: 1rem; opacity: 0.9;">Built for connection, not consumption and algorithmic wallpaper.</p>
            </div>
        </div>
    </div>
</div>

<!-- WHO'S JOINING (Guest List) -->
<div class="grid-row grid-sidebar" id="guestlist">
    <div class="grid-item" style="background: var(--bg-color); display: flex; flex-direction: column; height: 100%;">
        <div class="attendee-header">
            <div>
                <a href="/guest-list" class="nav-link"><h2 class="text-large">Guest List</h2></a>
                <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// Top 20 Artists & Recent Listeners</p>
            </div>
            <a href="/guest-list" class="font-mono" style="text-decoration: underline; font-weight: 700;">view full list -></a>
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