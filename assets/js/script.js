window.onload = function() {
    const blogContainer = document.getElementById("blog-posts");
    if (!blogContainer) {
        console.error("Fel: Elementet #blog-posts hittades inte!");
        return;
    }

    fetch("assets/blogposts/blog.json?v=" + new Date().getTime())")
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
};
