import exportPdf from './utils/exportPdf';

const CustomerTable = ({ customer }) => {
  const handleExport = () => {
    exportPdf('customer-table');
  };

  return (
    <div id="customer-table" className="overflow-x-auto mx-auto p-3 w-[97%] md:w-[80%]">
      <h1 className="py-2 text-[20px] my-2 text-[#45b8d4] underline uppercase font-semibold underline-offset-2">Load Details:</h1>
      <div className="min-w-full bg-white border border-gray-300">
        <div className="font-bold text-slate-600">
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">SNo:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg">1</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Date:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg">2024-07-24</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Vehicle No:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg">AB123CD</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Load Type:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg">Msand</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Quantity:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg">20 units</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Credit:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg text-[#f84d4d]">5000</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Debit:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg text-[green]">3000</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Location:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg">Warehouse</div>
          </div>
          <div className="border-b flex">
            <div className="px-3 py-2 w-1/5 border-r text-lg font-semibold">Description:</div>
            <div className="px-3 py-2 w-1/5 border-r text-lg">Delivery</div>
          </div>
        </div>
      </div>
      <button onClick={handleExport} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Export as PDF</button>
    </div>
  );
};

export default CustomerTable;
