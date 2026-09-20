import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imageUrls?: string[];
}

export const loadNotes = async(uid: string = ''): Promise<Note[]> => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes: Note[] = [];
  docs.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() } as Note);
  });

  return notes;
};
