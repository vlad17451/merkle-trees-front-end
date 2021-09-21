import React from 'react';
import Router from './components/Router';
import './App.scss';
// @ts-ignore
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <div>
      <Router />
      <NotificationContainer />
    </div>
  );
}

export default App;
