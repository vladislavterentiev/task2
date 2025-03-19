import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ObjectList from './ObjectList';
import Board from './Board';

const Planner = () => {
  const [boardItems, setBoardItems] = useState([]);

  // Добавление объекта на доску
  const handleAddItem = (item, x, y) => {
    const newItem = {
      id: uuidv4(),
      type: item.id,
      name: item.name,
      src: item.src,
      x: x || 50,
      y: y || 50,
    };
    setBoardItems((prevItems) => [...prevItems, newItem]);
  };

  // Обновление позиции объекта
  const updateItemPosition = (id, x, y) => {
    setBoardItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  // Удаление объекта
  const handleDeleteItem = (id) => {
    setBoardItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Сохранение текущей расстановки в файл
  const handleExport = () => {
    const dataToExport = boardItems.map((item) => ({
      id: item.id,
      type: item.type,
      name: item.name,
      src: item.src,
      x: item.x,
      y: item.y,
    }));

    const dataStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'planner-layout.json'; // Имя файла
    a.click();

    URL.revokeObjectURL(url);
  };

  // Загрузка расстановки из файла
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);

        // Проверяем формат данных
        if (
          Array.isArray(importedData) &&
          importedData.every(
            (item) =>
              typeof item.id === 'string' &&
              typeof item.type === 'string' &&
              typeof item.name === 'string' &&
              typeof item.src === 'string' &&
              typeof item.x === 'number' &&
              typeof item.y === 'number'
          )
        ) {
          // Обновляем состояние boardItems
          setBoardItems(importedData);
        } else {
          alert('Неверный формат файла');
        }
      } catch (error) {
        console.error('Ошибка при парсинге файла:', error);
        alert('Ошибка при загрузке файла');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Боковая панель с объектами */}
      <ObjectList
        onAddItem={handleAddItem}
        onSave={handleExport} // Передаем функцию сохранения
        onLoad={handleFileUpload} // Передаем функцию загрузки
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Board
          items={boardItems}
          onAddItem={handleAddItem}
          onUpdatePosition={updateItemPosition}
          onDeleteItem={handleDeleteItem}
        />
        <div
          style={{
            height: '100px',
            border: '2px dashed red',
            background: '#fdd',
            textAlign: 'center',
            lineHeight: '100px',
            color: 'red',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData('text/plain');
            handleDeleteItem(id);
          }}
        >
          Drop here to delete
        </div>
      </div>
    </div>
  );
};

export default Planner;