/**
 * Fonte única dos projetos do portfólio.
 * Edita este ficheiro para adicionar/alterar projetos, links, imagens e visibilidade dos botões.
 */

export type ProjectSlide = {
  type: "image";
  /** Caminho em /public (ex: "/images/projeto.png") ou URL externa */
  src: string;
  alt?: string;
};

export type Project = {
  /** Identificador único (sem espaços) */
  id: string;
  title: { en: string; pt: string };
  description: { en: string; pt: string };
  /** Lista de tecnologias (badges) */
  tech: string[];
  /** Link do botão "Ver Projeto" */
  url: string;
  /** Link do repositório — usado quando showCode é true */
  codeUrl: string;
  /** Se true, mostra o botão "Ver Código" */
  showCode: boolean;
  /** Imagens do carrossel; array vazio = placeholder */
  slides: ProjectSlide[];
};

export const projects: Project[] = [
  {
    id: "tableia",
    title: {
      en: "Tableia.co",
      pt: "Tableia.co",
    },
    description: {
      en: "A restaurant management CRM for reservations, tables and staff, with real-time state updates.",
      pt: "Uma CRM de gestão para restaurantes, facilitando a gestão de reservas, mesas e funcionários, tudo isto com mudanças de estados em tempo real",
    },
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    url: "https://tableia.co",
    codeUrl: "",
    showCode: false,
    slides: [
      {
        type: "image",
        src: "https://github.com/user-attachments/assets/f342dfa9-33cd-4141-a299-1da6320f25a9",
        alt: "Tableia.co",
      },
    ],
  },
  {
    id: "riobranco",
    title: {
      en: "RioBranco Website",
      pt: "Website da RioBranco",
    },
    description: {
      en: "A fully reactive website custom-made for RioBranco Group",
      pt: "Um website totalmente reativo feito especialmente para a RioBranco Group",
    },
    tech: ["Next.js", "TypeScript"],
    url: "https://riobrancogroup.vercel.app",
    codeUrl: "",
    showCode: false,
    slides: [
      {
        type: "image",
        src: "/riobranco.png",
        alt: "RioBranco Group",
      },
    ],
  },
];
