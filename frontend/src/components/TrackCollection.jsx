import Track from './Track';

function TrackCollection({tracks}) {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Track Number</th>
                    <th>Popularity</th>
                </tr>
            </thead>
            <tbody>
               {tracks.map((track, i) => <Track track={track} key={i}/>)}
            </tbody>
        </table>
    );
}

export default TrackCollection;