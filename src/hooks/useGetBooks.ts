import { useState, useEffect, useCallback } from "react";

import { getImageLink } from "../firebase/firestore";
import { GetBooks } from "../models/GetBooks";

export const useGetBooks = () => {
  
	const [images, setImages] = useState<GetBooks[]>([]);
	useEffect(() => {
		fetch();
	}, []);

	const fetch = async() => {
				const data = await getImageLink();

				const result = data.filter((item, index, self) => {
					const nameList = self.map(item => item["imageLink"]);
					if (nameList.indexOf(item.imageLink) === index) {
						return item;
					}
				});
				setImages(result);
	}

	return images;
};