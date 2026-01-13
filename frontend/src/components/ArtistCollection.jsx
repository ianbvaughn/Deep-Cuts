import Artist from './Artist';

function ArtistCollection({artists, setSelectedArtist}) {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Popularity</th>
                    <th>Followers</th>               
                </tr>
            </thead>
            <tbody>
               {artists.map((artist, i) => <Artist artist={artist} setSelectedArtist={setSelectedArtist} key={i}/>)}
            </tbody>
        </table>
    );
}

export default ArtistCollection;