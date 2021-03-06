import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useGetBooks } from '../../../hooks/admin/useGetBooks';
import DefaultButton from '../../parts/DefaultButton';
import BookInfo from './BookInfo';
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';
import { deleteBook } from '../../../firebase/firestore';
import DisabledButton from '../../parts/DisabledButton';

const BookList = () => {
  const books = useGetBooks();
  console.log(books)
  const navigate = useNavigate();
  const theme = useTheme();
  const pcSize = useMediaQuery(theme.breakpoints.up('md'));

  const onClickDelete = (bookId: string) => {
    try {
      deleteBook(bookId);
    } catch(e) {
      console.error(e);
    }
  }
  
  return (
    <Container maxWidth="lg">
      <Header />
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1,
            mb: 2,
            }}>
          <Link to="/admin/book/new" style={{marginRight: 15}}>
            書籍登録
          </Link>
          <Link to="#">
            ユーザー
          </Link>
        </Box>
      </Container>
      <Container 
      maxWidth="sm"
      >
        {books.map((item) =>
        <Grid container key={item.bookId} sx={{mt: 7, mb: 7}}>
          <Grid item md={6} sm={12} sx={{mt: 3}}>
            <img 
              src={item.imageLink} 
              style={{
                boxShadow: "0 0 2px gray",
              }}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            {pcSize ?
              <Box
                sx={{
                  boxShadow: "0 0 5px gray",
                  width: 350,
                  bgcolor: "#FFF",
                  pb: 3
                }}>
                <BookInfo
                  bookId={item.bookId}
                  isbn={item.isbn}
                  title={item.title}
                  author={item.author}
                  publicationDate={item.publicationDate}
                  purchaseDate={item.purchaseDate}
                  price={item.price}
                  versionNumber={item.versionNumber}
                  storageLocation={item.storageLocation}
                  lendingStatus={item.lendingStatus}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                />
                {!item.lendingStatus?
                  <Grid container sx={{mt: 3, ml: 4, display: "flex", justifyContent: "center"}}>
                    <Grid item md={4}>
                      <DefaultButton
                        type="button" 
                        onClick={() => {navigate(`/admin/book/update/${item.bookId}`)}} 
                        label="編集"
                      />
                    </Grid>
                    <Grid item md={4}>
                      <DefaultButton
                        type="button" 
                        onClick={() => {onClickDelete(item.bookId)}} 
                        label="削除"
                      />
                    </Grid>
                  </Grid>
                : 
                  <Grid container sx={{mt: 3, ml: 4, display: "flex", justifyContent: "center"}}>
                    <Grid item md={4}>
                      <DisabledButton label="編集"/>
                    </Grid>
                    <Grid item md={4}>
                      <DisabledButton label="削除"/>
                    </Grid>
                  </Grid>
                }
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
                <BookInfo
                  bookId={item.bookId}
                  isbn={item.isbn}
                  title={item.title}
                  author={item.author}
                  publicationDate={item.publicationDate}
                  purchaseDate={item.purchaseDate}
                  price={item.price}
                  versionNumber={item.versionNumber}
                  storageLocation={item.storageLocation}
                  lendingStatus={item.lendingStatus}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt} 
                />
                {!item.lendingStatus?
                  <Grid container sx={{mt: 3, ml:3, display: "flex", justifyContent: "center"}}>
                    <Grid item xs={4}>
                      <DefaultButton
                        type="button" 
                        onClick={() => {navigate(`/admin/book/update/${item.bookId}`)}} 
                        label="編集"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <DefaultButton
                        type="button" 
                        onClick={() => {onClickDelete(item.bookId)}} 
                        label="削除"
                      />
                    </Grid>
                  </Grid>
                :
                  <Grid container sx={{mt: 3, ml:3, display: "flex", justifyContent: "center"}}>
                  <Grid item xs={4}>
                    <DisabledButton label="編集" />
                  </Grid>
                  <Grid item xs={4}>
                    <DisabledButton label="削除" />
                  </Grid>
                </Grid>              
                }
              </Box>
            }
          </Grid>
        </Grid>
        )}
      </Container>
      <Footer />
    </Container>
  )
}

export default BookList