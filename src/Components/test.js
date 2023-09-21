// src/components/ImageDropZone.js
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

import img5 from '../images/10883260_4591200.jpg';

const ImageDropZone = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const { items, setItems, attributes, isOver, overIndex } = useSortable({
    id: 'image-container',
    items: [], // Array to store image data
  });

  // Handle drop event
  const handleDrop = (event) => {
    const droppedImageSrc = event.dataTransfer.getData('text/plain');

    if (droppedImageSrc) {
      const newItem = (
        <img
          src={droppedImageSrc}
          style={{ maxWidth: '100%' }}
          alt="Dropped Image"
        />
      );

      if (overIndex !== null) {
        items.splice(overIndex, 0, newItem);
      } else {
        items.push(newItem);
      }

      setItems([...items]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (event) => {
    const newImageFiles = Array.from(event.target.files);

    newImageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem = (
          <img
            src={e.target.result}
            style={{ maxWidth: '100%' }}
            alt="Uploaded Image"
          />
        );

        items.push(newItem);
        setItems([...items]);
      };

      reader.readAsDataURL(file);
    });

    setImageFiles([...imageFiles, ...newImageFiles]);
  };

  return (
    <DndContext onDrop={handleDrop}>
      <div
        {...attributes}
        style={{
          minHeight: '300px',
          border: '2px dashed #ccc',
          padding: '10px',
        }}
      >
        {/* Display a static image */}
        <img
          src={img5}
          style={{ maxWidth: '100%' }}
          alt="Static Image"
        />

        {items.map((item, index) => (
          <div
            key={index}
            {...item.attributes}
            style={{ cursor: 'move', marginBottom: '5px' }}
          >
            {item}
          </div>
        ))}
        {isOver && (
          <div
            style={{
              minHeight: '50px',
              background: '#f0f0f0',
              textAlign: 'center',
            }}
          >
            Drop here
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
      />
    </DndContext>
  );
};

export default ImageDropZone;
