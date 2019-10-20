function Login(container) {
    Component.call(this, container);
}

Login.extend(Component);

Login.prototype.onSubmit = function (expression) {
    this.container.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = this.userid.value;
        var psw = this.psw.value;

        expression(email,psw);
           
    });
};