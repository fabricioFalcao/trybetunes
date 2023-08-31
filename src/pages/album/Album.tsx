import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carregando from '../../components/carregando/Carregando';
import MusicCard from '../../components/musicCard/MusicCard';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';

function Album() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [albumInfo, setAlbumInfo] = useState<AlbumType>();
  const [songsList, setSongsList] = useState<SongType[]>();

  const { id } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      const songsData = await getMusics(id as string);

      if (!songsData) {
        setCarregando(false);
        throw new Error('Unable to fetch data from API');
      }

      setAlbumInfo(songsData[0]);
      setSongsList(songsData.slice(1) as SongType[]);

      setCarregando(false);
    };
    fetchSongs();
  }, [id]);

  if (carregando) {
    return <Carregando />;
  }

  return (
    <main>
      <section>
        <h2 data-testid="artist-name">{albumInfo?.artistName}</h2>
        <h3 data-testid="album-name">{albumInfo?.collectionName}</h3>
      </section>
      <section>
        {
          songsList?.map((song) => <MusicCard { ...song } key={ song.trackId } />)
        }
      </section>

    </main>

  );
}

export default Album;
