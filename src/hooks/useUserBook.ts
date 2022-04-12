import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { getUserBook, getHistoryBook } from "../firebase/firestore";
import { UserGetBook, UserLendingInfo } from "../models/UserGetBook";

export const useUserBook = () => {
	const [bookInfo, setBookInfo] = useState<UserGetBook[]>([]);
  const [history, setHistory ] = useState<UserLendingInfo[]>([]);

  const {uid} = useParams();

	useEffect(() => {
		setTimeout(() => {
		fetch();
		}, 200);
	}, []);

	const fetch = async() => {
    if(typeof uid == "string") {
			const lendingData = await getUserBook(uid, "300", "300");
      const historyData = await getHistoryBook(uid);
			//setBookInfo(lendingData);
    }
	}

	return { bookInfo, uid };
};