export type FormValues = {
  isbn: string;
  title: string;
  author: string;
  publisherName: string;
  publicationDate: string;
  purchaseDate: string;
  price: number;
  versionNumber: number;
  imageLink: string;
  storageLocation: string;
  newStorageLocation: string;
}

export type storageLocation = {
  id: string;
  storageLocation: string;
}
