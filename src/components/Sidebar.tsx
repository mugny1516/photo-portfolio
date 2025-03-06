import React from "react";
import { Box, List, ListItem } from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";
import { getDefaultHour, getTimeLabel } from "../utils/photo";
import { useScrollPosition } from "../hooks/scrollPositionHooks";

const Sidebar: React.FC = () => {
  const { backgroundColor, textColor } = useTheme();
  const scrollPosition = useScrollPosition();
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const currentHour = new Date().getHours();
  // 現在時刻の hh から始まるリスト
  const displayedHours = hours
    .slice(currentHour)
    .concat(hours.slice(0, currentHour));

  // 指定された時間に対応する写真へスムーズスクロールする
  const handleHourClick = (hour: number) => {
    const target = document.querySelector(`[data-hour="${hour}"]`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      sx={{
        opacity: scrollPosition === 0 ? 0 : { xs: 0, md: 1 },
        background: backgroundColor,
        transition: "background-color 0.3s, opacity 0.3s",
        position: "fixed",
        top: "17vh",
        left: "",
        fontSize: "11px",
        color: textColor,
        cursor: "pointer",
        width: "120px",
      }}
    >
      <List dense>
        {displayedHours.map((hour) => (
          <ListItem
            key={hour}
            onClick={() => handleHourClick(hour)}
            sx={{
              position: "relative",
              overflow: "hidden",
              py: 0.5,
              "&:hover .defaultText": { opacity: 0 },
              "&:hover .hoverText": { opacity: 1 },
            }}
          >
            {/* デフォルト：2桁の数字（薄いグレー） */}
            <Box
              component="span"
              className="defaultText"
              sx={{
                display: "block",
                transition: "opacity 0.3s",
                color: "lightgray",
                width: "100%",
                textAlign: "center",
              }}
            >
              {getDefaultHour(hour)}
            </Box>
            {/* ホバー時：AM/PM付きのラベル（黒字） */}
            <Box
              component="span"
              className="hoverText"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s",
                color: textColor,
              }}
            >
              {getTimeLabel(hour)}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
