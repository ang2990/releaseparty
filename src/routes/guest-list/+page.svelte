<script>
    import AttendeeRow from '$lib/components/AttendeeRow.svelte';
    import AttendeeCard from '$lib/components/AttendeeCard.svelte';

    let attendees = [
        { id: "041", name: "Ray Bull", role: "ARTIST", image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", isAccent: true },
        { id: "042", name: "DIIV", role: "ARTIST", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "043", name: "Mitski", role: "ARTIST", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "044", name: "Deerhoof", role: "ARTIST", image: "https://images.unsplash.com/photo-1598555986427-d72ad79c35d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "045", name: "King Krule", role: "ARTIST", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "046", name: "Big Thief", role: "ARTIST", image: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "891", name: "Listener 891", role: "LISTENER", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "892", name: "Listener 892", role: "LISTENER", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { id: "893", name: "Listener 893", role: "LISTENER", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
    ];

    let selectedAttendee = $state(attendees[0]);
    let searchQuery = $state("");

    let filteredAttendees = $derived(
        attendees.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
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
                    <p class="font-mono" style="font-size: 0.8rem; margin-top: 5px;">// Verified list</p>
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
            <AttendeeCard {...selectedAttendee} />
        </div>
    </div>
</div>