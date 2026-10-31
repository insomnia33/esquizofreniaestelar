/**
 * Esquizofrenia Estelar 2.0 - Studio de Criação Local
 * Zero emojis - 100% typographic glyphs & vector SVG iconography
 * 
 * Funcionalidades:
 * - Persistência direta via File System Access API (showDirectoryPicker)
 * - Cache local de contingência (localStorage)
 * - Editor Markdown split-pane com prévia em tempo real (Showdown)
 * - Assistentes inteligentes de inserção de imagens, links e mídias
 * - Central de Transmissões (YouTube e Spotify)
 * - Ditado por voz nativo contínuo com pontuação automática (Web Speech API)
 * - Quadro de anotações e tópicos futuros (catalog.notes)
 * - Laboratório de Design com atualização dinâmica do tema e CosmosEngine
 * - Regeneração automática dos arquivos legados texts.json e media.json
 */

(function() {
  'use strict';

  // =========================================================================
  // DADOS PADRÃO DE INICIALIZAÇÃO (FALLBACK OFFLINE / SEM PASTA)
  // =========================================================================

  var DEFAULT_CATALOG = {
    "version": "2.0",
    "updatedAt": new Date().toISOString(),
    "introFile": "texts/intro.md",
    "categories": [
      "Raças & Entidades",
      "Crônicas & Sagas",
      "Transmissões Sonoras",
      "Registros Visuais",
      "Arquivos Técnicos"
    ],
    "items": [
      {
        "id": "01-os-arquivistas",
        "title": "Os Arquivistas",
        "slug": "os-arquivistas",
        "type": "text",
        "status": "published",
        "category": "Raças & Entidades",
        "saga": "Cérebro de Matriosca",
        "tags": ["Maltuks", "Quinta Dimensão", "Máquinas Sencientes"],
        "summary": "Apresentação do primeiro contato com um Maltuk e suas canções em vibrações inexplicáveis traduzidas pelas máquinas sencientes zeladoras do Arquivo.",
        "coverImage": "images/maltuk1.png",
        "file": "texts/01_os_arquivistas.md",
        "readingTime": 2,
        "createdAt": "2025-01-15",
        "relatedIds": ["02-metamorphis", "audio-podcast-estelar"]
      },
      {
        "id": "02-metamorphis",
        "title": "A Saga Metamorphis",
        "slug": "a-saga-metamorphis",
        "type": "text",
        "status": "published",
        "category": "Crônicas & Sagas",
        "saga": "Conselho Solar da Nova Era",
        "tags": ["Conselho Solar", "Maltuks", "Thyrexianos", "Prelúdio do Caos"],
        "summary": "Prelúdio do Caos: registros sobre a formação, ascensão e declínio do Conselho Solar da Nova Era e as tensões entre Maltuks e Thyrexianos mecanos.",
        "coverImage": "images/conselho_solar_01.png",
        "file": "texts/02_metamorphis.md",
        "readingTime": 2,
        "createdAt": "2025-02-10",
        "relatedIds": ["01-os-arquivistas"]
      },
      {
        "id": "audio-podcast-estelar",
        "title": "Podcast Estelar",
        "slug": "podcast-estelar",
        "type": "audio",
        "status": "published",
        "category": "Transmissões Sonoras",
        "saga": "Ecos da Quinta Dimensão",
        "tags": ["Podcast", "Transmissão", "Multiverso"],
        "summary": "Frequência de áudio captada nos setores externos do Cérebro de Matriosca — relatos narrados sobre as realidades simuladas.",
        "url": "https://open.spotify.com/episode/4D7Spo0DC4JL6r36zhKAZe",
        "createdAt": "2025-01-20",
        "relatedIds": ["01-os-arquivistas"]
      },
      {
        "id": "video-coleta-sisab-gestantes",
        "title": "Exercício de coleta de dados SISAB - Gestantes",
        "slug": "exercicio-coleta-dados-sisab-gestantes",
        "type": "video",
        "status": "published",
        "category": "Arquivos Técnicos",
        "saga": "Arquivos do Multiverso",
        "tags": ["SISAB", "Dados", "Saúde Pública", "Instrução Técnica"],
        "summary": "Exercício técnico de extração e consolidação de registros de dados no sistema de informação em saúde.",
        "url": "https://youtu.be/j-t7r_016bM",
        "createdAt": "2024-11-10",
        "relatedIds": []
      },
      {
        "id": "video-ilya-breshov",
        "title": "Ilya Breshov - dlya nashego zdorov'ya",
        "slug": "ilya-breshov-dlya-nashego-zdorovya",
        "type": "video",
        "status": "published",
        "category": "Registros Visuais",
        "saga": "Transmissões Terrestres",
        "tags": ["Registro Audiovisual", "Ilya Breshov", "Histórico"],
        "summary": "Registro audiovisual histórico resgatado dos arquivos terrestres antigos.",
        "url": "https://youtu.be/VeegmvsqbcQ",
        "createdAt": "2024-12-05",
        "relatedIds": []
      },
      {
        "id": "video-itk-snap-segmentacao",
        "title": "ITK-SNAP - Segmentação de RM Flair",
        "slug": "itk-snap-segmentacao-rm-flair",
        "type": "video",
        "status": "published",
        "category": "Arquivos Técnicos",
        "saga": "Neurociência Computacional",
        "tags": ["ITK-SNAP", "Ressonância Magnética", "Segmentação", "Neuroimagem"],
        "summary": "Procedimento de segmentação volumétrica em imagens de ressonância magnética utilizando protocolo Flair no ITK-SNAP.",
        "url": "https://youtu.be/bPWUpCkYksM",
        "createdAt": "2025-01-08",
        "relatedIds": ["01-os-arquivistas"]
      }
    ],
    "notes": [
      {
        "id": "note-catedral-neuronios",
        "title": "Catedral de Neurônios Sintéticos - A Estrela Branca",
        "category": "Crônicas & Sagas",
        "tags": ["Cérebro de Matriosca", "Estrela Branca", "Supercomputador", "Cosmologia"],
        "content": "A estrutura de esferas concêntricas captura a radiação total da anã branca moribunda para alimentar os bilhões de nós sinápticos. As mentes arquivadas não sabem que habitam um invólucro estelar.",
        "createdAt": "2025-02-15"
      },
      {
        "id": "note-cantos-maltuks",
        "title": "Anatomia e Cantos Vibracionais dos Maltuks",
        "category": "Raças & Entidades",
        "tags": ["Maltuks", "Anatomia", "Bioacústica", "Quinta Dimensão"],
        "content": "Com carapaças quitinosas de reflexo obsidiano e órgãos ressonantes na cavidade torácica, os Maltuks emitem frequências moduladas capazes de desestabilizar hologramas e sintonizar cordas dimensionais.",
        "createdAt": "2025-02-18"
      }
    ]
  };

  var DEFAULT_THEME = {
    "activePreset": "matrioshka-amber",
    "colors": {
      "bgPrimary": "#050609",
      "bgSecondary": "#0b0e16",
      "bgSurface": "rgba(12, 17, 26, 0.82)",
      "textPrimary": "#e6edf5",
      "textSecondary": "#8b9bb4",
      "accentPrimary": "#e6a817",
      "accentSecondary": "#00f0ff",
      "matrixGlow": "#00ff9d",
      "border": "rgba(230, 168, 23, 0.28)"
    },
    "typography": {
      "fontDisplay": "'Orbitron', sans-serif",
      "fontBody": "'Space Grotesk', sans-serif",
      "fontReading": "'Merriweather', Georgia, serif",
      "fontMono": "'JetBrains Mono', monospace",
      "baseSizePx": 18,
      "lineHeight": 1.75
    },
    "cosmos": {
      "starCount": 150,
      "matrixStreamCount": 32,
      "speed": 0.45,
      "nebulaOpacity": 0.35,
      "matrixOpacity": 0.18,
      "pauseOnReading": true
    },
    "presets": {
      "matrioshka-amber": {
        "name": "Matrioshka Amber",
        "description": "Padrao de ouro quente e ambar estelar inspirado no nucleo de energia do Cerebro de Matriosca.",
        "colors": {
          "bgPrimary": "#050609",
          "bgSecondary": "#0b0e16",
          "bgSurface": "rgba(12, 17, 26, 0.82)",
          "textPrimary": "#e6edf5",
          "textSecondary": "#8b9bb4",
          "accentPrimary": "#e6a817",
          "accentSecondary": "#00f0ff",
          "matrixGlow": "#00ff9d",
          "border": "rgba(230, 168, 23, 0.28)"
        },
        "cosmos": {
          "starCount": 150,
          "matrixStreamCount": 32,
          "speed": 0.45,
          "nebulaOpacity": 0.35,
          "matrixOpacity": 0.18
        }
      },
      "matrix-emerald": {
        "name": "Matrix Emerald",
        "description": "Fluxo denso de glifos esmeralda e terminal bio-cibernetico dos zeladores do Arquivo.",
        "colors": {
          "bgPrimary": "#030806",
          "bgSecondary": "#06130c",
          "bgSurface": "rgba(6, 19, 12, 0.85)",
          "textPrimary": "#e0f8ed",
          "textSecondary": "#72a98f",
          "accentPrimary": "#00ff88",
          "accentSecondary": "#38ef7d",
          "matrixGlow": "#00ff66",
          "border": "rgba(0, 255, 136, 0.28)"
        },
        "cosmos": {
          "starCount": 120,
          "matrixStreamCount": 48,
          "speed": 0.55,
          "nebulaOpacity": 0.25,
          "matrixOpacity": 0.28
        }
      },
      "cyber-nebula-cyan": {
        "name": "Cyber Nebula Cyan",
        "description": "Resfriamento criogenico e radiacao Cerenkov dos condutores de dados quanticos.",
        "colors": {
          "bgPrimary": "#040914",
          "bgSecondary": "#081326",
          "bgSurface": "rgba(8, 19, 38, 0.82)",
          "textPrimary": "#e0f2fe",
          "textSecondary": "#7dd3fc",
          "accentPrimary": "#00f0ff",
          "accentSecondary": "#7000ff",
          "matrixGlow": "#38bdf8",
          "border": "rgba(0, 240, 255, 0.28)"
        },
        "cosmos": {
          "starCount": 180,
          "matrixStreamCount": 28,
          "speed": 0.4,
          "nebulaOpacity": 0.4,
          "matrixOpacity": 0.16
        }
      },
      "crimson-singularity": {
        "name": "Crimson Singularity",
        "description": "Horizonte de eventos de buraco negro e alerta de colapso de dobra dimensional dos Thyrexianos.",
        "colors": {
          "bgPrimary": "#0c0406",
          "bgSecondary": "#18080c",
          "bgSurface": "rgba(24, 8, 12, 0.85)",
          "textPrimary": "#ffe4e6",
          "textSecondary": "#fb7185",
          "accentPrimary": "#ff2a5f",
          "accentSecondary": "#f59e0b",
          "matrixGlow": "#ff0055",
          "border": "rgba(255, 42, 95, 0.3)"
        },
        "cosmos": {
          "starCount": 140,
          "matrixStreamCount": 26,
          "speed": 0.5,
          "nebulaOpacity": 0.45,
          "matrixOpacity": 0.2
        }
      }
    }
  };

  var DEFAULT_TEXT_FILES = {
    "texts/intro.md": "# Bem-vindo aos Arquivos do Multiverso\n\nDiante de você, o futuro da humanidade desdobra-se — um cosmos onde o familiar dissolve-se no extraordinário. Imagine a luz de um sol artificial filtrando-se pelas frestas de uma megaestrutura, tão colossal que, à distância, confunde-se com uma constelação feita pela mão humana.  \n\nNo coração desse universo pulsante, ergue-se o o Computador no Fim do Universo, um Cérebro de Matriosca, obra-prima da engenhosidade da vida, uma catedral de neurônios sintéticos que abriga trilhões de mentes vivendo incontáveis cenários. Alimentadas pela energia de uma estrela branca, essas consciências habitam realidades virtuais — sonhos eternos moldados pela curiosidade do universo em conhecer a si mesmo.  \n\nA missão de vigiar esse equilíbrio delicado são dos Maltuks, arquivistas e sacerdotes enigmáticos, cujos segredos serão cantados adiante por eles mesmos, e suas máquinas sencientes zeladoras. Juntos, enfrentam catástrofes cósmicas enquanto selecionam as realidades dignas de compor O Arquivo.  \n\nCada história aqui preservada é um universo em si mesma. Cada linha que você lerá a seguir é uma fenda por onde escapa o infinito. Parabéns por chegar até aqui, pois além desse portal da quinta dimensão, estão os Arquivos do Multiverso.",
    "texts/01_os_arquivistas.md": "# Os Arquivistas\n\n* Apresentação do primeiro contato com um Maltuk (O Arquivista)\n* Contar a história dos Maltuks e seu propósito\n* Os Maltuks cantam canções em vibrações inexplicáveis, somente presenciando tal proeza para compreender esse fenômeno. Aqui é uma tradução descritiva auxiliada pelas máquinas sencientes, o sistema que permite a interação entre nós seres vivos dessa dimensão, e os arautos do fim do mundo\n* \n\nMaltuk Arquivista\n<img src=\"images/maltuk1.png\" alt=\"Maltuk e seu manto\" width=\"333\"/>\n\nMaltuk Priestess\n<img src=\"images/maltuk2.jpg\" alt=\"Maltuk Priestess\" width=\"333\"/>",
    "texts/02_metamorphis.md": "# A Saga Metamorphis\n\n## Prelúdio do Caos\n\n* Transcrever aqui as notas do papel sobre a história da formação, ascenção e declínio do Conselho Solar da Nova Era.\n\nEsboço inicial do banner:\n* Os Maltuks ao centro deveriam ser mais insetídeos\n* Os Thyrexianos mecanos da esquerda ao meio são mais reptlianos tecnologicos\n\n\n<img src=\"images/conselho_solar_01.png\" alt=\"Maltuk e seu manto\" width=\"333\"/>"
  };

  // =========================================================================
  // ESTADO GLOBAL DO STUDIO
  // =========================================================================

  var state = {
    dirHandle: null,
    catalog: JSON.parse(JSON.stringify(DEFAULT_CATALOG)),
    theme: JSON.parse(JSON.stringify(DEFAULT_THEME)),
    markdownFiles: Object.assign({}, DEFAULT_TEXT_FILES),
    images: [
      { name: "maltuk1.png", path: "images/maltuk1.png" },
      { name: "maltuk2.jpg", path: "images/maltuk2.jpg" },
      { name: "conselho_solar_01.png", path: "images/conselho_solar_01.png" }
    ],
    activeItemId: "01-os-arquivistas",
    activeFilter: "all",
    searchQuery: "",
    isSaving: false,
    hasUnsavedChanges: false,
    
    // Web Speech State
    speechRecognition: null,
    isRecordingVoiceTab: false,
    isRecordingEditorCursor: false,
    audioContext: null,
    analyserNode: null,
    mediaStream: null,
    visualizerAnimId: null,

    // Showdown converter
    converter: null
  };

  // =========================================================================
  // INICIALIZAÇÃO
  // =========================================================================

  document.addEventListener('DOMContentLoaded', function() {
    initShowdown();
    initThemeFromConfig();
    bindEvents();
    loadLocalBackupOrFetch();
  });

  function initShowdown() {
    if (typeof showdown !== 'undefined') {
      state.converter = new showdown.Converter({
        tables: true,
        strikethrough: true,
        simplifiedAutoLink: true,
        openLinksInNewWindow: true,
        tasklists: true
      });
    } else {
      // Fallback simples se Showdown demorar ou falhar no CDN
      state.converter = {
        makeHtml: function(text) {
          if (!text) return '';
          return text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<p></p>');
        }
      };
    }
  }

  // =========================================================================
  // PERSISTÊNCIA E CARGA DE DADOS
  // =========================================================================

  function loadLocalBackupOrFetch() {
    // 1. Tentar ler do localStorage primeiro (se houver rascunho anterior)
    try {
      var cached = localStorage.getItem('ee_studio_backup');
      if (cached) {
        var parsed = JSON.parse(cached);
        if (parsed.catalog && Array.isArray(parsed.catalog.items)) {
          state.catalog = parsed.catalog;
        }
        if (parsed.theme) {
          state.theme = parsed.theme;
        }
        if (parsed.markdownFiles) {
          state.markdownFiles = Object.assign({}, DEFAULT_TEXT_FILES, parsed.markdownFiles);
        }
      }
    } catch (e) {
      console.warn('Erro ao ler cache local:', e);
    }

    // 2. Tentar fazer fetch do catalog.json e theme.json do servidor local caso esteja rodando HTTP
    if (window.location.protocol.startsWith('http')) {
      Promise.all([
        fetch('catalog.json').then(function(r) { return r.ok ? r.json() : null; }).catch(function() { return null; }),
        fetch('theme.json').then(function(r) { return r.ok ? r.json() : null; }).catch(function() { return null; }),
        fetch('texts/01_os_arquivistas.md').then(function(r) { return r.ok ? r.text() : null; }).catch(function() { return null; }),
        fetch('texts/02_metamorphis.md').then(function(r) { return r.ok ? r.text() : null; }).catch(function() { return null; })
      ]).then(function(results) {
        var cat = results[0];
        var thm = results[1];
        var txt1 = results[2];
        var txt2 = results[3];

        if (cat && cat.items) state.catalog = cat;
        if (thm && thm.colors) state.theme = thm;
        if (txt1) state.markdownFiles['texts/01_os_arquivistas.md'] = txt1;
        if (txt2) state.markdownFiles['texts/02_metamorphis.md'] = txt2;

        applyTheme(state.theme);
        renderAllWorkspaces();
      }).catch(function() {
        applyTheme(state.theme);
        renderAllWorkspaces();
      });
    } else {
      applyTheme(state.theme);
      renderAllWorkspaces();
    }
  }

  // =========================================================================
  // FILE SYSTEM ACCESS API (CONEXÃO COM PASTA LOCAL)
  // =========================================================================

  async function connectProjectDirectory() {
    if (!('showDirectoryPicker' in window)) {
      showToast('Navegador sem suporte direto à File System Access API. Use Chrome, Edge ou Brave para gravação no disco. Cache local ativado!', 'warning');
      return;
    }

    try {
      var dirHandle = await window.showDirectoryPicker({
        mode: 'readwrite'
      });

      // Validação de permissão de escrita
      var opts = { mode: 'readwrite' };
      if ((await dirHandle.queryPermission(opts)) !== 'granted') {
        if ((await dirHandle.requestPermission(opts)) !== 'granted') {
          showToast('Permissão de gravação negada para a pasta.', 'error');
          return;
        }
      }

      state.dirHandle = dirHandle;

      // 1. Ler catalog.json se existir
      try {
        var catFileHandle = await dirHandle.getFileHandle('catalog.json');
        var catFile = await catFileHandle.getFile();
        var catText = await catFile.text();
        state.catalog = JSON.parse(catText);
      } catch (err) {
        console.log('catalog.json novo ou mantido do estado');
      }

      // 2. Ler theme.json se existir
      try {
        var thmFileHandle = await dirHandle.getFileHandle('theme.json');
        var thmFile = await thmFileHandle.getFile();
        var thmText = await thmFile.text();
        state.theme = JSON.parse(thmText);
      } catch (err) {
        console.log('theme.json novo ou mantido do estado');
      }

      // 3. Ler todos os arquivos .md dentro da pasta texts/
      try {
        var textsDir = await dirHandle.getDirectoryHandle('texts');
        for await (var entry of textsDir.values()) {
          if (entry.kind === 'file' && entry.name.endsWith('.md')) {
            var f = await entry.getFile();
            var text = await f.text();
            state.markdownFiles['texts/' + entry.name] = text;
            state.markdownFiles[entry.name] = text;
          }
        }
      } catch (err) {
        console.log('Diretório texts/ carregado');
      }

      // 4. Listar imagens da pasta images/
      try {
        var imagesDir = await dirHandle.getDirectoryHandle('images');
        var foundImages = [];
        for await (var imgEntry of imagesDir.values()) {
          if (imgEntry.kind === 'file' && /\.(png|jpe?g|webp|gif|svg)$/i.test(imgEntry.name)) {
            var imgFile = await imgEntry.getFile();
            var objUrl = URL.createObjectURL(imgFile);
            foundImages.push({
              name: imgEntry.name,
              path: 'images/' + imgEntry.name,
              url: objUrl
            });
          }
        }
        if (foundImages.length > 0) {
          state.images = foundImages;
        }
      } catch (err) {
        console.log('Diretório images/ carregado');
      }

      // Atualizar badge de conexão
      updateConnectionStatus(true, dirHandle.name);
      applyTheme(state.theme);
      renderAllWorkspaces();
      showToast('[ SISTEMA: CONEXÃO ESTABELECIDA COM A PASTA ' + dirHandle.name.toUpperCase() + ' ]', 'success');

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Erro ao conectar pasta:', err);
        showToast('Erro ao acessar a pasta do projeto: ' + err.message, 'error');
      }
    }
  }

  function updateConnectionStatus(isConnected, folderName) {
    var indicator = document.getElementById('connection-indicator');
    var label = document.getElementById('connection-status-text');

    if (isConnected) {
      indicator.className = 'status-dot mode-fs';
      label.textContent = 'PASTA CONECTADA: ' + (folderName || 'esquizofreniaestelar') + ' [GRAVAÇÃO DIRETA NO DISCO]';
    } else {
      indicator.className = 'status-dot mode-local';
      label.textContent = 'MODO NAVEGADOR (CACHE LOCAL)';
    }
  }

  // =========================================================================
  // SALVAR TUDO NO PROJETO
  // =========================================================================

  async function saveAllToProject() {
    saveActiveItemMetadataFromUI();

    // 1. Atualizar timestamp do catálogo
    state.catalog.updatedAt = new Date().toISOString();

    // 2. Salvar backup no localStorage
    try {
      localStorage.setItem('ee_studio_backup', JSON.stringify({
        catalog: state.catalog,
        theme: state.theme,
        markdownFiles: state.markdownFiles,
        timestamp: state.catalog.updatedAt
      }));
    } catch (e) {
      console.warn('Erro ao salvar backup no localStorage:', e);
    }

    // 3. Se houver pasta conectada via File System Access API, gravar arquivos no disco!
    if (state.dirHandle) {
      try {
        state.isSaving = true;

        // A. Gravar catalog.json
        var catHandle = await state.dirHandle.getFileHandle('catalog.json', { create: true });
        var catWritable = await catHandle.createWritable();
        await catWritable.write(JSON.stringify(state.catalog, null, 2));
        await catWritable.close();

        // B. Gravar theme.json
        var thmHandle = await state.dirHandle.getFileHandle('theme.json', { create: true });
        var thmWritable = await thmHandle.createWritable();
        await thmWritable.write(JSON.stringify(state.theme, null, 2));
        await thmWritable.close();

        // C. Gravar arquivos .md na pasta texts/
        var textsDir = await state.dirHandle.getDirectoryHandle('texts', { create: true });
        for (var filePath in state.markdownFiles) {
          if (Object.prototype.hasOwnProperty.call(state.markdownFiles, filePath)) {
            var fileName = filePath.replace(/^texts\//, '');
            var content = state.markdownFiles[filePath];
            var fHandle = await textsDir.getFileHandle(fileName, { create: true });
            var fWritable = await fHandle.createWritable();
            await fWritable.write(content);
            await fWritable.close();
          }
        }

        // D. Gravar imagens novas na pasta images/
        var imagesDir = await state.dirHandle.getDirectoryHandle('images', { create: true });
        for (var i = 0; i < state.images.length; i++) {
          var img = state.images[i];
          if (img.isNew && img.blob) {
            var imgHandle = await imagesDir.getFileHandle(img.name, { create: true });
            var imgWritable = await imgHandle.createWritable();
            await imgWritable.write(img.blob);
            await imgWritable.close();
            img.isNew = false;
          }
        }

        // E. REGENERAR texts.json (Compatibilidade com index.html legado)
        // Array com todos os nomes de arquivo .md de contos publicados
        var publishedTexts = ["intro.md"];
        state.catalog.items.forEach(function(item) {
          if (item.type === 'text' && item.status === 'published' && item.file) {
            var rawName = item.file.replace(/^texts\//, '');
            if (publishedTexts.indexOf(rawName) === -1) {
              publishedTexts.push(rawName);
            }
          }
        });

        var textsJsonHandle = await state.dirHandle.getFileHandle('texts.json', { create: true });
        var textsJsonWritable = await textsJsonHandle.createWritable();
        await textsJsonWritable.write(JSON.stringify(publishedTexts, null, 4));
        await textsJsonWritable.close();

        // F. REGENERAR media.json (Compatibilidade com index.html legado)
        // Array com objetos de midias publicadas
        var publishedMedia = [];
        state.catalog.items.forEach(function(item) {
          if ((item.type === 'video' || item.type === 'audio') && item.status === 'published') {
            publishedMedia.push({
              type: item.type,
              title: item.title,
              url: item.url
            });
          }
        });

        var mediaJsonHandle = await state.dirHandle.getFileHandle('media.json', { create: true });
        var mediaJsonWritable = await mediaJsonHandle.createWritable();
        await mediaJsonWritable.write(JSON.stringify(publishedMedia, null, 4));
        await mediaJsonWritable.close();

        state.isSaving = false;
        state.hasUnsavedChanges = false;
        updateSaveStatusIndicator('Salvo no disco');
        showToast('[ SISTEMA: DADOS GRAVADOS COM SUCESSO NO DISCO ]', 'success');
        return;

      } catch (err) {
        state.isSaving = false;
        console.error('Erro ao gravar no disco:', err);
        showToast('Falha ao gravar no disco: ' + err.message, 'error');
        return;
      }
    }

    // Se não estiver conectado a uma pasta
    updateSaveStatusIndicator('Salvo no cache local');
    showToast('[ SISTEMA: ALTERAÇÕES SALVAS NO CACHE LOCAL. CONECTE A PASTA PARA GRAVAR NO DISCO ]', 'info');
  }

  function updateSaveStatusIndicator(text) {
    var el = document.getElementById('stat-save-status');
    if (el) el.textContent = text;
  }

  // =========================================================================
  // GESTÃO DE RENDERIZAÇÃO GERAL
  // =========================================================================

  function renderAllWorkspaces() {
    renderSidebarRecordsList();
    loadActiveStoryToEditor();
    renderMediaWorkspace();
    renderVoiceWorkspace();
    renderThemeWorkspace();
    updateCoverSelectors();
  }

  // =========================================================================
  // ABA 1: CONTOS & EDITOR MARKDOWN
  // =========================================================================

  function renderSidebarRecordsList() {
    var listEl = document.getElementById('records-list');
    var counterEl = document.getElementById('records-counter');
    if (!listEl) return;

    var items = state.catalog.items.filter(function(item) {
      // Filtro por tipo/status
      if (state.activeFilter === 'text' && item.type !== 'text') return false;
      if (state.activeFilter === 'audio' && item.type !== 'audio') return false;
      if (state.activeFilter === 'video' && item.type !== 'video') return false;
      if (state.activeFilter === 'draft' && item.status !== 'draft') return false;

      // Filtro por busca
      if (state.searchQuery) {
        var q = state.searchQuery.toLowerCase();
        var matchTitle = (item.title || '').toLowerCase().indexOf(q) !== -1;
        var matchSaga = (item.saga || '').toLowerCase().indexOf(q) !== -1;
        var matchCategory = (item.category || '').toLowerCase().indexOf(q) !== -1;
        var matchTags = (item.tags || []).some(function(t) { return t.toLowerCase().indexOf(q) !== -1; });
        return matchTitle || matchSaga || matchCategory || matchTags;
      }
      return true;
    });

    if (counterEl) {
      counterEl.textContent = items.length;
    }

    listEl.innerHTML = '';

    if (items.length === 0) {
      var emptyEl = document.createElement('div');
      emptyEl.className = 'placeholder-text';
      emptyEl.style.padding = '24px 10px';
      emptyEl.textContent = 'Nenhum registro encontrado para este filtro.';
      listEl.appendChild(emptyEl);
      return;
    }

    items.forEach(function(item) {
      var itemEl = document.createElement('div');
      itemEl.className = 'record-item' + (item.id === state.activeItemId ? ' active' : '');
      itemEl.dataset.id = item.id;

      // Status badge class
      var statusBadgeClass = item.status === 'published' ? 'badge-emerald' : 'badge-amber';
      var statusLabel = item.status === 'published' ? 'PUB' : 'RASC';

      // Type badge
      var typeBadgeClass = item.type === 'text' ? 'badge-cyan' : (item.type === 'audio' ? 'badge-amber' : 'badge-purple');
      var typeLabel = item.type === 'text' ? 'TEXTO' : (item.type === 'audio' ? 'ÁUDIO' : 'VÍDEO');

      itemEl.innerHTML = 
        '<div class="record-item-top">' +
          '<span class="record-title">' + escapeHtml(item.title || 'Sem Título') + '</span>' +
          '<div style="display:flex;gap:4px;">' +
            '<span class="badge ' + typeBadgeClass + '">' + typeLabel + '</span>' +
            '<span class="badge ' + statusBadgeClass + '">' + statusLabel + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="record-meta-line">' +
          '<span class="record-saga">' + escapeHtml(item.saga || item.category || '') + '</span>' +
          '<span>' + (item.type === 'text' ? (item.readingTime ? '~' + item.readingTime + ' min' : '~1 min') : 'MÍDIA') + '</span>' +
        '</div>' +
        '<div class="record-quick-actions">' +
          '<button class="btn btn-tiny btn-ghost btn-dup" data-id="' + item.id + '" type="button">DUPLICAR</button>' +
          '<button class="btn btn-tiny btn-ghost btn-del" data-id="' + item.id + '" type="button" style="color:var(--color-danger)">EXCLUIR</button>' +
        '</div>';

      itemEl.addEventListener('click', function(e) {
        if (e.target.closest('.record-quick-actions')) return;
        selectRecordItem(item.id);
      });

      // Duplicar
      var btnDup = itemEl.querySelector('.btn-dup');
      if (btnDup) {
        btnDup.addEventListener('click', function(e) {
          e.stopPropagation();
          duplicateRecordItem(item.id);
        });
      }

      // Excluir
      var btnDel = itemEl.querySelector('.btn-del');
      if (btnDel) {
        btnDel.addEventListener('click', function(e) {
          e.stopPropagation();
          deleteRecordItem(item.id);
        });
      }

      listEl.appendChild(itemEl);
    });
  }

  function selectRecordItem(id) {
    saveActiveItemMetadataFromUI();
    state.activeItemId = id;
    renderSidebarRecordsList();
    loadActiveStoryToEditor();
  }

  function createNewStory() {
    saveActiveItemMetadataFromUI();

    var timestamp = Date.now();
    var count = state.catalog.items.filter(function(i) { return i.type === 'text'; }).length + 1;
    var slug = 'novo-conto-' + count;
    var filename = 'texts/' + slug + '.md';

    var newItem = {
      id: 'story-' + timestamp,
      title: 'Novo Conto Estelar ' + count,
      slug: slug,
      type: 'text',
      status: 'draft',
      category: 'Crônicas & Sagas',
      saga: 'Cérebro de Matriosca',
      tags: ['Novo Conto', 'Rascunho'],
      summary: 'Resumo preliminar desta narrativa do multiverso...',
      coverImage: 'images/maltuk1.png',
      file: filename,
      readingTime: 1,
      createdAt: new Date().toISOString().split('T')[0],
      relatedIds: []
    };

    state.markdownFiles[filename] = '# ' + newItem.title + '\n\nComece a escrever sua narrativa cósmica aqui...\n';
    state.catalog.items.unshift(newItem);
    state.activeItemId = newItem.id;

    renderSidebarRecordsList();
    loadActiveStoryToEditor();
    showToast('[ NOVO RASCUNHO DE CONTO CRIADO ]', 'info');
  }

  function duplicateRecordItem(id) {
    saveActiveItemMetadataFromUI();

    var original = state.catalog.items.find(function(i) { return i.id === id; });
    if (!original) return;

    var copy = JSON.parse(JSON.stringify(original));
    copy.id = 'item-' + Date.now();
    copy.title = copy.title + ' (Cópia)';
    copy.slug = copy.slug + '-copia';
    copy.status = 'draft';

    if (copy.type === 'text') {
      copy.file = 'texts/' + copy.slug + '.md';
      var originalContent = state.markdownFiles[original.file] || '';
      state.markdownFiles[copy.file] = originalContent;
    }

    state.catalog.items.unshift(copy);
    state.activeItemId = copy.id;

    renderSidebarRecordsList();
    loadActiveStoryToEditor();
    showToast('[ REGISTRO DUPLICADO COMO RASCUNHO ]', 'info');
  }

  function deleteRecordItem(id) {
    var item = state.catalog.items.find(function(i) { return i.id === id; });
    if (!item) return;

    if (!confirm('Deseja realmente excluir o registro "' + item.title + '"? Esta ação não pode ser desfeita.')) {
      return;
    }

    state.catalog.items = state.catalog.items.filter(function(i) { return i.id !== id; });

    // Se excluiu o item ativo, seleciona o primeiro disponível
    if (state.activeItemId === id) {
      state.activeItemId = state.catalog.items.length > 0 ? state.catalog.items[0].id : null;
    }

    renderSidebarRecordsList();
    loadActiveStoryToEditor();
    renderMediaWorkspace();
    showToast('[ REGISTRO EXCLUÍDO ]', 'warning');
  }

  function loadActiveStoryToEditor() {
    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (!item) {
      if (state.catalog.items.length > 0) {
        item = state.catalog.items[0];
        state.activeItemId = item.id;
      } else {
        return;
      }
    }

    // Preencher campos de metadados
    var titleInput = document.getElementById('meta-title');
    var slugInput = document.getElementById('meta-slug');
    var statusSelect = document.getElementById('meta-status');
    var catSelect = document.getElementById('meta-category');
    var catCustomInput = document.getElementById('meta-category-custom');
    var sagaInput = document.getElementById('meta-saga');
    var fileInput = document.getElementById('meta-file');
    var tagsInput = document.getElementById('meta-tags');
    var coverSelect = document.getElementById('meta-cover');
    var summaryInput = document.getElementById('meta-summary');
    var badgeEl = document.getElementById('active-item-badge');

    if (titleInput) titleInput.value = item.title || '';
    if (slugInput) slugInput.value = item.slug || '';
    if (statusSelect) statusSelect.value = item.status || 'published';
    if (sagaInput) sagaInput.value = item.saga || '';
    if (fileInput) fileInput.value = item.file || '';
    if (tagsInput) tagsInput.value = (item.tags || []).join(', ');
    if (summaryInput) summaryInput.value = item.summary || '';

    // Categoria
    if (catSelect) {
      var found = false;
      for (var i = 0; i < catSelect.options.length; i++) {
        if (catSelect.options[i].value === item.category) {
          catSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found && item.category) {
        catSelect.value = '_custom';
        if (catCustomInput) {
          catCustomInput.value = item.category;
          catCustomInput.classList.remove('hidden');
        }
      } else if (catCustomInput) {
        catCustomInput.classList.add('hidden');
      }
    }

    // Imagem de capa
    if (coverSelect) {
      coverSelect.value = item.coverImage || '';
      updateCoverPreview(item.coverImage);
    }

    // Badge status
    if (badgeEl) {
      if (item.status === 'published') {
        badgeEl.className = 'badge badge-emerald';
        badgeEl.textContent = 'PUBLICADO';
      } else {
        badgeEl.className = 'badge badge-amber';
        badgeEl.textContent = 'RASCUNHO';
      }
    }

    // Renderizar chips de tags
    renderTagsPreview(item.tags || []);

    // Renderizar checkboxes de relatedIds
    renderRelatedCheckboxes(item);

    // Carregar conteúdo Markdown do arquivo
    var editorInput = document.getElementById('markdown-input');
    var content = '';
    if (item.file && state.markdownFiles[item.file]) {
      content = state.markdownFiles[item.file];
    } else if (item.file && state.markdownFiles[item.file.replace(/^texts\//, '')]) {
      content = state.markdownFiles[item.file.replace(/^texts\//, '')];
    } else if (item.type === 'text') {
      content = '# ' + (item.title || 'História') + '\n\n';
    } else {
      content = '# ' + (item.title || 'Registro de Mídia') + '\n\n' + (item.summary || '') + '\n\n' + (item.url ? '[Acessar Mídia Externa](' + item.url + ')' : '');
    }

    if (editorInput) {
      editorInput.value = content;
      updateMarkdownPreview(content);
      updateEditorMetrics(content);
    }

    var fileInfo = document.getElementById('stat-file-info');
    if (fileInfo) {
      fileInfo.textContent = 'Arquivo: ' + (item.file || '(sem arquivo .md)');
    }
  }

  function saveActiveItemMetadataFromUI() {
    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (!item) return;

    var titleInput = document.getElementById('meta-title');
    var slugInput = document.getElementById('meta-slug');
    var statusSelect = document.getElementById('meta-status');
    var catSelect = document.getElementById('meta-category');
    var catCustomInput = document.getElementById('meta-category-custom');
    var sagaInput = document.getElementById('meta-saga');
    var fileInput = document.getElementById('meta-file');
    var tagsInput = document.getElementById('meta-tags');
    var coverSelect = document.getElementById('meta-cover');
    var summaryInput = document.getElementById('meta-summary');
    var editorInput = document.getElementById('markdown-input');

    if (titleInput) item.title = titleInput.value.trim();
    if (slugInput) item.slug = slugInput.value.trim();
    if (statusSelect) item.status = statusSelect.value;
    if (sagaInput) item.saga = sagaInput.value.trim();
    if (fileInput) item.file = fileInput.value.trim();
    if (summaryInput) item.summary = summaryInput.value.trim();

    // Categoria
    if (catSelect) {
      if (catSelect.value === '_custom' && catCustomInput) {
        item.category = catCustomInput.value.trim() || 'Crônicas & Sagas';
      } else {
        item.category = catSelect.value;
      }
    }

    // Tags
    if (tagsInput) {
      item.tags = tagsInput.value.split(',')
        .map(function(t) { return t.trim(); })
        .filter(function(t) { return t.length > 0; });
    }

    // Imagem
    if (coverSelect) {
      item.coverImage = coverSelect.value;
    }

    // Markdown content
    if (editorInput && item.file) {
      state.markdownFiles[item.file] = editorInput.value;
    }
  }

  function updateMarkdownPreview(markdownText) {
    var previewEl = document.getElementById('markdown-preview');
    if (!previewEl || !state.converter) return;

    try {
      var html = state.converter.makeHtml(markdownText || '');
      previewEl.innerHTML = html;
    } catch (e) {
      console.warn('Erro ao converter Markdown:', e);
    }
  }

  function updateEditorMetrics(text) {
    var wordsEl = document.getElementById('stat-words');
    var charsEl = document.getElementById('stat-chars');
    var timeEl = document.getElementById('stat-time');

    var raw = (text || '').trim();
    var words = raw ? raw.split(/\s+/).length : 0;
    var chars = (text || '').length;
    var readingTime = Math.max(1, Math.ceil(words / 200));

    if (wordsEl) wordsEl.textContent = words;
    if (charsEl) charsEl.textContent = chars;
    if (timeEl) timeEl.textContent = '~' + readingTime + ' min';

    // Atualizar no item ativo
    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (item && item.type === 'text') {
      item.readingTime = readingTime;
    }
  }

  function renderTagsPreview(tagsArray) {
    var previewEl = document.getElementById('meta-tags-preview');
    if (!previewEl) return;
    previewEl.innerHTML = '';
    tagsArray.forEach(function(tag) {
      var pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.textContent = tag;
      previewEl.appendChild(pill);
    });
  }

  function renderRelatedCheckboxes(activeItem) {
    var container = document.getElementById('meta-related-container');
    if (!container) return;
    container.innerHTML = '';

    var currentRelated = activeItem.relatedIds || [];

    state.catalog.items.forEach(function(item) {
      if (item.id === activeItem.id) return; // não conecta com ele mesmo

      var label = document.createElement('label');
      label.className = 'related-checkbox-item';

      var input = document.createElement('input');
      input.type = 'checkbox';
      input.value = item.id;
      input.checked = currentRelated.indexOf(item.id) !== -1;

      input.addEventListener('change', function() {
        if (input.checked) {
          if (activeItem.relatedIds.indexOf(item.id) === -1) {
            activeItem.relatedIds.push(item.id);
          }
        } else {
          activeItem.relatedIds = activeItem.relatedIds.filter(function(id) { return id !== item.id; });
        }
      });

      label.appendChild(input);
      var span = document.createElement('span');
      span.textContent = item.title + ' [' + item.type.toUpperCase() + ']';
      label.appendChild(span);

      container.appendChild(label);
    });
  }

  function updateCoverPreview(coverPath) {
    var previewEl = document.getElementById('meta-cover-preview');
    if (!previewEl) return;

    if (!coverPath) {
      previewEl.classList.add('hidden');
      previewEl.innerHTML = '';
      return;
    }

    previewEl.classList.remove('hidden');
    previewEl.innerHTML = '<img src="' + escapeHtml(coverPath) + '" alt="Capa">';
  }

  function updateCoverSelectors() {
    var coverSelect = document.getElementById('meta-cover');
    if (!coverSelect) return;

    var currentVal = coverSelect.value;
    coverSelect.innerHTML = '<option value="">(Sem imagem de capa)</option>';

    state.images.forEach(function(img) {
      var opt = document.createElement('option');
      opt.value = img.path;
      opt.textContent = img.path;
      coverSelect.appendChild(opt);
    });

    coverSelect.value = currentVal;
  }

  // =========================================================================
  // FERRAMENTAS DE FORMATAÇÃO E INSERÇÃO DO EDITOR
  // =========================================================================

  function handleEditorTool(action) {
    var textarea = document.getElementById('markdown-input');
    if (!textarea) return;

    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var text = textarea.value;
    var selected = text.substring(start, end);
    var replacement = '';

    switch (action) {
      case 'h1':
        replacement = '# ' + (selected || 'Título Nível 1');
        break;
      case 'h2':
        replacement = '## ' + (selected || 'Título Nível 2');
        break;
      case 'h3':
        replacement = '### ' + (selected || 'Título Nível 3');
        break;
      case 'bold':
        replacement = '**' + (selected || 'texto em destaque') + '**';
        break;
      case 'italic':
        replacement = '*' + (selected || 'texto em itálico') + '*';
        break;
      case 'quote':
        replacement = '> ' + (selected || 'Citação ou registro dos arquivos...');
        break;
      case 'list':
        replacement = '* ' + (selected || 'Item de lista');
        break;
      case 'divider':
        replacement = '\n\n---\n\n';
        break;
      case 'code':
        if (selected.indexOf('\n') !== -1) {
          replacement = '```\n' + selected + '\n```';
        } else {
          replacement = '`' + (selected || 'código') + '`';
        }
        break;
      default:
        return;
    }

    textarea.value = text.substring(0, start) + replacement + text.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + replacement.length, start + replacement.length);

    updateMarkdownPreview(textarea.value);
    updateEditorMetrics(textarea.value);

    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (item && item.file) {
      state.markdownFiles[item.file] = textarea.value;
    }
  }

  function insertTextAtCursor(insertStr) {
    var textarea = document.getElementById('markdown-input');
    if (!textarea) return;

    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var text = textarea.value;

    textarea.value = text.substring(0, start) + insertStr + text.substring(end);
    textarea.focus();
    var nextPos = start + insertStr.length;
    textarea.setSelectionRange(nextPos, nextPos);

    updateMarkdownPreview(textarea.value);
    updateEditorMetrics(textarea.value);

    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (item && item.file) {
      state.markdownFiles[item.file] = textarea.value;
    }
  }

  // =========================================================================
  // ABA 2: CENTRAL DE LINKS & MÍDIAS
  // =========================================================================

  function renderMediaWorkspace() {
    var gridEl = document.getElementById('media-grid');
    var counterEl = document.getElementById('media-counter');
    if (!gridEl) return;

    var mediaItems = state.catalog.items.filter(function(i) {
      return i.type === 'video' || i.type === 'audio';
    });

    if (counterEl) counterEl.textContent = mediaItems.length;
    gridEl.innerHTML = '';

    if (mediaItems.length === 0) {
      gridEl.innerHTML = '<p class="placeholder-text" style="grid-column: 1/-1; padding: 30px;">Nenhuma transmissão registrada no catálogo ainda.</p>';
      return;
    }

    mediaItems.forEach(function(item) {
      var card = document.createElement('div');
      card.className = 'media-card-item';

      var playerHtml = generateResponsiveEmbed(item.url, item.type, item.title);

      var typeBadgeClass = item.type === 'audio' ? 'badge-amber' : 'badge-purple';
      var statusBadgeClass = item.status === 'published' ? 'badge-emerald' : 'badge-amber';

      card.innerHTML = 
        '<div class="media-card-player">' + playerHtml + '</div>' +
        '<div class="media-card-content">' +
          '<div class="media-card-header">' +
            '<div class="media-card-title">' + escapeHtml(item.title) + '</div>' +
            '<div style="display:flex;gap:4px;">' +
              '<span class="badge ' + typeBadgeClass + '">' + item.type.toUpperCase() + '</span>' +
              '<span class="badge ' + statusBadgeClass + '">' + item.status.toUpperCase() + '</span>' +
            '</div>' +
          '</div>' +
          '<div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--accent-secondary);">' + escapeHtml(item.saga || item.category || '') + '</div>' +
          '<div class="media-card-summary">' + escapeHtml(item.summary || '(Sem sinopse)') + '</div>' +
          '<div class="media-card-footer">' +
            '<button class="btn btn-tiny btn-ghost btn-edit-media" data-id="' + item.id + '" type="button">EDITAR</button>' +
            '<button class="btn btn-tiny btn-ghost btn-del-media" data-id="' + item.id + '" type="button" style="color:var(--color-danger)">EXCLUIR</button>' +
          '</div>' +
        '</div>';

      var btnEdit = card.querySelector('.btn-edit-media');
      if (btnEdit) {
        btnEdit.addEventListener('click', function() {
          populateMediaFormForEdit(item);
        });
      }

      var btnDel = card.querySelector('.btn-del-media');
      if (btnDel) {
        btnDel.addEventListener('click', function() {
          deleteRecordItem(item.id);
        });
      }

      gridEl.appendChild(card);
    });
  }

  function handleMediaUrlInput(url) {
    var typeSelect = document.getElementById('media-type');
    var previewBox = document.getElementById('media-player-preview');
    if (!url || !previewBox) return;

    url = url.trim();
    var detectedType = 'video';

    if (url.indexOf('spotify.com') !== -1) {
      detectedType = 'audio';
    } else if (url.indexOf('youtu.be') !== -1 || url.indexOf('youtube.com') !== -1) {
      detectedType = 'video';
    }

    if (typeSelect) {
      typeSelect.value = detectedType;
    }

    var embedHtml = generateResponsiveEmbed(url, detectedType, 'Prévia de Transmissão');
    previewBox.innerHTML = embedHtml;
  }

  function saveMediaFromForm() {
    var urlInput = document.getElementById('media-url');
    var typeSelect = document.getElementById('media-type');
    var titleInput = document.getElementById('media-title');
    var catSelect = document.getElementById('media-category');
    var statusSelect = document.getElementById('media-status');
    var sagaInput = document.getElementById('media-saga');
    var tagsInput = document.getElementById('media-tags');
    var summaryInput = document.getElementById('media-summary');

    var url = urlInput ? urlInput.value.trim() : '';
    var title = titleInput ? titleInput.value.trim() : '';

    if (!url || !title) {
      showToast('Por favor, preencha ao menos o Título e a URL da transmissão.', 'error');
      return;
    }

    var slug = title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    var newItem = {
      id: 'media-' + Date.now(),
      title: title,
      slug: slug,
      type: typeSelect ? typeSelect.value : 'video',
      status: statusSelect ? statusSelect.value : 'published',
      category: catSelect ? catSelect.value : 'Transmissões Sonoras',
      saga: sagaInput ? sagaInput.value.trim() : 'Arquivos do Multiverso',
      tags: tagsInput ? tagsInput.value.split(',').map(function(t) { return t.trim(); }).filter(Boolean) : [],
      summary: summaryInput ? summaryInput.value.trim() : '',
      url: url,
      createdAt: new Date().toISOString().split('T')[0],
      relatedIds: []
    };

    state.catalog.items.unshift(newItem);
    renderMediaWorkspace();
    renderSidebarRecordsList();

    // Limpar formulário
    if (urlInput) urlInput.value = '';
    if (titleInput) titleInput.value = '';
    if (sagaInput) sagaInput.value = '';
    if (tagsInput) tagsInput.value = '';
    if (summaryInput) summaryInput.value = '';
    var previewBox = document.getElementById('media-player-preview');
    if (previewBox) previewBox.innerHTML = '<p class="placeholder-text">Aguardando inserção de URL válida para carregar o player...</p>';

    showToast('[ TRANSMISSÃO ADICIONADA AO CATÁLOGO ]', 'success');
  }

  function populateMediaFormForEdit(item) {
    var urlInput = document.getElementById('media-url');
    var typeSelect = document.getElementById('media-type');
    var titleInput = document.getElementById('media-title');
    var catSelect = document.getElementById('media-category');
    var statusSelect = document.getElementById('media-status');
    var sagaInput = document.getElementById('media-saga');
    var tagsInput = document.getElementById('media-tags');
    var summaryInput = document.getElementById('media-summary');

    if (urlInput) urlInput.value = item.url || '';
    if (typeSelect) typeSelect.value = item.type || 'video';
    if (titleInput) titleInput.value = item.title || '';
    if (catSelect) catSelect.value = item.category || 'Transmissões Sonoras';
    if (statusSelect) statusSelect.value = item.status || 'published';
    if (sagaInput) sagaInput.value = item.saga || '';
    if (tagsInput) tagsInput.value = (item.tags || []).join(', ');
    if (summaryInput) summaryInput.value = item.summary || '';

    handleMediaUrlInput(item.url || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('[ EDITANDO TRANSMISSÃO: ' + item.title + ' ]', 'info');
  }

  function generateResponsiveEmbed(url, type, title) {
    if (!url) {
      return '<p class="placeholder-text">URL de mídia vazia.</p>';
    }

    // YouTube
    var ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      var ytId = ytMatch[1];
      return '<div class="embed-container"><iframe src="https://www.youtube.com/embed/' + ytId + '" title="' + escapeHtml(title || 'YouTube') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    }

    // Spotify
    var spotMatch = url.match(/open\.spotify\.com\/(episode|track|playlist|show)\/([a-zA-Z0-9]+)/);
    if (spotMatch) {
      var spotType = spotMatch[1];
      var spotId = spotMatch[2];
      return '<div class="embed-spotify"><iframe src="https://open.spotify.com/embed/' + spotType + '/' + spotId + '?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>';
    }

    // Fallback genérico de áudio / vídeo HTML5
    if (type === 'audio') {
      return '<audio controls style="width:100%;margin:10px 0;"><source src="' + escapeHtml(url) + '">Seu navegador não suporta o elemento de áudio.</audio>';
    }

    return '<div class="embed-container"><iframe src="' + escapeHtml(url) + '" title="' + escapeHtml(title || 'Mídia Externa') + '" allowfullscreen></iframe></div>';
  }

  // =========================================================================
  // ABA 3: VOZ & ANOTAÇÕES DO MULTIVERSO
  // =========================================================================

  function renderVoiceWorkspace() {
    renderNotesGrid();
  }

  function renderNotesGrid() {
    var gridEl = document.getElementById('notes-grid');
    var counterEl = document.getElementById('notes-counter');
    if (!gridEl) return;

    var notes = state.catalog.notes || [];
    if (counterEl) counterEl.textContent = notes.length;
    gridEl.innerHTML = '';

    if (notes.length === 0) {
      gridEl.innerHTML = '<p class="placeholder-text" style="grid-column: 1/-1; padding: 24px;">Nenhuma anotação de lore arquivada ainda.</p>';
      return;
    }

    notes.forEach(function(note) {
      var card = document.createElement('div');
      card.className = 'note-card';

      var tagsHtml = (note.tags || []).map(function(t) {
        return '<span class="tag-pill">' + escapeHtml(t) + '</span>';
      }).join(' ');

      card.innerHTML = 
        '<div class="note-card-header">' +
          '<div class="note-card-title">' + escapeHtml(note.title) + '</div>' +
          '<span class="note-card-date">' + escapeHtml(note.createdAt || '') + '</span>' +
        '</div>' +
        '<div class="note-card-tags">' + tagsHtml + '</div>' +
        '<div class="note-card-body">' + escapeHtml(note.content || '') + '</div>' +
        '<div class="note-card-actions">' +
          '<button class="btn btn-tiny btn-accent btn-convert-note" data-id="' + note.id + '" type="button">TRANSFORMAR EM CONTO</button>' +
          '<div style="display:flex;gap:4px;">' +
            '<button class="btn btn-tiny btn-ghost btn-edit-note" data-id="' + note.id + '" type="button">EDITAR</button>' +
            '<button class="btn btn-tiny btn-ghost btn-del-note" data-id="' + note.id + '" type="button" style="color:var(--color-danger)">EXCLUIR</button>' +
          '</div>' +
        '</div>';

      // Converter em Conto
      var btnConvert = card.querySelector('.btn-convert-note');
      if (btnConvert) {
        btnConvert.addEventListener('click', function() {
          convertNoteToStory(note);
        });
      }

      // Editar
      var btnEdit = card.querySelector('.btn-edit-note');
      if (btnEdit) {
        btnEdit.addEventListener('click', function() {
          editNoteModal(note);
        });
      }

      // Excluir
      var btnDel = card.querySelector('.btn-del-note');
      if (btnDel) {
        btnDel.addEventListener('click', function() {
          deleteNoteItem(note.id);
        });
      }

      gridEl.appendChild(card);
    });
  }

  function convertNoteToStory(note) {
    saveActiveItemMetadataFromUI();

    var slug = note.title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    var filename = 'texts/' + slug + '.md';

    var newStory = {
      id: 'story-' + Date.now(),
      title: note.title,
      slug: slug,
      type: 'text',
      status: 'draft',
      category: note.category || 'Crônicas & Sagas',
      saga: 'Cérebro de Matriosca',
      tags: note.tags || [],
      summary: (note.content || '').substring(0, 150) + '...',
      coverImage: 'images/maltuk1.png',
      file: filename,
      readingTime: 1,
      createdAt: new Date().toISOString().split('T')[0],
      relatedIds: []
    };

    state.markdownFiles[filename] = '# ' + note.title + '\n\n' + (note.content || '') + '\n\n';
    state.catalog.items.unshift(newStory);
    state.activeItemId = newStory.id;

    // Alternar para a aba 1
    switchTab('stories');
    renderSidebarRecordsList();
    loadActiveStoryToEditor();

    showToast('[ ANOTAÇÃO CONVERTIDA EM NOVO RASCUNHO DE CONTO ]', 'success');
  }

  function editNoteModal(note) {
    var newTitle = prompt('Título da Anotação:', note.title);
    if (newTitle === null) return;
    var newContent = prompt('Conteúdo da Anotação:', note.content);
    if (newContent === null) return;

    note.title = newTitle.trim() || note.title;
    note.content = newContent.trim();
    renderNotesGrid();
    showToast('[ ANOTAÇÃO ATUALIZADA ]', 'info');
  }

  function deleteNoteItem(id) {
    if (!confirm('Deseja excluir esta anotação do lore?')) return;
    state.catalog.notes = (state.catalog.notes || []).filter(function(n) { return n.id !== id; });
    renderNotesGrid();
    showToast('[ ANOTAÇÃO EXCLUÍDA ]', 'warning');
  }

  function createNewNoteManual() {
    var title = prompt('Título da Anotação de Lore:');
    if (!title) return;
    var content = prompt('Conteúdo / Ideia do Universo:');

    var newNote = {
      id: 'note-' + Date.now(),
      title: title.trim(),
      category: 'Crônicas & Sagas',
      tags: ['Multiverso', 'Anotação'],
      content: (content || '').trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (!state.catalog.notes) state.catalog.notes = [];
    state.catalog.notes.unshift(newNote);
    renderNotesGrid();
    showToast('[ NOVA ANOTAÇÃO SALVA ]', 'success');
  }

  // =========================================================================
  // SISTEMA DE DITADO POR VOZ (WEB SPEECH API)
  // =========================================================================

  function initSpeechEngine(targetMode) {
    var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      showToast('Seu navegador não suporta a Web Speech API nativa. Recomendamos o Google Chrome, Edge ou Brave.', 'error');
      return null;
    }

    var recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;

    var langSelect = document.getElementById('voice-language');
    recognition.lang = langSelect ? langSelect.value : 'pt-BR';

    recognition.onstart = function() {
      if (targetMode === 'tab') {
        state.isRecordingVoiceTab = true;
        updateVoiceTabUI(true);
        startVisualizer();
      } else if (targetMode === 'cursor') {
        state.isRecordingEditorCursor = true;
        updateCursorVoiceUI(true);
      }
      showToast('[ CAPTAÇÃO DE VOZ ATIVA: FALE CLARAMENTE ]', 'info');
    };

    recognition.onresult = function(event) {
      var finalTranscript = '';
      var interimTranscript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        var transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece;
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      var punctuationToggle = document.getElementById('voice-punctuation-toggle');
      if (punctuationToggle && punctuationToggle.checked) {
        finalTranscript = applyVoicePunctuation(finalTranscript);
      }

      if (targetMode === 'tab') {
        var outputBox = document.getElementById('voice-transcript-output');
        var interimEl = document.getElementById('voice-interim-text');
        if (finalTranscript && outputBox) {
          outputBox.value += (outputBox.value ? ' ' : '') + finalTranscript.trim();
        }
        if (interimEl) {
          interimEl.textContent = interimTranscript;
        }
      } else if (targetMode === 'cursor') {
        if (finalTranscript) {
          insertTextAtCursor(' ' + finalTranscript.trim());
        }
      }
    };

    recognition.onerror = function(event) {
      console.warn('Erro de reconhecimento de fala:', event.error);
      if (event.error !== 'no-speech') {
        showToast('Erro no reconhecimento de voz: ' + event.error, 'error');
      }
    };

    recognition.onend = function() {
      if (targetMode === 'tab') {
        state.isRecordingVoiceTab = false;
        updateVoiceTabUI(false);
        stopVisualizer();
      } else if (targetMode === 'cursor') {
        state.isRecordingEditorCursor = false;
        updateCursorVoiceUI(false);
      }
    };

    return recognition;
  }

  function toggleMainVoiceRecording() {
    if (state.isRecordingVoiceTab && state.speechRecognition) {
      state.speechRecognition.stop();
      return;
    }

    state.speechRecognition = initSpeechEngine('tab');
    if (state.speechRecognition) {
      try {
        state.speechRecognition.start();
      } catch (e) {
        console.error('Falha ao iniciar SpeechRecognition:', e);
      }
    }
  }

  function toggleEditorCursorVoice() {
    if (state.isRecordingEditorCursor && state.speechRecognition) {
      state.speechRecognition.stop();
      return;
    }

    state.speechRecognition = initSpeechEngine('cursor');
    if (state.speechRecognition) {
      try {
        state.speechRecognition.start();
      } catch (e) {
        console.error('Falha ao iniciar ditado:', e);
      }
    }
  }

  function updateVoiceTabUI(isRecording) {
    var btn = document.getElementById('btn-toggle-main-voice');
    var badge = document.getElementById('voice-status-badge');
    var label = document.getElementById('voice-toggle-label');

    if (btn && badge && label) {
      if (isRecording) {
        btn.classList.add('recording');
        badge.className = 'badge badge-emerald';
        badge.textContent = 'GRAVANDO EM TEMPO REAL...';
        label.textContent = 'PARAR CAPTAÇÃO DE VOZ';
      } else {
        btn.classList.remove('recording');
        badge.className = 'badge badge-amber';
        badge.textContent = 'MICROFONE INATIVO';
        label.textContent = 'INICIAR CAPTAÇÃO DE VOZ';
      }
    }
  }

  function updateCursorVoiceUI(isRecording) {
    var btn = document.getElementById('btn-dictate-in-editor');
    var textEl = document.getElementById('btn-dictate-text');
    if (btn && textEl) {
      if (isRecording) {
        btn.classList.add('recording');
        textEl.textContent = 'PARAR DITADO';
      } else {
        btn.classList.remove('recording');
        textEl.textContent = 'DITAR NO CURSOR';
      }
    }
  }

  function applyVoicePunctuation(text) {
    if (!text) return '';
    return text
      .replace(/\s*ponto final\b/gi, '.')
      .replace(/\s*vírgula\b/gi, ',')
      .replace(/\s*ponto de interrogação\b/gi, '?')
      .replace(/\s*ponto de exclamação\b/gi, '!')
      .replace(/\s*dois pontos\b/gi, ':')
      .replace(/\s*ponto e vírgula\b/gi, ';')
      .replace(/\s*(novo parágrafo|nova linha)\b/gi, '\n\n')
      .replace(/\s*travessão\b/gi, ' — ')
      .replace(/\s*abrir aspas\b/gi, ' "')
      .replace(/\s*fechar aspas\b/gi, '" ')
      .replace(/\s*abrir parênteses\b/gi, ' (')
      .replace(/\s*fechar parênteses\b/gi, ') ');
  }

  // Visualizador Web Audio API
  async function startVisualizer() {
    var canvas = document.getElementById('voice-visualizer-canvas');
    var fallback = document.getElementById('voice-fallback-waves');
    if (!canvas) return;

    try {
      var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.mediaStream = stream;

      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      state.audioContext = new AudioCtx();
      var source = state.audioContext.createMediaStreamSource(stream);
      state.analyserNode = state.audioContext.createAnalyser();
      state.analyserNode.fftSize = 64;
      source.connect(state.analyserNode);

      canvas.classList.remove('hidden');
      if (fallback) fallback.classList.add('hidden');

      var ctx = canvas.getContext('2d');
      var bufferLength = state.analyserNode.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);

      function draw() {
        state.visualizerAnimId = requestAnimationFrame(draw);
        state.analyserNode.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var barWidth = (canvas.width / bufferLength) * 1.8;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height;

          // Gradiente cibernético
          var grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
          grad.addColorStop(0, '#e6a817');
          grad.addColorStop(1, '#00f0ff');
          ctx.fillStyle = grad;

          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 3;
        }
      }

      draw();

    } catch (e) {
      console.warn('Microfone direto bloqueado para visualizer:', e);
      if (fallback) fallback.classList.remove('hidden');
    }
  }

  function stopVisualizer() {
    if (state.visualizerAnimId) {
      cancelAnimationFrame(state.visualizerAnimId);
      state.visualizerAnimId = null;
    }
    if (state.mediaStream) {
      state.mediaStream.getTracks().forEach(function(track) { track.stop(); });
      state.mediaStream = null;
    }
    if (state.audioContext) {
      state.audioContext.close();
      state.audioContext = null;
    }
    var canvas = document.getElementById('voice-visualizer-canvas');
    if (canvas) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    var fallback = document.getElementById('voice-fallback-waves');
    if (fallback) fallback.classList.add('hidden');
  }

  // =========================================================================
  // ABA 4: LABORATÓRIO DE DESIGN & TEMA (theme.json)
  // =========================================================================

  function renderThemeWorkspace() {
    var theme = state.theme;
    if (!theme) return;

    // 1. Marcar preset ativo
    var presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach(function(card) {
      if (card.dataset.preset === theme.activePreset) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 2. Cores
    var colors = theme.colors || {};
    setColorPickerVal('color-bgPrimary', 'val-bgPrimary', colors.bgPrimary || '#050609');
    setColorPickerVal('color-bgSecondary', 'val-bgSecondary', colors.bgSecondary || '#0b0e16');
    setColorPickerVal('color-accentPrimary', 'val-accentPrimary', colors.accentPrimary || '#e6a817');
    setColorPickerVal('color-accentSecondary', 'val-accentSecondary', colors.accentSecondary || '#00f0ff');
    setColorPickerVal('color-matrixGlow', 'val-matrixGlow', colors.matrixGlow || '#00ff9d');
    setColorPickerVal('color-textPrimary', 'val-textPrimary', colors.textPrimary || '#e6edf5');
    setColorPickerVal('color-textSecondary', 'val-textSecondary', colors.textSecondary || '#8b9bb4');

    // 3. Tipografia
    var typo = theme.typography || {};
    setSelectVal('typo-display', typo.fontDisplay);
    setSelectVal('typo-body', typo.fontBody);
    setSelectVal('typo-reading', typo.fontReading);
    setSelectVal('typo-mono', typo.fontMono);
    setSliderVal('typo-size', 'val-baseSize', typo.baseSizePx || 18, 'px');
    setSliderVal('typo-height', 'val-lineHeight', typo.lineHeight || 1.75, '');

    // 4. Cosmos
    var cosmos = theme.cosmos || {};
    setSliderVal('cosmos-stars', 'val-starCount', cosmos.starCount || 150, '');
    setSliderVal('cosmos-streams', 'val-streamCount', cosmos.matrixStreamCount || 32, '');
    setSliderVal('cosmos-speed', 'val-speed', cosmos.speed || 0.45, '');
    setSliderVal('cosmos-nebula', 'val-nebula', cosmos.nebulaOpacity || 0.35, '');
    setSliderVal('cosmos-matrix', 'val-matrix', cosmos.matrixOpacity || 0.18, '');
    
    var pauseCheck = document.getElementById('cosmos-pauseOnReading');
    if (pauseCheck) {
      pauseCheck.checked = !!cosmos.pauseOnReading;
    }
  }

  function setColorPickerVal(inputId, labelId, val) {
    var inp = document.getElementById(inputId);
    var lbl = document.getElementById(labelId);
    if (inp) inp.value = val;
    if (lbl) lbl.textContent = val;
  }

  function setSelectVal(selectId, val) {
    var sel = document.getElementById(selectId);
    if (!sel || !val) return;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === val) {
        sel.selectedIndex = i;
        break;
      }
    }
  }

  function setSliderVal(sliderId, labelId, val, unit) {
    var sl = document.getElementById(sliderId);
    var lbl = document.getElementById(labelId);
    if (sl) sl.value = val;
    if (lbl) lbl.textContent = val + (unit || '');
  }

  function applyPreset(presetKey) {
    var presets = state.theme.presets || DEFAULT_THEME.presets;
    var target = presets[presetKey];
    if (!target) return;

    state.theme.activePreset = presetKey;
    state.theme.colors = Object.assign({}, state.theme.colors, target.colors);
    state.theme.cosmos = Object.assign({}, state.theme.cosmos, target.cosmos);

    applyTheme(state.theme);
    renderThemeWorkspace();
    showToast('[ PRESET ARTÍSTICO APLICADO: ' + target.name.toUpperCase() + ' ]', 'success');
  }

  function initThemeFromConfig() {
    applyTheme(state.theme);
  }

  function applyTheme(theme) {
    if (!theme) return;
    var root = document.documentElement;

    // Cores CSS Variables
    if (theme.colors) {
      root.style.setProperty('--bg-primary', theme.colors.bgPrimary);
      root.style.setProperty('--bg-secondary', theme.colors.bgSecondary);
      root.style.setProperty('--accent-primary', theme.colors.accentPrimary);
      root.style.setProperty('--accent-secondary', theme.colors.accentSecondary);
      root.style.setProperty('--matrix-glow', theme.colors.matrixGlow);
      root.style.setProperty('--text-primary', theme.colors.textPrimary);
      root.style.setProperty('--text-secondary', theme.colors.textSecondary);
      root.style.setProperty('--border-color', theme.colors.border || 'rgba(230, 168, 23, 0.28)');
    }

    // Tipografia CSS Variables
    if (theme.typography) {
      if (theme.typography.fontDisplay) root.style.setProperty('--font-display', theme.typography.fontDisplay);
      if (theme.typography.fontBody) root.style.setProperty('--font-body', theme.typography.fontBody);
      if (theme.typography.fontReading) root.style.setProperty('--font-reading', theme.typography.fontReading);
      if (theme.typography.fontMono) root.style.setProperty('--font-mono', theme.typography.fontMono);
      if (theme.typography.baseSizePx) root.style.setProperty('--base-size', theme.typography.baseSizePx + 'px');
      if (theme.typography.lineHeight) root.style.setProperty('--line-height', theme.typography.lineHeight);
    }

    // Atualizar motor CosmosEngine
    if (window.CosmosEngine && typeof window.CosmosEngine.updateConfig === 'function') {
      var mergedCosmos = Object.assign({}, theme.colors, theme.cosmos);
      window.CosmosEngine.updateConfig(mergedCosmos);
    }
  }

  function collectThemeFromInputs() {
    var colors = {
      bgPrimary: document.getElementById('color-bgPrimary').value,
      bgSecondary: document.getElementById('color-bgSecondary').value,
      bgSurface: state.theme.colors.bgSurface || 'rgba(12, 17, 26, 0.82)',
      textPrimary: document.getElementById('color-textPrimary').value,
      textSecondary: document.getElementById('color-textSecondary').value,
      accentPrimary: document.getElementById('color-accentPrimary').value,
      accentSecondary: document.getElementById('color-accentSecondary').value,
      matrixGlow: document.getElementById('color-matrixGlow').value,
      border: 'rgba(' + hexToRgb(document.getElementById('color-accentPrimary').value) + ', 0.28)'
    };

    var typography = {
      fontDisplay: document.getElementById('typo-display').value,
      fontBody: document.getElementById('typo-body').value,
      fontReading: document.getElementById('typo-reading').value,
      fontMono: document.getElementById('typo-mono').value,
      baseSizePx: parseInt(document.getElementById('typo-size').value, 10),
      lineHeight: parseFloat(document.getElementById('typo-height').value)
    };

    var cosmos = {
      starCount: parseInt(document.getElementById('cosmos-stars').value, 10),
      matrixStreamCount: parseInt(document.getElementById('cosmos-streams').value, 10),
      speed: parseFloat(document.getElementById('cosmos-speed').value),
      nebulaOpacity: parseFloat(document.getElementById('cosmos-nebula').value),
      matrixOpacity: parseFloat(document.getElementById('cosmos-matrix').value),
      pauseOnReading: document.getElementById('cosmos-pauseOnReading').checked
    };

    state.theme.colors = colors;
    state.theme.typography = typography;
    state.theme.cosmos = cosmos;

    applyTheme(state.theme);
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0] + hex[1]+hex[1] + hex[2]+hex[2];
    var num = parseInt(hex, 16);
    return ((num >> 16) & 255) + ', ' + ((num >> 8) & 255) + ', ' + (num & 255);
  }

  // =========================================================================
  // SISTEMA DE MODAIS & ASSISTENTES INTELIGENTES
  // =========================================================================

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');

    if (modalId === 'modal-link') {
      populateInternalLinksDropdown();
    } else if (modalId === 'modal-image') {
      populateImageGalleryGrid();
    }
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  }

  function populateInternalLinksDropdown() {
    var select = document.getElementById('link-internal-select');
    if (!select) return;
    select.innerHTML = '';

    state.catalog.items.forEach(function(item) {
      var opt = document.createElement('option');
      opt.value = item.slug || item.id;
      opt.dataset.title = item.title;
      opt.textContent = '[' + item.type.toUpperCase() + '] ' + item.title;
      select.appendChild(opt);
    });

    var textInput = document.getElementById('link-internal-text');
    if (textInput && select.options.length > 0) {
      textInput.value = select.options[0].dataset.title;
    }
  }

  function populateImageGalleryGrid() {
    var grid = document.getElementById('modal-image-grid');
    if (!grid) return;
    grid.innerHTML = '';

    state.images.forEach(function(img, idx) {
      var card = document.createElement('div');
      card.className = 'image-thumb-card' + (idx === 0 ? ' selected' : '');
      card.dataset.path = img.path;

      var displayUrl = img.url || img.path;
      card.innerHTML = 
        '<img src="' + escapeHtml(displayUrl) + '" alt="' + escapeHtml(img.name) + '">' +
        '<span class="image-thumb-name">' + escapeHtml(img.name) + '</span>';

      card.addEventListener('click', function() {
        document.querySelectorAll('.image-thumb-card').forEach(function(c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        document.getElementById('img-selected-path').value = img.path;
        updateModalImagePreview(displayUrl);
      });

      grid.appendChild(card);
    });

    if (state.images.length > 0) {
      document.getElementById('img-selected-path').value = state.images[0].path;
      updateModalImagePreview(state.images[0].url || state.images[0].path);
    }
  }

  function updateModalImagePreview(src) {
    var p = document.getElementById('img-modal-preview');
    if (p) {
      p.innerHTML = '<img src="' + escapeHtml(src) + '" alt="Prévia">';
    }
  }

  function convertHtmlToCleanMarkdown(html) {
    if (!html) return '';

    // Cria elemento temporário no DOM para parsing seguro
    var temp = document.createElement('div');
    temp.innerHTML = html;

    function parseNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return '';
      }

      var tag = node.tagName.toLowerCase();
      var children = Array.from(node.childNodes).map(parseNode).join('');

      switch (tag) {
        case 'h1': return '\n\n# ' + children.trim() + '\n\n';
        case 'h2': return '\n\n## ' + children.trim() + '\n\n';
        case 'h3': return '\n\n### ' + children.trim() + '\n\n';
        case 'h4': return '\n\n#### ' + children.trim() + '\n\n';
        case 'p': return '\n\n' + children.trim() + '\n\n';
        case 'strong':
        case 'b': return '**' + children + '**';
        case 'em':
        case 'i': return '*' + children + '*';
        case 'blockquote': return '\n\n> ' + children.trim() + '\n\n';
        case 'ul': return '\n\n' + children + '\n\n';
        case 'ol': return '\n\n' + children + '\n\n';
        case 'li': return '* ' + children.trim() + '\n';
        case 'code': return '`' + children + '`';
        case 'pre': return '\n\n```\n' + children.trim() + '\n```\n\n';
        case 'hr': return '\n\n---\n\n';
        case 'br': return '\n';
        case 'a':
          var href = node.getAttribute('href') || '#';
          return '[' + children + '](' + href + ')';
        case 'img':
          var src = node.getAttribute('src') || '';
          var alt = node.getAttribute('alt') || '';
          var width = node.getAttribute('width');
          if (width) {
            return '<img src="' + src + '" alt="' + alt + '" width="' + width + '"/>';
          }
          return '![' + alt + '](' + src + ')';
        default:
          return children;
      }
    }

    var result = parseNode(temp);
    // Limpar quebras de linha excessivas
    return result.replace(/\n{3,}/g, '\n\n').trim();
  }

  // =========================================================================
  // EXPORTAÇÃO MANUAL DE ARQUIVOS (DOWNLOADS)
  // =========================================================================

  function downloadJson(filename, obj) {
    var blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    downloadBlob(filename, blob);
  }

  function downloadText(filename, text) {
    var blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    downloadBlob(filename, blob);
  }

  function downloadBlob(filename, blob) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    showToast('[ ARQUIVO BAIXADO: ' + filename + ' ]', 'success');
  }

  // =========================================================================
  // SISTEMA DE TOASTS HUD
  // =========================================================================

  function showToast(message, type) {
    var container = document.getElementById('toast-container');
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');

    var glyph = '◈';
    if (type === 'success') glyph = '∷';
    if (type === 'error') glyph = '[!]';
    if (type === 'warning') glyph = '[?]';

    toast.innerHTML = '<span class="glyph">' + glyph + '</span> <span>' + escapeHtml(message) + '</span>';

    container.appendChild(toast);

    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4000);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // VINCULAÇÃO DE EVENTOS DE INTERFACE (BINDINGS)
  // =========================================================================

  function bindEvents() {
    // 1. Barra de Topo
    document.getElementById('btn-connect-dir').addEventListener('click', connectProjectDirectory);
    document.getElementById('btn-save-project').addEventListener('click', saveAllToProject);
    document.getElementById('btn-export-menu').addEventListener('click', function() {
      openModal('modal-export');
    });

    // Auto-save backup to localStorage when clicking "VER PORTAL"
    var verPortalLink = document.querySelector('a[href="index.html"]');
    if (verPortalLink) {
      verPortalLink.addEventListener('click', function() {
        saveActiveItemMetadataFromUI();
        state.catalog.updatedAt = new Date().toISOString();
        try {
          localStorage.setItem('ee_studio_backup', JSON.stringify({
            catalog: state.catalog,
            theme: state.theme,
            markdownFiles: state.markdownFiles,
            timestamp: state.catalog.updatedAt
          }));
        } catch (e) {
          console.warn('Erro ao salvar backup no localStorage:', e);
        }
      });
    }

    var cosmosToggle = document.getElementById('btn-toggle-cosmos');
    if (cosmosToggle) {
      cosmosToggle.addEventListener('click', function() {
        if (window.CosmosEngine && typeof window.CosmosEngine.toggleManualPause === 'function') {
          var isPaused = window.CosmosEngine.toggleManualPause();
          document.getElementById('icon-cosmos-pause').classList.toggle('hidden', isPaused);
          document.getElementById('icon-cosmos-play').classList.toggle('hidden', !isPaused);
          showToast(isPaused ? '[ MOTOR CÓSMICO PAUSADO ]' : '[ MOTOR CÓSMICO RETOMADO ]', 'info');
        }
      });
    }

    // 2. Navegação por Abas
    var navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        switchTab(tab.dataset.tab);
      });
    });

    // 3. Barra Lateral de Registros (Aba 1)
    document.getElementById('btn-new-story').addEventListener('click', createNewStory);

    var searchInput = document.getElementById('filter-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        state.searchQuery = searchInput.value;
        renderSidebarRecordsList();
      });
    }

    var filterChips = document.querySelectorAll('.filter-chips .chip');
    filterChips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        filterChips.forEach(function(c) { c.classList.remove('active'); });
        chip.classList.add('active');
        state.activeFilter = chip.dataset.filter;
        renderSidebarRecordsList();
      });
    });

    // 4. Edição de Metadados e Slugs
    var titleInput = document.getElementById('meta-title');
    if (titleInput) {
      titleInput.addEventListener('input', function() {
        var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
        if (item) {
          item.title = titleInput.value;
          renderSidebarRecordsList();
        }
      });
    }

    var tagsInput = document.getElementById('meta-tags');
    if (tagsInput) {
      tagsInput.addEventListener('input', function() {
        var tags = tagsInput.value.split(',').map(function(t) { return t.trim(); }).filter(Boolean);
        renderTagsPreview(tags);
      });
    }

    var catSelect = document.getElementById('meta-category');
    var catCustom = document.getElementById('meta-category-custom');
    if (catSelect && catCustom) {
      catSelect.addEventListener('change', function() {
        if (catSelect.value === '_custom') {
          catCustom.classList.remove('hidden');
          catCustom.focus();
        } else {
          catCustom.classList.add('hidden');
        }
      });
    }

    var coverSelect = document.getElementById('meta-cover');
    if (coverSelect) {
      coverSelect.addEventListener('change', function() {
        updateCoverPreview(coverSelect.value);
      });
    }

    // Upload de Imagem de Capa
    var btnUploadCover = document.getElementById('btn-upload-cover');
    var inputCoverFile = document.getElementById('input-cover-file');
    if (btnUploadCover && inputCoverFile) {
      btnUploadCover.addEventListener('click', function() {
        inputCoverFile.click();
      });
      inputCoverFile.addEventListener('change', function(e) {
        handleImageUpload(e.target.files[0], function(newImgPath) {
          coverSelect.value = newImgPath;
          updateCoverPreview(newImgPath);
          showToast('[ NOVA IMAGEM CARREGADA: ' + newImgPath + ' ]', 'success');
        });
      });
    }

    // 5. Editor Markdown
    var mdInput = document.getElementById('markdown-input');
    if (mdInput) {
      mdInput.addEventListener('input', function() {
        state.hasUnsavedChanges = true;
        updateMarkdownPreview(mdInput.value);
        updateEditorMetrics(mdInput.value);

        var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
        if (item && item.file) {
          state.markdownFiles[item.file] = mdInput.value;
        }
      });

      // Suporte à tecla Tab no textarea
      mdInput.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          e.preventDefault();
          var start = mdInput.selectionStart;
          var end = mdInput.selectionEnd;
          mdInput.value = mdInput.value.substring(0, start) + '  ' + mdInput.value.substring(end);
          mdInput.selectionStart = mdInput.selectionEnd = start + 2;
        }
      });
    }

    // Botões da Barra de Ferramentas
    var toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        handleEditorTool(btn.dataset.tool);
      });
    });

    document.getElementById('btn-copy-markdown').addEventListener('click', function() {
      if (mdInput) {
        navigator.clipboard.writeText(mdInput.value);
        showToast('[ MARKDOWN COPIADO PARA ÁREA DE TRANSFERÊNCIA ]', 'info');
      }
    });

    document.getElementById('btn-clear-markdown').addEventListener('click', function() {
      if (confirm('Deseja limpar todo o texto do editor atual?')) {
        if (mdInput) {
          mdInput.value = '';
          updateMarkdownPreview('');
          updateEditorMetrics('');
        }
      }
    });

    // 6. Assistentes Inteligentes de Inserção
    document.getElementById('btn-open-link-modal').addEventListener('click', function() {
      openModal('modal-link');
    });

    document.getElementById('btn-open-image-modal').addEventListener('click', function() {
      openModal('modal-image');
    });

    document.getElementById('btn-open-convert-modal').addEventListener('click', function() {
      openModal('modal-convert');
    });

    document.getElementById('btn-dictate-in-editor').addEventListener('click', toggleEditorCursorVoice);

    // Modal de Links - Sub-Abas
    var modalTabs = document.querySelectorAll('.modal-tab');
    modalTabs.forEach(function(mt) {
      mt.addEventListener('click', function() {
        modalTabs.forEach(function(t) { t.classList.remove('active'); });
        mt.classList.add('active');
        document.querySelectorAll('.subtab-content').forEach(function(c) { c.classList.remove('active'); });
        var target = document.getElementById('subtab-' + mt.dataset.subtab);
        if (target) target.classList.add('active');
      });
    });

    var internalSelect = document.getElementById('link-internal-select');
    if (internalSelect) {
      internalSelect.addEventListener('change', function() {
        var opt = internalSelect.options[internalSelect.selectedIndex];
        document.getElementById('link-internal-text').value = opt.dataset.title;
      });
    }

    var embedUrlInput = document.getElementById('link-embed-url');
    if (embedUrlInput) {
      embedUrlInput.addEventListener('input', function() {
        var prev = document.getElementById('link-embed-preview');
        if (prev) {
          prev.innerHTML = generateResponsiveEmbed(embedUrlInput.value, 'video', 'Prévia');
        }
      });
    }

    document.getElementById('btn-insert-link-confirm').addEventListener('click', function() {
      var activeSubtab = document.querySelector('.modal-tab.active').dataset.subtab;
      var markdownToInsert = '';

      if (activeSubtab === 'internal') {
        var sel = document.getElementById('link-internal-select');
        var txt = document.getElementById('link-internal-text').value || (sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].dataset.title : 'Link');
        markdownToInsert = '[' + txt + '](#' + sel.value + ')';
      } else if (activeSubtab === 'external') {
        var url = document.getElementById('link-external-url').value;
        var extTxt = document.getElementById('link-external-text').value || url;
        markdownToInsert = '[' + extTxt + '](' + url + ')';
      } else if (activeSubtab === 'embed') {
        var embedUrl = document.getElementById('link-embed-url').value;
        markdownToInsert = '\n\n' + generateResponsiveEmbed(embedUrl, 'video', 'Transmissão do Multiverso') + '\n\n';
      }

      insertTextAtCursor(markdownToInsert);
      closeModal('modal-link');
      showToast('[ CONEXÃO INSERIDA NO CONTO ]', 'success');
    });

    // Modal de Imagens
    var imgWidthSelect = document.getElementById('img-width-select');
    var imgWidthCustom = document.getElementById('img-width-custom');
    if (imgWidthSelect && imgWidthCustom) {
      imgWidthSelect.addEventListener('change', function() {
        if (imgWidthSelect.value === 'custom') {
          imgWidthCustom.classList.remove('hidden');
          imgWidthCustom.focus();
        } else {
          imgWidthCustom.classList.add('hidden');
        }
      });
    }

    var galleryUpload = document.getElementById('gallery-file-upload');
    if (galleryUpload) {
      galleryUpload.addEventListener('change', function(e) {
        handleImageUpload(e.target.files[0], function() {
          populateImageGalleryGrid();
          showToast('[ IMAGEM ADICIONADA AO ACERVO ]', 'success');
        });
      });
    }

    document.getElementById('btn-insert-image-confirm').addEventListener('click', function() {
      var imgPath = document.getElementById('img-selected-path').value;
      var altText = document.getElementById('img-alt-text').value || 'Ilustração do Multiverso';
      var widthVal = document.getElementById('img-width-select').value;
      if (widthVal === 'custom') {
        widthVal = document.getElementById('img-width-custom').value || '333';
      }

      var imgHtml = '\n\n<img src="' + imgPath + '" alt="' + escapeHtml(altText) + '" width="' + widthVal + '"/>\n\n';
      insertTextAtCursor(imgHtml);
      closeModal('modal-image');
      showToast('[ IMAGEM INSERIDA NO CONTO ]', 'success');
    });

    // Modal de Conversão HTML
    document.getElementById('btn-convert-confirm-cursor').addEventListener('click', function() {
      var raw = document.getElementById('convert-input').value;
      var cleanMd = convertHtmlToCleanMarkdown(raw);
      insertTextAtCursor(cleanMd);
      closeModal('modal-convert');
      showToast('[ HTML CONVERTIDO E INSERIDO NO CURSOR ]', 'success');
    });

    document.getElementById('btn-convert-confirm-replace').addEventListener('click', function() {
      if (confirm('Deseja substituir todo o texto do editor com o resultado da conversão?')) {
        var raw = document.getElementById('convert-input').value;
        var cleanMd = convertHtmlToCleanMarkdown(raw);
        if (mdInput) {
          mdInput.value = cleanMd;
          updateMarkdownPreview(cleanMd);
          updateEditorMetrics(cleanMd);
        }
        closeModal('modal-convert');
        showToast('[ EDITOR SUBSTITUÍDO COM O MARKDOWN CONVERTIDO ]', 'success');
      }
    });

    // Fechamento de Modais
    document.querySelectorAll('[data-close-modal]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        closeModal(btn.dataset.closeModal);
      });
    });

    // 7. Central de Links & Mídias (Aba 2)
    var mediaUrlInput = document.getElementById('media-url');
    if (mediaUrlInput) {
      mediaUrlInput.addEventListener('input', function() {
        handleMediaUrlInput(mediaUrlInput.value);
      });
    }

    document.getElementById('btn-save-media').addEventListener('click', saveMediaFromForm);
    document.getElementById('btn-clear-media').addEventListener('click', function() {
      document.getElementById('media-url').value = '';
      document.getElementById('media-title').value = '';
      document.getElementById('media-saga').value = '';
      document.getElementById('media-tags').value = '';
      document.getElementById('media-summary').value = '';
      document.getElementById('media-player-preview').innerHTML = '<p class="placeholder-text">Aguardando inserção de URL válida para carregar o player...</p>';
    });

    // 8. Voz & Anotações (Aba 3)
    document.getElementById('btn-toggle-main-voice').addEventListener('click', toggleMainVoiceRecording);
    document.getElementById('btn-clear-transcript').addEventListener('click', function() {
      document.getElementById('voice-transcript-output').value = '';
      document.getElementById('voice-interim-text').textContent = '';
    });

    document.getElementById('btn-send-to-editor').addEventListener('click', function() {
      var text = document.getElementById('voice-transcript-output').value;
      if (!text.trim()) {
        showToast('Nenhum texto transcrito para enviar.', 'warning');
        return;
      }
      insertTextAtCursor('\n\n' + text.trim() + '\n\n');
      switchTab('stories');
      showToast('[ TRANSCRIÇÃO INSERIDA NO EDITOR DE CONTOS ]', 'success');
    });

    document.getElementById('btn-save-as-note').addEventListener('click', function() {
      var text = document.getElementById('voice-transcript-output').value;
      if (!text.trim()) {
        showToast('Nenhum texto transcrito para arquivar.', 'warning');
        return;
      }
      var title = prompt('Título da Anotação:', 'Registro Captado por Voz ' + new Date().toLocaleDateString('pt-BR'));
      if (!title) return;

      var newNote = {
        id: 'note-' + Date.now(),
        title: title.trim(),
        category: 'Crônicas & Sagas',
        tags: ['Voz', 'Lore'],
        content: text.trim(),
        createdAt: new Date().toISOString().split('T')[0]
      };

      if (!state.catalog.notes) state.catalog.notes = [];
      state.catalog.notes.unshift(newNote);
      renderNotesGrid();
      showToast('[ TRANSCRIÇÃO ARQUIVADA NAS ANOTAÇÕES DO MULTIVERSO ]', 'success');
    });

    document.getElementById('btn-create-story-from-voice').addEventListener('click', function() {
      var text = document.getElementById('voice-transcript-output').value;
      if (!text.trim()) {
        showToast('Nenhum texto transcrito para criar conto.', 'warning');
        return;
      }
      var title = prompt('Título do Novo Conto:', 'Novo Registro do Multiverso');
      if (!title) return;

      var slug = title.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      var filename = 'texts/' + slug + '.md';

      var newStory = {
        id: 'story-' + Date.now(),
        title: title.trim(),
        slug: slug,
        type: 'text',
        status: 'draft',
        category: 'Crônicas & Sagas',
        saga: 'Cérebro de Matriosca',
        tags: ['Ditado por Voz', 'Rascunho'],
        summary: text.substring(0, 150) + '...',
        coverImage: 'images/maltuk1.png',
        file: filename,
        readingTime: Math.max(1, Math.ceil(text.split(/\s+/).length / 200)),
        createdAt: new Date().toISOString().split('T')[0],
        relatedIds: []
      };

      state.markdownFiles[filename] = '# ' + title + '\n\n' + text.trim() + '\n\n';
      state.catalog.items.unshift(newStory);
      state.activeItemId = newStory.id;

      switchTab('stories');
      renderSidebarRecordsList();
      loadActiveStoryToEditor();
      showToast('[ NOVO RASCUNHO CRIADO A PARTIR DA VOZ ]', 'success');
    });

    document.getElementById('btn-new-note').addEventListener('click', createNewNoteManual);

    // 9. Laboratório de Design & Tema (Aba 4)
    var presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach(function(card) {
      card.addEventListener('click', function() {
        applyPreset(card.dataset.preset);
      });
    });

    // Inputs de Cores
    var colorInputs = document.querySelectorAll('.picker-input-wrap input[type="color"]');
    colorInputs.forEach(function(inp) {
      inp.addEventListener('input', function() {
        var label = document.getElementById('val-' + inp.id.replace('color-', ''));
        if (label) label.textContent = inp.value;
        collectThemeFromInputs();
      });
    });

    // Sliders
    var sliders = [
      { id: 'typo-size', label: 'val-baseSize', unit: 'px' },
      { id: 'typo-height', label: 'val-lineHeight', unit: '' },
      { id: 'cosmos-stars', label: 'val-starCount', unit: '' },
      { id: 'cosmos-streams', label: 'val-streamCount', unit: '' },
      { id: 'cosmos-speed', label: 'val-speed', unit: '' },
      { id: 'cosmos-nebula', label: 'val-nebula', unit: '' },
      { id: 'cosmos-matrix', label: 'val-matrix', unit: '' }
    ];

    sliders.forEach(function(item) {
      var el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('input', function() {
          var lbl = document.getElementById(item.label);
          if (lbl) lbl.textContent = el.value + item.unit;
          collectThemeFromInputs();
        });
      }
    });

    var selects = ['typo-display', 'typo-body', 'typo-reading', 'typo-mono', 'cosmos-pauseOnReading'];
    selects.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', collectThemeFromInputs);
      }
    });

    document.getElementById('btn-apply-theme').addEventListener('click', function() {
      collectThemeFromInputs();
      saveAllToProject();
    });

    document.getElementById('btn-reset-theme').addEventListener('click', function() {
      applyPreset('matrioshka-amber');
    });

    // 10. Downloads de Exportação (Modal 4)
    document.getElementById('btn-download-catalog').addEventListener('click', function() {
      downloadJson('catalog.json', state.catalog);
    });

    document.getElementById('btn-download-theme').addEventListener('click', function() {
      downloadJson('theme.json', state.theme);
    });

    document.getElementById('btn-download-active-md').addEventListener('click', function() {
      var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
      if (item && item.file && state.markdownFiles[item.file]) {
        var rawName = item.file.replace(/^texts\//, '');
        downloadText(rawName, state.markdownFiles[item.file]);
      } else {
        showToast('Nenhum texto ativo para download.', 'warning');
      }
    });

    document.getElementById('btn-download-legacy').addEventListener('click', function() {
      var publishedTexts = ["intro.md"];
      var publishedMedia = [];

      state.catalog.items.forEach(function(item) {
        if (item.type === 'text' && item.status === 'published' && item.file) {
          publishedTexts.push(item.file.replace(/^texts\//, ''));
        }
        if ((item.type === 'video' || item.type === 'audio') && item.status === 'published') {
          publishedMedia.push({ type: item.type, title: item.title, url: item.url });
        }
      });

      downloadJson('texts.json', publishedTexts);
      downloadJson('media.json', publishedMedia);
    });

    document.getElementById('btn-download-bundle').addEventListener('click', function() {
      var bundle = {
        catalog: state.catalog,
        theme: state.theme,
        markdownFiles: state.markdownFiles,
        exportedAt: new Date().toISOString()
      };
      downloadJson('esquizofrenia_estelar_bundle_' + Date.now() + '.json', bundle);
    });
  }

  function switchTab(tabKey) {
    document.querySelectorAll('.nav-tab').forEach(function(tab) {
      tab.classList.toggle('active', tab.dataset.tab === tabKey);
    });
    document.querySelectorAll('.tab-panel').forEach(function(panel) {
      panel.classList.toggle('active', panel.id === 'panel-' + tabKey);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleImageUpload(file, callback) {
    if (!file) return;

    var fileName = file.name.toLowerCase().replace(/\s+/g, '_');
    var objUrl = URL.createObjectURL(file);
    var imageObj = {
      name: fileName,
      path: 'images/' + fileName,
      url: objUrl,
      blob: file,
      isNew: true
    };

    // Adiciona ao acervo em memória
    state.images.push(imageObj);
    updateCoverSelectors();

    if (typeof callback === 'function') {
      callback('images/' + fileName);
    }
  }

})();
