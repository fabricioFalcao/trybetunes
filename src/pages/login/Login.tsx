import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Carregando from '../../components/carregando/Carregando';

function Login() {
  const [login, setLogin] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    setCarregando(true);
    await createUser({ name: login });
    navigate('/search');
  };

  if (carregando) {
    return (<Carregando />);
  }

  return (
    <div className="login-container">
      <img src="src/images/trybetunes_logo.svg" alt="Trybetunes logo" />
      <form action="" className="form">
        <input
          type="text"
          data-testid="login-name-input"
          value={ login }
          onChange={ ({ target }) => setLogin(target.value) }
          placeholder="Nome"
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ login.length < 3 }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
