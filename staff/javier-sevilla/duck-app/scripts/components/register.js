function Register(container) {
    Component.call(this, container);
}

Register.extend(Component);

Register.prototype.onSubmit = function (expression) {
    this.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var email = this.userid.value
        var psw = this.psw.value
        var name = this.name.value
        var surname = this.surname.value
        var age = this.age.value
        var gender = this.gender.value
        expression(email,psw,name,surname,age,gender)
                      
    })
}

Register.prototype.onBack = function (expression) {
    this.container.addEventListener('submit', function (event) {
        event.preventDefault()

        var email = this.userid.value
        var psw = this.psw.value
        var name = this.name.value
        var surname = this.surname.value
        var age = this.age.value
        var gender = this.gender.value
        expression(email,psw,name,surname,age,gender)
                      
    })
}