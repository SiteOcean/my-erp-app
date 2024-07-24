import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure
import NavBar from '@/components/navBar';
import getLoadsById from '../utility/getLoadsById';
import { MdCurrencyRupee } from 'react-icons/md';
import { MdOutlineRefresh } from "react-icons/md";
import getCustomerById from '@/utility/getCustomerById';
import getdateTime from '@/utility/getDateTime';
import exportPdf from '@/utility/exportPdf';

const ViewCustomer = () => {
  const router = useRouter();
  const { id } = router.query;

  const [customer, setCustomer] = useState(null);
  const [customerLoads, setCustomerLoads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const inputOnchange=(e)=>{
    setLoadData((prev)=>({...prev, [`${e.target.name}`] : e.target.value}))
  }

  const fetchCustomerLoads = async () => {
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
  useEffect(() => {
    if (id) {
      fetchCustomerLoads();
    }
  }, [id]);

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

  useEffect(() => {
   
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

  const handleFormSubmit = async () => {
   

    try {
     if(!id || id === "") return;
     if(loadData.cashRecevied < 1) return;
      // Fetch the customer document
      const customerDocRef = doc(db, 'customers', id);
      const customerDocSnap = await getDoc(customerDocRef);

      if (!customerDocSnap.exists()) {
        console.error('Customer document not found!');
        return;
      }
      let temp = {...loadData};
      temp.id = id
      // Update the loads array inside the customer object
      const customerData = customerDocSnap.data();
      
      temp.dateTime = getdateTime(Date())

      if(loadData.cashRecevied > 0){
       
        customerData.totalReceived = parseInt(customerData.totalReceived) + parseInt(loadData.cashRecevied)

        customerData.totalOutstanding = parseInt(customerData.totalAmount) - parseInt(customerData.totalReceived)        
      }
    
      // setIsLoading(true)
      // Update the Firestore document with the new loads array
      await updateDoc(customerDocRef, {
      
          ...customerData,
        
      });
      const docRef = await addDoc(collection(db, 'allLoads'), {
        ...temp,
        timestamp: serverTimestamp(),
      });
      if (docRef.id) {
        alert('Payment added successfully!');
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
    
      fetchCustomerLoads();
      fetchCustomerDetails()
      
    } catch (error) {
      console.error('Error adding load to customer:', error);
      alert('Failed to add load. Please try again.');
    }
    finally{
      // setIsLoading(false)
    }
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
        <td className="px-4 py-2 text-lg">{customer.customerName}</td>
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
      <tr className="border-b">
        <td className="px-2 py-2 border-r space-y-1 text-lg font-semibold">
          <div className="">
          <input
            type="number"
            placeholder='Enter Amount!'
            name='cashRecevied'
            value={loadData.cashRecevied}
            onChange={(e) => inputOnchange(e)}
            className="border hover:bg-slate-50 placeholder:text-[16px] placeholder:font-normal border-[#d0e5f1] p-1 rounded-md outline-[#32b5f1]"
          />
        </div>
        <div className="">
          <input
            type="text"
            placeholder='Enter Description!'
            name='description'
            value={loadData.description}
            onChange={(e) => inputOnchange(e)}
            className="border hover:bg-slate-50 placeholder:text-[16px] placeholder:font-normal border-[#d0e5f1] p-1 rounded-md outline-[#32b5f1]"
          />
        </div>
        </td>
        <td className="px-4 py-2 text-lg">
          <button onClick={handleFormSubmit}
          className='px-3 py-2 bg-[#2ddb2d] text-white font-semibold rounded'>Add Payment</button></td>
      </tr>
    </tbody>
  </table>
</div>

       </div>
</div>
{/* select by data! */}
<div className="flex justify-end mt-5 mb-3 gap-x-3 w-[97%] mx-auto md:w-[80%]">
          <input
            type="date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 hover:bg-slate-50 border-[#59bcf5] p-1 rounded-md outline-[#32b5f1]"
          />
          <button className='py-1 px-2 hover:bg-slate-50 flex items-center justify-center gap-x-1 border-2 border-[#59bcf5] rounded-md' onClick={()=>setSearchQuery("")}>Show All <MdOutlineRefresh className='text-[#59bcf5] text-[20px]'/></button>
        
        <button onClick={() => exportPdf(customer.customerName)} 
          className='py-2 px-3 bg-[blue] rounded-md text-white font-semibold'>Export Pdf</button>
        </div>
      {/* Tables */}
    
     <div id={customer.customerName} className='overflow-x-auto mx-auto p-3 w-[97%] md:w-[80%] '>
    
      <h1 className='py-2 text-[20px] my-2 text-[#45b8d4] underline uppercase font-semibold underline-offset-2'>Load Details:</h1>
     <table className='w-full capitalize'>
        <thead >
          <tr  className='text-[#256c7e] capitalize text-left'>
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>SNo:</th>
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>date:</th>

          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>vehicleNo:</th>
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>loadType:</th>
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>quantity:</th>
        
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>credit:</th>
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>Debit:</th>
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>location:</th>
          <th className='px-3 py-2 border-2 border-[#c6eaf3]'>description:</th>

        
          </tr>
        </thead>

        <tbody>
          {transformedQuery && transformedQuery.length > 0 ? transformedQuery.map((val,i)=>{
             
                let date = val.dateTime.split(',')
            return (<tr key={i}>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{i+1}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{date[0]}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.vehicleNo ? val.vehicleNo : "-"}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.loadType ? val.loadType : "-"}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.quantity ? val.quantity : "-"} {val.quantity && 'units'}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3] text-[#f84d4d]'>{val.amount ? val.amount : "-"}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3] text-[green]'>{val.cashRecevied ? val.cashRecevied : "-"}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.location ? val.location  : "-"}</td>
                
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.description ? val.description : "-"}</td>
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
                : {customer.totalAmount} 
              </span>
              <MdCurrencyRupee className='text-slate-700'/>
            </p>
            <p className='flex pl-3 justify-end items-center text-slate-700'>
              <span className="text-[green] w-[250px] underline">Cash Received</span>
              <span className="pl-2 font-bold">
                : {customer.totalReceived}
              </span>
              <MdCurrencyRupee/>
            </p>
            
            <p className='flex pl-3 justify-end items-center text-slate-700'>
              <span className="text-[red] w-[250px] underline">Total Outstanding</span>
              <span className="pl-2 font-bold">
                : {customer.totalOutstanding}
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
