const form = document.querySelector("form");
const text = document.querySelector(".text");
const grid = document.querySelector(".grid");
const paragraph = document.querySelector("paragraph");
const errorMsg = document.querySelector(".errorMsg");
const loading = document.querySelector(".loading");

// form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(text.value);
  text.value = "";
  grid.innerHTML = "";
  errorMsg.classList.add("hidden");
});

// get data
async function getData(word) {
  try {
    loading.style.display = "flex";
    const URL = `https://api.tvmaze.com/search/shows?q=${word}`;
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(data);
    loading.style.display = "none";
    showData(data);
  } catch {
    errorMsg.classList.remove("hidden");
  }
}

// show data
function showData(data) {
  const filteredData = data.filter((element) => element.show.rating.average !== null);

  // error
  if (filteredData.length == 0) {
    errorMsg.classList.remove("hidden");
  }

  filteredData.forEach((element) => {
    const box = document.createElement("div");
    box.classList.add("flex", "gap-5", "rounded-md", "p-2", "border-orange-500", "border-2");

    box.innerHTML = `
      <div class="w-40 h-52 bg-gray-300 rounded-md" style="background-image: url(${element.show.image.medium}); background-size: cover; background-repeat: no-repeat; background-position: center;"></div>
      <div class="flex flex-col justify-between">
        <ol>
          <li class="font-semibold text-xl">${element.show.name}</li>
          <li class="text-transparent">-</li>
          <li>${element.show.language}</li>
          <li><i>Rating:</i> ${element.show.rating.average}</li>
          <li class="font-serif text-rose-500">${element.show.genres.join(", ")}</li>
        </ol>
        <button class="text-white bg-orange-600 p-1 px-2 rounded-md mb-2 w-32">Read More...</button>
      </div>
    `;

    grid.append(box);

    // slider
    const readMoreBtn = box.querySelector("button");
    readMoreBtn.addEventListener("click", () => {
      slider.classList.add("openSlider");
      document.body.style.overflow = "hidden"; // disable scrolling
      document.querySelector(".sliderName").innerHTML = element.show.name;
      document.querySelector(".sliderSummary").innerHTML = element.show.summary;
      document.querySelector(".sliderLink").href = element.show.url;
      document.querySelector(".sliderPremiered").innerHTML = element.show.premiered;
      document.querySelector(".sliderEnded").innerHTML = element.show.ended;
      document.querySelector(".sliderType").innerHTML = element.show.type;
      document.querySelector(".sliderStatus").innerHTML = element.show.status;
    });
  });
}

// default
getData("batman");
