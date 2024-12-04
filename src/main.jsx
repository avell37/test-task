import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'
import store from "./store";
import { GamePage } from "./pages/GamePage";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GamePage />
  </Provider>,
)
