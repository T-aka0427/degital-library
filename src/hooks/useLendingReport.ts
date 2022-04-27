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
		fetch();
	}, []);

	const fetch = async() => {
    if(typeof bookId === "string" && typeof uid === "string") {
      if(arg === "lending") {
        const data = await getLendingBook(bookId);
        setReportInfo(data);
      }
      if(arg === "return") {
        const data = await getReturnBook(bookId, uid);
        setReportInfo(data);
      }
    }
	}

	return reportInfo;
};