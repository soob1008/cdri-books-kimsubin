# Certicos Books - CDRI FE

## 프로젝트 개요

Certicos Books 는 사용자가 원하는 책에 대한 정보를 찾을 수 있는 서비스입니다.
검색, 찜 기능을 통해 관심있는 책의 정보를 편리하게 보고 관리할 수 있습니다.

## 실행방법 및 환경 설정

```js
yarn install
yarn dev
```

env 파일 설정이 필요합니다.

## 폴더구조 및 주요 코드 설명

### 폴더구조

```js
src/
├─ app/                          # 앱 (라우팅, 프로바이더, 레이아웃, 페이지)
│  ├─ App.tsx                    # RouterProvider 포함, 글로벌 오류 경계 등
│  ├─ providers/
│  │  ├─ queryClient.ts          # React Query client 생성
│  │  └─ router.tsx              # createBrowserRouter 정의
│  ├─ pages/
│  │  ├─ BookSearchPage.ts       # 도서 검색 페이지
│  │  └─ WishListPage.tsx        # 찜 리스트 페이지
│  └─ layout/
│     ├─ RootLayout.tsx          # 공통 레이아웃
│     └─ Header.tsx
│
├─ features/                     # 도메인(기능)
│  ├─ books/                     # 도서 검색
│  │  ├─ api/
│  │  │  └─ getBooks.tsx.        # 도서 조회
│  │  ├─ components/
│  │  │  ├─ BookItem.tsx
│  │  │  ├─ BookList.tsx
│  │  │  ├─ BookSection.tsx
│  │  │  ├─ SearchBar.tsx
│  │  │  ├─ SearchFilter.tsx
│  │  │  ├─ SearchFilterPanel.tsx
│  │  │  └─ SearchSection.tsx
│  │  ├─ hooks/
│  │  │  └─ useInfiniteBooks.ts  # React Query 훅
│  │  └─ types/
│  │     └─ book.ts              # Book 타입 정의
│  │  └─ store/
│  │      └─ searchHistory.store.ts    # zustand + localStorage persist
│  │
│  └─ wishlist/                  # 찜 목록
│     ├─ components/
│     │  └─ WishListSection.tsx
│     └─ store/
│        └─ wishlist.store.ts    # Zustand + localStorage persist
│
├─ shared/                       # 공통 폴더
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  │  ├─ Select.tsx
│  │  ├─ Loading.tsx
│  │  └─ EmptyState.tsx
│  ├─ hooks/
│  │  └─ useInfiniteQueryScroll.ts
│  ├─ constants/
│  │  └─ option.ts               # 검색 및 정렬 옵션
│  ├─ styles/
│  │  └─ index.css
│
├─ assets/
│	└─ icons/                    # 아이콘
└─ main.tsx
```

### 주요 코드 설정

#### 도서 검색

무한 스크롤 공통 훅 - /shard/hooks/useInfiniteQueryScroll.ts

```js
export function useInfiniteQueryScroll<T>({
  queryKey,
  queryFn,
  getNextPageParam,
  enabled = true,
  initialPageParam,
}: UseQueryInfiniteScrollOptions<T>) {
  const { ref, inView } = useInView({
    rootMargin: '200px',
    threshold: 0.1,
  });

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    initialPageParam,
    getNextPageParam,
    enabled,
  });

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  useEffect(() => {
    if (!enabled) return;
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, enabled, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    query,
    ref,
  };
}
```

리스트 API를 사용할 경우 무한 스크롤을 적용할 때 재사용이 가능한 무한스크롤 공통 훅입니다.
useInfiniteQuery와 useInView를 조합해 스크롤이 특정 지점에 닿으면 다음 데이터를 불러오는 공통 훅입니다.
Intersection Observer를 적용해야할 ref와 react query에서 제공하는 데이터 query 를 리턴합니다.

React Query의 useInfiniteQuery 훅을 사용했습니다. useQuery와 달리 useInfiniteQuery는 페이지 단위를 누적관리합니다. 또한, hasNextPage, fetchNextPage 등 무한 스크롤 전용 상태를 제공하기 때문에 상태 처리를 해야하는 경우 편리하게 사용할 수 있습니다.

