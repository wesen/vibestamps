import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

export interface TimestampSection {
  timestamp: string;
  isNew?: boolean;
}

export interface MousePosition {
  x: number;
  y: number;
}

interface UIState {
  fileName: string;
  uploaderError: string;
  isDragging: boolean;
  progress: number;
  parsedSections: TimestampSection[];
  sparkles: Sparkle[];
  mounted: boolean;
  mousePosition: MousePosition;
}

const initialState: UIState = {
  fileName: '',
  uploaderError: '',
  isDragging: false,
  progress: 0,
  parsedSections: [],
  sparkles: [],
  mounted: false,
  mousePosition: { x: 0, y: 0 },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFileName(state, action: PayloadAction<string>) {
      state.fileName = action.payload;
    },
    setUploaderError(state, action: PayloadAction<string>) {
      state.uploaderError = action.payload;
    },
    setIsDragging(state, action: PayloadAction<boolean>) {
      state.isDragging = action.payload;
    },
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setParsedSections(state, action: PayloadAction<TimestampSection[]>) {
      state.parsedSections = action.payload;
    },
    setSparkles(state, action: PayloadAction<Sparkle[]>) {
      state.sparkles = action.payload;
    },
    setMounted(state, action: PayloadAction<boolean>) {
      state.mounted = action.payload;
    },
    setMousePosition(state, action: PayloadAction<MousePosition>) {
      state.mousePosition = action.payload;
    },
  },
});

export const {
  setFileName,
  setUploaderError,
  setIsDragging,
  setProgress,
  setParsedSections,
  setSparkles,
  setMounted,
  setMousePosition,
} = uiSlice.actions;

export default uiSlice.reducer;
