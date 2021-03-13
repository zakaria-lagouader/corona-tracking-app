const field = document.getElementById("row");
const search = document.getElementById("search");

function showposts() {
  // FETCH THE API
  fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then(data => {
      field.innerHTML = "";
      // GET AN ARRAY OF COUNTRIES NAMES FROM THE DATA OBJ PROPERTIES
      countries = Object.keys(data);
      countries.forEach(country => {
        var repo = data[country][data[country].length - 1];
        // CREATE A NEW HTML ELEMENT
        let post = document.createElement("div");
        post.className = "col-md-6 col-lg-4";
        post.innerHTML = creatpost(country, repo);
        // INSERT THE ELEMENT INTO THE FIELD
        field.insertAdjacentElement("afterbegin", post);
      });
    });
}

function showresult(term) {
  fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then(data => {
      // GAT AN ARRAY OF COUNTRIES NAMES FROM THE DATA OBJ PROPERTIES
      countries = Object.keys(data);
      var result = [];
      field.innerHTML = "";
      countries.forEach(country => {
        if (country.toLowerCase().startsWith(term.toLowerCase())) {
          console.log(term);
          var repo = data[country][data[country].length - 1];
          // CREATE A NEW HTML ELEMENT
          let post = document.createElement("div");
          post.className = "col-md-6 col-lg-4";
          post.innerHTML = creatpost(country, repo);
          // INSERT THE ELEMENT INTO THE FIELD
          field.insertAdjacentElement("afterbegin", post);
        }
      });
    });
}

// TEMPLATE FOR THE POST
function creatpost(cty, repo) {
  return `
        <div class="post">
            <h2 class="post-title">${cty}</h2>
            <div class="post-body">
                <ul>
                    <li>
                        <p class="nbr">${repo.confirmed}</p>
                        <p class="label">Confirmed</p>
                    </li>
                    <li>
                        <p class="nbr">${repo.deaths}</p>
                        <p class="label">Deaths</p>
                    </li>
                    <li>
                        <p class="nbr">${repo.recovered}</p>
                        <p class="label">Recovered</p>
                    </li>
                </ul>
            </div>
        </div>
      `;
}
// SEARCH FUNCION
search.addEventListener("keyup", e => {
  if (search.value !== "") {
    showresult(search.value);
  } else {
    showposts();
  }
});
showposts();
