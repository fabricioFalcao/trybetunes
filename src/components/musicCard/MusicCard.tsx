import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import checkedHeart from '../../images/checked_heart.png';
import uncheckedHeart from '../../images/empty_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

function MusicCard({ previewUrl, trackName, trackId }: SongType) {
  const [favorite, setFavorite] = useState<boolean>(false);
  console.log(favorite);

  const songData = {
    trackId,
    trackName,
    previewUrl,
  };

  useEffect(() => {
    if (favorite) {
      addSong(songData);
    } else {
      removeSong(songData);
    }
  }, [favorite]);

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
            onChange={ () => setFavorite(!favorite) }
            checked={ favorite }
            style={ { opacity: '0' } }
          />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
