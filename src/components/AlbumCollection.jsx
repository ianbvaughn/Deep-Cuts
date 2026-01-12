import Album from './Album';

function AlbumCollection({albums, setSelectedAlbum}) {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Tracks</th>
                </tr>
            </thead>
            <tbody>
               {albums.map((album, i) => <Album album={album} setSelectedAlbum={setSelectedAlbum} key={i}/>)}
            </tbody>
        </table>
    );
}

export default AlbumCollection;