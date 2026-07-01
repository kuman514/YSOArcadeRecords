'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitEvent } from 'react';

import FormInput from '^/src/shared/ui/form-input';
import SearchSvgRepoSvg from '^/public/icons/search-left-1504-svgrepo-com.svg';
import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';

export default function SearchBar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>('');
  const route = useRouter();

  function handleOnSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (searchText.trim().length === 0) {
      return false;
    }

    route.push(`/search?searchText=${searchText}`);
    return false;
  }

  return (
    <>
      <form method="get" className="hidden sm:flex" onSubmit={handleOnSubmit}>
        <FormInput
          name="searchText"
          type="text"
          placeholder="포스트 검색"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.currentTarget.value);
          }}
        />
      </form>
      {!isSearchExpanded && (
        <div className="flex sm:hidden w-full h-full flex flex-row justify-end items-center">
          <button
            type="button"
            className="w-16 h-16 flex flex-row justify-center items-center cursor-pointer sm:hidden"
            onClick={() => {
              setIsSearchExpanded(true);
            }}
          >
            <SearchSvgRepoSvg width="1.5rem" height="1.5rem" />
          </button>
        </div>
      )}
      {isSearchExpanded && (
        <form
          method="get"
          className="flex sm:hidden fixed top-0 left-0 w-full h-16 flex flex-row justify-center items-center bg-primary gap-2 z-51"
          onSubmit={handleOnSubmit}
        >
          <div className="flex flex-row justify-center items-center">
            <FormInput
              style={{
                width: '100%',
              }}
              name="searchText"
              type="text"
              placeholder="포스트 검색"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.currentTarget.value);
              }}
            />
          </div>
          <button
            type="button"
            className="h-16 flex flex-row justify-center items-center cursor-pointer"
            onClick={() => {
              setIsSearchExpanded(false);
            }}
          >
            <CloseSvgRepoComSvg width="2rem" height="2rem" />
          </button>
        </form>
      )}
    </>
  );
}
