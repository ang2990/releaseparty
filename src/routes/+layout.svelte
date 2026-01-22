<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // Import page store
    import { afterNavigate } from '$app/navigation'; // Import navigation hook
	import { enhance } from '$app/forms';
	// Import global CSS here
	import '../app.css';

	    let { children, data } = $props(); // Receive data from layout.server.ts
	        let tickerItems = $derived.by(() => {
	            // Defensive check: Ensure data and tickerData exist
	            const attendees = (data && data.tickerData) ? data.tickerData : [];
	            
	            // If no data, show a placeholder waiting message instead of slogans
	            if (attendees.length === 0) return ["// WAITING FOR SIGNAL..."];
	    
	            // Filter for high-impact artists (e.g., > 100k streams) or recent listeners
	            // For now, take the top 5 artists by stream count (if available) and 5 recent joins
	            const highImpactArtists = attendees
	                .filter(a => a.role === 'ARTIST' && a.streams !== '---')
	                .sort((a, b) => parseInt(b.streams.replace(/,/g, '')) - parseInt(a.streams.replace(/,/g, '')))
	                .slice(0, 5);
	                
	            // If we don't have enough data, just take what we have
	            const displayList = highImpactArtists.length > 0 ? highImpactArtists : attendees.slice(0, 8);
	    
	            const attendeeStrings = displayList.map(a => {
	                if (a.role === 'ARTIST') {
	                    return `// ${a.name.toUpperCase()} (${a.streams} STREAMS) `;
	                } else {
	                    return `// NEW LISTENER: ${a.name.toUpperCase()} `;
	                }
	            });
	    
	            // Only return attendee strings (social proof)
	            return attendeeStrings;
	        });	
	    // Automatically close menu on navigation
	    afterNavigate(() => {
	        isMenuOpen = false;
	    });
	
	    let modalRole = $state(null); // Null means "Role Selection Step"
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
	
	        window.openModal = (role = null) => {
	            modalRole = role; // If null, show selection screen
	            modalSuccess = false;
	            if (modal) {
	                modal.style.display = 'flex';
	            }
	            if (modalTitle) {
	                modalTitle.innerText = role ? "Join as " + role.toLowerCase() : "Join the Pact";
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
	                    <a href="/vision" class="nav-link" onclick={closeMenu}>The Vision</a>
	                    <a href="/exodus" class="nav-link" onclick={closeMenu}>The Pact</a>
	                    <a href="/resources" class="nav-link" onclick={closeMenu}>Guides</a>
	                    <a href="/faq" class="nav-link" onclick={closeMenu}>FAQ</a>
	                    <button type="button" class="nav-link text-accent" onclick={() => { openModal(); closeMenu(); }}>[ Join the Pact ]</button>
	                </nav>	    </header>
	
	    <!-- TICKER (MARQUEE) -->
	    <div class="marquee-container grid-row">
	        <div class="marquee-wrapper">
	            <!-- Render twice for seamless loop -->
	            <div class="marquee-content">
	                {#each tickerItems as item}
	                    <span class="marquee-item">{item}</span>
	                {/each}
	            </div>
	            <div class="marquee-content">
	                {#each tickerItems as item}
	                    <span class="marquee-item">{item}</span>
	                {/each}
	            </div>
	        </div>
	    </div>
	
	    {@render children()}
	
	        <!-- FOOTER -->
	        <footer class="grid-row grid-sidebar footer-dark">
	            <div class="grid-item">
	                <h2 class="text-large">Release party</h2>
	                <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">© 2025. Built for the move. Music is not content.</p>
	                <a href="mailto:releaseparty.music@gmail.com" class="nav-link-footer" style="margin-top: 20px; display: block;">releaseparty.music@gmail.com</a>
	            </div>
	            <div class="grid-item">	            <h4 style="margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.1em;">Connect</h4>
	            <div style="display: flex; flex-direction: column; gap: 10px;">
	                <a href="https://instagram.com/releaseparty.music" target="_blank" class="nav-link nav-link-footer">Instagram</a>
	                <a href="https://twitter.com/releaseparty" target="_blank" class="nav-link nav-link-footer">Twitter / X</a>
	            </div>
	        </div>
	    </footer>
	
	    <!-- MODAL -->
	    <div class="modal-overlay" id="modal">
	        <div class="modal-box">
	            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
	                <h2 id="modal-title">Join the Pact</h2>
	                <button style="font-size: 2rem; cursor: pointer; line-height: 0.5; background: none; border: none; color: inherit; padding: 0;" onclick={() => closeModal()}>&times;</button>
	            </div>
	            
	            {#if modalSuccess}
	                <div style="text-align: center; padding: 40px 0;">
	                    <h2 class="text-large text-accent" style="margin-bottom: 20px;">Confirmed</h2>
	                    <p style="font-weight: 700;">We've added your name to the list.</p>
	                    <button class="btn" style="margin-top: 40px;" onclick={() => closeModal()}>Dismiss</button>
	                </div>
	            {:else if !modalRole}
	                <!-- STEP 1: ROLE SELECTION -->
	                <div style="display: flex; flex-direction: column; gap: 20px;">
	                    <p style="margin-bottom: 20px;">How will you participate?</p>
	                    <button class="btn" onclick={() => modalRole = 'ARTIST'}>I am an Artist (Pledge Streams)</button>
	                    <button class="btn btn-outline" onclick={() => modalRole = 'LISTENER'}>I am a Listener (Pledge Support)</button>
	                </div>
	            {:else}
	                <p style="margin-bottom: 30px;">Add your support to our list.</p>
	                <form method="POST" action="/join" use:enhance={handleModalSubmit} class="modal-form">
	                    <!-- Hidden input to pass role -->
	                    <input type="hidden" name="role" value={modalRole}>
	                    
	                    <div class="form-group">
	                        <label for="modal-name">Name / artist name</label>
	                        <input type="text" id="modal-name" name="name" placeholder="Name" required>
	                    </div>
	                    
	                    <!-- ... rest of form ... -->
                    {#if modalRole === 'LISTENER'}
                        <div class="form-group" style="flex-direction: row; align-items: center; gap: 10px;">
                            <input type="checkbox" id="modal-anon" name="anonymous" style="width: auto; margin: 0;">
                            <label for="modal-anon" style="opacity: 1; margin: 0; cursor: pointer;">Sign up anonymously</label>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal-plan">What is your current Spotify subscription?</label>
                            <select id="modal-plan" name="subscription" required style="background: transparent; border: none; border-bottom: 2px solid var(--text-color); color: var(--text-color); padding: 8px 0; font-family: var(--font-main); font-size: 1.1rem; font-weight: 700; outline: none; width: 100%; appearance: none; border-radius: 0;">
                                <option value="Premium Individual">Premium Individual ($12.99/mo)</option>
                                <option value="Premium Duo">Premium Duo ($18.99/mo)</option>
                                <option value="Premium Family">Premium Family ($21.99/mo)</option>
                                <option value="Premium Student">Premium Student ($6.99/mo)</option>
                                <option value="Free">Free / Ad-supported ($0)</option>
                            </select>
                        </div>
                    {/if}

                    {#if modalRole === 'ARTIST'}
                        <div class="form-group">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <label for="modal-streams">2025 total streams (estimate)</label>
                                <div class="help-tooltip-trigger">?
                                    <div class="help-tooltip">
                                        <strong>How to find this:</strong><br>
                                        • Check "Spotify for Artists" dashboard<br>
                                        • Look at your DistroKid/TuneCore bank totals<br>
                                        • Review your PRO (ASCAP/BMI) statements
                                    </div>
                                </div>
                            </div>
                            <input type="number" id="modal-streams" name="streams" placeholder="0" min="0">
                        </div>
                    {/if}

                    <div class="form-group">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <label for="modal-email">Email</label>
                            <div class="help-tooltip-trigger">?
                                <div class="help-tooltip">
                                    <strong>How we use this:</strong><br>
                                    • We will send a one-time confirmation.<br>
                                    • We will email you once our goal is reached with secure next steps.
                                </div>
                            </div>
                        </div>
                        <input type="email" id="modal-email" name="email" placeholder="Email" required>
                    </div>

                    {#if modalRole === 'ARTIST'}
                        <div class="form-group">
                            <label for="modal-link">Link (Portfolio / social)</label>
                            <input type="text" id="modal-link" name="link" placeholder="https://...">
                        </div>
                    {/if}

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

    /* Help Tooltip Styles */
    .help-tooltip-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        background: var(--text-color);
        color: var(--bg-color);
        border-radius: 50%;
        font-family: var(--font-main);
        font-size: 10px;
        font-weight: 900;
        cursor: help;
        position: relative;
    }

    .help-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
        width: 240px;
        background: var(--text-color);
        color: var(--bg-color);
        padding: 15px;
        font-family: 'Courier New', monospace;
        font-size: 0.75rem;
        line-height: 1.4;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        z-index: 100;
        pointer-events: none;
        border: 1px solid var(--accent-color);
    }

    .help-tooltip-trigger:hover .help-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }

    .help-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--text-color) transparent transparent transparent;
    }
</style>