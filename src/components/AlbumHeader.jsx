function AlbumHeader({album}) {

    return (
      <div className="hasBorder">
         <h3>{album.name}</h3>
      </div>
    );
}

export default AlbumHeader;