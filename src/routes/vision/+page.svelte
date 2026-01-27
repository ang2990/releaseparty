<svelte:head>
    <title>The vision | Release party</title>
</svelte:head>

<div class="grid-container" style="border-top: none;">
    <!-- HEADER -->
    <div class="grid-row">
        <div class="grid-item" style="border-bottom: none; padding-bottom: 60px;">
            <h1 class="vision-title" style="margin-bottom: 30px;">The<br>vision</h1>
            <p style="font-size: 1.1rem; opacity: 0.8; max-width: 50ch;">
                We are building the infrastructure needed to bypass corporate gatekeepers and secure direct control over our music and income. This is about leverage, mobilization, and ending our reliance on systems that prioritize profit over people.
            </p>
        </div>
    </div>

    <!-- VISION POINTS LIST -->
    <div class="grid-row">
        <div class="grid-item" style="border-bottom: none;">
            <div class="vision-list">
                
                <!-- 01 -->
                <div class="vision-item">
                    <div class="vision-header">
                        <span class="vision-number text-accent">01.</span>
                        <h2 class="vision-item-title">Fair Pay</h2>
                    </div>
                    <p>We demand User-Centric Payments: a system where your subscription fee goes directly to the artists you actually listen to. We need a model that rewards fan dedication, not passive volume. Spotify’s current average of $0.003 per stream is unconscionable. It would take 1,200 streams to buy a single cup of coffee.</p>
                </div>

                <!-- 02 -->
                <div class="vision-item">
                    <div class="vision-header">
                        <span class="vision-number text-accent">02.</span>
                        <h2 class="vision-item-title">Ethical Infrastructure</h2>
                    </div>
                    <p>Music shouldn’t fund war. We demand platforms divest revenue from military technology and surveillance. We refuse to let our art fund the war machine.</p>
                </div>

                <!-- 03 -->
                <div class="vision-item">
                    <div class="vision-header">
                        <span class="vision-number text-accent">03.</span>
                        <h2 class="vision-item-title">AI Consent</h2>
                    </div>
                    <p>Technology should serve the artist, not replace them. We demand strict protections against generative AI training on our catalogs without permission and compensation.</p>
                </div>

                <!-- 04 -->
                <div class="vision-item">
                    <div class="vision-header">
                        <span class="vision-number text-accent">04.</span>
                        <h2 class="vision-item-title">Data Sovereignty</h2>
                    </div>
                    <p>Corporate platforms shouldn’t be gatekeepers between artists and fans. Artists and listeners deserve full transparency on all data. We demand the right to take our fanbase with us if we leave.</p>
                </div>

                <!-- 05 -->
                <div class="vision-item">
                    <div class="vision-header">
                        <span class="vision-number text-accent">05.</span>
                        <h2 class="vision-item-title">Platforms for People</h2>
                    </div>
                    <p>We need platforms built for connection, not consumption. We reject the “lean back” model of algorithmic wallpaper that promotes and profits off of ghost artists and AI slop.</p>
                </div>

            </div>
        </div>
    </div>

    <!-- CTA -->
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

    .vision-list {
        display: flex;
        flex-direction: column;
        gap: 60px;
        margin-top: 20px;
    }

    .vision-item {
        border-top: 2px solid var(--line-color);
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .vision-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .vision-number {
        font-family: var(--font-heading); /* Match title font */
        font-size: 1.5rem;
        font-weight: 900;
        opacity: 1;
    }

    .vision-item-title {
        font-family: var(--font-heading);
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: -0.02em;
        
        /* Fluid scaling */
        font-size: clamp(2rem, 5vw, 4rem); 
        line-height: 1;
        margin: 0;

        /* Prevent mid-word breaks */
        word-break: keep-all; 
        overflow-wrap: normal; 
        hyphens: none; 
    }

    .vision-item p {
        font-size: 1.1rem;
        line-height: 1.5;
        max-width: 60ch;
        opacity: 0.9;
    }

    /* Layout for larger screens: Side-by-side number/title and content */
    @media (min-width: 900px) {
        .vision-item {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 40px;
        }

        .vision-header {
            flex: 1;
            max-width: 40%;
        }

        .vision-item p {
            flex: 1;
            margin-top: 0; /* Align with top */
            padding-top: 5px; /* Visual alignment with title cap height */
        }
    }

    /* Mobile adjustments */
    @media (max-width: 600px) {
        .vision-title {
            font-size: clamp(3rem, 15vw, 5rem);
        }
        
        .vision-item-title {
            font-size: clamp(1.8rem, 8vw, 2.5rem); 
        }
        
        .vision-list {
            gap: 40px;
        }
    }
</style>