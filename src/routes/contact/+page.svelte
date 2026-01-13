<svelte:head>
    <title>Contact | Release party</title>
</svelte:head>

<div class="grid-container">
    <!-- PAGE HEADER -->
    <div class="grid-row">
        <div class="grid-item">
            <h1 class="text-huge">Contact</h1>
            <p class="text-large" style="margin-top: 20px;">
                This initiative was started by artists, for artists. We are building this infrastructure together.
            </p>
        </div>
    </div>

    <!-- CONTACT INFO -->
    <div class="grid-row grid-2-col">
        <div class="grid-item">
            <h2 class="text-large" style="margin-bottom: 30px;">Get in touch</h2>
            
            <div style="margin-bottom: 40px;">
                <div class="label">General / Press</div>
                <a href="mailto:releaseparty.music@gmail.com" class="link-large">releaseparty.music@gmail.com</a>
            </div>

            <div>
                <div class="label">Social</div>
                <a href="https://instagram.com/releaseparty.music" target="_blank" class="link-large">@releaseparty.music</a>
            </div>
        </div>

        <div class="grid-item" style="background: var(--text-color); color: var(--bg-color); display: flex; flex-direction: column; justify-content: center;">
            <p style="font-size: 1.5rem; line-height: 1.4; max-width: 25ch;">
                Reach out for press inquiries, collaboration ideas, or if you want to be more involved in the movement.
            </p>
        </div>
    </div>
</div>

<style>
    .label {
        font-family: 'Courier New', monospace;
        font-weight: 700;
        font-size: 0.8rem;
        opacity: 0.6;
        margin-bottom: 10px;
        text-transform: uppercase;
    }

    .link-large {
        font-family: var(--font-heading);
        font-weight: 900;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        text-decoration: underline;
        word-break: break-all;
        line-height: 1;
        display: block;
        transition: color 0.2s;
    }

    .link-large:hover {
        color: var(--accent-color);
    }
</style>