import React from 'react'
import BaseForm from '../../BaseForm';
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';

type FormState = {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

const Form = () => {
  const { register, handleSubmit, errors } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    makePrivateRequest({ url: '/products', method: 'POST', data });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title="CADASTRAR PRODUTO">
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input
                ref={register({ 
                  required: "Campo obrigatório" ,
                  minLength: {
                    value: 5,
                    message: "Deve ter no mínimo 5 caracteres"
                  },
                  maxLength: {
                    value: 60,
                    message: "Deve ter no máximo 60 caracteres"
                  }
                })}
                type="text"
                className="form-control input-base"
                name="name"
                placeholder="Nome do produto"

              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>
            {/* <select 
              name="category" 
              value={formData.category}
              className="form-control mt-4"
              onChange={handleOnChange}
            >
              <option value="1">Livros</option>
              <option value="2">Eletronicos</option>
              <option value="3">Computadores</option>
            </select> */}
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                type="number"
                className="form-control input-base"
                name="price"
                placeholder="Preço"
              />
              {errors.price && (
                <div className="invalid-feedback d-block">
                  {errors.price.message}
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                type="text"
                className="form-control input-base"
                name="imageUrl"
                placeholder="Imagem"
              />
              {errors.imageUrl && (
                <div className="invalid-feedback d-block">
                  {errors.imageUrl.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <textarea
              ref={register({ required: "Campo obrigatório" })}
              placeholder="Descrição"
              className="form-control input-base"
              name="description"
              cols={30}
              rows={10}
            />
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
      </BaseForm>
    </form>
  )
}

export default Form;
