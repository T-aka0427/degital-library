import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import { Container, FormControl, Typography, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";

import { validationSchema } from "../../../validation/bookSchema";
import { updateBook } from "../../../firebase/firestore";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SubmitButton from "../../parts/SubmitButton";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import { useBookUpdate } from "../../../hooks/admin/useBookUpdate";


const BookUpdate = () => {

  const { formData, bookId, selectList, submitSuccess, submitFail, submit } = useBookUpdate();

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {
        if(typeof bookId === "string") {
          await updateBook(values, bookId);
          submitSuccess();
        }
      } catch (e) {
        submitFail();
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  })

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
          <Link to="/admin/book/show" style={{marginRight: 15}}>
            書籍一覧
          </Link>
          <Link to="#">
            ユーザー
          </Link>
        </Box>
        {submit.flag && 
          <Typography
            sx={{
              textAlign: "right",
              color: submit.color
            }}>{submit.msg}</Typography>
        }
        <Typography 
          variant='h6'
          sx= {{
            fontWeight: "bold",
            textAlign: "center",
            mt: 4,
            mb: 6
          }}>
            書籍編集画面
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 5}}>
          <Grid container sx={{borderTop: '1px solid #aaa'}}>
            <Grid item md={3} sm={4} sx={{mt: 4}}>
              <TextField
                label="isbnコード" 
                id="outlined-required"
                name="isbn"
                value={formik.values.isbn}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  ml: 3
                }} 
              />
              <FormHelperText
                error={formik.touched.isbn && Boolean(formik.errors.isbn)}
                sx={{
                  ml: 5
                }}  
              >
                {formik.touched.isbn && formik.errors.isbn}</FormHelperText>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={10} sm={12} sx={{mt: 4}}>
              <TextField
                label="タイトル" 
                id="outlined-required"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                variant="outlined"
                fullWidth
                sx={{
                  ml: 3
                }} 
              />
              <FormHelperText
                error={formik.touched.title && Boolean(formik.errors.title)}
                sx={{
                  ml: 5
                }}  
              >
                {formik.touched.title && formik.errors.title}</FormHelperText>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={3} sm={12} sx={{mr: 3, mt: 4}}>
              <TextField
                label="著者" 
                id="outlined-required"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  ml: 3
                }} 
              />
              <FormHelperText
                error={formik.touched.author && Boolean(formik.errors.author)}
                sx={{
                  ml:5
                }}  
              >
                {formik.touched.author && formik.errors.author}</FormHelperText>
            </Grid>
            <Grid item md={3} sm={12} sx={{mr: 3, mt: 4}}>
              <TextField
                label="出版社" 
                id="outlined-required"
                name="publisherName"
                value={formik.values.publisherName}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  ml: 3
                }} 
              />
              <FormHelperText
                error={formik.touched.publisherName && Boolean(formik.errors.publisherName)}
                sx={{
                  ml:5
                }}  
              >{formik.touched.publisherName && formik.errors.publisherName}</FormHelperText>
            </Grid>
            <Grid item md={3} sm={12} sx={{mr: 3, mt: 4}}>
              <TextField
                type="date"
                label="出版日"
                id="outlined-required"
                name="publicationDate"
                value={formik.values.publicationDate}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  ml: 3
                }} 
              />
              <FormHelperText
                error={formik.touched.publicationDate && Boolean(formik.errors.publicationDate)}
                sx={{
                  ml:5
                }}  
              >
                {formik.touched.publicationDate && formik.errors.publicationDate}</FormHelperText>
            </Grid>
          </Grid> 
          <Grid container>
            <Grid item md={3} sm={12} sx={{mr: 3, mt: 4}}>
              <TextField
                label="価格"
                type="Number" 
                id="outlined-required"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  ml: 3
                }}
              />
              <FormHelperText
                error={formik.touched.price && Boolean(formik.errors.price)}
                sx={{
                  ml:5
                }}  
              >
                {formik.touched.price && formik.errors.price}</FormHelperText>
            </Grid>
            <Grid item md={3} sm={12} sx={{mr: 3, mt: 4}}>
              <TextField
                type="Date"
                label="購入日" 
                id="outlined-required"
                name="purchaseDate"
                value={formik.values.purchaseDate}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  ml: 3
                }} 
              />
              <FormHelperText
                error={formik.touched.purchaseDate && Boolean(formik.errors.purchaseDate)}
                sx={{
                  ml:5
                }}  
              >{formik.touched.purchaseDate && formik.errors.purchaseDate}</FormHelperText>
            </Grid>
            <Grid item md={3} sm={12} sx={{mr: 3, mt: 4}}>
              <TextField
                label="版数" 
                type="Number"
                id="outlined-required"
                name="versionNumber"
                value={formik.values.versionNumber}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  ml: 3
                }} />
              <FormHelperText
                error={formik.touched.versionNumber && Boolean(formik.errors.versionNumber)}
                sx={{
                  ml:5
                }}  
                >{formik.touched.versionNumber && formik.errors.versionNumber}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={10} sm={12} sx={{mt: 4}}>
              <TextField
                label="画像用リンク" 
                id="outlined-required"
                name="imageLink"
                value={formik.values.imageLink}
                onChange={formik.handleChange}
                variant="outlined"
                fullWidth
                sx={{
                  ml: 3
                }} />
              <FormHelperText
                error={formik.touched.imageLink && Boolean(formik.errors.imageLink)}
                sx={{
                  ml:5
                }}  
              >
                {formik.touched.imageLink && formik.errors.imageLink}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={10} sm={12} sx={{mt: 4}}>
              <FormControl sx={{ ml: 3, width: 250 }}>
                <InputLabel id="demo-simple-select-label">保管場所</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="outlined-required"
                  label="保管場所"
                  name="storageLocation"
                  value={formik.values.storageLocation}
                  onChange={formik.handleChange}
                >
                  {selectList.map((item) =>

                    <MenuItem 
                      key={item.id} 
                      value={item.storageLocation}
                    >
                      {item.storageLocation}
                    </MenuItem>
                  )}
                  <MenuItem value={"new"}>保管場所を追加</MenuItem>
                </Select>
                <FormHelperText
                  error={formik.touched.storageLocation && Boolean(formik.errors.storageLocation)}
                >
                  {formik.touched.storageLocation && formik.errors.storageLocation}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={10} sm={12} sx={{mt: 4}}>
              <TextField
                label="新しい保管場所" 
                id="outlined-required" 
                name="newStorageLocation"
                value={formik.values.newStorageLocation}
                onChange={formik.handleChange}
                variant="outlined"
                fullWidth
                sx={{
                  ml: 3
                }} 
              />
              <FormHelperText
                error={formik.touched.newStorageLocation && Boolean(formik.errors.newStorageLocation)}
                sx={{
                  ml:5
                }}  
              >
                {formik.touched.newStorageLocation && formik.errors.newStorageLocation}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box sx={{mt: 4, textAlign: "center"}}>
            <SubmitButton label="編集" />
          </Box>
        </Box>
      </Container>
      <Footer/>
    </Container>
  )
}

export default BookUpdate