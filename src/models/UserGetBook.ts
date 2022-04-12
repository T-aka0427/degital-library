export type UserGetBook = {
  bookId: string;
  isbn: string;
  title: string;
  author: string;
  imageLink: string;
  checkoutDate: string;
  returnDate: string;
  storageLocation: string;
}

export type UserLendingInfo = {
  title: string;
  author: string;
  checkoutDate: string;
  returnDate: string;
  storageLocation: string;
}