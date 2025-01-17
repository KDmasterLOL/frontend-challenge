"use client";
import { CatsList } from "@/components";
import { useCatStore } from "@/store/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "@/lib";

export default function Home() {
  const state = useCatStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (state.cats.length < page * PAGE_SIZE) state.loadCats();
  }, [page]);
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const cats = useMemo(
    () => state.cats.slice(0, page * PAGE_SIZE),
    [state, page],
  );

  return (
    <article>
      <InfiniteScroll
        dataLength={cats.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <p className="text-center mt-6 sm:mt-12">
            ... загружаем еще котиков ...
          </p>
        }
        scrollThreshold={"200px"}
      >
        <CatsList cats={cats} className="mx-auto"></CatsList>
      </InfiniteScroll>
    </article>
  );
}
