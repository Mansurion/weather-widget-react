export const fetchWithTimeout = async (url, options = {}, timeoutMs = 5000) => {
  const { signal, ...restOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const combinedSignal = signal
    ? AbortSignal.any([controller.signal, signal])
    : controller.signal;

  try {
    return await fetch(url, { ...restOptions, signal: combinedSignal });
  } finally {
    clearTimeout(timeoutId);
  }
};