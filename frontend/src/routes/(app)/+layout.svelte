<script lang="ts">
    import {
        SidebarProvider,
        Sidebar,
        SidebarTrigger,
        SidebarInset,
        SidebarHeader,
        SidebarContent,
        SidebarMenu,
        SidebarMenuItem,
        SidebarMenuButton,
        SidebarGroup,
        SidebarGroupLabel
    } from "$lib/components/ui/sidebar";
    import {Separator} from "$lib/components/ui/separator";
    import {Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "$lib/components/ui/breadcrumb";
    import {Trees, Droplets, HeartPulse, Bell, LandPlot, Calendar, Sprout, Clock, Gauge} from "lucide-svelte";
    import {page} from "$app/state";
    import {getPageMap} from "$lib/pages";

    type Item = {
        title: string,
        icon: any,
        link: string
    }

    type ItemCollection = {
        items: Item[],
        title?: string
    }

    const items: ItemCollection[] = [
        {
            items: [
                {
                    title: "Dashboard",
                    icon: Gauge,
                    link: "/"
                }
            ]
        },
        {
            title: "Active Garden",
            items: [
                {
                    title: "Water Management",
                    icon: Droplets,
                    link: "/garden/water"
                },
                {
                    title: "Garden Health",
                    icon: HeartPulse,
                    link: "/garden/health"
                },
                {
                    title: "Reminders",
                    icon: Bell,
                    link: "/reminders"
                }
            ]
        },
        {
            title: "Planning & Schedule",
            items: [
                {
                    title: "Garden Layout",
                    icon: LandPlot,
                    link: "/plan/layout"
                },
                {
                    title: "Planting Calendar",
                    icon: Calendar,
                    link: "/plan/calendar"
                },
                {
                    title: "Companion Guide",
                    icon: Sprout,
                    link: "/plan/companion-guide"
                },
                {
                    title: "Task Timeline",
                    icon: Clock,
                    link: "/plan/task-timeline"
                }
            ]
        }
    ]

    const pageMap = $derived(getPageMap(page.route.id ?? "") ?? []);
    const {children} = $props();
</script>

<SidebarProvider>
    <Sidebar variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        {#snippet child({props})}
                            <a href="/" {...props}>
                                <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Trees class="size-4"/>
                                </div>
                                <div class="grid flex-1 text-left text-lg leading-tight">
                                    <span class="truncate font-semibold"><span class="font-serif text-sidebar-primary">Garden</span>Guardians</span>
                                </div>
                            </a>
                        {/snippet}
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            {#each items as itemCollection}
                <SidebarGroup>
                    {#if (itemCollection.title)}
                        <SidebarGroupLabel>{itemCollection.title}</SidebarGroupLabel>
                    {/if}
                    <SidebarMenu>
                        {#each itemCollection.items as mainItem}
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={page.url.pathname.startsWith(mainItem.link)}>
                                    {#snippet tooltipContent()}
                                        {mainItem.title}
                                    {/snippet}
                                    {#snippet child({props})}
                                        <a href={mainItem.link} {...props}>
                                            <mainItem.icon/>
                                            <span>{mainItem.title}</span>
                                        </a>
                                    {/snippet}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        {/each}
                    </SidebarMenu>
                </SidebarGroup>
            {/each}
        </SidebarContent>
    </Sidebar>
    <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2">
            <div class="flex items-center gap-2 px-4">
                <SidebarTrigger class="-ml-1" />
                <Separator orientation="vertical" class="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                    {#each pageMap as pageTree, i}
                        {#if pageMap.length-1 > i}
                            <BreadcrumbItem class="hidden md:block">
                                <BreadcrumbLink href={pageTree.link}>{pageTree.label}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator class="hidden md:block" />
                        {:else}
                            <BreadcrumbItem>
                                <BreadcrumbPage>{pageTree.label}</BreadcrumbPage>
                            </BreadcrumbItem>
                        {/if}
                    {/each}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
            {@render children()}
        </div>
    </SidebarInset>
</SidebarProvider>