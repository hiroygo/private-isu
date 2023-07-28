import { SharedArray } from "k6/data";

// SharedArray は k6 の初期化時に一度だけメモリに読み込まれ、各 VUs から読み取り専用に共有される配列オブジェクト
// VUs 間で共有する読み込み専用データを保持できる
const accounts = new SharedArray("accounts", function() {
    return JSON.parse(open("./accounts.json"));
});

export function getAccount() {
    return accounts[Math.floor(Math.random() * accounts.length)];
}
