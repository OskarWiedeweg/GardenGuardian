<script lang="ts">
    import {
        SidebarProvider,
        Sidebar,
        SidebarTrigger,
        SidebarInset,
        SidebarHeader,
        SidebarContent,
        SidebarFooter,
        SidebarMenu,
        SidebarMenuItem,
        SidebarMenuButton,
        SidebarGroup,
        SidebarGroupLabel,
        useSidebar
    } from "$lib/components/ui/sidebar";
    import {Separator} from "$lib/components/ui/separator";
    import {Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "$lib/components/ui/breadcrumb";
    import {Avatar, AvatarFallback} from "$lib/components/ui/avatar";
    import {
        Trees,
        Droplets,
        HeartPulse,
        Bell,
        LandPlot,
        Calendar,
        Sprout,
        Clock,
        Gauge,
        ChevronsUpDown,
        LogOut
    } from "lucide-svelte";
    import {page} from "$app/state";
    import {getPageMap} from "$lib/pages";
    import {setUser, getUser} from "$lib/state.svelte";
    import {buildReturnParam} from "$lib/utils";
    import {
        DropdownMenu,
        DropdownMenuTrigger,
        DropdownMenuContent,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuItem,
    } from "$lib/components/ui/dropdown-menu";
    import {goto} from "$app/navigation";

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

    function getInitials(name: string) {
        const nameParts = name.trim().split(/\s+/);

        if (nameParts.length >= 2) {
            return (
                nameParts[0].charAt(0).toUpperCase() +
                nameParts[nameParts.length - 1].charAt(0).toUpperCase()
            );
        }

        return nameParts[0].charAt(0).toUpperCase();
    }

    const pageMap = $derived(getPageMap(page.route.id ?? "") ?? []);
    const {children, data} = $props();
    setUser(data.user);

    const sidebar = useSidebar();
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
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {#snippet child({props})}
                                <SidebarMenuButton {...props} size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarFallback class="rounded-lg">{getInitials(getUser().name)}</AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{getUser().name}</span>
                                        <span class="truncate text-xs">{getUser().email}</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto size-4" />
                                </SidebarMenuButton>
                            {/snippet}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                                class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
                                side={sidebar?.isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                        >
                            <DropdownMenuLabel>
                                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarFallback class="rounded-lg">{getInitials(getUser().name)}</AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{getUser().name}</span>
                                        <span class="truncate text-xs">{getUser().email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onclick={() => goto(`/logout?${buildReturnParam(page.url)}`)}>
                                <LogOut/>
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
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