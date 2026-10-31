# ƎƎ ESQUIZOFRENIA ESTELAR 2.0 // OS ARQUIVOS DO MULTIVERSO

Repositório oficial de narrativa, arquitetura estelar e arquivos do multiverso de **Esquizofrenia Estelar**.

* **Portal Público**: [https://esquizofreniaestelar.pages.dev/](https://esquizofreniaestelar.pages.dev/)
* **Espelho GitHub Pages**: [https://insomnia33.github.io/esquizofreniaestelar/](https://insomnia33.github.io/esquizofreniaestelar/)

---

## ◈ 1. VISÃO DO MULTIVERSO

Diante do fim dos tempos, ergue-se o **Cérebro de Matriosca** — uma colossal megaestrutura de esferas concêntricas alimentada pela energia remanescente de uma anã branca moribunda. No interior dessa catedral de neurônios sintéticos, trilhões de mentes e civilizações habitam realidades simuladas.

Os **Maltuks**, arquivistas e sacerdotes da quinta dimensão, emitem canções vibracionais inexplicáveis traduzidas pelas máquinas sencientes zeladoras do Arquivo, selecionando quais realidades são dignas de preservação eterna perante a entropia do multiverso.

---

## ◈ 2. ARQUITETURA DO SISTEMA 2.0

O ecossistema foi construído com arquitetura estática de borda (*Edge-First*), garantindo carregamento instantâneo, total soberania de dados, zero dependências pesadas de compilação (zero npm/webpack build step) e compatibilidade universal:

```
esquizofreniaestelar/
├── index.html          # Portal público de leitura interativa
├── styles.css          # Folha de estilos do portal público
├── scripts.js          # Lógica do leitor, carregamento dinâmico e filtros
├── cosmos.js           # Motor de fundo cósmico, constelações e Matrix
├── catalog.json        # Catálogo mestre unificado (contos, mídias e notas)
├── theme.json          # Configuração visual, presets e motor cósmico
├── texts.json          # Arquivo legado regenerado automaticamente
├── media.json          # Arquivo legado regenerado automaticamente
│
├── studio.html         # Studio Local de Criação e Comando do Autor
├── studio.css          # Design system cibernético do Studio
├── studio.js           # Persistência via File System Access API e ditado nativo
│
├── texts/              # Narrativas em formato Markdown (.md)
│   ├── intro.md
│   ├── 01_os_arquivistas.md
│   └── 02_metamorphis.md
│
└── images/             # Ilustrações e acervo visual do multiverso
    ├── maltuk1.png
    ├── maltuk2.jpg
    └── conselho_solar_01.png
```

---

## ◈ 3. O STUDIO LOCAL DE CRIAÇÃO (`studio.html`)

O autor dispõe de uma estação de trabalho completa e local em `studio.html`, projetada para ser aberta diretamente no navegador em seu ambiente de desenvolvimento.

### Funcionalidades Centrais do Studio:

1. **Gravação Direta no Disco (File System Access API)**:
   * Ao clicar em `CONECTAR PASTA`, o autor seleciona a pasta raiz `esquizofreniaestelar`.
   * Todas as edições e novos arquivos são salvos diretamente no sistema de arquivos local (`catalog.json`, `theme.json`, novos `.md` em `/texts/` e imagens em `/images/`).
   * **Compatibilidade Retroativa Total**: ao salvar, o Studio regenera automaticamente os arquivos legados `texts.json` e `media.json`.
   * **Cache de Segurança**: mesmo sem conectar a pasta, cópias de segurança são mantidas continuamente no `localStorage` do navegador.
   * **Exportação Manual**: botão para baixar arquivos avulsos ou um pacote completo em `.json`.

2. **Aba 1: Contos & Editor Markdown**:
   * Lista lateral com filtros por tipo (`Todos`, `Textos`, `Áudios`, `Vídeos`, `Rascunhos`) e status (`PUBLICADO` vs `RASCUNHO`).
   * Ações rápidas de duplicar e excluir registros.
   * Painel de metadados: título, slug automático, categoria, saga, tags, imagem de capa com upload integrado e registros conectados (`relatedIds`).
   * **Assistentes Inteligentes de Inserção**:
     * `+ LINK / MÍDIA`: insere conexão interna com outros contos do acervo, links externos ou embeds responsivos do YouTube/Spotify.
     * `+ IMAGEM`: galeria visual da pasta `/images/`, upload de novas artes, ajuste de largura (`333px`, `500px`, `100%`) e alinhamento.
     * `CONVERTER HTML`: higieniza textos formatados e HTML colados convertendo-os em Markdown limpo.
     * `DITAR NO CURSOR`: ativa a transcrição por voz inserindo palavras diretamente no ponto do cursor.
   * **Split-Pane**: editor Markdown à esquerda e prévia renderizada em tempo real à direita via Showdown.js, com métricas de palavras, caracteres e tempo estimado de leitura.

3. **Aba 2: Central de Links & Mídias**:
   * Cadastro rápido de transmissões em áudio e vídeo.
   * Detecção automática ao colar links do YouTube ou Spotify.
   * Prévia interativa instantânea do player responsivo.
   * Grade de gerenciamento de todas as transmissões cadastradas.

4. **Aba 3: Voz & Anotações do Multiverso**:
   * Motor nativo via Web Speech API (`SpeechRecognition`) configurado para Português do Brasil (`pt-BR`).
   * 100% local, ilimitado e sem chaves de API pagas.
   * **Visualizador Neural**: analisador de frequência em tempo real via Web Audio API.
   * **Comandos de Pontuação por Voz**: substitui expressões faladas como *"ponto final"*, *"vírgula"*, *"ponto de interrogação"*, *"novo parágrafo"*, *"travessão"*, etc.
   * Destinos rápidos para o texto ditado: enviar ao conto atual, arquivar como nota ou converter em um novo rascunho de conto.
   * Mural de anotações e tópicos futuros (`catalog.notes`), com botão de conversão direta em contos.

5. **Aba 4: Laboratório de Design & Tema**:
   * 4 Presets Artísticos com aplicação instantânea:
     * `Matrioshka Amber` (Ouro quente e âmbar estelar)
     * `Matrix Emerald` (Terminal cibernético dos zeladores)
     * `Cyber Nebula Cyan` (Resfriamento criogênico e radiação quântica)
     * `Crimson Singularity` (Horizonte de eventos e alerta dos Thyrexianos)
   * Seletores de cores para variáveis CSS (`bgPrimary`, `accentPrimary`, `matrixGlow`, etc.).
   * Configuração de tipografia (`fontDisplay`, `fontBody`, `fontReading`, `fontMono`, tamanho e entrelinha).
   * Sliders de dinâmica do `cosmos.js`: densidade de estrelas, filamentos da Matrix, velocidade e opacidades.
   * Atualização em tempo real na tela do Studio.

---

## ◈ 4. FLUXO DE PUBLICAÇÃO & DEPLOY

Com o Studio integrado ao repositório local, o fluxo editorial é ágil e contínuo:

1. Abra `studio.html` em seu navegador Chromium (Google Chrome, Microsoft Edge, Brave ou Opera).
2. Clique em **`CONECTAR PASTA`** e selecione a pasta do repositório local.
3. Escreva ou dite novos contos, cadastre novas transmissões ou personalize o tema.
4. Clique em **`SALVAR NO PROJETO`** (os arquivos serão gravados instantaneamente no disco).
5. Abra o terminal na pasta e execute:

```bash
git status
git add .
git commit -m "Registro: novo conto e atualizacao do acervo"
git push origin main
```

O Cloudflare Pages detectará o novo commit na ramificação `main` e publicará o portal atualizado no ar em segundos.

---

## ◈ 5. DIRETRIZES DE DESIGN

* **Zero Emojis**: todo o projeto utiliza estritamente vetores SVG inline ou glifos tipográficos (`ƎƎ`, `[ // ]`, `◈`, `∷`, `<>`).
* **Acessibilidade e Desempenho**: suporte nativo a `prefers-reduced-motion`, pausa automática das animações cósmicas durante a leitura e renderização com aceleração por hardware.
* **Preservação de Conteúdo**: compatibilidade retroativa para formatos Markdown existentes e sincronização bidirecional de catálogos.

---

*© 2026 Esquizofrenia Estelar — Os Arquivos do Multiverso.*
