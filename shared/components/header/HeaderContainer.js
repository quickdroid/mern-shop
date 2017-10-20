import React, { Component }   from 'react';
import {connect}              from 'react-redux';
import HeaderUserProfile      from './HeaderUserProfileComponent';
import HeaderUserAuthNav      from './HeaderUserAuthNavComponent';
import {bindActionCreators}   from 'redux';
import * as authActions       from '../../actions/authenticationActions';
import _                      from 'underscore';
import PropTypes              from 'prop-types';
import { Grid, Navbar }       from 'react-bootstrap';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };

    this.logout = this.logout.bind(this);
  }

  logout(){
    const {authActions} = this.props;
    event.preventDefault();
    authActions.logout();
  }

  render() {
    const {user} = this.props;
    if (!_.isEmpty(user)){
      user.identity = (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` :
        user.firstName ? `${user.firstName}` :
          user.lastName ? `${user.lastName}` :
            user.username ? `${user.username}` :
              undefined;
    }

    return (
      <Navbar style={{marginBottom: '0'}}
              inverse className='fixed-top collapseOnSelect nav-bar'>
        <Grid>
          <Navbar.Header>
            {!_.isEmpty(user) && <HeaderUserProfile user={user} logout={this.logout}/> || <HeaderUserAuthNav /> }
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  authActions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const {userDataState} = state;
  return {user: userDataState.user};
};

function mapDispatchToProps(dispatch){
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(Header);

