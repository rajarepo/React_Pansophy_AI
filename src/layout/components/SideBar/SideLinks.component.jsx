import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

function SideLinks({
    name,
    path,
    icon,
    hideSide,
    hideInSide,
    count,
    subLinks,
}) {
    const { pathname } = useLocation();
    const isActive = name === "Dashboard" ? pathname === path : pathname.includes(path);
    return (
        <>
            {!hideInSide ? (
                <li>
                    <Link
                        to={path}
                        // onClick={() =>
                        // (name = "Support"
                        //     ? dispatch(setSupport(true))
                        //     : dispatch(setSupport(false)))
                        // }
                        className={`${
                            isActive ? "when-active text-[#0096C7]" : ""
                            } pt-3 pb-2 flex text-gray-500 no-underline side-menu hover:text-[#0096C7] hover:bg-blue/[.2] ease-in duration-100 px-4`}
                        >
                        {icon(isActive ? "#3699ff" : "#494b74")}
                        <div className="flex items-center gap-[12px]">
                            <span
                                className={`${hideSide ? "hidden" : "inline"} transition-all`}
                            >
                                &nbsp; {name}
                            </span>
                            <Badge pill bg="primary">
                                {count}
                            </Badge>
                        </div>
                    </Link>
                    {!hideSide && subLinks?.length && (
                        <ul
                            className={`sublinks text-gray-500 ${isActive ? "bg-[#1B1B28]" : ""
                                }`}
                        >
                            {subLinks?.map(
                                (link) =>
                                    link?.show &&
                                    link?.showSide && (
                                        <li>
                                            <NavLink
                                                // onClick={() =>
                                                // (name = "My Tickets"
                                                //     ? dispatch(setSupport(true))
                                                //     : dispatch(setSupport(false)))
                                                // }
                                                to={link?.path}
                                                className={({ isActive }) =>
                                                    (isActive ? `text-[#3699FF] ` : "text-gray-500 ") +
                                                    ` flex items-center w-full pl-1 no-underline hover:bg-[#0096C7] hover:text-[#3699FF] ease-in duration-100 py-2`
                                                }
                                            >
                                                <span>{">"}</span>
                                                <div className="flex items-center gap-[12px]">
                                                    <span
                                                        className={`${hideSide ? "hidden" : "inline"
                                                            } transition-all`}
                                                    >
                                                        &nbsp; {link?.name}
                                                    </span>
                                                    {/* <Switch checked={checked} onChange={() => setChecked(!checked)}/> */}
                                                    <Badge pill bg="primary">
                                                        {link?.count}
                                                    </Badge>
                                                </div>
                                            </NavLink>
                                            {!hideSide && link?.subLinks?.length > 0 && (
                                                <ul
                                                    className={`sublinks text-gray-500 ${isActive ? "bg-[#0096C7]" : ""
                                                        }`}
                                                >
                                                    {link?.subLinks?.map(
                                                        (link) =>
                                                            link?.show &&
                                                            link?.showSide && (
                                                                <li className="flex items-center">
                                                                    <span>{">>"}</span>
                                                                    <NavLink
                                                                        to={link?.path}
                                                                        className={({ isActive }) =>
                                                                            (isActive
                                                                                ? `text-[#3699FF] `
                                                                                : "text-gray-500 ") +
                                                                            ` no-underline hover:bg-[#1b1b2b] hover:text-[#3699FF] ease-in duration-100 py-2`
                                                                        }
                                                                    >
                                                                        <div className="flex items-center gap-[12px]">
                                                                            <span
                                                                                className={`${hideSide ? "hidden" : "inline"
                                                                                    } transition-all`}
                                                                            >
                                                                                &nbsp; {link?.name}
                                                                            </span>
                                                                            <Badge pill bg="primary">
                                                                                {link?.count}
                                                                            </Badge>
                                                                        </div>
                                                                    </NavLink>
                                                                </li>
                                                            )
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    )
                            )}
                        </ul>
                    )}
                </li>
            ) : (
                <></>
            )}
        </>
    );
}

export default SideLinks;
