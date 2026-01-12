<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // Import page store
	import { enhance } from '$app/forms';
	// Import global CSS here
	import '../app.css';

	let { children } = $props();
    let modalRole = $state('ARTIST');
    let modalSubmitting = $state(false);
    let modalSuccess = $state(false);
    let isMenuOpen = $state(false);

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    const closeMenu = () => {
        isMenuOpen = false;
    };

    const handleModalSubmit = () => {
        modalSubmitting = true;
        return async ({ result, update }) => {
            modalSubmitting = false;
            if (result.type === 'success') {
                modalSuccess = true;
            }
            await update();
        };
    };

    onMount(() => {
        // --- MODAL LOGIC ---
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');

        window.openModal = (role = 'ARTIST') => {
            modalRole = role;
            modalSuccess = false;
            if (modal) {
                modal.style.display = 'flex';
            }
            if (modalTitle) {
                modalTitle.innerText = "Join as " + role.toLowerCase();
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
    });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid-container">
    <!-- HEADER -->
    <header class="grid-row">
        <div class="brand">
            {#if $page.url.pathname === '/'}
                Release<span class="text-accent">party</span>
            {:else}
                <a href="/">Release<span class="text-accent">party</span></a>
            {/if}
        </div>

        <button class="hamburger-btn" class:open={isMenuOpen} onclick={toggleMenu} aria-label="Menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>

        <nav class:open={isMenuOpen}>
            <a href="/vision" class="nav-link" onclick={closeMenu}>The vision</a>
            <a href="/guest-list" class="nav-link" onclick={closeMenu}>Guests</a>
            <a href="/exodus" class="nav-link" onclick={closeMenu}>Alternatives</a>
            <a href="/resources" class="nav-link" onclick={closeMenu}>Resources</a>
            <button type="button" class="nav-link text-accent" onclick={() => { openModal('ARTIST'); closeMenu(); }}>RSVP</button>
        </nav>
    </header>

    <!-- TICKER (MARQUEE) -->
    <div class="marquee-container grid-row">
        <div class="marquee-wrapper">
            <div class="marquee-content">
                <span class="marquee-item">// 1,450,231,000 STREAMS PLEDGED </span>
                <span class="marquee-item">// GOAL: 50 BILLION </span>
                <span class="marquee-item">// WE MOVE TOGETHER </span>
                <span class="marquee-item">// STOP PRO-RATA </span>
                <span class="marquee-item">// ARTISTS OVER ALGORITHMS </span>
                <span class="marquee-item">// RAY BULL PLEDGED </span>
                <span class="marquee-item">// DIIV PLEDGED </span>
                <span class="marquee-item">// MITSKI PLEDGED </span>
                <span class="marquee-item">// BIG THIEF PLEDGED </span>
            </div>
            <div class="marquee-content">
                <span class="marquee-item">// 1,450,231,000 STREAMS PLEDGED </span>
                <span class="marquee-item">// GOAL: 50 BILLION </span>
                <span class="marquee-item">// WE MOVE TOGETHER </span>
                <span class="marquee-item">// STOP PRO-RATA </span>
                <span class="marquee-item">// ARTISTS OVER ALGORITHMS </span>
                <span class="marquee-item">// RAY BULL PLEDGED </span>
                <span class="marquee-item">// DIIV PLEDGED </span>
                <span class="marquee-item">// MITSKI PLEDGED </span>
                <span class="marquee-item">// BIG THIEF PLEDGED </span>
            </div>
        </div>
    </div>

    {@render children()}

    <!-- FOOTER -->
    <footer class="grid-row grid-sidebar footer-dark">
        <div class="grid-item">
            <h2 class="text-large">Release party</h2>
            <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">© 2025. Built for the move. Music is not content.</p>
        </div>
        <div class="grid-item">
            <h4 style="margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.1em;">Connect</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="javascript:void(0)" class="nav-link nav-link-footer">Instagram</a>
                <a href="javascript:void(0)" class="nav-link nav-link-footer">Twitter / X</a>
                <a href="javascript:void(0)" class="nav-link nav-link-footer">Mastodon</a>
            </div>
        </div>
    </footer>

    <!-- MODAL -->
    <div class="modal-overlay" id="modal">
        <div class="modal-box">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <h2 id="modal-title">RSVP</h2>
                <button style="font-size: 2rem; cursor: pointer; line-height: 0.5; background: none; border: none; color: inherit; padding: 0;" onclick={() => closeModal()}>&times;</button>
            </div>
            <p style="margin-bottom: 30px;">Add your support to our list.</p>
            
            {#if modalSuccess}
                <div style="text-align: center; padding: 40px 0;">
                    <h2 class="text-large text-accent" style="margin-bottom: 20px;">Confirmed</h2>
                    <p style="font-weight: 700;">We've added your name to the list.</p>
                    <button class="btn" style="margin-top: 40px;" onclick={() => closeModal()}>Dismiss</button>
                </div>
            {:else}
                <form method="POST" action="/join" use:enhance={handleModalSubmit} class="modal-form">
                    <div class="form-group">
                        <label>ROLE</label>
                        <div class="radio-group-mini">
                            <label class="radio-option-mini">
                                <input type="radio" name="role" value="ARTIST" bind:group={modalRole} required>
                                <span>ARTIST</span>
                            </label>
                            <label class="radio-option-mini">
                                <input type="radio" name="role" value="LISTENER" bind:group={modalRole} required>
                                <span>LISTENER</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="modal-name">Name / artist name</label>
                        <input type="text" id="modal-name" name="name" placeholder="Name" required>
                    </div>

                    {#if modalRole === 'ARTIST'}
                        <div class="form-group">
                            <label for="modal-streams">2025 total streams (estimate)</label>
                            <input type="number" id="modal-streams" name="streams" placeholder="0" min="0">
                        </div>
                    {/if}

                    <div class="form-group">
                        <label for="modal-email">Email</label>
                        <input type="email" id="modal-email" name="email" placeholder="Email" required>
                    </div>

                    <div class="form-group">
                        <label for="modal-link">Link (Portfolio / social)</label>
                        <input type="text" id="modal-link" name="link" placeholder="https://...">
                    </div>

                    <button class="btn" style="width: 100%; margin-top: 20px;" disabled={modalSubmitting}>
                        {modalSubmitting ? 'Transmitting...' : 'RSVP'}
                    </button>
                </form>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Consolidate modal form styles */
    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .form-group label {
        font-family: 'Courier New', monospace;
        font-weight: 700;
        font-size: 0.7rem;
        opacity: 0.7;
    }

    .modal-form input[type="text"],
    .modal-form input[type="email"],
    .modal-form input[type="number"] {
        background: transparent;
        border: none;
        border-bottom: 2px solid var(--text-color);
        color: var(--text-color);
        padding: 8px 0;
        font-family: var(--font-main);
        font-size: 1.1rem;
        font-weight: 700;
        outline: none;
        border-radius: 0;
    }

    .modal-form input:focus {
        border-color: var(--accent-color);
    }

    /* Small Radios for Modal */
    .radio-group-mini {
        display: flex;
        gap: 15px;
    }

    .radio-option-mini {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        font-family: var(--font-heading);
        font-size: 0.8rem;
        font-weight: 900;
        opacity: 0.5;
        transition: opacity 0.2s;
    }

    .radio-option-mini:has(input:checked) {
        opacity: 1;
        color: var(--accent-color);
    }

    .modal-form input[type="radio"] {
        appearance: none;
        width: 0.8rem;
        height: 0.8rem;
        border: 1.5px solid currentColor;
        border-radius: 50%;
        display: grid;
        place-content: center;
        margin: 0;
    }

    .modal-form input[type="radio"]::before {
        content: "";
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        transform: scale(0);
        transition: 0.1s transform ease-in-out;
        box-shadow: inset 1em 1em currentColor;
        background-color: currentColor;
    }

    .modal-form input[type="radio"]:checked::before {
        transform: scale(1);
    }
</style>