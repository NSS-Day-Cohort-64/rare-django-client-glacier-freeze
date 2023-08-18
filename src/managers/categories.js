export const getCategories = () => {
    return fetch("http://localhost:8000/categories")
        .then(res => res.json())
}

export const postCategories = (newCategory) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newCategory)
    }).then(res => res.json())
}