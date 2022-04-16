import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormValues, StorageLocation } from "../../models/admin/BookForm";
import { today } from "../../ui/pages/admin/dateFormat";
import { getBookAll, getStorageLocation } from "../../firebase/firestore";

export const useBookUpdate = () => {
  const {bookId} = useParams();
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
    fetch();
  }, []);

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
      color: "#d32f2f"
    })
  }

  const fetch = async() => {
    if(typeof bookId === "string") {
      const bookData = await getBookAll(bookId);
      setFormData(bookData);
    }
    const list = await getStorageLocation();
    setSelectList(list);
  }

  return { formData, bookId, selectList, submitSuccess, submitFail, submit };
};
