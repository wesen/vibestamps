import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SrtEntry } from '../srt-parser';

export interface AppState {
  srtContent: string;
  srtEntries: SrtEntry[];
  isProcessing: boolean;
  generatedContent: string;
  error: string;
}

const initialState: AppState = {
  srtContent: '',
  srtEntries: [],
  isProcessing: false,
  generatedContent: '',
  error: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSrtContent(state, action: PayloadAction<string>) {
      state.srtContent = action.payload;
    },
    setSrtEntries(state, action: PayloadAction<SrtEntry[]>) {
      state.srtEntries = action.payload;
    },
    setIsProcessing(state, action: PayloadAction<boolean>) {
      state.isProcessing = action.payload;
    },
    setGeneratedContent(state, action: PayloadAction<string>) {
      state.generatedContent = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setSrtContent,
  setSrtEntries,
  setIsProcessing,
  setGeneratedContent,
  setError,
  resetState,
} = appSlice.actions;

export default appSlice.reducer;
