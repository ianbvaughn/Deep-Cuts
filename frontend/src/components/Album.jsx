function Album({album, setSelectedAlbum}) {

    return (
        <tr onClick={() => {
            setSelectedAlbum(album);
        }}>
            <td>{album.name}</td>
            <td>{album.total_tracks}</td>
        </tr>
    );
}

export default Album;