import { request } from "./utils/http";
import { axios } from "@savage181855/mini-axios";

request<{ name: string }>({
  url: "address",
  // method: 'get',
  // url: "users/login",
  // method: 'post',
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

App<IAppOption>({
  globalData: {},
});
