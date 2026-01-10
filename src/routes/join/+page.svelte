<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    let submitting = $state(false);
    let success = $state(false);
    
    let selectedRole = $state($page.url.searchParams.get('role')?.toUpperCase() || 'ARTIST');

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
    <title>Join | Release party</title>
</svelte:head>

<div class="grid-container">
    <div class="grid-row grid-2-col">
        <!-- LEFT: JOIN -->
        <div class="grid-item">
            <h1 class="text-huge">Commit to the <span class="text-accent">move.</span></h1>
            <p style="margin-top: 30px;">
                We're organizing a coordinated exit to secure our independence from major streaming corporations. By joining this list, you pledge to move your music and support to infrastructure we control.
            </p>
            
            <div style="margin-top: 50px;">
                <h3 style="margin-bottom: 20px; font-family: 'Courier New', monospace;">// The pledge</h3>
                <ul class="font-mono" style="list-style: none; font-size: 0.9rem; line-height: 1.8; opacity: 0.8;">
                    <li>[ ] I support direct action for fair pay</li>
                    <li>[ ] I require secure data and artist ownership</li>
                    <li>[ ] I am ready to move my catalog</li>
                </ul>
            </div>
        </div>

        <!-- RIGHT: INTAKE FORM -->
        <div class="grid-item" style="background: var(--text-color); color: var(--bg-color);">
            {#if success}
                <div style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <h2 class="text-large text-accent" style="margin-bottom: 20px;">Confirmed</h2>
                    <p>You've joined the move. We'll be in touch with secure next steps.</p>
                    <button class="btn btn-outline" style="margin-top: 40px; border-color: var(--bg-color); color: var(--bg-color);" onclick={() => success = false}>Add another name</button>
                </div>
            {:else}
                <h2 style="margin-bottom: 30px; border-bottom: 1px solid var(--bg-color); padding-bottom: 10px;">
                    {selectedRole.toLowerCase()} registration
                </h2>
                
                <form method="POST" use:enhance={handleSubmit} class="join-form">
                    <input type="hidden" name="role" value={selectedRole}>

                    <div class="form-group">
                        <label for="name">Name / artist name</label>
                        <input type="text" id="name" name="name" placeholder="Name" required>
                    </div>

                    {#if selectedRole === 'ARTIST'}
                        <div class="form-group">
                            <label for="streams">2025 total streams (estimate)</label>
                            <input type="number" id="streams" name="streams" placeholder="0" min="0">
                        </div>
                    {/if}

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" required>
                    </div>

                    <div class="form-group">
                        <label for="link">Link (Portfolio / social)</label>
                        <input type="text" id="link" name="link" placeholder="https://...">
                    </div>

                    <button class="btn" style="width: 100%; margin-top: 20px;" disabled={submitting}>
                        {submitting ? 'Transmitting...' : 'Commit to join'}
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
    input[type="number"] {
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
</style>