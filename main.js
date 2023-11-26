const alertButton = document.getElementById("bellButton");
const alertBox = document.getElementById("alertBox");
const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");
const backDrop = document.getElementById("glassBackdrop");

// Banner
const bannerParent = document.getElementById("banner");
const closeBanner = document.getElementById("closeBanner");

// Articles
const mainCard = document.getElementById("mainCard");
const parentAccordion = document.getElementById("accordion");
const accordionToggle = document.getElementById("accordionToggle");
const arrow = document.getElementById("arrow");

const articleContainers = document.querySelectorAll(".article__container");
const articleHeads = document.querySelectorAll(".article__header");
const articleDescs = document.querySelectorAll(".article__body");

// Checkmarks
const checkContainer = document.querySelectorAll(".check__container");
const spinningCircle = document.querySelectorAll(".check__active");
const unchecked = document.querySelectorAll(".check__idle");
const checked = document.querySelectorAll(".checked");

//Progressbar
const progressCounter = document.getElementById("progressCounter");
const progressFill = document.getElementById("progressFill");

let checked_items = [];

// ############################### Toggle Alert and Profile Menu ######################################
alertButton.addEventListener("click", () => {
  if (profileMenu.classList.contains("show__display")) {
    profileMenu.classList.remove("show__display");
    backDrop.classList.remove("glass__bg");
  }

  if (alertBox.className !== "show__display") {
    backDrop.classList.toggle("glass__bg");
  }
  alertBox.classList.toggle("show__display");
});

profileButton.addEventListener("click", () => {
  if (alertBox.classList.contains("show__display")) {
    alertBox.classList.remove("show__display");
    backDrop.classList.remove("glass__bg");
  }

  if (profileMenu.className !== "show__display") {
    backDrop.classList.toggle("glass__bg");
  }
  profileMenu.classList.toggle("show__display");
});

// ############################### Close Banner ########################################################
closeBanner.addEventListener("click", () => {
  bannerParent.classList.add("hidden__display");
});

// ################################ Toggle MainAccordion ###############################################
accordionToggle.addEventListener("click", () => {
  parentAccordion.classList.toggle("hidden__display");

  if (arrow.className.baseVal === "") {
    arrow.classList.add("spin__arrow__clock");
  } else {
    arrow.className.baseVal =
      arrow.className.baseVal === "spin__arrow__clock"
        ? "spin__arrow__anticlock"
        : "spin__arrow__clock";
  }
});

// ################################ Article Accordion ##################################################
articleHeads.forEach((element, index) => {
  element.addEventListener("click", () => {
    displayArticle(index);
  });
});

function displayArticle(elementIndex) {
  articleDescs.forEach((element, index) => {
    if (elementIndex !== index) {
      articleDescs[index].classList.remove("show__display__article");
      articleContainers[index].classList.remove("add__background");
    }
  });
  articleDescs[elementIndex].classList.add("show__display__article");
  articleContainers[elementIndex].classList.add("add__background");
}

// ############################## Checkmarks ############################################################
checkContainer.forEach((check, index) => {
  check.addEventListener("click", () => {
    checkAnimation(index);
  });
});

function checkAnimation(checkIndex) {
  // The logic in this function.
  if (checked[checkIndex].className.baseVal === "checked") {
    unchecked[checkIndex].className.baseVal = "checked";
    spinningCircle[checkIndex].className.baseVal = "spin__circle";
    setTimeout(() => {
      checkElement(checkIndex);
    }, 1000);
  } else {
    unCheckElement(checkIndex);
  }
}

function checkElement(checkIndex) {
  spinningCircle[checkIndex].className.baseVal = "check__active";
  checked[checkIndex].className.baseVal = "show__display";

  // Append to checked array
  const item = articleContainers[checkIndex].getAttribute("id");
  checked_items.push(item);
  changeProgressCounter();
}

function unCheckElement(checkIndex) {
  unchecked[checkIndex].className.baseVal = "check__idle";
  checked[checkIndex].className.baseVal = "checked";

  // Remove from checked array
  const item = articleContainers[checkIndex].getAttribute("id");
  const itemIndex = checked_items.indexOf(item);
  if (itemIndex > -1) {
    checked_items.splice(itemIndex, 1);
    changeProgressCounter();
  }
}

// ######################################## Progressbar ###################################################
function changeProgressCounter() {
  progressCounter.innerHTML = checked_items.length;

  // Fill Progressbar
  const progressValue = parseInt(progressCounter.innerHTML);
  // Math
  const fillValue = (progressValue / 5) * 100;
  const percentageFill = fillValue.toString() + "%";

  progressFill.style.width = percentageFill;
}
