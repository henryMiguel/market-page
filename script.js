const inventory = [];
const maxItems = 4;

const objects = document.querySelectorAll(".collectible");
const slots = document.querySelectorAll(".slot");

// event listener for each object
objects.forEach((object) => {
  object.addEventListener("click", () => {
    if (inventory.length >= maxItems) return;

    const image = object.dataset.image;

    inventory.push(image);

    updateInventory();

    object.style.opacity = "0";
    object.style.pointerEvents = "none";
  });
});

// function to update inventory display
function updateInventory() {
  slots.forEach((slot, index) => {
    slot.innerHTML = "";

    if (inventory[index]) {
      const img = document.createElement("img");
      img.src = inventory[index];

      slot.appendChild(img);
    }
  });

  // check if inventory is full and redirect to archetype #1
  if (inventory.length >= maxItems) {
    setTimeout(() => {
      window.location.href =
        "https://www.researchcatalogue.net/view/4308270/4494897";
    }, 1200);
  }
}

// persist inventory in localStorage
localStorage.setItem("inventory", JSON.stringify(inventory));