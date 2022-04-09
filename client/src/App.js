import { useEffect, useState } from "react";
import "./styles.css";
import styled from "styled-components";
import logo from "./image/logo.png";
import axios from "axios";
import Loader from "./Loader";

const SidebarTxt = styled.div`
  top: 80px;
  color: #2e2e2e;
  font-size: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-top: solid black 1px;
  text-align: center;
`;
const Sidebar = styled.div`
  float: left;
  padding-top: 80px;
  padding-left: 80px;
  position: sticky;
  top: 8px;
  right: 300px;
`;
const SidebarLogo = styled.div`
  padding-bottom: 80px;
`;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([]);
  const [page, setPage] = useState(1);
  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [uploadImage, setUploadImage] = useState(0);

  const getInfo = async () => {
    await axios.get(`https://server.picturecloud.shop/info`).then((res) => {
      let image = res.data.image;
      setUploadImage(image.length);
      let email = res.data.email;
      setUserEmail(email[0]);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => { }, [itemLists]);

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { data } = await axios.get(
      `https://server.picturecloud.shop/render/list?page=${page}`
    );
    setItemLists((itemLists) => itemLists.concat(data.image));
    setIsLoaded(false);
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    getMoreItem();
  }, [page]);

  useEffect(() => {
    let observer;
    if (lastIntersectingImage) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(lastIntersectingImage);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingImage]);

  return (
    <div className="App">
      <Sidebar>
        <SidebarLogo>
          <img src={`${logo}`} alt="PICTURE-CLOUD"></img>
        </SidebarLogo>
        <SidebarTxt>{userEmail}</SidebarTxt>
        <SidebarTxt>image : {uploadImage}</SidebarTxt>
        <SidebarTxt />
      </Sidebar>
      <div className="gallery">
        {itemLists.map((image, index) => (
          <div key={index} className="grid-item">
            <img src={`${image}`} ref={setLastIntersectingImage} alt="img" />
          </div>
        ))}
      </div>
      <div className="Target-Element">{isLoaded && <Loader />}</div>
    </div>
  );
}

export default App;
