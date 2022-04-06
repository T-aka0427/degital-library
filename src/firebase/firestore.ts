import dayjs from "dayjs";
import { db } from "../firebase/firebase";
import { setDoc, collection, serverTimestamp, doc, runTransaction, query, where, getDocs, deleteDoc, getDoc, QuerySnapshot, DocumentData,DocumentReference } from "firebase/firestore";
import { FormValues, StorageLocation } from "../models/BookForm";
import { GetBooks } from "../models/GetBooks";
import { BookInfo } from "../models/getBook";

const autoID = () => {
	const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const N = 28;
	const randomStr = Array.from(Array(N))
		.map(() => S[Math.floor(Math.random() * S.length)])
		.join("");
	return randomStr;
}

const parseDate = (date: string): Date => {
	const yyyy = date.slice(0, 4);
  const mm = date.slice(5, 7);
  const dd = date.slice(8, 10);
	return new Date(`${yyyy}/${mm}/${dd}`);
}

/*
	ユーザー登録
*/

export const setUser = (uid: string, name: string) => {
	const ref = doc(db, "users", uid);
	setDoc(ref, {
		name: name,
		adminFlag: false,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	});
}

/*
	本の登録
*/


export const setBook = async(values: FormValues) => {

	const bookRef = doc(db, "books", autoID());
	const storageRef = doc(db, "storages", autoID());

	try {
		await runTransaction(db, async (transaction) => {
			if (values.storageLocation === "new") {
				transaction.set(storageRef, {
					storageLocation: values.newStorageLocation,
				});
				transaction.set(bookRef, {
					isbn: values.isbn,
					title: values.title,
					author: values.author,
					publisherName: values.publisherName,
					publicationDate: parseDate(values.publicationDate),
					purchaseDate: parseDate(values.purchaseDate),
					price: values.price,
					versionNumber: values.versionNumber,
					imageLink: values.imageLink,
					storageLocation: doc(db, "storages", storageRef.id),
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp(),
				});
			} else {
				transaction.set(bookRef, {
					isbn: values.isbn,
					title: values.title,
					author: values.author,
					publisherName: values.publisherName,
					publicationDate: parseDate(values.publicationDate),
					purchaseDate: parseDate(values.purchaseDate),
					price: values.price,
					versionNumber: values.versionNumber,
					imageLink: values.imageLink,
					storageLocation:doc(db, "storages", values.storageLocation),
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp(),
				});
			}
		})
	} catch(e) {
		console.log(e + "登録に失敗しました");
		if (values.newStorageLocation === "new") {
			await deleteDoc(doc(db, "storages", values.storageLocation));
		}
	}
}

export const getStorageLocation = async() => {
	const querySnapshot = await getDocs(collection(db, "storages"));
	const data: StorageLocation[] = [];
	querySnapshot.docs.map((doc) => {
		data.push({
			id: doc.id,
			storageLocation: doc.data().storageLocation
		});
		
	})
	return data;
}

/*
	image画像の取得
*/

export const getImageLink = async() => {
	const images: GetBooks[] = [];
	const q = query(collection(db, "books"));
	const querySnapshot = await getDocs(q);
	querySnapshot.docs.map((doc) => {
		images.push({
			isbn: doc.data().isbn,
			imageLink: doc.data().imageLink
		});
	})
	return images;
}

export const getBook = async(isbn: string) => {
	const bookInfo: BookInfo[] = [];
	const q = query(collection(db, "books"), where("isbn", "==", isbn));

	const querySnapshot = await getDocs(q);
	const storageLocation = await getStorageData(querySnapshot);
	//const storageLocation = await getStorageData(querySnapshot)
	querySnapshot.docs.map((doc) => {
		bookInfo.push({
			isbn: doc.data().isbn,
			title: doc.data().title,
			author: doc.data().author,
			publisherName: doc.data().publisherName,
			publicationDate: dayjs(doc.data().publicationDate.toDate()).format("YYYY年MM月DD日") as string,
			versionNumber: doc.data().versionNumber,
			imageLink: doc.data().imageLink.replace(/ex=200x200/, "ex=400x400"),
			pcImageLink: doc.data().imageLink.replace(/ex=200x200/, "ex=500x500"),
			storageLocation: storageLocation,
		})
	});
	return bookInfo[0];
}

//bookstorageLocation refを取得

const getStorageData = async(querySnapshot: QuerySnapshot<DocumentData>) => {
	const ref: DocumentReference<unknown>[] = [];
	querySnapshot.docs.map((doc) => {
		ref.push(doc.data().storageLocation);
	})
		const storageDoc = await getDoc(ref[0]);
		type storage = {
			storageLocation: string,
		}
		const castData = storageDoc.data() as storage
		return castData.storageLocation;
}

export const checkLendingStatus = async(isbn: string) => {
	const q = query(collection(db, "lending"), where("isbn", "==", isbn));
	const querySnapshot = await getDocs(q);
	console.log(querySnapshot.docs.length)
	if(querySnapshot.docs.length === 0) {
		return true;
	} else {
		return false;
	}
}