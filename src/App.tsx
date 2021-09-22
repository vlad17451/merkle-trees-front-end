import React, {useEffect} from 'react'
import Router from './components/Router';
import './App.scss';
// @ts-ignore
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {fetchWhitelist} from './utils/web3'

function App() {

  useEffect(() => {
    fetchWhitelist()
  }, [])

  return (
    <div>
      <Router />
      <NotificationContainer />
    </div>
  );
}

export default App;
