import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { getLendingBook, getReturnBook } from "../firebase/firestore";
import { LendingInfo } from "../models/Lending";

export const useLendingReport = (arg: string) => {
	const [reportInfo, setReportInfo] = useState<LendingInfo>({
    title: "",
    author: "",
    checkoutDate: "",
    returnDate: "",
    imageLink: "",
    storageLocation: "",
  });

  const {uid, bookId} = useParams();

	useEffect(() => {
		setTimeout(() => {
		fetch();
		}, 200);
	}, []);

	const fetch = async() => {
    if(typeof bookId === "string" && typeof uid === "string") {
      if(arg === "lending") {
        const data = await getLendingBook(bookId);
        console.log(data)
        setReportInfo(data);
      }
      if(arg === "return") {
        const data = await getReturnBook(bookId, uid);
        console.log(data)
        setReportInfo(data);
      }
    }
	}

	return reportInfo;
};