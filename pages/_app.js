import '../styles/globals.css'
import {AuthProvider} from "../contexts/AuthContext";
import {Provider} from "react-redux";
import {store} from "../state/store";

function MyApp({Component, pageProps}) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <Provider store={store}>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
