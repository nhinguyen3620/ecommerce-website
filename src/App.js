import React, {useEffect} from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51JKr47I3v9bWreEQwVC7NM68D4ZWL8rsNPEYUFpCjZYmx8guDwFfKH3oDc5Nz1Jmdwnd5dsdrvHjrrjYYVE5FgpK00TEv4kf5B');


function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } 
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      } 
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch> 
        <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">  
            <Header />
            <Home/>
          </Route>
        </Switch>
    </div>
    </Router>
  
  );
}

export default App;

{
  
}
