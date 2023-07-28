import http from "k6/http";
import { sleep } from "k6";
import { url } from "./config.js"; 

const BASE_URL = "http://localhost";

export default function() {
    http.get(url("/initialize"), {
        timeout: "10s",
    });

    sleep(1);
}
