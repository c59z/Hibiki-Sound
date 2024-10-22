import {
  getClientAuthentication,
  setClientAuthentication,
  removeClientAuthentication,
} from "../utils/token";
import { makeAutoObservable } from "mobx";

// 应用端 ID
const clientId = "b26f18ec2bb0452092307e125e1aec37";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

// 重定向到 Spotify authorization page
async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append(
    "scope",
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// 生成认证码
function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// 获取访问密钥
async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

// 测试API
// async function fetchProfile(token) {
//   const result = await fetch(
//     "https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20",
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return await result.json();
// }

class AuthenticationStore {
  authenticationToken = getClientAuthentication() || "";
  constructor() {
    makeAutoObservable(this);
  }

  getAuthentication = async () => {
    if (
      this.authenticationToken === "" ||
      this.authenticationToken === undefined
    ) {
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        console.log(accessToken);
        if (
          accessToken !== undefined &&
          accessToken !== null &&
          accessToken !== ""
        ) {
          setClientAuthentication(accessToken);
        }
        //   const profile1 = await fetchProfile(accessToken);
        //   const profile2 = await fetchProfile(accessToken);
        //   console.log(profile1);
        //   console.log(profile2);
      }
    } else {
      console.log("客户端密钥已存在");
      // console.log(this.authenticationToken);
    }
  };
}

export default AuthenticationStore;
