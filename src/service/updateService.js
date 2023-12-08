class UpdateService {
  constructor(userRepository, encryptService) {
    this.userRepository = userRepository;
    this.encryptService = encryptService;
  }
  async updatePw(id, password) {
    const userIdInfo = await this.userRepository.getUserById(id);
    if (!userIdInfo) {
      return false;
    }
    console.log(password);
    const salt = await this.encryptService.getSalt();
    const hashedPw = await this.encryptService.getHashedPassword(
      password,
      salt
    );
    this.userRepository.updateSalt(id, salt);
    this.userRepository.updatePw(id, hashedPw);
    return true;
  }
}

module.exports = UpdateService;
