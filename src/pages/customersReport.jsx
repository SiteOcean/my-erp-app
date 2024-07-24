import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure
import NavBar from '@/components/navBar';
import { useRouter } from 'next/router';
import EditCustomer from '@/pages/editCustomerDetails';

const CustomersReportPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const getCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, 'customers'));
    const customerData = [];

    querySnapshot.forEach((doc) => {
     
      customerData.push({ id: doc.id, ...doc.data() });
    });

    setCustomers(customerData);
  };

  const viewCustomer = (custId) => {
    router.push('/viewCustomer?id=' + custId);
  };

  const editCust = (custId) => {
    router.push('/editCustomerDetails?id=' + custId);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="min-h-[80vh] mt-3 md:w-[90%] mx-auto">
      <div className="flex justify-between items-center px-3 py-3">
        <h1 className="text-center font-semibold text-[23px] uppercase underline underline-offset-2 text-[#32b5f1]">
          Customers List
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-slate-300 p-1 rounded-md outline-[#32b5f1]"
          />
        </div>
        </div>
        <div className="overflow-x-auto mx-auto pl-2 p-1 pb-3">
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
            {filteredCustomers.length > 0 ? (
              <tbody className="capitalize font-serif">
                {filteredCustomers.map((customer, i) => (
                  <tr
                    key={customer.id}
                    className="odd:bg-white even:bg-slate-50 hover:bg-slate-100"
                  >
                    <td className="border-2 border-slate-300 px-2 py-1">{i + 1}</td>
                    <td
                      onClick={() => viewCustomer(customer.id)}
                      className="border-2 cursor-pointer border-slate-300 px-2 py-1"
                    >
                      {customer.customerName}
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      {customer.mobile}
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      {customer.email}
                    </td>
                    <td className="border-2 border-slate-300 px-2 py-1">
                      {customer.address}
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
                <tr className="border border-slate-400 h-12">
                  <td colSpan="7" className="text-center py-2">No customers found</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersReportPage;
