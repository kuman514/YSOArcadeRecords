import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import FormInput from '^/src/shared/ui/form-input';

import { InfoEditorActionState } from './types';

interface Props {
  editorLabel: string;
  items: {
    itemId: string;
    itemTitle: string;
  }[];
  idLabel: string;
  titleLabel: string;
  idName: string;
  titleName: string;
  refetch: () => void;
  createItemAction: (
    _: InfoEditorActionState,
    formData: FormData
  ) => Promise<InfoEditorActionState>;
  deleteItemAction: (
    _: InfoEditorActionState,
    formData: FormData
  ) => Promise<InfoEditorActionState>;
}

export default function InfoEditor({
  editorLabel,
  items,
  idLabel,
  titleLabel,
  idName,
  titleName,
  refetch,
  createItemAction,
  deleteItemAction,
}: Props) {
  const itemIdRef = useRef<HTMLInputElement>(null);
  const itemTitleRef = useRef<HTMLInputElement>(null);

  const [createState, createFormAction, isCreateLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(createItemAction, {});

  const [deleteState, deleteFormAction, isDeleteLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(deleteItemAction, {});

  useEffect(() => {
    if (!isCreateLoading && createState.isSuccess) {
      refetch();
    }
  }, [isCreateLoading, createState.isSuccess, refetch]);

  useEffect(() => {
    if (!isCreateLoading && createState.errorMessage) {
      toast(createState.errorMessage, { type: 'error' });
    }
  }, [isCreateLoading, createState.errorMessage]);

  useEffect(() => {
    if (!isDeleteLoading && deleteState.isSuccess) {
      refetch();
    }
  }, [isDeleteLoading, deleteState.isSuccess, refetch]);

  useEffect(() => {
    if (!isDeleteLoading && deleteState.errorMessage) {
      toast(deleteState.errorMessage, { type: 'error' });
    }
  }, [isDeleteLoading, deleteState.errorMessage]);

  function reset() {
    if (itemIdRef.current) {
      itemIdRef.current.value = '';
    }
    if (itemTitleRef.current) {
      itemTitleRef.current.value = '';
    }
  }

  const renderitemList =
    items?.map((item) => (
      <tr key={item.itemId}>
        <td>
          <form action={deleteFormAction}>
            <input name={idName} type="hidden" value={item.itemId} />
            <button type="submit" className="cursor-pointer">
              X
            </button>
          </form>
        </td>
        <td>{item.itemId}</td>
        <td>{item.itemTitle}</td>
      </tr>
    )) ?? null;

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{editorLabel}</h2>
      <table className="w-full h-48 border border-primary overflow-y-auto block border-separate border-spacing-x-2">
        <thead className="w-full sticky top-0 left-0 bg-background">
          <tr>
            <th></th>
            <th>{idLabel}</th>
            <th>{titleLabel}</th>
          </tr>
        </thead>
        <tbody>{renderitemList}</tbody>
      </table>
      <form
        action={createFormAction}
        className="w-full flex flex-col md:flex-row gap-2"
      >
        <div className="w-full flex flex-row gap-2">
          <FormInput
            ref={itemIdRef}
            type="text"
            name={idName}
            placeholder={idLabel}
          />
          <FormInput
            ref={itemTitleRef}
            type="text"
            name={titleName}
            placeholder={titleLabel}
          />
        </div>
        <div className="w-full flex flex-row-reverse md:flex-row gap-2">
          <button
            disabled={isCreateLoading}
            type="submit"
            className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
          >
            등록
          </button>
          <button
            disabled={isCreateLoading}
            onClick={reset}
            type="button"
            className="w-full p-4 bg-yellow-500 hover:bg-yellow-300 text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
          >
            지우기
          </button>
        </div>
      </form>
    </section>
  );
}
