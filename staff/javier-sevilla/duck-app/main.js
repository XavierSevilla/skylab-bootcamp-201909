
var searchCriteria = document.getElementsByClassName("search__criteria");
var searchSubmit = document.getElementsByClassName("search__submit");
debugger
var search = document.getElementById("search");
search.addEventListener("submit", searchFunc);
var ul = document.createElement('ul');

function searchFunc(e) {
    e.preventDefault();

    ul.innerText = " ";

    var searchString = e.target.search__criteria.value;

    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + searchString);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
           var ducks = JSON.parse(xhr.responseText);debugger;



            document.body.append(ul);
            ducks.forEach(function(duck) {
                



                document.getElementsByClass("item__title").innerHTML = "duck.title";

                // item__title.append(duck.title)
                // item__image.append(duck.imageUrl)
                // item_price.append(duck.price)
                // var li = document.createElement('li');
                // var img = document.createElement('img');
                // img.src = duck.imageUrl;
                // li.append(img);
                // ul.append(li);
            });
        }
    };
    xhr.send();
};

