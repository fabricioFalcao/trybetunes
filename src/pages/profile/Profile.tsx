import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../../components/carregando/Carregando';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function Profile() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
      setCarregando(false);
    };
    fetchUser();
  }, []);

  if (carregando) {
    return <Carregando />;
  }

  return (
    <section>
      <img
        data-testid="profile-image"
        src={ user?.image }
        alt="Imagem do usuário"
      />
      <br />
      <div>
        <h4>Nome</h4>
        <p>{user?.name}</p>
      </div>
      <br />
      <div>
        <h4>E-mail</h4>
        <p>{user?.email}</p>
      </div>
      <br />
      <div>
        <h4>Descrição</h4>
        <p>{user?.description}</p>
      </div>
      <br />
      <Link
        to="/profile/edit"
      >
        Editar perfil
      </Link>
    </section>
  );
}

export default Profile;
