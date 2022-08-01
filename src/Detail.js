import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteBucket,
  deleteBucketFB,
  updateBucket,
  updateBucketFB,
} from "./redux/modules/bucket";
import Button from "@mui/material/Button";
const Detail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);

  return (
    <div>
      <h1>{bucket_list[bucket_index] ? bucket_list[bucket_index].text : ""}</h1>
      <Button
        variant="outlined"
        onClick={() => {
          // dispatch(updateBucket(bucket_index));
          dispatch(updateBucketFB(bucket_list[bucket_index].id));
        }}
      >
        완료하기
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          // dispatch(deleteBucket(bucket_index));
          dispatch(deleteBucketFB(bucket_list[bucket_index].id));
          navigate(-1);
        }}
      >
        삭제하기
      </Button>
    </div>
  );
};

export default Detail;
