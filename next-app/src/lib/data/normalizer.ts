import { logger } from '../observability/logger';
import { z } from 'zod';

export function normalize<T>(schema: z.ZodType<T>, data: unknown, sourceName: string): T {
  try {
    return schema.parse(data);
  } catch (error) {
    logger.warn(`Schema validation failed for data from ${sourceName}`, { error, data });
    // Attempt graceful fallback/defaults if parsing fails or return empty array if it's supposed to be a list
    if (schema instanceof z.ZodArray) {
       return [] as any;
    }
    // As a strict system, throwing here guarantees schema drift protection
    throw new Error(`Invalid data shape from ${sourceName}`);
  }
}

export function normalizeList<T>(schema: z.ZodType<T>, dataList: unknown[], sourceName: string): T[] {
  if (!Array.isArray(dataList)) {
     logger.warn(`Expected array from ${sourceName}, got ${typeof dataList}`, { dataList });
     return [];
  }
  
  return dataList.map(item => {
    try {
      return schema.parse(item);
    } catch (e) {
      logger.error(`Skipping invalid item from ${sourceName}`, { item, error: e });
      return null;
    }
  }).filter(Boolean) as T[];
}
