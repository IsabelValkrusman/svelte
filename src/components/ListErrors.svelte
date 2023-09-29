<script>
    export let error;
</script>

{#if error}
    <ul class="error-messages">
        {#each Object.keys(error) as key}
            <li>{key} {error[key]}</li>
        {/each}
    </ul>
{/if}