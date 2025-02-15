<script lang="ts">
    import type {PageData} from "./$types";
    import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "$lib/components/ui/card";
    import EmptyState from "$lib/components/EmptyState.svelte";
    import {goto} from "$app/navigation";
    import {Table, TableHead, TableHeader, TableRow, TableBody, TableCell} from "$lib/components/ui/table";
    import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "$lib/components/ui/dropdown-menu";
    import {Button} from "$lib/components/ui/button";
    import {Ellipsis, Eye} from "lucide-svelte";

    const {data}: {data: PageData} = $props();
</script>

<Card>
    <CardHeader>
        <CardTitle>Garden Beds</CardTitle>
        <CardDescription>Organize and manage your garden layout by adding beds. Track their details and plan efficiently.</CardDescription>
    </CardHeader>
    <CardContent>
        {#if (data.beds.meta.total === 0)}
            <EmptyState
                    title="No garden beds yet"
                    description="Start planning your garden by creating your first bed."
                    action={() => goto("/plan/layout/new")}
                    actionLabel="Create Bed"
            />
        {:else}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {#each data.beds.data as bed}
                        <TableRow onclick={() => goto(`/plan/layout/${bed.id}`)}>
                            <TableCell>{bed.name}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        {#snippet child({props})}
                                            <Button variant="ghost" size="icon" {...props}>
                                                <Ellipsis/>
                                            </Button>
                                        {/snippet}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onclick={() => goto(`/plan/layout/${bed.id}`)}>
                                            <Eye />
                                            View
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    {/each}
                </TableBody>
            </Table>
        {/if}
    </CardContent>
</Card>