import React from 'react'

import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useUserBook } from '../../../../hooks/useUserBook';
import HistoryInfo from './historyInfo';
  
const History = () => {
  
  const {history} = useUserBook();
  const theme = useTheme();
  const pcSize = useMediaQuery(theme.breakpoints.up('md'));
  
  return (
    <Container 
    maxWidth="sm"
    >
      {history.map((item) =>
      <Grid container key={item.bookId} sx={{mt: 7, mb: 7}}>
        <Grid item md={6} xs={12}>
          {pcSize ?
            <img 
              src={item.imageLink} 
              style={{
                boxShadow: "0 0 2px gray",
              }}
            />
          :
            <Box sx={{display: "flex", justifyContent: "center"}}>
              <img 
                src={item.imageLink} 
                style={{
                  boxShadow: "0 0 2px gray",
                }}
              />
            </Box>
          }
        </Grid>
        <Grid item md={6} xs={12}>
          {pcSize ?
            <Box
              sx={{
                boxShadow: "0 0 5px gray",
                width: 350,
                bgcolor: "#FFF",
                mt: 2,
                pb: 3
              }}>
              <HistoryInfo
                title={item.title}
                author={item.author}
                checkoutDate={item.checkoutDate}
                returnDate={item.returnDate}
                storageLocation={item.storageLocation} 
              />
            </Box>
          :
            <Box sx={{display: "flex", justifyContent: "center"}}>
              <Box
                sx={{
                  boxShadow: "0 0 5px gray",
                  width: 350,
                  bgcolor: "#FFF",
                  mt: 5,
                  pb: 3
                }}>
                <HistoryInfo
                  title={item.title}
                  author={item.author}
                  checkoutDate={item.checkoutDate}
                  returnDate={item.returnDate}
                  storageLocation={item.storageLocation} 
                />
              </Box>
            </Box>
          }
        </Grid>
      </Grid>
      )}
    </Container>
  )
}
export default History