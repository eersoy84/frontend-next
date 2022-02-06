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

export function authHeaderWithSecret() {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };
  }
  return {};
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
