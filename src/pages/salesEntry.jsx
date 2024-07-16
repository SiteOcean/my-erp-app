import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import NavBar from '@/components/navBar';
import {getAllCustomers} from '@/utility/getAllCustomers';

const SalesEntry = () => {
  const router = useRouter();
  const [loadData, setLoadData] = useState({
    id:"",
    loadType:"",
    amount:"",
    cashType:"",
    receivedBy:""
  })
  const [customers, setCustomers] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerRef = doc(db, 'customers', loadData.id);
      await updateDoc(customerRef, {
        loads: arrayUnion(loadData)
      });

      alert('Sales entry added successfully!');
      setLoadData('');
     
    } catch (error) {
      console.error('Error adding sales entry:', error);
      alert('Failed to add sales entry');
    }
  };

 

  const inputOnchange=(e)=>{
    setLoadData((prev)=>({...prev, [`${e.target.name}`] : e.target.value}))
  }
  useEffect(() => {
    const fetchCustomers = async () => {
      const customersData = await getAllCustomers();
      setCustomers(customersData);
    };

    fetchCustomers();
  }, []);
 
  return (
    <div>
      <NavBar/>

      <div className='flex justify-center'>
      <div className='border-2 border-slate-300 p-3 rounded-md space-y-1 w-[97%] md:w-[70%] mt-12'>
      <h2 className='text-center text-[25px] font-semibold underline uppercase text-gray-600'>Sales Entry</h2>
      <form onSubmit={handleFormSubmit} className='space-y-3 p-3 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-12'>
        
        <div className='flex flex-col'>
          <label className='text-slate-600'>Select Customer:</label>
          <select className='border-2 p-2 rounded-md' name="id" onChange={(e) => inputOnchange(e)} required>
            <option value="">Select Cash Type</option>
            {customers.map(customer => (
               <option key={customer.id} value={customer.id} className='capitalize text-slate-700'>{customer.name}</option>
        
        ))}
      
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-slate-600'>Load Type:</label>
          <select value={loadData.loadType} className='border-2 p-2 rounded-md' name="loadType" onChange={(e) => inputOnchange(e)}  required>
            <option value="">Select Load Type</option>
            <option value="msand">Msand</option>
            <option value="psand">Psand</option>
            <option value="20mm">20mm</option>
            <option value="12mm">12mm</option>
            <option value="6mm">6mm</option>
            <option value="gravel">Gravel</option>
            <option value="bolder">Bolder</option>
            <option value="sand">Sand</option>
            <option value="only_rental">Only Rental</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-slate-600'>Amount:</label>
          <input type="number" value={loadData.amount} className='p-2 border-2 rounded-md' name="amount" onChange={(e) => inputOnchange(e)}  required />
        </div>
        <div className='flex flex-col'>
          <label className='text-slate-600'>Cash Type:</label>
          <select className='border-2 p-2 rounded-md'  name="cashType" onChange={(e) => inputOnchange(e)} required>
            <option value="">Select Cash Type</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-slate-600'>Received By:</label>
          <input type="text" value={loadData.receivedBy} className='p-2 border-2 rounded-md' name="receivedBy" onChange={(e) => inputOnchange(e)}  required />
        </div>
        <button type="submit" className='bg-green-500 font-semibold px-2 py-1 hover:bg-[green] rounded-md text-gray-900 '>Add Sales Entry</button>
      </form>
    </div>
      </div>

    </div>
  );
};

export default SalesEntry;
