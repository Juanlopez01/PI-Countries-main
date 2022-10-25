import './App.css';
import Landing from './Components/Landing/Landing';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import CreateActivity from './Components/CreateActivity/CreateActivity';
import CountryDetail from './Components/CountryDetail/CountryDetail';
import {Route} from 'react-router-dom';
import React from 'react';
import style from './App.css'
import { About } from './Components/About/About';

function App() {
  return (
    <div className="App">

      <div className='Header'>
        <Route
        path='/home'
        render = {() => <Nav />}
        />
        <Route
        path='/activities'
        render = {() => <Nav />}
        />
        <Route
        path='/about'
        render = {() => <Nav />}
        />
        <Route
        path='/countries'
        render = {() => <Nav />}
        />
      </div>

      <div className={style.main}>
        <Route
        exact
        path='/'
        render={() => <Landing />}
        />

        <Route
        path='/home'
        render={() => <Home />}
        />

        <Route
        path='/countries/:id'
        component={CountryDetail}
        />

        <Route
        exact
        path='/activities'
        render={() => <CreateActivity />}
        />

        <Route
        exact
        path='/about'
        component={() => <About />}
        />
      </div>

    </div>
  );
}

export default App;
