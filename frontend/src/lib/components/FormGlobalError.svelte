<script lang="ts">
    import {Alert, AlertDescription} from "$lib/components/ui/alert";
    import {CircleAlert} from "lucide-svelte";

    const {errors}: {errors: {path: string, messages: string[]}[]} = $props();
    const displayErrors = $derived(errors.filter(e => e.path === "_errors").map(e => e.messages).flat())
</script>

<!--
  -  Copyright © 2025 Oskar Wiedeweg
  -  All rights reserved. This software is proprietary and confidential.
  -  Unauthorized copying of this file, via any medium is strictly prohibited.
  -->

{#each displayErrors as error}
    <Alert variant="destructive" class="my-2">
        <CircleAlert class="size-4" />
        <AlertDescription>{error}</AlertDescription>
    </Alert>
{/each}
