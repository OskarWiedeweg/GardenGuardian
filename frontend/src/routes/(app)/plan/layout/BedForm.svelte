<script lang="ts">
    import AutoForm from "$lib/components/autoform/AutoForm.svelte";
    import {bedFormSchema} from "./schema";
    import type {FormLayout} from "$lib/components/autoform/types";

    const {form} = $props();

    const layout: FormLayout = {
        main: [
            {
                head: {
                    title: "New garden bed"
                },
                fields: [
                    {
                        type: "text",
                        label: "Bed Name",
                        name: "name",
                        placeholder: "Bed 3 - North East"
                    },
                    {
                        type: "text",
                        label: "Size",
                        name: "size",
                        placeholder: "3x3 m"
                    }
                ]
            }
        ],
        side: {
            fields: [
                {
                    type: "select",
                    label: "Category / Group",
                    name: "category",
                    options: [
                        {value: "east", label: "East"},
                        {value: "front", label: "Front"},
                        {value: "back", label: "Back"}
                    ]
                },
                {
                    type: "submit",
                    label: "Save"
                }
            ]
        }
    }
</script>

<AutoForm
        schema={bedFormSchema}
        {form}
        {layout}
/>