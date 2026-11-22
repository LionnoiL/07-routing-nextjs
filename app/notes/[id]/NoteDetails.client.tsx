"use client";

import { useQuery } from "@tanstack/react-query";

import { getNoteById } from "@/lib/api";

import css from "./NoteDetails.page.module.css";
import Loader from "@/app/loading";

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  return <NoteContent noteId={noteId} />;
}

function NoteContent({ noteId }: { noteId: string }) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
