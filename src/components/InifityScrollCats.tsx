"use client";
import { CatsList } from "@/components";
import { CatStore, useCatStore } from "@/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PAGE_ANIMATION_TIME, PAGE_SIZE } from "@/lib";
import _ from "lodash";

export default function InifityScrollCats({
  catsKey,
}: {
  catsKey: keyof Pick<CatStore, "cats" | "favorites">;
}) {
  const state = useCatStore();
  const [page, setPage] = useState(1);

  const cats = useMemo(() => state[catsKey], [state, catsKey]);
  const hasMore = useMemo(
    () => (catsKey == "favorites" ? cats.length > page * PAGE_SIZE : true),
    [page, cats],
  );

  useEffect(() => {
    if (catsKey == "cats") {
      if (state.cats.length < page * PAGE_SIZE) state.loadCats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMoreData = useCallback(
    _.throttle(
      () => {
        setPage((prevPage) => prevPage + 1);
      },
      PAGE_ANIMATION_TIME * 1000 * 0.6,
    ),
    [],
  );

  const cats_displayed = useMemo(
    () => cats.slice(0, page * PAGE_SIZE),
    [cats, page],
  );

  return (
    <article>
      <InfiniteScroll
        dataLength={cats_displayed.length}
        next={fetchMoreData}
        className="!overflow-visible"
        hasMore={hasMore}
        loader={
          <p className="text-center mt-6 sm:mt-12 animate-bounce">
            ... загружаем еще котиков ...
          </p>
        }
        scrollThreshold={"200px"}
      >
        <CatsList cats={cats_displayed} className="mx-auto"></CatsList>
      </InfiniteScroll>
    </article>
  );
}
