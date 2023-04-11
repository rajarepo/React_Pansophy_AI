import { lazy } from "react";

const pages = [
    {
        path:"/sign-in",
        Component: lazy(() =>
            import("./sign-in/SignIn.page")
        ),
    },
    {
        path:"/sign-up",
        Component: lazy(() =>
            import("./sign-up/SignUp.page")
        ),
    },
];

export const Error404 = lazy(() => import("./error-404/Error404.page"));

export const dashboardPages = [
    {
        path: "/",
        Component: lazy(() => import("./Dashboard/Home/Home.page")),
    },
    {
        path: "/datasets",
        Component: lazy(() => import("./Dashboard/Datasets/Datasets.page")),
    },
    {
        path: "/connected-websites",
        Component: lazy(() => import("./Dashboard/ConnectedWebsites/ConnectedWebsites.page")),
    },
    {
        path: "/manage-subscription",
        Component: lazy(() => import("./Dashboard/ManageSubscription/ManageSubscription.page")),
    },
    {
        path: "/settings",
        Component: lazy(() => import("./Dashboard/Settings/Settings.page")),
    },
];
