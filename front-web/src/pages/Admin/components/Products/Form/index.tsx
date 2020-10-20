import React, { useState } from 'react'
import BaseForm from '../../BaseForm';
import './styles.scss';
import { makeRequest } from 'core/utils/request';

type FormState = {
  name: string;
  price: string;
  category: string;
  description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    price: '',
    category: '1',
    description: ''
  })

  const handleOnChange = (event: FormEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...formData,
      imgUrl: 'https://1759028l.ha.azioncdn.net/img/2020/04/produto/202486/19/large/frente-console-xbox-one-s-1tb-all-digital-edition.jpg',
      categories: [{ id: formData.category }]
    }    
    
    makeRequest({url: '/products', method: 'POST', data: payload}).then(() => {
      setFormData({
        name: '',
        price: '',
        category: '1',
        description: ''
      })
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <BaseForm title="CADASTRAR PRODUTO">
        <div className="row">
          <div className="col-6">
            <input 
              type="text" 
              className="form-control"
              value={formData.name}
              name="name"
              onChange={handleOnChange}
            />
            <select 
              name="category" 
              value={formData.category}
              className="form-control mt-4"
              onChange={handleOnChange}
            >
              <option value="1">Livros</option>
              <option value="2">Eletronicos</option>
              <option value="3">Computadores</option>
            </select>
            <input 
              type="text" 
              className="form-control mt-4"
              value={formData.price}
              name="price"
              onChange={handleOnChange}
            />
          </div>
          <div className="col-6">
            <textarea 
              name="description" 
              className="form-control"
              value={formData.description}
              cols={30} 
              rows={10} 
              onChange={handleOnChange}
            />
          </div>
        </div>
      </BaseForm>
    </form>
  )
}

export default Form;
