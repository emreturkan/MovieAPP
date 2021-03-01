const APIURL = "https://api.themoviedb.org/3/movie/popular?api_key=9d107d4813dc3bd9f2afaa908e7fd901&language=tr-TR&page=1";
const SEARCHURL = "https://api.themoviedb.org/3/search/movie?&api_key=9d107d4813dc3bd9f2afaa908e7fd901&query=";
const PAGEURL = "https://api.themoviedb.org/3/movie/popular?api_key=9d107d4813dc3bd9f2afaa908e7fd901&language=tr-TR&page=";
const movies = document.getElementById("movies");
const form = document.getElementById("form");
const input = document.getElementById("search");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const IMG = "https://image.tmdb.org/t/p/w1280";

getMovies(APIURL);

async function getMovies(url){

    const response = await fetch(url);
    const data = await response.json();

    return data.page,showMovies(data.results);

}

function showMovies(moviec){
    movies.innerHTML = "";
    
    moviec.map((movie)=>{
        

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img src="${IMG + movie.poster_path}" alt="movie">
            <div class="movie-body ${getVote(
                movie.vote_average)}">
                <h3>${movie.title}</h3>
                <span class="${getVote(
                    movie.vote_average
                )}">${movie.vote_average}</span>
                
            </div>   
        `;
        
        movies.appendChild(movieEl);
    })

}

function getVote(vote){

    if(vote>=8){
        return "green";
    }
    else if(vote >= 6){
        return "orange";
    }
    else{
        return "red";
    }
}


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchText = input.value.trim();

    if(searchText){
        getMovies(SEARCHURL + searchText);
    }
    input.value = "";

});



next.addEventListener("click",(e)=>{
    e.preventDefault();

    increase();
});
prev.addEventListener("click",(e)=>{
    e.preventDefault();

    decrease();
});


let i = 1;
function increase(){
   
    if(i<10){
        i++;
        getMovies(PAGEURL + i);
    }
}

function decrease(){

    if(i>1){
        i--;
        getMovies(PAGEURL + i);
    }
}





