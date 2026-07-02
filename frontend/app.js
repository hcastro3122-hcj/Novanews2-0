async function loadNews() {
  const res = await fetch("/api/news");
  const data = await res.json();

  const container = document.getElementById("news");
  container.innerHTML = "";

  // TOP STORY
  if (data.featured) {
    const top = document.createElement("div");
    top.className = "card featured";
    top.innerHTML = `
      <h2>🔥 ${data.featured.title}</h2>
      <p>${data.featured.source}</p>
    `;
    container.appendChild(top);
  }

  // TRENDING
  data.trending.forEach(n => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${n.title}</h3>
      <small>${n.category}</small>
    `;
    container.appendChild(div);
  });

  // RESTO
  data.feed.forEach(n => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<p>${n.title}</p>`;
    container.appendChild(div);
  });
}

loadNews();