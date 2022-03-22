import { Form } from "../models/Form";
import { useState } from "react";
import axios from "axios";
import { json } from "stream/consumers";

export const useForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>("");
  const [error, setError] = useState(false);

  const getBookInfo = () => {
    setLoading(true);
    setError(false);

    //楽天APIでデータを取得
    const author = encodeURI("高橋ダン");
    const testurl = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&author=${author}&applicationId=1045299121833564114`;
    axios.get(testurl).then((res) => {
      console.log(res);
      const item = JSON.parse(JSON.stringify(res));
      setData(item.data.Items[1].Item.author);
    });
    console.log("master");
    console.log("0322/output");
    console.log("0322/output/1130");
  };
  return { getBookInfo, data, loading, error };
};
