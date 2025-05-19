import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { SrtEntry } from '../srt-parser';
import { srtContentSchema } from '../schemas';

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

export const generateTimestamps = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('app/generateTimestamps', async (srtContent, { dispatch, rejectWithValue }) => {
  try {
    const validation = srtContentSchema.safeParse({ srtContent });
    if (!validation.success) {
      return rejectWithValue(validation.error.errors[0].message);
    }

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ srtContent }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.error || 'Failed to generate timestamps');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        dispatch(setGeneratedContent(result));
      }
    }
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Failed to process your file'
    );
  }
});

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
  extraReducers: (builder) => {
    builder
      .addCase(generateTimestamps.pending, (state) => {
        state.isProcessing = true;
        state.error = '';
        state.generatedContent = '';
      })
      .addCase(generateTimestamps.fulfilled, (state) => {
        state.isProcessing = false;
      })
      .addCase(generateTimestamps.rejected, (state, action) => {
        state.isProcessing = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Failed to process your file';
      });
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

export { generateTimestamps };
