import React, { useState } from "react";
import { Link } from "react-router-dom";

// SidebarProps
export type Sidebar_ItemsType = {
    label: string;
    path: string;
}[];

export type SidebarPropsType = {
    items: Sidebar_ItemsType;
};

const Sidebar: React.FC<SidebarPropsType> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="p-3 min-h-screen bg-purple-600 text-white md:hidden w-auto text-base"
                onClick={() => setIsOpen(!isOpen)}
            >
                メニュー
            </button>
            <div
                className={`p-4 bg-purple-700 min-h-screen md:block ${
                isOpen ? "block" : "hidden"
                }`}
            >
                <ul className="flex flex-col space-y-3">
                    {items.map((item, index) => (
                        <li key={index}>
                        <Link
                            to={item.path}
                            className="block px-3 py-2 text-white bg-purple-600 rounded hover:bg-purple-500 transition duration-300"
                        >
                            {item.label}
                        </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
