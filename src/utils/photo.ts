import { Photo } from "../types/photo";

/**
 * 日時文字列をAM/PM形式の時間表記に変換する
 * 例: "2023-01-01T09:30:00" → "AM 9:30"
 * @param {string} dateString - パース可能な日時文字列（例: "2023-01-01T09:30:00"）
 * @returns {string} AM/PM表記の時間文字列（例: "AM 9:30"、正午は"PM 12:00"、深夜0時は"AM 12:00"）
 */
export const formatTakenAt = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours < 12 ? "AM" : "PM";
  const formattedHours = hours % 12 || 12; // 12時間表記（0時は12とする）

  return `${period} ${formattedHours}:${minutes}`;
};

/**
 * 指定された写真の配列を、現在の時刻を基準とした時刻順にソート
 * 例えば、現在の時刻が 15 時の場合、順番は以下
 * 15, 16, 17, ... 23, 0, 1, 2, ... 14
 * @param photos 撮影情報を含む Photo オブジェクトの配列
 * @returns ソート済みの Photo オブジェクトの配列
 */
export const sortPhotosByHour = (photos: Photo[]): Photo[] => {
  const currentHour = new Date().getHours();
  return photos.slice().sort((a, b) => {
    const hourA = new Date(a.takenAt).getHours();
    const hourB = new Date(b.takenAt).getHours();
    // 現在時刻からの時間差を24時間サイクルで計算
    const diffA =
      hourA >= currentHour ? hourA - currentHour : hourA + 24 - currentHour;
    const diffB =
      hourB >= currentHour ? hourB - currentHour : hourB + 24 - currentHour;

    return diffA - diffB;
  });
};

/**
 * 24時間表記の時間（0〜23）を12時間表記の2桁文字列に変換する
 * 例：
 *  - 0 → "12"
 *  - 9 → "09"
 *  - 13 → "01"
 * @param hour 0〜23 の時間
 * @returns 2桁の文字列
 */
export const getDefaultHour = (hour: number): string => {
  let h = hour % 12 || 12;
  return h < 10 ? `0${h}` : `${h}`;
};

/**
 * 24時間表記の時間から、12時間表記の時刻ラベルを生成する
 * - 午前なら "AM"、午後なら "PM" を付与
 * - AM:
 *    - 05～10：朝
 *    - 11：昼
 *    - 12～04：深夜
 * - PM:
 *    - 05～10：夜
 *    - 11：深夜
 *    - 12～04：昼
 *
 * @param hour 0〜23 の時間
 * @returns 例："AM 09（朝）"、"PM 09（夜）" の文字列
 */
export const getTimeLabel = (hour: number): string => {
  const period = hour < 12 ? "AM" : "PM";
  let formattedHour = hour % 12;
  if (formattedHour === 0) formattedHour = 12;
  const paddedHour =
    formattedHour < 10 ? `0${formattedHour}` : `${formattedHour}`;

  let label = "";
  if (period === "AM") {
    if (formattedHour >= 5 && formattedHour <= 10) {
      label = "朝";
    } else if (formattedHour === 11) {
      label = "昼";
    } else {
      label = "深夜";
    }
  } else {
    if (formattedHour >= 5 && formattedHour <= 10) {
      label = "夜";
    } else if (formattedHour === 11) {
      label = "深夜";
    } else {
      label = "昼";
    }
  }
  return ` 　${period}　${paddedHour} （${label}）`;
};

/**
 * 現在時刻に基づいて背景色を決定
 * 6時～18時未満を昼時間帯（白）、それ以外を夜時間帯（黒）として判定
 * @param {number} currentHour - 0～23の現在時刻（24時間表記）
 * @returns {"white" | "black"} 背景色を示す文字列
 */
export const getBackgroundColor = (currentHour: number): "white" | "black" => {
  const isDaytime = currentHour >= 6 && currentHour < 18;
  return isDaytime ? "white" : "black";
};

/**
 * 現在時刻に最も近い写真を選択する
 * @param {Photo[]} photos - 撮影情報を含む Photo オブジェクトの配列
 * @returns {Photo | undefined} 最も現在時刻に近い Photo オブジェクト、または undefined（データが空の場合）
 */
export const getClosestPhoto = (photos: Photo[]): Photo | undefined => {
  const now = new Date(); // 現在時刻を取得
  const nowTime = now.getHours() * 60 + now.getMinutes(); // 時間を分単位で取得（例: 14:30 => 870）

  // フォトリストが空でないか確認
  if (!photos || photos.length === 0) {
    return undefined;
  }

  // 最も現在時刻に近い写真を見つける
  return photos.reduce((closest, current) => {
    const takenAtTime = new Date(current.takenAt); // takenAt を Date に変換
    const photoTime = takenAtTime.getHours() * 60 + takenAtTime.getMinutes(); // 写真の撮影時間を分単位で取得

    // 現在の写真が最も近い場合、current を選択
    return Math.abs(photoTime - nowTime) <
      Math.abs(
        new Date(closest.takenAt).getHours() * 60 +
          new Date(closest.takenAt).getMinutes() -
          nowTime
      )
      ? current
      : closest;
  });
};

/**
 * スクロール位置に応じて透明度を計算する
 * 0px では透明度 1（不透明）、100px では透明度 0（完全にフェードアウト）
 * @param {number} scrollPosition - 現在のスクロール位置（ピクセル単位）
 * @returns {number} 透明度（0.0 〜 1.0）
 */
export const calculateOpacity = (scrollPosition: number): number => {
  return Math.max(1 - scrollPosition / 100, 0);
};
