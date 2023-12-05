import "../css/movie.css";
export default function InteractiveImage({imageLink, childImages }) {
  return (
    <div className="card1">
      <div
        className="cover"
        style={{
          backgroundImage: `url(${imageLink})`,
        }}
      >
        <div className="topVeil">
          <div className="bottomVeil"></div>
        </div>
      </div>
      {/* <img className="character" src={movieContent[0].imageParagraphs[0].imageLink}/> */}
      {childImages.map((ci) => (
        <img
          className="character"
          src={ci.imageLink}
          style={{
            top: `${ci.topIndex}px`,
            left: `${ci.leftIndex}px`,
            width: `${ci.width}px`,
          }}
        />
      ))}
      
    </div>
  );
}
