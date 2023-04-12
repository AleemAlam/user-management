import { PropsWithChildren, useEffect, useState } from "react";
import styles from "./Alert.module.css";
import { Variant } from "../utils/Alerts/constants";

export default function Alert({
  variant,
  children,
  show,
}: PropsWithChildren<{
  variant: Variant;
  show: boolean;
}>) {
  const [showAlert, setShowAlert] = useState<Boolean>(show);

  const handleClose = () => {
    setShowAlert(false);
  };

  // alert hide automatically after 5 sec
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  return (
    showAlert && (
      <div className={`${styles.alert} ${styles[variant]}`}>
        {children}
        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>
      </div>
    )
  );
}
