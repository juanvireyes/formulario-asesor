import { Client } from "./client.js";

const client = new Client();

export function getTipificacions() {
  const body = new FormData();
  const url = "https://cariai.com/colsanitasdevelop/process";

  body.append("operation", "tagsWebView");
  body.append("user", "KbYe*7fB455R");

  const res = client.postFormData(url, body);

  return res;
}
