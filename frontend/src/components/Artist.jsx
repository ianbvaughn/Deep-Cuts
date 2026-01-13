function Artist({artist, setSelectedArtist}) {

    return (
        <tr onClick={() => {
            setSelectedArtist(artist);
        }}>
            <td>{artist.name}</td>
            <td>{artist.popularity}</td>
            <td>{artist.followers.total}</td>
        </tr>
    );
}

export default Artist;