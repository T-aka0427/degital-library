import { useState, useEffect } from "react";

import { query, collection, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "../../firebase/firebase";
import { AllBooks } from "../../models/admin/GetBooks";

export const useGetBooks = () => {
  
	const [books, setBooks] = useState<AllBooks[]>([]);

	useEffect(() => {
		fetch();
	}, []);

	const fetch = () => {
		const q = query(collection(db, "books"));
		onSnapshot(q, (querySnapshot) => {
			const books: AllBooks[] = [];
			querySnapshot.docs.map((doc) => {
				books.push({
					bookId: doc.id,
					isbn: doc.data().isbn,
					title: doc.data().title,
					author: doc.data().author,
					publicationDate: dayjs(doc.data().publicationDate.toDate()).format("YYYY年MM月DD日") as string,
					purchaseDate: dayjs(doc.data().purchaseDate.toDate()).format("YYYY年MM月DD日") as string,
					price: doc.data().price,
					versionNumber: doc.data().versionNumber,
					imageLink: doc.data().imageLink.replace(/ex=200x200/, `ex=300x300`),
					storageLocation: doc.data().storageLocation,
					lendingStatus: doc.data().lendingStatus,
					createdAt: dayjs(doc.data().createdAt.toDate()).format("YYYY年MM月DD日") as string,
					updatedAt: dayjs(doc.data().updatedAt.toDate()).format("YYYY年MM月DD日") as string,
				})
			})
			setBooks(books);
		}) 
	}

	return books;
};