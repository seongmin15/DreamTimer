const jwt = require("jsonwebtoken");
const Global = require("../global");

class jwtService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  #getAccessTokenByIdAndProvider(id, provider) {
    const accesstoken = jwt.sign(
      { user_id: id, provider: provider },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );
    return accesstoken;
  }

  #getAccessTokenByEmail(email) {
    const accesstoken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    return accesstoken;
  }

  #getRefreshToken() {
    const refreshtoken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return refreshtoken;
  }

  getTokens(id, provider) {
    const accessToken = this.#getAccessTokenByIdAndProvider(id, provider);
    const refreshToken = this.#getRefreshToken();

    return { accessToken, refreshToken };
  }

  getToken(email) {
    const accessToken = this.#getAccessTokenByEmail(email);
    return accessToken;
  }

  async refresh(token, id, provider) {
    try {
      const myToken = jwt.verify(token, process.env.JWT_SECRET);
      if (myToken == "jwt expired") {
        return { result: false, err: "jwt expired" };
      }

      const user = await this.userRepository.getUserByRefreshToken(token);
      if (user.id !== id || user.provider !== provider) {
        return { result: false, err: myToken };
      }

      const accessToken = this.#getAccessTokenByIdAndProvider(id, provider);
      return { result: true, accessToken: accessToken };
    } catch (err) {
      return { result: false, err: err };
    }
  }

  verify(token, email) {
    try {
      const myToken = jwt.verify(token, process.env.JWT_SECRET);
      if (myToken == "jwt expired") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = jwtService;
