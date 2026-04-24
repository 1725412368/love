import { createSlice } from '@reduxjs/toolkit';

// 初始状态：定义 5 位 NPC
const initialState = {
  characters: {
    girl1: {
      name: "林小晚",
      stamina: 100, // 体力
      mood: 50,    // 心情
      affection: 0, // 好感度
      shame: 0      // 羞耻度
    },
    girl2: {
      name: "苏清雪",
      stamina: 100,
      mood: 60,
      affection: 0,
      shame: 5
    },
    // ... 可以继续添加另外 3 位
  },
  activeCharacterId: 'girl1' // 当前正在互动的角色 ID
};

const npcSlice = createSlice({
  name: 'npc',
  initialState,
  reducers: {
    
    increaseAffection: (state, action) => {
      const { charId, amount } = action.payload;
      if (state.characters[charId]) {
        const currentVal = state.characters[charId].affection;
        // 计算新值，并确保它在 0 到 100 之间
        state.characters[charId].affection = Math.min(100, Math.max(0, currentVal + amount));
      }
    },
    // 如果你有减少好感度的动作，逻辑也是一样的
    updateMood: (state, action) => {
      const { charId, amount } = action.payload;
      if (state.characters[charId]) {
        const currentVal = state.characters[charId].mood;
        state.characters[charId].mood = Math.min(100, Math.max(0, currentVal + amount));
      }
    },
    // 改变心情
    updateMood: (state, action) => {
      const { charId, amount } = action.payload;
      state.characters[charId].mood += amount;
    },
    // 消耗体力
    consumeStamina: (state, action) => {
      const { charId, amount } = action.payload;
      state.characters[charId].stamina -= amount;
    },
    // 切换当前互动的 NPC
    setActiveCharacter: (state, action) => {
      state.activeCharacterId = action.payload;
    }
  }
});

export const { increaseAffection, updateMood, consumeStamina, setActiveCharacter } = npcSlice.actions;
export default npcSlice.reducer;