import { getAllCustomersAndLoads } from "@/utility/getAllCustomersAndLoads";
import { useEffect, useState } from "react";


const MultipleSalesSection=()=>{

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
    
      const inputOnchange=(e)=>{
        setLoadData((prev)=>({...prev, [`${e.target.name}`] : e.target.value}))
      }
    
      const inputOnchangeWithCustomerName=(e)=>{
        const selectedCustomer = JSON.parse(e.target.value);
    
        setLoadData((prev)=>({...prev, [`id`] : selectedCustomer.id}))
        setLoadData((prev)=>({...prev, [`customerName`] : selectedCustomer.name}))
    
      }

      const fetchCustomers = async () => {
        const customersData = await getAllCustomersAndLoads();
       
        setCustomers(customersData);
        setallLoads(customersData);
      };
    
      const viewCoustomer=(custId)=>{
        router.push('/viewCustomer?id='+custId)
      }
    
      useEffect(() => {
        fetchCustomers();
      }, []);

    return (
        <div className="overflow-x-auto mx-auto pl-1 md:p-0 md:w-[90%]">
            <table className="w-full">
                <thead>
                <tr className="text-[#256c7e] capitalize">
                  <th className="px-3 py-2 border-4 border-[#c6eaf3]">
                    select Customer
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
{/* =============================tbody======================================= */}
                <tbody>
                    <tr>
                        <td>
                        <div className='flex flex-col'>
                        <select className='border-2 p-2 rounded-md outline-[#32b5f1]' name="id" onChange={(e) => inputOnchangeWithCustomerName(e)} required>
                            <option value="">Select Customer</option>
                            {/* {customers.map(customer => (
                            <option key={customer.id} value={JSON.stringify({id:customer.id, name: customer.name})} className='capitalize text-slate-700'>{customer.name}</option>
                        
                        ))} */}
                    
                        </select>
                        </div>
                        </td>
                        {/*  */}
                   <td>
                   <div className='flex flex-col'>
          <input type="number" value={loadData.vehicleNo} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="vehicleNo" onChange={(e) => inputOnchange(e)}  placeholder='Vehicle No!' />
        </div>
                   </td>
                   {/*  */}
                        <td> <div className='flex flex-col'>
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
        </div></td>
                    {/*  */}
                    <td>
                    <div className='flex flex-col'>
          <input type="number" value={loadData.quantity} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="quantity" onChange={(e) => inputOnchange(e)} placeholder='How Many Unit?' required />
        </div></td>
        {/*  */}
                <td>
                <div className='flex flex-col'>
          <input type="number" value={loadData.amount} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="amount" onChange={(e) => inputOnchange(e)}  placeholder='Load Cost!' required />
        </div>
                </td>
{/*  */}
            <td>
            <div className='flex flex-col'>
          <input type="number" value={loadData.cashRecevied} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="cashRecevied" onChange={(e) => inputOnchange(e)}  placeholder='Cash Recevied!' required />
        </div>
            </td>
            {/*  */}
            <td>
            <div className='flex flex-col'>
          <input type="text" value={loadData.location} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="location" onChange={(e) => inputOnchange(e)} placeholder='Unload Site Location!' required />
        </div>
            </td>
            {/*  */}
            <td>
            <div className='flex flex-col'>
          <input type="number" value={loadData.vehicleNo} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="vehicleNo" onChange={(e) => inputOnchange(e)}  placeholder='Vehicle No!' />
        </div>
            </td>
            {/*  */}
            <td>
            <div className='flex flex-col'>
          <input type="text" value={loadData.description} className='p-2 border-2 rounded-md outline-[#c5ebfd]' name="description" onChange={(e) => inputOnchange(e)}  placeholder='Description Of This Load!' />
        </div>
            </td>
            </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MultipleSalesSection;