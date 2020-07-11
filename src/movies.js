// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(movies) {
  return movies.map((element) => element.director);
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
function uniqueDirector(movies) {
  var directors = getAllDirectors(movies);
  directors = [...new Set(directors)];
  return directors;
}

// // Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  var titleList = movies.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  );
  return titleList.length;
}

// // Iteration 3: All rates average - Get the average of all rates with 2 decimals
function ratesAverage(movies) {
  if (!movies.length) return 0;

  movies.map((element) => {
    if (element.rate === undefined) {
      element.rate = "";
    }
    return element;
  });

  var avg = movies.reduce((a, element) => {
    a += element.rate;
    return a;
  }, 0);
  avg = avg / movies.length;
  avg = Math.round(avg * 100) / 100;

  return avg;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(movies) {
  var drama = [...movies];
  drama = drama.filter((movie) => movie.genre.includes("Drama"));

  return ratesAverage(drama);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  var orderedMovies = [...movies];
  orderedMovies.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return orderedMovies;
}
// // https://stackoverflow.com/questions/21857647/javascript-sort-array-twice

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  var movieArray = movies.map((element) => element.title);
  movieArray.sort((a, b) => a.localeCompare(b));
  if (movieArray.length > 20) movieArray.splice(20, movieArray.length - 20);
  return movieArray;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function duration(time) {
  // time = "xh ymin"
  var splitTime = time.toString().split(" ");
  //splitTime = ["xh", "ymin"]
  var hour = 0;
  var min = 0;

  if (splitTime.length === 2) {
    hour = Number(splitTime[0].replace("h", ""));
    // hour = x
    min = Number(splitTime[1].replace("min", "")) + 60 * hour;
    // min = y + 60 * x
  } else {
    if (splitTime[0].includes("h")) {
      hour = Number(splitTime[0].replace("h", ""));
      min = 60 * hour;
    } else {
      min = Number(splitTime[0].replace("min", ""));
    }
  }
  return min;
}

function turnHoursToMinutes(movies) {
  var timedMovies = JSON.parse(JSON.stringify(movies));
  timedMovies.map((movie) => {
    movie.duration = duration(movie.duration);
    return movie;
  });
  return timedMovies;
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
function bestYearAvg(movies) {
  // returns null if the array is empty
  if (!movies.length) return null;

  const ratesPerYear = movies.reduce((acc, movie) => {
    if (movie.year in acc) {
      acc[movie.year].push({ rate: movie.rate });
    } else {
      acc[movie.year] = [{ rate: movie.rate }];
    }
    return acc;
  }, {});

  let bestYear = 0;
  let bestAvg = 0;

  for (const year in ratesPerYear) {
    const avg = ratesAverage(ratesPerYear[year]);
    if (avg > bestAvg) {
      bestYear = year;
      bestAvg = avg;
    }
  }

  return `The best year was ${bestYear} with an average rate of ${bestAvg}`;
}
