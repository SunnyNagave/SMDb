# IMDb Clone App

  In this project, I have used OMDb API and vanilla javascript. This project can be majorly divided into 3 pages - Main page or Search Page, Movie Page and Favorite Movie Page. Let's see them one by one.

## OMDb API - Website(https://www.omdbapi.com/)
  The OMDb API is a RESTful web service to obtain movie information. You have to get a key by registering your emaild id. You will get a key in email. When you get your key, you are ready to use this API. To get the data from API, you have to send requests in the form of - 
  ```
http://www.omdbapi.com/?apikey=[yourkey]&
```

After '&' in the request, you have to mention what do you want from API by passing the parameters. There are various parameters but I have used only 2 in this project. 's' parameter is used to search movie with the name. This parameter returns a JSON array of top 10 matching results of a particular query. This JSON array has details of those movies such as Title, IMDb Id, Poster link, Year of release and Type of content. If there are too many matches, it gives an error stating that there are "Too many results" and if there is no movie with that query it returns "Movie not found". 

## Main Page

This is the face of the project. When you open the project, this page will show. This and all pages have a header which can be used for navigating the pages. If you click on the logo or Home, this main page will show. If you click on the favorites, the favorites page will open with movies marked as favorite. There is a search bar on the page. When you start typing in that, results will start to show in the result list below as shown in the image - 

![image](https://github.com/SunnyNagave/SMDb/assets/88137080/f5c2026a-489e-4193-b1e3-2e993e82d14a)


In these top 10 results, If you click on a title of a particular movie, the page will redirect you to a movie page where details of movie title you just clicked will appear. If you want to add a given movie to your favorites, click on the heart icon front of movie title. This will add that movie to favorite list and that movie will appear in favorite page. The heart icon will be changed to indicate you like this movie. If you again click on that icon, that movie will be removed from the favorite list and it will not be visible in favorite page.

## Movie Page

A typical movie page will look like below - 

![image](https://github.com/SunnyNagave/SMDb/assets/88137080/6659bbc9-7f6b-4df3-b4ed-4b29e3314e10)


From the above page you can cleary see that details of a particular movie is shown. This page is designed in such a way that it show movie details of movie requested by the other pages. This page has header like other two pages used for navigation. After that there will be container where movie details will be shown. There is a heart icon if you press on that, movie will be added to your favorite list and will appear in favorite page. If you click it again, it will be removed from favorite list.

## Favorite Page

A typical favorite page will look like below -

![image](https://github.com/SunnyNagave/SMDb/assets/88137080/2a384de9-3213-4c73-988d-c24a25909c60)

On this page movies marked as favorites will be shown as a list. Every movie will be shown with the poster, title and a remove button. If you click on the movie title, the page will redirect to movie page where details of that movie will be displayed. If you click on remove button, the movie will be removed from the favorite list. On top of the page, there is navigation bar to navigate through the project.

