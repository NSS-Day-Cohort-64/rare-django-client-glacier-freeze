export const addSubscription = (subscription) => {
    return fetch("http://localhost:8000/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(subscription)
    })
}

export const getAllSubscriptions = () => {
    return fetch("http://localhost:8000/subscriptions"), {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
        .then(res => res.json())
}
}

export const deleteSubscription = (subscriptionId) => {
    return fetch(`http://localhost:8000/subscriptions/${subscriptionId}`, {
        method: "DELETE",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    })
}
