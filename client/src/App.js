import "./styles.css";

const axios = require("axios");
const { useState, useEffect } = require("react");

function App() {
  const [imageUrl, setImageUrl] = useState(null);

  const fetchUsers = async () => {
    const response = await axios
      .get("http://ec2-54-180-146-245.ap-northeast-2.compute.amazonaws.com/render")
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
