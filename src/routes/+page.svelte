<script>
    import { onMount } from 'svelte';

    let guests = [
        { name: "Ray Bull", type: "Artist", image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Indie Pop duo from NYC fighting for fair pay.", links: [{name: "Bandcamp", url: "#"}, {name: "Instagram", url: "#"}] },
        { name: "DIIV", type: "Artist", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Shoegaze legends. Pledged entire catalog.", links: [{name: "Website", url: "#"}] },
        { name: "Mitski", type: "Artist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Be the cowboy. Leave the platform.", links: [{name: "Official Site", url: "#"}] },
        { name: "Deerhoof", type: "Artist", image: "https://images.unsplash.com/photo-1598555986427-d72ad79c35d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Experimental noise pop. Independent forever.", links: [{name: "Bandcamp", url: "#"}] },
        { name: "King Krule", type: "Artist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Archy Marshall. Pledged catalog.", links: [] },
        { name: "Big Thief", type: "Artist", image: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Folk rock from Brooklyn.", links: [{name: "Bandcamp", url: "#"}] },
        { name: "Listener #9941", type: "Listener", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Superfan pledging 15k minutes/year.", links: [] },
        { name: "Listener #8821", type: "Listener", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Cancelling premium on Day 1.", links: [] },
        { name: "Listener #1102", type: "Listener", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", bio: "Pledging support.", links: [] }
    ];

    let selectedGuest = guests[0];
    let isCycling = true;
    let cycleInterval;

    function selectGuest(guest) {
        selectedGuest = guest;
        stopCycling();
    }

    function startCycling() {
        cycleInterval = setInterval(() => {
            if (isCycling) {
                const currentIndex = guests.indexOf(selectedGuest);
                const nextIndex = (currentIndex + 1) % guests.length;
                selectedGuest = guests[nextIndex];
            }
        }, 3000);
    }

    function stopCycling() {
        if(isCycling) {
            clearInterval(cycleInterval);
            isCycling = false;
        }
    }

    onMount(() => {
        // --- 1. TICKER LOGIC ---
        const counter = document.getElementById('mainCounter');
        let count = 1450200412;
        
        setInterval(() => {
            count += Math.floor(Math.random() * 550);
            if (counter) {
                counter.innerText = count.toLocaleString();
            }
        }, 100);

        // --- 2. MODAL LOGIC ---
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');

        window.openModal = (type) => {
            if (modal) {
                modal.style.display = 'flex';
            }
            if (modalTitle) {
                modalTitle.innerText = type + " RSVP";
            }
        }

        window.closeModal = () => {
            if (modal) {
                modal.style.display = 'none';
            }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }

        startCycling();

        // --- 4. THEME SWITCHER ---
        const themeSwitcher = document.getElementById('theme-switcher');
        const doc = document.documentElement;

        const theme = localStorage.getItem('theme');
        if (theme) {
          doc.setAttribute('data-theme', theme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          doc.setAttribute('data-theme', 'dark');
        }

        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', () => {
              const currentTheme = doc.getAttribute('data-theme');
              const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
              doc.setAttribute('data-theme', newTheme);
              localStorage.setItem('theme', newTheme);
            });
        }
    });
</script>

<svelte:head>
    <title>RELEASE PARTY | The Exodus</title>
    <meta name="description" content="We are leaving Spotify. A collective exodus to force a user-centric payment model.">
</svelte:head>

<div class="container">
    <!-- HEADER -->
    <header>
        <div class="brand">Release<span class="text-accent">Party</span></div>
        <nav>
            <a href="#manifesto" class="nav-link">Manifesto</a>
            <a href="#vision" class="nav-link">The Vision</a>
            <a href="#guestlist" class="nav-link">Guests</a>
            <a href="#destinations" class="nav-link">The Exodus</a>
            <a href="#" class="nav-link text-accent" on:click|preventDefault={() => openModal('RSVP')}>RSVP</a>
            <button id="theme-switcher" class="nav-link" style="background: none; border: none; cursor: pointer; color: inherit;">Theme</button>
        </nav>
    </header>

    <!-- TICKER (MARQUEE) -->
    <div class="marquee-container">
        <div class="marquee-wrapper">
            <div class="marquee-content">
                <span class="marquee-item">// 1,450,231,000 STREAMS PLEDGED </span>
                <span class="marquee-item">// TARGET: 50 BILLION </span>
                <span class="marquee-item">// WE LEAVE TOGETHER </span>
                <span class="marquee-item">// STOP THE ALGORITHM </span>
                <span class="marquee-item">// MUSIC IS NOT CONTENT </span>
                <span class="marquee-item">// RAY BULL PLEDGED </span>
                <span class="marquee-item">// DIIV PLEDGED </span>
                <span class="marquee-item">// MITSKI PLEDGED </span>
                <span class="marquee-item">// BIG THIEF PLEDGED </span>
            </div>
            <div class="marquee-content">
                <span class="marquee-item">// 1,450,231,000 STREAMS PLEDGED </span>
                <span class="marquee-item">// TARGET: 50 BILLION </span>
                <span class="marquee-item">// WE LEAVE TOGETHER </span>
                <span class="marquee-item">// STOP THE ALGORITHM </span>
                <span class="marquee-item">// MUSIC IS NOT CONTENT </span>
                <span class="marquee-item">// RAY BULL PLEDGED </span>
                <span class="marquee-item">// DIIV PLEDGED </span>
                <span class="marquee-item">// MITSKI PLEDGED </span>
                <span class="marquee-item">// BIG THIEF PLEDGED </span>
            </div>
        </div>
    </div>

    <!-- MAIN GRID CONTAINER -->
    <div class="grid-container">

        <!-- HERO SECTION (Flexbox for safety) -->
        <div class="hero-flex-row">
            <div class="hero-title-box">
                <h1 class="text-huge">We Are<br/>Leaving<br/><span class="text-accent">Spotify.</span></h1>
            </div>
            <div class="hero-counter-box">
                <h3 style="margin-bottom: 20px;">The Countdown</h3>
                <!-- Updated class text-countdown handles sizing -->
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

        <!-- MANIFESTO / UCPS -->
        <div class="grid-row grid-sidebar" id="manifesto">
            <div class="grid-item">
                <h2 class="text-large" style="margin-bottom: 40px;">The Big Pot <span style="color: #999;">vs</span> <span class="text-accent">Fair Pay</span></h2>
                
                <div style="margin-bottom: 40px;">
                    <h3>The Problem: Pro-Rata</h3>
                    <p>Right now, your subscription money goes into a giant bucket. You are subsidizing artists you don't listen to.</p>
                </div>

                <div>
                    <h3 class="text-accent">The Fix: User-Centric</h3>
                    <p>We demand a model where <strong>your</strong> subscription fee goes to the artists <strong>you</strong> actually listen to. Simple. Fair. Anti-Fraud.</p>
                    <br/>
                    <p><em>"Data from the <a href="Payment Option Study.pdf" target="_blank" style="text-decoration: underline; font-weight: bold;">2023 Pro Musik Study</a> confirms that nearly 1 in 5 artists would see their revenue DOUBLE under this model."</em></p>
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
            <!-- LEFT: THE LIST -->
            <div class="grid-item" style="background: #e5e3de;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; flex-wrap: wrap; gap:10px;">
                    <div>
                        <h2>The Guest List</h2>
                        <p style="font-size: 0.9rem;">Packed their bags.</p>
                    </div>
                    <input type="text" class="guest-search-input" placeholder="Search...">
                </div>
                <div class="guest-list-wrapper">
                    {#each guests as guest}
                        <div class="guest-item" on:click={() => selectGuest(guest)} class:active={guest === selectedGuest}>
                            <span style:color={guest.type === 'Artist' ? 'var(--accent-color)' : 'inherit'}>{guest.name}</span>
                            <span style="font-size: 0.8rem; opacity: 0.6;">{guest.type}</span>
                        </div>
                    {/each}
                </div>
            </div>
            <!-- RIGHT: THE PROFILE (Auto Cycling) -->
            <div class="grid-item-nopad">
                {#if selectedGuest}
                <div class="profile-view" style:background-image="url('{selectedGuest.image}')">
                    <div class="profile-content">
                        <div style="margin-bottom: 20px;">
                            <span class="highlight-text" style="background:var(--accent-color);">{selectedGuest.type}</span>
                            <div style="margin-top:5px;">
                                <span class="highlight-text profile-name">{selectedGuest.name}</span>
                            </div>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <span class="highlight-text" style="font-size: 1.1rem;">"{selectedGuest.bio}"</span>
                        </div>
                        <div class="profile-links">
                            {#each selectedGuest.links as link}
                                <a href={link.url}>{link.name} &rarr;</a>
                            {/each}
                        </div>
                    </div>
                </div>
                {/if}
            </div>
        </div>

        <!-- THE VISION (Horizontal Scroll) -->
        <div class="grid-row" id="vision">
            <div class="grid-item" style="border-bottom: none; border-right: none;">
                <h2 class="text-large">The Vision</h2>
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

        <!-- THE EXODUS / DESTINATIONS -->
        <div class="grid-row grid-sidebar" id="destinations">
            <div class="grid-item">
                <h2>The Exodus</h2>
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
                    <li style="margin-bottom: 15px;"><a href="#" style="text-decoration: underline;">Download Takedown Toolkit &darr;</a></li>
                    <li style="margin-bottom: 15px;"><a href="#" style="text-decoration: underline;">The Ethical Rider PDF &darr;</a></li>
                    <li style="margin-bottom: 15px;"><a href="Payment Option Study.pdf" style="text-decoration: underline;">Pro Musik Study &darr;</a></li>
                </ul>
            </div>
        </div>

    </div>

    <!-- FOOTER -->
    <footer style="padding: 40px; border-top: 2px solid var(--line-color);">
        <div class="grid-container" style="border: none;">
            <div class="grid-row grid-3-col" style="border: none;">
                <div style="padding-right: 20px;">
                    <h3>Release Party</h3>
                    <p style="font-size: 0.8rem; margin-top: 10px;">© 2025. Built for the Exodus.</p>
                </div>
                <div>
                    <h4 style="margin-bottom: 10px;">Connect</h4>
                    <a href="#" style="display: block; margin-bottom: 5px;">Instagram</a>
                    <a href="#" style="display: block; margin-bottom: 5px;">Twitter / X</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- MODAL -->
    <div class="modal-overlay" id="modal">
        <div class="modal-box">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <h2 id="modal-title">RSVP</h2>
                <span style="font-size: 2rem; cursor: pointer; line-height: 0.5;" on:click={() => closeModal()}>&times;</span>
            </div>
            <p style="margin-bottom: 30px;">Add your leverage to the movement.</p>
            <form on:submit|preventDefault={() => {closeModal(); alert('Pledge Added!');}}>
                <input type="text" placeholder="Name / Artist Name" required>
                <input type="text" placeholder="Estimated Annual Streams / Minutes" required>
                <button class="btn" style="width: 100%;">Submit Pledge</button>
            </form>
        </div>
    </div>
</div>

<style>
    :global(html) {
        /* --- THEME SETTINGS --- */
        --bg-color: #f2f0eb;      /* Bone / Off-White */
        --text-color: #1a1a1a;    /* Onyx Black */
        --accent-color: #ff3c00;  /* International Orange */
        --line-color: #1a1a1a;    /* Borders */
        
        /* Typography */
        --font-main: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        --font-heading: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    :global([data-theme="dark"]) {
        --bg-color: #1a1a1a;
        --text-color: #f2f0eb;
        --accent-color: #ff3c00;
        --line-color: #f2f0eb;
    }


    /* --- RESET & BASE --- */
    :global(*) { box-sizing: border-box; margin: 0; padding: 0; }
    
    :global(body) {
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: var(--font-main);
        line-height: 1.4;
        overflow-x: hidden; 
        border: 20px solid var(--bg-color); 
        width: 100vw;
        min-height: 100vh;
    }

    /* --- TYPOGRAPHY --- */
    h1, h2, h3 {
        font-family: var(--font-heading);
        font-weight: 800;
        letter-spacing: -0.05em; 
        line-height: 0.9;
        text-transform: uppercase;
        word-wrap: break-word; 
    }
    
    p {
        font-weight: 500;
        font-size: 1.1rem;
        max-width: 60ch;
    }

    a { color: inherit; }

    .text-accent { color: var(--accent-color); }
    
    /* Proportional Scaling for Headline */
    .text-huge { font-size: clamp(3rem, 7vw, 9rem); }
    .text-large { font-size: clamp(1.8rem, 5vw, 4rem); }
    
    /* COUNTDOWN TEXT FIX: Single line, proportional scaling */
    .text-countdown { 
        font-family: 'Courier New', monospace; 
        letter-spacing: -0.05em; 
        font-weight: 700;
        /* Scale proportionally (4vw) but cap at reasonable min/max sizes */
        font-size: clamp(2.5rem, 4vw, 6rem); 
        line-height: 1;
        white-space: nowrap; /* Prevent ugly breaking */
    } 

    /* --- LAYOUT UTILITIES --- */
    .grid-container {
        display: grid;
        border-top: 2px solid var(--line-color);
        border-left: 2px solid var(--line-color);
        width: 100%;
    }

    .grid-row {
        display: grid;
        grid-template-columns: 1fr;
        border-bottom: 2px solid var(--line-color);
        width: 100%;
    }

    @media(min-width: 900px) {
        .grid-2-col { grid-template-columns: 1fr 1fr; }
        .grid-sidebar { grid-template-columns: 2fr 1fr; }
    }

    .grid-item {
        padding: 40px;
        border-right: 2px solid var(--line-color);
        position: relative;
        min-width: 0; 
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .grid-item-nopad {
        padding: 0;
        border-right: 2px solid var(--line-color);
        min-width: 0;
        position: relative; 
    }

    /* --- HERO FLEXBOX FIX --- */
    .hero-flex-row {
        display: flex;
        flex-wrap: wrap; /* Allows wrapping on smaller screens */
        border-bottom: 2px solid var(--line-color);
    }

    .hero-title-box {
        flex: 1.5 1 450px; /* Give title slightly more weight, break at 450px */
        padding: 40px;
        border-right: 2px solid var(--line-color);
    }

    .hero-counter-box {
        flex: 1 1 350px; /* Counter takes remaining space, breaks at 350px */
        background: var(--accent-color);
        color: #fff;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 2px solid var(--line-color);
        /* Ensure content doesn't force box wider than viewport */
        min-width: 0; 
    }

    /* --- NAVIGATION --- */
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 2px solid var(--line-color);
        flex-wrap: wrap;
    }
    
    .brand {
        font-weight: 900;
        text-transform: uppercase;
        font-size: 1.5rem;
        letter-spacing: -0.05em;
        margin-right: 20px;
    }

    nav {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    .nav-link {
        text-decoration: none;
        color: var(--text-color);
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.9rem;
    }
    .nav-link:hover { text-decoration: underline; color: var(--accent-color); }

    /* --- TICKER --- */
    .marquee-container {
        background: var(--text-color);
        color: var(--bg-color);
        overflow: hidden;
        border-bottom: 2px solid var(--line-color);
        position: relative;
        height: 50px; 
        display: flex;
        align-items: center;
    }
    
    .marquee-wrapper {
        display: flex;
        white-space: nowrap;
        overflow: hidden;
    }

    .marquee-content {
        display: flex;
        font-family: var(--font-heading);
        font-weight: 800;
        text-transform: uppercase;
        font-size: 1.2rem;
        animation: scroll 30s linear infinite; 
        padding-right: 0; 
    }
    
    .marquee-item { padding-right: 20px; }

    /* --- BUTTONS --- */
    .btn {
        background: var(--accent-color);
        color: #fff;
        border: none;
        padding: 20px 40px;
        font-family: var(--font-heading);
        font-weight: 800;
        text-transform: uppercase;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
        display: inline-block;
        text-decoration: none;
        width: 100%;
        text-align: center;
    }
    
    .btn:hover { transform: translateY(-2px); background: #000; }
    
    .btn-outline {
        background: transparent;
        border: 2px solid var(--text-color);
        color: var(--text-color);
    }
    .btn-outline:hover { background: var(--text-color); color: var(--bg-color); }

    /* --- GUEST LIST & PROFILE --- */
    .guest-list-wrapper {
        max-height: 400px;
        overflow-y: auto;
        padding: 20px 0;
        border-top: 2px solid var(--line-color);
    }
    .guest-item {
        border-bottom: 1px solid #ccc;
        padding: 15px 10px;
        font-weight: 700;
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        transition: background 0.2s;
    }
    .guest-item:hover, .guest-item.active {
        background: var(--text-color);
        color: var(--bg-color);
        padding-left: 15px;
    }
    
    .guest-search-input {
        padding: 8px;
        border: 1px solid var(--text-color);
        font-family: var(--font-main);
        font-weight: 700;
        width: 200px;
    }

    .profile-view {
        width: 100%;
        height: 100%;
        min-height: 500px; 
        background-size: cover;
        background-position: center;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 30px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
    
    .highlight-text {
        background-color: var(--text-color);
        color: var(--bg-color);
        display: inline;
        padding: 4px 8px;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
        line-height: 1.6;
    }
    
    .profile-name {
        font-family: var(--font-heading);
        font-size: 3rem;
        line-height: 1;
        text-transform: uppercase;
        margin-bottom: 15px;
        display: block;
    }
    
    .profile-links a {
        display: inline-block;
        background-color: var(--text-color); /* Highlight text bg */
        color: var(--bg-color);
        padding: 8px 15px;
        font-weight: 700;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 0.8rem;
        margin-right: 10px;
        margin-top: 10px;
        border: 2px solid transparent;
    }
    
    .profile-links a:hover {
        background: var(--accent-color);
        color: #fff;
    }

    /* --- HORIZONTAL SCROLL SECTION (VISION/DEMANDS) --- */
    .h-scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        border-bottom: 2px solid var(--line-color);
        scrollbar-width: none; /* Hide scrollbar Firefox */
    }
    .h-scroll-container::-webkit-scrollbar { display: none; /* Hide scrollbar Chrome */ }

    .h-card {
        min-width: 350px; /* Fixed width cards */
        flex: 0 0 auto;
        border-right: 2px solid var(--line-color);
        padding: 40px;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .scroll-hint {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.8rem;
        margin-top: 10px;
    }

    /* --- EXODUS / DESTINATIONS SECTION --- */
    .destinations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        padding-top: 20px;
    }
    .destination-link {
        border: 2px solid var(--line-color);
        padding: 20px;
        text-align: center;
        text-decoration: none;
        font-weight: 800;
        text-transform: uppercase;
        transition: 0.2s;
        display: block;
    }
    .destination-link:hover {
        background: var(--text-color);
        color: var(--bg-color);
    }

    /* --- VIDEO --- */
    .video-container {
        background: #000;
        color: #fff;
        width: 100%;
        height: 100%;
        min-height: 600px; 
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .video-aspect-ratio {
        width: 100%;
        max-width: 340px; 
        aspect-ratio: 9 / 16;
        background: #222;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #444;
    }

    /* --- ANIMATIONS --- */
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
    }

    /* --- MODAL --- */
    .modal-overlay {
        display: none;
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(26, 26, 26, 0.9);
        z-index: 999;
        align-items: center;
        justify-content: center;
    }
    .modal-box {
        background: var(--bg-color);
        border: 4px solid var(--accent-color);
        padding: 60px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
    }
    .modal-box input {
        width: 100%;
        padding: 20px;
        background: #fff;
        border: 2px solid var(--text-color);
        margin-bottom: 20px;
        font-family: var(--font-main);
        font-size: 1rem;
        font-weight: 700;
    }

    /* --- RESPONSIVE TWEAKS --- */
    @media(max-width: 768px) {
        :global(body) { border: 10px solid var(--bg-color); }
        .grid-item { padding: 25px; }
        .h-card { min-width: 85vw; } /* Cards take mostly full screen on mobile */
        
        /* Ensure Hero Stacks */
        .hero-title-box, .hero-counter-box {
            flex: 1 1 100%; /* Force 100% width on small screens */
            border-right: none;
            border-bottom: 2px solid var(--line-color);
            width: 100%; /* Explicit full width */
        }
        .hero-counter-box { border-bottom: none; min-height: 300px; } /* Ensure height for counter */
        .text-countdown { font-size: 15vw; } /* Very large on mobile */
        
        /* Nav Stacking */
        header { flex-direction: column; align-items: flex-start; gap: 10px; }
        nav { margin-left: -5px; width: 100%; overflow-x: auto; padding-bottom: 10px; } 
        .nav-link { margin-left: 0; margin-right: 15px; white-space: nowrap; }
    }
</style>