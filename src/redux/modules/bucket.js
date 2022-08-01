// bucket.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
// Actions
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";
const LOADED = "bucket/LOADED";

const initialState = {
  is_loaded: false,
  list: [
    { text: "영화관 가기", completed: false },
    { text: "매일 책읽기", completed: false },
    { text: "수영 배우기", completed: false },
  ],
  // list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
};

// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}
export function createBucket(bucket) {
  return { type: CREATE, bucket };
}
export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}
export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}
export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

// middlewares
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));
    console.log(bucket_data);

    let bucket_list = [];
    bucket_data.forEach((bucket) => {
      console.log(bucket.data());
      bucket_list.push({ id: bucket.id, ...bucket.data() });
    });
    console.log(bucket_list);
    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketListFB = (bucket) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    // const _bucket = await getDoc(docRef); // 1번째 방법
    // const bucket_data = { id: _bucket.id, ..._bucket.data() };
    // console.log(bucket_data);
    const bucket_data = { id: docRef.id, ...bucket }; // 2번째 방법
    dispatch(createBucket(bucket_data));
  };
};
export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, { completed: true });
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(updateBucket(bucket_index));
  };
};

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(deleteBucket(bucket_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list, is_loaded: true };
    }
    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list, is_loaded: true };
    }

    case "bucket/UPDATE": {
      const new_bucket_list = state.list.map((l, idx) => {
        if (parseInt(action.bucket_index) === idx) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      console.log({ list: new_bucket_list });
      return { ...state, list: new_bucket_list };
    }

    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { ...state, list: new_bucket_list };
    }
    case "bucket/LOADED": {
      return { ...state, is_loaded: action.loaded };
    }
    default:
      return state;
  }
}
