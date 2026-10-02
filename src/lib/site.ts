export const WHATSAPP_NUMBER = "5555992624000";
export const WHATSAPP_MSG =
  "Olá! Vim pelo site da Aguazul Piscinas Santa Maria e gostaria de solicitar um orçamento.";
export const waLink = (msg = WHATSAPP_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
export const PHONE_DISPLAY = "(55) 99262-4000";
export const MAPS_LINK = "https://share.google/hIyg0JRTmRMoRalFV";
export const ADDRESS_QUERY =
  "Aguazul Piscinas, Rua Portugal 22, BR-287 Km 1, São João, Santa Maria - RS, 97030-490";
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`;
export const INSTAGRAM = "https://www.instagram.com/aguazulpiscinas_santa_maria/";

/** Fotos reais: preencha `src` quando as imagens forem enviadas. */
export type Photo = { src?: string; alt: string };

/** Modelos: estrutura pronta para cadastro (nomes não fornecidos ainda). */
export type PoolModel = {
  id: string;
  name?: string;
  description?: string;
  sizes?: string[];
  features?: string[];
  photos: Photo[];
};

export const HERO_PHOTO: Photo = {
  src: "/images/piscina-destaque.png",
  alt: "Piscina azul cercada de coqueiros em dia de sol",
};

const HAWAI: Photo = { src: "/images/piscina-hawai.jpg", alt: "Piscina de fibra Aguazul modelo Hawaí instalada em área coberta" };
const FLORENZA: Photo = { src: "/images/piscina-florenza.jpg", alt: "Piscina de fibra Aguazul modelo Florenza instalada em quintal com gramado" };

export const MODELS: PoolModel[] = [
  {
    id: "hawai",
    name: "Hawaí",
    description: "Formato de linhas arredondadas em fibra azul. Combina com áreas cobertas e espaços mais compactos.",
    photos: [HAWAI],
  },
  {
    id: "florenza",
    name: "Florenza",
    description: "Formato clássico de cantos suaves, com degraus internos. Ideal para quintais com gramado e área de lazer.",
    photos: [FLORENZA],
  },
];

export const GALLERY: Photo[] = [HAWAI, FLORENZA];

/** Avaliações reais do Google (trechos fornecidos). Adicione nomes quando disponíveis. */
export const REVIEWS: { text: string; author?: string }[] = [
  { text: "Ótimo atendimento desde a pré venda até o pós venda..." },
  { text: "Empresa séria, entrega o que promete..." },
  { text: "Excelente estamos satisfeitos com o serviço..." },
];
