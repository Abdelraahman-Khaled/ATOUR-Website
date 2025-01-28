import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const AosAnimation = ({children}) => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: "ease-in-out", // Easing for the animation
      once: true
    });
    window.addEventListener("load", AOS.refresh);
  }, []);
  return(
    <>
    {children}
    </>
  )
};

export default AosAnimation;
