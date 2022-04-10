import React from 'react'

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useGetBook } from '../../hooks/useGetBook';

type Props = {
  function: string,
  msg: string,
}
const LendingInfo = (props: Props) => {

  const {bookInfo} = useGetBook();

  const infoElemetnt = (
    <>
      <Typography sx={{pt: 2, mr:3, ml: 7.5, fontSize: 12, textIndent: -60}}>
        ・書籍名：{bookInfo.title}
      </Typography>
      <Typography sx={{pt: 1, fontSize: 12}}>
        ・著者：{bookInfo.author}
      </Typography>
      <Typography sx={{pt: 1, fontSize: 12}}>
        ・出版社：{bookInfo.publisherName}
      </Typography>
      <Typography sx={{pt: 1, fontSize: 12}}>
        ・出版日：{bookInfo.publicationDate}
      </Typography>
      <Typography sx={{pt: 1, fontSize: 12}}>
        ・版数：{bookInfo.versionNumber}
      </Typography>
      <Typography sx={{pt: 1, fontSize: 12}}>
        ・保管場所：{bookInfo.storageLocation}
      </Typography>
    </>
  )

  return (
    <>
      <Typography 
      sx= {{
        fontSize: 14,
        textAlign: "center",
        mt: 5,
        pl: 3,
      }}>
        {props.function}手続きが完了しました
      </Typography>
      <Typography 
      sx= {{
        fontSize: 12,
        textAlign: "center",
        mt: 3,
        mb: 5,
        pl: 3,
      }}>
        {props.msg}
      </Typography>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Box
            sx={{
              boxShadow: "0 0 5px gray",
              width: 300,
              height: 250,
              bgcolor: "#FFF",
              ml: 2,
              pb: 5,
              pl: 3
            }}
          >
            <Typography 
            sx= {{
              fontSize: 14,
              mt: 2,
            }}>
              {props.function}情報
            </Typography>
            {infoElemetnt}
          </Box>
        </Box>
    </>
  )
}

export default LendingInfo