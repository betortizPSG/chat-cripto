import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Messenger from "./components/Messenger";
import ProtectRoute from "./components/ProtectRoute";
import { useDispatch } from "react-redux";
import { getTheme } from "./store/actions/messengerAction";

function App() {

  const dispatch = useDispatch();
  dispatch(getTheme());

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/messenger/login" element={<Login />} />
          <Route path="/messenger/register" element={<Register />} />
          <Route path="/" element={<ProtectRoute> <Messenger /> </ProtectRoute>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
