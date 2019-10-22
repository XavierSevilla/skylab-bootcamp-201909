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

Login.prototype.onBack = function (expression) {
    debugger
        const searchPage = this.container.getElementsByTagName('a')[0]
    
        searchPage.addEventListener('click', function (event) {
            event.preventDefault();
            expression();
        });
};