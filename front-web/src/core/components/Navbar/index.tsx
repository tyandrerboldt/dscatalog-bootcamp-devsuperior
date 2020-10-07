import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.scss';

const Navbar = () => (
  <nav className="row bg-primary main-nav">
    <div className="col-2">
      <Link to="/" className="nav-logo-text">
        <h4>DS Catalog</h4>
      </Link>
    </div>
    <div className="col-6 offset-2">
      <ul className="main-menu">
        <li>
          <NavLink to="/" className="nav-logo-text" activeClassName="active" exact>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-logo-text" activeClassName="active">
            CATÁLOGO
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className="nav-logo-text" activeClassName="active">
            ADMIN
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;