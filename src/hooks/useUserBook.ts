import { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';

import { getUserBook, getHistoryBook } from "../firebase/firestore";
import { UserGetBook } from "../models/UserGetBook";
import { HistoryBook } from "../models/UserHistory"

export const useUserBook = () => {
	const [bookInfo, setBookInfo] = useState<UserGetBook[]>([]);
  const [history, setHistory ] = useState<HistoryBook[]>([]);

  const {uid} = useParams();

	useEffect(() => {
		fetch();
	}, []);

	const fetch = useCallback(async() => {
    if(typeof uid == "string") {
			const lendingData = await getUserBook(uid);
      const historyData = await getHistoryBook(uid);
			setBookInfo(lendingData);
      setHistory(historyData);
    }
	}, [])

	return { bookInfo, uid, history };
};