import "./styles.css";
import Masonry from "./masonry";

function App() {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="App">
      <div className="App">
        <div class="gallery">
          {images.map((image, index) => (
            <div key={index} className="grid-item">
              <img
                src={`https://source.unsplash.com/collection/${index}`}
                alt="hekk"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
