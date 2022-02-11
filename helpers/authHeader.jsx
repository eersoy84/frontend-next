import { getSession } from 'next-auth/react'
export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}

export function authHeaderContentType() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'multipart/form-data',
    };
  }
  return {};
}

export async function authHeaderWithSecret(req = null) {
  let session;
  if (typeof window !== 'undefined') {
    session = await getSession();
  } else {
    session = await getSession(req)
  }
  const token = session?.accessToken
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };
  }
  return {}
}

export function confirmAuthHeaderWithSecret(token) {
  if (token) {
    return {
      Authorization: `MTToken ${token}`,
      'content-type': 'application/json',
    };
  }
  return {};
}
