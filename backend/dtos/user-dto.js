module.exports = class UserDto {
    id;
    firstname;
    lastname;
    number;

    constructor(model) {
        this.id = model._id;
        this.firstname = model.firstname;
        this.lastname = model.lastname;
        this.number = model.number;
    }
}