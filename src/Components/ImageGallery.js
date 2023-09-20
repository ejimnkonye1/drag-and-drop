import React, { useState } from 'react';
import img1 from '../images/10524561_4474972-removebg-preview.png';
import img2 from '../images/10502634_4456268-removebg-preview.png';
import img3 from '../images/17895513_5929339-removebg-preview.png';
import SearchBar from './Searchbar';

const initialImages = [
  {
    id: '1',
    url: img1,
    tags: ['tag1', 'tag2'],
  },
  {
    id: '2',
    url: img2,
    tags: ['tag3', 'tag4'],
  },
  {
    id: '3',
    url: img3,
    tags: ['tag5', 'tag6'],
  },
  // Add more images here
];

const ImageGallery = () => {
  const [images, setImages] = useState(initialImages);
  const [draggedImage, setDraggedImage] = useState(null);

  // Handle image filtering based on search query and tags
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = initialImages.filter((image) => {
      return (
        image.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)) ||
        image.id.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setImages(filtered);
  };

  // Handle drag start
  const onDragStart = (image) => {
    setDraggedImage(image);
  };

  // Handle drag over
  const onDragOver = (event) => {
    event.preventDefault();
  };

  // Handle drop
  const onDrop = () => {
    // Prevent dropping on the same image
    if (draggedImage !== null) {
      const updatedImages = images.filter((image) => image.id !== draggedImage.id);
      setImages([...updatedImages, draggedImage]);
      setDraggedImage(null);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div
        className="image-gallery"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="image-card"
            draggable
            onDragStart={() => onDragStart(image)}
          >
            <img src={image.url} alt={`Image ${image.id}`} />
            <div className="tags">
              {image.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
