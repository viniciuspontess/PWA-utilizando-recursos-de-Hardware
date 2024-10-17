document.getElementById('localizarBtn').addEventListener('click', function() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocalização não é suportada neste navegador.");
    }
});

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Usar uma API de mapas para converter as coordenadas em endereço
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('rua').innerText = data.address.road || 'Não disponível';
            document.getElementById('bairro').innerText = data.address.suburb || 'Não disponível';
            document.getElementById('resultado').style.display = 'block';
        })
        .catch(() => {
            alert("Não foi possível obter o endereço.");
        });
}

function error() {
    alert("Erro ao obter localização.");
}
