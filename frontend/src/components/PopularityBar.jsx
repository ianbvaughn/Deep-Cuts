function PopularityBar(
   {popularity}) {

    return (
      <svg
         width='100%'
         height='10px'
      >
         <rect
            className="popularityRect" 
            width={popularity + '%'}
            height='10px'
            rx="5"
         />
      </svg>
             
    )};


export default PopularityBar;