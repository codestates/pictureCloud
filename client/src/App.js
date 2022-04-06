import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import styled from "styled-components";
import logo from "./image/logo.png";
import axios from "axios";
import Loader from "./Loader";

// css
// padding 순서 -> 상 우 하 좌 시계방향
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
  position: relative;
`;
const SidebarLogo = styled.div`
  padding-bottom: 80px;
`;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([]);
  const [page, setPage] = useState(1);
  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);

  useEffect(() => {
    console.log("itemLists", itemLists);
  }, [itemLists]);

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { data } = await axios.get(
      `http://localhost:4000/render/list?page=${page}`
    );
    setItemLists((itemLists) => itemLists.concat(data));
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
    console.log("page", page);
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

        <SidebarTxt>snow2271@gmail.com</SidebarTxt>

        <SidebarTxt>현재 업로드한 이미지 수: 16</SidebarTxt>

        <SidebarTxt>기능 1</SidebarTxt>

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
