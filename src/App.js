import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';

import Login from './Pages/Login';
import { Header } from './Components/Header';
import Profile from './Pages/Profile';
import Meals from './Pages/Meals';
import MealDetails from './Pages/MealDetails';
import Footer from './Components/Footer';
import Drinks from './Pages/Drinks';
import DrinkDetails from './Pages/DrinkDetails';

function App() {
  const location = useLocation();

  const routesWithFooter = [
    '/meals',
    '/drinks',
    '/profile',
  ];

  const shouldShowFooter = routesWithFooter.includes(location.pathname);

  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/meals/:id" component={ MealDetails } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
      </Switch>

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
