import React            from 'react';
import App              from './components/App';
import HomePage         from './components/home/HomePage';
import RegistrationPage from './components/auth/RegistrationContainer';
import LoginPage        from './components/auth/LoginContainer';

export default [
  {
    ...App,
    routes: [
      {
        ... HomePage,
        path: '/',
        exact: true
      },
      {
        ...RegistrationPage,
        path: '/register'
      },
      {
        ...LoginPage,
        path: '/login'
      }
    ]
  }
];
