import UnorderedList from '^/src/shared/unordered-list';

interface Props {
  title: string;
  items: string[];
}

export default function UnorderedReviewItemList({ title, items }: Props) {
  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <UnorderedList>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </UnorderedList>
    </section>
  );
}
