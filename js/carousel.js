"use strict";

class Carousel {
  constructor(el) {
    this.el = el;
    // "add", "play"
    this.carouselOptions = ["Previous", "Next"];
    this.carouselData = [
      {
        id: "1",
        src: "img/Udemy-JUnit-600.png",
        href: "./files/Udemy-JUnit.pdf",
      },
      {
        id: "2",
        src: "img/NA-Bootcamp-600.png",
        href: "./files/NA-Bootcamp-Cert.png",
      },
      {
        id: "3",
        src: "img/TEK-Bootcamp-600.png",
        href: "./files/TEK-Bootcamp.pdf",
      },
      {
        id: "4",
        src: "img/Udemy-HTML-CSS-600.png",
        href: "./files/Udemy-html-css-certificate.jpg",
      },
      {
        id: "5",
        src: "img/GraphQL-LIL-600.png",
        href: "./files/GraphQL-LIL.pdf",
      },
    ];
    this.carouselInView = [1, 2, 3, 4, 5];
    this.carouselContainer;
    this.carouselPlayState;
  }

  mounted() {
    this.setupCarousel();
  }

  // Build carousel html
  setupCarousel() {
    const container = document.createElement("div");
    const controls = document.createElement("div");

    // Add container for carousel items and controls
    this.el.append(container, controls);
    container.className = "carousel-container";
    controls.className = "carousel-controls";

    // Take dataset array and append items to container
    this.carouselData.forEach((item, index) => {
      const carouselItem = item.src
        ? document.createElement("img")
        : document.createElement("div");

      const carouselLink = document.createElement("a");

      carouselLink.append(carouselItem);

      container.append(carouselLink);

      // Add item attributes
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselLink.className = `carousel-item carousel-item-${index + 1}`;

      carouselItem.src = item.src;
      carouselItem.setAttribute("loading", "lazy");
      // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
      carouselItem.setAttribute("data-index", `${index + 1}`);

      if (carouselLink.classList.contains("carousel-item-3")) {
        carouselLink.setAttribute("target", "_blank");
        carouselLink.setAttribute("href", item.href);
      }
    });

    this.carouselOptions.forEach((option) => {
      const btn = document.createElement("button");
      const axSpan = document.createElement("span");

      // Add accessibilty spans to button
      axSpan.innerText = option;
      axSpan.className = "ax-hidden";
      btn.append(axSpan);

      // Add button attributes
      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute("data-name", option);
      btn.innerText = option;

      // Add carousel control options
      controls.append(btn);
    });

    // After rendering carousel to our DOM, setup carousel controls' event listeners
    this.setControls([...controls.children]);

    // Set container property
    this.carouselContainer = container;
  }

  setControls(controls) {
    controls.forEach((control) => {
      control.onclick = (event) => {
        event.preventDefault();
        document.querySelector(".carousel-item-3").removeAttribute("href");
        document.querySelector(".carousel-item-3").removeAttribute("target");
        // Manage control actions, update our carousel data first then with a callback update our DOM
        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === "Previous") return this.previous();
    if (control === "Next") return this.next();
    if (control === "add") return this.add();
    if (control === "play") return this.play();

    return;
  }

  previous() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.unshift(this.carouselData.pop());

    // Push the first item to the end of the array so that the previous item is front and center
    this.carouselInView.push(this.carouselInView.shift());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${item}`;
      this.carouselContainer.children[
        index
      ].children[0].className = `carousel-item carousel-item-${item}`;

      if (`carousel-item-${item}` === `carousel-item-3`) {
        let dataLink =
          this.carouselContainer.children[index].children[0].getAttribute(
            "data-index"
          );
        let target = this.carouselData.find((x) => x.id === dataLink);
        this.carouselContainer.children[index].setAttribute("target", "_blank");
        this.carouselContainer.children[index].setAttribute(
          "href",
          target.href
        );
      }
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  next() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.push(this.carouselData.shift());

    // Take the last item and add it to the beginning of the array so that the next item is front and center
    this.carouselInView.unshift(this.carouselInView.pop());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${item}`;
      this.carouselContainer.children[
        index
      ].children[0].className = `carousel-item carousel-item-${item}`;

      if (`carousel-item-${item}` === `carousel-item-3`) {
        let dataLink =
          this.carouselContainer.children[index].children[0].getAttribute(
            "data-index"
          );
        let target = this.carouselData.find((x) => x.id === dataLink);
        this.carouselContainer.children[index].setAttribute("target", "_blank");
        this.carouselContainer.children[index].setAttribute(
          "href",
          target.href
        );
      }
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  // add() {
  //   const newItem = {
  //     id: "",
  //     src: "",
  //   };
  //   const lastItem = this.carouselData.length;
  //   const lastIndex = this.carouselData.findIndex(
  //     (item) => item.id == lastItem
  //   );

  //   // Assign properties for new carousel item
  //   Object.assign(newItem, {
  //     id: `${lastItem + 1}`,
  //     src: `http://fakeimg.pl/300/?text=${lastItem + 1}`,
  //   });

  //   // Then add it to the "last" item in our carouselData
  //   this.carouselData.splice(lastIndex + 1, 0, newItem);

  //   // Shift carousel to display new item
  //   this.next();
  // }

  // play() {
  //   const playBtn = document.querySelector(".carousel-control-play");
  //   const startPlaying = () => this.next();

  //   if (playBtn.classList.contains("playing")) {
  //     // Remove class to return to play button state/appearance
  //     playBtn.classList.remove("playing");

  //     // Remove setInterval
  //     clearInterval(this.carouselPlayState);
  //     this.carouselPlayState = null;
  //   } else {
  //     // Add class to change to pause button state/appearance
  //     playBtn.classList.add("playing");

  //     // First run initial next method
  //     this.next();

  //     // Use play state prop to store interval ID and run next method on a 1.5 second interval
  //     this.carouselPlayState = setInterval(startPlaying, 1500);
  //   }
  // }
}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el = document.querySelector(".carousel");
// Create a new carousel object
const exampleCarousel = new Carousel(el);
// Setup carousel and methods
exampleCarousel.mounted();
