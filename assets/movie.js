const omdbkey = "36e8f1f5";

// This function checks whether the movie is in favorite list.
function idinfav(movieid){
    favdata = localStorage.getItem("favlist");
    parsedfavdata = JSON.parse(favdata)
    if(parsedfavdata === null){
        return false;
    }
    for(let i = 0; i < parsedfavdata.length; i++){
        if(parsedfavdata[i][0] === movieid){
            return true;
        }
    }
    return false;
}

// This function is to add a movie in the favorite list
function addid(movieid){
    favdata = localStorage.getItem("favlist");
    parsedfavdata = JSON.parse(favdata);
    sessiondata = sessionStorage.getItem("movie");
    parsedsessdata = JSON.parse(sessiondata);
    if(parsedfavdata === null){
        parsedfavdata = [];
        parsedfavdata[0] = parsedsessdata;
    }else{
        parsedfavdata.push(parsedsessdata);
    }
    newstring = JSON.stringify(parsedfavdata);
    localStorage.removeItem("favlist");
	localStorage.setItem("favlist", newstring );
    return;
}

// This function is to remove a movie in the favorite list
function removeid(movieid){
    favdata = localStorage.getItem("favlist");
    parsedfavdata = JSON.parse(favdata);
    for(let i = 0; i < parsedfavdata.length; i++){
        if(parsedfavdata[i][0] === movieid){
            index = i;
            break;
        }
    }
    parsedfavdata.splice(index,1);
    newstring = JSON.stringify(parsedfavdata);
    localStorage.removeItem("favlist");
	localStorage.setItem("favlist", newstring );
    return;
}

// This function will fill movie details in the movie container
function fillmoviedetails(moviedata){
	let container = document.getElementsByClassName("moviecontainer")[0];
	const moviepostercontainer = document.createElement("div");
	moviepostercontainer.classList.add("movieposter");
    // Case for movie poster is available
	if(moviedata["Poster"] !== "N/A"){
		moviepostercontainer.innerHTML = `<img src=${moviedata["Poster"]}>`;
		container.innerHTML = ""
		container.append(moviepostercontainer);
	}else{
        // Case for movie poster not available
		moviepostercontainer.innerHTML = `<img src="dnf.jpg">`;
		container.innerHTML = ""
		container.append(moviepostercontainer);
	}
    if(idinfav(moviedata["imdbID"])){
        like = `<i id="likebtn" class="fa-solid fa-heart fa-fade"></i>`;
    }else{
        like = `<i id="likebtn" class="fa-regular fa-heart"></i>`;
    }
	const moviedetailscontainer = document.createElement("div");
	moviedetailscontainer.classList.add("moviedetails");
	moviedetailscontainer.innerHTML = `<div class="movietitle"><b>Title</b> : ${moviedata["Title"]} <span id=${moviedata["imdbID"]}>${like}</span></div>
				<div class="contentdetails"><b>Type</b> : ${moviedata["Type"]} &nbsp;&nbsp;&nbsp;&nbsp;<b>Runtime</b> : ${moviedata["Runtime"]}</div>
				<div class="movieyear"><b>Year of Release</b> : ${moviedata["Year"]}</div>
				<div class="movierating"><b>Censor Rating</b> : ${moviedata["Rated"]} &nbsp;&nbsp;&nbsp;&nbsp;<b>IMDb Rating</b> : ${moviedata["imdbRating"]} based on ${moviedata["imdbVotes"]} reviews</div>
				<div class="moviegenre"><b>Genre</b> : ${moviedata["Genre"]}</div>
				<div class="movieplot"><b>Plot</b> : ${moviedata["Plot"]}</div>
				<div class="moviedirector"><b>Director</b> : ${moviedata["Director"]}</div>
				<div class="moviecast"><b>Cast</b> : ${moviedata["Actors"]}</div>
				<div class="movieawards"><b>Awards</b> : ${moviedata["Awards"]}</div>`
	container.append(moviedetailscontainer);
	return;
}

// This function gets movie details from OMDb API
async function getmoviedetails(movieid){
	let container = document.getElementsByClassName("moviecontainer")[0];
	container.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;
	const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbkey}&i=${movieid}`);
	const data = await response.json();
	let movieinfo = []
	movieinfo = [movieid,data["Title"],data["Poster"]];
	moviejson = JSON.stringify(movieinfo)
	sessionStorage.setItem("movie",moviejson);
	fillmoviedetails(data);
	return;
}

// Function to fill the page with movie details
function fillpage(){ 
	let id = localStorage.getItem("searchtitle");
	getmoviedetails(id);
	return;
}

// Function to handle mouse click
function clickhandler(e){
    // For the click on like button
	if(e.target.id === "likebtn"){
		let parentid = e.target.parentNode.id;
        let idhtml = document.getElementById(parentid);
        // If the movie is in favorite list
		if(idinfav(parentid)){
			idhtml.innerHTML=`<i id="likebtn" class="fa-regular fa-heart"></i>`
            removeid(parentid);
            return;	
		}else{
            // If the movie is not in favorite list
			idhtml.innerHTML=`<i id="likebtn" class="fa-solid fa-heart fa-fade"></i>`
            addid(parentid);
            return;
		}
	}
}


document.addEventListener("click", clickhandler)