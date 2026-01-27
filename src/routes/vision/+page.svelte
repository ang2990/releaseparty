<svelte:head>
    <title>The vision | Release party</title>
</svelte:head>

<div class="grid-container" style="border-top: none;">
    <div class="directive-grid">
        <div class="directive-item" style="border-bottom: none; justify-content: flex-start;">
            <h1 class="vision-title" style="margin-bottom: 30px;">The<br>vision</h1>
            <p style="font-size: 1.1rem; opacity: 0.8;">We are building the infrastructure needed to bypass corporate gatekeepers and secure direct control over our music and income. This is about leverage, mobilization, and ending our reliance on systems that prioritize profit over people.</p>
        </div>

        <div class="directive-item">
            <span class="text-accent text-large">01.</span>
            <h2 class="vision-item-title">Fair Pay</h2>
            <p style="margin-top: 20px;">We demand User-Centric Payments: a system where your subscription fee goes directly to the artists you actually listen to. We need a model that rewards fan dedication, not passive volume. Spotify’s current average of $0.003 per stream is unconscionable. It would take 1,200 streams to buy a single cup of coffee.</p>
        </div>
        <div class="directive-item">
            <span class="text-accent text-large">02.</span>
            <h2 class="vision-item-title">Ethical Infrastructure</h2>
            <p style="margin-top: 20px;">Music shouldn’t fund war. We demand platforms divest revenue from military technology and surveillance. We refuse to let our art fund the war machine.</p>
        </div>
        <div class="directive-item">
            <span class="text-accent text-large">03.</span>
            <h2 class="vision-item-title">AI Consent</h2>
            <p style="margin-top: 20px;">Technology should serve the artist, not replace them. We demand strict protections against generative AI training on our catalogs without permission and compensation.</p>
        </div>
        <div class="directive-item">
            <span class="text-accent text-large">04.</span>
            <h2 class="vision-item-title">Data Sovereignty</h2>
            <p style="margin-top: 20px;">Corporate platforms shouldn’t be gatekeepers between artists and fans. Artists and listeners deserve full transparency on all data. We demand the right to take our fanbase with us if we leave.</p>
        </div>
        <div class="directive-item">
            <span class="text-accent text-large">05.</span>
            <h2 class="vision-item-title">Platforms for People</h2>
            <p style="margin-top: 20px;">We need platforms built for connection, not consumption. We reject the “lean back” model of algorithmic wallpaper that promotes and profits off of ghost artists and AI slop.</p>
        </div>
    </div>

    <div class="grid-row">
        <div class="grid-item">
            <p class="text-large" style="margin-top: 20px; text-align: center;">This is a coordinated effort to reclaim our industry through direct action. Join us.</p>
        </div>
    </div>
</div>

<style>
    /* Fluid Typography for Vision Page */
    .vision-title {
        font-family: var(--font-heading);
        font-weight: 900;
        text-transform: uppercase;
        font-size: clamp(3.5rem, 12vw, 9rem);
        line-height: 0.8;
        letter-spacing: -0.05em;
    }

    .vision-item-title {
        font-family: var(--font-heading);
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: -0.02em;
        
        /* Fluid scaling to fit long words in grid cards */
        font-size: clamp(1.8rem, 4vw, 3rem); 
        line-height: 1;
        margin-top: 10px;

        /* Prevent mid-word breaks */
        word-break: keep-all; 
        overflow-wrap: normal; 
        hyphens: none; 
    }

    /* Mobile adjustments */
    @media (max-width: 600px) {
        .vision-title {
            font-size: clamp(3rem, 15vw, 5rem);
        }
        
        .vision-item-title {
            /* Smaller on mobile to ensure 'Infrastructure' fits */
            font-size: clamp(1.5rem, 6vw, 2.2rem); 
        }
    }
</style>