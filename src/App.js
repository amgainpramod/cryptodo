import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Header from "./components/Header";
import Coinpage from "./pages/Coinpage";
import Homepage from "./pages/Homepage";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
        <Alert />
      </div>
    </BrowserRouter>
  );
}

export default App;
