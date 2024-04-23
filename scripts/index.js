

// Define la clase Activity
class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

// Define la clase Repository
class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        this.id++
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

// Creamos una instancia de Repository
const repository = new Repository();

function buildActivity(activity) {
    const { id, title, description, imgUrl } = activity;

    const h3 = document.createElement("h3");
    h3.innerHTML = title
    const p = document.createElement("p");
    p.textContent = description
    const img = document.createElement("img");
    img.src = imgUrl;

    const card = document.createElement("div");

    card.className = "container";
    card.id = id;
    const button = document.createElement("button");
    button.innerHTML = "X"
    button.className = "btneliminar"

    button.addEventListener("click", () => {
        repository.deleteActivity(id)
        buildActivities()
    })
    card.appendChild(button)
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(h3);

    return card;

}
//funcion para renderizar tarjeta
function buildActivities() {
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = ""

    const allActivities = repository.getAllActivities()
    const HTMLActivities = allActivities.map((activity) => {

        return buildActivity(activity)
    });

    HTMLActivities.forEach(actividad => cardsContainer.append(actividad));
}

function handleClickSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const imgUrl = document.getElementById("imgurl");

    const titleValue = title.value;
    const descriptionValue = description.value;
    const imgUrlValue = imgUrl.value;
    if (!titleValue.trim() || !descriptionValue.trim() || !imgUrlValue.trim()) {
        alert("por favor, llena los campos.")
        return
    }

    repository.createActivity(title.value, description.value, imgUrl.value);
    buildActivities()


    title.value = "";
    description.value = "";
    imgUrl.value = "";
}

const buttonSubmit = document.getElementById("agregar-actividad");
buttonSubmit.addEventListener("click",
    handleClickSubmit
);

