'use client';

import { useState } from 'react';

import FormInput from '^/src/shared/ui/form-input';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const route = useRouter();

  return (
    <form
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (searchText.trim().length === 0) {
          return false;
        }

        route.push(`/search?searchText=${searchText}`);
        return false;
      }}
    >
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
  );
}
