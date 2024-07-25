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
  const [companyName, setCompanyName] = useState(false)
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
  const handleExportBtn=()=>{
    if(!customer) return;
    setCompanyName(true)
    exportPdf(customer.customerName)
    
  }

  filterLoads();

  return (
    <div>
      <NavBar/>
      {customer ? 
     <div className='pb-12'>
      <div className="min-h-[40vh] mt-6 flex justify-center items-center">
       
       <div className="w-full max-w-lg px-4 md:p-2 bg-white capitalize rounded-md md:rounded-lg">
         {/* <h2 className="text-2xl font-bold mb-4 pl-2 md:pl-0 text-[#32b5f1] uppercase underline underline-offset-2">Customer Details:</h2> */}
         <div className="overflow-x-auto p-1 md:p-4 ">
  <div className="bg-white shadow-md rounded-md">
    <div className="bg-blue-100 px-4 py-2  font-semibold text-lg rounded-t-md text-blue-900 capitalize">Customer Details:</div>
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4">
      <div className="flex items-center border-b py-2">
        <span className="font-semibold text-gray-700 w-1/3">Name:</span>
        <span className="text-gray-900 ">{customer.customerName}</span>
      </div>
      <div className="flex items-center border-b py-2">
        <span className="font-semibold text-gray-700 w-1/3">Mobile:</span>
        <span className="text-gray-900">{customer.mobile}</span>
      </div>
      <div className="flex items-center border-b py-2">
        <span className="font-semibold text-gray-700 w-1/3">Address:</span>
        <span className="text-gray-900 ">{customer.address}</span>
      </div>
      <div className="flex items-center border-b py-2">
        <span className="font-semibold text-gray-700 w-1/3">Email:</span>
        <span className="text-gray-900">{customer.email}</span>
      </div>
      <div className="flex items-center justify-center md:justify-start pt-2">
        <span className="font-semibold underline underline-offset-2 capitalize text-[green]">Update Payment:</span>
      </div>
      <div className="flex flex-col md:col-span-2 border-b py-2">
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-700 w-1/3">Amount:</span>
          <input
            type="number"
            placeholder="Enter Amount!"
            name="cashRecevied"
            value={loadData.cashRecevied}
            onChange={(e) => inputOnchange(e)}
            className="border p-2 rounded-md w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Description:</span>
          <input
            type="text"
            placeholder="Enter Description!"
            name="description"
            value={loadData.description}
            onChange={(e) => inputOnchange(e)}
            className="border p-2 rounded-md w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="md:col-span-2 flex justify-center py-4">
        <button
          onClick={handleFormSubmit}
          className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Add Payment
        </button>
      </div>
    </div>
  </div>
</div>


       </div>
</div>
{/* select by data! */}
<div className="flex justify-end sticky top-[50px] md:top-[79px] bg-white z-30 mt-5 mb-3 px-1 gap-x-3 py-1 md:py-2 w-[97%] mx-auto md:w-[80%]">
          <input
            type="date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 hover:bg-slate-50 border-[#59bcf5] p-1 rounded-md outline-[#32b5f1]"
          />
          <button className='py-1 px-2 hover:bg-slate-50 flex items-center justify-center gap-x-1 border-2 border-[#59bcf5] rounded-md' onClick={()=>setSearchQuery("")}>Show All <MdOutlineRefresh className='text-[#59bcf5] md:text-[20px]'/></button>
        
        <button onClick={handleExportBtn} 
          className='py-2 px-3 bg-[blue] rounded-md text-white font-semibold'>Export Pdf</button>
        </div>
      {/* Tables */}
    
     <div id={customer.customerName} className='overflow-x-auto mx-auto p-3 w-[97%] md:w-[80%] '>
        {/* {companyName && <div>test</div>} */}
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
     
          <div className="border-[#c6eaf3] border-2 p-3 space-y-2 text-[23px] font-semibold divide-y pl-1 md:p-3  mx-auto mb-3 w-[97%] md:w-[79%]">
            <p className='flex pl-3 justify-between md:justify-end items-center'>
              <span className="text-[blue] w-[200px] md:w-[250px] flex justify-between items-center"><span className="underline">
              Total Amount</span><span >:</span></span>
              <span className="pl-2 font-bold flex text-slate-700">
                {customer.totalAmount} 
              </span>
              <MdCurrencyRupee className='text-slate-700 pt-1'/>
            </p>
            <p className='flex pl-3 justify-between md:justify-end items-center text-slate-700'>
              <span className="text-[green]  w-[200px]  md:w-[250px]  flex justify-between items-center "><span className="underline">Cash Received</span><span>:</span></span>
              <span className="pl-2 font-bold">
                {customer.totalReceived}
              </span>
              <MdCurrencyRupee/>
            </p>
            <p className='flex pl-2 justify-between md:justify-end items-center text-slate-700'>
              <span className="text-[red] w-[200px]  md:w-[250px]   flex justify-between items-center"><span className="underline">Total Outstanding</span><span>:</span></span>
              <span className="pl-2 font-bold">
                 {customer.totalAmount - customer.totalReceived}
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
