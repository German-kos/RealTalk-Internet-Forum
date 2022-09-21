import { motion } from "framer-motion";
import "components/backdrop/backdrop.css";

// function Backdrop({ children: any, onClick: any }) {
function Backdrop({ children, onClick }: any) {
  const opcSettings = { 0: { opacity: 0 }, 1: { opacity: 1 } };
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={opcSettings[0]}
      animate={opcSettings[1]}
      exit={opcSettings[0]}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
