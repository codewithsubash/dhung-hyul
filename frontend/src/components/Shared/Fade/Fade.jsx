// Fade.jsx
import React from "react";
import { motion, useInView } from "framer-motion";

const directionVariants = {
  left: { x: -120, opacity: 0 },
  right: { x: 120, opacity: 0 },
  top: { y: -120, opacity: 0 },
  bottom: { y: 120, opacity: 0 },
  center: { scale: 0.85, opacity: 0 },
};

const Fade = ({
  children,
  direction = "bottom",
  duration = 0.7,
  delay = 0,
  ease = "easeOut",
  triggerOnce = false, // ← set to false = replay on every scroll
  threshold = 0.2, // how much % of element must be visible
  ...restProps
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce, // true = animate only once
    margin: "-100px 0px", // start animation a bit earlier
    amount: threshold, // 0.2 = 20% of the element visible
  });

  const variants = {
    hidden: directionVariants[direction] || directionVariants.bottom,
    visible: { x: 0, y: 0, scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease,
        staggerChildren: 0.1, // useful if you have multiple children
      }}
      variants={variants}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};

export default Fade;
