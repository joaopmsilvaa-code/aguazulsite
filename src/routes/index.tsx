import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Menu, X, Check, Star, MapPin, Phone, Instagram, MessageCircle, ChevronLeft, ChevronRight, ArrowRight,
  Send,
} from "lucide-react";
import { PhotoSlot } from "@/components/PhotoSlot";
import logoAsset from "@/assets/aguazul-logo.jpg.asset.json";
import {
  waLink, PHONE_DISPLAY, MAPS_LINK, MAPS_EMBED, MAPS_DIRECTIONS, INSTAGRAM,
  HERO_PHOTO, MODELS, GALLERY, REVIEWS, LIFESTYLE, WATER_PHOTO, type PoolModel,
} from "@/lib/site";

const TITLE = "Aguazul Piscinas Santa Maria | Piscinas de fibra em Santa Maria - RS";
const DESC =
  "Piscinas de fibra em Santa Maria e região. Conheça os modelos, veja instalações reais e solicite seu orçamento com a Aguazul Piscinas.";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Aguazul Piscinas Santa Maria",
  telephone: "+55 55 99262-4000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Esquina - Rua Portugal 22, BR-287, Km 1, São João",
    addressLocality: "Santa Maria",
    addressRegion: "RS",
    postalCode: "97030-490",
    addressCountry: "BR",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "23" },
  sameAs: [INSTAGRAM],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: HERO_PHOTO.src },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: Home,
});

const NAV = [
  ["Início", "#inicio"], ["Piscinas", "#piscinas"], ["Diferenciais", "#diferenciais"],
  ["Galeria", "#galeria"], ["Depoimentos", "#depoimentos"], ["Contato", "#contato"],
] as const;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const showAll = () => els.forEach((el) => el.classList.add("in"));
    if (!("IntersectionObserver" in window)) return showAll();
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    // Garantia: se a animação não disparar (ex.: prévia do editor), mostra tudo.
    const t = window.setTimeout(showAll, 1500);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
}

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnGold = `${btn} bg-sun text-sun-foreground hover:brightness-105 hover:-translate-y-0.5`;
const btnNavy = `${btn} bg-primary text-primary-foreground hover:bg-deep-card hover:-translate-y-0.5`;
const btnGlass = `${btn} bg-deep-foreground/10 text-deep-foreground ring-1 ring-deep-foreground/15 hover:bg-deep-foreground/15`;
const btnLight = `${btn} bg-secondary text-primary hover:bg-border`;
const linkArrow = "group inline-flex items-center gap-1.5 text-sm font-medium";

function Arrow() {
  return <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />;
}

function Logo() {
  return (
    <a href="#inicio" className="block rounded-2xl bg-white px-3 py-1.5" aria-label="Aguazul Piscinas Santa Maria — início">
      <img src={logoAsset.url} alt="Aguazul Piscinas Santa Maria" className="h-12 w-auto object-contain md:h-16" />
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid ? "bg-deep/90 shadow-lift backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="text-sm font-medium text-deep-foreground/70 transition-colors hover:text-deep-foreground">{l}</a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={waLink()} target="_blank" rel="noopener" className="text-sm font-medium text-deep-foreground/80 hover:text-deep-foreground">WhatsApp</a>
          <a href="#orcamento" className={`${btnGold} py-2`}>Solicitar orçamento</a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={waLink()} target="_blank" rel="noopener" className={`${btn} bg-whatsapp px-4 py-2 text-white`}>
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </a>
          <button onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}
            className="rounded-full p-2 text-deep-foreground">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-deep-foreground/10 bg-deep px-5 pb-6 pt-2 lg:hidden" aria-label="Menu móvel">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-deep-foreground/10 py-3 font-medium text-deep-foreground">{l}</a>
          ))}
          <a href="#orcamento" onClick={() => setOpen(false)} className={`${btnGold} mt-5 w-full`}>Solicitar orçamento</a>
        </nav>
      )}
    </header>
  );
}

