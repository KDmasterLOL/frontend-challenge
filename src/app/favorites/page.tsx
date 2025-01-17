"use client";
import { CatsList } from "@/components";
import { useCatStore } from "@/store/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo, useState } from "react";
import { PAGE_SIZE } from "@/lib";

export default function Favorites() {
  const state = useCatStore();
  const [page, setPage] = useState(1);
  const hasMore = useMemo(
    () => state.favorites.length > page * PAGE_SIZE,
    [page, state],
  );

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const cats = useMemo(
    () => state.favorites.slice(0, page * PAGE_SIZE),
    [state, page],
  );

  return (
    <article>
      <InfiniteScroll
        dataLength={cats.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <p className="text-center mt-6 sm:mt-12">
            ... загружаем еще котиков ...
          </p>
        }
        scrollThreshold={0.8}
      >
        <CatsList cats={cats} className="mx-auto"></CatsList>
      </InfiniteScroll>
    </article>
  );
}
