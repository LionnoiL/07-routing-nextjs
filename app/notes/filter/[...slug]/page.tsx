import { Suspense } from "react";
import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { QUERY_KEY_NOTES } from "@/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NoteFilterProps {
  params: Promise<{ slug: string[] }>;
}

async function NotesData({ params }: NoteFilterProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0].toLowerCase() === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_NOTES, "", 1, tag],
    queryFn: () => getNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default function NotesPage({ params }: NoteFilterProps) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotesData params={params} />
    </Suspense>
  );
}
