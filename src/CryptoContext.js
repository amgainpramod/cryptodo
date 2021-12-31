import { doc, onSnapshot } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth, db } from "./config/firebaseConfig";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currencyList, setCurrencyList] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState("AUD");
  const [symbol, setSymbol] = useState("AUD");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          // console.log(coin.data(), "Helloooooooooooooo");
          setWatchlist(coin.data().coins);
        } else {
          console.log("No items in Watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    // if (currency === "AUD") setSymbol("AU$");å
    // if (currency === "USD") setSymbol("US$");
    setSymbol(currentCurrency);
  }, [currentCurrency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // console.log("Currency List", currencyList);
  // console.log("Currency", currentCurrency);
  // console.log("Symbol", symbol);

  return (
    <Crypto.Provider
      value={{
        currencyList,
        symbol,
        setCurrencyList,
        currentCurrency,
        setCurrentCurrency,
        coins,
        setCoins,
        loading,
        setLoading,
        alert,
        setAlert,
        user,
        setUser,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
