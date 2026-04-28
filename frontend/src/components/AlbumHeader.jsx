function AlbumHeader({album}) {

    return (
      <div className="infoHeader album">
         {album?.images?.[0]?.url && <img src={album.images[0].url}></img>}
         <h3>{album.name}</h3>
      </div>
    );
}

export default AlbumHeader;