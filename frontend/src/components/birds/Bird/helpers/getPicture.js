import placeholderThumbnail from '../../../../assets/img/placeholderThumbnail.png';
import placeholderLarge from '../../../../assets/img/placeholderLarge.png';

/**
  Provides appropriate image link for a bird bird_extended or a placeholder.
  Protects against invalid size types.
  */
const getPicture = (bird, size = 'thumbnail') => {
  const placeholders = {
    thumbnail: placeholderThumbnail,
    large: placeholderLarge,
    default: placeholderThumbnail,
  };
  const bird_extended = (bird && bird.bird_extended) || null; // Allows for no bird being provided (i.e. shows placeholder)

  if (bird_extended && bird_extended.profile_picture)
    return bird_extended.profile_picture[size] || placeholders[size] || placeholders['default'];
  else return placeholders[size] || placeholders['default'];
};

export default getPicture;
