import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';

import { bookInfo, Status } from "../models/getBook";
import { AuthContext } from "../auth/AuthProvider";
import { getBook, checkLendingStatus } from "../firebase/firestore";

export const useGetBook = () => {
  const currentUser = useContext(AuthContext);
	const [bookInfo, setBookInfo] = useState<bookInfo>({
		isbn: "",
    title: "",
    author: "",
		publisherName: "",
    publicationDate: new Date(),
    versionNumber: 0,
    imageLink: "",
		pcImageLink: "",
    storageLocation: "",
	});
	const [status, setStatus] = useState<Status>({
		color: "",
		status: "",
	});

  const {isbnId} = useParams();

	useEffect(() => {
		setTimeout(() => {
		fetch();
		confirmStatus();
		}, 500);
	}, []);

	const fetch = async() => {
    if(typeof isbnId == "string") {
			const data = await getBook(isbnId);
			setBookInfo(data);
    }
	}

	const confirmStatus = async() => {
		const flag = await checkLendingStatus(await bookInfo.isbn);
		if(flag) {
			setStatus({...status, color: "#009900", status: "貸出可"});
		} else {
			setStatus({...status, color: "#d32f2f", status: "貸出不可"});
		}
	}

	return { bookInfo, currentUser, status };
};