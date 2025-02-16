<script lang="ts">
    import type {SpecificField} from "$lib/components/autoform/types";
    import {Checkbox} from "$lib/components/ui/checkbox";
    import {Label} from "$lib/components/ui/form";

    let {data = $bindable(), field, ...props}: {
        data: any
        field: SpecificField<'checkbox'>,
    } = $props();
</script>

<div class="flex items-center gap-2">
    <Checkbox
            bind:checked={data}
            {...props}
    />
    <Label>{field.label}</Label>
</div>