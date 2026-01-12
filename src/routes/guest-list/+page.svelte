<script>
    import AttendeeRow from '$lib/components/AttendeeRow.svelte';
    import AttendeeCard from '$lib/components/AttendeeCard.svelte';

    let { data } = $props();
    let attendees = $derived(data.attendees || []);

    let selectedAttendee = $state(null);
    let searchQuery = $state("");

    let filteredAttendees = $derived(
        attendees.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <div class="attendee-header">
                <div>
                    <h2 class="text-large">Attendees</h2>
                    <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// Live registry sync</p>
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