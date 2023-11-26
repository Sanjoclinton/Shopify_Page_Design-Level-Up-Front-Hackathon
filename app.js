//Alert related Constants
const alertIcon = document.getElementById("alert-icon");
const alertContent = document.getElementById("alert-content");
const alertHeaderIcons = document.querySelectorAll(".alert-header-icon");

// Menu related constants
const menuTrigger = document.getElementById("menu-trigger");
const menuContent = document.getElementById("menu-content");
const menuItems = document.querySelectorAll(".menu-item");

// Trial Pop up related constants
const dismissBtn = document.getElementById("trial-dismiss-btn");
const trialWrapper = document.querySelector(".trial-wrapper");
const trialContent = document.querySelector(".trial-content");

// Setup guide related constants
const arrowSetup = document.getElementById("arrow-down");
const guideContent = document.getElementById("guide-content");
const onboardingSteps = document.querySelectorAll(".onboarding-step");

const checks = document.querySelectorAll(".check");
const guideContainers = document.querySelectorAll(".guide-container");
const guideTextDropdowns = document.querySelectorAll(".guide-text-dropdown");
const guideImages = document.querySelectorAll(".guide-image");

const progress = document.querySelector("progress");
const valueCount = document.querySelector("#count");
let valueCountNumber = 0;

// MY FUNCTIONS

// This function opens alert content
function openAlert() {
  // Make alert content visible and focus on first icon
  // Then Set aria-expanded attribute to true
  alertContent.classList.remove("d-none");
  alertIcon.setAttribute("aria-expanded", "true");
  alertHeaderIcons[0].focus();
  console.log("Alert opened");
}

// This function closes alert content
function closeAlert() {
  // Make alert content hidden and focus on alert icon
  // Then Set aria-expanded attribute to false
  alertContent.classList.add("d-none");
  alertIcon.setAttribute("aria-expanded", "false");
  alertIcon.focus();
  console.log("Alert closed");
}

// This function controls focus in alert box when direction keys are pressed and also escape to close
function handleAlertKeyPress(event, index) {
  //If ArrowUp or arrowLeft is clicked
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    if (index === 0) {
      alertHeaderIcons[1].focus();
    } else {
      alertHeaderIcons[0].focus();
    }
  }
  // If arrowDown or arrowRight is clicked
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    if (index === 1) {
      alertHeaderIcons[0].focus();
    } else {
      alertHeaderIcons[1].focus();
    }
  }
  // If Escape key is clicked
  if (event.key === "Escape") {
    closeAlert();
  }
}

// This function opens menu content
function openMenu() {
  // Make menu content visible and focus on first menu item
  // Then Set aria-expanded attribute to true
  menuContent.classList.remove("d-none");
  menuTrigger.setAttribute("aria-expanded", "true");
  menuItems[0].focus();
  console.log("Menu opened");
}

// This function closes menu content
function closeMenu() {
  // Make menu content hidden and focus on menu trigger
  // Then Set aria-expanded attribute to false
  menuContent.classList.add("d-none");
  menuTrigger.setAttribute("aria-expanded", "false");
  menuTrigger.focus();
  console.log("Menu closed");
}

// This function controls focus in menu Item when direction keys are pressed and also escape to close
function handleMenuKeyPress(event, index) {
  //If ArrowUp or ArrowDown is clicked
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    // If it's on first element, I want it to focus on last element
    if (index === 0) {
      menuItems[menuItems.length - 1].focus();
    }
    // Else if on any other element, I want it to move focus up
    else {
      menuItems[index - 1].focus();
    }
  }

  // If ArrowDown or ArrowLeft is clicked
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    // If we are on last element, then move focus back up
    if (index === menuItems.length - 1) {
      menuItems[0].focus();
    }
    // Else if on any other element, then move focus down.
    else {
      menuItems[index + 1].focus();
    }
  }

  // If Escape key is clicked
  if (event.key === "Escape") {
    closeMenu();
  }
}

// This function controls the setup guide content
// Once the arrow is clicked it toggles the 'd-none' class to make it visible or hidden
function toggleGuideContent() {
  guideContent.classList.toggle("d-none");
  arrowSetup.classList.toggle("rotate");
  let isExpanded = arrowSetup.getAttribute("aria-expanded");
  if (isExpanded === "false") {
    arrowSetup.setAttribute("aria-expanded", "true");
    isExpanded = true;
  } else {
    arrowSetup.setAttribute("aria-expanded", "false");
    isExpanded = false;
  }
}

// This function opens the text-guide
function openGuide(i) {
  guideContainers[i].classList.add("bg-grey");
  guideTextDropdowns[i].classList.remove("d-none");
  guideImages[i].classList.add("active-desktop");
}

// This function closes the text-guide
function closeGuide(i) {
  guideContainers[i].classList.remove("bg-grey");
  guideTextDropdowns[i].classList.add("d-none");
  guideImages[i].classList.remove("active-desktop");
}

