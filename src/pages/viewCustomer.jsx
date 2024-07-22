import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure
import NavBar from '@/components/navBar';
import getLoadsById from '../utility/getLoadsById';
import { MdCurrencyRupee } from 'react-icons/md';
import { MdOutlineRefresh } from "react-icons/md";
import getCustomerById from '@/utility/getCustomerById';

const ViewCustomer = () => {
  const router = useRouter();
  const { id } = router.query;

  const [customer, setCustomer] = useState(null);
  const [customerLoads, setCustomerLoads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const paymentDetails = {
    totalAmount:0,
    totalRecived:0,
    totalOutstanding:0,
  }
  let amountCalculation = {
    totalAmount : 0,
  }
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
      
      
          const customerLoads = await getLoadsById(id);
           
        if(customerLoads){
          setCustomerLoads(customerLoads);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        
        const docSnap = await getCustomerById(id)
        if (docSnap) {
          setCustomer(docSnap);
          
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    if (id) {
      fetchCustomerDetails();
    }
  }, [id]);
let transformedQuery;
  const filterLoads = () => {
    let transformedQueryLocal = searchQuery.split('-').reverse().join('/');

    transformedQuery = customerLoads.filter((load) => {
      const date = load.dateTime.split(',')[0];
      return date.includes(transformedQueryLocal);
    });
  };
  filterLoads()
  return (
    <div>
      <NavBar/>
      {customer ? 
     <div className='pb-12'>
      <div className="min-h-[40vh] mt-6 flex justify-center items-center">
       
       <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg capitalize">
         <h2 className="text-2xl font-bold mb-4 text-[#32b5f1] uppercase underline underline-offset-2">Customer Details:</h2>
         <div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-300">
    <tbody className="font-bold text-slate-600">
      <tr className="border-b">
        <td className="px-2 py-2 border-r text-lg font-semibold">Name:</td>
        <td className="px-4 py-2 text-lg">{customer.name}</td>
      </tr>
      <tr className="border-b">
        <td className="px-2 py-2 border-r text-lg font-semibold">Mobile:</td>
        <td className="px-4 py-2 text-lg">{customer.mobile}</td>
      </tr>
      <tr className="border-b">
        <td className="px-2 py-2 border-r  text-lg font-semibold">Address:</td>
        <td className="px-4 py-2 text-lg">{customer.address}</td>
      </tr>
      <tr className="border-b">
        <td className="px-2 py-2 border-r  text-lg font-semibold">Email:</td>
        <td className="px-4 py-2 text-lg">{customer.email}</td>
      </tr>
    </tbody>
  </table>
</div>

       </div>
</div>

<div className="flex justify-end mt-5 mb-3 gap-x-3 w-[97%] mx-auto md:w-[80%]">
          <input
            type="date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 hover:bg-slate-50 border-[#59bcf5] p-1 rounded-md outline-[#32b5f1]"
          />
          <button className='py-1 px-2 hover:bg-slate-50 flex items-center justify-center gap-x-1 border-2 border-[#59bcf5] rounded-md' onClick={()=>setSearchQuery("")}>Show All <MdOutlineRefresh className='text-[#59bcf5] text-[20px]'/></button>
        </div>
      {/* Tables */}
    
     <div className='overflow-x-auto mx-auto pl-2 w-[97%] md:w-[80%]'>
    
      <h1 className='py-2 text-[20px] text-[#45b8d4] underline uppercase font-semibold underline-offset-2'>Load Details:</h1>
     <table className='w-full capitalize'>
        <thead >
          <tr  className='text-[#256c7e] capitalize'>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>SNo:</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>date</th>

          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>vehicleNo</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>loadType</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>quantity</th>
        
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>Load amount</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>Cash Received</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>location</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>description</th>

        
          </tr>
        </thead>

        <tbody>
          {transformedQuery && transformedQuery.length > 0 ? transformedQuery.map((val,i)=>{
             
             paymentDetails.totalAmount =
             parseInt(paymentDetails.totalAmount) +
             parseInt(val.amount);
           paymentDetails.totalRecived =
             parseInt(paymentDetails.totalRecived) +
             parseInt(val.cashRecevied);
                let date = val.dateTime.split(',')
            return (<tr key={i}>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{i+1}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{date[0]}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.vehicleNo}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.loadType}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.quantity} unit</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.amount}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.cashRecevied}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.location}</td>
                
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.description}</td>
            </tr>)
          })  
          :
          <div>No Loads...</div>}

         
        </tbody>
      </table>
   
     </div>
     <div className="border-[#c6eaf3]  p-3 space-y-2 text-[23px] font-semibold divide-y pl-1
     w-[97%] md:w-[80%] mx-auto pb-12">
            <p className='flex pl-3 justify-end items-center'>
              <span className="text-[blue] w-[250px] underline">Total Amount</span>
              <span className="pl-2 font-bold flex text-slate-700">
                : {paymentDetails.totalAmount} 
              </span>
              <MdCurrencyRupee className='text-slate-700'/>
            </p>
            <p className='flex pl-3 justify-end items-center text-slate-700'>
              <span className="text-[green] w-[250px] underline">Cash Received</span>
              <span className="pl-2 font-bold">
                : {paymentDetails.totalRecived}
              </span>
              <MdCurrencyRupee/>
            </p>
            
            <p className='flex pl-3 justify-end items-center text-slate-700'>
              <span className="text-[red] w-[250px] underline">Total Outstanding</span>
              <span className="pl-2 font-bold">
                : {paymentDetails.totalAmount - paymentDetails.totalRecived}
              </span>
              <MdCurrencyRupee/>
            </p>
          </div>
     </div>
      : <div>Loading...</div>}
      
    </div>
  );
};

export default ViewCustomer;
