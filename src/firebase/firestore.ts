import dayjs from "dayjs";
import { db } from "../firebase/firebase";
import { setDoc, collection, serverTimestamp, doc, runTransaction, query, where, getDocs, deleteDoc, getDoc, limit } from "firebase/firestore";
import { FormValues, StorageLocation } from "../models/BookForm";
import { GetBooks } from "../models/GetBooks";
import { BookInfo } from "../models/GetBook";
import { LendingData, ExistStorageLocation, LendingInfo } from "../models/Lending";
import { UserGetBook } from "../models/UserGetBook";

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
					storageLocation: values.newStorageLocation,
					lendingStatus: false,
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
					storageLocation: values.storageLocation,
					lendingStatus: false,
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
	書籍情報の取得
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

export const getBook = async(isbn: string, mobileImage: string, pcImage: string) => {
	const bookInfo: BookInfo[] = [];
	const q = query(collection(db, "books"), where("isbn", "==", isbn), limit(1));

	const querySnapshot = await getDocs(q);
	querySnapshot.docs.map((doc) => {
		bookInfo.push({
			isbn: doc.data().isbn,
			title: doc.data().title,
			author: doc.data().author,
			publisherName: doc.data().publisherName,
			publicationDate: dayjs(doc.data().publicationDate.toDate()).format("YYYY年MM月DD日") as string,
			versionNumber: doc.data().versionNumber,
			mobileImage: doc.data().imageLink.replace(/ex=200x200/, `ex=${mobileImage}x${mobileImage}`),
			pcImage: doc.data().imageLink.replace(/ex=200x200/, `ex=${pcImage}x${pcImage}`),
			storageLocation: doc.data().storageLocation,
		})
	});
	return bookInfo[0];
}

export const checkLendingStatus = async(isbn: string) => {
	const q = query(collection(db, "books"), where("isbn", "==", isbn), where("lendingStatus", "==", false));
	const querySnapshot = await getDocs(q);
	if(querySnapshot.docs.length > 0) {
		return true;
	} else {
		return false;
	}
}

/*
	貸出
*/

export const getExistStorageLocation = async(isbn: string) => {
	const existStorageLocation: ExistStorageLocation[] = [];
	const q = query(collection(db, "books"), where("isbn", "==", isbn), where("lendingStatus", "==", false));
	const querySnapshot = await getDocs(q);
	querySnapshot.docs.map((doc) => {
		existStorageLocation.push({
			bookId: doc.id,
			storageLocation: doc.data().storageLocation
		});
	})
	const filteredArray: ExistStorageLocation[] = existStorageLocation.filter((item, index, self) => {
		const nameList = self.map(item => item.storageLocation);
		if (nameList.indexOf(item.storageLocation) === index) {
			return item;
		}
	})
	return filteredArray;
}

export const borrow = async(data: LendingData) => {
	try {
		const q = query(collection(db, "lending"), where("isbn", "==", data.isbn));
		const querySnapshot = await getDocs(q);
		if(querySnapshot.docs.length > 0) {
			throw new Error ("FireStoreError:既に貸出されています");
		}

		const lendingRef = doc(db, "lending", autoID());
		const bookRef = doc(db, "books", data.bookId);
		const bookDoc = await getDoc(bookRef);
		const bookData = {
			title: bookDoc.data()?.title,
			author: bookDoc.data()?.author,
			imageLink: bookDoc.data()?.imageLink,
		}

		await runTransaction(db, async (transaction) => {
			transaction.set(lendingRef, {
				uid: data.uid,
				bookId: data.bookId,
				isbn: data.isbn,
				title: bookData.title,
				author: bookData.author,
				imageLink: bookData.imageLink,
				checkoutDate: parseDate(data.checkoutDate),
				returnDate: parseDate(data.returnDate),
				storageLocation: data.storageLocation,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			});
			transaction.update(bookRef, {lendingStatus: true})
		})
		return true;
	} catch (e) {
		console.error(e);
	}
}

export const getLendingBook = async(bookId: string) => {
	const q = query(collection(db, "lending"), where("bookId", "==", bookId));
	const querySnapshot = await getDocs(q);
	const bookData = querySnapshot.docs[0].data();
	const LendingInfo: LendingInfo = {
		title: bookData.title,
		author: bookData.author,
		checkoutDate: dayjs(bookData.checkoutDate.toDate()).format("YYYY年MM月DD日") as string,
		returnDate: dayjs(bookData.returnDate.toDate()).format("YYYY年MM月DD日") as string,
		imageLink: bookData.imageLink,
		storageLocation: bookData.storageLocation,
	}
	return LendingInfo;
}
/*
	返却
*/

export const returnBook = async(uid: string, isbn: string) => {
	try {
		const qLending = query(collection(db, "lending"), where("uid", "==", uid), where("isbn", "==", isbn));
		const snapshotLending = await getDocs(qLending);
		const lendingRef = snapshotLending.docs[0].ref;

		const bookId = snapshotLending.docs[0].data().bookId
		const qBook = query(collection(db, "books"), where("bookId", "==", bookId));
		const snapshotBook = await getDocs(qBook);
		const bookRef = snapshotBook.docs[0].ref;

		const historyRef = doc(db, "user", uid, "history", bookId);
		const lendingData = snapshotLending.docs[0].data()

		await runTransaction(db, async (transaction) => {
			transaction.update(bookRef, {lendingStatus: false})
			transaction.set(historyRef, {
				isbn: lendingData.isbn,
				title: lendingData.title,
				author: lendingData.author,
				imageLink: lendingData.imageLink,
				checkoutDate: lendingData.checkoutDate,
				returnDate: lendingData.returnDate,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			});
			transaction.delete(lendingRef);
		})
		return true;
	} catch(e) {
		console.error(e);
	}

}

export const getReturnBook = async(bookId: string, uid: string) => {
	const q = query(collection(db, "user", uid, "history"), where("bookId", "==", bookId));
	const querySnapshot = await getDocs(q);
	const bookData = querySnapshot.docs[0].data();
	const LendingInfo: LendingInfo = {
		title: bookData.title,
		author: bookData.author,
		checkoutDate: dayjs(bookData.checkoutDate.toDate()).format("YYYY年MM月DD日") as string,
		returnDate: dayjs(bookData.returnDate.toDate()).format("YYYY年MM月DD日") as string,
		imageLink: bookData.imageLink,
		storageLocation: bookData.storageLocation,
	}
	return LendingInfo;
}

/*
	user画面
*/

export const getUserBook = async(uid: string, mobileImage: string, pcImage: string) => {
	const bookInfo: UserGetBook[] = [];
	const q = query(collection(db, "lending"), where("uid", "==", uid));


	const querySnapshot = await getDocs(q);
	querySnapshot.docs.map((doc) => {
		bookInfo.push({
			isbn: doc.data().isbn,
			title: doc.data().title,
			author: doc.data().author,
			mobileImage: doc.data().imageLink.replace(/ex=200x200/, `ex=${mobileImage}x${mobileImage}`),
			pcImage: doc.data().imageLink.replace(/ex=200x200/, `ex=${pcImage}x${pcImage}`),
			checkoutDate: dayjs(doc.data().checkoutDate.toDate()).format("YYYY年MM月DD日") as string,
			returnDate: dayjs(doc.data().returnDate.toDate()).format("YYYY年MM月DD日") as string,
			storageLocation: doc.data().storageLocation
		})
	});
	console.log(bookInfo)
	return bookInfo;
}