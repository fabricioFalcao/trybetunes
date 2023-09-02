import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Carregando from '../../components/carregando/Carregando';
import MusicCard from '../../components/musicCard/MusicCard';

function Favorites() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [unfavorite, setUnfavorite] = useState<string>('');

  useEffect(() => {
    const fetchSongs = async () => {
      setCarregando(true);
      const favoritesList = await getFavoriteSongs();
      setFavoriteSongs(favoritesList);

      setCarregando(false);
    };
    fetchSongs();
  }, [unfavorite]);

  if (carregando) {
    return <Carregando />;
  }

  return (
    <main>
      <section>
        <h2>Minhas músicas favoritas</h2>
      </section>
      <section>
        {
        favoriteSongs.map((song) => (<MusicCard
          { ...song }
          key={ song.trackId }
          favoriteSongs={ favoriteSongs }
          setUnfavorite={ setUnfavorite }
        />))
      }
      </section>

    </main>
  );
}

export default Favorites;
