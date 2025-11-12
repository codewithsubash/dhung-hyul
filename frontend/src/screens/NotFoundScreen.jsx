import { useNavigate } from "react-router-dom";

import NotFound from "../../src/assets/lottie/NotFound.json";
import LottieAnimationWrapper from "../Lottie/LottieAnimationWrapper";

export const NotFoundScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12">
      <LottieAnimationWrapper lottieFile={NotFound} height={400} />

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer text-blue-500 font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundScreen;
