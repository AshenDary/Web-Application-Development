const base = import.meta.env?.VITE_API_URL || 'http://127.0.0.1:5055/api';
export async function api(path, options = {}) {
	const { signal, timeoutMs = 15000, headers, ...requestOptions } = options;
	const controller = new AbortController();
	const abort = () => controller.abort();
	if (signal?.aborted) abort();
	else signal?.addEventListener('abort', abort, { once: true });
	let timedOut = false;
	const timer = setTimeout(() => { timedOut = true; controller.abort(); }, timeoutMs);
	try {
		const response = await fetch(`${base}${path}`, {
			credentials: 'include', ...requestOptions,
			headers: { 'Content-Type': 'application/json', ...headers },
			signal: controller.signal,
		});
		const data = await response.json();
		if (!response.ok) throw new Error(data.message || 'Request failed');
		return data;
	} catch (error) {
		if (signal?.aborted) throw error;
		if (timedOut) throw new Error('The server took too long to respond. Please try again.');
		if (error instanceof TypeError) throw new Error('Unable to connect to the server. Please try again.');
		if (error instanceof SyntaxError) throw new Error('The server returned an invalid response. Please try again.');
		throw error;
	} finally {
		clearTimeout(timer);
		signal?.removeEventListener('abort', abort);
	}
}
export const activity = (action, metadata = {}) => api('/activity', { method: 'POST', body: JSON.stringify({ action, metadata, sessionId: sessionStorage.getItem('stashSession') || crypto.randomUUID() }) }).catch(() => {});
