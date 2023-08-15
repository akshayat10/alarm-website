import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  HandymanOutlined,
  AirOutlined,
  UpcomingOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";


const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    id: "dashboard",
  },
  {
    text: "OP150",
    icon: null,
    id: "150",
  },
  {
    text: "Broken Tools",
    icon: <HandymanOutlined />,
    id: "broken150",
  },
  {
    text: "Air Check",
    icon: <AirOutlined />,
    id: "air150",
  },
  {
    text: "Other Alarms",
    icon: <UpcomingOutlined />,
    id: "other150",
  },
  {
    text: "OP230",
    icon: null,
    id: "230",
  },
  {
    text: "Broken Tools",
    icon: <HandymanOutlined />,
    id: "broken230",
  },
  {
    text: "Other Alarms",
    icon: <UpcomingOutlined />,
    id: "other230",
  },
  {
    text: "OP120",
    icon: null,
    id: "120",
  },
  {
    text: "Broken Tools",
    icon: <HandymanOutlined />,
    id: "broken120",
  },
  {
    text: "Other Alarms",
    icon: <UpcomingOutlined />,
    id: "other120",
  },
  {
    text: "OP220",
    icon: null,
    id: "220",
  },
  {
    text: "Broken Tools",
    icon: <HandymanOutlined />,
    id: "broken220",
  },
  {
    text: "Other Alarms",
    icon: <UpcomingOutlined />,
    id: "other220",
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav" >
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Transgear <br></br>Alarm Data
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, id }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 0.1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                
               
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${id}`);
                        setActive(id);
                      }}
                      sx={{
                        backgroundColor:
                          active === id
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === id
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === id
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;