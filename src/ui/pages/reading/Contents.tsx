import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useGetBook } from '../../../hooks/useGetBook';
import { AuthContext } from "../../../auth/AuthProvider";
import DefaultButton from '../../parts/DefaultButton';


const Contents = () => {
  
  const {bookInfo, status} = useGetBook();
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const pcSize = useMediaQuery(theme.breakpoints.up('md'));

  console.log(bookInfo.publicationDate);

  const infoElemetnt = (
    <>
      <Typography sx={{pl: 2, pt: 5}} variant='h6'>
      {bookInfo.title}
      </Typography>
      <Typography sx={{pl: 3, pt: 3}}>
        著者：{bookInfo.author}
      </Typography>
      <Typography sx={{pl: 3, pt: 2}}>
        出版社：{bookInfo.publisherName}
      </Typography>
      <Typography sx={{pl: 3, pt: 2}}>
        出版日：{bookInfo.publicationDate}
      </Typography>
      <Typography sx={{pl: 3, pt: 2}}>
        版数：{bookInfo.versionNumber}
      </Typography>
      <Typography sx={{pl: 3, pt: 2}}>
        保管場所：{bookInfo.storageLocation}
      </Typography>
      <Typography sx={{pl: 3, pt: 3}}>
        貸出状況：<Box component="span" sx={{color: status.color}}>{status.status}</Box>
      </Typography>
    </>
  )
  
  return (
    <Container 
    maxWidth="md"
    >
			<Grid container sx={{mt: 10, mb: 10}}>
        <Grid item md={6} sm={12}>
        {pcSize ? 
          <img 
          src={bookInfo.pcImageLink} 
          style={{
            boxShadow: "0 0 2px gray",
          }}
          />
        :
          <img 
            src={bookInfo.imageLink} 
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
                width: 400,
                bgcolor: "#FFF",
                ml: 5,
                mt: 3,
                pb: 5
              }}>
              {infoElemetnt}
              <Box sx={{mt: 5, ml:18}}>
                <DefaultButton 
                  onClick={() => {navigate(`/lending/new/${currentUser}/${bookInfo.isbn}`)}} 
                  label="本を借りる"
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
                pb: 5
              }}>
              {infoElemetnt}
              <Box sx={{mt: 5, ml:15}}>
                <DefaultButton
                  onClick={() => {navigate(`/lending/new/${currentUser}/${bookInfo.isbn}`)}} 
                  label="本を借りる"
                />
              </Box>
            </Box>
          }
        </Grid>
			</Grid>
    </Container>
  )
}

export default Contents