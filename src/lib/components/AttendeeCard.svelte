<script lang="ts">
    let { id, name, role, image, origin = "NYC", status = "CONFIRMED", classType = "A" } = $props();
</script>

<div class="ticket-view" style="background-image: url('{image}');">
    <div class="ticket-overlay"></div>
    <div class="ticket-stamp">RSVP'd</div>
    <div class="ticket-data">
        <div class="font-mono" style="font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.5); padding-bottom: 5px; margin-bottom: 5px;">USER_ID: #{id}</div>
        <h2 style="font-size: 3rem; line-height: 1; text-transform: uppercase;">{name}</h2>
        <div class="font-mono" style="font-size: 0.9rem;">ROLE: {role} // CLASS: {classType}</div>
        <div class="font-mono" style="font-size: 0.9rem;">ORIGIN: {origin} // STATUS: {status}</div>
    </div>
</div>