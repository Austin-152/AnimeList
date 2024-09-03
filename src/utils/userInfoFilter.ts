// utils/filterClaims.ts

import type { IdTokenClaims } from '@logto/client';

interface FilteredClaims {
  [key: string]: any;
}

export function filterClaims(claims: IdTokenClaims | undefined): FilteredClaims {
  // 定义要删除的字段列表
  const fieldsToRemove = [
        'updated_at',
        'at_hash',
        'created_at',
        'aud',
        'iat',
        'iss',
  ];

  // 创建一个新的对象，拷贝所有未被删除的字段
  const filteredClaims: FilteredClaims = {};

  for (const [key, value] of Object.entries(claims)) {
    if (!fieldsToRemove.includes(key)) {
      filteredClaims[key] = value;
    }
  }

  return filteredClaims;
}
