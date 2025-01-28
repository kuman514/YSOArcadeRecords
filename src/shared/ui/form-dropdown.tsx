import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export default function FormDropdown(props: Props) {
  {
    /**
     * @todo
     * Complete either of 2 tasks below
     * - Style selection exactly like other form inputs
     * - Implement dropdown on your own
     */
  }
  return (
    <select
      {...props}
      className="w-full px-4 py-2 border border-primary rounded"
    />
  );
}
