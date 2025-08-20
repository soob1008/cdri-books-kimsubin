type BooksParams = {
  query: string;
  page: number;
  size: number;
  sort?: 'accuracy' | 'latest';
  target?: 'title' | 'isbn' | 'publisher' | 'person';
};

type BookResponse = {
  documents: Book[];
  meta: {
    pageable_count: number;
    total_count: number;
    is_end: boolean;
  };
};

type Book = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: Date;
  authors: string[];
  publisher: string;
  thumbnail: string;
  status: string;
  price: number;
  sale_price: number;
};

export type { BooksParams, BookResponse, Book };
