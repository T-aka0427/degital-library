import {useEffect, useState, useContext} from "react";

import { AuthContext } from "../../auth/AuthProvider";
import { isAdmin } from "../../firebase/firestore";

export const useIsAdmin = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    fetch();
  }, [])

  const fetch = async() => {
    const result = await isAdmin(currentUser);
    if(typeof result === "boolean") {
      setFlag(result);
    }
  }
  return flag;
}
