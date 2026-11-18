gsap.registerPlugin(ScrollTrigger);



const panels = gsap.utils.toArray("#panels-container .panel");

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause"
});


var text = document.getElementById("hover");
text.addEventListener("mouseover", function () {
  text.textContent = "Is Rarely Plain and Simple";
});
text.addEventListener("mouseout", function () {
  text.textContent = "The Plain and Simple Truth";
});

const posterIds = [175560, 176420, 175798, 176515, 176310, 176347]

const baseURL = "https://manifests.collections.yale.edu/yuag/obj/";


async function getLux(id, panelId) {
  const response = await fetch(baseURL + id)
  const data = await response.json();
  console.log(data);

  const img = document.querySelector("#" + panelId + " img");
  img.src = data.items[0].thumbnail[0].id;
  img.alt = data.label.en[0];

  const label = document.createElement("h2");
  label.classList.add("poster-label");
  label.textContent = data.label.en[0];
  img.before(label);
}


posterIds.forEach(function (id, i) {
  getLux(id, "panel-" + (i + 1));
})


panels.forEach(function (panel) {
  const paragraph = panel.querySelector(".step-description");

  const button = document.createElement("button");
  button.classList.add("info-button");
  button.textContent = "...";
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", function () {
    const isOpen = paragraph.classList.toggle("visible");
    button.textContent = isOpen ? "Hide info" : "...";
    button.setAttribute("aria-expanded", isOpen);
  });


  paragraph.before(button);
});

/* Main navigation */
const panelsSection = document.querySelector("#panels");
const panelsContainer = document.querySelector("#panels-container");

/* Panels */
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#panels-container",
    pin: true,
    start: "top top",
    scrub: 1,
    snap: {
      snapTo: 1 / (panels.length - 1),
      duration: { min: 0.1, max: 0.1 }
    },
    end: () => "+=" + (panelsContainer.offsetWidth - innerWidth)
  }
});
