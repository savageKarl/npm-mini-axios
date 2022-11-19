import { request } from "./utils/http";
import { axios } from "@savage181855/mini-axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.header = {
  authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsInVzZXJfbmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2ODg1ODkwOCwiZXhwIjoxNjY4OTQ1MzA4fQ.9bO04HjlbELp4AYaSxP3_q7PcjuUkclP8NWHIB-pvX4",
};
Promise.resolve('name').then(res => console.log(res))

const p = axios({
  url: "address",
  method: 'get',
  // url: "users/login",
  // method: "post",
  // data: {
  //   user_name: "admin",
  //   password: "123456",
  // },
  // url: 'carts',
  // params: {
  //   pageNum: 1,
  //   pageSize: 2,
  // }
})
  .then((res) => {
    console.debug(res);
  })
  .catch((err) => {
    console.error(err);
  });

  console.debug(typeof p);
  const a = axios({
    url: "users/login",
    method: "post",
    data: {
      user_name: "admin",
      password: "123456",
    },
  })  .then((res) => {
    console.debug(res);
  })

  // console.debug(a)


// axios
//   .all([
//     axios({
//       url: "users/login",
//       method: "post",
//       data: {
//         user_name: "admin",
//         password: "123456",
//       },
//     }),
//     axios({
//       url: "address",
//       method: "get",
//     }),
//   ])
//   .then((res) => {
//     console.debug(res);
//   });

App<IAppOption>({
  globalData: {},
});