/** Cabeçalho de seção no estilo "título à esquerda, texto + link à direita". */
function SectionHead({ eyebrow, title, text, link, dark }: {
  eyebrow: string; title: string; text?: string; link?: { label: string; href: string; external?: boolean }; dark?: boolean;
}) {
  return (
    <div className="reveal mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
      <div>
        <p className={`text-sm font-medium ${dark ? "text-sun" : "text-pool"}`}>{eyebrow}</p>
        <h2 className={`mt-3 text-4xl md:text-6xl ${dark ? "text-deep-foreground" : "text-primary"}`}>{title}</h2>
      </div>
      {(text || link) && (
        <div className="md:justify-self-end md:max-w-md">
          {text && <p className={`text-lg ${dark ? "text-deep-foreground/70" : "text-muted-foreground"}`}>{text}</p>}
          {link && (
            <a href={link.href} {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
              className={`${linkArrow} mt-4 ${dark ? "text-deep-foreground" : "text-primary"}`}>
              {link.label}<Arrow />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function ModelModal({ model, onClose }: { model: PoolModel; onClose: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  const name = model.name ?? "Modelo";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep/80 p-4 backdrop-blur-sm animate-rise" onClick={onClose} role="dialog" aria-modal="true" aria-label={name}>
      <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[28px] bg-background shadow-lift md:grid md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-square">
          <PhotoSlot photo={model.photos[i]} />
          <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-primary md:hidden"><X className="h-5 w-5" /></button>
          {model.photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {model.photos.map((_, n) => (
                <button key={n} onClick={() => setI(n)} aria-label={`Foto ${n + 1}`} className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-sun" : "w-2 bg-white/80"}`} />
              ))}
            </div>
          )}
        </div>
        <div className="relative flex flex-col p-7 md:p-10">
          <button onClick={onClose} aria-label="Fechar" className="absolute right-5 top-5 hidden rounded-full bg-secondary p-2 text-primary md:block"><X className="h-5 w-5" /></button>
          <p className="text-sm font-medium text-pool">Piscina de fibra</p>
          <h3 className="mt-2 text-5xl text-primary">{name}</h3>
          <p className="mt-4 text-muted-foreground">{model.description}</p>
          <div className="mt-8 space-y-5 text-sm">
            <div>
              <p className="mb-2 font-medium text-primary">Medidas disponíveis</p>
              {model.sizes?.length ? model.sizes.map((s) => <p key={s}>{s}</p>) : <p className="text-muted-foreground">Consulte as medidas com a nossa equipe.</p>}
            </div>
            {!!model.features?.length && (
              <div>
                <p className="mb-2 font-medium text-primary">Características</p>
                {model.features.map((f) => <p key={f} className="flex gap-2"><Check className="h-4 w-4 text-pool" />{f}</p>)}
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <a href="#orcamento" onClick={onClose} className={btnGold}>Quero minha piscina</a>
            <a href={waLink(`Olá! Vim pelo site da Aguazul e gostaria de saber mais sobre a piscina ${name}.`)} target="_blank" rel="noopener" className={btnLight}>Falar no WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ index, onClose, setIndex }: { index: number; onClose: () => void; setIndex: (n: number) => void }) {
  const n = GALLERY.length;
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((index + 1) % n);
      if (e.key === "ArrowLeft") setIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, n, onClose, setIndex]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep/95 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label="Galeria de fotos">
      <button aria-label="Fechar" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-deep-foreground"><X /></button>
      {n > 1 && <button aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + n) % n); }} className="absolute left-3 rounded-full bg-white/10 p-3 text-deep-foreground hover:bg-white/20"><ChevronLeft /></button>}
      <div className="aspect-square max-h-[85vh] w-full max-w-[85vh] overflow-hidden rounded-[28px]" onClick={(e) => e.stopPropagation()}>
        <PhotoSlot photo={GALLERY[index]} className="object-contain" />
      </div>
      {n > 1 && <button aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % n); }} className="absolute right-3 rounded-full bg-white/10 p-3 text-deep-foreground hover:bg-white/20"><ChevronRight /></button>}
      <p className="absolute bottom-4 text-sm text-deep-foreground/70">{index + 1} / {n}</p>
    </div>
  );
}

