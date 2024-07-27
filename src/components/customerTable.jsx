import React from 'react';

const CustomerDetails = ({ elementId, transformedQuery }) => {
  return (
    <div className='text-[5px] sm:text-[8px] md:text-[15px]'>
      <div id={elementId} className="overflow-x-auto mx-auto p-3 w-[97%] md:w-[80%]">
        <p className='text-[#373838] text-[20px]'>My Building Materials</p>
        <h1 className="pb-2 text-[17px] mb-2 text-[#2f3030] underline capitalize">
          Load Details:
        </h1>
        <div className='flex text-center font-bold text-[#216575] border-r'>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">SNo:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Date:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Vehicle No:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Load Type:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Quantity:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Credit:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Debit:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Location:</div>
          <div className="w-[60px] md:w-[150px] border py-2 border-r-0">Description:</div>
        </div>
        {transformedQuery && transformedQuery.length > 0 ? (
          transformedQuery.map((val, i) => {
            let date = val.dateTime.split(',');
            return (
              <div key={i} className="flex text-center font-semibold capitalize text-[#4b4949] border-r">
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0 border-r-0">{i + 1}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0  border-r-0">{date[0]}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0  border-r-0">{val.vehicleNo ? val.vehicleNo : "-"}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0  border-r-0">{val.loadType ? val.loadType : "-"}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0  border-r-0">{val.quantity ? val.quantity : "-"} {val.quantity && 'units'}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0  border-r-0 text-[#f84d4d]">{val.amount ? val.amount : "-"}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0  border-r-0 text-[green]">{val.cashRecevied ? val.cashRecevied : "-"}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0  border-r-0">{val.location ? val.location : "-"}</div>
                <div className="w-[60px] md:w-[150px] border py-2 border-t-0 border-r-0 ">{val.description ? val.description : "-"}</div>
              </div>
            );
          })
       
        ) : (
          <div>No Loads...</div>
        )}
        
    </div>
    </div>
  );
};

export default CustomerDetails;
