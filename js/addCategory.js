const form = document.getElementById("add-category-form");
const messageEl = document.getElementById("message");

form.addEventListener("submit", async(event)=>{
    event.preventDefault();

    const newCategory = {
        name: event.target.name.value,
        image: event.target.image.value,
    };
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: { "Content-Type": "application/json" }
});

if (res.ok) {
    messageEl.textContent = "Category added successfilly!";
    form.reset();
} else {
    messageEl.textContent = "Failed to add new category!"
}
    } catch(error) {
        messageEl.textContent = "ERROR while adding new category!!!";
    }
});