import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure
import NavBar from '@/components/navBar';
import { useRouter } from 'next/router';
import EditCustomer from '@/pages/editCustomerDetails';

const CustomersReportPage = () => {
  const [customers, setCustomers] = useState(null);
  const router = useRouter();

  const getCustomers = async () => {
   

    const querySnapshot = await getDocs(collection(db, 'customers'));
    
    const studentData = [];

    querySnapshot.forEach((doc) => {
      const customer = doc.data();
      const loadsCount = customer ? customer.customer.loads.length : 0;
      studentData.push({ id: doc.id,loadsCount, ...doc.data() });
    });

    setCustomers(studentData);
  };

  const viewCoustomer=(custId)=>{
    router.push('/viewCustomer?id='+custId)
  }

  const editCust=(custId)=>{
    router.push('/editCustomerDetails?id='+custId)
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="min-h-[80vh] mt-6">
        <h1 className="text-center my-3 font-semibold text-[23px] text-[#32b5f1]">
          Customers List
        </h1>
        <div className="overflow-x-auto pl-2 w-[97%] md:w-[60%]">
          <table className="w-full mx-auto">
            <thead className="border bg-slate-200 text-left">
              <tr>
                <th className="border-2 border-slate-300 px-2 py-2">S.No</th>
                <th className="border-2 border-slate-300 px-2 py-2">Name</th>
                <th className="border-2 border-slate-300 px-2 py-2">Mobile</th>
                <th className="border-2 border-slate-300 px-2 py-2">Email</th>
                <th className="border-2 border-slate-300 px-2 py-2">Address</th>
                <th className="border-2 border-slate-300 px-2 py-2"></th>
                <th className="border-2 border-slate-300 px-2 py-2"></th>
              </tr>
            </thead>
            {customers && customers.length > 0 ? (
              <tbody className="capitalize font-serif">
                {customers.map((customer, i) => (
                  <tr
                    key={customer.id}
                    className="odd:bg-white even:bg-slate-50 hover:bg-slate-100"
                  >
                    <td className="border-2 border-slate-300 px-2 py-1">{i + 1}</td>
                    <td
                      onClick={() => viewCoustomer(customer.id)}
                      className="border-2 cursor-pointer border-slate-300 px-2 py-1"
                    >
                      {customer.customer.name}
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      {customer.customer.mobile}
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      {customer.customer.email}
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      {customer.customer.address}
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      <button
                        onClick={() => editCust(customer.id)}
                        className="bg-[#5ed8fd] p-1 w-full"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      <button className="bg-[#ff5050] p-1 w-full">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr className="border border-slate-400 h-12"></tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
  
}
export default CustomersReportPage