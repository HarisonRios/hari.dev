"use client"

import React, { useRef, useState } from "react";
import NavigationMenuDemo from "@/components/NavigationMenuDemo";

export default function Resume() {
    const resumeRef = useRef<HTMLDivElement | null>(null);
    const [lang, setLang] = useState("pt");

    function copyResume() {
        const text = resumeRef.current?.innerText || "";
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            alert(lang === "pt" ? "Currículo copiado!" : "Resume copied!");
        } else {
            const el = document.createElement("textarea");
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            alert(lang === "pt" ? "Currículo copiado!" : "Resume copied!");
        }
    }

    function toggleLang() {
        setLang((l) => (l === "pt" ? "en" : "pt"));
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6" style={{ background: "#170329" }}> 
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
                <div className="fixed top-10 md:top-10 lg:top-16 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-white/12 backdrop-blur-md px-6 py-2 rounded-lg shadow-lg ring-1 ring-white/10">
                        <NavigationMenuDemo />
                    </div>
                </div>

                <header className="w-full mt-28 mb-4 flex flex-col items-center gap-3">
                    <div className="w-full flex items-center justify-center gap-3">
                        <a
                            href="/Harison-CV.pdf"
                            download
                            className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg text-lg font-poppins hover:bg-gray-100 transition"
                            aria-label="Baixar currículo"
                        >
                            {lang === "pt" ? "Baixar CV" : "Download CV"}
                        </a>

                        <button
                            type="button"
                            onClick={toggleLang}
                            className="px-3 py-2 bg-white/8 text-white border border-white/10 rounded-lg font-poppins hover:bg-white/20 transition-colors duration-150 flex items-center gap-2"
                            aria-label={lang === "pt" ? "Mudar para English (US)" : "Mudar para Português (BR)"}
                        >
                            <span className="text-xl leading-none">{lang === "pt" ? "🇺🇸" : "🇧🇷"}</span>
                            <span className="sr-only">{lang === "pt" ? "English (US)" : "Português (BR)"}</span>
                        </button>
                    </div>
                </header>

                <div
                    ref={resumeRef}
                    className="relative bg-white text-gray-900 shadow-2xl p-10 rounded-xl max-w-4xl w-full mx-auto transform transition duration-300 hover:scale-101"
                >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
                        <div>
                            <h1 className="text-4xl font-bold font-poppins">Harison Rios</h1>
                            <h2 className="text-lg font-semibold text-gray-700 font-poppins">
                                {lang === "pt" ? "Engenheiro de Dados & Desenvolvedor Web" : "Data Engineer & Web Developer"}
                            </h2>
                            <p className="text-sm text-gray-600 font-poppins">{lang === "pt" ? "20 Anos – 27/10/2005" : "20 years – 10/27/2005"}</p>
                        </div>

                        <div className="text-sm font-poppins">
                            <p>São Paulo, SP | (11) 96402-4658</p>
                            <p>
                                <a className="text-blue-600" href="mailto:hharison562@gmail.com">
                                    hharison562@gmail.com
                                </a>
                            </p>
                            <p>
                                GitHub: {" "}
                                <a className="text-blue-600" href="https://github.com/HarisonRios" target="_blank" rel="noreferrer">
                                    HarisonRios
                                </a>
                            </p>
                            <p>
                                LinkedIn: {" "}
                                <a className="text-blue-600" href="https://linkedin.com/in/harisonrios" target="_blank" rel="noreferrer">
                                    harisonrios
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 my-6" />

                    <div className="grid md:grid-cols-2 gap-10 font-poppins">
                        <section>
                            <h3 className="text-xl font-bold mb-3">{lang === "pt" ? "Perfil" : "Profile"}</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {lang === "pt"
                                    ? "Sou estudante de Análise e Desenvolvimento de Sistemas na SPTech e busco uma oportunidade de estágio para aprimorar minhas habilidades na prática. Já atuei como Engenheiro de Banco de Dados em projetos de dados e infraestrutura, o que me deu uma boa base. Estou disposto a aprender cada vez mais e crescer junto com a equipe."
                                    : "I am a Systems Analysis and Development student at SPTech seeking an internship to improve my practical skills. I have worked as a Database Engineer on data and infrastructure projects, which gave me a solid foundation. I am eager to learn more and grow with the team."}
                            </p>

                            <h3 className="text-xl font-bold mt-6 mb-3">{lang === "pt" ? "Conhecimentos Técnicos" : "Technical Skills"}</h3>

                            <p className="font-semibold">{lang === "pt" ? "Frameworks & Bibliotecas" : "Frameworks & Libraries"}</p>
                            <p className="text-gray-700 mb-2">{lang === "pt" ? "React, Node.js, Angular e Spring Boot" : "React, Node.js, Angular and Spring Boot"}</p>

                            <p className="font-semibold">{lang === "pt" ? "DevOps & Infraestrutura" : "DevOps & Infrastructure"}</p>
                            <p className="text-gray-700 mb-2">{lang === "pt" ? "Docker, AWS (EC2, S3), Linux e REST APIs" : "Docker, AWS (EC2, S3), Linux and REST APIs"}</p>

                            <p className="font-semibold">Banco de Dados</p>
                            <p className="text-gray-700 mb-2">{lang === "pt" ? "MongoDB, MySQL, DuckDB" : "MongoDB, MySQL, DuckDB"}</p>

                            <p className="font-semibold">{lang === "pt" ? "Versionamento & Agile" : "Version Control & Agile"}</p>
                            <p className="text-gray-700">{lang === "pt" ? "Git, GitHub, Azure DevOps, Trello, SCRUM" : "Git, GitHub, Azure DevOps, Trello, SCRUM"}</p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold mb-3">{lang === "pt" ? "Experiência" : "Experience"}</h3>

                            <h4 className="font-semibold">
                                {lang === "pt" ? "Estagiário em Engenharia de Dados — F3 Capital / Quando Previdência" : "Data Engineering Intern — F3 Capital / Quando Previdência"}
                                <span className="block text-sm text-gray-600">{lang === "pt" ? "Fev/2025 – Nov/2025" : "Feb/2025 – Nov/2025"}</span>
                            </h4>

                            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
                                <li>
                                    {lang === "pt"
                                        ? "Reformular pré-processador de dados em Python/Pandas, reduzindo 40% do tempo de geração dos JSON."
                                        : "Refactored data preprocessor in Python/Pandas, reducing JSON generation time by 40%."}
                                </li>
                                <li>{lang === "pt" ? "Implementação de nova tabela no pipeline para melhorar organização e consumo de dados." : "Implemented new pipeline table to improve data organization and consumption."}</li>
                                <li>{lang === "pt" ? "Uso de DuckDB e SQL para consultas em lote e análises de alto volume." : "Used DuckDB and SQL for batch queries and high-volume analysis."}</li>
                                <li>{lang === "pt" ? "Criação de processo de carga incremental garantindo agilidade e confiabilidade." : "Created incremental load process ensuring agility and reliability."}</li>
                                <li>{lang === "pt" ? "Atuação com relatórios em TypeScript, MongoDB e Metabase." : "Worked with reports in TypeScript, MongoDB and Metabase."}</li>
                            </ul>

                            <h3 className="text-xl font-bold mt-6 mb-3">{lang === "pt" ? "Formação Acadêmica" : "Education"}</h3>

                            <p className="font-semibold">São Paulo Tech School – SPTech</p>
                            <p className="text-gray-700 mb-2">{lang === "pt" ? "Análise e Desenvolvimento de Sistemas | 2024 – 2026" : "Systems Analysis and Development | 2024 – 2026"}</p>

                            <p className="font-semibold">Escola Técnica Estadual – ETEC</p>
                            <p className="text-gray-700 mb-2">{lang === "pt" ? "Técnico em Desenvolvimento de Sistemas | 2022–2023" : "Technical Degree in Systems Development | 2022–2023"}</p>

                            <p className="font-semibold">Ensino Médio</p>
                            <p className="text-gray-700">{lang === "pt" ? "E.E Jardim Iguatemi / E.E Cláudia Dutra Viana | 2021–2023" : "E.E Jardim Iguatemi / E.E Cláudia Dutra Viana | 2021–2023"}</p>
                        </section>
                    </div>

                    <div className="border-t border-gray-200 my-6" />

                    <section className="font-poppins">
                        <h3 className="text-xl font-bold mb-3">{lang === "pt" ? "Projetos Acadêmicos" : "Academic Projects"}</h3>

                        <ul className="list-disc ml-6 space-y-2 text-gray-700">
                            <li>
                                {lang === "pt" ? "Sistema para monitoramento de plantações de café: sensores de temperatura/umidade com dashboard em tempo real." : "System for monitoring coffee plantations: temperature/humidity sensors with a real-time dashboard."} {" "}
                                <a className="text-blue-500" href="#">(Projeto)</a>
                            </li>

                            <li>
                                {lang === "pt" ? "Sistema para análise de dados educacionais (ENEM e MEC) usando Java, Apache POI, EC2 e S3." : "System for educational data analysis (ENEM and MEC) using Java, Apache POI, EC2 and S3."} {" "}
                                <a className="text-blue-500" href="#">(Projeto)</a>
                            </li>

                            <li>
                                {lang === "pt" ? "Sistema de Agendamento One Pilates: plataforma de agendamentos para secretarias/professores de estúdios de Pilates usando React, Spring Boot e MySQL." : "One Pilates Scheduling System: booking platform for studios using React, Spring Boot and MySQL."} {" "}
                                <a className="text-blue-500" href="#">(Projeto)</a>
                            </li>
                        </ul>
                    </section>
                </div>

                
            </div>
        </main>
    );
}
