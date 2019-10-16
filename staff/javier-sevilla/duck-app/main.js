var search = document.getElementsByClassName("search")[0];
search.addEventListener("submit", searchFunc);
var ul = document.createElement('ul');

function searchFunc(e) {
    e.preventDefault();

    ul.innerText = " ";

    var searchString = this.search__criteria.value;

    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + searchString);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText);

            var results = document.getElementsByClassName("results")[0];debugger;
            results.innerHTML = '';

            ducks.forEach(function(duck) {
                var results__item = document.createElement('li');
                results__item.classList.add("results__item");

                var item = document.createElement('a');
                item.classList.add("item");

                var title = document.createElement('h2');
                title.classList.add('item__title');
                title.innerText = duck.title;

                var image = document.createElement('img');
                image.classList.add('item__image');
                image.src = duck.imageUrl;

                var price = document.createElement('span');
                price.classList.add('item__price');
                price.innerText = duck.price;

                results__item.append(item);
                
                item.append(title, image, price);

                results.append(results__item);          
            });
            
        }
    };
    xhr.send();
};

