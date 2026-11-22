import { Suspense } from "react";
import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { QUERY_KEY_NOTES } from "@/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function NotesData() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_NOTES, "", 1],
    queryFn: () => getNotes("", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotesData />
    </Suspense>
  );
}
