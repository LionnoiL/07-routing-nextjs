import axios from "axios";
const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

import type { Note, CreateNote } from "@/types/note";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + apiKey,
  },
});

export const getNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<NotesResponse> => {
  const params = {
    search,
    page,
    perPage: 12,
    tag: tag && tag.toLowerCase() !== "all" ? tag : undefined,
  };

  const { data } = await API.get<NotesResponse>("/notes", {
    params,
  });
  return data;
};

export const getTags = async (): Promise<string[]> => {
  return ["Todo", "Work", "Personal", "Meeting", "Shopping"];
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await API.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const { data } = await API.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const getNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const { data } = await API.get<Note>(`/notes/${noteId}`);
  return data;
};
