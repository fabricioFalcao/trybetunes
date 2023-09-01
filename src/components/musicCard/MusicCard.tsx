import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import checkedHeart from '../../images/checked_heart.png';
import uncheckedHeart from '../../images/empty_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

type MusicCardProps = {
  trackId: number,
  trackName: string,
  previewUrl: string,
  favoriteSongs: SongType[]
};

function MusicCard({ previewUrl, trackName, trackId, favoriteSongs }: MusicCardProps) {
  const [favorite, setFavorite] = useState<boolean>(false);

  const songData = {
    trackId,
    trackName,
    previewUrl,
  };

  useEffect(() => {
    const isFavorite = favoriteSongs.find((song) => song.trackId === trackId);
    if (isFavorite !== undefined) {
      setFavorite(true);
    }
  }, []);

  const handleChange = () => {
    setFavorite(!favorite);
    if (!favorite) {
      addSong(songData);
    } else {
      removeSong(songData);
    }
  };

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <div>
        <label
          data-testid={ `checkbox-music-${trackId}` }
        >
          {favorite
            ? (<img src={ checkedHeart } alt="favorite" />)
            : (<img src={ uncheckedHeart } alt="favorite" />)}
          <input
            type="checkbox"
            onChange={ handleChange }
            checked={ favorite }
            style={ { opacity: '0' } }
          />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
