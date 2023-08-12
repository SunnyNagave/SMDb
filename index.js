let inputfield = document.getElementsByClassName("searchinput")[0];

// OMDb API Key
const omdbkey = "36e8f1f5";

// This function gets whether the movie is in favorite list or not
function getfavstatus(movieid){
	let data = localStorage.getItem("favlist");
	let parseddata = JSON.parse(data);
	if(parseddata=== null){
		return false;
	}
	for(let j=0; j < parseddata.length; j++){
		if(parseddata[j][0] === movieid){
			return true;
		}
	}
	return false;
}

// This function makes the search result list with the movie data is given
function rendersearchlist(movielist){
	let getsearchfield = document.getElementsByClassName("searchresult")[0];
	getsearchfield.innerHTML = ""; 
	for(let i = 0; i < movielist.length; i++){
		const listitem = document.createElement("div")
		listitem.classList.add("contentlistitem");
		let newid = movielist[i]["imdbID"];
		let status = getfavstatus(newid);
		// If the movie is in the favorite list, the icon will be of liked.
		if(status){
			like = `<i id="favbtn" class="fa-solid fa-heart fa-fade"></i>`;
		}else{
			like = `<i id="favbtn" class="fa-regular fa-heart"></i>`;
		}
		listitem.setAttribute("id", newid); 
		// If the poster is not available from API, movie poster not found poster will shown
		if(movielist[i]["Poster"] !== "N/A"){
			listitem.innerHTML=`<span class="contentposter"><img src=${movielist[i]["Poster"]}></span>
						<span class="contentdetail">
							<span class="contenttitle" id=${movielist[i]["imdbID"]}>${movielist[i]["Title"]}</span>
							<span class="releaseyear">${movielist[i]["Year"]}</span>
							<span class="type">${movielist[i]["Type"]}</span>
						</span>
						<span class="favbtn" id=${movielist[i]["imdbID"]}> ${like} </span>`
		}else{ 
			listitem.innerHTML=`<span class="contentposter"><img src="assets/dnf.jpg"]}></span>
						<span class="contentdetail">
							<span class="contenttitle" id=${movielist[i]["imdbID"]}>${movielist[i]["Title"]}</span>
							<span class="releaseyear">${movielist[i]["Year"]}</span>
							<span class="type">${movielist[i]["Type"]}</span>
						</span>
					<span class="favbtn" id=${movielist[i]["imdbID"]}> ${like} </span>`
		} 
		getsearchfield.append(listitem)
		//console.log(movielist[i]["Title"]+" "+movielist[i]["Year"]+" "+movielist[i]["Type"])
	}
	return;
}

// Function for getting search data from API
async function searchformovies(textquery){ 
	const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbkey}&s=${textquery}&page=1`);
	const data = await response.json();
	let getsearchfield = document.getElementsByClassName("searchresult")[0];
	// If the API results in error, the error message will be shown
	if(data["Response"] === "False"){
		getsearchfield.innerHTML = `<i class="fa-solid fa-triangle-exclamation fa-beat"></i> ${data["Error"]}`;
		return;
	}else{ 
		getsearchfield.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching...`; 
		rendersearchlist(data["Search"]);
		return;
	}
}

// This function handles Enter key press on empty search bar
function handlekeypress(e){
	let getinputvalue = document.getElementsByClassName("searchinput")[0].value;
	if(e.keyCode === 13 && getinputvalue === ""){
		alert("Please Write Something in Search Bar Before Clicking on Search");
		return;
	}
	searchformovies(getinputvalue);
	return;
}

// This function handles click depending on where user clicks 
function handleclick(e){
	// If someone clicks in searchbar, the search result list appears
	if(e.target.className === "searchinput" && e.target.value === ""){
		let emptylist = document.getElementsByClassName("searchresult")[0];
		emptylist.style.display = "block";
		return;
	}
	else if(e.target.id === "favbtn"){
		// This function handles when user clicks on favorite button 
		let favid = e.target.parentNode.id;
		let localdata = localStorage.getItem("favlist");
		// If favorite list is empty or absent. 
		if(localdata === null || localdata.length === 0){
			let favli = []
			let finallist = []
			favli.push(favid)
			favli.push(document.getElementById(favid).childNodes[2].childNodes[1].innerHTML);
			favli.push(document.getElementById(favid).childNodes[0].innerHTML);
			finallist.push(favli);
			favstring = JSON.stringify(finallist);
			localStorage.setItem("favlist", favstring );
			e.target.parentNode.innerHTML = `<i id="favbtn" class="fa-solid fa-heart fa-fade"></i>`;
		}else{
			let parseddata = JSON.parse(localdata);
			//console.log(parseddata);
			for(var i=0; i < parseddata.length; i++){
				if(parseddata[i][0] === favid){
					break;	
				}
			}
			// If the movie is present in the favorite list
			if(i < parseddata.length){
				index = i;
				parseddata.splice(index,1);
				newstring = JSON.stringify(parseddata);
				localStorage.clear();
				localStorage.setItem("favlist", newstring );
				e.target.parentNode.innerHTML = `<i id="favbtn" class="fa-regular fa-heart"></i>`;
			}else{
				// If the movie is absent in the favorite list
				let favli = []
				favli.push(favid)
				favli.push(document.getElementById(favid).childNodes[2].childNodes[1].innerHTML);
				favli.push(document.getElementById(favid).childNodes[0].innerHTML);
				parseddata.push(favli);
				newstring = JSON.stringify(parseddata);
				localStorage.clear();
				localStorage.setItem("favlist", newstring );
				e.target.parentNode.innerHTML = `<i id="favbtn" class="fa-solid fa-heart fa-fade"></i>`;
			}
		}
		return;
	}else if(e.target.className === "contenttitle"){
		// If user clicks movie title, the page will redirect to movie details page	
		localStorage.setItem("searchtitle",e.target.id); 
		window.location.href="assets/movie.html";
	}else{
		// If user clicks anywhere when there is nothing in search bar, the search bar will disappear
		let emptylist = document.getElementsByClassName("searchresult")[0];
		let getinputvalue = document.getElementsByClassName("searchinput")[0].value 
		if(getinputvalue === ""){
			emptylist.style.display = "none"; 
		}
		return; 
	}
}

inputfield.addEventListener("keyup", handlekeypress);
document.addEventListener("click", handleclick);
