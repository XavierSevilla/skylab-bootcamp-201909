var h1 = document.createElement('h1');
h1.innerText = '';
document.body.append(h1);
var xhr = new XMLHttpRequest;
xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=green');
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
       var ducks = JSON.parse(xhr.responseText);
        var ul = document.createElement('ul');
        document.body.append(ul);
        ducks.forEach(function(duck) {
            var li = document.createElement('li');
            var img = document.createElement('img');
            img.src = duck.imageUrl;
            li.append(img);
            ul.append(li);
        });
    }
};
xhr.send();