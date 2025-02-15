type PageTree = {
    link: string,
    label: string,
    exclusive?: boolean,
    children?: Record<string, PageTree>,
}

export const pageMap: Record<string, PageTree> = {
    "(app)": {
        link: "/",
        label: "Dashboard",
        exclusive: true,
        children: {
            plan: {
                link: "/",
                label: "Planning & Schedule",
                children: {
                    layout: {
                        link: "/plan/layout",
                        label: "Garden Layout",
                        children: {
                            "new": {
                                link: "/plan/layout/new",
                                label: "New Bed"
                            },
                            "[id]": {
                                link: "/plan/layout",
                                label: "Garden Bed #id"
                            }
                        }
                    }
                }
            }
        }
    }
}

export function getPageMap(pageId: string) {
    const treeParts = pageId.split("/").slice(1);

    let currentTree = [];
    let map: Record<string, PageTree> | undefined = pageMap;
    let i = 0;
    for (let treePart of treeParts) {
        if (!map) {
            return null;
        }
        const currentMap: PageTree | undefined = map[treePart];
        if (!currentMap) {
            return null;
        }
        if (!currentMap.exclusive || treeParts.length-1 === i) {
            currentTree.push({
                link: currentMap.link,
                label: currentMap.label
            })
        }
        map = currentMap.children;
        i++;
    }
    return currentTree;
}