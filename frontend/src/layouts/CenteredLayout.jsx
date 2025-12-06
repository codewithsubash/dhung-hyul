import React from "react";
import { Link } from "react-router-dom";

const CenteredLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-full w-full overflow-hidden rounded-lg bg-white shadow-xl lg:container md:h-fit md:w-4/5 lg:w-1/3">
        <div className="grid h-full w-full grid-cols-1 place-content-center gap-4 p-6">
          <Link to="/">Dhung Hyul</Link>

          <br />

          {children}
        </div>
      </div>
    </div>
  );
};

export default CenteredLayout;
