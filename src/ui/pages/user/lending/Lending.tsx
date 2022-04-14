import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useUserBook } from '../../../../hooks/useUserBook';
import DefaultButton from '../../../parts/DefaultButton';
import LendingInfo from './LendingInfo';


const Lending = () => {
  
  const {bookInfo, uid} = useUserBook();
  const navigate = useNavigate();
  const theme = useTheme();
  const pcSize = useMediaQuery(theme.breakpoints.up('md'));
  
  return (
    <Container 
    maxWidth="sm"
    >
      {bookInfo.map((item) =>
			<Grid container key={item.isbn} sx={{mt: 7, mb: 7}}>
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
              <LendingInfo
                title={item.title}
                author={item.author}
                checkoutDate={item.checkoutDate}
                returnDate={item.returnDate}
                storageLocation={item.storageLocation} 
              />
              <Box sx={{mt: 3, ml:18}}>
                <DefaultButton
                  type="button" 
                  onClick={() => {navigate(`/return/new/${uid}/${item.isbn}/${item.bookId}`)}} 
                  label="返却"
                />
              </Box>
            </Box>
          :
            <Box sx= {{display: "flex", justifyContent: "center"}}>
              <Box
                sx={{
                  boxShadow: "0 0 5px gray",
                  width: 350,
                  bgcolor: "#FFF",
                  mt: 5,
                  pb: 3
                }}>
                <LendingInfo
                  title={item.title}
                  author={item.author}
                  checkoutDate={item.checkoutDate}
                  returnDate={item.returnDate}
                  storageLocation={item.storageLocation} 
                />
                <Box sx={{mt: 3, ml:16}}>
                  <DefaultButton
                    type="submit"
                    onClick={() => {navigate(`/return/new/${uid}/${item.isbn}/${item.bookId}`)}} 
                    label="返却"
                  />
                </Box>
              </Box>
            </Box>
          }
        </Grid>
			</Grid>
      )}
    </Container>
  )
}

export default Lending