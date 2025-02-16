<script lang="ts">
    import {Label} from "$lib/components/ui/form";
    import {Input} from "$lib/components/ui/input";
    import SelectField from "$lib/components/autoform/fields/SelectField.svelte";
    import TextareaField from "$lib/components/autoform/fields/TextareaField.svelte";
    import CheckboxField from "$lib/components/autoform/fields/CheckboxField.svelte";
    import type {SpecificField, FieldVariations} from "$lib/components/autoform/types";

    let {field, data = $bindable(), ...props}: {
        data: any,
        field: SpecificField<FieldVariations['type']>,
    } = $props();
</script>

{#if field.type === 'select'}
    <Label>{field.label}</Label>
    <SelectField {field} bind:data {...props} />
{:else if field.type === 'textarea'}
    <Label>{field.label}</Label>
    <TextareaField {field} bind:data {...props} />
{:else if field.type === 'checkbox'}
    <CheckboxField {field} bind:data {...props} />
{:else}
    <Label>{field.label}</Label>
    <Input
            type={field.type}
            bind:value={data}
            placeholder={field.placeholder}
            {...props}
    />
{/if}