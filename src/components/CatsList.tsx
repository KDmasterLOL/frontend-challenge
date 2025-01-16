import { Cats } from "@/types";
import CatCard from "./CatCard";

export default function CatsList({ cats }: { cats: Cats }) {
  const isLoading = false;
  console.log(cats);

  return (
    <>
      <div>
        {cats.map((c, i) => (
          <CatCard cat={c} key={i}></CatCard>
        ))}
      </div>

      {isLoading && <p>... загружаем еще котиков ...</p>}
    </>
  );
}
