import { useState, useEffect } from "react";

export function useMedia() {
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
    const handleResize = () => {
      const width = Math.min(window.innerWidth, window.screen.width);
      setMedia(getMediaType(width));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return media;
}
