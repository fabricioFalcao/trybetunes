import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types';
import Carregando from '../../components/carregando/Carregando';
import { getUser, updateUser } from '../../services/userAPI';

const initialState = {
  name: '',
  email: '',
  image: '',
  description: '',
} as UserType;

function ProfileEdit() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>(initialState);
  const { image, name, email, description } = user;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
      setCarregando(false);
    };
    fetchUser();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const inputs = [image, name, email, description];
  const checkFillIn = () => inputs.every((input) => input.length > 0);

  const onSubmit = async () => {
    setCarregando(true);
    await updateUser(user);
    navigate('/profile');
  };

  if (carregando) {
    return <Carregando />;
  }

  return (
    <section>
      <form action="" onSubmit={ onSubmit }>
        <div>
          <img
            src={ image }
            alt="Imagem do usuário"
            height="300px"

          />
          <br />
          <input
            type="text"
            data-testid="edit-input-image"
            id="image"
            value={ image }
            onChange={ handleChange }
            required
          />
        </div>
        <div>
          <h4>Nome</h4>
          <input
            type="text"
            data-testid="edit-input-name"
            value={ name }
            id="name"
            onChange={ handleChange }
            required
          />
        </div>
        <br />
        <div>
          <h4>E-mail</h4>
          <input
            type="email"
            data-testid="edit-input-email"
            id="email"
            value={ email }
            onChange={ handleChange }
            required
          />
        </div>
        <br />
        <div>
          <h4>Desrição</h4>
          <input
            type="text"
            data-testid="edit-input-description"
            id="description"
            value={ description }
            onChange={ handleChange }
            required
          />
        </div>
        <br />
        <button
          data-testid="edit-button-save"
          type="submit"
          disabled={ !checkFillIn() }
        >
          Salvar
        </button>
      </form>
    </section>
  );
}

export default ProfileEdit;
