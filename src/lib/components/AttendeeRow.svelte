<script lang="ts">
    let { id, name, role, isAccent = false, onhover } = $props();
</script>

<div 
    class="manifest-row" 
    onmouseenter={onhover}
    role="button"
    tabindex="0"
>
    <span class="manifest-id">#{id}</span>
    <span class="manifest-name" class:text-accent={isAccent}>{name}</span>
    <span class="manifest-role" style={role === 'LISTENER' ? 'border-style: dashed;' : ''}>{role}</span>
</div>