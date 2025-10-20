import axios from 'axios';

import { HEALTH_API_ENDPOINT } from '^/src/entities/health/constants';
import { GetHealthApiResponse } from '^/src/entities/health/types';

export async function getHealth() {
  try {
    const response = await axios.get<GetHealthApiResponse>(
      HEALTH_API_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    );
    console.log(response.data);
    return response.data.status;
  } catch (error) {
    console.error(error);
    return 'closed';
  }
}
