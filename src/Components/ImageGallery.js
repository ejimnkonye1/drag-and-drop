import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import img1 from '../images/14658084_5506971-removebg-preview.png';
import img2 from '../images/10502634_4456268-removebg-preview.png';
import img3 from '../images/17895513_5929339-removebg-preview.png';
import img4 from '../images/20602852_6333050-removebg-preview.png';
import img5 from '../images/5538959_2867045-removebg-preview.png';
import img6 from '../images/7769819_3226836-removebg-preview.png';

import SearchBar from './Searchbar';

const initialImages = [
  {
    id: '1',
    url: img1,
    tags: ['tag1'],
  },
  {
    id: '2',
    url: img2,
    tags: ['tag2'],
  },
  {
    id: '3',
    url: img3,
    tags: ['tag3'],
  },
  {
    id: '4',
    url: img4,
    tags: ['tag4'],
  },
  {
    id: '5',
    url: img5,
    tags: ['tag5'],
  },
  {
    id: '6',
    url: img6,
    tags: ['tag6'],
  },
];

const ImageCard = ({ image, index, moveImage }) => {
  const handleTouchStart = (event) => {
    // Handle touch start event
    console.log('Touch start:', event.touches);
  };

  const handleTouchMove = (event) => {
    // Handle touch move event
    console.log('Touch move:', event.touches);
  };

  const handleTouchEnd = (event) => {
    // Handle touch end event
    console.log('Touch end:', event.changedTouches);
  };

  const [, ref] = useDrag({
    type: 'IMAGE',
    item: { index },
    onTouchStart: handleTouchStart, // Add touch start event handler
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover(draggedImage) {
      if (draggedImage.index !== index) {
        moveImage(draggedImage.index, index);
        draggedImage.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        ref(drop(node));
        node?.addEventListener('touchstart', handleTouchStart);
        node?.addEventListener('touchmove', handleTouchMove);
        node?.addEventListener('touchend', handleTouchEnd);
      }}
      className="image-card"
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
  );
};

const ImageGallery = () => {
  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(true);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

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

  useEffect(() => {
    // Simulate an API call or any asynchronous operation to fetch images
    // For this example, we use a setTimeout to simulate loading delay
    const fakeApiCall = () => {
      setTimeout(() => {
        setLoading(false); // Set loading to false when images are ready
      }, 2000); // Simulate a 2-second loading time
    };

    // Call the fake API
    fakeApiCall();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          // Show a skeleton loader or loading spinner while images are loading
          <div className="loading-spinner">
            {/* You can replace this with your preferred loading indicator */}
            Loading...
          </div>
        ) : (
          // Display the image gallery when loading is false
          <div className="image-gallery">
            {images.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ImageGallery;
