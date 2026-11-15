/**
 * ============================================================================
 * ESQUIZOFRENIA ESTELAR — OS ARQUIVOS DO MULTIVERSO
 * Core Application Engine, Search Overlay & Accessible Story Reader
 * 
 * Features:
 * - Dynamic theme synchronization with theme.json / studio backup
 * - Tri-tier data loader (LocalStorage Studio Backup -> HTTP Fetch -> Embedded Default)
 * - Automatic background animation pause on story reading mode (CosmosEngine.pause('reading'))
 * - Automatic background animation resume on exiting story or navigating tabs (CosmosEngine.resume('reading'))
 * - Accessible reader toolbar with font resizing, contrast themes, and column width
 * - Top-right discreet search trigger and real-time Search Overlay Modal
 * - High-resolution image lightbox modal
 * - Deep linking via URL hash (#story=slug, #section=name)
 * - ZERO EMOJIS: strictly pure vector graphics and geometric typography glyphs
 * ============================================================================
 */

(function(global) {
    'use strict';

    // Built-in Default Catalog Fallback (guarantees 100% offline and file:// functionality)
    var DEFAULT_CATALOG = {
        version: "2.0",
        updatedAt: "2026-10-31T01:30:00Z",
        introFile: "texts/intro.md",
        categories: [
            "Raças & Entidades",
            "Crônicas & Sagas",
            "Transmissões Sonoras",
            "Registros Visuais",
            "Arquivos Técnicos"
        ],
        items: [
            {
                id: "01-os-arquivistas",
                title: "Os Arquivistas",
                slug: "os-arquivistas",
                type: "text",
                status: "published",
                category: "Raças & Entidades",
                saga: "Cérebro de Matriosca",
                tags: [
                    "Maltuks",
                    "Quinta Dimensão",
                    "Máquinas Sencientes"
                ],
                summary: "Apresentação do primeiro contato com um Maltuk e suas canções em vibrações inexplicáveis traduzidas pelas máquinas sencientes zeladoras do Arquivo.",
                coverImage: "images/maltuk1.webp",
                file: "texts/01_os_arquivistas.md",
                readingTime: 2,
                createdAt: "2025-01-15",
                relatedIds: [
                    "02-metamorphis",
                    "audio-podcast-estelar"
                ]
            },
            {
                id: "02-metamorphis",
                title: "A Saga Metamorphis",
                slug: "a-saga-metamorphis",
                type: "text",
                status: "published",
                category: "Crônicas & Sagas",
                saga: "Conselho Solar da Nova Era",
                tags: [
                    "Conselho Solar",
                    "Maltuks",
                    "Thyrexianos",
                    "Prelúdio do Caos"
                ],
                summary: "Prelúdio do Caos: registros sobre a formação, ascensão e declínio do Conselho Solar da Nova Era e as tensões entre Maltuks e Thyrexianos mecanos.",
                coverImage: "images/conselho_solar_01.webp",
                file: "texts/02_metamorphis.md",
                readingTime: 2,
                createdAt: "2025-02-10",
                relatedIds: [
                    "01-os-arquivistas"
                ]
            },
            {
                id: "audio-podcast-estelar",
                title: "Podcast Estelar",
                slug: "podcast-estelar",
                type: "audio",
                status: "published",
                category: "Transmissões Sonoras",
                saga: "Ecos da Quinta Dimensão",
                tags: [
                    "Podcast",
                    "Transmissão",
                    "Multiverso"
                ],
                summary: "Frequência de áudio captada nos setores externos do Cérebro de Matriosca — relatos narrados sobre as realidades simuladas.",
                url: "https://open.spotify.com/episode/4D7Spo0DC4JL6r36zhKAZe",
                createdAt: "2025-01-20",
                relatedIds: [
                    "01-os-arquivistas"
                ]
            },
            {
                id: "video-coleta-sisab-gestantes",
                title: "Exercício de coleta de dados SISAB - Gestantes",
                slug: "exercicio-coleta-dados-sisab-gestantes",
                type: "video",
                status: "published",
                category: "Arquivos Técnicos",
                saga: "Arquivos do Multiverso",
                tags: [
                    "SISAB",
                    "Dados",
                    "Saúde Pública",
                    "Instrução Técnica"
                ],
                summary: "Exercício técnico de extração e consolidação de registros de dados no sistema de informação em saúde.",
                url: "https://youtu.be/j-t7r_016bM",
                createdAt: "2024-11-10",
                relatedIds: []
            },
            {
                id: "video-ilya-breshov",
                title: "Ilya Breshov - dlya nashego zdorov'ya",
                slug: "ilya-breshov-dlya-nashego-zdorovya",
                type: "video",
                status: "published",
                category: "Registros Visuais",
                saga: "Transmissões Terrestres",
                tags: [
                    "Registro Audiovisual",
                    "Ilya Breshov",
                    "Histórico"
                ],
                summary: "Registro audiovisual histórico resgatado dos arquivos terrestres antigos.",
                url: "https://youtu.be/VeegmvsqbcQ",
                createdAt: "2024-12-05",
                relatedIds: []
            },
            {
                id: "video-itk-snap-segmentacao",
                title: "ITK-SNAP - Segmentação de RM Flair",
                slug: "itk-snap-segmentacao-rm-flair",
                type: "video",
                status: "published",
                category: "Arquivos Técnicos",
                saga: "Neurociência Computacional",
                tags: [
                    "ITK-SNAP",
                    "Ressonância Magnética",
                    "Segmentação",
                    "Neuroimagem"
                ],
                summary: "Procedimento de segmentação volumétrica em imagens de ressonância magnética utilizando protocolo Flair no ITK-SNAP.",
                url: "https://youtu.be/bPWUpCkYksM",
                createdAt: "2025-01-08",
                relatedIds: [
                    "01-os-arquivistas"
                ]
            }
        ],
        notes: [
            {
                id: "note-catedral-neuronios",
                title: "Catedral de Neurônios Sintéticos - A Estrela Branca",
                category: "Crônicas & Sagas",
                tags: [
                    "Cérebro de Matriosca",
                    "Estrela Branca",
                    "Supercomputador",
                    "Cosmologia"
                ],
                content: "A estrutura de esferas concêntricas captura a radiação total da anã branca moribunda para alimentar os bilhões de nós sinápticos. As mentes arquivadas não sabem que habitam um invólucro estelar.",
                createdAt: "2025-02-15"
            },
            {
                id: "note-cantos-maltuks",
                title: "Anatomia e Cantos Vibracionais dos Maltuks",
                category: "Raças & Entidades",
                tags: [
                    "Maltuks",
                    "Anatomia",
                    "Bioacústica",
                    "Quinta Dimensão"
                ],
                content: "Com carapaças quitinosas de reflexo obsidiano e órgãos ressonantes na cavidade torácica, os Maltuks emitem frequências moduladas capazes de desestabilizar hologramas e sintonizar cordas dimensionais.",
                createdAt: "2025-02-18"
            }
        ]
    };

    // Built-in Real Content for Markdown Text Files (guarantees immediate rendering on file://)
    var DEFAULT_TEXT_FILES = {
        "texts/intro.md": "# Bem-vindo aos Arquivos do Multiverso\n\nDiante de você, o futuro da humanidade desdobra-se — um cosmos onde o familiar dissolve-se no extraordinário. Imagine a luz de um sol artificial filtrando-se pelas frestas de uma megaestrutura, tão colossal que, à distância, confunde-se com uma constelação feita pela mão humana.  \n\nNo coração desse universo pulsante, ergue-se o o Computador no Fim do Universo, um Cérebro de Matriosca, obra-prima da engenhosidade da vida, uma catedral de neurônios sintéticos que abriga trilhões de mentes vivendo incontáveis cenários. Alimentadas pela energia de uma estrela branca, essas consciências habitam realidades virtuais — sonhos eternos moldados pela curiosidade do universo em conhecer a si mesmo.  \n\nA missão de vigiar esse equilíbrio delicado são dos Maltuks, arquivistas e sacerdotes enigmáticos, cujos segredos serão cantados adiante por eles mesmos, e suas máquinas sencientes zeladoras. Juntos, enfrentam catástrofes cósmicas enquanto selecionam as realidades dignas de compor O Arquivo.  \n\nCada história aqui preservada é um universo em si mesma. Cada linha que você lerá a seguir é uma fenda por onde escapa o infinito. Parabéns por chegar até aqui, pois além desse portal da quinta dimensão, estão os Arquivos do Multiverso.",
        "texts/01_os_arquivistas.md": "# Os Arquivistas\n\n* Apresentação do primeiro contato com um Maltuk (O Arquivista)\n* Contar a história dos Maltuks e seu propósito\n* Os Maltuks cantam canções em vibrações inexplicáveis, somente presenciando tal proeza para compreender esse fenômeno. Aqui é uma tradução descritiva auxiliada pelas máquinas sencientes, o sistema que permite a interação entre nós seres vivos dessa dimensão, e os arautos do fim do mundo\n* \n\nMaltuk Arquivista\n<img src=\"images/maltuk1.webp\" alt=\"Maltuk e seu manto\" width=\"333\"/>\n\nMaltuk Priestess\n<img src=\"images/maltuk2.webp\" alt=\"Maltuk Priestess\" width=\"333\"/>",
        "texts/02_metamorphis.md": "# A Saga Metamorphis\n\n## Prelúdio do Caos\n\n* Transcrever aqui as notas do papel sobre a história da formação, ascenção e declínio do Conselho Solar da Nova Era.\n\nEsboço inicial do banner:\n* Os Maltuks ao centro deveriam ser mais insetídeos\n* Os Thyrexianos mecanos da esquerda ao meio são mais reptlianos tecnologicos\n\n\n<img src=\"images/conselho_solar_01.webp\" alt=\"Maltuk e seu manto\" width=\"333\"/>"
    };

    // Built-in Default Theme
    var DEFAULT_THEME = {
        activePreset: "matrioshka-amber",
        colors: {
            bgPrimary: "#050609",
            bgSecondary: "#0b0e16",
            bgSurface: "rgba(12, 17, 26, 0.82)",
            textPrimary: "#e6edf5",
            textSecondary: "#8b9bb4",
            accentPrimary: "#e6a817",
            accentSecondary: "#00f0ff",
            matrixGlow: "#00ff9d",
            border: "rgba(230, 168, 23, 0.28)"
        },
        typography: {
            fontDisplay: "'Orbitron', sans-serif",
            fontBody: "'Space Grotesk', sans-serif",
            fontReading: "'Merriweather', Georgia, serif",
            fontMono: "'JetBrains Mono', monospace",
            baseSizePx: 18,
            lineHeight: 1.75
        },
        cosmos: {
            starCount: 150,
            matrixStreamCount: 32,
            speed: 0.45,
            nebulaOpacity: 0.35,
            matrixOpacity: 0.22,
            pauseOnReading: true
        },
        presets: {
            "matrioshka-amber": {
                name: "Matrioshka Amber",
                colors: {
                    bgPrimary: "#050609",
                    bgSecondary: "#0b0e16",
                    bgSurface: "rgba(12, 17, 26, 0.82)",
                    textPrimary: "#e6edf5",
                    textSecondary: "#8b9bb4",
                    accentPrimary: "#e6a817",
                    accentSecondary: "#00f0ff",
                    matrixGlow: "#00ff9d",
                    border: "rgba(230, 168, 23, 0.28)"
                },
                cosmos: {
                    starCount: 150,
                    matrixStreamCount: 32,
                    speed: 0.45,
                    nebulaOpacity: 0.35,
                    matrixOpacity: 0.22
                }
            }
        }
    };

    // Global Application State
    var state = {
        catalog: JSON.parse(JSON.stringify(DEFAULT_CATALOG)),
        theme: JSON.parse(JSON.stringify(DEFAULT_THEME)),
        activeSection: 'intro',
        activeStory: null,
        readerPrefs: {
            prefsVersion: 2,
            fontSize: 20,
            font: 'sans',
            width: 'default',
            contrast: 'abyssal'
        }
    };

    // Helper: Safely retrieve studio backup from localStorage
    function getStudioBackup() {
        try {
            var raw = localStorage.getItem('ee_studio_backup');
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : null;
        } catch (e) {
            return null;
        }
    }

    // Configure Showdown Markdown Converter with image path resolver
    var converter = new showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
        openLinksInNewWindow: true,
        extensions: [
            function() {
                return [
                    {
                        type: 'output',
                        regex: /!\[([^\]]*)\]\(([^)]+)\)/g,
                        replace: function(match, alt, src) {
                            var cleanSrc = src.trim();
                            if (!cleanSrc.startsWith('images/') && 
                                !cleanSrc.startsWith('http://') && 
                                !cleanSrc.startsWith('https://') && 
                                !cleanSrc.startsWith('data:')) {
                                cleanSrc = 'images/' + cleanSrc;
                            }
                            return '<img src="' + cleanSrc + '" alt="' + alt + '" loading="lazy" />';
                        }
                    }
                ];
            }
        ]
    });

    // Helper: Safely escape HTML to prevent XSS in text interpolation
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Helper: Extract YouTube 11-char ID from various URL formats
    function getYoutubeId(url) {
        if (!url) return null;
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = String(url).match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Helper: Generate clean Spotify embed URL
    function getSpotifyEmbedUrl(url) {
        if (!url) return '';
        try {
            var parsed = new URL(url);
            var cleanPath = parsed.pathname.replace(/^\/+|\/+$/g, '');
            // Strip locale segment (e.g. intl-pt, intl-en, etc.)
            cleanPath = cleanPath.replace(/^intl-[a-z-]+(?:\/|$)/i, '');
            // Strip duplicate embed segment if already present
            cleanPath = cleanPath.replace(/^embed\//i, '');
            return 'https://open.spotify.com/embed/' + cleanPath + '?utm_source=generator&theme=0';
        } catch (e) {
            var fallback = String(url).trim()
                .replace(/^https?:\/\/(?:open\.)?spotify\.com\//i, '')
                .replace(/^intl-[a-z-]+(?:\/|$)/i, '')
                .replace(/^embed\//i, '')
                .replace(/^\/+|\/+$/g, '');
            return 'https://open.spotify.com/embed/' + fallback + '?utm_source=generator&theme=0';
        }
    }

    /* ------------------------------------------------------------------------
       Theme & Presets Engine
       ------------------------------------------------------------------------ */
    async function loadTheme() {
        var studioBackup = getStudioBackup();
        var themeData = null;

        if (studioBackup && studioBackup.theme) {
            themeData = studioBackup.theme;
        }

        if (!themeData) {
            try {
                var response = await fetch('theme.json');
                if (response.ok) {
                    themeData = await response.json();
                }
            } catch (err) {
                // Ignore network/file errors
            }
        }

        if (!themeData) {
            themeData = JSON.parse(JSON.stringify(DEFAULT_THEME));
        }

        state.theme = themeData;
        var activePresetKey = themeData.activePreset || 'matrioshka-amber';
        applyThemePreset(activePresetKey, true);
    }

    function applyThemePreset(presetKey, updateCosmos) {
        if (!state.theme) return;
        var preset = (state.theme.presets && state.theme.presets[presetKey]) ? state.theme.presets[presetKey] : null;
        var colors = (preset && preset.colors) ? preset.colors : (state.theme.colors || DEFAULT_THEME.colors);

        var root = document.documentElement;
        if (colors) {
            if (colors.bgPrimary) root.style.setProperty('--bg-primary', colors.bgPrimary);
            if (colors.bgSecondary) root.style.setProperty('--bg-secondary', colors.bgSecondary);
            if (colors.bgSurface) root.style.setProperty('--bg-surface', colors.bgSurface);
            if (colors.textPrimary) root.style.setProperty('--text-primary', colors.textPrimary);
            if (colors.textSecondary) root.style.setProperty('--text-secondary', colors.textSecondary);
            if (colors.accentPrimary) {
                root.style.setProperty('--accent-primary', colors.accentPrimary);
                root.style.setProperty('--border', colors.border || 'rgba(230, 168, 23, 0.28)');
            }
            if (colors.accentSecondary) root.style.setProperty('--accent-secondary', colors.accentSecondary);
            if (colors.matrixGlow) root.style.setProperty('--matrix-glow', colors.matrixGlow);
            if (colors.border) root.style.setProperty('--border', colors.border);
        }

        // Synchronize CosmosEngine canvas configuration
        if (window.CosmosEngine && (updateCosmos || updateCosmos === undefined)) {
            var cosmosCfg = {
                colors: colors,
                cosmos: (preset && preset.cosmos) ? preset.cosmos : (state.theme.cosmos || DEFAULT_THEME.cosmos)
            };
            window.CosmosEngine.updateConfig(cosmosCfg);
        }
    }

    /* ------------------------------------------------------------------------
       Markdown File Fetcher (Studio Backup -> Fetch -> Embedded Default)
       ------------------------------------------------------------------------ */
    async function fetchMarkdownFile(filePath) {
        if (!filePath) return null;

        // 1. Check Studio Backup from localStorage
        var studioBackup = getStudioBackup();
        if (studioBackup && studioBackup.markdownFiles && studioBackup.markdownFiles[filePath]) {
            return studioBackup.markdownFiles[filePath];
        }

        // 2. Attempt fetch via HTTP/HTTPS
        try {
            var response = await fetch(filePath);
            if (response.ok) {
                return await response.text();
            }
        } catch (e) {
            // Fetch failed (e.g. file:// protocol restriction or offline)
        }

        // 3. Fallback to embedded default files
        if (DEFAULT_TEXT_FILES[filePath]) {
            return DEFAULT_TEXT_FILES[filePath];
        }

        // 4. Fallback search by basename (e.g. "01_os_arquivistas.md")
        var baseName = filePath.split('/').pop();
        for (var key in DEFAULT_TEXT_FILES) {
            if (key.endsWith(baseName)) {
                return DEFAULT_TEXT_FILES[key];
            }
        }

        return null;
    }

    /* ------------------------------------------------------------------------
       Catalog Engine & Tri-Tier Priority Loader
       ------------------------------------------------------------------------ */
    async function loadCatalog() {
        var isLocal = (window.location.protocol === 'file:' || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1');

        var studioBackup = getStudioBackup();
        var catalogData = null;

        // Priority 1: If on HTTP/HTTPS, attempt to fetch catalog.json
        if (!isLocal) {
            try {
                var response = await fetch('catalog.json');
                if (response.ok) {
                    catalogData = await response.json();
                }
            } catch (e) {
                console.warn('[Esquizofrenia Estelar] Fetch catalog.json indisponível, checando backup local:', e);
            }
        }

        // Priority 2: Use studio backup if running locally or if backup is newer than disk catalog
        if (studioBackup && studioBackup.catalog && Array.isArray(studioBackup.catalog.items)) {
            var backupTime = new Date(studioBackup.timestamp || studioBackup.catalog.updatedAt || 0).getTime();
            var fetchedTime = catalogData ? new Date(catalogData.updatedAt || 0).getTime() : 0;

            if (isLocal || !catalogData || backupTime >= fetchedTime) {
                catalogData = studioBackup.catalog;
            }
        }

        // Priority 3: Fall back to embedded default catalog
        if (!catalogData || !Array.isArray(catalogData.items)) {
            catalogData = JSON.parse(JSON.stringify(DEFAULT_CATALOG));
        }

        state.catalog.version = catalogData.version || '2.0';
        state.catalog.introFile = catalogData.introFile || 'texts/intro.md';
        state.catalog.categories = Array.isArray(catalogData.categories) ? catalogData.categories : [];
        state.catalog.notes = Array.isArray(catalogData.notes) ? catalogData.notes : [];

        // Strictly filter published items for visitors
        var allItems = Array.isArray(catalogData.items) ? catalogData.items : [];
        state.catalog.items = allItems.filter(function(item) {
            return !item.status || item.status === 'published';
        });

        // Ensure modern webp image paths for Maltuk & Conselho Solar
        state.catalog.items.forEach(function(item) {
            if (item.coverImage) {
                item.coverImage = item.coverImage
                    .replace(/maltuk1\.(png|jpg)/i, 'maltuk1.webp')
                    .replace(/maltuk2\.(png|jpg)/i, 'maltuk2.webp')
                    .replace(/conselho_solar_01\.(png|jpg)/i, 'conselho_solar_01.webp');
            }
        });

        updateNavigationBadges();
        await renderAllSections();
        handleHashRoute();
    }

    // Update Navigation Count Badges (Textos, Áudios, Vídeos)
    function updateNavigationBadges() {
        var textosCount = state.catalog.items.filter(function(i) { return i.type === 'text'; }).length;
        var audiosCount = state.catalog.items.filter(function(i) { return i.type === 'audio'; }).length;
        var videosCount = state.catalog.items.filter(function(i) { return i.type === 'video'; }).length;

        var elTextos = document.getElementById('badge-count-textos');
        var elAudios = document.getElementById('badge-count-audios');
        var elVideos = document.getElementById('badge-count-videos');

        if (elTextos) elTextos.textContent = textosCount;
        if (elAudios) elAudios.textContent = audiosCount;
        if (elVideos) elVideos.textContent = videosCount;
    }

    /* ------------------------------------------------------------------------
       Rendering Sections
       ------------------------------------------------------------------------ */
    async function renderAllSections() {
        await renderIntroSection();
        renderTextosSection();
        renderAudiosSection();
        renderVideosSection();
    }

    // Section 1: Intro (Visão de Entrada)
    async function renderIntroSection() {
        var introContainer = document.getElementById('intro-markdown');
        if (!introContainer) return;

        var md = await fetchMarkdownFile(state.catalog.introFile || 'texts/intro.md');
        if (md) {
            introContainer.innerHTML = converter.makeHtml(md);

            // Inject discreet TTS control next to the intro title
            var h1 = introContainer.querySelector('h1');
            if (h1) {
                var titleRow = document.createElement('div');
                titleRow.className = 'intro-title-row';
                h1.parentNode.insertBefore(titleRow, h1);
                titleRow.appendChild(h1);

                var ttsControls = document.createElement('div');
                ttsControls.className = 'intro-tts-controls';
                ttsControls.setAttribute('role', 'group');
                ttsControls.setAttribute('aria-label', 'Narração por voz da introdução');
                ttsControls.innerHTML =
                    '<button id="btn-intro-tts-toggle" class="reader-icon-btn tts-btn" type="button" onclick="toggleIntroTTS()" aria-label="Ouvir apresentação (narração por voz)" title="Ouvir apresentação">' +
                        '<svg id="intro-tts-icon-play" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
                            '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>' +
                            '<path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>' +
                            '<path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>' +
                        '</svg>' +
                        '<svg id="intro-tts-icon-pause" class="hidden" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
                            '<rect x="6" y="4" width="4" height="16"></rect>' +
                            '<rect x="14" y="4" width="4" height="16"></rect>' +
                        '</svg>' +
                    '</button>' +
                    '<button id="btn-intro-tts-stop" class="reader-icon-btn tts-stop-btn hidden" type="button" onclick="stopStoryTTS()" aria-label="Parar narração" title="Parar narração">' +
                        '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">' +
                            '<rect x="5" y="5" width="14" height="14" rx="1"></rect>' +
                        '</svg>' +
                    '</button>' +
                    '<select id="intro-tts-rate-select" class="reader-select tts-rate-select hidden" aria-label="Velocidade da narração" title="Velocidade da narração" onchange="setStoryTTSRate(this.value)">' +
                        '<option value="0.85">0.85x</option>' +
                        '<option value="1" selected>1.0x</option>' +
                        '<option value="1.25">1.25x</option>' +
                        '<option value="1.5">1.5x</option>' +
                    '</select>';
                titleRow.appendChild(ttsControls);
            }
        } else {
            introContainer.innerHTML = '<p class="empty-message">Carregando apresentação dos Arquivos do Multiverso...</p>';
        }
    }

    // Section 2: Textos
    function renderTextosSection() {
        var grid = document.getElementById('grid-textos');
        if (!grid) return;
        var items = state.catalog.items.filter(function(item) { return item.type === 'text'; });
        if (items.length === 0) {
            grid.innerHTML = '<p class="empty-message">Nenhum texto publicado no momento.</p>';
            return;
        }
        grid.innerHTML = items.map(function(item) { return renderCardHTML(item); }).join('');
    }

    // Section 3: Áudios
    function renderAudiosSection() {
        var grid = document.getElementById('grid-audios');
        if (!grid) return;
        var items = state.catalog.items.filter(function(item) { return item.type === 'audio'; });
        if (items.length === 0) {
            grid.innerHTML = '<p class="empty-message">Nenhuma frequência de áudio publicada no momento.</p>';
            return;
        }
        grid.innerHTML = items.map(function(item) { return renderCardHTML(item); }).join('');
    }

    // Section 4: Vídeos
    function renderVideosSection() {
        var grid = document.getElementById('grid-videos');
        if (!grid) return;
        var items = state.catalog.items.filter(function(item) { return item.type === 'video'; });
        if (items.length === 0) {
            grid.innerHTML = '<p class="empty-message">Nenhum registro de vídeo publicado no momento.</p>';
            return;
        }
        grid.innerHTML = items.map(function(item) { return renderCardHTML(item); }).join('');
    }

    // Card Renderer for Text, Audio, and Video items
    function renderCardHTML(item) {
        var isText = item.type === 'text';
        var isAudio = item.type === 'audio';
        var isVideo = item.type === 'video';
        var targetParam = escapeHtml(item.slug || item.id);

        // Media Frame or Banner
        var mediaHtml = '';
        if (isText) {
            if (item.coverImage) {
                var jsSrc = String(item.coverImage).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                var jsTitle = String(item.title || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                mediaHtml = '<div class="card-cover-wrapper">' +
                    '<img src="' + escapeHtml(item.coverImage) + '" alt="' + escapeHtml(item.title) + '" class="card-cover-img" loading="lazy">' +
                    '<button type="button" class="card-cover-zoom-btn" onclick="event.stopPropagation(); openLightbox(\'' + jsSrc + '\', \'' + jsTitle + '\');" aria-label="Ampliar imagem" title="Ampliar imagem">' +
                        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
                            '<circle cx="11" cy="11" r="7"></circle>' +
                            '<line x1="21" y1="21" x2="16.65" y2="16.65"></line>' +
                            '<line x1="11" y1="8" x2="11" y2="14"></line>' +
                            '<line x1="8" y1="11" x2="14" y2="11"></line>' +
                        '</svg>' +
                    '</button>' +
                    '<div class="card-scanline-overlay" aria-hidden="true"></div>' +
                '</div>';
            } else {
                mediaHtml = '<div class="card-cover-wrapper">' +
                    '<div class="card-placeholder-art">' +
                        '<span class="placeholder-glyph">ƎƎ</span>' +
                        '<span class="placeholder-label">ARQUIVO DE TEXTO</span>' +
                    '</div>' +
                    '<div class="card-scanline-overlay" aria-hidden="true"></div>' +
                '</div>';
            }
        } else if (isAudio) {
            var spotifyEmbed = getSpotifyEmbedUrl(item.url);
            mediaHtml = '<div class="media-embed-frame spotify-embed-container">' +
                '<iframe src="' + escapeHtml(spotifyEmbed) + '" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' +
            '</div>';
        } else if (isVideo) {
            var youtubeId = getYoutubeId(item.url);
            if (youtubeId) {
                mediaHtml = '<div class="media-embed-frame video-embed-container">' +
                    '<iframe src="https://www.youtube-nocookie.com/embed/' + escapeHtml(youtubeId) + '?rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>' +
                '</div>';
            } else if (item.url && (item.url.endsWith('.mp4') || item.url.endsWith('.webm'))) {
                mediaHtml = '<div class="media-embed-frame video-embed-container">' +
                    '<video controls preload="metadata" src="' + escapeHtml(item.url) + '"></video>' +
                '</div>';
            } else {
                mediaHtml = '<div class="card-cover-wrapper">' +
                    '<div class="card-placeholder-art">' +
                        '<span class="placeholder-glyph">VÍDEO</span>' +
                        '<span class="placeholder-label">REGISTRO VISUAL</span>' +
                    '</div>' +
                '</div>';
            }
        }

        // Meta Pills: Keep Category & Saga without # (reading time badge removed)
        var categoryPill = item.category ? '<span class="meta-pill category-pill">' + escapeHtml(item.category) + '</span>' : '';
        var sagaPill = item.saga ? '<span class="meta-pill saga-pill">' + escapeHtml(item.saga) + '</span>' : '';

        // Clickable card attributes for text stories (whole card clickable)
        var cardClickAttrs = '';
        if (isText) {
            cardClickAttrs = ' role="button" tabindex="0" onclick="openStory(\'' + targetParam + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openStory(\'' + targetParam + '\');}" aria-label="Abrir registro: ' + escapeHtml(item.title) + '"';
        }

        return '<article class="cyber-card' + (isText ? ' cyber-card-clickable' : '') + '" data-id="' + escapeHtml(item.id) + '"' + cardClickAttrs + '>' +
            mediaHtml +
            '<div class="card-body">' +
                '<div class="card-meta-row">' +
                    categoryPill +
                    sagaPill +
                '</div>' +
                '<h3 class="card-title">' + escapeHtml(item.title) + '</h3>' +
                (item.summary ? '<p class="card-summary">' + escapeHtml(item.summary) + '</p>' : '') +
            '</div>' +
        '</article>';
    }

    /* ------------------------------------------------------------------------
       Carousel Navigation Helpers for Published Text Stories
       ------------------------------------------------------------------------ */
    function getTextStories() {
        return state.catalog.items.filter(function(i) {
            return i.type === 'text';
        });
    }

    function prevStory() {
        var textStories = getTextStories();
        if (textStories.length <= 1 || !state.activeStory) return;
        var currentIndex = textStories.findIndex(function(i) {
            return i.id === state.activeStory.id || i.slug === state.activeStory.slug;
        });
        if (currentIndex === -1) return;
        var targetIndex = (currentIndex - 1 + textStories.length) % textStories.length;
        openStory(textStories[targetIndex].slug || textStories[targetIndex].id);
    }

    function nextStory() {
        var textStories = getTextStories();
        if (textStories.length <= 1 || !state.activeStory) return;
        var currentIndex = textStories.findIndex(function(i) {
            return i.id === state.activeStory.id || i.slug === state.activeStory.slug;
        });
        if (currentIndex === -1) return;
        var targetIndex = (currentIndex + 1) % textStories.length;
        openStory(textStories[targetIndex].slug || textStories[targetIndex].id);
    }

    function scrollStoryToTop() {
        var dialog = document.getElementById('story-popup-dialog');
        if (dialog) {
            dialog.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /* ------------------------------------------------------------------------
       Immersive Story Reader Engine & Reading Comfort Controls
       ------------------------------------------------------------------------ */
    async function openStory(idOrSlug) {
        if (!idOrSlug) return;

        var story = state.catalog.items.find(function(i) {
            return (i.id === idOrSlug || i.slug === idOrSlug) && i.type === 'text';
        });

        if (!story) {
            console.error('[Story reader]: História não encontrada para id:', idOrSlug);
            return;
        }

        // Stop any active narration before switching story
        stopStoryTTS();

        state.activeStory = story;

        // CRITICAL REQUIREMENT: Automatically pause animated cosmos canvas during reading
        if (window.CosmosEngine) {
            window.CosmosEngine.pause('reading');
        }

        // Show Story Reader Popup Modal (do NOT hide underlying catalog section)
        var readerModal = document.getElementById('story-reader');
        if (readerModal) readerModal.classList.remove('hidden');
        document.body.classList.add('story-modal-open');

        // Reset scroll position of popup dialog smoothly to top & trigger Matrix reveal
        var dialog = document.getElementById('story-popup-dialog');
        if (dialog) {
            dialog.scrollTo({ top: 0, behavior: 'smooth' });
            dialog.classList.remove('matrix-switching');
            void dialog.offsetWidth;
            dialog.classList.add('matrix-switching');
        }

        // Fetch and Render Markdown Content via Tri-Tier loader
        var bodyContainer = document.getElementById('story-body');
        if (bodyContainer) {
            bodyContainer.innerHTML = '<p class="empty-message">Carregando registro e decodificando glifos dimensionais...</p>';

            var mdContent = await fetchMarkdownFile(story.file);
            if (mdContent) {
                // Safeguard: normalize maltuk1/maltuk2/conselho_solar_01 png/jpg to webp
                mdContent = mdContent
                    .replace(/images\/maltuk1\.(png|jpg)/gi, 'images/maltuk1.webp')
                    .replace(/images\/maltuk2\.(png|jpg)/gi, 'images/maltuk2.webp')
                    .replace(/images\/conselho_solar_01\.(png|jpg)/gi, 'images/conselho_solar_01.webp');

                bodyContainer.innerHTML = converter.makeHtml(mdContent);

                // Smooth Matrix reveal on rendered story content
                bodyContainer.classList.remove('matrix-switching');
                void bodyContainer.offsetWidth;
                bodyContainer.classList.add('matrix-switching');

                // Attach click listeners to all rendered images to trigger high-res lightbox
                bodyContainer.querySelectorAll('img').forEach(function(img) {
                    img.addEventListener('click', function(e) {
                        e.stopPropagation();
                        openLightbox(img.src, img.alt || story.title);
                    });
                });
            } else {
                bodyContainer.innerHTML = '<p class="empty-message">Não foi possível carregar o conteúdo deste registro (' + escapeHtml(story.file) + ').</p>';
            }
        }

        // Render Related Items Block (relatedIds)
        var relatedSection = document.getElementById('story-related-section');
        var relatedGrid = document.getElementById('story-related-grid');
        if (relatedSection && relatedGrid) {
            if (Array.isArray(story.relatedIds) && story.relatedIds.length > 0) {
                var relatedItems = state.catalog.items.filter(function(i) {
                    return story.relatedIds.includes(i.id) || story.relatedIds.includes(i.slug);
                });

                if (relatedItems.length > 0) {
                    relatedGrid.innerHTML = relatedItems.map(function(item) {
                        return renderCardHTML(item);
                    }).join('');
                    relatedSection.classList.remove('hidden');
                } else {
                    relatedSection.classList.add('hidden');
                }
            } else {
                relatedSection.classList.add('hidden');
            }
        }

        // Update URL Hash for direct link sharing
        if (history.replaceState) {
            history.replaceState(null, null, '#story=' + (story.slug || story.id));
        } else {
            window.location.hash = 'story=' + (story.slug || story.id);
        }

        // Reset progress bar
        updateReadingProgress();
    }

    function closeStory() {
        if (!state.activeStory) return;
        stopStoryTTS();
        state.activeStory = null;

        // Hide Reader Modal
        var readerModal = document.getElementById('story-reader');
        if (readerModal) readerModal.classList.add('hidden');
        document.body.classList.remove('story-modal-open');

        // CRITICAL REQUIREMENT: Automatically resume Cosmos animation on exit
        if (window.CosmosEngine) {
            window.CosmosEngine.resume('reading');
        }

        // Reset progress bar
        var bar = document.getElementById('reading-progress-bar');
        if (bar) {
            bar.style.width = '0%';
            bar.setAttribute('aria-valuenow', 0);
        }

        // Restore URL hash to active section
        if (history.replaceState) {
            history.replaceState(null, null, '#section=' + (state.activeSection || 'textos'));
        }
    }

    /* ------------------------------------------------------------------------
       Reading Comfort Toolbar Controls
       ------------------------------------------------------------------------ */
    function adjustStoryFontSize(delta) {
        var newSize = Math.min(28, Math.max(14, state.readerPrefs.fontSize + delta * 2));
        state.readerPrefs.fontSize = newSize;

        document.documentElement.style.setProperty('--reading-font-size', newSize + 'px');
        var display = document.getElementById('font-size-display');
        if (display) display.textContent = newSize + 'px';

        saveReaderPreferences();
    }

    function setStoryFontFamily(fontKey) {
        state.readerPrefs.font = fontKey;
        document.body.setAttribute('data-reading-font', fontKey);
        saveReaderPreferences();
    }

    function setStoryColumnWidth(widthKey) {
        state.readerPrefs.width = widthKey;
        document.body.setAttribute('data-reading-width', widthKey);
        saveReaderPreferences();
    }

    function setStoryContrastTheme(themeKey) {
        state.readerPrefs.contrast = themeKey;
        document.body.setAttribute('data-reading-theme', themeKey);
        saveReaderPreferences();
    }

    function saveReaderPreferences() {
        try {
            localStorage.setItem('ee_reader_prefs', JSON.stringify(state.readerPrefs));
        } catch (e) {
            // Ignore quota errors
        }
    }

    function loadReaderPreferences() {
        try {
            var raw = localStorage.getItem('ee_reader_prefs');
            if (raw) {
                var parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object' && parsed.prefsVersion === 2) {
                    if (typeof parsed.fontSize === 'number') state.readerPrefs.fontSize = parsed.fontSize;
                    if (typeof parsed.font === 'string') state.readerPrefs.font = parsed.font;
                    if (typeof parsed.width === 'string') state.readerPrefs.width = parsed.width;
                    if (typeof parsed.contrast === 'string') state.readerPrefs.contrast = parsed.contrast;
                } else {
                    saveReaderPreferences();
                }
            }
        } catch (e) {
            // Fallback to defaults
        }

        // Apply to DOM
        document.documentElement.style.setProperty('--reading-font-size', state.readerPrefs.fontSize + 'px');
        document.body.setAttribute('data-reading-font', state.readerPrefs.font);
        document.body.setAttribute('data-reading-width', state.readerPrefs.width);
        document.body.setAttribute('data-reading-theme', state.readerPrefs.contrast);

        // Sync Toolbar Form Elements
        var display = document.getElementById('font-size-display');
        var fontSelect = document.getElementById('reader-font-select');
        var widthSelect = document.getElementById('reader-width-select');
        var contrastSelect = document.getElementById('reader-contrast-select');

        if (display) display.textContent = state.readerPrefs.fontSize + 'px';
        if (fontSelect) fontSelect.value = state.readerPrefs.font;
        if (widthSelect) widthSelect.value = state.readerPrefs.width;
        if (contrastSelect) contrastSelect.value = state.readerPrefs.contrast;
    }

    /* ------------------------------------------------------------------------
       Story Link & Social Sharing Controls
       ------------------------------------------------------------------------ */
    function getStoryShareUrl() {
        if (!state.activeStory) return window.location.href;
        var base = window.location.protocol + '//' + window.location.host + window.location.pathname;
        return base + '#story=' + (state.activeStory.slug || state.activeStory.id);
    }

    function copyStoryLink() {
        var url = getStoryShareUrl();
        var btnEl = document.getElementById('btn-copy-link');
        var iconDefault = document.getElementById('copy-link-icon-default');
        var iconCheck = document.getElementById('copy-link-icon-check');

        function onCopied() {
            if (btnEl) btnEl.classList.add('is-copied');
            if (iconDefault) iconDefault.classList.add('hidden');
            if (iconCheck) iconCheck.classList.remove('hidden');
            setTimeout(function() {
                if (btnEl) btnEl.classList.remove('is-copied');
                if (iconDefault) iconDefault.classList.remove('hidden');
                if (iconCheck) iconCheck.classList.add('hidden');
            }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(onCopied).catch(function() {
                fallbackCopyText(url);
                onCopied();
            });
        } else {
            fallbackCopyText(url);
            onCopied();
        }
    }

    function fallbackCopyText(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } catch (e) {
            // Ignore
        }
        document.body.removeChild(textarea);
    }

    function shareStory(platform) {
        if (!state.activeStory) return;
        var url = getStoryShareUrl();
        var title = state.activeStory.title || 'Esquizofrenia Estelar';
        var shareText = title + ' — Os Arquivos do Multiverso';
        var shareTarget = '';

        if (platform === 'whatsapp') {
            shareTarget = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(shareText + ' ' + url);
        } else if (platform === 'x' || platform === 'twitter') {
            shareTarget = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(url);
        } else if (platform === 'facebook') {
            shareTarget = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
        } else if (platform === 'telegram') {
            shareTarget = 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(shareText);
        }

        if (shareTarget) {
            window.open(shareTarget, '_blank', 'noopener,noreferrer,width=600,height=480');
        }
    }

    /* ------------------------------------------------------------------------
       Reading Progress Bar Tracker
       ------------------------------------------------------------------------ */
    function updateReadingProgress() {
        var bar = document.getElementById('reading-progress-bar');
        if (!bar) return;

        if (!state.activeStory) {
            bar.style.width = '0%';
            bar.setAttribute('aria-valuenow', 0);
            return;
        }

        var dialog = document.getElementById('story-popup-dialog');
        if (!dialog) return;

        var scrollTop = dialog.scrollTop;
        var scrollHeight = dialog.scrollHeight - dialog.clientHeight;

        var progress = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;
        bar.style.width = progress + '%';
        bar.setAttribute('aria-valuenow', progress);
    }

    /* ------------------------------------------------------------------------
       High-Resolution Image Lightbox Modal
       ------------------------------------------------------------------------ */
    function openLightbox(src, caption) {
        var modal = document.getElementById('image-lightbox');
        var img = document.getElementById('lightbox-img');
        var cap = document.getElementById('lightbox-caption');
        if (!modal || !img) return;

        img.src = src;
        img.alt = caption || '';
        if (cap) cap.textContent = caption || '';
        modal.classList.remove('hidden');
    }

    function closeLightbox() {
        var modal = document.getElementById('image-lightbox');
        if (modal) modal.classList.add('hidden');
    }

    /* ------------------------------------------------------------------------
       Search Overlay Modal Engine
       ------------------------------------------------------------------------ */
    function openSearchOverlay() {
        var overlay = document.getElementById('search-overlay');
        var input = document.getElementById('overlay-search-input');
        if (!overlay) return;

        overlay.classList.remove('hidden');
        if (input) {
            input.focus();
            if (input.value.trim()) {
                handleOverlaySearch(input.value.trim());
            } else {
                var resultsContainer = document.getElementById('search-overlay-results');
                if (resultsContainer) {
                    resultsContainer.innerHTML = '<div class="search-empty-state">Digite um termo para pesquisar em todos os registros do multiverso...</div>';
                }
            }
        }
    }

    function closeSearchOverlay() {
        var overlay = document.getElementById('search-overlay');
        var input = document.getElementById('overlay-search-input');
        if (overlay) overlay.classList.add('hidden');
        if (input) input.value = '';
    }

    function handleOverlaySearch(query) {
        var resultsContainer = document.getElementById('search-overlay-results');
        if (!resultsContainer) return;

        var q = (query || '').trim().toLowerCase();
        if (!q) {
            resultsContainer.innerHTML = '<div class="search-empty-state">Digite um termo para pesquisar em todos os registros do multiverso...</div>';
            return;
        }

        var matches = state.catalog.items.filter(function(item) {
            var searchIn = (
                (item.title || '') + ' ' +
                (item.summary || '') + ' ' +
                (item.category || '') + ' ' +
                (item.saga || '') + ' ' +
                (item.tags || []).join(' ')
            ).toLowerCase();

            return searchIn.indexOf(q) !== -1;
        });

        if (matches.length === 0) {
            resultsContainer.innerHTML = '<div class="search-empty-state">Nenhum registro encontrado para "' + escapeHtml(query) + '".</div>';
            return;
        }

        resultsContainer.innerHTML = matches.map(function(item) {
            var typeLabel = item.type === 'text' ? 'Texto' : (item.type === 'audio' ? 'Áudio' : 'Vídeo');
            var typeClass = 'type-' + item.type;
            var targetParam = escapeHtml(item.slug || item.id);

            return '<div class="search-result-item" onclick="onSearchResultClick(\'' + item.type + '\', \'' + targetParam + '\')">' +
                '<div class="search-result-top">' +
                    '<span class="search-result-title">' + escapeHtml(item.title) + '</span>' +
                    '<span class="search-result-type ' + typeClass + '">' + typeLabel + '</span>' +
                '</div>' +
                (item.summary ? '<div class="search-result-summary">' + escapeHtml(item.summary) + '</div>' : '') +
            '</div>';
        }).join('');
    }

    function onSearchResultClick(type, idOrSlug) {
        closeSearchOverlay();
        if (type === 'text') {
            openStory(idOrSlug);
        } else if (type === 'audio') {
            navigateTo('audios');
        } else if (type === 'video') {
            navigateTo('videos');
        }
    }

    /* ------------------------------------------------------------------------
       Navigation & Section Routing
       ------------------------------------------------------------------------ */
    function hideAllSections() {
        document.querySelectorAll('.catalog-section').forEach(function(el) {
            el.classList.add('hidden');
            el.classList.remove('matrix-section-enter');
        });
    }

    function navigateTo(sectionId, updateHash) {
        // If story modal is currently open, close it cleanly
        if (state.activeStory) {
            closeStory();
        }
        if (ttsState.source === 'intro' && sectionId !== 'intro') {
            stopStoryTTS();
        }

        // CRITICAL REQUIREMENT: Always resume animated cosmos canvas when navigating sections
        if (window.CosmosEngine) {
            window.CosmosEngine.resume('reading');
        }

        hideAllSections();

        var targetSection = document.getElementById('section-' + sectionId);
        if (!targetSection) {
            targetSection = document.getElementById('section-intro');
            sectionId = 'intro';
        }

        targetSection.classList.remove('hidden');
        state.activeSection = sectionId;

        // Matrix section transition animation
        targetSection.classList.remove('matrix-section-enter');
        void targetSection.offsetWidth;
        targetSection.classList.add('matrix-section-enter');

        // Matrix Header "Suck-In" compact warp collapse when clicking menus
        var isCompact = (sectionId !== 'intro');
        var mainHeader = document.querySelector('.main-header');
        if (mainHeader) {
            mainHeader.classList.toggle('header-compact', isCompact);
        }
        document.body.classList.toggle('header-compact', isCompact);

        // Matrix glow pulse on the orbital emblem
        var emblem = document.querySelector('.emblem-wrapper');
        if (emblem) {
            emblem.classList.remove('emblem-pulse');
            void emblem.offsetWidth;
            emblem.classList.add('emblem-pulse');
        }

        // Subtle Matrix entrance animation for cards in section
        var cards = targetSection.querySelectorAll('.cyber-card');
        if (cards && cards.length > 0) {
            cards.forEach(function(card) {
                card.classList.remove('matrix-entering');
                void card.offsetWidth;
                card.classList.add('matrix-entering');
            });
        }

        // Update active navigation tab (Only Textos, Áudios, Vídeos)
        document.querySelectorAll('.main-nav .nav-tab').forEach(function(tab) {
            var tabId = tab.id.replace('nav-btn-', '');
            tab.classList.toggle('active', tabId === sectionId);
        });

        // Smooth scroll to top of viewport
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL hash
        if (updateHash !== false) {
            if (history.replaceState) {
                history.replaceState(null, null, '#section=' + sectionId);
            } else {
                window.location.hash = 'section=' + sectionId;
            }
        }
    }

    function handleHashRoute() {
        var hash = window.location.hash.slice(1);
        if (!hash) {
            if (state.activeSection !== 'intro') {
                navigateTo('intro', false);
            }
            return;
        }

        if (hash.indexOf('story=') === 0) {
            var slug = hash.replace('story=', '');
            openStory(slug);
        } else if (hash.indexOf('section=') === 0) {
            var section = hash.replace('section=', '');
            navigateTo(section, false);
        } else if (['intro', 'textos', 'audios', 'videos'].includes(hash)) {
            navigateTo(hash, false);
        }
    }

    /* ------------------------------------------------------------------------
       Global Event Listeners
       ------------------------------------------------------------------------ */
    window.addEventListener('hashchange', handleHashRoute);

    // Keyboard Shortcuts (ESC closes modals/reader; ArrowLeft/Right steps carousel; / or Ctrl+K opens search)
    window.addEventListener('keydown', function(e) {
        var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
        var isEditing = (tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable));

        if (e.key === 'Escape' || e.key === 'Esc') {
            var searchModal = document.getElementById('search-overlay');
            if (searchModal && !searchModal.classList.contains('hidden')) {
                closeSearchOverlay();
                return;
            }
            var lightbox = document.getElementById('image-lightbox');
            if (lightbox && !lightbox.classList.contains('hidden')) {
                closeLightbox();
                return;
            }
            if (state.activeStory) {
                closeStory();
                return;
            }
            return;
        }

        // Story Reader Carousel Navigation via Arrow Keys
        if (state.activeStory && !isEditing) {
            var lb = document.getElementById('image-lightbox');
            var lbOpen = lb && !lb.classList.contains('hidden');
            var sm = document.getElementById('search-overlay');
            var smOpen = sm && !sm.classList.contains('hidden');

            if (!lbOpen && !smOpen) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevStory();
                    return;
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextStory();
                    return;
                }
            }
        }

        // Shortcut: / or Ctrl+K / Cmd+K to open search overlay
        if ((e.key === '/' && !isEditing) || ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K'))) {
            e.preventDefault();
            openSearchOverlay();
        }
    });

    // Attach search input real-time listener
    function initSearchOverlayListeners() {
        var input = document.getElementById('overlay-search-input');
        if (input) {
            input.addEventListener('input', function(e) {
                handleOverlaySearch(e.target.value);
            });
        }
    }

    /* ------------------------------------------------------------------------
       Text-to-Speech (Accessibility Narration via Web Speech API)
       ------------------------------------------------------------------------ */
    var ttsState = {
        source: null, // 'story' | 'intro'
        isSpeaking: false,
        isPaused: false,
        rate: 1.0,
        chunks: [],
        chunkIndex: 0
    };

    function getBestPortugueseVoice() {
        if (!('speechSynthesis' in window)) return null;
        var voices = window.speechSynthesis.getVoices() || [];
        var ptBr = voices.find(function(v) { return /pt[-_]BR/i.test(v.lang); });
        if (ptBr) return ptBr;
        return voices.find(function(v) { return /^pt/i.test(v.lang); }) || null;
    }

    function extractReadableTextFromElement(elId) {
        var el = document.getElementById(elId);
        if (!el) return '';
        var clone = el.cloneNode(true);
        clone.querySelectorAll('.intro-tts-controls, select, button').forEach(function(node) {
            node.remove();
        });
        return (clone.innerText || clone.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function splitTextIntoTTSChunks(text) {
        if (!text) return [];
        var sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
        var chunks = [];
        var buffer = '';

        sentences.forEach(function(sentence) {
            if ((buffer + sentence).length > 220 && buffer.length > 0) {
                chunks.push(buffer.trim());
                buffer = sentence;
            } else {
                buffer += sentence;
            }
        });
        if (buffer.trim()) chunks.push(buffer.trim());
        return chunks;
    }

    function updateSingleTTSUI(prefix, isTargetActive) {
        var toggleBtn = document.getElementById(prefix ? prefix + '-tts-toggle' : 'btn-tts-toggle');
        var stopBtn = document.getElementById(prefix ? prefix + '-tts-stop' : 'btn-tts-stop');
        var rateSelect = document.getElementById(prefix ? prefix + '-tts-rate-select' : 'tts-rate-select');
        var iconPlay = document.getElementById(prefix ? prefix + '-tts-icon-play' : 'tts-icon-play');
        var iconPause = document.getElementById(prefix ? prefix + '-tts-icon-pause' : 'tts-icon-pause');

        var playingNow = isTargetActive && ttsState.isSpeaking && !ttsState.isPaused;
        var activeOrPaused = isTargetActive && (ttsState.isSpeaking || ttsState.isPaused);

        if (toggleBtn) {
            toggleBtn.classList.toggle('is-speaking', playingNow);
            toggleBtn.setAttribute('aria-label', playingNow ? 'Pausar narração' : (activeOrPaused ? 'Retomar narração' : 'Ouvir texto (narração por voz)'));
            toggleBtn.title = playingNow ? 'Pausar narração' : (activeOrPaused ? 'Retomar narração' : 'Ouvir texto (Text-to-Speech)');
        }
        if (iconPlay) iconPlay.classList.toggle('hidden', playingNow);
        if (iconPause) iconPause.classList.toggle('hidden', !playingNow);
        if (stopBtn) stopBtn.classList.toggle('hidden', !activeOrPaused);
        if (rateSelect) {
            rateSelect.classList.toggle('hidden', !activeOrPaused);
            rateSelect.value = String(ttsState.rate);
        }
    }

    function updateTTSUI() {
        updateSingleTTSUI('', ttsState.source === 'story');
        updateSingleTTSUI('btn-intro', ttsState.source === 'intro');
        // Note: intro icons use 'intro-tts-icon-play', 'intro-tts-icon-pause', 'intro-tts-rate-select'
        var iActive = ttsState.source === 'intro';
        var iPlaying = iActive && ttsState.isSpeaking && !ttsState.isPaused;
        var iVisible = iActive && (ttsState.isSpeaking || ttsState.isPaused);
        var iPlayIcon = document.getElementById('intro-tts-icon-play');
        var iPauseIcon = document.getElementById('intro-tts-icon-pause');
        var iRate = document.getElementById('intro-tts-rate-select');
        if (iPlayIcon) iPlayIcon.classList.toggle('hidden', iPlaying);
        if (iPauseIcon) iPauseIcon.classList.toggle('hidden', !iPlaying);
        if (iRate) {
            iRate.classList.toggle('hidden', !iVisible);
            iRate.value = String(ttsState.rate);
        }
    }

    function speakNextTTSChunk() {
        if (!('speechSynthesis' in window) || !ttsState.isSpeaking || ttsState.isPaused) return;
        if (ttsState.chunkIndex >= ttsState.chunks.length) {
            stopStoryTTS();
            return;
        }

        var chunk = ttsState.chunks[ttsState.chunkIndex];
        var utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = 'pt-BR';
        utterance.rate = ttsState.rate;
        var voice = getBestPortugueseVoice();
        if (voice) utterance.voice = voice;

        utterance.onend = function() {
            if (!ttsState.isSpeaking || ttsState.isPaused) return;
            ttsState.chunkIndex++;
            speakNextTTSChunk();
        };

        utterance.onerror = function() {
            stopStoryTTS();
        };

        window.speechSynthesis.speak(utterance);
    }

    function toggleTTSForSource(source, elementId) {
        if (!('speechSynthesis' in window)) {
            alert('Seu navegador não suporta leitura por voz (SpeechSynthesis).');
            return;
        }

        if (ttsState.source === source && ttsState.isSpeaking && !ttsState.isPaused) {
            ttsState.isPaused = true;
            window.speechSynthesis.pause();
            updateTTSUI();
            return;
        }

        if (ttsState.source === source && ttsState.isSpeaking && ttsState.isPaused) {
            ttsState.isPaused = false;
            window.speechSynthesis.resume();
            updateTTSUI();
            return;
        }

        var text = extractReadableTextFromElement(elementId);
        if (!text) return;

        window.speechSynthesis.cancel();
        ttsState.source = source;
        ttsState.chunks = splitTextIntoTTSChunks(text);
        ttsState.chunkIndex = 0;
        ttsState.isSpeaking = true;
        ttsState.isPaused = false;
        updateTTSUI();
        speakNextTTSChunk();
    }

    function toggleStoryTTS() {
        toggleTTSForSource('story', 'story-body');
    }

    function toggleIntroTTS() {
        toggleTTSForSource('intro', 'intro-markdown');
    }

    function stopStoryTTS() {
        ttsState.source = null;
        ttsState.isSpeaking = false;
        ttsState.isPaused = false;
        ttsState.chunks = [];
        ttsState.chunkIndex = 0;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        updateTTSUI();
    }

    function setStoryTTSRate(rateVal) {
        var parsed = parseFloat(rateVal);
        if (!isNaN(parsed) && parsed > 0) {
            ttsState.rate = parsed;
            if (ttsState.isSpeaking && !ttsState.isPaused) {
                var savedIdx = ttsState.chunkIndex;
                var savedChunks = ttsState.chunks.slice();
                window.speechSynthesis.cancel();
                ttsState.chunks = savedChunks;
                ttsState.chunkIndex = savedIdx;
                speakNextTTSChunk();
            }
        }
    }

    window.addEventListener('beforeunload', stopStoryTTS);

    /* ------------------------------------------------------------------------
       Public Backward-Compatibility API
       ------------------------------------------------------------------------ */
    global.navigateTo = navigateTo;
    global.openStory = openStory;
    global.closeStory = closeStory;
    global.prevStory = prevStory;
    global.nextStory = nextStory;
    global.scrollStoryToTop = scrollStoryToTop;
    global.openSearchOverlay = openSearchOverlay;
    global.closeSearchOverlay = closeSearchOverlay;
    global.onSearchResultClick = onSearchResultClick;
    global.adjustStoryFontSize = adjustStoryFontSize;
    global.setStoryFontFamily = setStoryFontFamily;
    global.setStoryColumnWidth = setStoryColumnWidth;
    global.setStoryContrastTheme = setStoryContrastTheme;
    global.copyStoryLink = copyStoryLink;
    global.shareStory = shareStory;
    global.toggleStoryTTS = toggleStoryTTS;
    global.toggleIntroTTS = toggleIntroTTS;
    global.stopStoryTTS = stopStoryTTS;
    global.setStoryTTSRate = setStoryTTSRate;
    global.openLightbox = openLightbox;
    global.closeLightbox = closeLightbox;

    // Legacy wrappers for backward compatibility
    global.loadIntro = function() { navigateTo('intro'); };
    global.loadTextos = function() { navigateTo('textos'); };
    global.loadAudios = function() { navigateTo('audios'); };
    global.loadVideos = function() { navigateTo('videos'); };
    global.showSection = function(id) { navigateTo(id); };
    global.loadTexto = function(filePath) {
        var slug = filePath.replace(/^texts\//, '').replace(/\.md$/, '');
        openStory(slug);
    };

    /* ------------------------------------------------------------------------
       Initialization on DOM Ready
       ------------------------------------------------------------------------ */
    async function initApp() {
        loadReaderPreferences();
        initSearchOverlayListeners();

        // Attach scroll listener to story popup dialog for progress tracking
        var dialog = document.getElementById('story-popup-dialog');
        if (dialog) {
            dialog.addEventListener('scroll', updateReadingProgress, { passive: true });
        }

        await loadTheme();
        await loadCatalog();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})(typeof window !== 'undefined' ? window : this);
