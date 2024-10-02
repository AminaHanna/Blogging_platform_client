import React, { useState } from "react";
import Left from "./Left";

function LeftLayout() {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <div className="hidden sm:block bg-slate-100 w-[163px] sm:w-[230px] min-h-screen">
        <Left />
      </div>

      {/* Toggle button */}
      <button
        onClick={toggleLinks}
        className="p-2 rounded-lg sm:hidden text-sm"
      >
        {showLinks ? (
          <p className="text-xl text-slate-800">
            <i class="fa-solid fa-circle-xmark"></i>
          </p>
        ) : (
          <p className="text-xl text-slate-900">
            <i class="fa-solid fa-bars"></i>
          </p>
        )}
      </button>

      {/* to smaller scrn */}
      {showLinks && (
        <div className="sm:hidden">
          <Left />
        </div>
      )}
    </>
  );
}

export default LeftLayout;
