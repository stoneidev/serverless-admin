import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GW_URL,
  // 필요한 경우 여기에 추가 설정을 넣을 수 있습니다.
  // 예: timeout, headers 등
});

// 필요한 경우 인터셉터를 추가할 수 있습니다.
// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 작업
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리
    return response;
  },
  (error) => {
    // 응답 에러 처리
    return Promise.reject(error);
  }
);

export default api;
