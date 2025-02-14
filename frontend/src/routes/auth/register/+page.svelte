<script lang="ts">
    import RegisterForm from "./RegisterForm.svelte";
    import {CardContent, CardDescription, CardHeader, CardTitle} from "$lib/components/ui/card";

    const {data} = $props();
</script>

<CardHeader>
    <CardTitle class="text-xl">Sign Up</CardTitle>
    <CardDescription>Create an account.</CardDescription>
</CardHeader>
<CardContent>
    <RegisterForm form={data.form}/>
</CardContent>
