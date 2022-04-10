export type UserGetBook = {
  isbn: string,
  title: string;
  author: string;
  mobileImage: string;
  pcImage: string;
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