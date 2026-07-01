'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import FormInput from '^/src/shared/ui/form-input';

export default function SecondarySearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const route = useRouter();

  return (

  );
}
