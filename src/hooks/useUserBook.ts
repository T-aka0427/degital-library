import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { getUserBook } from "../firebase/firestore";
import { UserGetBook } from "../models/UserGetBook";

export const useUserBook = () => {
	const [bookInfo, setBookInfo] = useState<UserGetBook[]>([]);

  const {uid} = useParams();

	useEffect(() => {
		setTimeout(() => {
		fetch();
		}, 500);
	}, []);

	const fetch = async() => {
    if(typeof uid == "string") {
			const data = await getUserBook(uid, "300", "300");
			console.log(data)
			setBookInfo(data);
    }
	}

	return { bookInfo };
};