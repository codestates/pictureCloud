import "./styles.css";
// import Masonry from "./masonry";
const axios = require("axios");
const { useState, useEffect } = require("react");

function App() {
  // const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // const imageUrl = [
  //   "https://picsum.photos/id/237/200/300",
  //   "https://picsum.photos/id/231/200/300",
  //   "https://picsum.photos/id/232/200/300",
  //   "https://picsum.photos/id/233/200/300",
  //   "https://picsum.photos/id/234/200/300",
  //   "https://picsum.photos/id/235/200/300",
  // ];

  const [imageUrl, setImageUrl] = useState(null);

  const fetchUsers = async () => {
    const response = await axios
      .get("http://localhost:4000/render")
      .then((data) => {
        const url = data.data;
        setImageUrl(url);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!imageUrl) return null;

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
