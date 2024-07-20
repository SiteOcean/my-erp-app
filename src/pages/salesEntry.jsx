import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc, arrayUnion, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import NavBar from '@/components/navBar';
import {getAllCustomers} from '@/utility/getAllCustomers';
import getdateTime from '@/utility/getDateTime';
import getAllLoads from '@/utility/getAllLoads';
import { MdCurrencyRupee } from "react-icons/md";
const SalesEntry = () => {
  const router = useRouter();


  const [loadData, setLoadData] = useState({
    id:"",
    customerName:"",
    loadType:"",
    quantity:"",
    amount:"",
    cashRecevied:"",
    location:"",
    description:"",
    vehicleNo:"",
    dateTime:"",
  })
  const [customers, setCustomers] = useState(null);
  const [allLoads, setallLoads] = useState(null);
  const paymentDetails = {
    totalAmount:0,
    totalRecived:0,
    totalOutstanding:0,
  }
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the customer document
      const customerDocRef = doc(db, 'customers', loadData.id);
      const customerDocSnap = await getDoc(customerDocRef);

      if (!customerDocSnap.exists()) {
        console.error('Customer document not found!');
        return;
      }
   
      // Update the loads array inside the customer object
      const customerData = customerDocSnap.data().customer;
     

      customerData.totalAmount = parseInt(customerData.totalAmount) + parseInt(loadData.amount)
      loadData.dateTime = getdateTime(Date())

      if(loadData.cashRecevied > 0){
       
        customerData.totalReceived = parseInt(customerData.totalReceived) + parseInt(loadData.cashRecevied)

        customerData.totalOutstanding = parseInt(customerData.totalAmount) - parseInt(customerData.totalReceived)        
      }
      setIsLoading(true)
      // Update the Firestore document with the new loads array
      await updateDoc(customerDocRef, {
        customer: {
          ...customerData,
        }
      });
      const docRef = await addDoc(collection(db, 'allLoads'), {loadData})
      if (docRef.id) {
        alert('Load added successfully!');
        setLoadData({
          id:"",
          customerName:"",
          loadType:"",
          quantity:"",
          amount:"",
          cashRecevied:"",
          location:"",
          description:"",
          vehicleNo:"",
          dateTime:"",
        });
      } else {
        alert('Failed to add customer');
      }
     
      setCustomers(null)
      fetchCustomers();
      
      
    } catch (error) {
      console.error('Error adding load to customer:', error);
      alert('Failed to add load. Please try again.');
    }
    finally{
      setIsLoading(false)
    }
  };

 

  const inputOnchange=(e)=>{
    setLoadData((prev)=>({...prev, [`${e.target.name}`] : e.target.value}))
  }

  const inputOnchangeWithCustomerName=(e)=>{
    const selectedCustomer = JSON.parse(e.target.value);

    setLoadData((prev)=>({...prev, [`id`] : selectedCustomer.id}))
    setLoadData((prev)=>({...prev, [`customerName`] : selectedCustomer.name}))

  }

  const fetchCustomers = async () => {
    const customersData = await getAllCustomers();
    const Loads = await getAllLoads();
    setCustomers(customersData);
    setallLoads(Loads);
  };

  const viewCoustomer=(custId)=>{
    router.push('/viewCustomer?id='+custId)
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  let serialNo = 0
  return (
    <div className='pb-12'>
      <NavBar/>

      <div className='flex justify-center'>
      <div className='border-2 border-[#b4e6fd] p-1 md:p-3 rounded-md space-y-1 w-[97%] md:w-[70%] mt-4 md:mt-12'>
      <h2 className='text-center text-[25px] font-semibold underline uppercase text-[#90dcff] my-2'>Sales Entry</h2>
      {customers && customers.studentData.length > 0 ? <form onSubmit={handleFormSubmit} className='p-2 md:p-3 grid grid-cols-1 md:grid-cols-3 md:gap-12 space-y-5 md:space-y-0'>
        
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold'>Select Customer:</label>
          <select className='border-2 p-2 rounded-md outline-[#32b5f1]' name="id" onChange={(e) => inputOnchangeWithCustomerName(e)} required>
            <option value="">Select Customer</option>
            {customers.studentData.map(customer => (
               <option key={customer.id} value={JSON.stringify({id:customer.id, name: customer.name})} className='capitalize text-slate-700'>{customer.name}</option>
        
        ))}
      
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold'>Load Type:</label>
          <select value={loadData.loadType} className='border-2 p-2 rounded-md space-y-2' name="loadType" onChange={(e) => inputOnchange(e)}  required>
            <option value="" className='text-slate-300'>Select Load Type</option>
            <option value="msand">Msand</option>
            <option value="psand">Psand</option>
            <option value="20mm">20mm</option>
            <option value="12mm">12mm</option>
            <option value="6mm">6mm</option>
            <option value="gravel">Gravel</option>
            <option value="bolder">Bolder</option>
            <option value="sand">Sand</option>
            <option value="cement">Cement</option>
            <option value="Steel">Steel</option>
            <option value="sand">Sand</option>
            <option value="only_rental">Only Rental</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold flex justify-between'>Quantity: <span>{`${`( Units )`}`}</span></label>
          <input type="number" value={loadData.quantity} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="quantity" onChange={(e) => inputOnchange(e)} placeholder='How Many Unit?' required />
        </div>
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold'>Cost of Load:</label>
          <input type="number" value={loadData.amount} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="amount" onChange={(e) => inputOnchange(e)}  placeholder='Load Cost!' required />
        </div>
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold'>Cash Recevied:</label>
          <input type="number" value={loadData.cashRecevied} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="cashRecevied" onChange={(e) => inputOnchange(e)}  placeholder='Cash Recevied!' required />
        </div>
       
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold'>Un-Load Location:</label>
          <input type="text" value={loadData.location} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="location" onChange={(e) => inputOnchange(e)} placeholder='Unload Site Location!' required />
        </div>
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold'>Vehicle No:</label>
          <input type="number" value={loadData.vehicleNo} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="vehicleNo" onChange={(e) => inputOnchange(e)}  placeholder='Vehicle No!' />
        </div>
        <div className='flex flex-col'>
          <label className='text-[#32b5f1] font-semibold flex justify-between'>Description: <span>{`(optional)`}</span></label>
          <input type="text" value={loadData.description} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="description" onChange={(e) => inputOnchange(e)}  placeholder='Description Of This Load!' />
        </div>
        <button
            type='submit'
            disabled={isLoading}
            className={`bg-[#62ee62] text-white font-semibold flex items-center justify-center hover:bg-[#51fd51] rounded-md relative ${
                isLoading ? 'bg-[#5ed8fd] text-[#32b5f1] cursor-not-allowed' : ''
            }`}
        >
            {isLoading ? (
                <svg
                    className="animate-spin h-9 w-9 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            ) : <span className='text-[23px] uppercase'>Submit</span> }
        </button>
      
      </form> : <div>loading...</div>}
    </div>
      </div>


{/* sales list table */}
{allLoads && (
        <div className='pl-1'>
         <h1 className="text-[25px] underline uppercase text-center font-bold text-[#32b5f1] my-3">
        Sales Report
      </h1>
          <div className="overflow-x-auto mx-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#256c7e] capitalize">
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">SNo:</th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Customer Name
                  </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Vehicle No
                  </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Load Type
                  </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Quantity
                  </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Load Amount
                    </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Cash Received
                  </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Location
                  </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    DateTime
                  </th>
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {allLoads && allLoads.length > 0 ? (
                  allLoads.map((val, i) => {
                    serialNo += 1;
                    paymentDetails.totalAmount =
                      parseInt(paymentDetails.totalAmount) +
                      parseInt(val.amount);
                    paymentDetails.totalRecived =
                      parseInt(paymentDetails.totalRecived) +
                      parseInt(val.cashRecevied);

                    return (
                      <tr key={i} className="text-slate-700 font-semibold">
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {serialNo}
                        </td>
                        <td onClick={() => viewCoustomer(val.id)} 
                        className="px-3 py-2 border-2 border-[#c6eaf3] cursor-pointer">
                          {val.customerName}
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.vehicleNo}
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.loadType}
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.quantity} unit
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.amount}
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.cashRecevied}
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.location}
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.dateTime}
                        </td>
                        <td className="px-3 py-2 border-2 border-[#c6eaf3]">
                          {val.description}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center text-slate-700 py-4"
                    >
                      No Loads...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="border-[#c6eaf3] border-2 p-3 space-y-2 font-semibold divide-y">
            <p className='flex pl-3 justify-start items-center'>
              <span className="text-[blue] w-[250px] underline">Total Amount</span>
              <span className="pl-2 font-bold flex ">
                : {paymentDetails.totalAmount} 
              </span>
              <MdCurrencyRupee/>
            </p>
            <p className='flex pl-3 justify-start items-center'>
              <span className="text-[green] w-[250px] underline">Cash Received</span>
              <span className="pl-2 font-bold">
                : {paymentDetails.totalRecived}
              </span>
              <MdCurrencyRupee/>
            </p>
            <p className='flex pl-2 justify-start items-center'>
              <span className="text-[red] w-[250px] underline">Total Outstanding</span>
              <span className="pl-2 font-bold">
                : {paymentDetails.totalAmount - paymentDetails.totalRecived}
              </span>
              <MdCurrencyRupee/>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesEntry;
