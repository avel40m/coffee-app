export const addProduct = async (name,price,image,category) => {
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("image", image);
    formdata.append("category", category);


    const response = await fetch('http://localhost:4000/product/',{
        method: 'POST',
        body: formdata,
    })
    const data = await response.json();
    return data;
}

export const getAllProduct = async () => {
    const response = await fetch('http://localhost:4000/product/',{method: 'GET'});
    const data = await response.json();
    return data;
}