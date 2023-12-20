import React from "react";
import Header from "./Components/Header";
import Collector from "./Components/Collector";
import StateProvider from "./Components/StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./Components/Account";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute";
import MyOrders from "./Components/MyOrders";

const promise = loadStripe(
  "pk_test_51O9bWXKDbD86H7I3N2k400fj5oiZflUfjw9ll3j68BeLD1lJqQdGXaZ9aanNLTkXpR8QElFGLC0wKWN68lnM8RkR00eZTVqngW"
);

function App() {
  return (
    <>
      <StateProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Collector />} />
            <Route path="/login" element={<Account />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/pay"
                element={
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                }
              />
              <Route path="/orders" element={<MyOrders />} />
            </Route>
          </Routes>
        </Router>
      </StateProvider>
    </>
  );
}

export default App;
