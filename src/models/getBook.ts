export type bookInfo = {
    isbn: string;
    title: string;
    author: string;
    publisherName: string;
    publicationDate: Date;
    versionNumber: number;
    imageLink: string;
    pcImageLink: string;
    storageLocation: string;
  }

export type Status = {
  color: string;
  status: string;
}