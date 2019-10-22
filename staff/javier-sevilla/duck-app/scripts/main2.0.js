var views = document.getElementsByClassName('view');
var userOptions = new View(views[0]);
var registerView = new View(views[1]);
var loginView = new View(views[2]);
var searchView = new View(views[3]);
var detailView = new View(views[4]);



// var userOptions = document.getElementsByClassName("userOptions__login")[0];debugger;
// var userOptions = document.createElement('a');
// item.classList.add('userOptions__login');
// item.addEventListener('click', event=>{
// }
var user = new User();

var register = new Register(document.getElementsByClassName('register')[0]);
register.onSubmit((email, password, name, surname, age, gender) => {
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
});


var login =new Login(document.getElementsByClassName('login')[0]);
login.onSubmit((email,password)=> {
    loginUser(email, password, (error, response)=>  {
        if (error) {
            feedback.render(error.message)
            feedback.show()
        } else {
            loginView.hide()
            searchView.show()
            feedback.hide()
            const { id, token } = response
            user.id = id
            user.token = token
            user.email = email
            user.password = password
        }
    });
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
results.onItemRender = function () {
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

detail.onBack = function () {
    detailView.hide();
    searchView.show();
};

var feedback = new Feedback(document.getElementsByClassName('feedback')[0]);