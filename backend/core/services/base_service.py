from django.core.cache import cache
import logging

logger = logging.getLogger(__name__)

class BaseService:
    """
    Base class for all business services.
    Handles caching logic and consistent data retrieval patterns.
    """
    DEFAULT_CACHE_TIMEOUT = 60 * 15  # 15 minutes

    def get_cached(self, key, fetch_func, timeout=None):
        """
        Cache-aside pattern: check cache -> fallback to fetch function -> update cache.
        """
        data = cache.get(key)
        if data is not None:
            logger.debug(f"Cache HIT for key: {key}")
            return data
        
        logger.debug(f"Cache MISS for key: {key}")
        data = fetch_func()
        cache.set(key, data, timeout or self.DEFAULT_CACHE_TIMEOUT)
        return data

    def invalidate_cache(self, key):
        """
        Invalidates a specific cache key.
        """
        cache.delete(key)
        logger.debug(f"Cache INVALIDATED for key: {key}")
