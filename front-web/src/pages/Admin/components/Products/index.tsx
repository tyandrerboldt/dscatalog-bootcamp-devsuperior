import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

const Products = () => {
  return (
    <div>
      <Link to="/admin/products" className="mr-5">Listar produtos</Link>
      <Link to="/admin/products/create" className="mr-5">Criar produto</Link>
      <Link to="/admin/products/10">Editar produto</Link>
      <Switch>
        <Route path="/admin/products" exact>
          <h1>Listagem de produtos</h1>
        </Route>
        <Route path="/admin/products/create">
          <h1>Novo produto</h1>
        </Route>
        <Route path="/admin/products/:productId">
          <h1>Editar produto</h1>
        </Route>
      </Switch>
    </div>
  )
}

export default Products
