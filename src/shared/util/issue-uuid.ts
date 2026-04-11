import axios from 'axios';
import { toast } from 'react-toastify';

import {
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';

export async function issueUuid() {
  try {
    const response =
      await axios.get<RouteHandlerCallResponse<{ uuid: string }>>(
        '/api/issue-uuid'
      );
    if (response.data.result === RouteHandlerCallResponseStatus.FAILED) {
      toast(response.data.error, {
        type: 'error',
      });
      return null;
    }
    return response.data.uuid;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const newErrorMessage =
        error.response?.data.error ??
        '새로운 포스트 ID 발급에 실패했습니다. 다시 시도해 주십시오.';
      toast(newErrorMessage, {
        type: 'error',
      });
    } else {
      toast('새로운 포스트 ID 발급에 실패했습니다. 다시 시도해 주십시오.', {
        type: 'error',
      });
    }
    return null;
  }
}
