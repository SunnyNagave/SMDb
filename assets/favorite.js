// This function updates the page with favorite movie list with input of favorite movie list
function updatepage(moviearray){
	let parentdiv = document.getElementsByClassName("movielist")[0];
	parentdiv.innerHTML = "";
    // If the favorite list is empty.
	if(moviearray.length === 0 || moviearray === null){
		parentdiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation fa-fade"></i> &nbsp;Nothing to show here! Please favorite movies to see them here.`;
	}else{
        // This makes list from favorite movie list
		for(let i=0; i<moviearray.length; i++){
			let createnewdiv = document.createElement("div");
			createnewdiv.classList.add("moviecontainer");
			createnewdiv.innerHTML=`<div class="movieposter">${moviearray[i][2]}</div>
						<div class="moviename" id=${moviearray[i][0]}>${moviearray[i][1]}</div>
						<div class="removefromlist" id=${moviearray[i][0]}><i class="fa-solid fa-trash fa-fade"></i> Remove</div>`;
			//console.log(createnewdiv);
			parentdiv.append(createnewdiv);
		}
	}
	return;
}

// Function to fill the page.
function fillpage(){
	let dataarray = localStorage.getItem("favlist");
	let parsedarray = JSON.parse(dataarray);
	updatepage(parsedarray);
	return;
}

// Function to handle click on the page
function handleclick(e){
    // If user clicks on the remove button, it removes the movie from list
	if(e.target.className === "removefromlist"){
		let idtoremove = e.target.id;
		let dataarray = localStorage.getItem("favlist");
		let parsedarray = JSON.parse(dataarray);
		for(let i=0; i<parsedarray.length; i++){
			if(parsedarray[i][0]===idtoremove){
				parsedarray.splice(i,1);
				break;
			}
		}
		updatepage(parsedarray);
		newstring = JSON.stringify(parsedarray);
		localStorage.clear();
		localStorage.setItem("favlist", newstring );
		return;
	}else if(e.target.className === "moviename"){
        // If the user clicks movie name, the page redirects to movie details page
		localStorage.setItem("searchtitle",e.target.id);
		window.location.href="movie.html";
		return;
	}
}

document.addEventListener("click",handleclick);