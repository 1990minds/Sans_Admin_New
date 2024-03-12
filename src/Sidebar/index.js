import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { logOut } from "../api/authSlice";
import logo from "../Images/logo.jpeg";
import { Link,useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { SiGoogleclassroom } from "react-icons/si";
import {FaChalkboardTeacher} from 'react-icons/fa'
import {PiStudentBold} from 'react-icons/pi'
import{PiExamBold} from 'react-icons/pi'
import {FaBook} from 'react-icons/fa'
import '../App.css'
import MuiAppBar from "@mui/material/AppBar";


const drawerWidth = 220;


const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingLeft: 0,
    transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
    transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen,
  }),
  height:'80px' ,
  backgroundColor: '#FDCD00', // Change this line to set the background color to red
  ...(open && {
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth}px`,
  transition: theme.transitions.create(["margin", "width"], {
  easing: theme.transitions.easing.easeOut,
  duration: theme.transitions.duration.enteringScreen,
  }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  paddingLeft: 0,
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard({ Compenets , path }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: "flex" }}>
    {/* <CssBaseline /> */}
    {/* <AppBar position="fixed" open={open} > */}
    <Toolbar>
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    sx={{  ...(open && { display: "none", }) }}
    >
    <ChevronRightIcon />
    </IconButton> 
    </Toolbar>
    {/* </AppBar> */}
    <Drawer
    sx={{
    width: drawerWidth,
    paddingLeft: 0,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    },
  }}
  variant="persistent"
  anchor="left"
  open={open}
>
  <DrawerHeader className="bg-[#ffff]">
  <img src={logo} alt="logo" className="mr-8 w-[100px] h-[80px] flex  items-start" />
  <IconButton onClick={handleDrawerClose} style={{ color: '#43468B'}}>
  {theme.direction === "ltr" ? (
  <ChevronLeftIcon style={{color: '#43468B'}} />
  ) : (
  <ChevronRightIcon style={{color: '#43468B'}}/>
  )}
  </IconButton>
  </DrawerHeader>
  <Divider />
  <List sx={{ flexGrow: 1 }}> 

  
  <Link to={"/dashboard"}>   
  <ListItem disablePadding >
  <ListItemButton>
  <ListItemIcon className="flex gap-4">
  <DashboardIcon style={{ marginTop:'3px'}} className={isActive("/dashboard") ? "active-text" : ""}/>
  <ListItemText primary={"Dashboard"} className={isActive("/dashboard") ? "active-text" : ""} />
  </ListItemIcon>
  
  </ListItemButton>
  </ListItem>
  </Link>


  <Link to={"/exams"}>
  <ListItem disablePadding>
  <ListItemButton>
  <ListItemIcon className="flex gap-4">
 < PiExamBold style={{fontSize:"20px", marginTop:'5px'}} className={isActive("/exams") ? "active-text" : ""}/>
 <ListItemText primary={"Exams"} className={isActive("/exams") ? "active-text" : ""} />
  </ListItemIcon>
  </ListItemButton>
  </ListItem>
  </Link>


  <Link to={"/student"}>
  <ListItem disablePadding>
  <ListItemButton>
  <ListItemIcon className="flex gap-4">
  <PiStudentBold style={{fontSize:"20px", marginTop:'5px'}} className={isActive("/student") ? "active-text" : ""}/>
  <ListItemText primary={"Students"} className={isActive("/student") ? "active-text" : ""} />
  </ListItemIcon> 
  </ListItemButton>
  </ListItem>
  </Link>




  <Link to={"/class"}>
  <ListItem disablePadding>
  <ListItemButton>
  <ListItemIcon className="flex gap-4">
    <SiGoogleclassroom style={{fontSize:"20px", marginTop:'5px'}} className={isActive("/class") ? "active-text" : ""} />
    <ListItemText primary={"Grade"} className={isActive("/class") ? "active-text" : ""} />
  </ListItemIcon>
  
  </ListItemButton>
  </ListItem>
  </Link>

  <Link to={"/teachers"}>
  <ListItem disablePadding>
  <ListItemButton>
  <ListItemIcon className="flex gap-4">
<FaChalkboardTeacher style={{fontSize:"20px", marginTop:'6px'}} className={isActive("/teachers") ? "active-text" : ""} />
<ListItemText primary={"Teachers"} className={isActive("/teachers") ? "active-text" : ""} />
  </ListItemIcon>
 
  </ListItemButton>
  </ListItem>
  </Link>




 
  <Link to={"/subject"}>
  <ListItem disablePadding>
  <ListItemButton>
  <ListItemIcon className="flex gap-4">
  <FaBook  style={{fontSize:"20px", marginTop:'6px'}} className={isActive("/subject") ? "active-text" : ""}/>
  <ListItemText primary={"Subjects"} className={isActive("/subject") ? "active-text" : ""} />
  </ListItemIcon>  
  </ListItemButton>
  </ListItem>
  </Link>


  </List>
  <Divider />
  <List>
  <ListItem disablePadding onClick={() => dispatch(logOut())}>
  <ListItemButton>
  <ListItemIcon>
  <LogoutIcon />
  </ListItemIcon>
  <ListItemText primary={"Log Out"} />
  </ListItemButton>
  </ListItem>
  </List>
</Drawer>
  <Main open={open}>
  {/* <DrawerHeader /> */}
  <Compenets />
  </Main>
  </Box>
  );
}
