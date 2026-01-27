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
        <h1 class="text-huge">LET'S DITCH <span class="text-accent">SPOTIFY</span> TOGETHER.</h1>
        <p class="hero-notice-text">
            We’re organizing a mass exodus of artists and listeners they can’t ignore.
        </p>
    </div>
</div>

<!-- LIVE TICKER SECTION -->
<div class="grid-row">
    <div class="hero-counter-box" style="border-right: none; width: 100%; gap: 40px; padding: 80px 20px;">
        
        <!-- CYCLING HEADER -->
        <h3 class="text-large ticker-header">
            <span>WHEN WE HIT</span>
            <span class="ticker-highlight">
                {#key tickerMode}
                    <span 
                        in:fly={{ y: 15, duration: 500, delay: 200, opacity: 0 }} 
                        out:fly={{ y: -15, duration: 500, opacity: 0 }}
                        class="ticker-item-transition"
                        style="color: var(--accent-color);"
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
        <button class="btn btn-join-hero" onclick={() => openModal()}>
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
                We know the reasons to leave: 
                <a href="https://freeyourmusic.com/blog/how-much-does-spotify-pay-per-stream" target="_blank" class="inline-link">the $0.003 payout per stream</a>, 
                <a href="https://www.rollingstone.com/music/music-news/ice-ads-all-over-streaming-services-spotify-hbo-pandora-1235447970/" target="_blank" class="inline-link">the ICE ads</a>, 
                <a href="https://pitchfork.com/news/spotify-facing-house-judiciary-committee-probe-over-discovery-mode/" target="_blank" class="inline-link">the “Discovery Mode” payola schemes</a>, 
                <a href="https://www.musicbusinessworldwide.com/spotify-ceo-daniel-ek-leads-690m-funding-round-for-ai-drone-manufacturer-helsing/" target="_blank" class="inline-link">the billion-dollar military AI investments</a>, 
                <a href="https://harpers.org/archive/2025/01/the-ghosts-in-the-machine-liz-pelly-spotify-musicians/" target="_blank" class="inline-link">the prioritization of “ghost artists,”</a> and 
                <a href="https://www.reuters.com/legal/litigation/lawsuit-claims-umg-cut-artists-royalties-under-secret-spotify-deal-2023-01-04/#:~:text=Black%20Sheep's%20attorneys%20and%20representatives,:23-cv-00015." target="_blank" class="inline-link">the secretive label deals.</a>
            </p>
            <p>
                Artists fear losing their hard-won audience, and listeners fear losing the convenience of the world’s largest library. If we trickle out, nothing changes. If we act as one giant bloc, we create a paradigm shift.
            </p>
            <p>
                <strong>This is a collective jailbreak.</strong> No one gets left behind and no one risks obscurity. When we move, we move together to a system that actually values the art we create and listen to.
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
<div class="grid-row">
    <div class="qa-wrapper">
        <!-- Questions Grid -->
        <div class="qa-grid">
            <div class="grid-item" style="border-right: 2px solid var(--line-color); border-bottom: none;">
                <h2 class="text-large" style="margin-bottom: 20px;">Why Spotify?</h2>
                <p>Spotify doesn’t exist without our music. We are targeting them because they are the face of algorithmic exploitation and systemic harm in music. If we break their hold, we break the model.</p>
            </div>
            <div class="grid-item" style="border-bottom: none; border-right: none;">
                <h2 class="text-large" style="margin-bottom: 20px;">Why wait?</h2>
                <p>By gathering our leverage first, we flip the power dynamic. The platforms need us. We don't need them. We prove that by moving together.</p>
            </div>
        </div>
        
        <!-- Footer / Button -->
        <div class="qa-footer">
            <a href="/faq" class="btn btn-outline" style="width: auto; padding: 20px 60px; font-size: 1.2rem;">Read full FAQ &rarr;</a>
        </div>
    </div>
</div>

<style>
    /* Responsive Header for Ticker */
    .ticker-header {
        text-align: center;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        white-space: nowrap;
        font-size: clamp(1rem, 5vw, 3rem);
    }

    .ticker-highlight {
        display: grid;
        place-items: center;
        width: 15ch;
        position: relative;
    }

    .ticker-item-transition {
        grid-area: 1 / 1;
        width: 100%;
        text-align: center;
    }

    /* Responsive Join Button */
    .btn-join-hero {
        width: auto;
        padding: 25px 80px;
        font-size: 1.5rem;
        margin-top: 20px;
        box-shadow: 10px 10px 0 var(--text-color);
    }

    .inline-link {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-thickness: 1px;
        transition: color 0.2s, text-decoration-color 0.2s;
    }

    .inline-link:hover {
        color: var(--accent-color);
        text-decoration-color: var(--accent-color);
    }

    /* FAQ Section Styles */
    .qa-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .qa-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
    }

    .qa-footer {
        border-top: 2px solid var(--line-color);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
    }

    /* Mobile adjustments */
    @media (max-width: 1100px) {
        .qa-grid {
            grid-template-columns: 1fr;
        }
        
        /* On mobile, the first item in qa-grid needs a bottom border and no right border */
        .qa-grid .grid-item:first-child {
            border-right: none !important;
            border-bottom: 2px solid var(--line-color) !important;
        }

        .ticker-header {
            white-space: normal; /* Allow wrapping on small screens */
            flex-direction: column;
            gap: 0; /* Remove gap to use line-height for equal spacing */
            font-size: clamp(1.5rem, 6vw, 3rem);
            line-height: 1.1;
            padding-left: 20px;
            padding-right: 20px;
        }

        .ticker-highlight {
            width: 100%; /* Take full width on wrap */
            margin: 0.2em 0; /* Consistent spacing */
        }

        .btn-join-hero {
            width: auto;
            min-width: 280px;
            padding: 20px 40px;
            font-size: 1.2rem;
            box-shadow: 5px 5px 0 var(--text-color);
        }
    }
</style>