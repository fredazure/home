document.addEventListener("DOMContentLoaded", function() {
    console.log("Scriptet körs!");
    fetch("../blogposts/blog.json")
        .then(response => response.json())
        .then(data => {
            const blogContainer = document.getElementById("blog-posts");
            data.forEach(post => {
                let postElement = document.createElement("div");
                postElement.innerHTML = `<h2>${post.title}</h2>
                                         <p><em>${post.date}</em></p>
                                         <p>${post.content}</p>`;
                blogContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error("Fel vid inläsning av bloggen:", error));
});
