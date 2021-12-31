import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CryptoState } from "../CryptoContext";
import { useEffect } from "react";
import AuthModal from "./Authentication/AuthModal";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  menu: {
    height: 400,
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const {
    currencyList,
    setCurrencyList,
    setCurrentCurrency,
    currentCurrency,
    user,
  } = CryptoState();
  // const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    const currenciesData = async () => {
      const responseData = await fetch(
        `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
      );
      const currencies = await responseData.json();
      setCurrencyList(currencies);
    };
    currenciesData();
  }, [setCurrencyList]);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              className={classes.title}
            >
              CRYPTODO
            </Typography>
            <Select
              className={classes.scrollBar}
              MenuProps={{ className: classes.menu }}
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currentCurrency}
              onChange={(e) => setCurrentCurrency(e.target.value)}
            >
              {currencyList.map((currency) => {
                return (
                  <MenuItem key={currency} value={currency.toUpperCase()}>
                    {currency.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
