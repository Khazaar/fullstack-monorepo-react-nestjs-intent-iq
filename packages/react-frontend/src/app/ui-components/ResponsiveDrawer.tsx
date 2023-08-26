import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import MenuIcon from '@mui/icons-material/Menu';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Dashboard from '../page-components/Dashboard';
import { UserProfile } from '../page-components/UserProfile';
import { TableList } from '../page-components/TableList';
import { colorStyles } from '../../assets/styles/theme';

const drawerWidth = 240;

interface IMenuButton {
  title: string;
  navTo: string;
  icon: React.ReactElement;
}

const buttons: IMenuButton[] = [
  { title: 'Dashboard', navTo: '/dashboard', icon: <DashboardIcon /> },
  { title: 'User Profile', navTo: '/user-profile', icon: <AccountBoxIcon /> },
  { title: 'Table List', navTo: '/table-list', icon: <AdUnitsIcon /> },
];

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography sx={{ textTransform: 'uppercase' }}>Intent IQ</Typography>
      </Toolbar>
      <Divider />
      <List>
        {buttons.map((button) => (
          <ListItem key={button.title} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(button.navTo);
                setMobileOpen(false);
              }}
              sx={{
                backgroundColor:
                  location.pathname === button.navTo
                    ? colorStyles.red
                    : colorStyles.greyLight,
                '&:hover': {
                  backgroundColor:
                    location.pathname === button.navTo
                      ? colorStyles.red
                      : colorStyles.redLight,
                },
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <ListItemIcon sx={{ minWidth: '35px' }}>
                {button.icon}
              </ListItemIcon>
              <ListItemText primary={button.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: 'none' },
          backgroundColor: colorStyles.greyLight,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: colorStyles.textDark }} />
          </IconButton>
          <Typography
            sx={{ textTransform: 'uppercase', color: colorStyles.textDark }}
          >
            Intent IQ
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
            backgroundColor: colorStyles.greyLight,
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: colorStyles.greyLight,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: '56px', sm: 0 },
          overflowX: 'hidden',
          backgroundColor: colorStyles.greyDark,
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/user-profile" element={<UserProfile></UserProfile>} />
          <Route path="/table-list" element={<TableList></TableList>} />
        </Routes>
      </Box>
    </Box>
  );
}
