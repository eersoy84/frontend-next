export const responseChecker = {
    logout,
};

function logout() {
    localStorage.clear();
    // localStorage.removeItem('user');
    // localStorage.removeItem('state');
}
