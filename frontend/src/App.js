import logo from './logo.svg';
import './App.css';
import {AuthContext} from "./context/authcontext";
import {Route, Routes, Navigate, useLocation, BrowserRouter} from 'react-router-dom';
import {useContext} from "react";
import Homepage from "./components/homepage";
import SignUpPage from "./components/signup";
import LoginPage from "./components/login";
import {AuthContextProvider} from "./context/authcontext";


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/signup" element={<SignUpPage />} />

          <Route exact path="/" element={
            <AuthContextProvider >
              <Homepage />
            </AuthContextProvider>} />
        </Routes>


      {/*  <Route exact path="/" element={*/}
      {/*    <AuthenticatedRoute >*/}
      {/*      <Homepage />*/}
      {/*    </AuthenticatedRoute>} />*/}
      {/*</Routes>*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
