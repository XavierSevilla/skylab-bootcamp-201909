function User(id, token) {
    this.id = id;
    this.token = token;
}

Object.defineProperty(User.prototype, 'id', {
    get: function() {
        return this._id_;
    }
});

Object.defineProperty(User.prototype, 'token', {
    get: function() {
        return this._token_;
    }
});

User.prototype.onSubmit = undefined;
