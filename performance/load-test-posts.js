import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 200 },
    { duration: "3m", target: 200 },
    { duration: "1m", target: 0 },
  ],
};

export default () => {
  http.get("http://localhost:3000/posts");
  sleep(1);
};
