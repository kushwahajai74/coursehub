import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";

axios.defaults.baseURL = "https://courshub-api.onrender.com/api/v1";
// axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
        <Analytics />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
