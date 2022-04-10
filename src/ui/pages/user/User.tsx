import React from "react";

import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { TabContext } from "@mui/lab";
import { TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';

import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import { useUserTabs } from "../../../hooks/useUserTabs";
import Booking from "./Booking";
import Lending from "./lending/Lending";
import History from "./History";
import Setting from "./Setting";


const User = () => {
  const {value, handleChange} = useUserTabs();

  return (
    <Container maxWidth="lg">
      <Header />
      <Container maxWidth="md">
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
              <Tab label="予約中" value="0" />
              <Tab label="貸出中" value="1"/>
              <Tab label="貸出履歴" value="2"/>
              <Tab label="設定" value="3"/>
            </TabList>
          </Box>
          <TabPanel value="0"><Booking /></TabPanel>
          <TabPanel value="1"><Lending /></TabPanel>
          <TabPanel value="2"><History /></TabPanel>
          <TabPanel value="3"><Setting /></TabPanel>
        </TabContext>
      </Box>
      </Container>
      <Footer />
    </Container>
  );
};

export default User;
