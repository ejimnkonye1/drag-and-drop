import React, { useState, useEffect } from 'react';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import img1 from '../images/palpa-4c1e85d5.webp';
import img2 from '../images/star.webp';
import img3 from '../images/obi-21c40bfa.webp';
import img4 from '../images/maul-4121e18d.webp';
import img5 from '../images/luke-88288006.webp';
import img6 from '../images/ahsoka-3d651f8d.webp';
import img9 from '../images/ff2a87b3-861f-416c-911b-c4f3bf0d06ad.jpeg';
import SearchBar from './Searchbar';
import Head from './head';

const initialImages = [
  {
    id: '1',
    url: img1,
    tags: ['Palpa'],
  },
  {
    id: '2',
    url: img2,
    tags: ['star'],
  },
  {
    id: '3',
    url: img3,
    tags: ['Obi-ken'],
  },
  {
    id: '4',
    url: img4,
    tags: ['maul'],
  },
  {
    id: '5',
    url: img5,
    tags: ['luke'],
  },
  {
    id: '6',
    url: img6,
    tags: ['Ahsoka'],
  },
];

const ImageCard = ({ image, index, moveImage }) => {
  const [, ref, preview] = useDrag({
    type: 'IMAGE',
    item: { index },
    options: {
      previewOptions: {
        anchorX: 0,
        anchorY: 0,
      },
    },
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

  return (
    <div
      ref={(node) => {
        ref(drop(node));
        preview(drop(node)); // Set the preview ref
        node?.addEventListener('touchstart', handleTouchStart);
        node?.addEventListener('touchmove', handleTouchMove);
        node?.addEventListener('touchend', handleTouchEnd);
      }}
      className="image-card"
 
    >
     <div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
    <img src={image.url} className="card-img-top" alt={`Image ${image.id}`}
    style={{width:'300px' , height:'200px'}}
    />
    </div>
    <div class="flip-box-back">
    <img src={img9}
    style={{width:'300px' , height:'200px'}} />
    </div>
  </div>
</div>

      <div className="card-body">
        <div className="tags">
          {image.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="badge bg-primary me-1">
              {tag}
            </span>
          ))}
        </div>
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

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

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
    const fakeApiCall = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fakeApiCall();
  }, []);

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div>
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="">
            <div className='image-gallery'>
              {images.map((image, index) => (
                <ImageCard key={image.id} image={image} index={index} moveImage={moveImage} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ImageGallery;
