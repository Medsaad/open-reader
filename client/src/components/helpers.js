

export function logoutIfUnauthorized(err) {
    if (err.response.status == 401) {
        localStorage.removeItem('token');
    }
}
