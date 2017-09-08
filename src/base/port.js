export default {
    server: "",
    base: {
        login: "/admin/login",
        upload: "/admin/upload",
        setConfig: "/admin/config",
        getConfig: "/admin/config"
    },
    content: {
        content_sort: {
            list: "/admin/content_sort/sortList",
            create: "/admin/content_sort/createSort",
            remove: "/admin/content_sort/removeSort",
            update: "/admin/content_sort/updateSort",
            order: "/admin/content_sort/orderSort"

        },
        create: "/admin/content/create",
        update: "/admin/content/update",
        remove: "/admin/content/remove",
        show: "/admin/content/show",
        comment: "/admin/content/comment",
        getList: "/admin/content/list",
        getOne: "/admin/content/getOne"
    },
    simple_page: {
        list: "/admin/simple_page/list",
        create: "/admin/simple_page/create",
        remove: "/admin/simple_page/remove",
        update: "/admin/simple_page/update"
    },
    channel: {
        list: "/admin/channel/list",
        create: "/admin/channel/create",
        remove: "/admin/channel/remove",
        update: "/admin/channel/update",
        order: "/admin/channel/order",
        getModuleTree:"/admin/channel/get_module_tree"
    }
}