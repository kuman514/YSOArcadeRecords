import axios from 'axios';

import { HEALTH_API_ENDPOINT } from '^/src/entities/health/constants';
import { GetHealthApiResponse } from '^/src/entities/health/types';

export async function getHealth(): Promise<GetHealthApiResponse> {
  try {
    const response = await axios.get<GetHealthApiResponse>(
      HEALTH_API_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    );
    return response.data;
  } catch {
    return {
      status: 'closed',
      maintenanceMessage:
        '사이트 로딩 중 일시적인 에러가 발생하였습니다. 이후에도 지속적으로 문제 발생 시 아래 카카오톡 오픈채팅방으로 연락 부탁드립니다.',
    };
  }
}
