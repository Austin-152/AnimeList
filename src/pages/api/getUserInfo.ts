  // import { logtoClient } from '@/lib/logto';
  // import type { NextApiRequest, NextApiResponse } from 'next';
  // import type { IdTokenClaims } from '@logto/client';
  // import {filterClaims,} from "@/utils/userInfoFilter";
  //
  // interface CacheData {
  //   data:  { data: IdTokenClaims | undefined; };
  //   timestamp: number;
  // }
  //
  // const cache: CacheData = {
  //     data: { data: undefined },
  //     timestamp: 0,
  // };
  //
  // const CACHE_DURATION = 5 * 60 * 1000; // 缓存持续时间，单位为毫秒（5分钟）
  //
  // export default logtoClient.withLogtoApiRoute((request: NextApiRequest, response: NextApiResponse) => {
  //   const now = Date.now();
  //
  //   // 检查缓存是否有效
  //   if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
  //     response.json(cache.data);
  //     console.log('Returning cached data');
  //     return;
  //   }
  //
  //   if (!request.user.isAuthenticated) {
  //     response.status(401).json({message: 'Unauthorized'});
  //     return;
  //   }
  //
  //   const responseData = {
  //     data: request.user.claims,
  //   };
  //
  //   // 更新缓存
  //   cache.data = responseData;
  //   cache.timestamp = now;
  //
  //
  //   // 创建一个新的对象，拷贝所有未被删除的字段
  //   const filteredClaims = filterClaims(request.user.claims);
  //   return response.json(filteredClaims);
  // }
  // );

  import { logtoClient } from '@/lib/logto';
import type { NextApiRequest, NextApiResponse } from 'next';
  import { filterClaims } from "@/utils/userInfoFilter";

export default logtoClient.withLogtoApiRoute((request: NextApiRequest, response: NextApiResponse) => {
  if (!request.user.isAuthenticated) {
    response.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const responseData = {
    data: request.user.claims,
  };

  // 过滤用户 claims
  const filteredClaims = filterClaims(responseData.data);
  return response.json(filteredClaims);
});

