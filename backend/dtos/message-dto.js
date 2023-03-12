module.exports = class MessageDto {
    id;
    sender;
    text;

    constructor(model) {
        this.id = model._id;
        this.sender = model.sender;
        this.text = model.text;
    }
}