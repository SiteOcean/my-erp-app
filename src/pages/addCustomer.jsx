import { useState } from 'react';
import { db } from '../../firebase';
import NavBar from '@/components/navBar';
import getdateTime from '@/utility/getDateTime';
import { addDoc, collection } from 'firebase/firestore';
import { set } from 'date-fns';

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: '',
    mobile: '',
    address: '',
    email: '',
    description:"",
    totalAmount:"",
    totalOutstanding:"",
    totalReceived:"",
    created:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      if (window.confirm(`Are you sure you want to add this customer? 
        Name: ${customer.name} 
        Mobile: ${customer.mobile} 
        Address: ${customer.address}
        Email: ${customer.email}`)) {

        let temp = {...customer};
          
          temp.totalAmount = 0
          temp.totalOutstanding = 0,
          temp.totalReceived = 0,
          temp.created= getdateTime(Date())

          const docRef = await addDoc(collection(db, 'customers'), {...temp})
  
        if (docRef.id) {
          alert('Customer added successfully');
          setCustomer((prev)=>({
            name: '',
            mobile: '',
            address: '',
            email: '',
            description:"",
            totalAmount:"",
            totalOutstanding:"",
            totalReceived:"",
            created:""
          }));
        } else {
          alert('Failed to add customer');
        }
      } else {
        return;
      }
  
    } catch (error) {
      console.error('Error adding customer: ', error);
      alert('Error adding customer');
    }
  };
  

  return (
    <div>
        <NavBar/>
        <div className='min-h-[80vh] flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='p-5 rounded-md w-[97%] md:w-[41%] mt-6 
         border-2 border-[#b4e6fd] text-center space-y-6 md:space-y-4'>
      <h1 className='font-semibold underline uppercase text-[#7ad3fc] '>Add New Customer </h1>
      <div className='flex flex-col text-left'>
        <label htmlFor="name" className='text-[#32b5f1]  font-semibold'>Customer Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={customer.name}
          onChange={handleChange}
          required
          placeholder='Name'
          className='rounded-md p-2 placeholder-slate-300 placeholder:font-normal text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <div className='flex flex-col text-left'>
        <label htmlFor="mobile" className='text-[#32b5f1]  font-semibold'>Mobile:</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          value={customer.mobile}
          onChange={handleChange}
          required
            placeholder='Mobile'
          className='rounded-md p-2 placeholder-slate-300 placeholder:font-normal text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <div className='flex flex-col text-left'>
        <label htmlFor="address" className='text-[#32b5f1]  font-semibold'>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={customer.address}
          onChange={handleChange}
          required
            placeholder='Address'
          className='rounded-md p-2 placeholder-slate-300 placeholder:font-normal text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <div className='flex flex-col text-left'>
        <label htmlFor="email" className='text-[#32b5f1]  font-semibold'>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
            placeholder='Email'
          className='rounded-md p-2 placeholder-slate-300 placeholder:font-normal text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <div className='flex flex-col text-left'>
        <label htmlFor="email" className='text-[#32b5f1]  font-semibold'>Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={customer.description}
          onChange={handleChange}
            placeholder='Enter Description About Customer!'
          className='rounded-md p-2 placeholder-slate-300 placeholder:font-normal text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <button className='px-2 py-1 bg-[#32b5f1] text-white rounded-md hover:bg-[#299ed4] duration-200' type="submit">Add Customer</button>
    </form>
        </div>
    </div>
  );
};

export default AddCustomer;
