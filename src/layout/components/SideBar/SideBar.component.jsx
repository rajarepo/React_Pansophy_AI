import React, { Fragment, useEffect } from "react";
import { Col, Row, Spin } from "antd";
import { useLocation } from "react-router-dom";
import SideLinks from "./SideLinks.component";
import "./SideBar.styles.scss";
import { useSidebarData } from "./data";
import { ArrowSwapHorizontal } from "iconsax-react";

export function SideBar({ hideSide }) {
    const { pathname } = useLocation();

    let sidebarData = useSidebarData();
    useEffect(() => { }, [pathname]);

    return (
        <Spin spinning={sidebarData?.length === 0}>
            <div
                className={`sidebar transition-all pt-[20px] ${hideSide ? "w-[95px]" : "w-[250px] h-[300px]"
                    }`}
                    style={{background:'#0C0D0F'}}
            >
                <div className="flex flex-col sidebar-content">
                    
                    <ul className="p-0">
                        {sidebarData.map(
                            ({
                                name,
                                module,
                                path,
                                hideInSide,
                                icon,
                                count,
                                show,
                                subLinks,
                            }) => {
                                return (
                                    <Fragment key={path}>
                                        {show ? (
                                            <SideLinks
                                                name={name}
                                                path={path}
                                                icon={icon}
                                                count={count}
                                                hideSide={hideSide}
                                                hideInSide={hideInSide}
                                                subLinks={subLinks}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        
                                    </Fragment>
                                    
                                );
                            }
                        )}
                 
                    </ul>
                    {!hideSide && (
                <div className='p-2 ' style={{background:'#0C0D0F'}}>
                <img src="/img/logo.svg" className="mx-auto footer-menu" alt="" />
            </div>
            )}
                </div>
                
            </div>
           
        </Spin>
    );
}
