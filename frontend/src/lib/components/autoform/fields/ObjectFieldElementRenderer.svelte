<script lang="ts">
    import FieldElementRenderer from "$lib/components/autoform/fields/FieldElementRenderer.svelte";
    import type {SuperFormData} from "sveltekit-superforms/client";
    import type {FieldVariations, SpecificField} from "$lib/components/autoform/types";
    import {derived, writable} from "svelte/store";
    import {onDestroy} from "svelte";

    const {formData, field, child, ...props}: {
        formData: SuperFormData<any>,
        field: SpecificField<'object'>
        child: SpecificField<FieldVariations['type']>
    } = $props();

    let store = function () {
       const temp = writable($formData[field.name] ?? {});

       function set(value: any) {
           temp.set(value);
           $formData[field.name] = value;
       }

       return {
           subscribe: temp.subscribe,
           set
       }
    }()

    onDestroy(() => {
        $formData[field.name] = undefined;
        store = undefined;
    })
</script>

<FieldElementRenderer bind:data={$store[child.name]} field={child} {...props} />