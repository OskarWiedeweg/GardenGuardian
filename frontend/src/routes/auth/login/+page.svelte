<script lang="ts">
    import LoginForm from "./LoginForm.svelte";
    import {CardContent, CardDescription, CardHeader, CardTitle} from "$lib/components/ui/card";

    const {data} = $props();
</script>

<CardHeader>
    <CardTitle class="text-xl">Login</CardTitle>
    <CardDescription>Sign into your account.</CardDescription>
</CardHeader>
<CardContent>
    <LoginForm form={data.form}/>
</CardContent>
