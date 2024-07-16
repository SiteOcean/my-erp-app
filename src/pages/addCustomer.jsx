import { useState } from 'react';
import { db } from '../../firebase';
import NavBar from '@/components/navBar';
import getdateTime from '@/utility/getDateTime';
import { addDoc, collection } from 'firebase/firestore';

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: '',
    mobile: '',
    address: '',
    email: '',
    loads:[],
    totalAmount:0,
    amountRecevied:[],
    amountBalance:0,
    created:getdateTime(Date())


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

        
        const docRef = await addDoc(collection(db, 'customers'), {customer})
  
        if (docRef.id) {
          alert('Customer added successfully');
          setCustomer((prev)=>({
            ...prev,
            name: '',
            mobile: '',
            address: '',
            email: ''
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
        <div className='h-[80vh] flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='p-5 rounded-md w-[30%] border text-center space-y-3 md:space-y-4'>
      <h1 className='font-semibold text-slate-600 underline uppercase'>Add New Customer </h1>
      <div className='flex flex-col text-left'>
        <label htmlFor="name" className='text-gray-500 font-semibold'>Customer Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={customer.name}
          onChange={handleChange}
          required
          placeholder='Name'
          className='rounded-md p-2 placeholder-slate-300 text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <div className='flex flex-col text-left'>
        <label htmlFor="mobile" className='text-gray-500 font-semibold'>Mobile:</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={customer.mobile}
          onChange={handleChange}
          required
            placeholder='Mobile'
          className='rounded-md p-2 placeholder-slate-300 text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <div className='flex flex-col text-left'>
        <label htmlFor="address" className='text-gray-500 font-semibold'>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={customer.address}
          onChange={handleChange}
          required
            placeholder='Address'
          className='rounded-md p-2 placeholder-slate-300 text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <div className='flex flex-col text-left'>
        <label htmlFor="email" className='text-gray-500 font-semibold'>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
            placeholder='Email'
          className='rounded-md p-2 placeholder-slate-300 text-slate-600 font-semibold border hover:bg-[#fcf8f8] outline-slate-300'
        />
      </div>
      <button className='px-2 py-1 bg-[#55ff55] rounded-md hover:bg-[#40db40] duration-200' type="submit">Add Customer</button>
    </form>
        </div>
    </div>
  );
};

export default AddCustomer;
