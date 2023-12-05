// Render list các photos cung cấp từ data

const DetailPics = ({ photos = [] }) => {
  return (
    <div className="d-flex flex-wrap">
      {photos.map((photo, i) => {
        return (
          <div key={i} className="col-4 p-1">
            <img alt="img" className="img-fluid" src={photo}></img>
          </div>
        );
      })}
    </div>
  );
};
export default DetailPics;
