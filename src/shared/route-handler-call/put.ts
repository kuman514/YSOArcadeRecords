import {
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';
import { useState } from 'react';

export function useRouteHandlerPut() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function sendRequest<T extends object>(
    endpoint: string,
    body: FormData
  ) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await fetch(endpoint, {
        method: 'PUT',
        body,
      }).then((res) => res.json() as Promise<RouteHandlerCallResponse<T>>);

      switch (result.result) {
        case RouteHandlerCallResponseStatus.SUCCESS:
          setIsSuccess(true);
          break;
        case RouteHandlerCallResponseStatus.FAILED:
          setErrorMessage(result.error);
          break;
        default:
      }
    } catch {
      setErrorMessage('예기치 못한 문제가 발생하였습니다.');
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    isSuccess,
    errorMessage,
    sendRequest,
  };
}
