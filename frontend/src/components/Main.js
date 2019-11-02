import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Landing from "./Landing";
import SignUpBuyer from "./SignUpBuyer";
import Home from "./Home";
import Profilebuy from "./ProfileBuy";
import Profilebuyedit from "./ProfileBuyEdit";
import BuyerOrders from "./Orders/BuyerOrders";
import CurrentOrders from "./Orders/CurrentOrders";
import PastOrders from "./Orders/PastOrders";
import ResLogin from "./Resturants/LoginR";
import SignUpRes from "./Resturants/SignUpRest";
import HomeR from "./Resturants/HomeR";
import Profileres from "./Resturants/ProfileRes";
import Profileresedit from "./Resturants/ProfileResEdit";
import AddDish from "./Resturants/AddDish";
import AddSection from "./Resturants/AddSection";
import ShowSections from "./Resturants/ShowSections";
import ShowDishes from "./Resturants/ShowDishes";
import Navbar from "./Navbar";
import UpdateDish from "./Resturants/UpdateDish";
import ShowROrders from "./Resturants/ShowROrders";
import ShowRPastOrders from "./Resturants/ShowRPastOrders";
import Chat from "./Chat/chat";
import ChatList from "./Chat/chatlist";

import ShowMenu from "./ShowMenu";
import Checkout from "./Checkout";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/SignUpBuyer" component={SignUpBuyer} />
        <Route path="/landing" component={Landing} />
        <Route path="/reslogin" component={ResLogin} />
        <Route path="/signupres" component={SignUpRes} />
        <Route path="/homeR" component={HomeR} />
        <Route path="/home" component={Home} />
        <Route path="/profilebuy" component={Profilebuy} />
        <Route path="/profilebuyedit" component={Profilebuyedit} />
        <Route path="/Profileresedit" component={Profileresedit} />
        <Route path="/profileres" component={Profileres} />
        <Route path="/buyerorders" component={BuyerOrders} />
        <Route path="/adddish" component={AddDish} />
        <Route path="/addsection" component={AddSection} />
        <Route path="/showsection" component={ShowSections} />
        <Route path="/showdishes" component={ShowDishes} />
        <Route path="/chat" component={Chat} />
        <Route path="/showrorders" component={ShowROrders}></Route>
        <Route path="/showrpastorders" component={ShowRPastOrders}></Route>
        <Route path="/chatlist" component={ChatList}></Route>
        <Route path="/showmenu" component={ShowMenu} />
        <Route path="/checkout" component={Checkout}></Route>
        {/* <Route path="/currentordbuy" component={CurrentOrders}></Route>
        <Route path="/pastordbuy" component={PastOrders}></Route> */}
      </div>
    );
  }
}
//Export The Main Component
export default Main;
