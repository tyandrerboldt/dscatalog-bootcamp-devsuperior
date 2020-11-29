import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';

type FormState = {
  name: string;
  price: string;
  description: string;
  imgUrl: string;
}

type ParamsType = {
  productId: string;
}

const Form = () => {
  const { register, handleSubmit, errors, setValue } = useForm<FormState>();
  const history = useHistory();
  const { productId } = useParams<ParamsType>();
  const isEditing = productId !== 'create';
  const formTitle = isEditing ? 'Editar produto' : 'Cadastrar produto';

  useEffect(() => {
    if(isEditing){
      makeRequest({ url: `/products/${productId}`})
        .then(response => {
          const data = response.data;
          setValue('name', data.name);
          setValue('price', data.price);
          setValue('description', data.description);
          setValue('imgUrl', data.imgUrl);
        })
    }
  }, [productId, isEditing, setValue])

  const onSubmit = (data: FormState) => {
    makePrivateRequest({ 
      url: isEditing ? `/products/${productId}` : '/products', 
      method: isEditing ? 'PUT' : 'POST', 
      data 
    })
      .then(() => {
        toast.info('Produto salvo com sucesso!');
        history.push('/admin/products')
      })
      .catch(() => {
        toast.error('Erro ao salvar produto!');
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
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
                name="imgUrl"
                placeholder="Imagem"
              />
              {errors.imgUrl && (
                <div className="invalid-feedback d-block">
                  {errors.imgUrl.message}
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
