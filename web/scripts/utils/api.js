import { getSession } from './session.js';

const fetch = async (url, method, data) => {
  const headers = new Headers();

  const session = getSession();
  if (session) {
    headers.append('Authorization', `Bearer ${session.token}`);
  }

  let body;
  if (data) {
    headers.append('Content-Type', 'application/json');
    body = JSON.stringify(data);
  }

  const response = await window.fetch(url, {
    method,
    headers,
    body,
  });
  if (!response.ok) {
    return { error: { status: response.status } };
  }

  return { data: await response.json() };
};

export const get = url => fetch(url, 'GET');

export const post = (url, data) => fetch(url, 'POST', data);
