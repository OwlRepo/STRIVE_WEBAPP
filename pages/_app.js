import { ChakraProvider } from "@chakra-ui/react";
import NavigationBar from "../src/Components/index/NavigationBar";
import { NavLoginButtonContextProvider } from "../src/Context/NavLogInButtonContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavLoginButtonContextProvider>
        <NavigationBar />
        <Component {...pageProps} />
      </NavLoginButtonContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
