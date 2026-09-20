import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote } from './journalSlice';
import { deleteNoteById, savingNewNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';
import { AppDispatch, RootState } from '../store';

export const startNewNote = () => {
  return async(dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    const noteWithId = { ...newNote, id: newDoc.id };

    dispatch(addNewEmptyNote(noteWithId));
    dispatch(setActiveNote(noteWithId));
  };
};

export const startLoadingNotes = () => {
  return async(dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async(dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!note) return;

    const noteToFireStore: Omit<typeof note, 'id'> = { ...note };
    delete (noteToFireStore as Partial<typeof note>).id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files: File[] = []) => {
  return async(dispatch: AppDispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = files.map(file => fileUpload(file));
    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async(dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!note) return;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
