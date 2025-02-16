<script lang="ts">
    import type {Field} from "$lib/components/autoform/types";
    import type {SuperForm, SuperFormData} from "sveltekit-superforms/client";
    import {
        FormButton,
        FormControl,
        FormDescription, FormElementField, FormField,
        FormFieldErrors,
        FormFieldset,
        FormLegend
    } from "$lib/components/ui/form";
    import {LoaderCircle} from "lucide-svelte";
    import FieldElementRenderer from "$lib/components/autoform/fields/FieldElementRenderer.svelte";
    import ObjectField from "$lib/components/autoform/fields/ObjectField.svelte";

    const {field, form, formData}: {
        field: Field,
        formData: SuperFormData<any>,
        form: SuperForm<any>
    } = $props();

    const {submitting} = form;
</script>

{#if field.type === "submit"}
    <FormButton type="submit" disabled={$submitting} class="w-full">
        {#if $submitting}
            <LoaderCircle class="mr-2 h-4 w-4 animate-spin"/>
        {/if}
        {field.label}
    </FormButton>
{:else if !field.dependent || $formData[field.dependent.field] === field.dependent.value}
    {#if field.type === "object"}
        <ObjectField {field} {form} {formData} />
    {:else}
        <FormField {form} name={field.name}>
            <FormControl>
                {#snippet children({props})}
                    <FieldElementRenderer {field} bind:data={$formData[field.name]} {...props} />
                {/snippet}
            </FormControl>
            {#if (field.description)}
                <FormDescription>{field.description}</FormDescription>
            {/if}
            <FormFieldErrors/>
        </FormField>
    {/if}
{/if}