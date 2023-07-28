import http from "k6/http";
import { check } from "k6";
import { parseHTML } from "k6/html";
import { url } from "./config.js"; 

const testImage = open("testimage.jpg", "b");

export default function() {
    const login_res = http.post(url("/login"), {
        account_name: "terra",
        password: "terraterra",
    });
    check(login_res, {
        "is status 200": (r) => r.status === 200,
    });

    const userpage_res = http.get(url("/@terra"));
    check(userpage_res, {
        "is status 200": (r) => r.status === 200,
    });

    const doc = parseHTML(userpage_res.body);
    const token = doc.find("input[name='csrf_token']").first().attr("value");
    const post_res = http.post(url("/"), {
        file: http.file(testImage, "testImage.jpg", "image/jpeg"),
        body: "Posted by k6",
        csrf_token: token,
    });
    check(comment_res, {
        "is status 200": (r) => r.status === 200,
    });
}
