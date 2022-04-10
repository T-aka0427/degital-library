import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useUserBook } from '../../../../hooks/useUserBook';
import DefaultButton from '../../../parts/DefaultButton';
import LendingInfo from './LendingInfo';


const Lending = () => {
  
  const {bookInfo} = useUserBook();
  const {uid} = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const pcSize = useMediaQuery(theme.breakpoints.up('md'));
  console.log(bookInfo)
  
  return (
    <Container 
    maxWidth="sm"
    >
      {bookInfo.map((item) =>
			<Grid container key={item.isbn} sx={{mt: 7, mb: 7}}>
        <Grid item md={6} sm={12}>
        {pcSize ? 
          <img 
          src={item.pcImage} 
          style={{
            boxShadow: "0 0 2px gray",
          }}
          />
        :
          <img 
            src={item.mobileImage} 
            style={{
              boxShadow: "0 0 2px gray",
            }}
          />
       }
        </Grid>
        <Grid item md={6} sm={12}>
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
                  onClick={() => {navigate(`/return/new/${uid}/${item.isbn}`)}} 
                  label="返却"
                />
              </Box>
            </Box>
          :
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
              <Box sx={{mt: 3, ml:18}}>
                <DefaultButton
                  type="submit"
                  onClick={() => {navigate(`/return/new/${uid}/${item.isbn}`)}} 
                  label="返却"
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

export default Lending