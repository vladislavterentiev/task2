import React, { useState, useEffect, useRef } from 'react';

const Board = ({ items, onAddItem, onUpdatePosition, onDeleteItem }) => {
  const boardRef = useRef(null);

  const [draggingItemId, setDraggingItemId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, id) => {
    const element = e.target;
    const rect = element.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDraggingItemId(id);
    setOffset({ x: offsetX, y: offsetY });
  };


  useEffect(() => {
    if (!draggingItemId) return;

    const handleMouseMove = (moveEvent) => {
      if (!boardRef.current) return;

      const boardRect = boardRef.current.getBoundingClientRect();
      let x = moveEvent.clientX - boardRect.left - offset.x;
      let y = moveEvent.clientY - boardRect.top - offset.y;

      x = Math.max(0, Math.min(x, boardRect.width - 50));
      y = Math.max(0, Math.min(y, boardRect.height - 50));

      onUpdatePosition(draggingItemId, x, y);
    };

    const handleMouseUp = () => {
      setDraggingItemId(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingItemId, offset, onUpdatePosition]);

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = boardRef.current.getBoundingClientRect();

    const rawData = e.dataTransfer.getData('application/json');
    const idOnly = e.dataTransfer.getData('text/plain');

    let newItemData;
    if (rawData) {
      try {
        newItemData = JSON.parse(rawData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return;
      }
    } else if (idOnly) {
      const existingItem = items.find((item) => item.id === idOnly);
      if (!existingItem) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onUpdatePosition(idOnly, x, y);
      return;
    }

    if (newItemData) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onAddItem(newItemData, x, y);
    }
  };

  return (
    <div
      ref={boardRef}
      style={{
        flex: 1,
        position: 'relative',
        border: '1px solid #ccc',
        minHeight: '600px',
        background: '#f9f9f9',
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {items.map((item) => (
        <img
          key={item.id}
          src={item.src}
          alt={item.name}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
          style={{
            position: 'absolute',
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: '50px',
            height: '50px',
            cursor: draggingItemId === item.id ? 'grabbing' : 'grab',
            zIndex: draggingItemId === item.id ? 10 : 1,
          }}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
        />
      ))}
    </div>
  );
};

export default Board;