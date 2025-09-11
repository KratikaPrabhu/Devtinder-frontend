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
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Feed/>} />
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Connections" element={<Connections/>}/>
            <Route path="/Requests" element={<Requests/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
   </Provider>
    </>
  )
}


export default App;
