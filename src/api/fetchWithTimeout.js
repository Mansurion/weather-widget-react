export const fetchWithTimeout = async (url, options = {}, timeoutMs = 5000) => {
  const { signal, ...restOptions } = options;
  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    return await fetch(url, { ...restOptions, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};
