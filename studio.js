/**
 * Esquizofrenia Estelar 2.0 - Local Admin Studio
 * Zero Emojis - 100% Typographic Glyphs & Clean Vector SVGs
 * 
 * Funcionalidades:
 * - Persistência direta via File System Access API (showDirectoryPicker)
 * - Cache local de contingência (localStorage: ee_studio_backup)
 * - Navegação simplificada em 3 abas: Conteúdo, Anotações & Voz, Visual
 * - Criação e edição unificada de Textos, Áudios e Vídeos
 * - Preview ao vivo do post exatamente como aparece no portal público
 * - Ditado por voz nativo contínuo em pt-BR com pontuação falada
 * - 4 Presets artísticos instantâneos e personalização de tema
 * - Regeneração automática de texts.json e media.json
 */

(function() {
  'use strict';

  // =========================================================================
  // DADOS PADRÃO DE INICIALIZAÇÃO
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
        "coverImage": "images/maltuk1.webp",
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
        "coverImage": "images/conselho_solar_01.webp",
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
        "description": "Ouro quente e âmbar estelar inspirado no núcleo de energia do Cérebro de Matriosca.",
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
        "description": "Terminal bio-cyber e fluxo denso de dados quânticos dos Zeladores.",
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
        "description": "Resfriamento criogênico e radiação Cerenkov dos condutores quânticos.",
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
        "description": "Horizonte de eventos de buraco negro e dobra dimensional dos Thyrexianos.",
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
    "texts/intro.md": "# Bem-vindo aos Arquivos do Multiverso\n\nDiante de você, o futuro da humanidade desdobra-se — um cosmos onde o familiar dissolve-se no extraordinário. Imagine a luz de um sol artificial filtrando-se pelas frestas de uma megaestrutura, tão colossal que, à distância, confunde-se com uma constelação feita pela mão humana.\n\nNo coração desse universo pulsante, ergue-se o Computador no Fim do Universo, um Cérebro de Matriosca, obra-prima da engenhosidade da vida, uma catedral de neurônios sintéticos que abriga trilhões de mentes vivendo incontáveis cenários.",
    "texts/01_os_arquivistas.md": "# Os Arquivistas\n\n* Apresentação do primeiro contato com um Maltuk (O Arquivista)\n* Contar a história dos Maltuks e seu propósito\n* Os Maltuks cantam canções em vibrações inexplicáveis, somente presenciando tal proeza para compreender esse fenômeno. Aqui é uma tradução descritiva auxiliada pelas máquinas sencientes, o sistema que permite a interação entre nós seres vivos dessa dimensão, e os arautos do fim do mundo.\n\nMaltuk Arquivista\n<img src=\"images/maltuk1.webp\" alt=\"Maltuk e seu manto\" width=\"333\"/>\n\nMaltuk Priestess\n<img src=\"images/maltuk2.webp\" alt=\"Maltuk Priestess\" width=\"333\"/>",
    "texts/02_metamorphis.md": "# A Saga Metamorphis\n\n## Prelúdio do Caos\n\n* Transcrever aqui as notas do papel sobre a história da formação, ascensão e declínio do Conselho Solar da Nova Era.\n\nEsboço inicial do banner:\n* Os Maltuks ao centro deveriam ser mais insetídeos\n* Os Thyrexianos mecanos da esquerda ao meio são mais reptilianos tecnológicos\n\n<img src=\"images/conselho_solar_01.webp\" alt=\"Conselho Solar\" width=\"333\"/>"
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
      { name: "maltuk1.webp", path: "images/maltuk1.webp", url: "images/maltuk1.webp" },
      { name: "maltuk2.webp", path: "images/maltuk2.webp", url: "images/maltuk2.webp" },
      { name: "conselho_solar_01.webp", path: "images/conselho_solar_01.webp", url: "images/conselho_solar_01.webp" }
    ],
    activeItemId: "01-os-arquivistas",
    activeFilter: "all",
    searchQuery: "",
    previewMode: "reader", // "reader" ou "card"
    isSaving: false,

    // Web Speech State
    speechRecognition: null,
    isRecordingVoiceTab: false,
    isRecordingEditorCursor: false,
    audioContext: null,
    analyserNode: null,
    mediaStream: null,
    voiceAnimId: null,

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
  // CARGA DE DADOS & PERSISTÊNCIA
  // =========================================================================

  function loadLocalBackupOrFetch() {
    // 1. Tentar ler do localStorage
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

    // 2. Tentar ler arquivos locais se estiver sob HTTP
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
        renderAll();
      }).catch(function() {
        applyTheme(state.theme);
        renderAll();
      });
    } else {
      applyTheme(state.theme);
      renderAll();
    }
  }

  // =========================================================================
  // FILE SYSTEM ACCESS API
  // =========================================================================

  async function connectProjectDirectory() {
    if (!('showDirectoryPicker' in window)) {
      showToast('Navegador sem suporte à File System Access API. Cache local ativo!', 'warning');
      return;
    }

    try {
      var dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
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
      } catch (e) {
        console.log('catalog.json novo ou mantido');
      }

      // 2. Ler theme.json se existir
      try {
        var thmFileHandle = await dirHandle.getFileHandle('theme.json');
        var thmFile = await thmFileHandle.getFile();
        var thmText = await thmFile.text();
        state.theme = JSON.parse(thmText);
      } catch (e) {
        console.log('theme.json novo ou mantido');
      }

      // 3. Ler arquivos .md na pasta texts/
      try {
        var textsDir = await dirHandle.getDirectoryHandle('texts');
        for await (var entry of textsDir.values()) {
          if (entry.kind === 'file' && entry.name.endsWith('.md')) {
            var f = await entry.getFile();
            var text = await f.text();
            state.markdownFiles['texts/' + entry.name] = text;
          }
        }
      } catch (e) {
        console.log('texts/ lido');
      }

      // 4. Listar imagens em images/
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
      } catch (e) {
        console.log('images/ lido');
      }

      updateConnectionStatus(true, dirHandle.name);
      applyTheme(state.theme);
      renderAll();
      showToast('Pasta conectada: ' + dirHandle.name.toUpperCase(), 'success');

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Erro ao conectar pasta:', err);
        showToast('Erro ao acessar a pasta: ' + err.message, 'error');
      }
    }
  }

  function updateConnectionStatus(isConnected, folderName) {
    var indicator = document.getElementById('connection-indicator');
    var label = document.getElementById('connection-status-text');

    if (isConnected) {
      indicator.className = 'status-dot mode-fs';
      label.textContent = 'Pasta Conectada: ' + (folderName || 'esquizofreniaestelar');
    } else {
      indicator.className = 'status-dot mode-local';
      label.textContent = 'Cache Local';
    }
  }

  // =========================================================================
  // SALVAR NO PROJETO (AÇÃO PRINCIPAL)
  // =========================================================================

  async function saveAllToProject() {
    saveActiveItemFromUI();
    state.catalog.updatedAt = new Date().toISOString();

    // 1. Salvar no localStorage
    try {
      localStorage.setItem('ee_studio_backup', JSON.stringify({
        catalog: state.catalog,
        theme: state.theme,
        markdownFiles: state.markdownFiles,
        timestamp: state.catalog.updatedAt
      }));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }

    // 2. Se houver pasta conectada via File System Access API, gravar no disco
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

        // E. REGENERAR texts.json (Compatibilidade com index.html)
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

        // F. REGENERAR media.json (Compatibilidade com index.html)
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
        updateSaveStatus('Salvo no disco');
        showToast('Projeto salvo no disco com sucesso', 'success');
        return;

      } catch (err) {
        state.isSaving = false;
        console.error('Erro ao gravar no disco:', err);
        showToast('Falha ao gravar no disco: ' + err.message, 'error');
        return;
      }
    }

    updateSaveStatus('Salvo no cache local');
    showToast('Salvo no cache local. Conecte a pasta para gravar no disco.', 'info');
  }

  function updateSaveStatus(text) {
    var el = document.getElementById('stat-save-status');
    if (el) el.textContent = text;
  }

  // =========================================================================
  // GESTÃO DE RENDERIZAÇÃO
  // =========================================================================

  function renderAll() {
    renderSidebarRecordsList();
    renderActiveEditor();
    renderNotesGrid();
    renderThemeControls();
    updateCoverSelectors();
  }

  // =========================================================================
  // ABA 1: CONTEÚDO (BARRA LATERAL E LISTA UNIFICADA)
  // =========================================================================

  function renderSidebarRecordsList() {
    var listEl = document.getElementById('records-list');
    var counterEl = document.getElementById('records-counter');
    if (!listEl) return;

    var items = state.catalog.items.filter(function(item) {
      if (state.activeFilter === 'text' && item.type !== 'text') return false;
      if (state.activeFilter === 'audio' && item.type !== 'audio') return false;
      if (state.activeFilter === 'video' && item.type !== 'video') return false;
      if (state.activeFilter === 'draft' && item.status !== 'draft') return false;

      if (state.searchQuery) {
        var q = state.searchQuery.toLowerCase();
        var matchTitle = (item.title || '').toLowerCase().indexOf(q) !== -1;
        var matchSummary = (item.summary || '').toLowerCase().indexOf(q) !== -1;
        var matchCategory = (item.category || '').toLowerCase().indexOf(q) !== -1;
        return matchTitle || matchSummary || matchCategory;
      }
      return true;
    });

    if (counterEl) {
      counterEl.textContent = items.length;
    }

    listEl.innerHTML = '';

    if (items.length === 0) {
      var emptyEl = document.createElement('div');
      emptyEl.style.padding = '20px 10px';
      emptyEl.style.textAlign = 'center';
      emptyEl.style.color = 'var(--text-muted)';
      emptyEl.style.fontSize = '0.75rem';
      emptyEl.textContent = 'Nenhum registro encontrado.';
      listEl.appendChild(emptyEl);
      return;
    }

    items.forEach(function(item) {
      var itemEl = document.createElement('div');
      itemEl.className = 'record-item' + (item.id === state.activeItemId ? ' active' : '');
      itemEl.dataset.id = item.id;

      var typeBadgeClass = item.type === 'text' ? 'badge-cyan' : (item.type === 'audio' ? 'badge-amber' : 'badge-purple');
      var typeLabel = item.type === 'text' ? 'TEXTO' : (item.type === 'audio' ? 'ÁUDIO' : 'VÍDEO');

      var statusBadgeClass = item.status === 'published' ? 'badge-emerald' : 'badge-amber';
      var statusLabel = item.status === 'published' ? 'PUB' : 'RASC';

      itemEl.innerHTML =
        '<div class="record-item-top">' +
          '<div class="record-item-badges">' +
            '<span class="badge ' + typeBadgeClass + '">' + typeLabel + '</span>' +
            '<span class="badge ' + statusBadgeClass + '">' + statusLabel + '</span>' +
          '</div>' +
          '<button class="btn-item-delete" data-delete-id="' + item.id + '" type="button" title="Excluir item">&times;</button>' +
        '</div>' +
        '<div class="record-item-title">' + escapeHtml(item.title || '(Sem título)') + '</div>';

      itemEl.addEventListener('click', function(e) {
        if (e.target.closest('.btn-item-delete')) {
          e.stopPropagation();
          deleteItem(item.id);
          return;
        }
        selectItem(item.id);
      });

      listEl.appendChild(itemEl);
    });
  }

  function selectItem(itemId) {
    if (state.activeItemId === itemId) return;
    saveActiveItemFromUI();
    state.activeItemId = itemId;
    renderSidebarRecordsList();
    renderActiveEditor();
  }

  function deleteItem(itemId) {
    var item = state.catalog.items.find(function(i) { return i.id === itemId; });
    if (!item) return;

    if (confirm('Deseja excluir o registro "' + item.title + '" do catálogo?')) {
      state.catalog.items = state.catalog.items.filter(function(i) { return i.id !== itemId; });
      if (state.activeItemId === itemId) {
        state.activeItemId = state.catalog.items.length > 0 ? state.catalog.items[0].id : null;
      }
      renderSidebarRecordsList();
      renderActiveEditor();
      showToast('Registro excluído do catálogo', 'info');
    }
  }

  function createNewItem(type) {
    saveActiveItemFromUI();
    var timestamp = Date.now();
    var dateStr = new Date().toISOString().slice(0, 10);
    var newItem;

    if (type === 'text') {
      var slug = 'novo-texto-' + timestamp;
      var filePath = 'texts/' + slug + '.md';
      newItem = {
        id: 'text-' + timestamp,
        title: 'Novo Texto',
        slug: slug,
        type: 'text',
        status: 'draft',
        category: 'Crônicas & Sagas',
        saga: 'Cérebro de Matriosca',
        tags: [],
        summary: '',
        coverImage: '',
        file: filePath,
        readingTime: 1,
        createdAt: dateStr,
        relatedIds: []
      };
      state.markdownFiles[filePath] = '# Novo Texto\n\nEscreva sua narrativa aqui...';
    } else if (type === 'audio') {
      newItem = {
        id: 'audio-' + timestamp,
        title: 'Nova Transmissão Sonora',
        slug: 'nova-transmissao-' + timestamp,
        type: 'audio',
        status: 'draft',
        category: 'Transmissões Sonoras',
        saga: 'Ecos da Quinta Dimensão',
        tags: ['Podcast', 'Transmissão'],
        summary: '',
        url: '',
        createdAt: dateStr,
        relatedIds: []
      };
    } else if (type === 'video') {
      newItem = {
        id: 'video-' + timestamp,
        title: 'Novo Registro Visual',
        slug: 'novo-registro-' + timestamp,
        type: 'video',
        status: 'draft',
        category: 'Registros Visuais',
        saga: 'Arquivos do Multiverso',
        tags: ['Registro Visual'],
        summary: '',
        url: '',
        createdAt: dateStr,
        relatedIds: []
      };
    }

    state.catalog.items.unshift(newItem);
    state.activeItemId = newItem.id;
    renderSidebarRecordsList();
    renderActiveEditor();
    showToast('Novo ' + type.toUpperCase() + ' criado (Rascunho)', 'success');
  }

  // =========================================================================
  // ÁREA DE EDIÇÃO DINÂMICA (TEXTO VS MÍDIA)
  // =========================================================================

  function renderActiveEditor() {
    var textEditorView = document.getElementById('text-editor-view');
    var mediaEditorView = document.getElementById('media-editor-view');
    var emptyEditorView = document.getElementById('empty-editor-view');

    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });

    if (!item) {
      if (textEditorView) textEditorView.classList.add('hidden');
      if (mediaEditorView) mediaEditorView.classList.add('hidden');
      if (emptyEditorView) emptyEditorView.classList.remove('hidden');
      return;
    }

    if (emptyEditorView) emptyEditorView.classList.add('hidden');

    if (item.type === 'text') {
      if (mediaEditorView) mediaEditorView.classList.add('hidden');
      if (textEditorView) textEditorView.classList.remove('hidden');
      loadTextItemToEditor(item);
    } else {
      if (textEditorView) textEditorView.classList.add('hidden');
      if (mediaEditorView) mediaEditorView.classList.remove('hidden');
      loadMediaItemToEditor(item);
    }
  }

  function loadTextItemToEditor(item) {
    document.getElementById('meta-title').value = item.title || '';
    document.getElementById('meta-status').value = item.status || 'published';
    document.getElementById('meta-summary').value = item.summary || '';

    updateCoverSelectors();
    var coverSelect = document.getElementById('meta-cover');
    if (coverSelect) {
      coverSelect.value = item.coverImage || '';
    }

    // Carregar markdown
    var mdInput = document.getElementById('markdown-input');
    var content = state.markdownFiles[item.file] || '';
    if (mdInput) {
      mdInput.value = content;
      updateEditorMetrics(content);
    }

    var fileInfo = document.getElementById('stat-file-info');
    if (fileInfo) fileInfo.textContent = 'Arquivo: ' + (item.file || 'texts/...');

    updateTextLivePreview();
  }

  function loadMediaItemToEditor(item) {
    var urlInput = document.getElementById('media-url');
    var titleInput = document.getElementById('media-title');
    var statusSelect = document.getElementById('media-status');
    var summaryInput = document.getElementById('media-summary');
    var badge = document.getElementById('media-form-type-badge');
    var heading = document.getElementById('media-form-heading');

    if (urlInput) urlInput.value = item.url || '';
    if (titleInput) titleInput.value = item.title || '';
    if (statusSelect) statusSelect.value = item.status || 'published';
    if (summaryInput) summaryInput.value = item.summary || '';

    if (badge) {
      badge.textContent = item.type === 'audio' ? 'ÁUDIO' : 'VÍDEO';
      badge.className = 'badge ' + (item.type === 'audio' ? 'badge-amber' : 'badge-cyan');
    }

    if (heading) {
      heading.textContent = item.type === 'audio' ? 'TRANSMISSÃO SONORA (SPOTIFY)' : 'REGISTRO VISUAL (YOUTUBE)';
    }

    updateMediaLivePreview();
  }

  function saveActiveItemFromUI() {
    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (!item) return;

    if (item.type === 'text') {
      var titleInput = document.getElementById('meta-title');
      var statusSelect = document.getElementById('meta-status');
      var coverSelect = document.getElementById('meta-cover');
      var summaryInput = document.getElementById('meta-summary');
      var mdInput = document.getElementById('markdown-input');

      if (titleInput) item.title = titleInput.value.trim();
      if (statusSelect) item.status = statusSelect.value;
      if (coverSelect) item.coverImage = coverSelect.value;
      if (summaryInput) item.summary = summaryInput.value.trim();

      if (mdInput) {
        var text = mdInput.value;
        if (!item.file) {
          var slug = generateSlug(item.title);
          item.slug = slug;
          item.file = 'texts/' + slug + '.md';
        }
        state.markdownFiles[item.file] = text;
        item.readingTime = calculateReadingTime(text);
      }
    } else {
      var mediaUrlInput = document.getElementById('media-url');
      var mediaTitleInput = document.getElementById('media-title');
      var mediaStatusSelect = document.getElementById('media-status');
      var mediaSummaryInput = document.getElementById('media-summary');

      if (mediaUrlInput) item.url = mediaUrlInput.value.trim();
      if (mediaTitleInput) item.title = mediaTitleInput.value.trim();
      if (mediaStatusSelect) item.status = mediaStatusSelect.value;
      if (mediaSummaryInput) item.summary = mediaSummaryInput.value.trim();

      // Auto detecção de tipo por URL
      if (item.url) {
        if (/spotify\.com/i.test(item.url)) {
          item.type = 'audio';
          item.category = 'Transmissões Sonoras';
        } else if (/youtu(be|\.be)/i.test(item.url)) {
          item.type = 'video';
          item.category = 'Registros Visuais';
        }
      }
    }
  }

  // =========================================================================
  // PRÉVIA AO VIVO DE TEXTO (LEITURA VS CARD)
  // =========================================================================

  function updateTextLivePreview() {
    var container = document.getElementById('live-preview-container');
    if (!container) return;

    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (!item || item.type !== 'text') return;

    var title = document.getElementById('meta-title').value || item.title || 'Título do Texto';
    var cover = document.getElementById('meta-cover').value || item.coverImage;
    var summary = document.getElementById('meta-summary').value || item.summary;
    var mdInput = document.getElementById('markdown-input');
    var mdContent = mdInput ? mdInput.value : (state.markdownFiles[item.file] || '');
    var readingTime = calculateReadingTime(mdContent);

    if (state.previewMode === 'card') {
      // PREVIEW DO CARD (EXATAMENTE COMO APARECE NO INDEX.HTML)
      var excerpt = summary.trim() ? summary.trim() : generateExcerpt(mdContent);
      var coverHtml = '';
      if (cover) {
        coverHtml =
          '<div class="card-cover-wrapper">' +
            '<img src="' + escapeHtml(cover) + '" alt="' + escapeHtml(title) + '" class="card-cover-img">' +
            '<div class="card-scanline-overlay"></div>' +
          '</div>';
      } else {
        coverHtml =
          '<div class="card-cover-wrapper">' +
            '<div class="card-placeholder-art">' +
              '<span class="placeholder-glyph">ƎƎ</span>' +
              '<span class="placeholder-label">ARQUIVO DE TEXTO</span>' +
            '</div>' +
            '<div class="card-scanline-overlay"></div>' +
          '</div>';
      }

      var tagsHtml = (item.tags || []).map(function(t) {
        return '<span class="card-tag">#' + escapeHtml(t) + '</span>';
      }).join('');

      container.innerHTML =
        '<div style="max-width: 380px; margin: 0 auto;">' +
          '<article class="cyber-card">' +
            coverHtml +
            '<div class="card-body">' +
              '<div class="card-meta-row">' +
                '<span class="meta-pill category-pill">' + escapeHtml(item.category || 'Crônicas & Sagas') + '</span>' +
                '<span class="meta-pill time-pill">~' + readingTime + ' MIN LEITURA</span>' +
              '</div>' +
              '<h3 class="card-title">' + escapeHtml(title) + '</h3>' +
              '<p class="card-summary">' + escapeHtml(excerpt) + '</p>' +
              (tagsHtml ? '<div class="card-tags">' + tagsHtml + '</div>' : '') +
              '<div class="card-footer-action">' +
                '<button class="card-access-btn" type="button">' +
                  '<span>ACESSAR REGISTRO [ // ]</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</article>' +
        '</div>';

    } else {
      // PREVIEW DA LEITURA (EXATAMENTE COMO APARECE NO LEITOR DO PORTAL)
      var htmlContent = state.converter ? state.converter.makeHtml(mdContent) : mdContent;
      var coverReaderHtml = cover ?
        '<div class="preview-reader-cover"><img src="' + escapeHtml(cover) + '" alt="' + escapeHtml(title) + '"></div>' : '';

      container.innerHTML =
        '<div class="preview-reader-card">' +
          coverReaderHtml +
          '<div class="preview-reader-header">' +
            '<div class="card-meta-row">' +
              '<span class="meta-pill category-pill">' + escapeHtml(item.category || 'Crônicas & Sagas') + '</span>' +
              '<span class="meta-pill time-pill">~' + readingTime + ' MIN LEITURA</span>' +
            '</div>' +
            '<h1 class="preview-reader-title">' + escapeHtml(title) + '</h1>' +
          '</div>' +
          '<article class="markdown-content">' + htmlContent + '</article>' +
        '</div>';
    }
  }

  // =========================================================================
  // PRÉVIA AO VIVO DE MÍDIA (ÁUDIO OU VÍDEO COM PLAYER RESPONSIVO)
  // =========================================================================

  function updateMediaLivePreview() {
    var container = document.getElementById('media-live-preview-card');
    if (!container) return;

    var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
    if (!item) return;

    var urlInput = document.getElementById('media-url');
    var titleInput = document.getElementById('media-title');
    var summaryInput = document.getElementById('media-summary');

    var url = urlInput ? urlInput.value.trim() : (item.url || '');
    var title = titleInput ? titleInput.value.trim() : (item.title || 'Título da Transmissão');
    var summary = summaryInput ? summaryInput.value.trim() : (item.summary || '');

    var isAudio = item.type === 'audio' || /spotify\.com/i.test(url);
    var isVideo = item.type === 'video' || /youtu(be|\.be)/i.test(url);

    var mediaHtml = '';

    if (isAudio && url) {
      var spotifyEmbed = getSpotifyEmbedUrl(url);
      mediaHtml =
        '<div class="media-embed-frame spotify-embed-container">' +
          '<iframe src="' + escapeHtml(spotifyEmbed) + '" width="100%" height="152" allow="encrypted-media" loading="lazy"></iframe>' +
        '</div>';
    } else if (isVideo && url) {
      var ytId = getYoutubeId(url);
      if (ytId) {
        mediaHtml =
          '<div class="media-embed-frame video-embed-container">' +
            '<iframe src="https://www.youtube-nocookie.com/embed/' + escapeHtml(ytId) + '?rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>' +
          '</div>';
      } else {
        mediaHtml =
          '<div class="card-cover-wrapper">' +
            '<div class="card-placeholder-art">' +
              '<span class="placeholder-glyph">VÍDEO</span>' +
              '<span class="placeholder-label">URL NÃO RECONHECIDA</span>' +
            '</div>' +
          '</div>';
      }
    } else {
      mediaHtml =
        '<div class="card-cover-wrapper">' +
          '<div class="card-placeholder-art">' +
            '<span class="placeholder-glyph">' + (isAudio ? 'ÁUDIO' : 'VÍDEO') + '</span>' +
            '<span class="placeholder-label">INSIRA UMA URL VÁLIDA</span>' +
          '</div>' +
        '</div>';
    }

    container.innerHTML =
      '<article class="cyber-card">' +
        mediaHtml +
        '<div class="card-body">' +
          '<div class="card-meta-row">' +
            '<span class="meta-pill category-pill">' + escapeHtml(item.category || (isAudio ? 'Transmissões Sonoras' : 'Registros Visuais')) + '</span>' +
            '<span class="meta-pill time-pill">' + (isAudio ? 'ÁUDIO' : 'VÍDEO') + '</span>' +
          '</div>' +
          '<h3 class="card-title">' + escapeHtml(title || '(Sem título)') + '</h3>' +
          (summary ? '<p class="card-summary">' + escapeHtml(summary) + '</p>' : '') +
        '</div>' +
      '</article>';
  }

  // =========================================================================
  // ABA 2: ANOTAÇÕES & VOZ (WEB SPEECH API NATIVA)
  // =========================================================================

  function initSpeechEngine(targetMode) {
    var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      showToast('Navegador sem suporte à Web Speech API. Use Chrome, Edge ou Brave.', 'error');
      return null;
    }

    var recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    recognition.onstart = function() {
      if (targetMode === 'tab') {
        state.isRecordingVoiceTab = true;
        updateVoiceTabUI(true);
        startVoiceLevelBar();
      } else if (targetMode === 'cursor') {
        state.isRecordingEditorCursor = true;
        updateCursorVoiceUI(true);
      }
      showToast('Captação de voz iniciada em pt-BR', 'info');
    };

    recognition.onresult = function(event) {
      var finalTranscript = '';
      var interimTranscript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        var piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += piece;
        } else {
          interimTranscript += piece;
        }
      }

      if (finalTranscript) {
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
      if (event.error !== 'no-speech') {
        console.warn('Erro SpeechRecognition:', event.error);
        showToast('Erro no reconhecimento de voz: ' + event.error, 'error');
      }
    };

    recognition.onend = function() {
      if (targetMode === 'tab') {
        state.isRecordingVoiceTab = false;
        updateVoiceTabUI(false);
        stopVoiceLevelBar();
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
        console.error('Falha ao iniciar SpeechRecognition:', e);
      }
    }
  }

  function updateVoiceTabUI(isRecording) {
    var btn = document.getElementById('btn-toggle-main-voice');
    var label = document.getElementById('voice-toggle-label');
    var badge = document.getElementById('voice-status-badge');

    if (btn && label && badge) {
      if (isRecording) {
        btn.classList.add('recording');
        label.textContent = 'Parar Ditado';
        badge.className = 'badge badge-emerald';
        badge.textContent = 'OUVINDO (pt-BR)...';
      } else {
        btn.classList.remove('recording');
        label.textContent = 'Iniciar Ditado';
        badge.className = 'badge badge-amber';
        badge.textContent = 'MICROFONE INATIVO';
      }
    }
  }

  function updateCursorVoiceUI(isRecording) {
    var btn = document.getElementById('btn-dictate-in-editor');
    var label = document.getElementById('btn-dictate-text');

    if (btn && label) {
      if (isRecording) {
        btn.classList.add('recording');
        label.textContent = 'Parar Ditado';
      } else {
        btn.classList.remove('recording');
        label.textContent = 'Ditar (Voz)';
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
      .replace(/\s*reticências\b/gi, '...');
  }

  function startVoiceLevelBar() {
    var bar = document.getElementById('voice-level-bar');
    if (!bar) return;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
        state.mediaStream = stream;
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        state.audioContext = new AudioCtx();
        var source = state.audioContext.createMediaStreamSource(stream);
        state.analyserNode = state.audioContext.createAnalyser();
        state.analyserNode.fftSize = 64;
        source.connect(state.analyserNode);

        var dataArray = new Uint8Array(state.analyserNode.frequencyBinCount);
        function updateMeter() {
          if (!state.isRecordingVoiceTab) return;
          state.analyserNode.getByteFrequencyData(dataArray);
          var sum = 0;
          for (var i = 0; i < dataArray.length; i++) sum += dataArray[i];
          var avg = sum / dataArray.length;
          var pct = Math.min(100, Math.max(8, (avg / 128) * 100));
          bar.style.width = pct + '%';
          state.voiceAnimId = requestAnimationFrame(updateMeter);
        }
        updateMeter();
      }).catch(function() {
        // Fallback sutil de animação
        bar.style.width = '70%';
      });
    }
  }

  function stopVoiceLevelBar() {
    var bar = document.getElementById('voice-level-bar');
    if (bar) bar.style.width = '0%';
    if (state.voiceAnimId) cancelAnimationFrame(state.voiceAnimId);
    if (state.mediaStream) {
      state.mediaStream.getTracks().forEach(function(t) { t.stop(); });
      state.mediaStream = null;
    }
    if (state.audioContext) {
      state.audioContext.close();
      state.audioContext = null;
    }
  }

  function renderNotesGrid() {
    var grid = document.getElementById('notes-grid');
    var counter = document.getElementById('notes-counter');
    if (!grid) return;

    var notes = state.catalog.notes || [];
    if (counter) counter.textContent = notes.length;

    grid.innerHTML = '';

    if (notes.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">Nenhuma anotação registrada no momento.</div>';
      return;
    }

    notes.forEach(function(note) {
      var noteEl = document.createElement('div');
      noteEl.className = 'note-card';

      noteEl.innerHTML =
        '<div class="note-card-top">' +
          '<h4 class="note-card-title">' + escapeHtml(note.title || 'Anotação') + '</h4>' +
          '<span class="note-card-date">' + escapeHtml(note.createdAt || '') + '</span>' +
        '</div>' +
        '<p class="note-card-content">' + escapeHtml(note.content || '') + '</p>' +
        '<div class="note-card-actions">' +
          '<button class="btn btn-tiny btn-cyber btn-convert-note" data-note-id="' + note.id + '" type="button">Transformar em Texto</button>' +
          '<button class="btn-item-delete btn-delete-note" data-note-id="' + note.id + '" type="button" title="Excluir anotação">&times;</button>' +
        '</div>';

      noteEl.querySelector('.btn-convert-note').addEventListener('click', function() {
        createStoryFromNote(note);
      });

      noteEl.querySelector('.btn-delete-note').addEventListener('click', function() {
        deleteNote(note.id);
      });

      grid.appendChild(noteEl);
    });
  }

  function createStoryFromNote(note) {
    var timestamp = Date.now();
    var slug = generateSlug(note.title || 'nota-' + timestamp);
    var filePath = 'texts/' + slug + '.md';

    var newItem = {
      id: 'text-' + timestamp,
      title: note.title || 'Novo Texto de Lore',
      slug: slug,
      type: 'text',
      status: 'draft',
      category: note.category || 'Crônicas & Sagas',
      saga: 'Cérebro de Matriosca',
      tags: note.tags || [],
      summary: (note.content || '').slice(0, 150),
      coverImage: '',
      file: filePath,
      readingTime: calculateReadingTime(note.content || ''),
      createdAt: new Date().toISOString().slice(0, 10),
      relatedIds: []
    };

    state.markdownFiles[filePath] = '# ' + (note.title || 'Novo Texto') + '\n\n' + (note.content || '');
    state.catalog.items.unshift(newItem);
    state.activeItemId = newItem.id;

    switchTab('content');
    renderSidebarRecordsList();
    renderActiveEditor();
    showToast('Anotação convertida em novo rascunho de Texto', 'success');
  }

  function deleteNote(noteId) {
    if (confirm('Deseja excluir esta anotação permanentemente?')) {
      state.catalog.notes = (state.catalog.notes || []).filter(function(n) { return n.id !== noteId; });
      renderNotesGrid();
      showToast('Anotação excluída', 'info');
    }
  }

  // =========================================================================
  // ABA 3: VISUAL (PRESETS & CONTROLES ESSENCIAIS)
  // =========================================================================

  function renderThemeControls() {
    var theme = state.theme || DEFAULT_THEME;

    // Presets cards
    var presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach(function(card) {
      if (card.dataset.preset === theme.activePreset) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Cores
    var colors = theme.colors || {};
    setColorVal('color-accentPrimary', 'val-accentPrimary', colors.accentPrimary || '#e6a817');
    setColorVal('color-accentSecondary', 'val-accentSecondary', colors.accentSecondary || '#00f0ff');
    setColorVal('color-bgPrimary', 'val-bgPrimary', colors.bgPrimary || '#050609');
    setColorVal('color-textPrimary', 'val-textPrimary', colors.textPrimary || '#e6edf5');
    setColorVal('color-matrixGlow', 'val-matrixGlow', colors.matrixGlow || '#00ff9d');

    // Tipografia
    var typo = theme.typography || {};
    var typoReading = document.getElementById('typo-reading');
    if (typoReading && typo.fontReading) typoReading.value = typo.fontReading;
    setSliderVal('typo-size', 'val-baseSize', typo.baseSizePx || 18, 'px');

    // Cosmos
    var cosmos = theme.cosmos || {};
    setSliderVal('cosmos-stars', 'val-starCount', cosmos.starCount || 150, '');
    setSliderVal('cosmos-streams', 'val-streamCount', cosmos.matrixStreamCount || 32, '');
    setSliderVal('cosmos-speed', 'val-speed', cosmos.speed || 0.45, '');
    setSliderVal('cosmos-nebula', 'val-nebula', cosmos.nebulaOpacity || 0.35, '');
    setSliderVal('cosmos-matrix', 'val-matrix', cosmos.matrixOpacity || 0.18, '');

    var pauseCheck = document.getElementById('cosmos-pauseOnReading');
    if (pauseCheck) pauseCheck.checked = !!cosmos.pauseOnReading;
  }

  function setColorVal(inputId, labelId, val) {
    var inp = document.getElementById(inputId);
    var lbl = document.getElementById(labelId);
    if (inp) inp.value = val;
    if (lbl) lbl.textContent = val;
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
    renderThemeControls();
    updateTextLivePreview();
    showToast('Preset aplicado: ' + target.name.toUpperCase(), 'success');
  }

  function initThemeFromConfig() {
    applyTheme(state.theme);
  }

  function applyTheme(theme) {
    if (!theme) return;
    var root = document.documentElement;

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

    if (theme.typography) {
      if (theme.typography.fontReading) root.style.setProperty('--font-reading', theme.typography.fontReading);
      if (theme.typography.baseSizePx) {
        root.style.setProperty('--base-size', theme.typography.baseSizePx + 'px');
        root.style.setProperty('--reading-font-size', theme.typography.baseSizePx + 'px');
      }
    }

    if (window.CosmosEngine && typeof window.CosmosEngine.updateConfig === 'function') {
      var mergedCosmos = Object.assign({}, theme.colors, theme.cosmos);
      window.CosmosEngine.updateConfig(mergedCosmos);
    }
  }

  function collectThemeFromInputs() {
    var colors = {
      bgPrimary: document.getElementById('color-bgPrimary').value,
      bgSecondary: state.theme.colors.bgSecondary || '#0b0e16',
      bgSurface: state.theme.colors.bgSurface || 'rgba(12, 17, 26, 0.82)',
      textPrimary: document.getElementById('color-textPrimary').value,
      textSecondary: state.theme.colors.textSecondary || '#8b9bb4',
      accentPrimary: document.getElementById('color-accentPrimary').value,
      accentSecondary: document.getElementById('color-accentSecondary').value,
      matrixGlow: document.getElementById('color-matrixGlow').value,
      border: 'rgba(' + hexToRgb(document.getElementById('color-accentPrimary').value) + ', 0.28)'
    };

    var typo = {
      fontDisplay: state.theme.typography.fontDisplay || "'Orbitron', sans-serif",
      fontBody: state.theme.typography.fontBody || "'Space Grotesk', sans-serif",
      fontReading: document.getElementById('typo-reading').value,
      fontMono: state.theme.typography.fontMono || "'JetBrains Mono', monospace",
      baseSizePx: parseInt(document.getElementById('typo-size').value, 10),
      lineHeight: state.theme.typography.lineHeight || 1.75
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
    state.theme.typography = typo;
    state.theme.cosmos = cosmos;

    applyTheme(state.theme);
    updateTextLivePreview();
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0] + hex[1]+hex[1] + hex[2]+hex[2];
    var num = parseInt(hex, 16);
    return ((num >> 16) & 255) + ', ' + ((num >> 8) & 255) + ', ' + (num & 255);
  }

  // =========================================================================
  // GESTÃO DE IMAGENS & CAPAS
  // =========================================================================

  /**
   * Otimiza e redimensiona imagem para WebP via Canvas offscreen.
   * Mantém arquivos vetoriais (.svg) e animados (.gif) intactos.
   *
   * @param {File} file
   * @param {number} [maxDimension=1600]
   * @param {number} [quality=0.84]
   * @returns {Promise<{blob: Blob, name: string, originalSize: number, optimizedSize: number, optimized: boolean}>}
   */
  function optimizeImageToWebP(file, maxDimension = 1600, quality = 0.84) {
    return new Promise(function(resolve) {
      if (!file) {
        resolve({ blob: file, name: '', originalSize: 0, optimizedSize: 0, optimized: false });
        return;
      }

      var isSvgOrGif = file.type === 'image/svg+xml' || file.type === 'image/gif' || /\.(svg|gif)$/i.test(file.name);
      if (isSvgOrGif) {
        resolve({
          blob: file,
          name: file.name,
          originalSize: file.size,
          optimizedSize: file.size,
          optimized: false
        });
        return;
      }

      var img = new Image();
      var objectUrl = URL.createObjectURL(file);

      img.onload = function() {
        URL.revokeObjectURL(objectUrl);

        var width = img.naturalWidth || img.width;
        var height = img.naturalHeight || img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(function(blob) {
          if (!blob) {
            resolve({
              blob: file,
              name: file.name,
              originalSize: file.size,
              optimizedSize: file.size,
              optimized: false
            });
            return;
          }

          var baseName = file.name.replace(/\.[^/.]+$/, '');
          var newFileName = baseName + '.webp';

          resolve({
            blob: blob,
            name: newFileName,
            originalSize: file.size,
            optimizedSize: blob.size,
            optimized: true
          });
        }, 'image/webp', quality);
      };

      img.onerror = function() {
        URL.revokeObjectURL(objectUrl);
        resolve({
          blob: file,
          name: file.name,
          originalSize: file.size,
          optimizedSize: file.size,
          optimized: false
        });
      };

      img.src = objectUrl;
    });
  }

  function updateCoverSelectors() {
    var coverSelect = document.getElementById('meta-cover');
    if (!coverSelect) return;

    var currentVal = coverSelect.value;
    coverSelect.innerHTML = '<option value="">(Sem Capa)</option>';

    state.images.forEach(function(img) {
      var opt = document.createElement('option');
      opt.value = img.path;
      opt.textContent = img.path;
      coverSelect.appendChild(opt);
    });

    coverSelect.value = currentVal;
  }

  async function handleImageUpload(file, isCover) {
    if (!file) return;

    try {
      var result = await optimizeImageToWebP(file, 1600, 0.84);
      var finalBlob = result.blob;
      var fileName = result.name;
      var filePath = 'images/' + fileName;
      var blobUrl = URL.createObjectURL(finalBlob);

      var newImg = {
        name: fileName,
        path: filePath,
        url: blobUrl,
        blob: finalBlob,
        isNew: true
      };

      // Substituir ou adicionar
      var existingIdx = state.images.findIndex(function(i) { return i.name === fileName; });
      if (existingIdx !== -1) {
        state.images[existingIdx] = newImg;
      } else {
        state.images.push(newImg);
      }

      updateCoverSelectors();

      if (isCover) {
        var coverSelect = document.getElementById('meta-cover');
        if (coverSelect) coverSelect.value = filePath;
        var activeItem = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
        if (activeItem) activeItem.coverImage = filePath;
        updateTextLivePreview();
      } else {
        var selectedPathInput = document.getElementById('img-selected-path');
        if (selectedPathInput) selectedPathInput.value = filePath;
        updateImageModalPreview(blobUrl);
      }

      renderImageModalGallery();

      var sizeKb = Math.round(result.optimizedSize / 1024);
      if (result.optimized) {
        var origKb = Math.round(result.originalSize / 1024);
        var reduction = origKb > 0 ? Math.round(((origKb - sizeKb) / origKb) * 100) : 0;
        var reductionText = reduction > 0 ? ' (-' + reduction + '%)' : '';
        showToast('Imagem otimizada para WebP: ' + sizeKb + ' KB' + reductionText, 'success');
      } else if (isCover) {
        showToast('Imagem de capa adicionada: ' + fileName, 'success');
      } else {
        showToast('Imagem carregada no acervo: ' + fileName, 'success');
      }
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      showToast('Erro ao processar imagem: ' + err.message, 'error');
    }
  }

  function renderImageModalGallery() {
    var grid = document.getElementById('modal-image-grid');
    if (!grid) return;

    grid.innerHTML = '';
    var selectedPathInput = document.getElementById('img-selected-path');
    var currentPath = selectedPathInput ? selectedPathInput.value : '';

    state.images.forEach(function(img) {
      var item = document.createElement('div');
      item.className = 'img-thumb-item' + (img.path === currentPath ? ' selected' : '');
      item.innerHTML = '<img src="' + escapeHtml(img.url || img.path) + '" alt="' + escapeHtml(img.name) + '">';

      item.addEventListener('click', function() {
        grid.querySelectorAll('.img-thumb-item').forEach(function(el) { el.classList.remove('selected'); });
        item.classList.add('selected');
        if (selectedPathInput) selectedPathInput.value = img.path;
        updateImageModalPreview(img.url || img.path);
      });

      grid.appendChild(item);
    });

    if (state.images.length > 0 && !currentPath) {
      selectedPathInput.value = state.images[0].path;
      updateImageModalPreview(state.images[0].url || state.images[0].path);
    }
  }

  function updateImageModalPreview(src) {
    var box = document.getElementById('img-modal-preview');
    if (!box) return;
    box.innerHTML = '<img src="' + escapeHtml(src) + '" alt="Prévia">';
  }

  // =========================================================================
  // FERRAMENTAS DO EDITOR MARKDOWN
  // =========================================================================

  function formatSelection(before, after) {
    var textarea = document.getElementById('markdown-input');
    if (!textarea) return;

    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var selected = textarea.value.substring(start, end);

    var replacement = before + (selected || '') + after;
    textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 0));

    updateTextLivePreview();
    updateEditorMetrics(textarea.value);
  }

  function insertTextAtCursor(text) {
    var textarea = document.getElementById('markdown-input');
    if (!textarea) return;

    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;

    textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + text.length, start + text.length);

    updateTextLivePreview();
    updateEditorMetrics(textarea.value);
  }

  function updateEditorMetrics(text) {
    var words = (text || '').trim().split(/\s+/).filter(Boolean).length;
    var wordsEl = document.getElementById('stat-words');
    var timeEl = document.getElementById('stat-time');

    if (wordsEl) wordsEl.textContent = words;
    if (timeEl) timeEl.textContent = '~' + Math.max(1, Math.ceil(words / 200)) + ' min';
  }

  function calculateReadingTime(text) {
    var words = (text || '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  function generateExcerpt(mdText) {
    if (!mdText) return '';
    var clean = mdText
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/<img.*?>/gi, '')
      .replace(/\[.*?\]\(.*?\)/g, '$1')
      .replace(/#+\s*/g, '')
      .replace(/[*_`>~-]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    if (clean.length > 160) {
      return clean.slice(0, 160) + '...';
    }
    return clean;
  }

  function generateSlug(str) {
    if (!str) return 'texto-' + Date.now();
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || ('texto-' + Date.now());
  }

  function convertHtmlToCleanMarkdown(html) {
    if (!html) return '';
    var temp = document.createElement('div');
    temp.innerHTML = html;

    function parseNode(node) {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent;
      if (node.nodeType !== Node.ELEMENT_NODE) return '';

      var tag = node.tagName.toLowerCase();
      var children = Array.from(node.childNodes).map(parseNode).join('');

      switch (tag) {
        case 'h1': return '\n\n# ' + children.trim() + '\n\n';
        case 'h2': return '\n\n## ' + children.trim() + '\n\n';
        case 'h3': return '\n\n### ' + children.trim() + '\n\n';
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
    return result.replace(/\n{3,}/g, '\n\n').trim();
  }

  // =========================================================================
  // SISTEMA DE MODAIS
  // =========================================================================

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');

    if (modalId === 'modal-link') {
      populateInternalLinkSelect();
    } else if (modalId === 'modal-image') {
      renderImageModalGallery();
    }
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  }

  function populateInternalLinkSelect() {
    var select = document.getElementById('link-internal-select');
    if (!select) return;

    select.innerHTML = '';
    state.catalog.items.forEach(function(item) {
      var opt = document.createElement('option');
      opt.value = item.slug || item.id;
      opt.textContent = '[' + item.type.toUpperCase() + '] ' + item.title;
      select.appendChild(opt);
    });
  }

  // =========================================================================
  // EXPORTAÇÕES & DOWNLOADS
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
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  // =========================================================================
  // TOAST HUD
  // =========================================================================

  function showToast(message, type) {
    var container = document.getElementById('toast-container');
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // =========================================================================
  // UTILITÁRIOS & HELPERS
  // =========================================================================

  function switchTab(tabId) {
    var navTabs = document.querySelectorAll('.nav-tab');
    var tabPanels = document.querySelectorAll('.tab-panel');

    navTabs.forEach(function(tab) {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    tabPanels.forEach(function(panel) {
      if (panel.id === 'panel-' + tabId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
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

  function getYoutubeId(url) {
    if (!url) return null;
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = String(url).match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  function getSpotifyEmbedUrl(url) {
    if (!url) return '';
    try {
      var parsed = new URL(url);
      var cleanPath = parsed.pathname.replace(/^\/+|\/+$/g, '');
      return 'https://open.spotify.com/embed/' + cleanPath + '?utm_source=generator&theme=0';
    } catch (e) {
      return url;
    }
  }

  // =========================================================================
  // BIND DE EVENTOS DA INTERFACE
  // =========================================================================

  function bindEvents() {
    // 1. Barra Superior (Workspace Bar)
    document.getElementById('btn-connect-dir').addEventListener('click', connectProjectDirectory);
    document.getElementById('btn-save-project').addEventListener('click', saveAllToProject);
    document.getElementById('btn-export-menu').addEventListener('click', function() {
      openModal('modal-export');
    });
    document.getElementById('btn-view-portal').addEventListener('click', async function() {
      await saveAllToProject();
      window.open('index.html', '_blank');
    });

    // 2. Abas do Studio
    document.querySelectorAll('.nav-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        switchTab(tab.dataset.tab);
      });
    });

    // 3. Criação de Conteúdo na Barra Lateral
    document.getElementById('btn-create-text').addEventListener('click', function() { createNewItem('text'); });
    document.getElementById('btn-create-audio').addEventListener('click', function() { createNewItem('audio'); });
    document.getElementById('btn-create-video').addEventListener('click', function() { createNewItem('video'); });

    // 4. Busca e Filtros
    var searchInput = document.getElementById('filter-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        state.searchQuery = searchInput.value.trim();
        renderSidebarRecordsList();
      });
    }

    document.querySelectorAll('.filter-chips .chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        document.querySelectorAll('.filter-chips .chip').forEach(function(c) { c.classList.remove('active'); });
        chip.classList.add('active');
        state.activeFilter = chip.dataset.filter;
        renderSidebarRecordsList();
      });
    });

    // 5. Linha Mínima de Metadados de Texto
    var metaTitle = document.getElementById('meta-title');
    var metaStatus = document.getElementById('meta-status');
    var metaCover = document.getElementById('meta-cover');
    var metaSummary = document.getElementById('meta-summary');
    var uploadCoverBtn = document.getElementById('btn-upload-cover');
    var coverFileInput = document.getElementById('input-cover-file');

    if (metaTitle) metaTitle.addEventListener('input', updateTextLivePreview);
    if (metaStatus) metaStatus.addEventListener('change', updateTextLivePreview);
    if (metaCover) metaCover.addEventListener('change', updateTextLivePreview);
    if (metaSummary) metaSummary.addEventListener('input', updateTextLivePreview);

    if (uploadCoverBtn && coverFileInput) {
      uploadCoverBtn.addEventListener('click', function() {
        coverFileInput.click();
      });
      coverFileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
          handleImageUpload(e.target.files[0], true);
          e.target.value = '';
        }
      });
    }

    // 6. Barra de Ferramentas de Formatação
    document.querySelectorAll('[data-tool]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var tool = btn.dataset.tool;
        switch (tool) {
          case 'h1': formatSelection('# ', ''); break;
          case 'h2': formatSelection('## ', ''); break;
          case 'bold': formatSelection('**', '**'); break;
          case 'italic': formatSelection('*', '*'); break;
          case 'quote': formatSelection('> ', ''); break;
          case 'list': formatSelection('* ', ''); break;
          case 'divider': insertTextAtCursor('\n\n---\n\n'); break;
        }
      });
    });

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

    // 7. Textarea Markdown
    var mdInput = document.getElementById('markdown-input');
    if (mdInput) {
      mdInput.addEventListener('input', function() {
        updateEditorMetrics(mdInput.value);
        updateTextLivePreview();
      });
    }

    // 8. Alternância de Modo de Prévia (Reader vs Card)
    var btnPrevReader = document.getElementById('btn-preview-mode-reader');
    var btnPrevCard = document.getElementById('btn-preview-mode-card');

    if (btnPrevReader && btnPrevCard) {
      btnPrevReader.addEventListener('click', function() {
        btnPrevReader.classList.add('active');
        btnPrevCard.classList.remove('active');
        state.previewMode = 'reader';
        updateTextLivePreview();
      });

      btnPrevCard.addEventListener('click', function() {
        btnPrevCard.classList.add('active');
        btnPrevReader.classList.remove('active');
        state.previewMode = 'card';
        updateTextLivePreview();
      });
    }

    // 9. Formulário de Mídia (Áudio / Vídeo)
    var mediaUrl = document.getElementById('media-url');
    var mediaTitle = document.getElementById('media-title');
    var mediaStatus = document.getElementById('media-status');
    var mediaSummary = document.getElementById('media-summary');

    if (mediaUrl) {
      mediaUrl.addEventListener('input', function() {
        var val = mediaUrl.value.trim();
        var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
        if (item) {
          if (/spotify\.com/i.test(val)) {
            item.type = 'audio';
            item.category = 'Transmissões Sonoras';
            var badge = document.getElementById('media-form-type-badge');
            if (badge) {
              badge.textContent = 'ÁUDIO';
              badge.className = 'badge badge-amber';
            }
          } else if (/youtu(be|\.be)/i.test(val)) {
            item.type = 'video';
            item.category = 'Registros Visuais';
            var badgeV = document.getElementById('media-form-type-badge');
            if (badgeV) {
              badgeV.textContent = 'VÍDEO';
              badgeV.className = 'badge badge-cyan';
            }
          }
        }
        updateMediaLivePreview();
      });
    }

    if (mediaTitle) mediaTitle.addEventListener('input', updateMediaLivePreview);
    if (mediaStatus) mediaStatus.addEventListener('change', updateMediaLivePreview);
    if (mediaSummary) mediaSummary.addEventListener('input', updateMediaLivePreview);

    // 10. Aba de Anotações & Voz
    document.getElementById('btn-toggle-main-voice').addEventListener('click', toggleMainVoiceRecording);

    document.getElementById('btn-clear-transcript').addEventListener('click', function() {
      document.getElementById('voice-transcript-output').value = '';
      document.getElementById('voice-interim-text').textContent = '';
    });

    document.getElementById('btn-save-as-note').addEventListener('click', function() {
      var text = document.getElementById('voice-transcript-output').value.trim();
      if (!text) {
        showToast('Nenhum texto transcrito para arquivar.', 'warning');
        return;
      }
      var newNote = {
        id: 'note-' + Date.now(),
        title: 'Nota de Voz ' + new Date().toLocaleDateString('pt-BR'),
        category: 'Crônicas & Sagas',
        tags: ['Voz', 'Lore'],
        content: text,
        createdAt: new Date().toISOString().slice(0, 10)
      };
      state.catalog.notes = state.catalog.notes || [];
      state.catalog.notes.unshift(newNote);
      renderNotesGrid();
      document.getElementById('voice-transcript-output').value = '';
      showToast('Anotação arquivada em catalog.notes', 'success');
    });

    document.getElementById('btn-create-story-from-voice').addEventListener('click', function() {
      var text = document.getElementById('voice-transcript-output').value.trim();
      if (!text) {
        showToast('Nenhum texto transcrito para criar texto.', 'warning');
        return;
      }
      createStoryFromNote({
        title: 'Novo Texto (Voz)',
        content: text,
        category: 'Crônicas & Sagas'
      });
      document.getElementById('voice-transcript-output').value = '';
    });

    document.getElementById('btn-new-note').addEventListener('click', function() {
      var title = prompt('Título da Anotação:');
      if (!title) return;
      var content = prompt('Conteúdo da Anotação:');
      if (!content) return;

      var newNote = {
        id: 'note-' + Date.now(),
        title: title,
        category: 'Crônicas & Sagas',
        tags: [],
        content: content,
        createdAt: new Date().toISOString().slice(0, 10)
      };
      state.catalog.notes = state.catalog.notes || [];
      state.catalog.notes.unshift(newNote);
      renderNotesGrid();
      showToast('Nova anotação salva', 'success');
    });

    // 11. Presets e Visual
    document.querySelectorAll('.preset-card').forEach(function(card) {
      card.addEventListener('click', function() {
        applyPreset(card.dataset.preset);
      });
    });

    var colorPickers = [
      'color-accentPrimary', 'color-accentSecondary',
      'color-bgPrimary', 'color-textPrimary', 'color-matrixGlow'
    ];
    colorPickers.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function() {
          var valLabel = document.getElementById(id.replace('color-', 'val-'));
          if (valLabel) valLabel.textContent = el.value;
          collectThemeFromInputs();
        });
      }
    });

    var typoReading = document.getElementById('typo-reading');
    if (typoReading) typoReading.addEventListener('change', collectThemeFromInputs);

    var typoSize = document.getElementById('typo-size');
    if (typoSize) {
      typoSize.addEventListener('input', function() {
        document.getElementById('val-baseSize').textContent = typoSize.value + 'px';
        collectThemeFromInputs();
      });
    }

    var cosmosInputs = [
      { id: 'cosmos-stars', valId: 'val-starCount', unit: '' },
      { id: 'cosmos-streams', valId: 'val-streamCount', unit: '' },
      { id: 'cosmos-speed', valId: 'val-speed', unit: '' },
      { id: 'cosmos-nebula', valId: 'val-nebula', unit: '' },
      { id: 'cosmos-matrix', valId: 'val-matrix', unit: '' }
    ];
    cosmosInputs.forEach(function(item) {
      var el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('input', function() {
          document.getElementById(item.valId).textContent = el.value + item.unit;
          collectThemeFromInputs();
        });
      }
    });

    var pauseOnReading = document.getElementById('cosmos-pauseOnReading');
    if (pauseOnReading) pauseOnReading.addEventListener('change', collectThemeFromInputs);

    document.getElementById('btn-apply-theme').addEventListener('click', async function() {
      collectThemeFromInputs();
      await saveAllToProject();
      showToast('Visual aplicado e salvo no projeto', 'success');
    });

    document.getElementById('btn-reset-theme').addEventListener('click', function() {
      applyPreset('matrioshka-amber');
    });

    // 12. Modais - Fechamento
    document.querySelectorAll('[data-close-modal]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        closeModal(btn.dataset.closeModal);
      });
    });

    // Modal de Links - Sub-Abas
    var modalTabs = document.querySelectorAll('#modal-link .modal-tab');
    modalTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        modalTabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('#modal-link .subtab-content').forEach(function(c) { c.classList.remove('active'); });
        var target = document.getElementById('subtab-' + tab.dataset.subtab);
        if (target) target.classList.add('active');
      });
    });

    document.getElementById('btn-insert-link-confirm').addEventListener('click', function() {
      var activeSubtab = document.querySelector('#modal-link .modal-tab.active').dataset.subtab;
      if (activeSubtab === 'internal') {
        var slug = document.getElementById('link-internal-select').value;
        var text = document.getElementById('link-internal-text').value.trim() || 'Ver registro';
        insertTextAtCursor('[' + text + '](#' + slug + ')');
      } else if (activeSubtab === 'external') {
        var url = document.getElementById('link-external-url').value.trim() || 'https://';
        var extText = document.getElementById('link-external-text').value.trim() || 'Link';
        insertTextAtCursor('[' + extText + '](' + url + ')');
      } else if (activeSubtab === 'embed') {
        var embedUrl = document.getElementById('link-embed-url').value.trim();
        if (embedUrl) {
          if (/spotify\.com/i.test(embedUrl)) {
            var spotSrc = getSpotifyEmbedUrl(embedUrl);
            insertTextAtCursor('\n\n<iframe src="' + spotSrc + '" width="100%" height="152" allow="encrypted-media"></iframe>\n\n');
          } else if (/youtu(be|\.be)/i.test(embedUrl)) {
            var yt = getYoutubeId(embedUrl);
            if (yt) {
              insertTextAtCursor('\n\n<iframe src="https://www.youtube-nocookie.com/embed/' + yt + '?rel=0" width="100%" height="315" allowfullscreen></iframe>\n\n');
            }
          }
        }
      }
      closeModal('modal-link');
      showToast('Link inserido no texto', 'success');
    });

    // Modal de Imagem
    var galleryUpload = document.getElementById('gallery-file-upload');
    if (galleryUpload) {
      galleryUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
          handleImageUpload(e.target.files[0], false);
          e.target.value = '';
        }
      });
    }

    document.getElementById('btn-insert-image-confirm').addEventListener('click', function() {
      var path = document.getElementById('img-selected-path').value;
      var alt = document.getElementById('img-alt-text').value.trim();
      var width = document.getElementById('img-width-select').value;

      var tag = '<img src="' + path + '" alt="' + alt + '" width="' + width + '"/>';
      insertTextAtCursor('\n\n' + tag + '\n\n');
      closeModal('modal-image');
      showToast('Imagem inserida no texto', 'success');
    });

    // Modal Colar HTML
    document.getElementById('btn-convert-confirm-cursor').addEventListener('click', function() {
      var raw = document.getElementById('convert-input').value;
      var cleanMd = convertHtmlToCleanMarkdown(raw);
      insertTextAtCursor(cleanMd);
      closeModal('modal-convert');
      showToast('HTML convertido e inserido no cursor', 'success');
    });

    document.getElementById('btn-convert-confirm-replace').addEventListener('click', function() {
      if (confirm('Deseja substituir todo o texto do editor?')) {
        var raw = document.getElementById('convert-input').value;
        var cleanMd = convertHtmlToCleanMarkdown(raw);
        var input = document.getElementById('markdown-input');
        if (input) {
          input.value = cleanMd;
          updateEditorMetrics(cleanMd);
          updateTextLivePreview();
        }
        closeModal('modal-convert');
        showToast('Texto do editor substituído', 'success');
      }
    });

    // Modal de Exportações
    document.getElementById('btn-download-catalog').addEventListener('click', function() {
      downloadJson('catalog.json', state.catalog);
    });

    document.getElementById('btn-download-theme').addEventListener('click', function() {
      downloadJson('theme.json', state.theme);
    });

    document.getElementById('btn-download-active-md').addEventListener('click', function() {
      var item = state.catalog.items.find(function(i) { return i.id === state.activeItemId; });
      if (item && item.type === 'text') {
        var content = state.markdownFiles[item.file] || '';
        var filename = (item.file || 'story.md').replace(/^texts\//, '');
        downloadText(filename, content);
      } else {
        showToast('Nenhum texto ativo selecionado para baixar.', 'warning');
      }
    });

    document.getElementById('btn-download-legacy').addEventListener('click', function() {
      var publishedTexts = ["intro.md"];
      state.catalog.items.forEach(function(item) {
        if (item.type === 'text' && item.status === 'published' && item.file) {
          var rawName = item.file.replace(/^texts\//, '');
          if (publishedTexts.indexOf(rawName) === -1) publishedTexts.push(rawName);
        }
      });
      downloadJson('texts.json', publishedTexts);

      var publishedMedia = [];
      state.catalog.items.forEach(function(item) {
        if ((item.type === 'video' || item.type === 'audio') && item.status === 'published') {
          publishedMedia.push({ type: item.type, title: item.title, url: item.url });
        }
      });
      downloadJson('media.json', publishedMedia);
    });

    document.getElementById('btn-download-bundle').addEventListener('click', function() {
      var bundle = {
        catalog: state.catalog,
        theme: state.theme,
        markdownFiles: state.markdownFiles,
        timestamp: new Date().toISOString()
      };
      downloadJson('ee_studio_backup_bundle.json', bundle);
    });
  }

})();
