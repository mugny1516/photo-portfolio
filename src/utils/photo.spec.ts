import { describe, test, expect, vi } from "vitest";
import {
  formatTakenAt,
  sortPhotosByHour,
  getDefaultHour,
  getTimeLabel,
  getBackgroundColor,
  getClosestPhoto,
  calculateOpacity,
} from "./photo";
import { Photo } from "../types/photo";

describe("formatTakenAt", () => {
  test("日時文字列をAM/PM形式の時間表記に変換する", () => {
    expect(formatTakenAt("2023-01-01T09:30:00")).toBe("AM 9:30");
  });

  test("正午の時間をPM表記に変換する", () => {
    expect(formatTakenAt("2023-01-01T12:00:00")).toBe("PM 12:00");
  });

  test("深夜0時の時間をAM表記に変換する", () => {
    expect(formatTakenAt("2023-01-01T00:00:00")).toBe("AM 12:00");
  });

  test("午後の時間をPM表記に変換する", () => {
    expect(formatTakenAt("2023-01-01T15:45:00")).toBe("PM 3:45");
  });

  test("23時59分をPM表記に変換する", () => {
    expect(formatTakenAt("2023-01-01T23:59:00")).toBe("PM 11:59");
  });
});

describe("sortPhotosByHour", () => {
  test("現在時刻を基準に写真を時刻順に並び替える", () => {
    // 現在時刻を固定
    const mockDate = new Date("2023-01-01T15:00:00");
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const photos: Photo[] = [
      {
        id: "1",
        img: { url: "url1", height: "100", width: "100" },
        takenAt: "2023-01-01T10:00:00",
      },
      {
        id: "2",
        img: { url: "url2", height: "100", width: "100" },
        takenAt: "2023-01-01T15:00:00",
      },
      {
        id: "3",
        img: { url: "url3", height: "100", width: "100" },
        takenAt: "2023-01-01T18:00:00",
      },
      {
        id: "4",
        img: { url: "url4", height: "100", width: "100" },
        takenAt: "2023-01-01T01:00:00",
      },
    ];

    const sorted = sortPhotosByHour(photos);
    expect(sorted[0].id).toBe("2");

    // モックをリセット
    vi.useRealTimers();
  });
});

describe("getDefaultHour", () => {
  test("0時を12時間表記の2桁文字列に変換する", () => {
    expect(getDefaultHour(0)).toBe("12");
  });

  test("9時を12時間表記の2桁文字列に変換する", () => {
    expect(getDefaultHour(9)).toBe("09");
  });

  test("12時を12時間表記の2桁文字列に変換する", () => {
    expect(getDefaultHour(12)).toBe("12");
  });

  test("13時を12時間表記の2桁文字列に変換する", () => {
    expect(getDefaultHour(13)).toBe("01");
  });

  test("23時を12時間表記の2桁文字列に変換する", () => {
    expect(getDefaultHour(23)).toBe("11");
  });
});

describe("getTimeLabel", () => {
  test("0時に適切なラベルを付与する", () => {
    expect(getTimeLabel(0)).toBe(" 　AM　12 （深夜）");
  });

  test("5時に適切なラベルを付与する", () => {
    expect(getTimeLabel(5)).toBe(" 　AM　05 （朝）");
  });

  test("11時に適切なラベルを付与する", () => {
    expect(getTimeLabel(11)).toBe(" 　AM　11 （昼）");
  });

  test("12時に適切なラベルを付与する", () => {
    expect(getTimeLabel(12)).toBe(" 　PM　12 （昼）");
  });

  test("17時に適切なラベルを付与する", () => {
    expect(getTimeLabel(17)).toBe(" 　PM　05 （夜）");
  });

  test("23時に適切なラベルを付与する", () => {
    expect(getTimeLabel(23)).toBe(" 　PM　11 （深夜）");
  });
});

describe("getBackgroundColor", () => {
  test("6時に昼間の背景色を返す", () => {
    expect(getBackgroundColor(6)).toBe("white");
  });

  test("12時に昼間の背景色を返す", () => {
    expect(getBackgroundColor(12)).toBe("white");
  });

  test("18時に夜間の背景色を返す", () => {
    expect(getBackgroundColor(18)).toBe("black");
  });

  test("0時に夜間の背景色を返す", () => {
    expect(getBackgroundColor(0)).toBe("black");
  });
});

describe("getClosestPhoto", () => {
  test("現在時刻に最も近い写真を返す", () => {
    // 現在時刻を固定
    const mockDate = new Date("2023-01-01T14:30:00");
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const photos: Photo[] = [
      {
        id: "1",
        img: { url: "url1", height: "100", width: "100" },
        takenAt: "2023-01-01T10:00:00", // 10:00
      },
      {
        id: "2",
        img: { url: "url2", height: "100", width: "100" },
        takenAt: "2023-01-01T15:00:00", // 15:00
      },
      {
        id: "3",
        img: { url: "url3", height: "100", width: "100" },
        takenAt: "2023-01-01T13:00:00", // 13:00
      },
      {
        id: "4",
        img: { url: "url4", height: "100", width: "100" },
        takenAt: "2023-01-01T20:00:00", // 20:00
      },
    ];

    const closestPhoto = getClosestPhoto(photos);
    expect(closestPhoto?.id).toBe("2"); // 15:00 が最も近い

    // モックをリセット
    vi.useRealTimers();
  });

  test("空の配列の場合、undefinedを返す", () => {
    expect(getClosestPhoto([])).toBeUndefined();
  });
});

describe("calculateOpacity", () => {
  test("スクロール位置が0pxの場合、透明度1を返す", () => {
    expect(calculateOpacity(0)).toBe(1);
  });

  test("スクロール位置が50pxの場合、透明度0.5を返す", () => {
    expect(calculateOpacity(50)).toBe(0.5);
  });

  test("スクロール位置が100pxの場合、透明度0を返す", () => {
    expect(calculateOpacity(100)).toBe(0);
  });

  test("スクロール位置が200pxの場合、透明度0を返す", () => {
    expect(calculateOpacity(200)).toBe(0);
  });
});
