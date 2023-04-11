import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { SideBar } from "./components";
import Logo from "./components/SideBar/Logo.components";
// import { GetMFAUri } from "store/Actions/AuthActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useSidebarData } from "./components/SideBar/data";

export function DashboardLayout({ children, hide }) {

    // const [activeSub, setActiveSub] = useState("");
    // const [activeInnerSub, setActiveInnerSub] = useState("");
    // const [activeDeepInnerSub, setActiveDeepInnerSub] = useState("");
    // const { user, isLoggedIn } = useSelector((state) => state.auth);
    // const { departments } = useSelector((state) => state?.departments);
    // const { allTickets } = useSelector((state) => state?.tickets);
    // const { pathname } = useLocation();
    // const dispatch = useDispatch();

    const lessThanDesktop = useMediaQuery({
        query: "(max-width: 900px)",
    });

    // const sidebarData = useSidebarData();

    // const sidebarLinksLength = sidebarData?.length;

    const [hideSide, setHideSide] = useState(!!lessThanDesktop);
    const [hideNoti, setHideNoti] = useState(false);

    // useEffect(() => {
    //     const activeLink = sidebarData.filter((sideItem) => {
    //         const { name, path } = sideItem;
    //         if (name === "Dashboard") {
    //             return path === pathname;
    //         } else {
    //             return pathname.includes(path);
    //         }
    //     });

    //     setActive(activeLink[0]);

    //     // Set Sublink
    //     if (activeLink?.length && activeLink[0]?.subLinks?.length) {
    //         const activeSubLink = activeLink[0].subLinks.filter((subItem) => {
    //             const { path } = subItem;
    //             return pathname.includes(path);
    //         });
    //         setActiveSub(activeSubLink[0]);

    //         if (activeSubLink?.length && activeSubLink[0]?.subLinks?.length) {
    //             const activeInnerSubLink = activeSubLink[0]?.subLinks?.filter(
    //                 ({ path }) => {
    //                     const trimmedPathname = path.substring(0, path.lastIndexOf("/"));
    //                     return pathname.includes(trimmedPathname);
    //                 }
    //             );
    //             setActiveInnerSub(activeInnerSubLink[0]);
    //             // Set Deep Inner Sub Link
    //             if (
    //                 activeInnerSubLink?.length &&
    //                 activeInnerSubLink[0]?.subLinks?.length
    //             ) {
    //                 const activeDeepInnerSubLink =
    //                     activeInnerSubLink[0]?.subLinks?.filter(({ path }) => {
    //                         const trimmedPathname = path.substring(0, path.lastIndexOf("/"));
    //                         return pathname.includes(trimmedPathname);
    //                     });
    //                 setActiveDeepInnerSub(activeDeepInnerSubLink[0]);
    //             } else {
    //                 setActiveDeepInnerSub("");
    //             }
    //         } else {
    //             setActiveInnerSub("");
    //         }
    //     }
    // }, [pathname, user, sidebarLinksLength]);

    // useEffect(() => {
    //     if (user) {
    //         dispatch(GetMFAUri(user.id));
    //     }
    // }, [user, dispatch]);

    const toggleSide = () => {
        setHideSide((state) => !state);
    };

    // const toggleNotification = (f, page) => {
    //     setHideNoti(f);
    // };


    return (
        <div
            className={`w-full md:min-h-screen ${hideNoti ? "notificationShow" : ""}`}
        >
            {/* <TopBar
                hide={hide}
                hideSide={hideSide}
                toggleSide={toggleSide}
                toggleNotification={(v) => toggleNotification(v)}
                innerSubLinks={
                    activeSub && activeSub.showDropdown ? activeSub.subLinks : []
                }
            /> */}
            <div className="flex">
                {!hide && (
                    <div className="col-auto">
                        <Logo hide={hide} hideSide={hideSide} toggleSide={toggleSide}/>
                        <SideBar hideSide={hideSide} />
                    </div>
                )}
                <div className="col" style={{background:'black'}}>
                    
                        {children}
                    </div>
                </div>
            </div>
      
    );
}