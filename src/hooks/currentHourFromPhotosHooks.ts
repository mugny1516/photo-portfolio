import { useState, useEffect } from "react";

// スクロール位置 (scrollPosition) を引数として受け取り、表示中の写真に基づいて現在の時間を返す
export const useCurrentHourFromPhotos = (scrollPosition: number): number => {
  // 現在の時間を管理する状態を初期化（初期値は現在の時間）
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // スクロール位置が変更されたときに時間を更新
  useEffect(() => {
    const photos = document.querySelectorAll("[data-hour]");
    let closestPhoto: Element | null = null;
    let minDistance = Infinity;

    // 各写真のビューポート上端からの距離を計算し、最も近い写真を特定
    photos.forEach((photo) => {
      const rect = photo.getBoundingClientRect();
      const distance = Math.abs(rect.top);

      if (distance < minDistance) {
        minDistance = distance;
        closestPhoto = photo;
      }
    });
    // 最も近い写真から時間を取得して状態を更新
    if (closestPhoto) {
      const hour = parseInt(
        (closestPhoto as HTMLElement).getAttribute("data-hour") || "0"
      );
      setCurrentHour(hour);
    }
  }, [scrollPosition]);

  return currentHour;
};
