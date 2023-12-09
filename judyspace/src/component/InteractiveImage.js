import "../css/movie.css";
export default function InteractiveImage({
  imageLink = "https://i.ibb.co/PMG7SQD/image-15-removebg-preview-1.png",
  childImages,
}) {
  if (imageLink === "") {
    imageLink = "https://i.ibb.co/PMG7SQD/image-15-removebg-preview-1.png";
  }
  return (
    // <div className="card1">
    //   <div
    //     className="cover"
    //     style={{
    //       backgroundImage: `url(${imageLink})`,
    //     }}
    //   >
    //     <div className="topVeil">
    //       <div className="bottomVeil"></div>
    //     </div>
    //   </div>
    //   {/* <img className="character" src={movieContent[0].imageParagraphs[0].imageLink}/> */}
    //   {childImages.map((ci) => (
    //     <img
    //       className="character"
    //       src={ci.imageLink}
    //       style={{
    //         top: `${ci.topIndex}px`,
    //         left: `${ci.leftIndex}px`,
    //         width: `${ci.width}px`,
    //       }}
    //     />
    //   ))}
    // </div>
    <div className=" cover" key={imageLink}>
      <div className="card1">
        <div className="wrapper">
          <img src={imageLink} className="cover-image" />
        </div>
        {childImages.map((ci) => (
          <img src={ci.imageLink} className={ci.imageClass} />
        ))}
      </div>
    </div>
  );
}
