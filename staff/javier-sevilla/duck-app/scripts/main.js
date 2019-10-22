var views = document.getElementsByClassName('view');
var userOptionsView = new View(views[0]);
var registerView = new View(views[1]);
var loginView = new View(views[2]);
var searchView = new View(views[3]);
var detailView = new View(views[4]);

var user = new User();
debugger
const landing = new Landing(document.getElementsByClassName('userOptions')[0])
landing.onRegistrer(() => {
    userOptionsView.hide()
    registerView.show()
})

landing.onLogin(() => {
    userOptionsView.hide()
    loginView.show()
})

var register = new Register(document.getElementsByClassName('register')[0]);
register.onSubmit((email, password, name, surname, age, gender) => {
    try {
        registerUser(email, password, name, surname, age, gender, (error, response) => {
            if (error) {
                feedback.render(error.message)
                feedback.show()
            } else {
                const { id } = response
                user.id = id
                user.email = email
                user.password = password
                user.name = name
                user.surname = surname
                user.age = age
                user.gender = gender

                loginUser(email, password, (error, response) => {
                    if (error) {
                        feedback.render(error.message)
                        feedback.show()
                    } else {
                        registerView.hide()
                        loginView.hide()
                        searchView.show()
                        feedback.hide()
                        const { id, token } = response
                        user.token = token

                    }
                });
            }
        });
    } catch (error){
        feedback.render(error.message)
        feedback.show()
    }
});


var login = new Login(document.getElementsByClassName('login')[0]);

login.onSubmit((email, password) => {
    loginUser(email, password, (error, response) => {
        if (error) {
            feedback.render(error.message)
            feedback.show()
        } else {
            retrieveUser(response.id, response.token, (error, response) => {
                if (error) {
                    feedback.render(error.message)
                    feedback.show()
                } else {
                    loginView.hide()
                    searchView.show()
                    feedback.hide()
                }
            })
        }
    })
});

login.onBack(() => {
    loginView.hide()
    userOptionsView.show()
});

(function () {
    searchDucks('', (error, ducks) => {
        if (error) {
            feedback.render(error.message);

            results.hide(); s
            feedback.show();
        } else {
            ducks = ducks.shuffle().splice(0, 3);

            results.render(ducks);
        }
    });
})();

var search = new Search(document.getElementsByClassName('search')[0]);
search.onSubmit(query => {
    searchDucks(query, (error, ducks) => {
        if (error) {
            feedback.render(error.message);

            results.hide();
            feedback.show();
        } else {
            results.render(ducks);

            feedback.hide();
            results.show();
        }
    });
});

var results = new Results(document.getElementsByClassName('results')[0]);
results.onItemRender = () => {
    var item = new ResultItem(document.createElement('li'));

    item.onClick = id => {
        retrieveDuck(id, (error, duck) => {
            if (error) {
                feedback.render(error.message);

                results.hide();
                feedback.show();
            } else {
                detail.render(duck);

                searchView.hide();
                detailView.show();
            }
        });
    };

    return item;
};

var detail = new Detail(document.getElementsByClassName('detail')[0]);
debugger

detail.onBack(() => {
    detailView.hide()
    searchView.show()
})

var feedback = new Feedback(document.getElementsByClassName('feedback')[0]);