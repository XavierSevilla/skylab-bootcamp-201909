function Landing(container) {
    Component.call(this, container);
}

Landing.extend(Component);

Landing.prototype.onLogin = function (expression) {
debugger
    const loginPage = this.container.getElementsByTagName('a')[0]

    loginPage.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    })
}

Landing.prototype.onRegistrer = function (expression) {
    debugger
        const registerPage = this.container.getElementsByTagName('a')[1]
    
        registerPage.addEventListener('click', function (event) {
            event.preventDefault();
            expression();
        })
    }