<script lang="ts">
    import {Select, SelectContent, SelectItem, SelectTrigger} from "$lib/components/ui/select";
    import type {SpecificField} from "$lib/components/autoform/types";

    let {data = $bindable(), field, ...props}: {
        data: any,
        field: SpecificField<'select'>,
    } = $props();
</script>

<Select type="single" bind:value={data} {...props}>
    <SelectTrigger>
        {field.options.find(opt => opt.value === data)?.label ||
        field.placeholder || 'Select an option'}
    </SelectTrigger>
    <SelectContent>
        {#each field.options || [] as option}
            <SelectItem value={option.value}>{option.label}</SelectItem>
        {/each}
    </SelectContent>
</Select>