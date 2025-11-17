import React from "react";

import emptyBoxAnimation from "../assets/lottie/empty-box.json";
import LottieAnimationWrapper from "./LottieAnimationWrapper";

export const EmptyResult = ({ height = 250, label = "No Data Found!" }) => {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <LottieAnimationWrapper lottieFile={emptyBoxAnimation} height={height} />

      <div className="text-sm tracking-wider text-gray-500 dark:text-gray-200">
        {label}
      </div>
    </div>
  );
};

export default EmptyResult;
