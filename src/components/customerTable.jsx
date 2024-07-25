import React from 'react';

const CustomerDetails = ({ elementId, transformedQuery }) => {
  return (
    <div className='text-[7px] md:text-[15px]'>
      <div id={elementId} className="overflow-x-auto mx-auto p-3 w-[97%] md:w-[80%]">
        <h1 className="py-2 text-[20px] my-2 text-[#45b8d4] underline uppercase font-semibold underline-offset-2">
          Load Details:
        </h1>
        <div className='flex gap-x-2 font-semibold text-[#256c7e]'>
          <div className="w-[60px] md:w-[150px]">SNo:</div>
          <div className="w-[60px] md:w-[150px]">Date:</div>
          <div className="w-[60px] md:w-[150px]">Vehicle No:</div>
          <div className="w-[60px] md:w-[150px]">Load Type:</div>
          <div className="w-[60px] md:w-[150px]">Quantity:</div>
          <div className="w-[60px] md:w-[150px]">Credit:</div>
          <div className="w-[60px] md:w-[150px]">Debit:</div>
          <div className="w-[60px] md:w-[150px]">Location:</div>
          <div className="w-[60px] md:w-[150px]">Description:</div>
        </div>
        {transformedQuery && transformedQuery.length > 0 ? (
          transformedQuery.map((val, i) => {
            let date = val.dateTime.split(',');
            return (
              <div key={i} className="border-b flex gap-x-2 border-gray-300 py-2">
                <div className="w-[60px] md:w-[150px]">{i + 1}</div>
                <div className="w-[60px] md:w-[150px]">{date[0]}</div>
                <div className="w-[60px] md:w-[150px]">{val.vehicleNo ? val.vehicleNo : "-"}</div>
                <div className="w-[60px] md:w-[150px]">{val.loadType ? val.loadType : "-"}</div>
                <div className="w-[60px] md:w-[150px]">{val.quantity ? val.quantity : "-"} {val.quantity && 'units'}</div>
                <div className="w-[60px] md:w-[150px] text-[#f84d4d]">{val.amount ? val.amount : "-"}</div>
                <div className="w-[60px] md:w-[150px] text-[green]">{val.cashRecevied ? val.cashRecevied : "-"}</div>
                <div className="w-[60px] md:w-[150px]">{val.location ? val.location : "-"}</div>
                <div className="w-[60px] md:w-[150px]">{val.description ? val.description : "-"}</div>
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
