import * as Yup from "yup";

export const validationSchema = Yup.lazy(values => {
    //新しい保管場所を追加する場合
    if(values.storageLocation === "new") {
    return Yup.object().shape({
    title: Yup.string()
      .max(200, "200文字以内で入力してください")
      .required("必須です"),
    author: Yup.string()
      .max(50, "50文字以内で入力してください")
      .required("必須です"),
    publisherName: Yup.string()
      .max(50, "50文字以内で入力してください")
      .required("必須です"),
    publicationDate: Yup.date()
      .required("必須です"),
    purchaseDate: Yup.date(),
    price: Yup.number()
      .max(100000, "100000以内で入力してください"),
    versionNumber: Yup.number()
      .max(50, "50以内で入力してください"),
    imageLink: Yup.string()
      .max(2048, "2048文字以内で入力してください")
      .required("必須です"),
    newStorageLocation: Yup.string()
      .max(200, "200文字以内で入力してください")
      .required("必須です"),
  }).required();

  } else {
    return Yup.object().shape({
      title: Yup.string()
        .max(200, "200文字以内で入力してください")
        .required("必須です"),
      author: Yup.string()
        .max(50, "50文字以内で入力してください")
        .required("必須です"),
      publisherName: Yup.string()
        .max(50, "50文字以内で入力してください")
        .required("必須です"),
      publicationDate: Yup.date()
        .required("必須です"),
      purchaseDate: Yup.date(),
      price: Yup.number()
        .max(100000, "100000以内で入力してください"),
      versionNumber: Yup.number()
        .max(50, "50以内で入力してください"),
      imageLink: Yup.string()
        .max(2048, "2048文字以内で入力してください")
        .required("必須です"),
      storageLocation: Yup.string()
        .max(200, "200文字以内で入力してください")
        .required("必須です"),
    })
  }
  })