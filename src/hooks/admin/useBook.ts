import { useState, useEffect } from "react";
import axios from "axios";

import { FormValues, StorageLocation } from "../../models/admin/BookForm";
import { editDate, today } from "../../ui/pages/admin/dateFormat";
import { getStorageLocation } from "../../firebase/firestore";

export const useBook = () => {
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState({flag: true, msg: "", color: ""})
  const [selectList, setSelectList] = useState<StorageLocation[]>([]);
  const [formData, setFormData] = useState<FormValues>(
    {
      isbn: "",
      title: "",
      author: "",
      publisherName: "",
      publicationDate: today(),
      purchaseDate: today(),
      price: 0,
      versionNumber: 0,
      imageLink: "",
      storageLocation: "",
      newStorageLocation: ""
    });

  useEffect(() => {
    getSelectList();
  }, []);

  useEffect(() => {
    scan();
    setLoading(false);
  },[loading])

  const onChangeIsbn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(e.currentTarget.value);
  }

  const scan = () => {
    setError(false);

    try {
      setSubmit({...submit, flag: false, msg: ""});
      //楽天APIでデータを取得
      const rowData = isbn.replace("-", "");
      const encodeIsbn = encodeURI(rowData);
      if(encodeIsbn) {
        const bookUrl = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${encodeIsbn}&applicationId=1045299121833564114`;
        axios.get(bookUrl).then((res) => {
          if (res.data.Items.length === 0) {
            setError(true);
            throw "データの取得に失敗しました";
          }
          const JSON_Parse = JSON.parse(JSON.stringify(res));
          const item = JSON_Parse.data.Items[0].Item;
          setFormData({ ...formData,
            isbn: isbn,
            title: item.title,
            author: item.author,
            publisherName: item.publisherName,
            publicationDate: editDate(item.salesDate),
            purchaseDate: today(),
            price: item.itemPrice,
            versionNumber: 0,
            imageLink: item.largeImageUrl,
            storageLocation: "",
            newStorageLocation: "",
          });
        });
      }
    } catch (e){
      console.log(e);
    }
  };

  const submitSuccess = () => {
    setSubmit({ ...submit, 
      flag: true, 
      msg: "登録に成功しました",
      color: "#006600"
    })
  }

  const submitFail = () => {
    setSubmit({...submit, 
      flag: true, 
      msg:"登録に失敗しました",
      color: "#d32f2f"})
  }

  const resetForm = () => {
    setFormData({
      ...formData,
      isbn: "",
      title: "",
      author: "",
      publisherName: "",
      publicationDate: today(),
      purchaseDate: today(),
      price: 0,
      versionNumber: 0,
      imageLink: "",
      storageLocation: "",
      newStorageLocation: ""
    })
    setIsbn("");
  }

  const getSelectList = async() => {
    const list = await getStorageLocation();
    setSelectList(list);
  }

  return { isbn, onChangeIsbn, formData, setFormData, setLoading, error, selectList, submitSuccess, submitFail, submit, resetForm };
};
