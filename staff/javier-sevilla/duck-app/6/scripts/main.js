var views = document.getElementsByClassName('view');debugger;
var loginView = new View(views[0]);
var searchView = new View(views[1]);
var detailView = new View(views[2]);

var login =new Login(document.getElementsByClassName('login')[0]);debugger;
login.onSubmit(function (email,password) {
    loginUser(email, password, function (error) {
        if (error) {
            feedback.render(error.message);
            feedback.show();
        } else {
            login.hide();
            searchView.show();
        }
    });
});


(function () {
    searchDucks('', function (error, ducks) {
        if (error) {
            feedback.render(error.message);

            results.hide();
            feedback.show();
        } else {
            ducks = ducks.shuffle().splice(0, 3);

            results.render(ducks);
        }
    });
})();

var search = new Search(document.getElementsByClassName('search')[0]);
search.onSubmit(function (query) {
    searchDucks(query, function (error, ducks) {
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

    item.onClick = function (id) {
        retrieveDuck(id, function (error, duck) {
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