const events = [
  {
    id: "agent-workshop",
    title: "Agent Workshop",
    category: "workshop",
    categoryLabel: "Workshop",
    time: "Today, 18:00",
    place: "Studio 4",
    description: "A practical session on turning vague tasks into checked loops.",
  },
  {
    id: "poetry-picnic",
    title: "Poetry Picnic",
    category: "outdoors",
    categoryLabel: "Outdoors",
    time: "Tomorrow, 13:30",
    place: "Riverside Lawn",
    description: "Blankets, paperbacks, lemonade, and five-minute readings.",
  },
  {
    id: "repair-cafe",
    title: "Repair Cafe",
    category: "community",
    categoryLabel: "Community",
    time: "Saturday, 10:00",
    place: "Makers Hall",
    description: "Bring one broken household object and learn how to fix it.",
  },
];

const eventList = document.querySelector("#events");
const categorySelect = document.querySelector("#category");
const favoriteStatus = document.querySelector("#favorite-status");
const favorites = new Set();

function renderEvents() {
  const selectedCategory = categorySelect.value;
  const visibleEvents = events.filter((event) => {
    return selectedCategory === "all" || event.category === selectedCategory;
  });

  eventList.replaceChildren(...visibleEvents.map(renderEvent));
}

function renderEvent(event) {
  const card = document.createElement("article");
  card.className = "event-card";
  card.setAttribute("aria-labelledby", `${event.id}-title`);

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${event.categoryLabel} - ${event.time}`;

  const title = document.createElement("h2");
  title.id = `${event.id}-title`;
  title.textContent = event.title;

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = event.description;

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const place = document.createElement("span");
  place.textContent = event.place;

  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "favorite";
  favorite.textContent = `Save ${event.title}`;
  favorite.setAttribute("aria-pressed", String(favorites.has(event.id)));
  favorite.addEventListener("click", () => {
    if (favorites.has(event.id)) {
      favorites.delete(event.id);
    } else {
      favorites.add(event.id);
    }

    favorite.setAttribute("aria-pressed", String(favorites.has(event.id)));
    updateFavoriteStatus();
  });

  footer.append(place, favorite);
  card.append(meta, title, description, footer);
  return card;
}

function updateFavoriteStatus() {
  const count = favorites.size;
  favoriteStatus.textContent = `Saved ${count} ${count === 1 ? "favorite" : "favorites"}`;
}

categorySelect.addEventListener("change", renderEvents);
renderEvents();
