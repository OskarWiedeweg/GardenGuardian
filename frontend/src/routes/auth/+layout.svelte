<script lang="ts">
    import {Card} from "$lib/components/ui/card";

    const {children} = $props();
</script>

<div class="h-svh flex items-center justify-center bg-gray-200 dark:bg-gray-800">
    <Card class="w-full max-w-[25rem]">
        {@render children()}
    </Card>
</div>