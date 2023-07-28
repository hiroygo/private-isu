import http from "k6/http";
import { check } from "k6";
import { parseHTML } from "k6/html";
import { url } from "./config.js"; 

// 以下を実行している
// 1. `/login` に POST でログインする
// 2. ログイン成功後にユーザページ `/@{アカウント名}` を GET する
// 3. ユーザページのフォームからコメントを POST する(HTML フォームの hidden 要素として埋め込まれている csrf_token, post_id も送信する)
export default function() {
    // 1.
    const login_res = http.post(url("/login"), {
        account_name: "terra",
        password: "terraterra",
    });
    // k6 はサーバからのレスポンスがリダイレクトだった場合、追従する
    // このためリダイレクトが発生した場合 login_res にはリダイレクト先のレスポンスが入る。302 とかが入るわけではない
    check(login_res, {
        "is status 200": (r) => r.status === 200,
    });
    // check の結果は `k6 run` に出力される
    // 例: `checks.........................: 100.00% ✓ 3         ✗ 0`

    // 2.
    const userpage_res = http.get(url("/@terra"));
    check(userpage_res, {
        "is status 200": (r) => r.status === 200,
    });

    // 3.
    const doc = parseHTML(userpage_res.body);
    const post_id = doc.find("input[name='post_id']").first().attr("value");
    const token = doc.find("input[name='csrf_token']").first().attr("value");
    const comment_res = http.post(url("/comment"), {
        post_id: post_id,
        csrf_token: token,
        comment: "Hello k6!",
    });
    check(comment_res, {
        "is status 200": (r) => r.status === 200,
    });
}
