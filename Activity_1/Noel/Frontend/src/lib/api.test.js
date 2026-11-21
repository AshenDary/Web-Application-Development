import assert from 'node:assert/strict';
import { test } from 'node:test';
import { api } from './api.js';

test('returns products and preserves request headers', async (t) => {
	t.mock.method(globalThis, 'fetch', async (url, options) => {
		assert.ok(url.endsWith('/products'));
		assert.equal(options.headers['Content-Type'], 'application/json');
		assert.equal(options.headers['X-Test'], 'yes');
		return Response.json({ products: [] });
	});
	assert.deepEqual(await api('/products', { headers: { 'X-Test': 'yes' } }), { products: [] });
});

test('reports an unavailable backend', async (t) => {
	t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('fetch failed'); });
	await assert.rejects(api('/products'), /Unable to connect to the server/);
});

test('preserves API error messages', async (t) => {
	t.mock.method(globalThis, 'fetch', async () => Response.json({ message: 'Service unavailable' }, { status: 503 }));
	await assert.rejects(api('/products'), /Service unavailable/);
});

test('rejects invalid JSON instead of returning empty data', async (t) => {
	t.mock.method(globalThis, 'fetch', async () => new Response('<html>Error</html>'));
	await assert.rejects(api('/products'), /invalid response/);
});

test('times out a stalled request', async (t) => {
	t.mock.method(globalThis, 'fetch', (url, { signal }) => new Promise((resolve, reject) => {
		signal.addEventListener('abort', () => reject(signal.reason), { once: true });
	}));
	await assert.rejects(api('/products', { timeoutMs: 10 }), /took too long/);
});

test('allows filter changes to cancel outdated requests', async (t) => {
	t.mock.method(globalThis, 'fetch', (url, { signal }) => new Promise((resolve, reject) => {
		signal.addEventListener('abort', () => reject(signal.reason), { once: true });
	}));
	const controller = new AbortController();
	const request = api('/products', { signal: controller.signal });
	controller.abort();
	await assert.rejects(request, { name: 'AbortError' });
});
