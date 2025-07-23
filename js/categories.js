const categoriesList = document.getElementById("categories");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!res.ok) {
    throw Error("Failed to fetch categories");
  }
  const categories = await res.json();

  categories.forEach((category) => {
    const { id, image, name } = category;
    const categoryItem = document.createElement("li");
    categoryItem.id = "category-" + id; 

    const img = document.createElement("img");
    img.src = image;

    const p = document.createElement("p");
    p.textContent = name;

    
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      fetchDeleteCategory(id);
    };

   
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const form = document.createElement("form");
    form.style.display = "none";
    form.innerHTML = `
      <input type="text" name="name" value="${name}" placeholder="name" />
      <input type="text" name="image" value="${image}" placeholder="image" />
      <button type="submit">Save</button>
    `;

    editBtn.onclick = () => {
      form.style.display = form.style.display === "block" ? "none" : "block";
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      fetchUpdateCategory(
        id,
        event.target.name.value,
        event.target.image.value,
        categoryItem
      );
    });

    
    categoryItem.append(p, img, deleteBtn, editBtn, form);
    categoryItem.classList.add("category-item");
    categoriesList.append(categoryItem);
  });
}

fetchCategories();


async function fetchUpdateCategory(id, name, image, categoryItem) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, image }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    categoryItem.firstChild.textContent = name;
    categoryItem.getElementsByTagName("img")[0].src = image;
  }
}


async function fetchDeleteCategory(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const categoryItem = document.getElementById("category-" + id);
    if (categoryItem) {
      categoryItem.remove();
    }
  } else {
    alert("Is not allowed to delete the category!!!");
  }
}
