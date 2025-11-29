'use client';

import React, { useRef, useState, useEffect } from "react";
import NavigationMenuDemo from "@/components/NavigationMenuDemo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Footer } from "@/components/Footer";

function ResumeContent() {
    const resumeRef = useRef<HTMLDivElement | null>(null);
    const [lang, setLang] = useState<"pt" | "en">("pt");

    useEffect(() => {
        const handleLanguageChange = () => {
            const saved = localStorage.getItem('selectedLanguage') as 'pt' | 'en' | null;
            if (saved) {
                setLang(saved);
            }
        };

        window.addEventListener('storage', handleLanguageChange);
        handleLanguageChange();

        return () => window.removeEventListener('storage', handleLanguageChange);
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center p-4 md:p-6" style={{ background: "#170329" }} suppressHydrationWarning> 
            <LanguageToggle />
            
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
                <div className="fixed top-6 md:top-10 lg:top-16 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-slate-900/90 px-6 py-2 rounded-md shadow-lg ring-1 ring-white/10">
                        <NavigationMenuDemo />
                    </div>
                </div>

                <header className="w-full mt-20 md:mt-28 mb-4 md:mb-6 flex flex-col items-center">
                    <a
                        href="/Harison-CV.pdf"
                        download
                        className="text-white font-poppins hover:text-purple-400 transition text-sm md:text-base"
                        aria-label="Baixar currículo"
                    >
                        {lang === "pt" ? "📥 Baixar CV" : "📥 Download CV"}
                    </a>
                </header>

                <div
                    ref={resumeRef}
                    className="relative bg-white text-gray-900 shadow-2xl p-6 md:p-8 lg:p-10 rounded-xl max-w-4xl w-full mx-auto transform transition duration-300 hover:scale-101"
                >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-6 mb-6">
                        <div className="min-w-0">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-poppins">Harison Rios</h1>
                            <h2 className="text-base md:text-lg font-semibold text-gray-700 font-poppins">
                                {lang === "pt" ? "Engenheiro de Dados & Desenvolvedor Web" : "Data Engineer & Web Developer"}
                            </h2>
                            <p className="text-xs md:text-sm text-gray-600 font-poppins">{lang === "pt" ? "20 Anos – 27/10/2005" : "20 years – 10/27/2005"}</p>
                        </div>

                        <div className="text-xs md:text-sm font-poppins shrink-0">
                            <p>São Paulo, SP | (11) 96402-4658</p>
                            <p>
                                <a className="text-blue-600 break-all" href="mailto:hharison562@gmail.com">
                                    hharison562@gmail.com
                                </a>
                            </p>
                            <p>
                                GitHub: {" "}
                                <a className="text-blue-600 break-all" href="https://github.com/HarisonRios" target="_blank" rel="noreferrer">
                                    HarisonRios
                                </a>
                            </p>
                            <p>
                                LinkedIn: {" "}
                                <a className="text-blue-600 break-all" href="https://linkedin.com/in/harisonrios" target="_blank" rel="noreferrer">
                                    harisonrios
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 my-6" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 font-poppins">
                        <section>
                            <h3 className="text-lg md:text-xl font-bold mb-3">{lang === "pt" ? "Perfil" : "Profile"}</h3>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                {lang === "pt"
                                    ? "Sou estudante de Análise e Desenvolvimento de Sistemas na SPTech e busco uma oportunidade de estágio para aprimorar minhas habilidades na prática. Já atuei como Engenheiro de Banco de Dados em projetos de dados e infraestrutura, o que me deu uma boa base. Estou disposto a aprender cada vez mais e crescer junto com a equipe."
                                    : "I am a Systems Analysis and Development student at SPTech seeking an internship to improve my practical skills. I have worked as a Database Engineer on data and infrastructure projects, which gave me a solid foundation. I am eager to learn more and grow with the team."}
                            </p>

                            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">{lang === "pt" ? "Conhecimentos Técnicos" : "Technical Skills"}</h3>

                            <p className="font-semibold text-sm md:text-base">{lang === "pt" ? "Frameworks & Bibliotecas" : "Frameworks & Libraries"}</p>
                            <p className="text-sm md:text-base text-gray-700 mb-2">{lang === "pt" ? "React, Node.js, Angular e Spring Boot" : "React, Node.js, Angular and Spring Boot"}</p>

                            <p className="font-semibold text-sm md:text-base">{lang === "pt" ? "DevOps & Infraestrutura" : "DevOps & Infrastructure"}</p>
                            <p className="text-sm md:text-base text-gray-700 mb-2">{lang === "pt" ? "Docker, AWS (EC2, S3), Linux e REST APIs" : "Docker, AWS (EC2, S3), Linux and REST APIs"}</p>

                            <p className="font-semibold text-sm md:text-base">Banco de Dados</p>
                            <p className="text-sm md:text-base text-gray-700 mb-2">{lang === "pt" ? "MongoDB, MySQL, DuckDB" : "MongoDB, MySQL, DuckDB"}</p>

                            <p className="font-semibold text-sm md:text-base">{lang === "pt" ? "Versionamento & Agile" : "Version Control & Agile"}</p>
                            <p className="text-sm md:text-base text-gray-700">{lang === "pt" ? "Git, GitHub, Azure DevOps, Trello, SCRUM" : "Git, GitHub, Azure DevOps, Trello, SCRUM"}</p>
                        </section>

                        <section>
                            <h3 className="text-lg md:text-xl font-bold mb-3">{lang === "pt" ? "Experiência" : "Experience"}</h3>

                            <h4 className="font-semibold text-sm md:text-base">
                                {lang === "pt" ? "Estagiário em Engenharia de Dados — F3 Capital / Quando Previdência" : "Data Engineering Intern — F3 Capital / Quando Previdência"}
                                <span className="block text-xs md:text-sm text-gray-600">{lang === "pt" ? "Fev/2025 – Nov/2025" : "Feb/2025 – Nov/2025"}</span>
                            </h4>

                            <ul className="list-disc ml-6 text-sm md:text-base text-gray-700 mt-2 space-y-1">
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

                            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">{lang === "pt" ? "Formação Acadêmica" : "Education"}</h3>

                            <p className="font-semibold text-sm md:text-base">São Paulo Tech School – SPTech</p>
                            <p className="text-sm md:text-base text-gray-700 mb-2">{lang === "pt" ? "Análise e Desenvolvimento de Sistemas | 2024 – 2026" : "Systems Analysis and Development | 2024 – 2026"}</p>

                            <p className="font-semibold text-sm md:text-base">Escola Técnica Estadual – ETEC</p>
                            <p className="text-sm md:text-base text-gray-700 mb-2">{lang === "pt" ? "Técnico em Desenvolvimento de Sistemas | 2022–2023" : "Technical Degree in Systems Development | 2022–2023"}</p>

                            <p className="font-semibold text-sm md:text-base">Ensino Médio</p>
                            <p className="text-sm md:text-base text-gray-700">{lang === "pt" ? "E.E Jardim Iguatemi / E.E Cláudia Dutra Viana | 2021–2023" : "E.E Jardim Iguatemi / E.E Cláudia Dutra Viana | 2021–2023"}</p>
                        </section>
                    </div>

                    <div className="border-t border-gray-200 my-6" />

                    <section className="font-poppins">
                        <h3 className="text-lg md:text-xl font-bold mb-3">{lang === "pt" ? "Projetos Acadêmicos" : "Academic Projects"}</h3>

                        <ul className="list-disc ml-6 space-y-2 text-sm md:text-base text-gray-700">
                            <li>
                                {lang === "pt" ? "Sistema para monitoramento de plantações de café: sensores de temperatura/umidade com dashboard em tempo real." : "System for monitoring coffee plantations: temperature/humidity sensors with a real-time dashboard."} {" "}
                                <a className="text-blue-500 break-all" href="#">(Projeto)</a>
                            </li>

                            <li>
                                {lang === "pt" ? "Sistema para análise de dados educacionais (ENEM e MEC) usando Java, Apache POI, EC2 e S3." : "System for educational data analysis (ENEM and MEC) using Java, Apache POI, EC2 and S3."} {" "}
                                <a className="text-blue-500 break-all" href="#">(Projeto)</a>
                            </li>

                            <li>
                                {lang === "pt" ? "Sistema de Agendamento One Pilates: plataforma de agendamentos para secretarias/professores de estúdios de Pilates usando React, Spring Boot e MySQL." : "One Pilates Scheduling System: booking platform for studios using React, Spring Boot and MySQL."} {" "}
                                <a className="text-blue-500 break-all" href="#">(Projeto)</a>
                            </li>
                        </ul>
                    </section>
                </div>

                
                

            </div>

            <Footer />
        </main>
    );
}export default ResumeContent;
