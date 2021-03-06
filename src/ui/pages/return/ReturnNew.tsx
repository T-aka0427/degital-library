import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import PageTitle from '../../parts/PageTItle';
import DefaultButton from '../../parts/DefaultButton';
import { returnBook } from '../../../firebase/firestore';
import { useLendingReport } from '../../../hooks/useLendingReport';
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';

const ReturnNew = () => {
  
  const bookInfo = useLendingReport("lending");
  const {uid, isbn, bookId} = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const pcSize = useMediaQuery(theme.breakpoints.up('md'));

  const submit = async() => {
    try {
      if(typeof uid === "string" && typeof isbn === "string" && typeof bookId === "string") {
        await returnBook(uid, isbn);
        navigate(`/return/show/${uid}/${isbn}/${bookId}`);
      }
    } catch (e) {
      console.error(e);
      alert("返却手続きに失敗しました");
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
        貸出日：{bookInfo.checkoutDate}
      </Typography>
      <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
        返却日：{bookInfo.returnDate}
      </Typography>
      <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
        保管場所：{bookInfo.storageLocation}
      </Typography>
      <Typography sx={{pl: 3, pt: 1, fontSize: 13, color: "#d32f2f"}}>
        ※必ず元の保管場所に返却してください
      </Typography>
    </>
  )

  return (
    <Container maxWidth="lg">
      <Header />
      <PageTitle title="返却画面"/>
      <Box sx={{
        borderTop: '1px solid #aaa',
      }}>
        <Container 
          maxWidth="sm"
        >
          <Box sx={{
            justifyContent: "center", 
            display: "flex",
            mt: 5,
            mb: 5
            }}
          >
            {pcSize ?
              <Box
                sx={{
                  boxShadow: "0 0 5px gray",
                  width: 300,
                  bgcolor: "#FFF",
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
                    type="button"
                    onClick={submit} 
                    label="返却"
                  />
                </Box>
              </Box>
            }
          </Box>
        </Container>
      </Box>
      <Footer />
    </Container>
  )
}

export default ReturnNew