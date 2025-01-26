fetch('https://raw.githubusercontent.com/aleksejbernatovic/site/refs/heads/master/src/monuments.json')
  .then(response => response.json())
  .then(monuments => {
    const monumentsSection = document.getElementById('monuments');

    monuments.forEach((monument, index) => {
      const monumentElement = document.createElement('div');
      monumentElement.classList.add('monument');
      monumentElement.innerHTML = `
        <img src="${monument.imageUrl}" alt="${monument.name}">
        <h2>${monument.name}</h2>
      `;
      monumentElement.addEventListener('click', () => {
        window.location.href = `detail.html?index=${index}`;
      });
      monumentsSection.appendChild(monumentElement);
    });
  });