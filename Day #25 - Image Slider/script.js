/** @format */

const Slider = () => {
  const slideRef = document.createElement("div");
  const loadingProgress = 0;

  const handleClickNext = () => {
    let item = slideRef.querySelectorAll(".item");
    slideRef.appendChild(item[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.querySelectorAll(".item");
    slideRef.prepend(items[items.length - 1]);
  };

  const data = [
    {
      id: 1,
      imgUrl: "./img/1.jpg",
    },
    {
      id: 2,
      imgUrl: "./img/2.jpg",
    },
    {
      id: 3,
      imgUrl: "./img/3.jpg",
    },
    {
      id: 4,
      imgUrl: "./img/4.jpg",
    },
    {
      id: 5,
      imgUrl: "./img/5.jpg",
    },
    {
      id: 6,
      imgUrl: "./img/6.jpg",
    },
  ];

  const container = document.createElement("div");
  container.classList.add("container");

  const loadBar = document.createElement("div");
  loadBar.classList.add("loadBar");
  loadBar.style.width = `${loadingProgress}%`;

  container.appendChild(loadBar);
  container.appendChild(slideRef);

  // Create and Append items to Slide div
  data.forEach((item) => {
    const slideItem = document.createElement("div");
    slideItem.classList.add("item");
    slideItem.style.backgroundImage = `url(${item.imgUrl})`;

    slideRef.appendChild(slideItem);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const prevButton = document.createElement("button");
    prevButton.id = "prev";
    prevButton.addEventListener("click", handleClickPrev);

    const prevIcon = document.createElement("i");
    prevIcon.className = "uil uil-arrow-left";
    prevButton.appendChild(prevIcon);

    //Create THe Next button
    const nextButton = document.createElement("button");
    nextButton.id = "next";
    nextButton.addEventListener("click", handleClickNext);

    const nextIcon = document.createElement("i");
    nextIcon.className = "uil uil-arrow-right";
    nextButton.appendChild(nextIcon);

    buttons.appendChild(prevButton);
    buttons.appendChild(nextButton);
    container.appendChild(buttons);
  });

  //Add the Container to THE DOM
  document.getElementById("root").appendChild(container);
};

Slider();
