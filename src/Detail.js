import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBucket, updateBucket } from "./redux/modules/bucket";
const Detail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);

  return (
    <div>
      <h1>{bucket_list[bucket_index].text}</h1>
      <button
        onClick={() => {
          dispatch(updateBucket(bucket_index));
        }}
      >
        완료하기
      </button>
      <button
        onClick={() => {
          dispatch(deleteBucket(bucket_index));
          navigate(-1);

          console.log("삭제 버튼을 눌렀어!");
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default Detail;
