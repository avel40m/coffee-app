
export const getAllCategory = async () => {
    const response = await fetch('http://localhost:4000/product/category/');
    const data = await response.json();
    return data;
}

export const addCategory = async (name) => {
    const token = JSON.parse(localStorage.getItem('token'));
    
    if (!token) new Error('No tiene el token');

    const response = await fetch('http://localhost:4000/product/category/',
    {
        method: 'POST',
        mode:'cors',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token.token}`
        },
        body: JSON.stringify({name:name})
    });
    const data = await response.json();
     return data;
}