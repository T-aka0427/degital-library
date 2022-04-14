import React from 'react'

import { Typography, Container } from '@mui/material';
import { Box } from '@mui/system';
import { useLendingReport } from '../../../hooks/useLendingReport';
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';

const LendingShow = () => {

  const reportInfo = useLendingReport("lending");

  return (
    <Container maxWidth="lg">
      <Header />
      <Typography 
      sx= {{
        fontSize: 14,
        textAlign: "center",
        mt: 5,
        pl: 3,
      }}>
        貸出手続きが完了しました
      </Typography>
      <Typography 
      sx= {{
        fontSize: 12,
        textAlign: "center",
        mt: 3,
        mb: 5,
        pl: 3,
      }}>
        期日になったら指定の場所まで本を取りに来てください
      </Typography>
      <Box sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        <img src={reportInfo.imageLink} />
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
      }}>
        <Box sx={{
          mt:3,
          boxShadow: "0 0 5px gray",
          width: 300,
          height: 200,
          bgcolor: "#FFF",
          ml: 2,
          pb: 1,
          pl: 3
        }}>
          <Typography 
          sx= {{
            fontSize: 14,
            mt: 2,
          }}>
            貸出情報
          </Typography>
          <Typography sx={{pt: 2, mr:3, ml: 7.5, fontSize: 12, textIndent: -60}}>
            ・書籍名：{reportInfo.title}
          </Typography>
          <Typography sx={{pt: 1, fontSize: 12}}>
            ・著者：{reportInfo.author}
          </Typography>
          <Typography sx={{pt: 1, fontSize: 12}}>
            ・貸出日：{reportInfo.checkoutDate}
          </Typography>
          <Typography sx={{pt: 1, fontSize: 12}}>
            ・返却日：{reportInfo.returnDate}
          </Typography>
          <Typography sx={{pt: 1, fontSize: 12}}>
            ・保管場所：{reportInfo.storageLocation}
          </Typography>
        </Box>
      </Box>
      <Footer />  
    </Container>
  )
}

export default LendingShow