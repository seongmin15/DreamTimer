class LoginDto {
  constructor(status) {
    this.status = status;
  }
  get get_status() {
    return this.status;
  }
}

module.exports = LoginDto;
