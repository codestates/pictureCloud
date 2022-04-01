import "./styles.css";
import styled from "styled-components";
import CalendarModal from "./components/CalendarModal";

const DateBtn = styled.button`
  display: block;
  background-color: #ffffff;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 72px;
  height: 40px;
  position: absolute;
  top: 0%;
  left: 13%;
  color: #000;
  margin-top: 80px;
  font-size: 15px;
  & + & {
    margin-left: 75%;
  }
  /* border-radius: 30px; */
  cursor: grab;
`;


const axios = require("axios");
const { useState, useEffect } = require("react");

function App() {
  const [imageUrl, setImageUrl] = useState(null);

  const fetchUsers = async () => {
    const response = await axios
      .get("http://localhost:4000/render")
      .then((data) => {
        const url = data.data;
        setImageUrl(url);
      });
  };

  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };
  const onConfirm = () => {
    console.log("확인");
    setDialog(false);
  };
  const onCancel = () => {
    console.log("취소");
    setDialog(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!imageUrl) return null;

  return (
    <div className="App">
      <div>
        <DateBtn onClick={onClick}>전체기간</DateBtn>
      </div>
      <div class="gallery">
        {imageUrl.map((image, index) => (
          <div ket={index} className="grid-item">
            {console.log(image)}
            <img src={`${image}`} alt="hekk" />
          </div>
        ))}
      </div>
      <CalendarModal
        onConfirm={onConfirm}
        onCancel={onCancel}
        visible={dialog}
      />
      ;
    </div>
  );
}


export default App;
