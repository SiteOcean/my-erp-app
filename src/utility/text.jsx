// // new sales entry table format 
//   {/* multiple sales entry  */}
//   <div className="flex justify-center">
//   <div className="border-2 border-[#b4e6fd] p-1 md:p-3 rounded-md space-y-1 w-[97%] md:w-[70%] mt-4 md:mt-12">
//     <h2 className="text-center text-[25px] font-semibold underline uppercase text-[#90dcff] my-2">Sales Entry</h2>
//     {customers && customers.studentData.length > 0 ? (
//       <form onSubmit={handleFormSubmit} className="p-2 md:p-3">
//         <table className="w-full border-collapse">
//           <tbody>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Select Customer:</label>
//               </td>
//               <td className="border p-2">
//                 <select
//                   className="border-2 p-2 rounded-md outline-[#32b5f1] w-full"
//                   name="id"
//                   onChange={(e) => inputOnchangeWithCustomerName(e)}
//                   required
//                 >
//                   <option value="">Select Customer</option>
//                   {customers.studentData.map(customer => (
//                     <option key={customer.id} value={JSON.stringify({id:customer.id, name: customer.name})} className="capitalize text-slate-700">
//                       {customer.name}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Load Type:</label>
//               </td>
//               <td className="border p-2">
//                 <select
//                   value={loadData.loadType}
//                   className="border-2 p-2 rounded-md space-y-2 w-full"
//                   name="loadType"
//                   onChange={(e) => inputOnchange(e)}
//                   required
//                 >
//                   <option value="" className="text-slate-300">Select Load Type</option>
//                   <option value="msand">Msand</option>
//                   <option value="psand">Psand</option>
//                   <option value="20mm">20mm</option>
//                   <option value="12mm">12mm</option>
//                   <option value="6mm">6mm</option>
//                   <option value="gravel">Gravel</option>
//                   <option value="bolder">Bolder</option>
//                   <option value="sand">Sand</option>
//                   <option value="cement">Cement</option>
//                   <option value="Steel">Steel</option>
//                   <option value="sand">Sand</option>
//                   <option value="only_rental">Only Rental</option>
//                   <option value="others">Others</option>
//                 </select>
//               </td>
//             </tr>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Quantity:</label>
//               </td>
//               <td className="border p-2">
//                 <input
//                   type="number"
//                   value={loadData.quantity}
//                   className="p-2 border-2 rounded-md outline-[#c5ebfd] w-full"
//                   name="quantity"
//                   onChange={(e) => inputOnchange(e)}
//                   placeholder="How Many Unit?"
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Cost of Load:</label>
//               </td>
//               <td className="border p-2">
//                 <input
//                   type="number"
//                   value={loadData.amount}
//                   className="p-2 border-2 rounded-md outline-[#c5ebfd] w-full"
//                   name="amount"
//                   onChange={(e) => inputOnchange(e)}
//                   placeholder="Load Cost!"
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Cash Received:</label>
//               </td>
//               <td className="border p-2">
//                 <input
//                   type="number"
//                   value={loadData.cashRecevied}
//                   className="p-2 border-2 rounded-md outline-[#c5ebfd] w-full"
//                   name="cashRecevied"
//                   onChange={(e) => inputOnchange(e)}
//                   placeholder="Cash Received!"
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Un-Load Location:</label>
//               </td>
//               <td className="border p-2">
//                 <input
//                   type="text"
//                   value={loadData.location}
//                   className="p-2 border-2 rounded-md outline-[#c5ebfd] w-full"
//                   name="location"
//                   onChange={(e) => inputOnchange(e)}
//                   placeholder="Unload Site Location!"
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Vehicle No:</label>
//               </td>
//               <td className="border p-2">
//                 <input
//                   type="number"
//                   value={loadData.vehicleNo}
//                   className="p-2 border-2 rounded-md outline-[#c5ebfd] w-full"
//                   name="vehicleNo"
//                   onChange={(e) => inputOnchange(e)}
//                   placeholder="Vehicle No!"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="border p-2">
//                 <label className="text-[#32b5f1] font-semibold">Description:</label>
//               </td>
//               <td className="border p-2">
//                 <input
//                   type="text"
//                   value={loadData.description}
//                   className="p-2 border-2 rounded-md outline-[#c5ebfd] w-full"
//                   name="description"
//                   onChange={(e) => inputOnchange(e)}
//                   placeholder="Description Of This Load!"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="2" className="border p-2 text-center">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`bg-[#62ee62] text-white font-semibold flex items-center justify-center hover:bg-[#51fd51] rounded-md relative ${
//                     isLoading ? 'bg-[#5ed8fd] text-[#32b5f1] cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isLoading ? (
//                     <svg
//                       className="animate-spin h-9 w-9 mr-3 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                   ) : (
//                     <span className="text-[23px] uppercase">Submit</span>
//                   )}
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </form>
//     ) : (
//       <div>Loading...</div>
//     )}
//   </div>
// </div>