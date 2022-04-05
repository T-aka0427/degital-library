import * as Yup from "yup";

export const signupSchema = Yup.object({
    name: Yup.string()
      .max(30, "30文字以内で入力してください")
      .required("必須です"),
    email: Yup.string()
      .email("メールアドレスの形式に合致しません")
      .max(50, "50文字以内で入力してください")
      .required("必須です"),
    password: Yup.string()
      .min(4, "4文字以上で入力してください")
      .required("必須です"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'passwordが一致しません。')
      .required("必須です"),
  })

export const loginSchema = Yup.object({
    email: Yup.string()
      .required("必須です"),
    password: Yup.string()
      .required("必須です"),
})