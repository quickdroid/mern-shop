import React, { Component }  from 'react';
import PropTypes             from 'prop-types';
import { Navbar }            from 'react-bootstrap';
import FaSignOut from 'react-icons/lib/fa/sign-out';

class HeaderUserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user, logout} = this.props;

    return (
      <div>
        <Navbar.Brand key={1}>
          <span className='profile-identity'>Welcome </span><span>{user.identity}</span>
        </Navbar.Brand>,
        <Navbar.Brand key={2}>
          <a href='#' onClick={logout}>
            <FaSignOut/>
            logout
          </a>
        </Navbar.Brand>
      </div>
    );
  }
}

HeaderUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default HeaderUserProfile;
