import * as Yup from "yup";

export const validationSchema = Yup.object({
  checkoutDate: Yup.date()
    .required("必須です"),
  storageLocation: Yup.string()
    .required("必須です"),
})