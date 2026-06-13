export class VerificationStatusVO {
    constructor(value) {
        this.value = value;
    }
    static pending() {
        return new VerificationStatusVO('pending');
    }
    static processing() {
        return new VerificationStatusVO('processing');
    }
    static completed() {
        return new VerificationStatusVO('completed');
    }
    static failed() {
        return new VerificationStatusVO('failed');
    }
    static from(status) {
        return new VerificationStatusVO(status);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
