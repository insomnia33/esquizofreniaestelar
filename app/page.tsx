"use client"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

export default function Home() {
  const [activeTab, setActiveTab] = useState("intro")
  const [content, setContent] = useState("")
  const [textsList, setTextsList] = useState([])

  useEffect(() => {
    // Carregar o conteúdo inicial (introdução)
    if (activeTab === "intro") {
      fetch("/data/intro.md")
        .then((response) => response.text())
        .then((data) => setContent(data))
        .catch((error) => console.error("Erro ao carregar introdução:", error))
    }

    // Carregar lista de textos
    if (activeTab === "textos") {
      fetch("/data/textos/index.json")
        .then((response) => response.json())
        .then((data) => {
          setTextsList(data)
          // Se não houver conteúdo específico carregado, exibir a lista
          if (!content || activeTab !== "textos") {
            setContent("# Textos\n\nSelecione um texto para ler.")
          }
        })
        .catch((error) => console.error("Erro ao carregar lista de textos:", error))
    }
  }, [activeTab])

  const loadText = (path) => {
    fetch(path)
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error("Erro ao carregar texto:", error))
  }

  return (
    <div className="container">
      <header>
        <div className="logo">ƎƎ</div>
        <h1 className="title">Esquizofrenia Estelar</h1>
        <h2 className="subtitle">Os Arquivos do Multiverso</h2>
        <nav className="main-nav">
          <div className="nav-sections">
            <button
              className={`nav-link ${activeTab === "textos" ? "active" : ""}`}
              onClick={() => setActiveTab("textos")}
            >
              Textos
            </button>
            <button
              className={`nav-link ${activeTab === "audios" ? "active" : ""}`}
              onClick={() => setActiveTab("audios")}
            >
              Áudios
            </button>
            <button
              className={`nav-link ${activeTab === "videos" ? "active" : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              Vídeos
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="content-display">
          {activeTab === "textos" && textsList.length > 0 && (
            <div className="text-list">
              <ul>
                {textsList.map((item, index) => (
                  <li key={index}>
                    <button className="text-item" onClick={() => loadText(item.path)}>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {(activeTab === "audios" || activeTab === "videos") && (
            <div className="development-notice">
              <p>Esta seção está em desenvolvimento.</p>
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Esquizofrenia Estelar - Os Arquivos do Multiverso</p>
      </footer>
    </div>
  )
}

