import React from 'react';

import { Typography } from '@mui/material';

import { UserLendingInfo } from '../../../../models/UserGetBook';

const HistoryInfo = (props: UserLendingInfo) => {
  return (
    <>
    <Typography sx={{pl: 2, pt: 3, fontSize: 15}}>
    {props.title}
    </Typography>
    <Typography sx={{pl: 3, pt: 2, fontSize: 14}}>
      著者：{props.author}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
      貸出日：{props.checkoutDate}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
      返却日：{props.returnDate}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 14}}>
      返却場所：{props.storageLocation}
    </Typography>
  </>
  )
}

export default HistoryInfo