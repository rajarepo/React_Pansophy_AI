import {
    Dashboard,
    Billing,
} from "../../../icons";
import { Speedometer, Notepad2, Global, Card, Setting5 } from "iconsax-react";


export const useSidebarData = () => {
    // Side Bar Data
    const sidebarData = [
        {
            name: "Models",
            path: "/dashboard",
            show: true,
            icon: (fill) => <Speedometer fill={fill} />
        },
        {
            name: "Datasets",
            path: "/dashboard/datasets",
            show: true,
            icon: (fill) => <Notepad2 fill={fill} />
        },
        {
            name: "Connected Websites",
            path: "/dashboard/connected-websites",
            show: true,
            icon: (fill) => <Global fill={fill} />
        },
        {
            name: "Manage Subscription",
            path: "/dashboard/manage-subscription",
            show: true,
            icon: (fill) => <Card fill={fill} />
        },
        {
            name: "Settings",
            path: "/dashboard/settings",
            show: true,
            icon: (fill) => <Setting5 fill={fill} />
        },
    ];
    return sidebarData;
};
