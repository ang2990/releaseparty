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
    });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid-container">
    <!-- HEADER -->
    <header>
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

    {@render children()}

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
                    <button type="button" style="display: block; margin-bottom: 5px; background: none; border: none; color: inherit; padding: 0;">Instagram</button>
                    <button type="button" style="display: block; margin-bottom: 5px; background: none; border: none; color: inherit; padding: 0;">Twitter / X</button>
                </div>
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