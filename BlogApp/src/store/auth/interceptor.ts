import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

const user:any = JSON.parse(`${localStorage.getItem("user")}`)
instance.interceptors.request.use(
  (config:any) => {
    console.log(config, "CONFIG", user)

    if (user) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["authorization"] = user.token; // for Node.js Express back-end
    }
    // localStorage.setItem("user", JSON.stringify(config))
    return config;
  },
  (error) => {
    // localStorage.removeItem("user")
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (res) => {
    console.log(res.data, 'RES')
    localStorage.setItem("user", JSON.stringify(res.data))
    let data = await axios.get(`http://localhost:8080/users/${res.data.user._id}`, {
      headers: {authorization : res.data.token}
    })
    
    return data;
  },
  async  (err) => {
    const originalConfig = err.config;
    console.log(err, "ERR")
    // localStorage.removeItem("user")
    // if (originalConfig.url !== "/auth/signin" && err.response) {
    //   // Access Token was expired
    //   if (err.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;

    //     try {
    //       const rs = await instance.post("/auth/refreshtoken", {
    //         refreshToken: user.refreshToken
    //       });

    //       const { accessToken } = rs.data;
    //       TokenService.updateLocalAccessToken(accessToken);

    //       return instance(originalConfig);
    //     } catch (_error) {
    //       return Promise.reject(_error);
    //     }
    //   }
    // }

    return Promise.reject(err);
  }
);

export default instance;