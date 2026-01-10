<script lang="ts">
    import { enhance } from '$app/forms';

    let submitting = $state(false);
    let success = $state(false);
    let selectedRole = $state('ARTIST');

    // Form enhancement to handle loading state
    const handleSubmit = () => {
        submitting = true;
        return async ({ result, update }) => {
            submitting = false;
            if (result.type === 'success') {
                success = true;
            }
            await update();
        };
    };
</script>

<svelte:head>
    <title>JOIN | Release Party</title>
</svelte:head>

<div class="grid-container">
    <div class="grid-row grid-2-col">
        <!-- LEFT: MANIFESTO -->
        <div class="grid-item">
            <h1 class="text-huge">Commit to the <span class="text-accent">Protocol.</span></h1>
            <p style="margin-top: 30px;">
                We are building a coalition of artists and listeners ready to exit the platform economy.
                By signing this manifest, you pledge to support the migration to ethical infrastructure.
            </p>
            
            <div style="margin-top: 50px;">
                <h3 style="margin-bottom: 20px; font-family: 'Courier New', monospace;">// THE_PLEDGE</h3>
                <ul class="font-mono" style="list-style: none; font-size: 0.9rem; line-height: 1.8; opacity: 0.8;">
                    <li>[ ] I REJECT THE PRO-RATA MODEL</li>
                    <li>[ ] I DEMAND USER-CENTRIC PAYMENTS</li>
                    <li>[ ] I WILL MOVE MY LIBRARY/CATALOG</li>
                    <li>[ ] I AM READY FOR THE RELEASE</li>
                </ul>
            </div>
        </div>

        <!-- RIGHT: INTAKE FORM -->
        <div class="grid-item" style="background: var(--text-color); color: var(--bg-color);">
            {#if success}
                <div style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <h2 class="text-large text-accent" style="margin-bottom: 20px;">CONFIRMED</h2>
                    <p>Your signal has been received.</p>
                    <p style="font-family: 'Courier New', monospace; margin-top: 20px;">ID_TAG: PENDING_GENERATION</p>
                    <button class="btn btn-outline" style="margin-top: 40px; border-color: var(--bg-color); color: var(--bg-color);" onclick={() => success = false}>REGISTER_ANOTHER</button>
                </div>
            {:else}
                <h2 style="margin-bottom: 30px; border-bottom: 1px solid var(--bg-color); padding-bottom: 10px;">Intake Form</h2>
                
                <form method="POST" use:enhance={handleSubmit} class="join-form">
                    <div class="form-group">
                        <label for="role">ROLE</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="role" value="ARTIST" required bind:group={selectedRole}>
                                <span>ARTIST</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="role" value="LISTENER" required bind:group={selectedRole}>
                                <span>LISTENER</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="name">NAME / ARTIST NAME</label>
                        <input type="text" id="name" name="name" placeholder="ENTER_NAME" required>
                    </div>

                    {#if selectedRole === 'ARTIST'}
                        <div class="form-group">
                            <label for="streams">2025 TOTAL STREAMS (ESTIMATE)</label>
                            <input type="number" id="streams" name="streams" placeholder="0" min="0">
                        </div>
                    {/if}

                    <div class="form-group">
                        <label for="email">CONTACT_RELAY (EMAIL)</label>
                        <input type="email" id="email" name="email" placeholder="ENTER_EMAIL" required>
                    </div>

                    <div class="form-group">
                        <label for="link">LINK (PORTFOLIO / SOCIAL)</label>
                        <input type="url" id="link" name="link" placeholder="HTTPS://...">
                    </div>

                    <button class="btn" style="width: 100%; margin-top: 20px;" disabled={submitting}>
                        {submitting ? 'TRANSMITTING...' : 'SIGN MANIFEST'}
                    </button>
                </form>
            {/if}
        </div>
    </div>
</div>

<style>
    .join-form {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    label {
        font-family: 'Courier New', monospace;
        font-weight: 700;
        font-size: 0.8rem;
        opacity: 0.8;
    }

    input[type="text"],
    input[type="email"],
    input[type="url"] {
        background: transparent;
        border: none;
        border-bottom: 2px solid var(--bg-color);
        color: var(--bg-color);
        padding: 10px 0;
        font-family: var(--font-main);
        font-size: 1.2rem;
        font-weight: 700;
        outline: none;
        border-radius: 0;
    }

    input:focus {
        border-color: var(--accent-color);
    }

    /* Custom Radio */
    .radio-group {
        display: flex;
        gap: 20px;
    }

    .radio-option {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-family: var(--font-heading);
        font-size: 1.2rem;
        font-weight: 900;
        opacity: 0.5;
        transition: opacity 0.2s;
    }

    .radio-option:has(input:checked) {
        opacity: 1;
        color: var(--accent-color);
    }

    input[type="radio"] {
        appearance: none;
        width: 1.2rem;
        height: 1.2rem;
        border: 2px solid currentColor;
        border-radius: 50%;
        display: grid;
        place-content: center;
    }

    input[type="radio"]::before {
        content: "";
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        transform: scale(0);
        transition: 0.1s transform ease-in-out;
        box-shadow: inset 1em 1em currentColor;
        background-color: currentColor;
    }

    input[type="radio"]:checked::before {
        transform: scale(1);
    }
</style>