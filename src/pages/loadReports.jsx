import NavBar from "@/components/navBar";
import { getAllCustomersAndLoads } from "@/utility/getAllCustomersAndLoads";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";


const TotalLoads=()=>{

    const router = useRouter();
    const [allLoads, setallLoads] = useState([]);

    const [turnOver, setTurnOver] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
  
  
  
    const fetchCustomers = async () => {
      const customersData = await getAllCustomersAndLoads();
      const paymentDetails = {
        totalAmount:0,
        totalReceived:0,
        totalOutstanding:0,
      }
      if(customersData && customersData.customerData  ){
        customersData.customerData.map((val)=>{
          paymentDetails.totalAmount = parseInt(paymentDetails.totalAmount) + parseInt(val.totalAmount)
          paymentDetails.totalOutstanding = parseInt(paymentDetails.totalOutstanding) + parseInt(val.totalOutstanding)
          paymentDetails.totalReceived = parseInt(paymentDetails.totalReceived) + parseInt(val.totalReceived)
        })
      }
      setTurnOver(paymentDetails)
      setallLoads(customersData.loads);
    };
  
    const viewCoustomer=(custId)=>{
      router.push('/viewCustomer?id='+custId)
    }
  
    useEffect(() => {
      fetchCustomers();
    }, []);
  
    const filteredCustomers = allLoads.filter((load) =>
      load.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) || load.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    let serialNo = 0

    return (
        <div>
            <NavBar/>
            {allLoads && (
        <div className='pl-1 md:w-[90%] mx-auto pt-2 pb-9'>
       <div className="flex justify-between items-center px-3 py-3">
       <h1 className="md:text-[25px] underline uppercase text-center font-bold text-[#32b5f1]">
        Sales Report
      </h1>
             {/* input */}
             <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 px-2 py-1 rounded-md outline-[#32b5f1] border-[#ace0f8]"
          />
        </div>
       </div>
          <div className="overflow-x-auto pl-1 md:p-0 pb-2 ">
            <table className="w-full">
              <thead>
                <tr className="text-[#256c7e] capitalize">
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">SNo:</th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Customer Name
                  </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Vehicle No
                  </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Load Type
                  </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Quantity
                  </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Load Amount
                    </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Cash Received
                  </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Location
                  </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    DateTime
                  </th>
                  <th className="px-3 py-4 border-2 border-[#c6eaf3]">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filteredCustomers && filteredCustomers.length > 0 ? (
                  filteredCustomers.map((val, i) => {
                   
                    if(!val.vehicleNo) return null
                    serialNo += 1;
                    return (
                      <tr key={i} onClick={() => viewCoustomer(val.id)}  className="text-slate-500 capitalize font-semibold cursor-pointer odd:bg-white even:bg-slate-50">
                        <td className="px-3 py-2 border-2 border-[#c6eaf3] ">
                          {serialNo}
                        </td>
                        <td 
                        className="px-3 py-2 border-2 border-[#c6eaf3] ">
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
          {turnOver && <div className="border-[#c6eaf3] border-2 p-3 space-y-2 text-[23px] font-semibold divide-y pl-1 md:p-3  mx-auto mb-3">
            <p className='flex pl-3 justify-between md:justify-end items-center'>
              <span className="text-[blue] w-[200px] md:w-[250px] flex justify-between items-center"><span className="underline">
              Total Amount</span><span >:</span></span>
              <span className="pl-2 font-bold flex text-slate-700">
                {turnOver.totalAmount} 
              </span>
              <MdCurrencyRupee className='text-slate-700 pt-1'/>
            </p>
            <p className='flex pl-3 justify-between md:justify-end items-center text-slate-700'>
              <span className="text-[green]  w-[200px]  md:w-[250px]  flex justify-between items-center "><span className="underline">Cash Received</span><span>:</span></span>
              <span className="pl-2 font-bold">
                {turnOver.totalReceived}
              </span>
              <MdCurrencyRupee/>
            </p>
            <p className='flex pl-2 justify-between md:justify-end items-center text-slate-700'>
              <span className="text-[red] w-[200px]  md:w-[250px]   flex justify-between items-center"><span className="underline">Total Outstanding</span><span>:</span></span>
              <span className="pl-2 font-bold">
                 {turnOver.totalAmount - turnOver.totalReceived}
              </span>
              <MdCurrencyRupee/>
            </p>
          </div>}
        </div>
      )}
        </div>
    )
}
export default TotalLoads;