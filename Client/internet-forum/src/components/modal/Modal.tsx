import { motion } from "framer-motion";
import Backdrop from "components/backdrop/Backdrop";
import "components/modal/modal.css";
import { createRoutesFromChildren } from "react-router-dom";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 20,
      stifness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function Modal({ handleClose, component }: any) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {component}
      </motion.div>
    </Backdrop>
  );
}

export default Modal;
