import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom"; // 追加
import { useTheme } from "../contexts/ThemeContext";
import { useProfile } from "../hooks/profileHooks";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import useDocumentTitle from "../hooks/documentTitleHooks";

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { backgroundColor, textColor } = useTheme();
  const { data, error, isLoading } = useProfile();

  useDocumentTitle(data?.title);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
  ];

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          background: backgroundColor,
          transition: "background-color 0.3s",
          paddingX: 2,
          color: textColor,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data?.title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            background: backgroundColor,
            color: textColor,
            minWidth: "250px",
            borderLeft: `solid 1px`,
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
              sx={{
                color: textColor,
                border: `solid 1px`,
                textAlign: "center",
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
