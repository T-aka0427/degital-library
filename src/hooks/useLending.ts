import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getExistStorageLocation } from "../firebase/firestore";
import { ExistStorageLocation } from "../models/Lending";

export const useLending = () => {
  
	const {isbn} = useParams();
	const [error, setError] = useState<boolean>(false);
	const [selectList, setSelectList] = useState<ExistStorageLocation[]>([]);

	useEffect(() => {
		fetch();
	}, [])

	const fetch = async() => {
		if(typeof isbn === "string") {
			const data = await getExistStorageLocation(isbn);
			setSelectList(data);
		}
	}

	const getBookId = (storageLocation: string) => {
		let bookId = "";
		selectList.forEach((item) => {
			if(item.storageLocation === storageLocation) {
				bookId = item.bookId;
			}
		})
		return bookId;
	}

	return {error, setError, selectList, getBookId};
};