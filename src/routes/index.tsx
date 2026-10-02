import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Menu, X, Check, Star, MapPin, Phone, Instagram, MessageCircle, ChevronLeft, ChevronRight,
  Gem, HeartHandshake, Wrench, Award, Droplets, ShieldCheck, Sun, Send,
} from "lucide-react";
import { PhotoSlot } from "@/components/PhotoSlot";
import logoAsset from "@/assets/aguazul-logo.jpg.asset.json";
import {
  waLink, PHONE_DISPLAY, MAPS_LINK, MAPS_EMBED, MAPS_DIRECTIONS, INSTAGRAM,
  MODELS, GALLERY, REVIEWS, type PoolModel,
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
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const btn = "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnSun = `${btn} bg-sun text-sun-foreground shadow-soft hover:brightness-95 hover:-translate-y-0.5`;
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-deep hover:-translate-y-0.5`;
const btnGhostLight = `${btn} border border-deep-foreground/40 text-deep-foreground hover:bg-deep-foreground/10`;
const btnOutline = `${btn} border border-primary/25 text-primary hover:bg-secondary`;

function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`block ${light ? "rounded bg-card p-1" : ""}`} aria-label="Aguazul Piscinas Santa Maria — início">
      <img src={logoAsset.url} alt="Aguazul Piscinas Santa Maria" className="h-12 w-auto object-contain md:h-14" />
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
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-card/95 transition-all duration-300 backdrop-blur ${solid ? "shadow-soft" : ""}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">{l}</a>
          ))}
          <a href="#orcamento" className={btnSun}>Solicitar orçamento</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={waLink()} target="_blank" rel="noopener" className={`${btn} bg-whatsapp px-4 py-2 text-primary-foreground`}>
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </a>
          <button onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}
            className="rounded-md p-2 text-primary">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-card px-5 pb-6 pt-2 lg:hidden" aria-label="Menu móvel">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b py-3 font-medium">{l}</a>
          ))}
          <a href="#orcamento" onClick={() => setOpen(false)} className={`${btnSun} mt-5 w-full`}>Solicitar orçamento</a>
        </nav>
      )}
    </header>
  );
}

function SectionHead({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`reveal mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-medium text-primary md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  );
}

function ModelModal({ model, index, onClose }: { model: PoolModel; index: number; onClose: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  const name = model.name ?? `Modelo ${index + 1}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep/70 p-4 animate-rise" onClick={onClose} role="dialog" aria-modal="true" aria-label={name}>
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-card shadow-lift" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[16/10]">
          <PhotoSlot photo={model.photos[i]} />
          <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 rounded-full bg-card/90 p-2 text-primary"><X className="h-5 w-5" /></button>
          {model.photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {model.photos.map((_, n) => (
                <button key={n} onClick={() => setI(n)} aria-label={`Foto ${n + 1}`} className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-sun" : "w-2 bg-card/80"}`} />
              ))}
            </div>
          )}
        </div>
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
          <div>
            <h3 className="text-3xl text-primary">{name}</h3>
            <p className="mt-3 text-muted-foreground">{model.description ?? "Descrição do modelo a ser cadastrada."}</p>
          </div>
          <div className="space-y-5 text-sm">
            <div>
              <p className="eyebrow mb-2">Medidas disponíveis</p>
              {model.sizes?.length ? model.sizes.map((s) => <p key={s}>{s}</p>) : <p className="text-muted-foreground">A cadastrar</p>}
            </div>
            <div>
              <p className="eyebrow mb-2">Características</p>
              {model.features?.length ? model.features.map((f) => <p key={f} className="flex gap-2"><Check className="h-4 w-4 text-pool" />{f}</p>) : <p className="text-muted-foreground">A cadastrar</p>}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <a href="#orcamento" onClick={onClose} className={btnSun}>Quero minha piscina</a>
            <a href={waLink(`Olá! Vim pelo site da Aguazul e gostaria de saber mais sobre o ${name}.`)} target="_blank" rel="noopener" className={btnOutline}>Falar no WhatsApp</a>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep/90 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label="Galeria de fotos">
      <button aria-label="Fechar" className="absolute right-4 top-4 rounded-full bg-card/10 p-2 text-deep-foreground"><X /></button>
      <button aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + n) % n); }} className="absolute left-3 rounded-full bg-card/10 p-3 text-deep-foreground hover:bg-card/20"><ChevronLeft /></button>
      <div className="aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-xl" onClick={(e) => e.stopPropagation()}>
        <PhotoSlot photo={GALLERY[index]} className="object-contain" />
      </div>
      <button aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % n); }} className="absolute right-3 rounded-full bg-card/10 p-3 text-deep-foreground hover:bg-card/20"><ChevronRight /></button>
      <p className="absolute bottom-4 text-sm text-deep-foreground/70">{index + 1} / {n}</p>
    </div>
  );
}

