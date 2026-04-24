import { useEffect, useState } from "react";
import PopularityBar from "./PopularityBar";

function Track({track}) {

    const [popularity, setPopularity] = useState(0);
    const API_URL = 'http://127.0.0.1:5173';

    const getPopularity = async() => {
        const response = await fetch(
        `${API_URL}/spotify/track/${track.id}`,
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
            <td><PopularityBar popularity={popularity}/></td>
        </tr>
    )};


export default Track;