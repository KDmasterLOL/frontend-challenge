import { Cats } from "@/types";

const BASE_URL = "https://api.thecatapi.com/v1/";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type QueryParams = Partial<{
  limit: number; // 1 - 100
  page: number;
  order: "ASC" | "DESC" | "RAND";
  has_breeds: 0 | 1;
  breed_ids: string;
  category_ids: string;
  sub_id: string;
}>;
function get_query(query: string, params: QueryParams = {}) {
  const url = new URL(BASE_URL + query);
  url.searchParams.append("api_key", API_KEY!);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value!.toString());
    }
  });

  return url.toString();
}

export async function get_random_images(
  page_size: number,
  page: number,
): Promise<Cats> {
  const query = get_query("images/search", { limit: page_size, page });
  console.log(query);
  const response = await fetch(query);
  const data = await response.json();
  return data;
}
