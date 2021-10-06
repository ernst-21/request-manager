import React from 'react';
import { NavLink } from 'react-router-dom';
import auth from '../../modules/auth/auth-helper';
import SignoutBtn from '../../modules/auth/Signout';

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return { fontSize: '16px', color: '#d94506', fontWeight: 500 };
  else
    return {
      backgroundColor: 'transparent',
      fontSize: '16px',
      color: '#0B0B09'
    };
};

const MenuItems = (props) => {
  return (
    <ul className={props.className}>
      {!auth.isAuthenticated() && (
        <li
          onClick={props.onClick}
          style={isActive(props.history, '/signin')}
        >
          <NavLink to="/signin">
            <span style={isActive(props.history, '/signin')}>Sign In</span>
          </NavLink>
        </li>
      )}
      {auth.isAuthenticated() && (
        <>
          <li
            onClick={props.onClick}
          >
            <NavLink to="/users" activeStyle={{
              fontWeight: 'bold',
              color: 'red'
            }}>
              <span style={isActive(props.history, '/users')}>Users</span>
            </NavLink>
          </li>
          <SignoutBtn
            onClick={() => {
              auth.clearJWT(() => history.push('/'));
            }}
          >
            Sign out
          </SignoutBtn>
        </>
      )}
    </ul>
  );
};

export default MenuItems;
