import { api } from "./api";

/** Shelf metadata for one Cambridge volume, served by GET /api/catalog/books. */
export interface CambridgeBook {
  volume: number;
  year: number;
  academic: boolean;
  general: boolean;
  coverAccent: string;
  badge: string;
  description: string;
  difficulty: string;
  tests: { academic: number; general: number };
}

/** Fetches the book shelf from the backend database. No hard-coded fallback. */
export async function fetchBookCatalogue(type?: "ACADEMIC" | "GENERAL"): Promise<CambridgeBook[]> {
  const data = await api<{ books: CambridgeBook[] }>(`/catalog/books${type ? `?type=${type}` : ""}`);
  return data.books;
}
