import { API } from "../utils/config";
export const Login = (mobileNumber) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Client-Service", "app-client");
    myHeaders.append("Auth-Key", "refitrepairapi");
    const formData = new FormData();
    formData.append("user_mobile", mobileNumber);
    fetch(API.LOGIN, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 200) {
            console.log(data);
            resolve(data);
          } else {
            reject(data);
          }
        });
      })
      .catch((error) => {
        reject({ status: 400, message: "Something went wrong!" });
      });
  });
};
