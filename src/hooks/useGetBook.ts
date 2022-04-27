import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { BookInfo, Status } from "../models/GetBook";
import { getBook, checkLendingStatus } from "../firebase/firestore";

export const useGetBook = () => {
	const [bookInfo, setBookInfo] = useState<BookInfo>({
		isbn: "",
    title: "",
    author: "",
		publisherName: "",
    publicationDate: "",
    versionNumber: 0,
    imageLink: "",
		storageLocation: "",
	});
	const [status, setStatus] = useState<Status>({
		color: "",
		status: "",
	});

  const {isbn} = useParams();

	useEffect(() => {
		fetch();
	}, []);

	const fetch = async() => {
    if(typeof isbn == "string") {
			const data = await getBook(isbn);
			setBookInfo(data);
			const flag = await checkLendingStatus(await data.isbn);
			if(flag) {
				setStatus({...status, color: "#009900", status: "貸出可"});
			} else {
				setStatus({...status, color: "#d32f2f", status: "貸出不可"});
			}
    }
	}

	return { bookInfo, status };
};