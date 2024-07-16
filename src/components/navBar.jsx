import Link from "next/link"
import { useRouter } from "next/router"


const NavBar = () => {

    const routerPath = useRouter();
    return (
        <div className="md:flex justify-between bg-[#5dfa99] items-center py-2 px-5">
            <div className="font-bold text-[23px]">
                My_Erp_App
            </div>

            <ul className="md:flex gap-x-5">
                <li className={`border rounded-md px-2 py-1 hover:bg-[#3adf3a] duration-300 
                    ${routerPath.pathname === "/" ? "bg-[#3adf3a]" : ""}`}>
                    <Link href={'/'}>Home</Link></li>
                <li className={`border rounded-md px-2 py-1 hover:bg-[#3adf3a] duration-300 
                    ${routerPath.pathname === "/salesSubmit" ? "bg-[#3adf3a]" : ""}`}>
                    <Link href={'/salesEntry'}>Sales Entry</Link></li>
                <li className={`border rounded-md px-2 py-1 hover:bg-[#3adf3a] duration-300 
                    ${routerPath.pathname === "/usersReport" ? "bg-[#3adf3a]" : ""}`}>
                    <Link href={'/customersReport'}>Customers Report</Link></li>
                {/* <li className={`border rounded-md px-2 py-1 hover:bg-[#3adf3a] duration-300 
                    ${routerPath.pathname === "/customReport" ? "bg-[#3adf3a]" : ""}`}>
                    <Link href={'/customReport'}>Custom Report</Link></li> */}
                    <li className={`border rounded-md px-2 py-1 hover:bg-[#3adf3a] duration-300 
                    ${routerPath.pathname === "/addCustomer" ? "bg-[#3adf3a]" : ""}`}>
                    <Link href={'/addCustomer'}>Add Customer</Link></li>
                <li className={`border rounded-md px-2 py-1 hover:bg-[#3adf3a] duration-300 
                    ${routerPath.pathname === "loginSection" ? "bg-[#3adf3a]" : ""}`}>
                    <Link href={'/loginSection'}>Login</Link></li>
            </ul>
        </div>
    )
}

export default NavBar