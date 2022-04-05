import React, { ReactNode, FC, useEffect } from "react";
import { useProvider } from "../hooks/useProvider";

export const AuthContext = React.createContext('');

type Props = {
    children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
  
  const currentUser = useProvider();

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;