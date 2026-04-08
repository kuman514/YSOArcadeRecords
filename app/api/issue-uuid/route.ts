import { NextResponse } from 'next/server';
import { v7 as uuidv7 } from 'uuid';

import { createServerSideClient } from '^/src/shared/supabase/server';

export async function POST() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '로그인이 필요합니다.',
      },
      { status: 401 }
    );
  }

  try {
    const newUuid = uuidv7();
    return NextResponse.json(
      { result: 'success', uuid: newUuid },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        result: 'failed',
        error: `서버에서 에러가 발생했습니다. (${error})`,
      },
      { status: 502 }
    );
  }
}
