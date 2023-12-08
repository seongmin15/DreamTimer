const axios = require("axios");

class GoogleService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.ID = process.env.GOOGLE_ID;
    this.SECRETE = process.env.GOOGLE_CLIENT_SECRETE;
    this.redirect_URI = "https://i9c101.p.ssafy.io/callback/google"; // 배포용
    // this.redirect_URI = "http://localhost:3000/callback/google"; // 개발용
    this.SCOPE = "https://www.googleapis.com/auth/userinfo.email";
    this.prompt = "select_account";
  }

  getAuthCodeURL() {
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.ID}&redirect_uri=${this.redirect_URI}&scope=${this.SCOPE}&prompt=${this.prompt}&response_type=code`;
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
      "https://oauth2.googleapis.com/token",
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
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data);
    const id = new String(data.id);

    const userData = {
      id: id.toString(),
      provider: "google",
    };

    return userData;
  }
}

module.exports = GoogleService;