function QuoteForm() {
  const [sent, setSent] = useState<null | string>(null);
  const field = "w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-sun focus:ring-2 focus:ring-sun/30";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Olá! Vim pelo site da Aguazul Piscinas Santa Maria e gostaria de solicitar um orçamento.\n\nNome: ${d.get("nome")}\nWhatsApp: ${d.get("whatsapp")}\nCidade: ${d.get("cidade")}\nProjeto: ${d.get("tipo")}\nMensagem: ${d.get("mensagem") || "-"}`;
    // Integração futura (e-mail/banco de dados) pode ser conectada aqui.
    setSent(waLink(msg));
  };
  if (sent)
    return (
      <div className="rounded-[28px] bg-background p-10 text-center shadow-lift animate-rise">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-pool"><Check className="h-7 w-7" /></span>
        <h3 className="mt-5 text-3xl text-primary">Pedido recebido!</h3>
        <p className="mt-2 text-muted-foreground">Para agilizar, envie seus dados direto para nossa equipe pelo WhatsApp.</p>
        <a href={sent} target="_blank" rel="noopener" className={`${btn} mt-6 bg-whatsapp text-white`}><MessageCircle className="h-4 w-4" />Enviar pelo WhatsApp</a>
        <button onClick={() => setSent(null)} className="mt-4 block w-full text-sm text-muted-foreground underline">Enviar outro pedido</button>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[28px] bg-background p-6 text-primary shadow-lift md:grid-cols-2 md:p-8">
      <label className="text-sm font-medium">Nome<input name="nome" required className={`${field} mt-1.5`} autoComplete="name" /></label>
      <label className="text-sm font-medium">WhatsApp<input name="whatsapp" required type="tel" inputMode="tel" placeholder="(55) 9...." className={`${field} mt-1.5`} /></label>
      <label className="text-sm font-medium">Cidade<input name="cidade" required className={`${field} mt-1.5`} defaultValue="Santa Maria" /></label>
      <label className="text-sm font-medium">Tipo de projeto
        <select name="tipo" required className={`${field} mt-1.5`} defaultValue="">
          <option value="" disabled>Selecione</option>
          <option>Piscina nova</option>
          <option>Reforma / troca</option>
          <option>Acessórios e equipamentos</option>
          <option>Ainda estou pesquisando</option>
        </select>
      </label>
      <label className="text-sm font-medium md:col-span-2">Mensagem<textarea name="mensagem" rows={4} className={`${field} mt-1.5 resize-none`} placeholder="Conte um pouco sobre o seu espaço" /></label>
      <button type="submit" className={`${btnGold} py-3 md:col-span-2`}><Send className="h-4 w-4" />Solicitar orçamento</button>
    </form>
  );
}

function Stars({ size = "h-4 w-4" }: { size?: string }) {
  return <div className="flex text-sun">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className={`${size} fill-current`} />)}</div>;
}

function Home() {
  useReveal();
  const [model, setModel] = useState<number | null>(null);
  const [lb, setLb] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden bg-deep pb-12 pt-36 md:pb-16">
          <div className="absolute inset-0"><PhotoSlot photo={HERO_PHOTO} className="object-[center_70%]" /></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.2_0.07_263/0.92)_0%,oklch(0.2_0.07_263/0.7)_50%,oklch(0.2_0.07_263/0.35)_100%)]" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.2_0.07_263/0.6)_0%,transparent_30%,transparent_60%,oklch(0.2_0.07_263/0.85)_100%)]" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
            <div className="max-w-4xl">
              <a href={MAPS_LINK} target="_blank" rel="noopener" className={`${linkArrow} animate-rise rounded-full bg-deep/50 px-4 py-2 text-deep-foreground/90 ring-1 ring-white/15 backdrop-blur-md hover:text-deep-foreground`}>
                <MapPin className="h-4 w-4 text-sun" aria-hidden />Santa Maria e região<Arrow />
              </a>
              <h1 className="animate-rise mt-6 text-5xl text-deep-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]" style={{ animationDelay: "60ms" }}>
                Onde os melhores momentos <span className="text-sun">acontecem.</span>
              </h1>
              <p className="animate-rise mt-6 max-w-xl text-lg text-deep-foreground/85" style={{ animationDelay: "120ms" }}>
                Piscinas de fibra para transformar seu espaço em um lugar de lazer, conforto e encontros inesquecíveis.
              </p>
              <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
                <a href="#orcamento" className={btnGold}>Solicitar orçamento</a>
                <a href="#piscinas" className={btnGlass}>Conhecer piscinas</a>
              </div>
            </div>
            <p className="animate-rise mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-6 text-sm text-deep-foreground/80 md:mt-20" style={{ animationDelay: "240ms" }}>
              {["Piscinas de fibra", "Instalação especializada", "Atendimento próximo"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-4">{i > 0 && <span className="h-1 w-1 rounded-full bg-sun" aria-hidden />}{t}</span>
              ))}
            </p>
          </div>
        </section>

        {/* TRUST */}
        <section aria-label="Diferenciais rápidos" className="border-b border-border">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4 md:divide-x md:divide-border lg:px-8">
            {["Piscinas de fibra", "Instalação especializada", "Atendimento personalizado", "Orçamento sem compromisso"].map((t) => (
              <li key={t} className="px-2 py-8 text-center font-display text-lg font-medium tracking-[-0.02em] text-primary md:py-10">{t}</li>
            ))}
          </ul>
        </section>

        {/* TRANSFORME */}
        <section className="mx-auto max-w-7xl px-5 pt-24 md:pt-32 lg:px-8">
          <div className="reveal mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-pool">Transforme seu espaço</p>
            <h2 className="mt-3 text-4xl text-primary md:text-6xl">Mais que uma piscina. Um novo jeito de aproveitar sua casa.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Uma piscina muda a rotina da casa: o quintal vira ponto de encontro, os fins de semana ganham sol e água, e a família e os amigos têm mais motivos para ficar juntos.</p>
          </div>
          <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3">
            {LIFESTYLE.map((p, i) => (
              <div key={p.src} className={`reveal overflow-hidden rounded-[28px] ${i === 1 ? "aspect-[4/5] md:-mt-8 md:shadow-glow" : "aspect-[4/5] md:mt-8"}`}>
                <PhotoSlot photo={p} className="transition duration-700 hover:scale-[1.03]" />
              </div>
            ))}
          </div>
        </section>

        {/* MODELOS */}
        <section id="piscinas" className="mx-auto max-w-7xl px-5 py-24 md:py-32 lg:px-8">
          <SectionHead eyebrow="Modelos" title="Encontre a piscina ideal para o seu espaço"
            text="Diferentes formatos e tamanhos para cada tipo de quintal." link={{ label: "Pedir orçamento", href: "#orcamento" }} />
          <div className="grid gap-6 md:grid-cols-2">
            {MODELS.map((m, i) => (
              <article key={m.id} className="reveal group overflow-hidden rounded-[28px] bg-card ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <button onClick={() => setModel(i)} className="block w-full text-left" aria-label={`Ver detalhes da piscina ${m.name}`}>
                  <div className="aspect-square overflow-hidden"><PhotoSlot photo={m.photos[0]} className="transition duration-700 group-hover:scale-[1.03]" /></div>
                  <div className="flex items-end justify-between gap-6 p-6 md:p-8">
                    <div>
                      <h3 className="text-3xl text-primary md:text-4xl">{m.name}</h3>
                      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{m.description}</p>
                    </div>
                    <span className={`${linkArrow} shrink-0 text-primary`}>Quero conhecer<Arrow /></span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section id="diferenciais" className="bg-deep py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 lg:px-8">
            <div className="reveal md:col-span-5 md:self-start md:sticky md:top-28">
              <p className="text-sm font-medium text-sun">Diferenciais</p>
              <h2 className="mt-3 text-4xl text-deep-foreground md:text-6xl">Por que escolher a Aguazul Piscinas?</h2>
              <p className="mt-6 max-w-md text-lg text-deep-foreground/70">Do primeiro contato à instalação, você conta com uma equipe que acompanha cada etapa.</p>
              <div className="mt-10 hidden aspect-[4/3] overflow-hidden rounded-[28px] md:block">
                <PhotoSlot photo={MODELS[1].photos[0]} />
              </div>
            </div>
            <ol className="md:col-span-7">
              {[
                ["Qualidade", "Piscinas pensadas para unir beleza, resistência e praticidade."],
                ["Atendimento", "Atendimento próximo para ajudar você a escolher a solução ideal."],
                ["Instalação", "Equipe preparada para acompanhar o projeto desde a escolha até a instalação."],
                ["Experiência", "Experiência no segmento de piscinas e atendimento em Santa Maria e região."],
              ].map(([t, d], i) => (
                <li key={t} className="reveal grid grid-cols-[3rem_1fr] gap-4 border-t border-white/15 py-10 last:border-b md:grid-cols-[5rem_1fr] md:py-12">
                  <span className="pt-2 font-display text-sm font-medium text-sun">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-3xl text-deep-foreground md:text-5xl">{t}</h3>
                    <p className="mt-4 max-w-md text-deep-foreground/65">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="mx-auto max-w-7xl px-5 py-24 md:py-32 lg:px-8">
          <SectionHead eyebrow="Galeria" title="Piscinas que já transformaram espaços"
            text="Veja algumas instalações realizadas pela Aguazul."
            link={{ label: "@aguazulpiscinas_santa_maria", href: INSTAGRAM, external: true }} />
          <div className="grid gap-4 md:grid-cols-3">
            {GALLERY.map((p, i) => (
              <button key={i} onClick={() => setLb(i)} aria-label={`Ampliar: ${p.alt}`} className="reveal group aspect-square overflow-hidden rounded-[28px]">
                <PhotoSlot photo={p} className="transition duration-700 group-hover:scale-[1.03]" />
              </button>
            ))}
            <a href={INSTAGRAM} target="_blank" rel="noopener" className="reveal group flex aspect-square flex-col justify-between rounded-[28px] bg-deep p-8 text-deep-foreground shadow-glow">
              <Instagram className="h-8 w-8 text-sun" aria-hidden />
              <div>
                <p className="font-display text-3xl font-medium tracking-[-0.04em]">Mais projetos no Instagram</p>
                <span className={`${linkArrow} mt-4 text-deep-foreground/80`}>@aguazulpiscinas_santa_maria<Arrow /></span>
              </div>
            </a>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos" className="bg-secondary py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHead eyebrow="Avaliações no Google" title="Quem já tem, recomenda."
              link={{ label: "Ver todas as avaliações", href: MAPS_LINK, external: true }} />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="reveal flex flex-col justify-between rounded-3xl bg-deep p-8 text-deep-foreground md:row-span-2">
                <Stars size="h-5 w-5" />
                <div className="mt-10">
                  <p className="font-display text-8xl font-medium tracking-[-0.05em]">4,7</p>
                  <p className="mt-2 text-deep-foreground/70">de 5 estrelas · 23 avaliações no Google</p>
                </div>
              </div>
              {REVIEWS.map((r, i) => (
                <figure key={i} className={`reveal rounded-3xl bg-background p-8 ring-1 ring-border ${i === 0 ? "md:col-span-2" : ""}`}>
                  <Stars />
                  <blockquote className="mt-5 font-display text-2xl font-medium leading-snug tracking-[-0.03em] text-primary">“{r.text}”</blockquote>
                  <figcaption className="mt-5 text-sm text-muted-foreground">{r.author ?? "Cliente Aguazul"} · via Google</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section className="mx-auto max-w-7xl px-5 py-24 md:py-32 lg:px-8">
          <div className="reveal grid items-center gap-10 overflow-hidden rounded-[28px] bg-card p-8 ring-1 ring-border md:grid-cols-2 md:p-14">
            <div>
              <p className="text-sm font-medium text-pool">Sobre nós</p>
              <h2 className="mt-3 text-4xl text-primary md:text-5xl">Conheça a Aguazul Piscinas Santa Maria</h2>
              <p className="mt-6 text-lg text-muted-foreground">A Aguazul trabalha com piscinas de fibra e atende Santa Maria e região. Do primeiro contato à instalação, nossa equipe ajuda você a escolher a piscina certa para o seu espaço e a sua família.</p>
              <p className="mt-4 text-muted-foreground">Venha conversar com a gente na loja ou chame no WhatsApp — será um prazer atender você.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#orcamento" className={btnNavy}>Quero minha piscina</a>
                <a href={INSTAGRAM} target="_blank" rel="noopener" className={btnLight}><Instagram className="h-4 w-4" />Instagram</a>
              </div>
            </div>
            <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-3xl bg-deep p-10 shadow-glow">
              <div className="absolute inset-0"><PhotoSlot photo={WATER_PHOTO} /></div>
              <div className="absolute inset-0 bg-deep/35" aria-hidden />
              <div className="relative rounded-2xl bg-white p-6 shadow-lift">
                <img src={logoAsset.url} alt="Logo Aguazul Piscinas Santa Maria" className="h-auto w-full max-w-xs" />
              </div>
            </div>
          </div>
        </section>

        {/* ORÇAMENTO */}
        <section id="orcamento" className="relative overflow-hidden bg-deep py-24 md:py-32">
          <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[700px] rounded-full bg-[radial-gradient(closest-side,oklch(0.78_0.12_82/0.18),transparent)]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 lg:px-8">
            <div className="reveal md:col-span-5">
              <p className="text-sm font-medium text-sun">Orçamento sem compromisso</p>
              <h2 className="mt-3 text-4xl text-deep-foreground md:text-6xl">Vamos transformar seu espaço?</h2>
              <p className="mt-5 text-lg text-deep-foreground/70">Preencha seus dados e nossa equipe entra em contato para ajudar a escolher a piscina ideal.</p>
              <a href={waLink()} target="_blank" rel="noopener" className={`${btnGlass} mt-8`}><MessageCircle className="h-4 w-4" />Prefiro falar no WhatsApp</a>
            </div>
            <div className="reveal md:col-span-7"><QuoteForm /></div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section id="contato" className="mx-auto max-w-7xl px-5 py-24 md:py-32 lg:px-8">
          <SectionHead eyebrow="Localização" title="Venha conhecer a Aguazul"
            link={{ label: "Traçar rota", href: MAPS_DIRECTIONS, external: true }} />
          <div className="grid gap-4 md:grid-cols-12">
            <div className="reveal flex flex-col gap-6 rounded-[28px] bg-card p-8 ring-1 ring-border md:col-span-4">
              <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-pool" />
                <address className="not-italic leading-relaxed text-primary">Esquina - Rua Portugal 22, BR-287, Km 1<br />São João<br />Santa Maria - RS<br />97030-490</address>
              </div>
              <div className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-pool" />
                <a href={waLink()} target="_blank" rel="noopener" className="font-semibold text-primary hover:underline">{PHONE_DISPLAY}</a>
              </div>
              <div className="flex gap-4"><Instagram className="mt-1 h-5 w-5 shrink-0 text-pool" />
                <a href={INSTAGRAM} target="_blank" rel="noopener" className="text-primary hover:underline">@aguazulpiscinas_santa_maria</a>
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener" className={btnNavy}>Traçar rota</a>
                <a href={MAPS_LINK} target="_blank" rel="noopener" className={btnLight}>Abrir no Google Maps</a>
              </div>
            </div>
            <div className="reveal aspect-[16/10] overflow-hidden rounded-[28px] ring-1 ring-border md:col-span-8">
              <iframe title="Mapa da Aguazul Piscinas Santa Maria" src={MAPS_EMBED} className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 lg:px-8">
          <div>
            <div className="inline-block"><Logo /></div>
            <p className="mt-4 text-sm text-deep-foreground/65">Piscinas de fibra em Santa Maria e região.</p>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Rodapé">
            {NAV.map(([l, h]) => <a key={h} href={h} className="text-deep-foreground/70 hover:text-deep-foreground">{l}</a>)}
          </nav>
          <div className="space-y-2 text-sm text-deep-foreground/70">
            <p>{PHONE_DISPLAY}</p>
            <p>Rua Portugal 22, BR-287, Km 1 — Santa Maria/RS</p>
            <a href={INSTAGRAM} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-deep-foreground"><Instagram className="h-4 w-4" />Instagram</a>
          </div>
        </div>
        <p className="border-t border-deep-foreground/10 py-5 text-center text-xs text-deep-foreground/50">© {new Date().getFullYear()} Aguazul Piscinas Santa Maria</p>
      </footer>

      <a href={waLink()} target="_blank" rel="noopener" aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition hover:scale-105 md:h-12 md:w-12">
        <MessageCircle className="h-6 w-6" />
      </a>

      {model !== null && MODELS[model] && <ModelModal model={MODELS[model]} onClose={() => setModel(null)} />}
      {lb !== null && <Lightbox index={lb} setIndex={setLb} onClose={() => setLb(null)} />}
    </div>
  );
}
