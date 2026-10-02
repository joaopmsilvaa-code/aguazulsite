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

export const MODELS: PoolModel[] = [1, 2, 3].map((n) => ({
  id: `modelo-${n}`,
  photos: [{ alt: `Foto do modelo ${n}` }, { alt: `Foto do modelo ${n} — detalhe` }],
}));

export const GALLERY: Photo[] = Array.from({ length: 8 }, (_, i) => ({
  alt: `Piscina de fibra instalada pela Aguazul — projeto ${i + 1}`,
}));

/** Avaliações reais do Google (trechos fornecidos). Adicione nomes quando disponíveis. */
export const REVIEWS: { text: string; author?: string }[] = [
  { text: "Ótimo atendimento desde a pré venda até o pós venda..." },
  { text: "Empresa séria, entrega o que promete..." },
  { text: "Excelente estamos satisfeitos com o serviço..." },
];
