const DeviceRepository = require('./repository/deviceRepository');
const UserRepository = require("./repository/userRepository");
const LogRepository = require("./repository/logRepository");
const GroupRepository = require('./repository/groupRepository');
const LogService = require('./service/logService');
const ComponentRepository = require('./repository/componentRepository')
const GoogleService = require('./service/googleService');
const JWTService = require('./service/jwtService');
const NaverService = require('./service/naverService');
const KakaoService = require('./service/kakaoService');
const SearchService = require('./service/searchService');
const MailVerifyService = require('./service/mailverifyService');
const SignupService = require('./service/signupService');
const UpdateService = require('./service/updateService');
const EncryptService = require('./service/encryptService');

class Global {
    static #deviceRepository = null;
    static #userRepository = null;
    static #logRepository = null;
    static #groupRepository = null;
    static #logService = null;
    static #componentRepository = null;
    static #googleService = null;
    static #jwtService = null;
    static #naverService = null;
    static #kakaoService = null;
    static #searchService = null;
    static #mailVerifyService = null;
    static #signupService = null;
    static #updateService = null;
    static #encryptService = null;

    static async getDeviceRepository(){
        if(!Global.#deviceRepository){
            Global.#deviceRepository = new DeviceRepository();
        }
        return Global.#deviceRepository;
    }
    static async getUserRepository(){
        if(!Global.#userRepository){
            Global.#userRepository = new UserRepository(await Global.getGroupRepository());
            await Global.#userRepository.init();
        }
        return Global.#userRepository;
    }
    static async getLogRepository(){
        if(!Global.#logRepository){
            Global.#logRepository = new LogRepository();
            await Global.#logRepository.init();
        }
        return Global.#logRepository;
    }
    static async getGroupRepository(){
        if(!Global.#groupRepository){
            Global.#groupRepository = new GroupRepository();
            await Global.#groupRepository.init();
        }
        return Global.#groupRepository;
    }
    static async getLogService(){
        if(!Global.#logService){
            Global.#logService = new LogService(await Global.getLogRepository());
        }
        return Global.#logService;
    }

    static async getComponentRepository() {
        if(!Global.#componentRepository) {
            Global.#componentRepository = new ComponentRepository();
            Global.#componentRepository.init();
        }
        return Global.#componentRepository;
    }

    static async getGroupRepository() {
        if(!Global.#groupRepository) {
            Global.#groupRepository = new GroupRepository();
            Global.#groupRepository.init();
        }
        return Global.#groupRepository;
    }
    static async getGoogleService(){
        if(!Global.#googleService){
            Global.#googleService = new GoogleService(await Global.getUserRepository());
        }
        return Global.#googleService;
    }

    static async getJwtService(){
        if(!Global.#jwtService){
            Global.#jwtService = new JWTService(await Global.getUserRepository());
        }
        return Global.#jwtService;
    }
    static async getNaverService(){
        if(!Global.#naverService){
            Global.#naverService = new NaverService(await Global.getUserRepository());
        }
        return Global.#naverService;
    }
    static async getKakaoService(){
        if(!Global.#kakaoService){
            Global.#kakaoService = new KakaoService(await Global.getUserRepository());
        }
        return Global.#kakaoService;
    }
    static async getSearchService(){
        if(!Global.#searchService){
            Global.#searchService = new SearchService(await Global.getUserRepository());
        }
        return Global.#searchService;
    }
    static async getMailVerifyService(){
        if(!Global.#mailVerifyService){
            Global.#mailVerifyService = new MailVerifyService(await Global.getUserRepository());
        }
        return Global.#mailVerifyService;
    }
    static async getSignupService(){
        if(!Global.#signupService){
            Global.#signupService = new SignupService(await Global.getUserRepository(), await Global.getEncryptService());
        }
        return Global.#signupService;
    }
    static async getUpdateService(){
        if(!Global.#updateService){
            Global.#updateService = new UpdateService(await Global.getUserRepository, await Global.getEncryptService());
        }
        return Global.#updateService;
    }
    static async getEncryptService(){
        if(!Global.#encryptService){
            Global.#encryptService = new EncryptService();
        }
        return Global.#encryptService;
    }
}

module.exports = Global;