도서 API - /features/books/hooks/useInfiniteBooks.ts

```js
return (
  useInfiniteQueryScroll <
  BookResponse >
  {
    queryKey: ['books', query, sort, target],
    initialPageParam: initial,
    enabled: true,
    queryFn: ({ pageParam }) => getBooks(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.meta?.is_end) return undefined;
      return { ...initial, page: allPages.length + 1 };
    },
  }
);
```

useInfiniteQueryScroll 를 사용하여 도서 검색 API를 무한스크롤 적용된 형태로 가져올 수 있도록 했습니다.
다음 페이지를 불러올 때, 페이지가 끝이면 리턴해주고 끝이 아니면 페이지 param을 수정해서 다음 페이지의 데이터를 가져옵니다.

#### 찜 목록, 검색어 저장

zustand + persist 를 사용해서 찜 목록과 검색어를 저장했습니다.

```js
export const useWishListStore = create<WishlistState>()(
  persist<WishlistState>(
    (set) => ({
      wishlist: [],
      updateWishList: (book) =>
        set((state) => {
          // 토글 방식
          const exist = state.wishlist.some((it) => it.isbn === book.isbn);
          return exist
            ? { wishlist: state.wishlist.filter((it) => it.isbn !== book.isbn) }
            : { wishlist: [...state.wishlist, book] };
        }),
    }),
    {
      name: 'wishlist',
    }
  )
);
```

```js
export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      open: false, // 검색어 리스트 오픈 상태
      setOpen: (open) => set({ open }),
      histories: [],
      addHistory: (keyword) => {
        set((state) => {
          // 중복 키워드 필터링 후 8개까지만 저장
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
```

### 라이브러리 선택 이유

#### React Query

서버 상태를 효율적으로 관리하기 위한 라이브러리입니다. 데이터 캐싱, 자동으로 리페치, 로딩 상태 처리와 전역 에러상태를 관리할 수 있습니다. API를 연동할 때 불필요한 코드가 줄고 일관성있게 상태를 관리할 수 있습니다. useInfiniteQuery를 활용해서 무한스크롤 구현이 단순해집니다.

#### Tailwindcss

정적 클래스 기반이라 실행 중에 불필요하게 계산되는 부분이 없고 미리 정의된 유틸리티 클래스를 조합해 일관된 스타일을 유지할 수 있습니다. 또한 개인적으로 사용하기 익숙하여 프로젝트 스타일링을 빠르게 적용하기 위해 선택했습니다.

#### Zustand

가볍고 직관적인 전역 상태 관리 라이브러리로 Redux 보다는 코드가 간단하고 Recoil 보다는 프로젝트 규모가 작은 경우에 더 적합합니다.
찜기능 같은 경우에 로컬스토리지를 통해 직접 구현할 경우는 매번 JSON.stringify, JSON.parse를 해줘야하고 키가 같으면 덮어 씌워지거나 하는 문제가 발생할 수 있습니다.
Zustand persist 같은 경우에는 이 과정을 자동으로 처리해주기 때문에 훨씬 안정적이고 구현이 간편합니다.

#### Vite

React 프로젝트를 간단한 명령어로 빠르게 세팅할 수 있어 초기 개발 효율성이 좋습니다.
또한, 가볍고 빠른 개발 환경을 제공해줍니다.

### 강조하고 싶은 기능

#### 도서 리스트 무한스크롤 적용

- 버튼 클릭 없이 부드럽게 사용자에게 정보를 제공할 수 있습니다.
- React Query가 페이지네이션/로딩 상태를 관리하므로 코드 단순합니다.
- 재사용 가능한 커스텀 훅(useInfiniteQueryScroll)으로 다른 리스트 API에도 쉽게 적용 가능합니다.

#### 검색어 저장

- zustand persist 사용으로 브라우저에서 안정적으로 데이터 저장이 가능합니다.

#### 검색 필터

- 정렬 조건을 추가하여 정확도순뿐만 아니라 발간일순 데이터도 제공합니다. 검색 시 사용자가 원하는 기준에 맞춘 정렬 기능도 중요하다고 생각되어 추가했습니다.
