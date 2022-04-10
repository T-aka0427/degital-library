import React from 'react'
import { useFormik } from 'formik'
import { useParams, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { Chip } from '@mui/material';
import TextField from "@mui/material/TextField";
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { FormHelperText } from '@mui/material';

import { validationSchema } from '../../../validation/lendingSchema';
import SubmitButton from '../../parts/SubmitButton';
import { today, maxCheckoutDate, returnDate, dayCheck } from './date';
import { borrow } from '../../../firebase/firestore';
import { useLending } from '../../../hooks/useLending';
import PageTitle from '../../parts/PageTItle';


const LendingForm = () => {

  const navigate = useNavigate();
  const {uid, isbn} = useParams();
  const {error, setError, selectList, getBookId} = useLending();

  const formik = useFormik({
    initialValues: {
      checkoutDate: today(),
      storageLocation: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async(value) => {
      setError(false);
      const checkFlag = dayCheck(value.checkoutDate);
      try {
        if(checkFlag === false) {
          setError(true);
          throw new Error("土日は選択できません")
        }

        if( typeof uid === "string" && typeof isbn === "string") {
          const data = {
            uid: uid,
            bookId: getBookId(formik.values.storageLocation),
            isbn: isbn,
            checkoutDate: value.checkoutDate,
            returnDate: returnDate(value.checkoutDate),
            storageLocation: value.storageLocation
          }
          const flg = await borrow(data);
          if (flg) {
            navigate(`/lending/show/${uid}/${isbn}`);
          }
        } else {
          throw new Error("貸出手続きに失敗しました")
        }
      } catch (e: any) {
        console.error(e.name, e.message)
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  })

  return (
    <>
      <PageTitle title="貸出画面" />
      <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 5,}}>
        <Box sx={{
          borderTop: '1px solid #aaa',
          display: "flex",
          justifyContent: "center",
        }}>
          <Box
            sx={{
              boxShadow: "0 0 5px gray",
              width: 320,
              height: 500,
              bgcolor: "#FFF",
              ml: 3,
              mt: 5,
              pb: 5,
              pl: 3
            }}
          >
            <Typography sx={{fontSize: 14, pt:3}}>
              日付・保管場所を選択してください。
            </Typography>
            <Typography sx={{fontSize: 11}}>
              ※貸出日で選択する日付は本を取りに行く日になります。
            </Typography>
            <Grid container sx={{mt: 4}}>
              <Grid item md={3} sm={3}>
                <Chip label="貸出日" color="success" sx={{mt:1}}/>
              </Grid>
              <Grid item md={3} sm={3}>
                <TextField
                  type="date"
                  inputProps={{
                    min: today(), 
                    max: maxCheckoutDate()
                  }}
                  label="貸出日"
                  id="outlined-required"
                  name="checkoutDate"
                  value={formik.values.checkoutDate}
                  onChange={formik.handleChange}
                  variant="outlined"
                  sx={{
                    ml: 1,
                    width: 150
                  }} 
                />
              </Grid>
            </Grid>
            <Grid container sx={{mt: 1}}>
              <Grid item md={12} sm={12}>
              { error &&
                <Box component="div"
                  sx={{
                    ml:12,
                    fontSize: 11,
                    color: "#d32f2f"
                  }}
                >
                  土日の選択は出来ません
                </Box>
              }
              </Grid>
            </Grid>
            <Grid container sx={{mt: 3}}>
              <Grid item md={3} sm={3}>
                <Chip label="返却日" color="success" sx={{mt:1}}/>
              </Grid>
              <Grid item md={3} sm={3}>
                <TextField
                    type="date"
                    inputProps={{
                      readOnly: true,
                    }}
                    label="返却日"
                    id="outlined-required"
                    name="returnDate"
                    value={returnDate(formik.values.checkoutDate)}
                    variant="outlined"
                    sx={{
                      ml: 1,
                      width: 150
                    }} 
                  />
              </Grid>
            </Grid>
            <Grid container sx={{mt: 3}}>
              <Grid item md={3} sm={3}>
                <FormControl sx={{ ml: 5, width: 200 }}>
                  <InputLabel id="demo-simple-select-label">保管場所</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="outlined-required"
                    label="保管場所"
                    name="storageLocation"
                    value={formik.values.storageLocation}
                    onChange={formik.handleChange}
                  >
                    {selectList.map((item, index) => <MenuItem key={index} value={item.storageLocation}>{item.storageLocation}</MenuItem>)}
                  </Select>
                  <FormHelperText
                    error={formik.touched.storageLocation && Boolean(formik.errors.storageLocation)}
                  >{formik.touched.storageLocation && formik.errors.storageLocation}</FormHelperText>
              </FormControl>
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
                ・貸出期間は最大2週間(土日含む)
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