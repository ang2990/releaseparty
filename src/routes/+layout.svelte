<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // Import page store
	// Import global CSS here
	import '../app.css';

	let { children } = $props();

    onMount(() => {
        // --- 1. TICKER LOGIC ---
        const counter = document.getElementById('mainCounter');
        // Start from a realistic high number
        let count = 1450221161;
        
        setInterval(() => {
            // Simulate live streams coming in
            const increment = Math.floor(Math.random() * 12) + 1; 
            count += increment;
            if (counter) {
                counter.innerText = count.toLocaleString();
            }
        }, 200);

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
                Release<span class="text-accent">Party</span>
            {:else}
                <a href="/">Release<span class="text-accent">Party</span></a>
            {/if}
        </div>
        <nav>
            <a href="/vision" class="nav-link">The Vision</a>
            <a href="/guest-list" class="nav-link">Guests</a>
            <a href="/exodus" class="nav-link">The Exodus</a>
            <a href="/join" class="nav-link">Join Us</a>
            <a href="/resources" class="nav-link">Resources</a>
            <button type="button" class="nav-link text-accent" on:click={() => openModal('RSVP')}>RSVP</button>
        </nav>
    </header>

    <!-- TICKER (MARQUEE) -->
    <div class="marquee-container grid-row">
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

    {@render children()}

    <!-- FOOTER -->
    <footer class="grid-row grid-sidebar footer-dark">
        <div class="grid-item">
            <h2 class="text-large">Release Party</h2>
            <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">© 2025. Built for the Exodus. Music is not content.</p>
        </div>
        <div class="grid-item">
            <h4 style="margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.1em;">Connect</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="nav-link nav-link-footer">Instagram</a>
                <a href="#" class="nav-link nav-link-footer">Twitter / X</a>
                <a href="#" class="nav-link nav-link-footer">Mastodon</a>
            </div>
        </div>
    </footer>

    <!-- MODAL -->
    <div class="modal-overlay" id="modal">
        <div class="modal-box">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <h2 id="modal-title">RSVP</h2>
                <button style="font-size: 2rem; cursor: pointer; line-height: 0.5; background: none; border: none; color: inherit; padding: 0;" on:click={() => closeModal()}>&times;</button>
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