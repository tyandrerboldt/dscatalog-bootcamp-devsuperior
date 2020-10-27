import React from 'react'
import './styles.scss'
import AuthCard from '../Card'
import { Link } from 'react-router-dom'
import ButtonIcon from 'core/components/ButtonIcon'

const Login = () => {
  return (
    <>
      <AuthCard title="Login">
        <form className="login-form">
          <input 
            type="email" 
            className="form-control input-base margin-bottom-30"
            placeholder="E-mail"
            />
          <input 
            type="password" 
            className="form-control input-base"
            placeholder="Senha"
            />
          <Link to="/admin/auth/recover" className="login-link-recover">
            Esqueci a senha?
          </Link>
          <div className="login-submit">
            <ButtonIcon text="Logar" />
          </div>
          <div className="text-center">
            <span className="not-registered">Não tem cadastro</span>
            <Link to="/admin/auth/register" className="login-link-register">Cadastrar</Link>
          </div>
        </form>
      </AuthCard>
    </>
  )
}

export default Login
