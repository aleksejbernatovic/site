fetch('https://raw.githubusercontent.com/aleksejbernatovic/site/refs/heads/master/src/monuments.json')
  .then(response => response.json())
  .then(monuments => {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');
    const monument = monuments[index];

    const monumentDetailSection = document.getElementById('monument-detail');
    monumentDetailSection.innerHTML = `
      <div class="monument-detail">
        <img src="${monument.imageUrl}" alt="${monument.name}">
        <h2>${monument.description}</h2>
        <div id="map" style="height: 400px; width: 100%;"></div>
      </div>
    `;

    document.getElementById('back-button').addEventListener('click', () => {
      window.history.back();
    });

    // Update the header and h1 with the monument name
    document.querySelector('header h1').textContent = monument.name;
    document.title = monument.name;

    // Initialize the map
    ymaps.ready(init);

    function init() {
      const map = new ymaps.Map('map', {
        center: [monument.lat, monument.lng],
        zoom: 20
      });
      const placemark = new ymaps.Placemark([monument.lat, monument.lng], {
        balloonContent: `<b>${monument.name}</b><br>${monument.description}`
      });
      map.geoObjects.add(placemark);
    }
  });