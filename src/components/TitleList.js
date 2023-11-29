import React, { useRef } from "react";

const TitleList = ({ id, title, formattedDate, handleSelectedNote }) => {
  const ref = useRef("");
  return (
    <>
      <div
        className="p-5 w-full cursor-pointer hover:bg-blue-500 transition-all duration-200 text-white"
        onClick={() => handleSelectedNote(id, ref.current)}
        ref={ref}
      >
        <p className="font-medium text-xl">{title}</p>
        <p className="mt-2 font-normal text-xs">{formattedDate}</p>
      </div>
      <hr className="mx-10 opacity-20" />
    </>
  );
};

export default TitleList;
