import React from 'react'
import AuthCard from '../Card'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ButtonIcon from 'core/components/ButtonIcon'
import './styles.scss'
import { makeLogin } from 'core/utils/request'

type FormData = {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    makeLogin(data);
  }

  return (
    <>
      <AuthCard title="Login">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >
          <input 
            type="email" 
            name="username"
            ref={register}
            className="form-control input-base margin-bottom-30"
            placeholder="E-mail"
            />
          <input 
            type="password" 
            name="password"
            ref={register}
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
