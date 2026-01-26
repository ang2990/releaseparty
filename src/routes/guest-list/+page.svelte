<script>
    import AttendeeRow from '$lib/components/AttendeeRow.svelte';
    import AttendeeCard from '$lib/components/AttendeeCard.svelte';

    let { data } = $props();
    let attendees = $derived(data.attendees || []);

    let selectedAttendee = $state(null);
    let searchQuery = $state("");
    let filterRole = $state("ALL");

    let filteredAttendees = $derived(
        attendees.filter(a => {
            const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = filterRole === "ALL" || a.role === filterRole;
            return matchesSearch && matchesRole;
        })
    );

    // Set initial selection when data loads
    $effect(() => {
        if (filteredAttendees.length > 0) {
            if (!selectedAttendee || !filteredAttendees.find(a => a.id === selectedAttendee.id)) {
                selectedAttendee = filteredAttendees[0];
            }
        } else {
            selectedAttendee = null;
        }
    });
</script>

<svelte:head>
    <title>Attendees | Release party</title>
</svelte:head>

<div class="grid-container">
    <div class="grid-row grid-sidebar" id="guestlist">
        <!-- LEFT: THE ATTENDEES LIST -->
        <div class="grid-item" style="background: var(--bg-color);">
            <div class="attendee-header" style="flex-direction: column; align-items: flex-start; gap: 20px;">
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: flex-end;">
                    <div>
                        <h2 class="text-large">Attendees</h2>
                        <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// Live registry sync</p>
                    </div>
                    <!-- Filter Controls -->
                    <div class="filter-controls">
                        <button class:active={filterRole === 'ALL'} onclick={() => filterRole = 'ALL'}>ALL</button>
                        <button class:active={filterRole === 'ARTIST'} onclick={() => filterRole = 'ARTIST'}>ARTISTS</button>
                        <button class:active={filterRole === 'LISTENER'} onclick={() => filterRole = 'LISTENER'}>LISTENERS</button>
                    </div>
                </div>
                <input 
                    type="text" 
                    class="guest-search-input" 
                    placeholder="Search by name..."
                    bind:value={searchQuery}
                >
            </div>
            
            <div class="attendee-list">
                {#each filteredAttendees as attendee}
                    <AttendeeRow 
                        {...attendee} 
                        onhover={() => selectedAttendee = attendee}
                    />
                {/each}
                {#if filteredAttendees.length === 0}
                    <div class="font-mono" style="padding: 20px; opacity: 0.5;">No matches found</div>
                {/if}
            </div>
        </div>
        
        <!-- RIGHT: THE TICKET / ID CARD -->
        <div class="grid-item-nopad">
            {#if selectedAttendee}
                <AttendeeCard {...selectedAttendee} />
            {/if}
        </div>
    </div>
</div>

<style>
    .filter-controls {
        display: flex;
        gap: 10px;
    }
    .filter-controls button {
        background: transparent;
        border: 1px solid var(--text-color);
        color: var(--text-color);
        font-family: 'Courier New', monospace;
        font-weight: 700;
        font-size: 0.8rem;
        padding: 5px 10px;
        cursor: pointer;
        opacity: 0.5;
    }
    .filter-controls button.active {
        opacity: 1;
        background: var(--text-color);
        color: var(--bg-color);
    }
    .filter-controls button:hover {
        opacity: 1;
    }

    input[type="text"].guest-search-input {

</style>