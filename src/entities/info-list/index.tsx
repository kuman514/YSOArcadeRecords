import Link from 'next/link';

import { InfoListItem } from './types';

interface Props {
  type: string;
  label: string;
  items: InfoListItem[];
}

/**
 * @desc
 * It was `<table>`. Why changed into `<div>`?
 * - Wrapping `<tr>` with `<a>` is inappropriate since `<table>` allows only `<tr>` as its direct descendents, according to W3C specification.
 * - It didn't need to be a table for data statistics like numeric analysis.
 */

export default function InfoList({ type, label, items }: Props) {
  const renderitemList =
    items?.map((item) => (
      <Link
        key={item.itemId}
        className="w-full px-4 py-2 retro-rounded-2 flex justify-center items-center hover:bg-hovering"
        href={`/editor/${type}/modify/${item.itemId}`}
      >
        {item.itemTitle}
      </Link>
    )) ?? null;

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{label}</h2>
      <Link
        className="w-full px-4 py-2 retro-rounded-2 flex justify-center items-center hover:bg-hovering"
        href={`/editor/${type}/create`}
      >
        새로 만들기
      </Link>
      {renderitemList}
    </section>
  );
}
