import React from 'react';
import './styles.scss';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <a href="link" className="admin-nav-item active">Meus produtos</a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">Minhas categorias</a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">Meus usuarios</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
