<script lang="ts">
    import {Textarea} from "$lib/components/ui/textarea";
    import type {SpecificField} from "$lib/components/autoform/types";

    let {data = $bindable(), field, ...props}: {
        data: any
        field: SpecificField<'textarea'>,
    } = $props();
</script>

<Textarea
        bind:value={data}
        placeholder={field.placeholder}
        {...props}
/>