import "./styles.css";
// import Masonry from "./masonry";

function App() {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const imageUrl = [
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535431603_redux.bmp",
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535431751_redux.jpeg",
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535431823_redux.jpg",
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535431906_redux.pdf",
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535432021_redux.png",
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535432103_redux.svg",
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535432176_redux.tiff",
    "https://bucket-deploy-picturestory.s3.ap-northeast-2.amazonaws.com/kim%40gmail.com/1648535432273_redux.webp",
  ];

  return (
    <div className="App">
      <div class="gallery">
        {imageUrl.map((image, index) => (
          <div ket={index} className="grid-item">
            {console.log(image)}
            <img src={`${image}`} alt="hekk" />
          </div>
        ))}
      </div>
      ;
    </div>
  );
}

export default App;
