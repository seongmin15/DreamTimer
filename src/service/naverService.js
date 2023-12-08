const axios = require("axios");

class NaverService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.ID = process.env.NAVER_ID;
    this.SECRETE = process.env.NAVER_CLIENT_SECRETE;
    this.redirect_URI = "https://i9c101.p.ssafy.io/callback/naver"; // 배포용
    // this.redirect_URI = "http://localhost:3000/callback/naver"; // 개발용
  }

  getAuthCodeURL() {
    return `https://nid.naver.com/oauth2.0/authorize?client_id=${this.ID}&redirect_uri=${this.redirect_URI}&response_type=code`;
  }

  async getToken(code) {
    const params = {
      client_id: this.ID,
      client_secret: this.SECRETE,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: this.redirect_URI,
    }; // 필수 parameter만 작성

    const { data } = await axios.post(
      "https://nid.naver.com/oauth2.0/token",
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
    const { data } = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    const userData = {
      id: data.response.id,
      provider: "naver",
    };

    return userData;
  }
}

module.exports = NaverService;
