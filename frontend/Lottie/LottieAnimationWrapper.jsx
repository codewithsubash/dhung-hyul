import Lottie from "lottie-react";

const LottieAnimationWrapper = ({ lottieFile, height = 200, ...props }) => {
  return <Lottie animationData={lottieFile} style={{ height }} {...props} />;
};

export default LottieAnimationWrapper;
