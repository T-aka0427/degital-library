export type LendingData = {
  uid: string;
  bookId: string;
  isbn: string;
  checkoutDate: string;
  returnDate: string;
  storageLocation: string;
}

export type ExistStorageLocation = {
  bookId: string;
  storageLocation: string;
}

export type LendingInfo = {
  title: string;
  author: string;
  checkoutDate: string;
  returnDate: string;
  imageLink: string;
  storageLocation: string;
}