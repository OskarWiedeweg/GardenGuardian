<script lang="ts">
    import BedForm from "../BedForm.svelte";

    const {data} = $props();
</script>

<BedForm form={data.form} />