console.log("Script.js laddat!");
document.addEventListener("DOMContentLoaded", function() {
    const blogContainer = document.getElementById("blogposts");
    if (!blogContainer) {
        console.error("Fel: Elementet #blogposts hittades inte!");
        return;
    }

    fetch("assets/blogposts/blog.json")
        .then(response => response.json())
        .then(data => {
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
