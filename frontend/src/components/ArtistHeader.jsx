function ArtistHeader({artist}) {

    return (
        <div className="hasBorder">
         <h1>{artist.name}</h1>
        </div>
    );
}

export default ArtistHeader;