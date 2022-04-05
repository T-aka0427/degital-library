import { useEffect, useState } from "react";

import { auth } from "../firebase/firebase";

export const useProvider = () => {
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    fetch();
  },[])
  
  const fetch = async() => {
    await auth.onAuthStateChanged((user) => {
        if(user) {
          setCurrentUser(user.uid);
        }
    });
  }
  return currentUser;
};