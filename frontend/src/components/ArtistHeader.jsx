function ArtistHeader({artist}) {

    return (
        <div className="infoHeader">
         {artist?.images?.[0]?.url && <img src={artist.images[0].url}></img>}
         <h2>{artist.name}</h2>
        </div>
    );
}

export default ArtistHeader;