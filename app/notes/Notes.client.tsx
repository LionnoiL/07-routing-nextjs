"use client";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import { Button } from "antd";

import { getNotes } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import { QUERY_KEY_NOTES } from "@/constants";

const App = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryFn: () => getNotes(debouncedSearch, currentPage),
    queryKey: [QUERY_KEY_NOTES, debouncedSearch, currentPage],
    placeholderData: keepPreviousData,
  });

  const handleSearch = (search: string) => {
    setCurrentPage(1);
    setSearch(search);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch}></SearchBox>
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Button className={css.button} onClick={handleOpenModal}>
          Create note +
        </Button>
      </header>
      {isLoading && <p className={css.loading}>Loading...</p>}
      {isError && <p className={css.error}>{error.message}</p>}
      {isSuccess && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
