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

  const infoElemetnt = (
    <>
      <Typography sx={{pl: 2, pt: 3, fontSize: 15}}>
      {bookInfo.title}
      </Typography>
      <Typography sx={{pl: 3, pt: 2, fontSize: 14}}>
        著者：{bookInfo.author}
      </Typography>
      <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
        出版社：{bookInfo.publisherName}
      </Typography>
      <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
        出版日：{bookInfo.publicationDate}
      </Typography>
      <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
        版数：{bookInfo.versionNumber}
      </Typography>
      <Typography sx={{pl: 3, pt: 2, fontSize: 14}}>
        貸出状況：<Box component="span" sx={{color: status.color}}>{status.status}</Box>
      </Typography>
    </>
  )
  
  return (
    <Container 
    maxWidth="sm"
    >
			<Grid container sx={{mt: 10, mb: 10}}>
        <Grid item md={6} sm={12}>
        {pcSize ? 
          <img 
          src={bookInfo.pcImage} 
          style={{
            boxShadow: "0 0 2px gray",
          }}
          />
        :
          <img 
            src={bookInfo.mobileImage} 
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
                width: 300,
                bgcolor: "#FFF",
                pb: 3
              }}>
              {infoElemetnt}
              <Box sx={{mt: 3, ml:12}}>
                <DefaultButton
                  type="button" 
                  onClick={() => {navigate(`/lending/new/${currentUser}/${bookInfo.isbn}`)}} 
                  label="本を借りる"
                />
              </Box>
            </Box>
          :
            <Box
              sx={{
                boxShadow: "0 0 5px gray",
                width: 300,
                bgcolor: "#FFF",
                mt: 5,
                pb: 3
              }}>
              {infoElemetnt}
              <Box sx={{mt: 3, ml:12}}>
                <DefaultButton
                  type="submit"
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