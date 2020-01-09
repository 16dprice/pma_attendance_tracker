import Cookies from 'js-cookie';

export default class PermChecker {

    constructor() {
        this.member = JSON.parse(Cookies.get('member') === undefined ? null : Cookies.get('member'));
    }

    isRole(role) {
        if(this.member === null) return false;
        return this.member.role === role || this.member.role === "developer";
    }

    isDev() {
        return this.isRole("developer");
    }

    isPres() {
        return this.isRole("president");
    }

    isVP() {
        return this.isRole("vice-president");
    }

    isFEO() {
        return this.isRole("feo");
    }

    isWarden() {
        return this.isRole("warden");
    }

    isTreasurer() {
        return this.isRole("treasurer");
    }

    // could just check for if the role is empty, but doing it this way in case I ever add more roles to the database
    isDefaultMember() {
        return !(
            this.isPres() ||
            this.isVP() ||
            this.isFEO() ||
            this.isWarden() ||
            this.isTreasurer()
        );
    }

}
