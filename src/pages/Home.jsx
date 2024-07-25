// pages/adminHome.js
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import NavBar from '@/components/navBar';
import { getAllCustomersAndLoads } from "@/utility/getAllCustomersAndLoads"
import { MdCurrencyRupee } from 'react-icons/md';
import Link from 'next/link';

Chart.register(...registerables);

const AdminHome = () => {
  const [chartData, setChartData] = useState({});

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [allLoads, setallLoads] = useState([]);
  const [turnOver, setTurnOver] = useState({
    totalAmount:0,
    totalReceived:0,
    totalOutstanding:0  })

    const [totalLoads, setTotalLoads] = useState(0) 
    // 
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
        paymentDetails.totalReceived = parseInt(paymentDetails.totalReceived) + parseInt(val.totalReceived)
      })
    }
    paymentDetails.totalOutstanding = paymentDetails.totalAmount - paymentDetails.totalReceived
    
    setTurnOver(paymentDetails)
    setCustomers(customersData.customerData);
    setallLoads(customersData.loads);


    let LoadData = {}; // Initialize as an empty object
    let tempTotalLoads = 0; // Initialize the counter for total loads

    customersData.loads.forEach((val) => {
        // Increment tempTotalLoads if customerName exists
        if(!val.customerName) return
        if (val.customerName) {
            tempTotalLoads++;
        }
        
        // If the loadType is not in chartData, initialize it
        if (!LoadData[val.loadType]) {
          LoadData[val.loadType] = 0;
        }

        // Increment the count for the current loadType
        LoadData[val.loadType]++;
    });
    setTotalLoads(tempTotalLoads)

    const allTypes = ['Msand', 'Psand', '20mm', '12mm', '6mm', 'Dust', 'Bolder', 'Gravel'];

  // Initialize chart data
  let dynamicChartData = {
    labels: allTypes,
    datasets: [
      {
        label: 'Sales',
        data: allTypes.map(type => LoadData[type.toLowerCase()] || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  setChartData(dynamicChartData)
      setLoading(false);

  };



  useEffect(() => {
    fetchCustomers();
  }, []);

//   console.log(chartDatas)
  return (
    <div>
      <NavBar />
      {customers ? <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold md:text-center text-[#32b5f1] mb-3 underline md:my-4">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
          <Link href={'/customersReport'} className=" shadow-md rounded-lg p-4 bg-blue-100">
            <h2 className="text-lg font-semibold text-gray-800">Total Customers</h2>
            <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
          </Link>
          <Link href={'/loadReports'} className=" shadow-md rounded-lg p-4 bg-yellow-100">
            <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-900">{totalLoads}</p>
          </Link>
          <div className="shadow-md rounded-lg p-4 bg-purple-100">
            <h2 className="text-lg font-semibold text-gray-800 ">Total Sales</h2>
            <p className="text-2xl font-bold text-gray-900 flex items-center">{turnOver.totalAmount}  <MdCurrencyRupee className='pt-1'/></p>
          </div>
          <div className=" shadow-md rounded-lg p-4 bg-green-100">
            <h2 className="text-lg font-semibold text-gray-800 ">Total Cash Received</h2>
            <p className="text-2xl font-bold text-gray-900  flex items-center">{turnOver.totalReceived}  <MdCurrencyRupee className='pt-1'/></p>
          </div>
          <div className=" shadow-md rounded-lg p-4 bg-red-100">
            <h2 className="text-lg font-semibold text-gray-800">Total Out-Standing</h2>
            <p className="text-2xl font-bold text-gray-900  flex items-center">{turnOver.totalOutstanding}  <MdCurrencyRupee className='pt-1'/></p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Sales Chart',
                  },
                },
              }}
            />
          )}
        </div>
      </div> : "loading..."}
    </div>
  );
};

export default AdminHome;
