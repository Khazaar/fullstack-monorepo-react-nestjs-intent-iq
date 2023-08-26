import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { useAppContext } from '../context/appStateContextProvider';
import { fetchReports } from '../services/fetchReports.service';
import Box from '@mui/material/Box';
import ResponsiveDrawer from './ui-components/ResponsiveDrawer';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../assets/styles/theme';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const appContext = useAppContext();
  useEffect(() => {
    appContext.setIsReportsLoading(true);
    fetchReports()
      .then((reports) => {
        appContext.setReports(reports);
        appContext.setIsReportsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        appContext.setIsReportsLoading(false);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveDrawer></ResponsiveDrawer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
