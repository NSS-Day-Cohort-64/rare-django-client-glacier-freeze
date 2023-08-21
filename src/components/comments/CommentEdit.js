import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGames } from "../../managers/GameManager";

export const EditComment = () => {
    const [newComment, setComment] = useState({
        post: 0,
        author: 0,
        content: ""
    });

    const { commentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/comments/${parseInt(commentId)}`, {

            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`

            }
        })
            .then(response => response.json())
            .then(data => {
                setComment(data); // Use setGame to update the state
            });
    }, []);

    const changeCommentState = (domEvent) => {

        const updatedComment = Object.assign({}, newComment)
        updatedComment[domEvent.target.name] = domEvent.target.value
        setComment(updatedEvent)

    }

    return (
        <form className="EventForm">
            <h2 className="eventForm__title">Amend Board Game Night</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        selected={newEvent.date}
                        onChange={changeEventState}
                    />
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select
                        value={newEvent.game}
                        name="game"
                        onChange={changeEventState}
                    >
                        <option value="0"> Select Your Type</option>
                        {games.map((game) => (
                            <option
                                key={`type--${game.id}`}
                                value={game.id}
                            >
                                {game.title}
                            </option>

                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newestEvent = {
                        game: parseInt(newEvent.game),
                        date: newEvent.date

                    }

                    fetch(`http://localhost:8000/events/${eventId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${localStorage.getItem("lu_token")}`
                        },
                        body: JSON.stringify(newestEvent)
                    })
                        .then(() => navigate("/events"));
                }}
                className="btn btn-primary"
            >
                Save Edits
            </button>
        </form>
    );
};
