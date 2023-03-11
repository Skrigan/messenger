module.exports = {
    numberToFormat(number) {
        return number.replace(/[+\s()-]/g, '');
    }
}