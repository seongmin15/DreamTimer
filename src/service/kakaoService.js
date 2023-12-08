const axios = require("axios");

class KakaoService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.ID = process.env.KAKAO_ID;
    this.SECRETE = process.env.KAKAO_CLIENT_SECRETE;
    this.redirect_URI = "https://i9c101.p.ssafy.io/callback/kakao"; // 배포용
    // this.redirect_URI = "http://localhost:3000/callback/kakao"; // 개발용
  }

  getAuthCodeURL() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.ID}&redirect_uri=${this.redirect_URI}&response_type=code`;
  }

  async getToken(code) {
    const params = {
      client_id: this.ID,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: this.redirect_URI,
    }; // 필수 parameter만 작성

    const { data } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }, // 헤더 설정
      }
    );

    console.log(data);

    const tokenData = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };

    return tokenData;
  }

  async getUserData(token) {
    const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log(data);
    const id = new String(data.id);

    const userData = {
      id: id.toString(),
      provider: "kakao",
    };

    return userData;
  }
}

module.exports = KakaoService;
