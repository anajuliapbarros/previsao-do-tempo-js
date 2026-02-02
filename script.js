async function buscarClima() {
    const cidade = document.getElementById('cidadeInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;

    const elementoErro = document.getElementById('mensagemErro');
    const elementoResultado = document.getElementById('resultado');

    elementoErro.classList.add('escondido');
    elementoResultado.classList.add('escondido');

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }

        const dados = await resposta.json();
        exibirClima(dados);
        
    } catch (erro) {
        elementoErro.classList.remove('escondido');
        console.error("Erro na busca:", erro.message);
    }
}

function exibirClima(dados) {
    document.getElementById('nomeCidade').innerText = dados.name;
    document.getElementById('temperatura').innerText = `${Math.round(dados.main.temp)}°C`;
    document.getElementById('descricao').innerText = dados.weather[0].description;
    document.getElementById('umidade').innerText = `${dados.main.humidity}%`;
    
    const iconCode = dados.weather[0].icon;
    document.getElementById('iconeClima').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById('resultado').classList.remove('escondido');
}

document.getElementById('cidadeInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        buscarClima();
    }
});