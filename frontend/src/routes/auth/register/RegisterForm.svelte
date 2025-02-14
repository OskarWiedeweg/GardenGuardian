<script lang="ts">
    import type {Infer} from "sveltekit-superforms/client";
    import {superForm, type SuperValidated} from "sveltekit-superforms";
    import {registerFormSchema} from "./schema";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {FormField, FormControl, FormLabel} from "$lib/components/ui/form";
    import {Input} from "$lib/components/ui/input";
    import {FormButton, FormFieldErrors} from "$lib/components/ui/form/index.js";
    import {page} from "$app/state";

    const {form: formProp}: {
        form: SuperValidated<Infer<typeof registerFormSchema>>
    } = $props();

    const form = superForm(formProp, {
        validators: zodClient(registerFormSchema)
    });

    const {form: formData, enhance} = form;
</script>

<form method="post" use:enhance>
    <FormField {form} name="name">
        <FormControl>
            {#snippet children({props})}
                <FormLabel>Name</FormLabel>
                <Input {...props} bind:value={$formData.name}/>
            {/snippet}
        </FormControl>
        <FormFieldErrors/>
    </FormField>
    <FormField {form} name="email">
        <FormControl>
            {#snippet children({props})}
                <FormLabel>Email</FormLabel>
                <Input {...props} bind:value={$formData.email}/>
            {/snippet}
        </FormControl>
        <FormFieldErrors/>
    </FormField>
    <FormField {form} name="password">
        <FormControl>
            {#snippet children({props})}
                <FormLabel>Password</FormLabel>
                <Input {...props} type="password" bind:value={$formData.password}/>
            {/snippet}
        </FormControl>
        <FormFieldErrors/>
    </FormField>
    <FormButton class="mt-4">Sign Up</FormButton>
    <div class="text-sm text-muted-foreground pt-2">
        Already have an account? <a class="text-primary underline" href="/auth/login?return={page.url.searchParams.has('return') ? page.url.searchParams.get('return') : ''}">Sign in</a>
    </div>
</form>