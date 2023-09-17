import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { adminUser } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const provider = new GoogleAuthProvider();
  const [authState, setAuthState] = useState({ user: null, loading: true });
  const auth = getAuth();
  const user = authState.user;
  const loading = authState.loading;

  useEffect(() => {
    const stopListen = onAuthStateChanged(auth, (user) => {
      if (user) {
        adminUser(user).then((user) => setAuthState({ user, loading: false }));
      } else {
        setAuthState({ user: null, loading: false });
      }
    });
    return () => stopListen();
  }, [auth]);

  const login = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error.message);
    });
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ loading, user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
