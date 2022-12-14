import { useState, useEffect } from "react";

export function useMdeia() {
  const [media, setMedia] = useState("pc");

  const getMediaType = (width: number): string => {
    if (width <= 640) {
      return "mobile";
    } else if (width <= 1007) {
      return "tablet";
    } else {
      return "pc";
    }
  };

  useEffect(() => {
    setMedia(getMediaType(window.innerWidth));
    const handleResize = () => {
      setMedia(getMediaType(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return media;
}
