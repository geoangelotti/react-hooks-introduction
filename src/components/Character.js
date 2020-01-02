import React, { useEffect } from 'react';
import { useRequest } from '../hooks/request';

import Summary from './Summary';

const Character = props => {
  const [isLoading, fetchedData] = useRequest('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar])

  const loadedCharacter = fetchedData ? {
    id: props.selectedChar,
    name: fetchedData.name,
    height: fetchedData.height,
    colors: {
      hair: fetchedData.hair_color,
      skin: fetchedData.skin_color
    },
    gender: fetchedData.gender,
    movieCount: fetchedData.films.length
  } : null;


  useEffect(() => {
    return () => {
      console.log('Too soon...');
    }
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

export default React.memo(Character);
