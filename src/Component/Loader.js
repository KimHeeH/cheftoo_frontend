import React from "react";
import { MoonLoader } from "react-spinners";

const Loader = ({ loading = true, size = 80, color = "#A2A2A2" }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <MoonLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
