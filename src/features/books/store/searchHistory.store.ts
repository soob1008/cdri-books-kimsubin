import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryState {
  open: boolean;
  setOpen: (open: boolean) => void;
  histories: string[];
  addHistory: (keyword: string) => void;
  removeHistory: (keyword: string) => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      open: false,
      setOpen: (open) => set({ open }),
      histories: [],
      addHistory: (keyword) => {
        set((state) => {
          const filteredHistories = state.histories.filter(
            (history) => history !== keyword
          );
          const next = [keyword, ...filteredHistories].slice(0, 8);
          return { histories: next };
        });
      },
      removeHistory: (keyword) => {
        set((state) => ({
          histories: state.histories.filter((history) => history !== keyword),
        }));
      },
    }),
    {
      name: 'search-history',
    }
  )
);
