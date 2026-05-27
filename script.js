const inventory = [];
const inventoryObjects = [];
const maxItems = 4;

const objects = document.querySelectorAll(".collectible");
const slots = document.querySelectorAll(".slot");

// Map of object combinations to archetype URLs
const archetypeMap = {
  "alien-lighter-moeda":"https://www.researchcatalogue.net/view/4308270/4494897",
  // Add more combinations below as needed
  // "lighter-moeda-pulseira": "https://www.researchcatalogue.net/view/DIFFERENT_ID",
  // "alien-moeda-pulseira": "https://www.researchcatalogue.net/view/ANOTHER_ID",
};

// event listener for each object
objects.forEach((object) => {
  object.addEventListener("click", () => {
    if (inventory.length >= maxItems) return;

    const image = object.dataset.image;
    const objectName = object.dataset.object;

    inventory.push(image);
    inventoryObjects.push(objectName);

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

  // check if inventory is full and redirect to appropriate archetype
  if (inventory.length >= maxItems) {
    setTimeout(() => {
      const archetypeURL = getArchetypeURL(inventoryObjects);
      window.location.href = archetypeURL;
    }, 1200);
  }
}

// function to determine archetype URL based on collected objects
function getArchetypeURL(objects) {
  const combination = objects.sort().join("-");

  // Return matching URL, or first archetype as default
  return (
    archetypeMap[combination] ||
    Object.values(archetypeMap)[0] ||
    "https://www.researchcatalogue.net/view/4308270/4494897"
  );
}

// persist inventory in localStorage
localStorage.setItem("inventory", JSON.stringify(inventory));
