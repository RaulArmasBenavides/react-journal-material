import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../helpers/loadNotes';

export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: (Note & { imageUrls?: string[] }) | null;
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      if (state.active) {
        state.active.imageUrls = [...(state.active.imageUrls || []), ...action.payload];
      }
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  }
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
