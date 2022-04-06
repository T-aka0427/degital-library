import React from 'react'
import { useFormik } from 'formik'

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { Chip } from '@mui/material';
import TextField from "@mui/material/TextField";

import { validationSchema } from '../../../validation/lendingSchema';
import { useLending } from '../../../hooks/useLending';
import SubmitButton from '../../parts/SubmitButton';

const LendingForm = () => {

  const { formData } = useLending();

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("a");
    },
    validateOnChange: false,
    validateOnBlur: false,
  })

  return (
    <>
      <Typography 
      variant='h6'
      sx= {{
        fontWeight: "bold",
        textAlign: "center",
        mt: 5,
        mb: 6,
        pl: 3,
      }}>
        書籍登録画面
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 5,}}>
        <Box sx={{
          borderTop: '1px solid #aaa',
          display: "flex",
          justifyContent: "center",
        }}>
          <Box
            sx={{
              boxShadow: "0 0 5px gray",
              width: 300,
              height: 400,
              bgcolor: "#FFF",
              ml: 5,
              mt: 5,
              pb: 5,
              pl: 3
            }}
          >
            <Typography sx={{fontSize: 14, pt:3}}>
              日付を選択してください。
            </Typography>
            <Typography sx={{fontSize: 12}}>
              ※選択する日付は本を取りに行く日になります。
            </Typography>
            <Grid container sx={{mt: 4}}>
              <Grid item md={3} sm={3}>
                <Chip label="貸出日" color="success" sx={{mt:1}}/>
              </Grid>
              <Grid item md={3} sm={3}>
                <TextField
                  type="date"
                  label="貸出日"
                  id="outlined-required"
                  name="checkoutDate"
                  value={formik.values.checkoutDate}
                  onChange={formik.handleChange}
                  variant="outlined"
                  sx={{
                    ml: 2
                  }} 
                />
              </Grid>
            </Grid>
            <Grid container sx={{mt: 3}}>
              <Grid item md={3} sm={3}>
                <Chip label="返却日" color="success" sx={{mt:1}}/>
              </Grid>
              <Grid item md={3} sm={3}>
                <TextField
                    type="date"
                    label="返却日"
                    id="outlined-required"
                    name="returnDate"
                    value={formik.values.returnDate}
                    onChange={formik.handleChange}
                    variant="outlined"
                    sx={{
                      ml: 2
                    }} 
                  />
              </Grid>
            </Grid>
            <Box
              sx={{
                width: 250,
                height: 100,
                border: '1px solid #aaa',
                mt: 3,
                mb: 3,
                pl: 2
              }}
            >
              <Typography sx={{fontSize: 12, pt:2}}>
                指定条件
              </Typography> 
              <Typography sx={{fontSize: 11}}>
                ・当日から1週間先の範囲で選択
              </Typography>
              <Typography sx={{fontSize: 11}}>
                ・土日選択不可
              </Typography>
              <Typography sx={{fontSize: 11}}>
                ・貸出期間は最大2週間
              </Typography>
            </Box>
            <Box sx={{textAlign: "center", mr:3}}>
              <SubmitButton label="本を借りる" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default LendingForm