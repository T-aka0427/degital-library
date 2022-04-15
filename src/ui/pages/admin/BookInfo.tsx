import React from 'react';

import { Typography } from '@mui/material';

import { Book } from '../../../models/admin/GetBooks';

const BookInfo = (props:  Omit<Book, "imageLink">) => {
  return (
    <>
    <Typography sx={{pl: 3, pt: 2, fontSize: 12}}>
    bookId：{props.bookId}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      isbn：{props.isbn}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      書籍：{props.title}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      著者：{props.author}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      出版日：{props.publicationDate}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      購入日：{props.purchaseDate}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      値段：{props.price}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      版数：{props.versionNumber}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      保管場所：{props.storageLocation}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      貸出状況：{props.lendingStatus ? <>貸出不可</> : <>貸出可</>}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      登録日時：{props.createdAt}
    </Typography>
    <Typography sx={{pl: 3, pt: 1, fontSize: 12}}>
      更新日時：{props.updatedAt}
    </Typography>
  </>
  )
}

export default BookInfo