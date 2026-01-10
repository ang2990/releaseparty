<script lang="ts">
    let { id, name, role, isAccent = false, onhover } = $props();
</script>

<div 
    class="attendee-row" 
    onmouseenter={onhover}
    role="button"
    tabindex="0"
>
    <span class="attendee-id">#{id}</span>
    <span class="attendee-name" class:text-accent={isAccent}>{name}</span>
    <span class="attendee-role" style={role === 'LISTENER' ? 'border-style: dashed;' : ''}>{role}</span>
</div>