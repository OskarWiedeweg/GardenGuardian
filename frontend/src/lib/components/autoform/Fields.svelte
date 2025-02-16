<script lang="ts">
    import type {Field as FieldType} from "./types";
    import type {SuperForm, SuperFormData} from "sveltekit-superforms/client";
    import Field from "$lib/components/autoform/fields/Field.svelte";

    const {fields, formData, form}: {
        fields: FieldType[],
        formData: SuperFormData<any>,
        form: SuperForm<any>
    } = $props();

</script>

{#each fields as field}
    <Field {field} {form} {formData} />
{/each}