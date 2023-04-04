const accessToken = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token === null) {
        return null;
    }
    const response = await fetch('http://localhost:4000/users/access-token', {
                                headers: { 'authorization': 'Bearer ' + token.token },
                                });
    const jsonData = await response.json();
    return jsonData;
}

export const savedToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data)); 
}

export const recoverToken = () => {
    return JSON.parse(localStorage.getItem('token'));
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const recoverPermission = async () => {
    return await accessToken();
}