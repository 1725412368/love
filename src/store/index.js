import { configureStore } from '@reduxjs/toolkit';
import npcReducer from './npcSlice';

// 从本地加载数据
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('sea_king_save');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 保存数据到本地
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('sea_king_save', serializedState);
  } catch {
    // 忽略写入错误
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    npc: npcReducer,
  },
  preloadedState: persistedState, // 初始加载存档
});

// 监听 Store 变化，每次变动都存一次档
store.subscribe(() => {
  saveState({
    npc: store.getState().npc
  });
});