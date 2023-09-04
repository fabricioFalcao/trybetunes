import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Carregando from '../../components/carregando/Carregando';
import { UserType } from '../../types';

const initialState = {
  name: '',
  email: '',
  image: '',
  description: '',
} as UserType;

function Login() {
  const [carregando, setCarregando] = useState<boolean>(false);
  const [login, setLogin] = useState<UserType>(initialState);
  const { image, name, email, description } = login;

  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;
    setLogin({
      ...login,
      [id]: value,
    });
  };

  const handleClick = async () => {
    setCarregando(true);
    await createUser(login);
    navigate('/search');
  };

  if (carregando) {
    return (<Carregando />);
  }

  return (
    <section className="login-container">
      <img src="src/images/trybetunes_logo.svg" alt="Trybetunes logo" />
      <br />
      <form action="" className="form">
        <div>
          <h4>Imagem de perfil</h4>
          <input
            type="text"
            data-testid="login-input-image"
            id="image"
            value={ image }
            placeholder="URL da imagem"
            onChange={ handleChange }
          />
        </div>
        <br />
        <div>
          <h4>Nome</h4>
          <input
            type="text"
            data-testid="login-name-input"
            value={ name }
            onChange={ handleChange }
            placeholder="Nome"
            required
            id="name"
          />
        </div>
        <br />
        <div>
          <h4>E-mail</h4>
          <input
            type="email"
            data-testid="login-input-email"
            placeholder="E-mail"
            required
            id="email"
            value={ email }
            onChange={ handleChange }
          />
        </div>
        <br />
        <div>
          <h4>Desrição</h4>
          <input
            type="text"
            data-testid="login-input-description"
            placeholder="Sua descrição"
            id="description"
            value={ description }
            onChange={ handleChange }
          />
        </div>
        <br />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ name.length < 3 }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

export default Login;
