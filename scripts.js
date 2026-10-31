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
                coverImage: "images/maltuk1.png",
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
                coverImage: "images/conselho_solar_01.png",
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
        "texts/01_os_arquivistas.md": "# Os Arquivistas\n\n* Apresentação do primeiro contato com um Maltuk (O Arquivista)\n* Contar a história dos Maltuks e seu propósito\n* Os Maltuks cantam canções em vibrações inexplicáveis, somente presenciando tal proeza para compreender esse fenômeno. Aqui é uma tradução descritiva auxiliada pelas máquinas sencientes, o sistema que permite a interação entre nós seres vivos dessa dimensão, e os arautos do fim do mundo\n* \n\nMaltuk Arquivista\n<img src=\"images/maltuk1.png\" alt=\"Maltuk e seu manto\" width=\"333\"/>\n\nMaltuk Priestess\n<img src=\"images/maltuk2.jpg\" alt=\"Maltuk Priestess\" width=\"333\"/>",
        "texts/02_metamorphis.md": "# A Saga Metamorphis\n\n## Prelúdio do Caos\n\n* Transcrever aqui as notas do papel sobre a história da formação, ascenção e declínio do Conselho Solar da Nova Era.\n\nEsboço inicial do banner:\n* Os Maltuks ao centro deveriam ser mais insetídeos\n* Os Thyrexianos mecanos da esquerda ao meio são mais reptlianos tecnologicos\n\n\n<img src=\"images/conselho_solar_01.png\" alt=\"Maltuk e seu manto\" width=\"333\"/>"
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
            fontSize: 18,
            font: 'serif',
            width: 'default',
            contrast: 'abyssal',
            focus: false
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
            return 'https://open.spotify.com/embed/' + cleanPath + '?utm_source=generator&theme=0';
        } catch (e) {
            return url;
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

        // Media Frame or Banner
        var mediaHtml = '';
        if (isText) {
            if (item.coverImage) {
                mediaHtml = '<div class="card-cover-wrapper">' +
                    '<img src="' + escapeHtml(item.coverImage) + '" alt="' + escapeHtml(item.title) + '" class="card-cover-img" loading="lazy">' +
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
                '<iframe src="' + escapeHtml(spotifyEmbed) + '" width="100%" height="152" allow="encrypted-media" loading="lazy"></iframe>' +
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

        // Meta Pills
        var categoryPill = item.category ? '<span class="meta-pill category-pill">' + escapeHtml(item.category) + '</span>' : '';
        var sagaPill = item.saga ? '<span class="meta-pill saga-pill">' + escapeHtml(item.saga) + '</span>' : '';
        var timePill = isText ? '<span class="meta-pill time-pill">~' + (item.readingTime || 2) + ' MIN LEITURA</span>' : '';

        // Tag Pills
        var tagsHtml = (item.tags || []).map(function(t) {
            return '<span class="card-tag">#' + escapeHtml(t) + '</span>';
        }).join('');

        // Action button for text
        var actionBtn = '';
        if (isText) {
            var targetParam = escapeHtml(item.slug || item.id);
            actionBtn = '<div class="card-footer-action">' +
                '<button class="card-access-btn" type="button" onclick="openStory(\'' + targetParam + '\')">' +
                    '<span>ACESSAR REGISTRO [ // ]</span>' +
                    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
                '</button>' +
            '</div>';
        }

        return '<article class="cyber-card" data-id="' + escapeHtml(item.id) + '">' +
            mediaHtml +
            '<div class="card-body">' +
                '<div class="card-meta-row">' +
                    categoryPill +
                    sagaPill +
                    timePill +
                '</div>' +
                '<h3 class="card-title">' + escapeHtml(item.title) + '</h3>' +
                (item.summary ? '<p class="card-summary">' + escapeHtml(item.summary) + '</p>' : '') +
                (tagsHtml ? '<div class="card-tags">' + tagsHtml + '</div>' : '') +
                actionBtn +
            '</div>' +
        '</article>';
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

        state.activeStory = story;

        // CRITICAL REQUIREMENT: Automatically pause animated cosmos canvas during reading
        if (window.CosmosEngine) {
            window.CosmosEngine.pause('reading');
        }

        // Hide catalog sections
        hideAllSections();

        // Show Story Reader
        var readerSection = document.getElementById('story-reader');
        if (readerSection) readerSection.classList.remove('hidden');

        // Populate Header Info
        var categoryEl = document.getElementById('story-category-tag');
        var sagaEl = document.getElementById('story-saga-tag');
        var timeEl = document.getElementById('story-time-tag');
        var titleEl = document.getElementById('story-title');
        var tagsContainer = document.getElementById('story-tags-container');
        var coverWrapper = document.getElementById('story-cover-wrapper');
        var coverImg = document.getElementById('story-cover-image');

        if (categoryEl) categoryEl.textContent = story.category || 'Crônicas & Sagas';
        if (sagaEl) sagaEl.textContent = story.saga || 'Arquivos do Multiverso';
        if (timeEl) timeEl.textContent = '~' + (story.readingTime || 2) + ' MIN LEITURA';
        if (titleEl) titleEl.textContent = story.title;

        if (tagsContainer) {
            tagsContainer.innerHTML = (story.tags || []).map(function(t) {
                return '<span class="card-tag">#' + escapeHtml(t) + '</span>';
            }).join('');
        }

        if (coverWrapper && coverImg) {
            if (story.coverImage) {
                coverImg.src = story.coverImage;
                coverImg.alt = story.title;
                coverWrapper.classList.remove('hidden');
            } else {
                coverWrapper.classList.add('hidden');
            }
        }

        // Fetch and Render Markdown Content via Tri-Tier loader
        var bodyContainer = document.getElementById('story-body');
        if (bodyContainer) {
            bodyContainer.innerHTML = '<p class="empty-message">Carregando registro e decodificando glifos dimensionais...</p>';

            var mdContent = await fetchMarkdownFile(story.file);
            if (mdContent) {
                bodyContainer.innerHTML = converter.makeHtml(mdContent);

                // Attach click listeners to all rendered images to trigger high-res lightbox
                bodyContainer.querySelectorAll('img').forEach(function(img) {
                    img.addEventListener('click', function() {
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

        // Smooth scroll to top of viewport
        window.scrollTo({ top: 0, behavior: 'smooth' });

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
        state.activeStory = null;

        // Hide Reader
        var readerSection = document.getElementById('story-reader');
        if (readerSection) readerSection.classList.add('hidden');

        // CRITICAL REQUIREMENT: Automatically resume Cosmos animation on exit
        if (window.CosmosEngine) {
            window.CosmosEngine.resume('reading');
        }

        // Reset progress bar
        var bar = document.getElementById('reading-progress-bar');
        if (bar) bar.style.width = '0%';

        // Restore previously active section (default 'textos')
        navigateTo(state.activeSection || 'textos', false);
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

    function toggleStoryFocusMode() {
        state.readerPrefs.focus = !state.readerPrefs.focus;
        document.body.classList.toggle('focus-mode-active', state.readerPrefs.focus);

        var btn = document.getElementById('btn-reader-focus');
        var label = document.getElementById('focus-btn-label');
        if (btn) btn.classList.toggle('is-active', state.readerPrefs.focus);
        if (label) {
            label.textContent = state.readerPrefs.focus ? 'SAIR DA IMERSÃO' : 'MODO IMERSÃO';
        }

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
                Object.assign(state.readerPrefs, parsed);
            }
        } catch (e) {
            // Fallback to defaults
        }

        // Apply to DOM
        document.documentElement.style.setProperty('--reading-font-size', state.readerPrefs.fontSize + 'px');
        document.body.setAttribute('data-reading-font', state.readerPrefs.font);
        document.body.setAttribute('data-reading-width', state.readerPrefs.width);
        document.body.setAttribute('data-reading-theme', state.readerPrefs.contrast);

        if (state.readerPrefs.focus) {
            document.body.classList.add('focus-mode-active');
        }

        // Sync Toolbar Form Elements
        var display = document.getElementById('font-size-display');
        var fontSelect = document.getElementById('reader-font-select');
        var widthSelect = document.getElementById('reader-width-select');
        var contrastSelect = document.getElementById('reader-contrast-select');
        var focusBtn = document.getElementById('btn-reader-focus');
        var focusLabel = document.getElementById('focus-btn-label');

        if (display) display.textContent = state.readerPrefs.fontSize + 'px';
        if (fontSelect) fontSelect.value = state.readerPrefs.font;
        if (widthSelect) widthSelect.value = state.readerPrefs.width;
        if (contrastSelect) contrastSelect.value = state.readerPrefs.contrast;
        if (focusBtn) focusBtn.classList.toggle('is-active', state.readerPrefs.focus);
        if (focusLabel) focusLabel.textContent = state.readerPrefs.focus ? 'SAIR DA IMERSÃO' : 'MODO IMERSÃO';
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

        var docEl = document.documentElement;
        var body = document.body;
        var scrollTop = docEl.scrollTop || body.scrollTop;
        var scrollHeight = (docEl.scrollHeight || body.scrollHeight) - docEl.clientHeight;

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
        document.querySelectorAll('.catalog-section, .story-reader-view').forEach(function(el) {
            el.classList.add('hidden');
        });
    }

    function navigateTo(sectionId, updateHash) {
        // If story is currently open, close it cleanly
        if (state.activeStory) {
            state.activeStory = null;
            var readerSection = document.getElementById('story-reader');
            if (readerSection) readerSection.classList.add('hidden');
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
        if (!hash) return;

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
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    window.addEventListener('hashchange', handleHashRoute);

    // Keyboard Shortcuts (ESC closes modals/reader; / or Ctrl+K opens search)
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
            }
            return;
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
       Public Backward-Compatibility API
       ------------------------------------------------------------------------ */
    global.navigateTo = navigateTo;
    global.openStory = openStory;
    global.closeStory = closeStory;
    global.openSearchOverlay = openSearchOverlay;
    global.closeSearchOverlay = closeSearchOverlay;
    global.onSearchResultClick = onSearchResultClick;
    global.adjustStoryFontSize = adjustStoryFontSize;
    global.setStoryFontFamily = setStoryFontFamily;
    global.setStoryColumnWidth = setStoryColumnWidth;
    global.setStoryContrastTheme = setStoryContrastTheme;
    global.toggleStoryFocusMode = toggleStoryFocusMode;
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
        await loadTheme();
        await loadCatalog();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})(typeof window !== 'undefined' ? window : this);
