import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import PageTitle from '../../parts/PageTItle';
import { useGetBook } from '../../../hooks/useGetBook';
import DefaultButton from '../../parts/DefaultButton';
import { returnBook } from '../../../firebase/firestore';

const ReturnForm = () => {
  
  const {bookInfo} = useGetBook();
  const {uid, isbn} = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const pcSize = useMediaQuery(theme.breakpoints.up('md'));

  const submit = async() => {
    try {
      if(typeof uid === "string" && isbn === "string") {
        const flg = await returnBook(uid, isbn);
        if(flg) {
          navigate(`/return/show/${uid}/${isbn}`)
        }
      }
    } catch (e) {
      console.error("返却に失敗しました")
    }
  }

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
    </>
  )

  return (
    <>
      <PageTitle title="返却画面"/>
      <Box sx={{
        borderTop: '1px solid #aaa',
      }}>
        <Container 
          maxWidth="sm"
        >
          <Grid container sx={{mt: 5, mb: 5}}>
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
                    ml: 5,
                    mt: 2,
                    pb: 3
                  }}>
                  {infoElemetnt}
                  <Box sx={{mt: 3, ml:15}}>
                    <DefaultButton
                      type="button" 
                      onClick={submit} 
                      label="返却"
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
                    pb: 5
                  }}>
                  {infoElemetnt}
                  <Box sx={{mt: 5, ml:15}}>
                    <DefaultButton
                      type="submit"
                      onClick={submit} 
                      label="返却"
                    />
                  </Box>
                </Box>
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default ReturnForm