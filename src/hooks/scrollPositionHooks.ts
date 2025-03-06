import { useState, useEffect } from "react";

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(
        window.pageYOffset || document.documentElement.scrollTop
      );
    };
    window.addEventListener("scroll", updatePosition);
    // 初期位置を設定
    updatePosition();
    return () => {
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);
  return scrollPosition;
};