function QuoteForm() {
  const [sent, setSent] = useState<null | string>(null);
  const field = "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-pool focus:ring-2 focus:ring-pool/20";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Olá! Vim pelo site da Aguazul Piscinas Santa Maria e gostaria de solicitar um orçamento.\n\nNome: ${d.get("nome")}\nWhatsApp: ${d.get("whatsapp")}\nCidade: ${d.get("cidade")}\nProjeto: ${d.get("tipo")}\nMensagem: ${d.get("mensagem") || "-"}`;
    // Integração futura (e-mail/banco de dados) pode ser conectada aqui.
    setSent(waLink(msg));
  };
  if (sent)
    return (
      <div className="rounded-2xl bg-card p-10 text-center shadow-lift animate-rise">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary"><Check className="h-7 w-7" /></span>
        <h3 className="mt-5 text-2xl text-primary">Pedido recebido!</h3>
        <p className="mt-2 text-muted-foreground">Para agilizar, envie seus dados direto para nossa equipe pelo WhatsApp.</p>
        <a href={sent} target="_blank" rel="noopener" className={`${btn} mt-6 bg-whatsapp text-primary-foreground`}><MessageCircle className="h-4 w-4" />Enviar pelo WhatsApp</a>
        <button onClick={() => setSent(null)} className="mt-4 block w-full text-sm text-muted-foreground underline">Enviar outro pedido</button>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-card p-6 shadow-lift md:grid-cols-2 md:p-8">
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
      <button type="submit" className={`${btnSun} md:col-span-2`}><Send className="h-4 w-4" />Solicitar orçamento</button>
    </form>
  );
}

function Home() {
  useReveal();
  const [model, setModel] = useState<number | null>(null);
  const [lb, setLb] = useState<number | null>(null);
  const spans = ["md:row-span-2", "", "", "md:col-span-2", "", "md:row-span-2", "", ""];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative flex min-h-[88vh] items-center overflow-hidden bg-deep pt-20">
          <div className="absolute inset-0"><PhotoSlot photo={{ alt: "Piscina de fibra instalada pela Aguazul em Santa Maria" }} className="opacity-15" /></div>
          <div className="bg-hero-overlay absolute inset-0" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
            <div>
              <p className="animate-rise inline-flex items-center gap-2 border-l-2 border-sun pl-3 text-xs font-semibold uppercase tracking-widest text-deep-foreground">
                <MapPin className="h-3.5 w-3.5 text-sun" />Santa Maria e região
              </p>
              <h1 className="animate-rise mt-7 max-w-3xl text-5xl font-normal leading-[.95] text-deep-foreground md:text-7xl lg:text-8xl" style={{ animationDelay: "80ms" }}>
                Onde os melhores momentos <em className="text-sun">acontecem.</em>
              </h1>
              <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-deep-foreground/85" style={{ animationDelay: "160ms" }}>
                Piscinas de fibra para transformar seu espaço em um lugar de lazer, conforto e encontros inesquecíveis.
              </p>
              <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
                <a href="#orcamento" className={btnSun}>Solicitar orçamento</a>
                <a href="#piscinas" className={btnGhostLight}>Conhecer piscinas</a>
              </div>
              <div className="animate-rise mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-deep-foreground/80" style={{ animationDelay: "320ms" }}>
                <span className="inline-flex items-center gap-2"><Droplets className="h-4 w-4 text-sun" />Piscinas de fibra</span>
                <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-sun" />Instalação especializada</span>
                <span className="inline-flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-sun" />Atendimento próximo</span>
              </div>
            </div>
            <div className="animate-rise hidden justify-end lg:flex" style={{ animationDelay: "180ms" }}>
              <div className="rotate-2 border border-deep-foreground/20 bg-card p-5 shadow-lift transition-transform duration-500 hover:rotate-0">
                <img src={logoAsset.url} alt="Logo Aguazul Piscinas Santa Maria" className="h-auto w-full max-w-sm" />
                <p className="mt-4 border-t pt-4 text-center text-sm font-medium text-primary">Piscinas de fibra em Santa Maria e região</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section aria-label="Diferenciais rápidos" className="border-b border-border bg-card">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4 lg:px-8">
            {[[Droplets, "Piscinas de fibra"], [Wrench, "Instalação especializada"], [HeartHandshake, "Atendimento personalizado"], [ShieldCheck, "Orçamento sem compromisso"]].map(([I, t]) => {
              const Icon = I as typeof Droplets;
              return (
                <li key={t as string} className="flex items-center gap-3 text-sm font-semibold text-primary">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent"><Icon className="h-5 w-5 text-pool" /></span>{t as string}
                </li>
              );
            })}
          </ul>
        </section>

        {/* TRANSFORME */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-12 lg:px-8">
          <div className="reveal md:col-span-5">
            <p className="eyebrow">Transforme seu espaço</p>
            <h2 className="mt-3 text-3xl font-medium text-primary md:text-5xl">Mais que uma piscina. Um novo jeito de aproveitar sua casa.</h2>
            <p className="mt-6 text-lg text-muted-foreground">Uma piscina muda a rotina da casa: o quintal vira ponto de encontro, os fins de semana ganham sol e água, e a família e os amigos têm mais motivos para ficar juntos.</p>
            <a href="#piscinas" className={`${btnPrimary} mt-8`}>Conhecer piscinas</a>
          </div>
          <div className="reveal grid grid-cols-5 gap-4 md:col-span-7">
            <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-lg shadow-lift"><PhotoSlot photo={{ alt: "Piscina instalada em área externa" }} /></div>
            <div className="col-span-2 mt-16 aspect-[3/4] overflow-hidden rounded-lg"><PhotoSlot photo={{ alt: "Família aproveitando a piscina" }} /></div>
          </div>
        </section>

        {/* MODELOS */}
        <section id="piscinas" className="bg-secondary py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHead eyebrow="Modelos" title="Encontre a piscina ideal para o seu espaço" text="Diferentes formatos e tamanhos para cada tipo de quintal." />
            <div className="grid gap-6 md:grid-cols-3">
              {MODELS.map((m, i) => (
                 <article key={m.id} className="reveal group overflow-hidden rounded-lg border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="aspect-[4/3] overflow-hidden"><PhotoSlot photo={m.photos[0]} className="transition duration-500 group-hover:scale-[1.03]" /></div>
                  <div className="p-6">
                    <h3 className="text-2xl text-primary">{m.name ?? `Modelo ${i + 1}`}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{m.description ?? "Informações do modelo em breve."}</p>
                    <button onClick={() => setModel(i)} className={`${btnOutline} mt-5 px-5 py-2.5`}>Quero conhecer</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section id="diferenciais" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHead eyebrow="Diferenciais" title="Por que escolher a Aguazul Piscinas?" />
           <div className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-4">
            {[
              [Gem, "Qualidade", "Piscinas pensadas para unir beleza, resistência e praticidade."],
              [HeartHandshake, "Atendimento", "Atendimento próximo para ajudar você a escolher a solução ideal."],
              [Wrench, "Instalação", "Equipe preparada para acompanhar o projeto desde a escolha até a instalação."],
              [Award, "Experiência", "Experiência no segmento de piscinas e atendimento em Santa Maria e região."],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Gem;
              return (
                <div key={t as string} className="reveal bg-card p-8 transition-colors hover:bg-secondary">
                  <Icon className="h-7 w-7 text-pool" />
                  <h3 className="mt-6 text-xl text-primary">{t as string}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="bg-deep py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="eyebrow">Galeria</p>
                <h2 className="mt-3 text-3xl font-medium text-deep-foreground md:text-5xl">Piscinas que já transformaram espaços</h2>
                <p className="mt-4 text-deep-foreground/70">Veja algumas instalações realizadas pela Aguazul.</p>
              </div>
              <a href={INSTAGRAM} target="_blank" rel="noopener" className={btnGhostLight}><Instagram className="h-4 w-4" />@aguazulpiscinas_santa_maria</a>
            </div>
            <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
              {GALLERY.map((p, i) => (
                <button key={i} onClick={() => setLb(i)} aria-label={`Ampliar: ${p.alt}`} className={`reveal group overflow-hidden rounded-lg ${spans[i] ?? ""}`}>
                  <PhotoSlot photo={p} className="transition duration-500 group-hover:scale-[1.03]" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="reveal md:col-span-4">
              <p className="eyebrow">Avaliações no Google</p>
              <h2 className="mt-3 text-3xl font-medium text-primary md:text-5xl">Quem já tem, recomenda.</h2>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-6xl text-primary">4,7</span>
                <div>
                  <div className="flex text-sun" aria-label="4,7 de 5 estrelas">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-5 w-5 fill-current" />)}</div>
                  <p className="text-sm text-muted-foreground">23 avaliações</p>
                </div>
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener" className={`${btnOutline} mt-8`}>Ver todas as avaliações</a>
            </div>
            <div className="grid gap-5 md:col-span-8 md:grid-cols-2">
              {REVIEWS.map((r, i) => (
                 <figure key={i} className={`reveal rounded-lg border bg-card p-7 shadow-soft ${i === 0 ? "md:col-span-2" : ""}`}>
                  <div className="flex text-sun">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}</div>
                  <blockquote className="mt-4 font-display text-xl leading-snug text-primary">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">{r.author ?? "Cliente Aguazul"} · via Google</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section className="bg-secondary py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 lg:px-8">
            <div className="reveal aspect-[5/4] overflow-hidden rounded-lg shadow-lift"><PhotoSlot photo={{ alt: "Loja da Aguazul Piscinas em Santa Maria" }} /></div>
            <div className="reveal">
              <p className="eyebrow">Sobre nós</p>
              <h2 className="mt-3 text-3xl font-medium text-primary md:text-5xl">Conheça a Aguazul Piscinas Santa Maria</h2>
              <p className="mt-6 text-lg text-muted-foreground">A Aguazul trabalha com piscinas de fibra e atende Santa Maria e região. Do primeiro contato à instalação, nossa equipe ajuda você a escolher a piscina certa para o seu espaço e a sua família.</p>
              <p className="mt-4 text-muted-foreground">Venha conversar com a gente na loja ou chame no WhatsApp — será um prazer atender você.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#orcamento" className={btnPrimary}>Quero minha piscina</a>
                <a href={INSTAGRAM} target="_blank" rel="noopener" className={btnOutline}><Instagram className="h-4 w-4" />Instagram</a>
              </div>
            </div>
          </div>
        </section>

        {/* ORÇAMENTO */}
        <section id="orcamento" className="relative overflow-hidden bg-primary py-24">
          <Sun className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-sun/10" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 lg:px-8">
            <div className="reveal md:col-span-5">
              <p className="eyebrow text-sun">Orçamento sem compromisso</p>
              <h2 className="mt-3 text-3xl font-medium text-primary-foreground md:text-5xl">Vamos transformar seu espaço?</h2>
              <p className="mt-5 text-lg text-primary-foreground/80">Preencha seus dados e nossa equipe entra em contato para ajudar a escolher a piscina ideal.</p>
              <a href={waLink()} target="_blank" rel="noopener" className={`${btnGhostLight} mt-8`}><MessageCircle className="h-4 w-4" />Prefiro falar no WhatsApp</a>
            </div>
            <div className="reveal md:col-span-7"><QuoteForm /></div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section id="contato" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHead eyebrow="Localização" title="Venha conhecer a Aguazul" />
          <div className="grid gap-8 md:grid-cols-12">
            <div className="reveal space-y-6 md:col-span-4">
              <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-pool" />
                <address className="not-italic leading-relaxed">Esquina - Rua Portugal 22, BR-287, Km 1<br />São João<br />Santa Maria - RS<br />97030-490</address>
              </div>
              <div className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-pool" />
                <a href={waLink()} target="_blank" rel="noopener" className="font-semibold text-primary hover:underline">{PHONE_DISPLAY}</a>
              </div>
              <div className="flex gap-4"><Instagram className="mt-1 h-5 w-5 shrink-0 text-pool" />
                <a href={INSTAGRAM} target="_blank" rel="noopener" className="hover:underline">@aguazulpiscinas_santa_maria</a>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener" className={btnPrimary}>Traçar rota</a>
                <a href={MAPS_LINK} target="_blank" rel="noopener" className={btnOutline}>Abrir no Google Maps</a>
              </div>
            </div>
            <div className="reveal aspect-[16/10] overflow-hidden rounded-2xl border shadow-soft md:col-span-8">
              <iframe title="Mapa da Aguazul Piscinas Santa Maria" src={MAPS_EMBED} className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
          <div><Logo light /><p className="mt-4 text-sm text-deep-foreground/70">Piscinas de fibra em Santa Maria e região.</p></div>
          <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Rodapé">
            {NAV.map(([l, h]) => <a key={h} href={h} className="text-deep-foreground/75 hover:text-deep-foreground">{l}</a>)}
          </nav>
          <div className="space-y-2 text-sm text-deep-foreground/75">
            <p>{PHONE_DISPLAY}</p>
            <p>Rua Portugal 22, BR-287, Km 1 — Santa Maria/RS</p>
            <a href={INSTAGRAM} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-deep-foreground"><Instagram className="h-4 w-4" />Instagram</a>
          </div>
        </div>
        <p className="border-t border-deep-foreground/10 py-5 text-center text-xs text-deep-foreground/50">© {new Date().getFullYear()} Aguazul Piscinas Santa Maria</p>
      </footer>

      <a href={waLink()} target="_blank" rel="noopener" aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-lift transition hover:scale-105 md:h-12 md:w-12">
        <MessageCircle className="h-6 w-6" />
      </a>

      {model !== null && MODELS[model] && <ModelModal model={MODELS[model]} index={model} onClose={() => setModel(null)} />}
      {lb !== null && <Lightbox index={lb} setIndex={setLb} onClose={() => setLb(null)} />}
    </div>
  );
}
