import React from "react";
import "../assets/css/DropBox.css";
// import pointer from '../assets/images/pointer.svg
import drop from "../assets/images/dropIcon.svg";

const DropBox = () => {
  return (
    <div>
      {/* <img src={pointer} alt="" className='pointer' /> */}
      <div className="DropBack w-[90%] h-[203px] bg-white rounded-[22px] ml-[70px] mt-[50px] px-[11px] py-[10px]">
        <div className="w-full h-[181px] bg-[#E8F4FF] border-[2px] border-dashed border-[#0F8CFF] rounded-[22px]">
          <label htmlFor="drop" className="ml-[48%] mt-[17px] cursor-pointer">
            <img src={drop} alt="" />
          </label>
          <input type="file" id="drop" className="hidden" />
          <p className="text-[#535353] text-center text-base font-poppins mt-[5px]">
            Drop PDF here
          </p>
          <div className="flex justify-between mt-[20px] mx-[20px]">
            <label
              htmlFor="browse"
              className="text-[#0F8CFF] text-base font-poppins cursor-pointer"
            >
              Browse my Computer
            </label>
            <input type="file" className="hidden" id="browse" />
            <p className="text-[#0F8CFF] text-base font-poppins cursor-pointer">
              From URL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropBox;
