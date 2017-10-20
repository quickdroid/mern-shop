import React        from 'react';
import { Navbar }   from 'react-bootstrap';
import {
  FaSignIn,
  FaRegistered
}                   from 'react-icons/lib/fa';

const HeaderUserAuthNav = () => {
  return (
    <div>
      <Navbar.Brand key={1}>
        <a href='/login'>
          <FaSignIn/>
          Login
        </a>
      </Navbar.Brand>,
      <Navbar.Brand key={2}>
        <a href='/register'>
          <FaRegistered/>
          Register
        </a>
      </Navbar.Brand>
    </div>
  );
};

export default HeaderUserAuthNav;
