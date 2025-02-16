<script lang="ts">
    import {
        FormControl,
        FormDescription,
        FormElementField,
        FormFieldErrors, FormFieldset,
        FormLegend
    } from "$lib/components/ui/form";
    import FieldElementRenderer from "$lib/components/autoform/fields/FieldElementRenderer.svelte";
    import type {SpecificField} from "$lib/components/autoform/types";
    import type {SuperForm, SuperFormData} from "sveltekit-superforms/client";
    import {onDestroy} from "svelte";
    import ObjectFieldElementRenderer from "$lib/components/autoform/fields/ObjectFieldElementRenderer.svelte";

    const {field, formData, form}: {
        field: SpecificField<'object'>,
        formData: SuperFormData<any>,
        form: SuperForm<any>
    } = $props();

    if (!$formData[field.name]) {
        $formData[field.name] = {};
    }
    //
    // onDestroy(() => {
    //     $formData[field.name] = undefined;
    // })
</script>

<FormFieldset class="mt-3.5" {form} name={field.name}>
    <FormLegend>{field.label}</FormLegend>
    <div class={field.cols === 2 ? "grid gap-4 md:grid-cols-2" : ""}>
        {#each field.children as child}
            <FormElementField {form} name={`${field.name}[${child.name}]`}>
                <FormControl>
                    {#snippet children({props})}
                        <ObjectFieldElementRenderer {formData} {field} {child} {...props} />
                    {/snippet}
                </FormControl>
                {#if (field.description)}
                    <FormDescription>{field.description}</FormDescription>
                {/if}
                <FormFieldErrors/>
            </FormElementField>
        {/each}
    </div>
    <FormFieldErrors/>
</FormFieldset>