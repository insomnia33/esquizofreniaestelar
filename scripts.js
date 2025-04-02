const converter = new showdown.Converter({
    extensions: [
        function () {
            return [
                {
                    type: 'output',
                    regex: /!\[([^\]]*)\]\(([^)]+)\)/g,
                    replace: function (match, alt, src) {
                        // Ajusta o caminho das imagens para a pasta images/
                        const imagePath = `images/${src}`;
                        return `<img src="${imagePath}" alt="${alt}" />`;
                    }
                }
            ];
        }
    ]
});


async function loadIntro() {
    try {
        const response = await fetch('texts/intro.md');
        const content = await response.text();
        document.getElementById('intro').innerHTML = converter.makeHtml(content);
    } catch (error) {
        console.error('Erro ao carregar intro:', error);
    }
}
// Variável global para cache dos contos
let cachedMdFiles = null;

// Carregamento inicial
window.onload = async () => {
    await loadIntro();
    preloadTextos(); // Precarrega os contos em segundo plano
};

async function preloadTextos() {
    try {
        const response = await fetch('texts.json');
        cachedMdFiles = await response.json();
        console.log('Contos pré-carregados:', cachedMdFiles);
    } catch (error) {
        console.error('Erro ao pré-carregar contos:', error);
    }
}

async function loadTextos() {
    showSection('textos');
    const container = document.getElementById('textos');

    try {
        // Usa o cache se disponível, caso contrário, faz a requisição
        const mdFiles = cachedMdFiles || (await (await fetch('texts.json')).json());

        if (mdFiles.length === 0) {
            container.innerHTML = '<p class="empty-message">Em desenvolvimento...</p>';
            return;
        }

        let htmlContent = '<div class="media-container">';
        for (const file of mdFiles) {
            if (file !== 'intro.md') {
                htmlContent += `
                    <div class="markdown-item">
                        <button onclick="loadTexto('texts/${file}')">${file.replace('.md', '')}</button>
                    </div>
                `;
            }
        }
        container.innerHTML = htmlContent + '</div>';
    } catch (error) {
        console.error('Erro ao carregar textos:', error);
        container.innerHTML = '<p class="empty-message">Nenhum texto encontrado</p>';
    }
}

async function loadTexto(filePath) {
    const container = document.getElementById('textos');
    
    try {
        const response = await fetch(filePath);
        const mdContent = await response.text();
        container.innerHTML = `
            <div class="markdown-content">
                ${converter.makeHtml(mdContent)}
            </div>
            <button onclick="loadTextos()" class="back-button">Voltar</button>
        `;
    } catch (error) {
        console.error(`Erro ao carregar o texto ${filePath}:`, error);
        container.innerHTML = '<p class="empty-message">Erro ao carregar o texto</p>';
    }
}

function showSection(sectionId) {
    // Esconde todos os conteúdos
    document.querySelectorAll('.content-display > div').forEach(div => {
        div.classList.add('hidden');
    });
    
    // Mostra a seção solicitada
    document.getElementById(sectionId).classList.remove('hidden');
}

async function loadAudios() {
    showSection('audios');
    const container = document.getElementById('audios');
    container.innerHTML = '<div class="media-container">';

    try {
        const response = await fetch('media.json');
        const media = await response.json();
        const audios = media.filter(item => item.type === 'audio');

        if(audios.length === 0) {
            container.innerHTML = '<p class="empty-message">Em desenvolvimento...</p>';
            return;
        }

        audios.forEach(audio => {
            container.innerHTML += `
                <div class="embed-container">
                    <iframe src="https://open.spotify.com/embed/${getSpotifyUri(audio.url)}"
                            width="100%" 
                            height="152" 
                            allowtransparency="true"></iframe>
                </div>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar áudios:', error);
        container.innerHTML = '<p class="empty-message">Erro ao carregar áudios</p>';
    }
}

async function loadVideos() {
    showSection('videos');
    const container = document.getElementById('videos');
    container.innerHTML = '<div class="media-container">';

    try {
        const response = await fetch('media.json');
        const media = await response.json();
        const videos = media.filter(item => item.type === 'video');

        if(videos.length === 0) {
            container.innerHTML = '<p class="empty-message">Em desenvolvimento...</p>';
            return;
        }

        videos.forEach(video => {
            const videoId = getYoutubeId(video.url);
            container.innerHTML += `
                <div class="embed-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}"
                            allowfullscreen>
                    </iframe>
                </div>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
        container.innerHTML = '<p class="empty-message">Erro ao carregar vídeos</p>';
    }
}


// Helpers
function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function getSpotifyUri(url) {
    const path = new URL(url).pathname;
    return path.startsWith('/') ? path.slice(1) : path;
}