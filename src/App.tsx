import React, {useEffect} from 'react'
import Router from './components/Router';
import './App.scss';
// @ts-ignore
import {fetchWhitelist} from "./app/useWeb3";

function App() {

  useEffect(() => {
    fetchWhitelist()
  }, [])

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
