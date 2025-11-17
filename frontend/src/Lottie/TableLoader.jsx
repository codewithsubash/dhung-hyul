import globeAnimation from "../assets/lottie/globe.json";
import LottieAnimationWrapper from "./LottieAnimationWrapper";

const TableLoader = () => {
  return <LottieAnimationWrapper lottieFile={globeAnimation} height={300} />;
};

export default TableLoader;
