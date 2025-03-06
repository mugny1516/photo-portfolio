import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // isLoading を追加

  useEffect(() => {
    // ローカルストレージから認証状態を確認
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // 認証チェック後に isLoading を false にする
  }, []);

  return {
    isAuthenticated,
    setAuthenticated: (auth: boolean) => setIsAuthenticated(auth),
    isLoading, // isLoading を返す
  };
};
