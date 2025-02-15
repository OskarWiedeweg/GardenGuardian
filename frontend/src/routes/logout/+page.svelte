<script lang="ts">
    let form = $state<HTMLFormElement | null>(null);

    $effect(() => {
        if (form) {
            console.log("Submit")
            form.submit();
        }
    })
</script>

<form bind:this={form} method="post">
</form>