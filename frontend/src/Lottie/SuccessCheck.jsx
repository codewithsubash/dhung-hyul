import React from "react";

import successAnimation from "../assets/lottie/success.json";
import LottieAnimationWrapper from "./LottieAnimationWrapper";

const SuccessCheck = ({ height = 250 }) => {
  return (
    <LottieAnimationWrapper
      lottieFile={successAnimation}
      height={height}
      loop={false}
    />
  );
};

export default SuccessCheck;
