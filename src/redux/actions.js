export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM_POSITION = 'UPDATE_ITEM_POSITION';
export const LOAD_ITEMS = 'LOAD_ITEMS';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItemPosition = (id, x, y) => ({
  type: UPDATE_ITEM_POSITION,
  payload: { id, x, y },
});

export const loadItems = (items) => ({
  type: LOAD_ITEMS,
  payload: items,
});