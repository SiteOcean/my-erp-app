import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const routerPath = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-[#32b5f1] text-white font-semibold sticky top-0">
            <div className="md:flex justify-between items-center py-2 md:py-5 px-2 md:px-5 relative">
                <div className="font-bold text-[23px] cursor-progress">
                    My_Erp_App
                </div>
                <div className="absolute top-3 right-3 md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
                <ul className={`space-y-2 md:space-y-0 pt-3 md:p-0 md:flex gap-x-5 ${isOpen ? "block" : "hidden"} md:block`}>
                    <li>
                        <Link href={'/'} className={`block md:inline-block border rounded-md px-3 py-2 hover:bg-[white] hover:text-[#32b5f1] duration-300 ${routerPath.pathname === "/" ? "bg-[white] text-[#32b5f1]" : ""}`}>
                                Home
                            
                        </Link>
                    </li>
                   
                    <li>
                        <Link href={'/salesEntry'} className={`block md:inline-block border rounded-md px-3 py-2 hover:bg-[white] hover:text-[#32b5f1] duration-300 ${routerPath.pathname === "/salesEntry" ? "bg-[white] text-[#32b5f1]" : ""}`}>
                                Sales Entry
                          
                        </Link>
                    </li>
                    <li>
                        <Link href={'/loadReports'}className={`block md:inline-block border rounded-md px-3 py-2 hover:bg-[white] hover:text-[#32b5f1] duration-300 ${routerPath.pathname === "/loginSection" ? "bg-[white] text-[#32b5f1]" : ""}`}>
                                Load Reports
                           
                        </Link>
                    </li>
                    <li>
                        <Link href={'/customersReport'} className={`block md:inline-block border rounded-md px-3 py-2 hover:bg-[white] hover:text-[#32b5f1] duration-300 ${routerPath.pathname === "/customersReport" ? "bg-[white] text-[#32b5f1]" : ""}`}>
                                Customers Report
                         
                        </Link>
                    </li>
                    <li>
                        <Link href={'/addCustomer'} className={`block md:inline-block border rounded-md px-3 py-2 hover:bg-[white] hover:text-[#32b5f1] duration-300 ${routerPath.pathname === "/addCustomer" ? "bg-[white] text-[#32b5f1]" : ""}`}>
                                Add Customer
                         
                        </Link>
                    </li>
                    <li>
                        <Link href={'/loginSection'}className={`block md:inline-block border rounded-md px-3 py-2 hover:bg-[white] hover:text-[#32b5f1] duration-300 ${routerPath.pathname === "/loginSection" ? "bg-[white] text-[#32b5f1]" : ""}`}>
                                Login
                           
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