// MY EVENT LISTENERS

// When I click on the Alert Button with my mouse
alertIcon.addEventListener("click", () => {
  let isAlertExpanded = alertIcon.getAttribute("aria-expanded");
  let isMenuExpanded = menuTrigger.getAttribute("aria-expanded");

  // check if alert content is expanded, if not expanded, open alert
  if (isAlertExpanded === "false") {
    // I don't want menu opened when alert is opened, so check if menu is opened and close if opened
    if (isMenuExpanded === "true") {
      closeMenu();
    }
    openAlert();
    // If alert content is already expanded before click, i want to close alert
  } else {
    closeAlert();
  }
});

// For keyboard users
// Set an event listener on all aalert icons to check for directions or escape to close
alertHeaderIcons.forEach(function (headerIcon, index) {
  headerIcon.addEventListener("keyup", function (event) {
    handleAlertKeyPress(event, index);
  });
});

// When I click on the menu Button with my mouse
menuTrigger.addEventListener("click", () => {
  let isAlertExpanded = alertIcon.getAttribute("aria-expanded");
  let isMenuExpanded = menuTrigger.getAttribute("aria-expanded");

  // Check if menu content is expanded, if not expanded, open menu
  if (isMenuExpanded === "false") {
    // If alert box is open, I want to close it so they both don't open at the same time
    if (isAlertExpanded === "true") {
      closeAlert();
    }
    openMenu();
  }
  // Close menu if already expanded before click
  else {
    closeMenu();
  }
});

// For keyboard users
// Set an event listener on all menu items to check for directions or escape to close
menuItems.forEach(function (menuItem, index) {
  menuItem.addEventListener("keyup", (event) => {
    handleMenuKeyPress(event, index);
  });
});

// This dismisses the trial offer when clicked
dismissBtn.addEventListener("click", function () {
  trialWrapper.classList.add("d-none");
  trialContent.setAttribute("aria-hidden", "true");
});

// When the arrow up is clicked it toggles the guide content
arrowSetup.addEventListener("click", toggleGuideContent);

// Expands guide container when onboarding-step is clicked on
onboardingSteps.forEach((step, index) => {
  // Constant to hold index of current clicked on step
  let current;
  // Listen for a click on any of the onboarding steps
  step.addEventListener("click", function () {
    current = index;
    // console.log(current);
    // Toggle the background color, toggle innerText and toggle image only on desktop
    openGuide(current);

    // Hide every other innerText not clicked, remove background color and images on desktop
    for (let i = 0; i < checks.length; i++) {
      if (i !== current) {
        closeGuide(i);
      }
    }
  });
});

// Close current opened container and open next unchecked container when current one is marked
// Also increase progress value
checks.forEach((check, index) => {
  // Listen for when check button is pressed
  check.addEventListener("click", function () {
    // If it is unchecked, check and close container
    // Then find the first unchecked and open the container of the step
    if (check.classList.contains("dotted")) {
      // check the dashed
      check.innerHTML =
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11.9996" cy="12" r="10" fill="#1C181D" stroke="#1C181D" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8163 8.64149C17.0604 8.88557 17.0604 9.2813 16.8163 9.52538L11.3997 14.942C11.1556 15.1861 10.7599 15.1861 10.5158 14.942L7.80745 12.2337C7.56337 11.9896 7.56337 11.5939 7.80745 11.3498C8.05153 11.1057 8.44725 11.1057 8.69133 11.3498L10.9577 13.6162L15.9324 8.64149C16.1765 8.39742 16.5723 8.39742 16.8163 8.64149Z" fill="white"/></svg>';
      // Remove dotted class
      check.classList.remove("dotted");
      // Increase progress
      valueCountNumber++;
      valueCount.innerText = valueCountNumber;
      progress.value = valueCountNumber;
      // Get index of first unchecked step and open
      let nextStep;
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].classList.contains("dotted")) {
          nextStep = i;
          // console.log(nextStep);
          break;
        }
      }

      for (let i = 0; i < checks.length; i++) {
        if (i !== nextStep) {
          closeGuide(i);
        } else {
          openGuide(nextStep);
        }
      }
    }

    // If it is checked, uncheck and open container, then close any other container
    else {
      // Uncheck the dash
      check.innerHTML =
        '<svg class="dashed-check" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Component 14"><circle id="Ellipse 1" cx="12" cy="12" r="10" stroke="#8A8A8A" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/></g></svg><svg class="circle-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#8A8A8A" stroke-width="2.08333" stroke-linejoin="round"/></svg>';
      check.classList.toggle("dotted");

      // Open back
      for (let i = 0; i < checks.length; i++) {
        if (i === index) {
          openGuide(i);
        } else {
          closeGuide(i);
        }
      }
      // Reduce progress
      valueCountNumber--;
      valueCount.innerText = valueCountNumber;
      progress.value = valueCountNumber;
    }
  });
});
