import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './components/login';
import Profile from './components/Profile';
import Body from './components/Body';
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed"
import Connections from "./components/Connections";
import Requests from "./components/Request"

function App() {


  return (
    <>
    <Provider store = {appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route index element={<Feed/>} />
            <Route path="login" element={<Login/>} />
            <Route path="profile" element={<Profile/>}/>
            <Route path="connections" element={<Connections/>}/>
            <Route path="requests" element={<Requests/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
   </Provider>
    </>
  )
}


export default App;
