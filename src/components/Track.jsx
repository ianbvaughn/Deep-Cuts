import { useEffect, useState } from "react";

function Track({track}) {

    const [popularity, setPopularity] = useState(0);

    const getPopularity = async() => {
        const response = await fetch(
        `/spotify/track/${track.id}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
    );

    const data = await response.json();
    setPopularity(data.popularity);

    };

    useEffect( () => {
        getPopularity();
    }, [popularity]);

    return (
        <tr>
            <td>{track.name}</td>
            <td>{track.track_number}</td>
            <td>{popularity}</td>
        </tr>
    )};


export default Track;