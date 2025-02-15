<script lang="ts">
    import {Button} from "$lib/components/ui/button";

    const {title, description, actionLabel, action}: {
        title: string,
        description: string,
        actionLabel: string,
        action: () => void
    } = $props();
</script>

<div class="w-full h-full p-10 flex flex-col items-center justify-center border-2 rounded border-dashed">
    <h3 class="font-semibold text-lg">{title}</h3>
    <p class="text-sm text-muted-foreground">{description}</p>
    <Button class="mt-4" onclick={action}>
        {actionLabel}
    </Button>
</div>