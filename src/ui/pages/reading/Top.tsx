/* ログイン
  google認証でログイン
*/

import React, { useEffect } from "react";
import { db } from "../../../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

const Top = () => {
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    const docRef = doc(db, "testRef", "mR3eElmaUx0pTuQtNJ5Q");
    console.log(docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const ref = docSnap.data().testref; //refが取れている。これをもう一度getDocでドキュメントの取得を行う
      const docSnap2 = await getDoc(ref);
      console.log(docSnap2.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <>
      <div>Top Page</div>
    </>
  );
};

export default Top;
