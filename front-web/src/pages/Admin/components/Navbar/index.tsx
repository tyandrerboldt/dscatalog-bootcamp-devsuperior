import React from 'react';
import './styles.scss';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <NavLink to="/admin/products" className="admin-nav-item">
            Meus produtos
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="admin-nav-item">
            Minhas categorias
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="admin-nav-item">
            Meus usuarios
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
