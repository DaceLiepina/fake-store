const listElement = document.getElementById("category-list");

async function fetchCategories() {
    
    const res = await fetch ("https://api.escuelajs.co/api/v1/categories");
    const categories = await res.json();
    console.log(categories)

    categories.forEach((category) => {

        const { name, image} = category;

        const categoryList = document.createElement("li");

        categoryList.classList.add("category-list");

        const catName = document.createElement("h2");

        const img = document.createElement("img");
        img.referrerPolicy = "no-referrer";

        catName.textContent = name;
        img.src = image;

        categoryList.append(catName, img);
         listElement.appendChild(categoryList);
    

 });
}
fetchCategories();