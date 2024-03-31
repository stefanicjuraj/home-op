import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Components
import LogOut from './Logout';
// Icons
import home from '/home.svg';
import bill from '/bill.svg';
import maintenance from '/maintenance.svg';
import inventory from '/inventory.svg';
import visitors from '/visitors.svg';
import menu from '/menu.svg';
import security from '/security.svg';
import contact from '/contact.svg';
import wishlist from '/wishlist.svg';

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activePath, setActivePath] = useState("/");
    const location = useLocation();
    const sidebarRef = useRef(null);
    // toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen((prevState) => !prevState);
    };

    // close sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // close sidebar on click outside
    useEffect(() => {
        // this closes the sidebar when clicked on a link
        const links = document.querySelectorAll("#logo-sidebar a");
        links.forEach((link) => {
            link.addEventListener("click", closeSidebar);
        });

        // this closes the sidebar when clicked outside of it
        const handleClickOutside = (event: React.MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", closeSidebar);
            });
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // active path
    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    // active class
    const activeClass = (path: string) => {
        return activePath === path ? 'bg-blue-50' : "";
    };

    return (

        <>
            <nav className="fixed top-0 z-50 w-full bg-white shadow">
                <div className="px-3 py-5 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer">
                                <img src={menu} alt="dropdown" className="w-7 h-7" />
                            </button>
                            <Link to="/" className="flex ms-3 md:me-24">
                                <h1 className="self-center text-blue-500 font-thin text-3xl whitespace-nowrap">
                                    HomeOp
                                </h1>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div>
                                    <LogOut />
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar"
                ref={sidebarRef}
                className={`transition-transform left-0 top-0 fixed top-0 left-0 z-40 w-72 h-screen pt-40 transition-transform ${sidebarOpen ? "md:-translate-x-0" : "md:-translate-x-full"} bg-white shadow ${sidebarOpen ? "-translate-x-0" : "-translate-x-full"}`}
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-3 font-normal text-lg">
                        <li>
                            <Link to="/" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/")}`}>
                                <img src={home} alt="bill" className="w-6 h-6" />
                                <span className="ms-3">My Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/payments" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/payments")}`}>
                                <img src={bill} alt="bill" className="w-6 h-6" />
                                <span className="flex-1 ms-2 whitespace-nowrap">Bills & Payments</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/inventory" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/inventory")}`}>
                                <img src={inventory} alt="bill" className="w-6 h-6" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Inventory</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/visitors" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/visitors")}`}>
                                <img src={visitors} alt="bill" className="w-6 h-6" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Visitors</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contacts" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/contacts")}`}>
                                <img src={contact} alt="bill" className="w-6 h-6" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Contacts</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/security" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/security")}`}>
                                <img src={security} alt="bill" className="w-6 h-6" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Security</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/wishlist" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/wishlist")}`}>
                                <img src={wishlist} alt="bill" className="w-6 h-6" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Wishlist</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/maintenance" className={`flex items-center p-2 text-black rounded-xl group hover:bg-blue-50 ${activeClass("/maintenance")}`}>
                                <img src={maintenance} alt="bill" className="w-6 h-6" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Maintenance</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside >
        </>

    )

}