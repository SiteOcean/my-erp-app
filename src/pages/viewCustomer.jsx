import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure
import NavBar from '@/components/navBar';
import getLoadsById from '../utility/getLoadsById';

const ViewCustomer = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);
  const [customerLoads, setCustomerLoads] = useState(null);

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
        
        const docRef = doc(db, 'customers', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const customerData = docSnap.data().customer;
          setCustomer(customerData);
          
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

  return (
    <div>
      <NavBar/>
      {customer ? 
     <div>
 <div>
        <h2>Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Mobile:</strong> {customer.mobile}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      </div>

      {/* Tables */}
    
      <table>
        <thead >
          <tr  className='text-[#256c7e] capitalize'>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>vehicleNo</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>loadType</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>quantity</th>
        
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>amount</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>Cash Received</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>location</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>dateTime</th>
          <th className='px-3 py-2 border-4 border-[#c6eaf3]'>description</th>

        
          </tr>
        </thead>

        <tbody>
          {customerLoads && customerLoads.length > 0 ? customerLoads.map((val,i)=>{
             
                  amountCalculation.totalAmount = amountCalculation.totalAmount + Number(val.amount)
                
            return (<tr key={i}>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.vehicleNo}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.loadType}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.quantity} unit</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.amount}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.cashRecevied}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.location}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.dateTime}</td>
                 <td className='px-3 py-2 border-2 border-[#c6eaf3]'>{val.description}</td>
            </tr>)
          })  
          :
          <div>No Loads...</div>}

         
        </tbody>

        <thead className=''>
          <tr>
            <th  className='px-3 py-2 border-4 border-[#7ef8da] text-[#3588b8]'>Total Amount:</th>
            <th className='px-3 py-2 border-4 border-[#7ef8da] text-[#30a530]'>Cash Recevied:</th>
            <th className='px-3 py-2 border-4 border-[#7ef8da] text-[#f54b4b]'>Total Outstanding:</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className='px-3 py-2 border-2 border-[#7ef8da]'>{amountCalculation.totalAmount}</td>
            <td className='px-3 py-2 border-2 border-[#7ef8da]'>{customer.totalReceived}</td>
            <td className='px-3 py-2 border-2 border-[#7ef8da]'>{customer.totalOutstanding}</td>
          </tr>
        </tbody>
      </table>

     </div>
      : <div>Loading...</div>}
      
    </div>
  );
};

export default ViewCustomer;
