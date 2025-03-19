import React from 'react';

const ObjectList = ({ onAddItem, onSave, onLoad }) => {
  const objects = [
    { id: 'table', name: 'Table', src: '/assets/table.png' },
    { id: 'chair', name: 'Chair', src: '/assets/chair.png' },
  ];

  const handleDragStart = (e, object) => {
    e.dataTransfer.setData('application/json', JSON.stringify(object));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      style={{
        width: '200px',
        padding: '10px',
        borderRight: '1px solid #ccc',
        background: '#fff',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Objects</h3>
      {objects.map((object) => (
        <div
          key={object.id}
          draggable
          onDragStart={(e) => handleDragStart(e, object)}
          style={{
            cursor: 'grab',
            marginBottom: '10px',
            textAlign: 'center',
            padding: '5px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#f9f9f9',
          }}
        >
          <img
            src={object.src}
            alt={object.name}
            style={{ width: '50px', height: '50px' }}
          />
          <p style={{ margin: '5px 0 0' }}>{object.name}</p>
        </div>
      ))}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={onSave}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Download
        </button>
        <label
          htmlFor="file-upload"
          style={{
            display: 'block',
            
            padding: '10px',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          Upload
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={onLoad}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default ObjectList;