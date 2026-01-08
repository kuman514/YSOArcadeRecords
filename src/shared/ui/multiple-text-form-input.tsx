import Button from './button';
import FormTextArea from './form-textarea';
import { MultipleFormValue } from './types';

interface Props {
  name: string;
  values: MultipleFormValue<string>;
  mainLabel: string;
  appendButtonLabel: string;
  onInput: (index: number, newValue: string) => void;
  onSwap: (index: number, targetIndex: number) => void;
  onAppend: () => void;
  onDelete: (index: number) => void;
}

export default function MultipleTextFormInput({
  name,
  values,
  mainLabel,
  appendButtonLabel,
  onInput,
  onSwap,
  onAppend,
  onDelete,
}: Props) {
  return (
    <p className="w-full flex flex-col gap-2">
      <label htmlFor={name}>{mainLabel}</label>
      {values.map((value, index) => (
        <span key={value.tmpId} className="flex flex-row gap-2">
          <FormTextArea
            type="text"
            id={name}
            name={name}
            value={value.value}
            onChange={(event) => {
              onInput(index, event.currentTarget.value);
            }}
          />
          <span className="flex flex-col gap-4 justify-center items-center">
            <button
              type="button"
              onClick={() => {
                onSwap(index, Math.max(index - 1, 0));
              }}
              disabled={index === 0}
              className="cursor-pointer disabled:cursor-auto disabled:opacity-0"
            >
              ⬆️
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete(index);
              }}
              className="cursor-pointer"
            >
              ❌
            </button>
            <button
              type="button"
              onClick={() => {
                onSwap(index, Math.min(index + 1, values.length - 1));
              }}
              disabled={index === values.length - 1}
              className="cursor-pointer disabled:cursor-auto disabled:opacity-0"
            >
              ⬇️
            </button>
          </span>
        </span>
      ))}
      <Button
        type="button"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer"
        onClick={onAppend}
      >
        {appendButtonLabel}
      </Button>
    </p>
  );
}
