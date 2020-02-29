

export function logoutIfUnauthorized(err, obj) {
    if (err.response.status == 401) {
        localStorage.removeItem('token');
        obj.setState({authorizedUser: false})
    }
}
