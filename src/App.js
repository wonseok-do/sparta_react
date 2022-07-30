import React from "react";
// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import NotFound from "./NotFound";
import { useDispatch } from "react-redux";
import { createBucket } from "./redux/modules/bucket";
import Progress from "./Progress";
import { db } from "./firebase";
import { collection, getDoc, getDocs, addDoc } from "firebase/firestore";
function App() {
  const [list, setList] = React.useState([
    "영화관 가기",
    "매일 책읽기",
    "수영 배우기",
  ]);
  const text = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchData() {
      console.log(db);
      const query = await getDocs(collection(db, "bucket"));
      console.log(query);
      query.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
    }
    fetchData();
  }, []);

  const addBucketList = () => {
    // 스프레드 문법! 기억하고 계신가요? :)
    // 원본 배열 list에 새로운 요소를 추가해주었습니다.
    // setList([...list, text.current.value]);
    dispatch(createBucket({ text: text.current.value, completed: false }));
  };
  return (
    <div className="App">
      <Container>
        <Title>내 버킷리스트</Title>
        <Progress />
        <Line />
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <Routes>
          <Route path="/" element={<BucketList list={list} />} />
          <Route path="/detail/:index" element={<Detail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
      {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
      <Input>
        <input type="text" ref={text} />
        <button onClick={addBucketList}>추가하기</button>
      </Input>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        위로 가기
      </button>
    </div>
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  & > * {
    // &: 자신을 의미, *:자신안에 있는 모든속성 적용
    padding: 5px;
  }
  & input {
    border: 1px solid red;
    margin-right: 10px;
    width: 70%;
  }
  & input:focus {
    outline: none; // focus색상 적용하기위해 none적용
    border: 1px solid #a673ff;
  }
  & button {
    width: 25%;
    color: #fff;
    border: #a673ff;
    background: #a673ff;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default App;
