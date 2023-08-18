export const getUsers = () => {
    return fetch("http://localhost:8000/users")
        .then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8000/users/${id}`)
        .then(res => res.json())
}