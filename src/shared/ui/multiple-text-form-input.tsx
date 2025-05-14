import FormInput from './form-input';
import { MultipleFormValue } from './types';

interface Props {
  name: string;
  values: MultipleFormValue<string>;
  mainLabel: string;
  appendButtonLabel: string;
  onChange: (index: number, newValue: string) => void;
  onAppend: () => void;
  onDelete: (index: number) => void;
}

export default function MultipleTextFormInput({
  name,
  values,
  mainLabel,
  appendButtonLabel,
  onChange,
  onAppend,
  onDelete,
}: Props) {
  return (
    <p className="w-full flex flex-col gap-2">
      <label htmlFor={name}>{mainLabel}</label>
      {values.map((value, index) => (
        <span key={value.id} className="flex flex-row gap-2">
          <FormInput
            type="text"
            id={name}
            name={name}
            value={value.value}
            onChange={(event) => {
              onChange(index, event.currentTarget.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              onDelete(index);
            }}
            className="cursor-pointer"
          >
            X
          </button>
        </span>
      ))}
      <button
        type="button"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer"
        onClick={onAppend}
      >
        {appendButtonLabel}
      </button>
    </p>
  );
}
