import React from "react";

const RowSection2 = (props) => {
  return (
    <div className="flex flex-row mb-6">
      <div className="bg-red-500 p-4 h-fit rounded-full text-white mx-4">
        {props.num}
      </div>
      <div>
        <h4 className="font-bold text-2xl">{props.title}</h4>
        <p className="text-gray-600">{props.text}</p>
      </div>
    </div>
  );
};

export default RowSection2;
