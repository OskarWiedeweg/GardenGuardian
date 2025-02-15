<script lang="ts">
    import type {SuperForm, SuperFormData} from "sveltekit-superforms/client";
    import {Card, CardTitle, CardDescription, CardHeader, CardContent} from "$lib/components/ui/card";
    import Fields from "$lib/components/autoform/Fields.svelte";
    import type {Layout} from "$lib/components/autoform/types";

    const {layout, formData, form}: {
        layout: Layout,
        formData: SuperFormData<any>,
        form: SuperForm<any>
    } = $props();
</script>

<Card>
    {#if (layout.head)}
        <CardHeader>
            <CardTitle>{layout.head.title}</CardTitle>
            {#if (layout.head.description)}
                <CardDescription>{layout.head.description}</CardDescription>
            {/if}
        </CardHeader>
    {/if}
    <CardContent>
        <Fields fields={layout.fields} {form} {formData}/>
    </CardContent>
</Card>