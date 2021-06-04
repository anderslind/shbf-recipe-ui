class Delay {
    constructor(timeout) {
        this.last = 0;
        this.id = 0;
        this.timeout = timeout;
    }
    call(fn) {
        if (Date.now() < (this.last + this.timeout)) {
            clearTimeout(this.id);
        }
        this.id = setTimeout(fn, this.timeout);
        this.last = Date.now();
    }
}

export default Delay;