import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Phone, MessageCircle, Send, Shield, Handshake, Wrench, Scale, Lock, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Михаил Беспалов — Электромонтаж, ОПС, видеонаблюдение, сети связи" },
      { name: "description", content: "Частный мастер по электромонтажу и слаботочным системам. Установка розеток, замена проводки, щитки, видеонаблюдение, пожарная сигнализация. Работа по нормам, с гарантией." },
      { name: "keywords", content: "электромонтаж, электрик, замена проводки, щиток, видеонаблюдение, пожарная сигнализация, Славянск-на-Кубани" },
      { property: "og:title", content: "Михаил Беспалов — Электромонтаж и слаботочные системы" },
      { property: "og:description", content: "Электромонтаж, ОПС, видеонаблюдение, сети связи. По нормам, с гарантией." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Михаил Беспалов — Электромонтаж",
        description: "Электромонтаж, охранно-пожарная сигнализация, видеонаблюдение и сети связи",
        telephone: "+79183507782",
        areaServed: "Славянск-на-Кубани",
      }),
    }],
  }),
  component: Index,
});

const trust = [
  { icon: Shield, text: "Гарантия на работы" },
  { icon: Handshake, text: "Лично контролирую" },
  { icon: Wrench, text: "Проф. инструмент" },
  { icon: Scale, text: "Без навязывания" },
  { icon: Lock, text: "Ответственность" },
];

const steps = [
  { n: 1, t: "Заявка", d: "Связываетесь по телефону или мессенджеру." },
  { n: 2, t: "Уточнение задачи", d: "Коротко обсуждаем, что нужно сделать." },
  { n: 3, t: "Выезд на объект", d: "Оцениваю объём работ на месте." },
  { n: 4, t: "Расчёт стоимости", d: "Согласовываем цену и сроки." },
  { n: 5, t: "Материалы", d: "Закупка и согласование материалов." },
  { n: 6, t: "Выполнение работ", d: "Делаю работу и сдаю результат." },
];

function Index() {
  const [form, setForm] = useState({ name: "", phone: "", message: "", contact: "call-asap" });

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").eq("is_active", true).order("sort_order");
      return data ?? [];
    },
  });
  const { data: cases = [] } = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const { data } = await supabase.from("cases").select("*").eq("is_active", true).order("sort_order");
      return data ?? [];
    },
  });
  const { data: prices = [] } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const { data } = await supabase.from("prices").select("*").eq("is_active", true).order("sort_order");
      return data ?? [];
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error("Укажите имя и телефон"); return; }
    toast.success("Заявка отправлена! Свяжусь с вами в ближайшее время.");
    setForm({ name: "", phone: "", message: "", contact: "call-asap" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />

      <header className="absolute top-0 left-0 right-0 z-20 px-4 md:px-10 py-4 md:py-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="font-bold text-base sm:text-lg md:text-xl text-foreground truncate">Михаил Беспалов</div>
          <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground truncate">Электромонтаж и слаботочные системы</div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          <a href="https://wa.me/79183507782" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
             className="flex flex-col items-center justify-center px-2.5 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition leading-tight">
            <span className="text-xs md:text-sm font-semibold">WhatsApp</span>
            <span className="hidden sm:inline text-[10px] md:text-[11px] opacity-90">Написать</span>
          </a>
          <a href="https://t.me/+79183507782" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
             className="flex flex-col items-center justify-center px-2.5 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition leading-tight">
            <span className="text-xs md:text-sm font-semibold">Telegram</span>
            <span className="hidden sm:inline text-[10px] md:text-[11px] opacity-90">Написать</span>
          </a>
          <a href="tel:+79183507782" className="hidden md:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">Позвонить</span>
            <span className="text-[11px] text-muted-foreground">9:00–17:00</span>
          </a>
        </div>
      </header>

      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <img src={hero} alt="Современный интерьер с электромонтажом" width={1920} height={1280}
             fetchPriority="high"
             className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-24 sm:pt-0">
          <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Электромонтаж, охранно-пожарная сигнализация, видеонаблюдение и сети связи
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/95 drop-shadow">
            Работаю по нормам, с гарантией и понятным результатом
          </p>
          <a href="#contact"
             className="inline-flex mt-8 sm:mt-10 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground text-base sm:text-lg font-semibold hover:opacity-90 transition shadow-lg">
            Оставить заявку
          </a>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Кто выполняет работы</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <img src={about} alt="Михаил Беспалов — частный мастер по электромонтажу" width={800} height={800} loading="lazy"
                 className="rounded-2xl w-full max-w-sm md:max-w-md mx-auto shadow-xl" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Михаил Беспалов</h3>
              <p className="text-muted-foreground mt-2">Частный мастер по электромонтажу и слаботочке</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {["Расчёт заранее", "Гарантия", "Работа по нормам"].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">{t}</span>
                ))}
              </div>
              <p className="mt-5 sm:mt-6 text-foreground/80 leading-relaxed">
                Работаю как лично, так и с проверенными специалистами при необходимости.
                Электромонтаж в домах, квартирах и коммерческих объектах — по нормам,
                с понятным результатом и ответственностью за работу.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Основные работы</h2>
          <p className="text-center text-muted-foreground mt-3 max-w-2xl mx-auto">
            Если не нашли свою задачу — напишите, подскажу и проконсультирую.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12">
            {services.map(s => (
              <article key={s.id} className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                {s.image_url && (
                  <img src={s.image_url} alt={s.title} width={800} height={600} loading="lazy"
                       className="w-full h-44 sm:h-48 object-cover" />
                )}
                <div className="p-5">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">Почему мне доверяют</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent flex items-center justify-center">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />
                </div>
                <p className="mt-3 sm:mt-4 font-medium text-sm sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Как проходит работа</h2>
          <p className="text-center text-muted-foreground mt-3">Понятный порядок действий — без сюрпризов по срокам и стоимости.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
            {steps.map(s => (
              <div key={s.n} className="bg-card rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">{s.n}</div>
                <h3 className="font-bold text-lg mt-4">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Условия работы</h2>
          <p className="text-center text-muted-foreground mt-3">Чтобы цена и сроки были прозрачны</p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <ul className="space-y-3">
                {["Согласовываю объём работ до старта", "Оцениваю на месте (кроме мелких задач)", "Работаю на безопасность и качество"].map(t => (
                  <li key={t} className="flex gap-3"><Check className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <ul className="space-y-3">
                {["Работа «наспех и без расчёта»", "Работы без понимания объёма", "Начало работ без согласования"].map(t => (
                  <li key={t} className="flex gap-3"><X className="w-5 h-5 text-destructive shrink-0 mt-0.5" /><span>{t}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Ориентировочные цены</h2>
          <p className="text-center text-muted-foreground mt-3">
            Точная стоимость определяется после осмотра объекта и согласования объёма работ
          </p>
          <div className="mt-8 sm:mt-10 bg-card rounded-2xl shadow-sm overflow-hidden">
            {prices.map((p, i) => (
              <div key={p.id} className={`flex justify-between items-center gap-4 p-4 sm:p-5 ${i !== prices.length - 1 ? "border-b border-border" : ""}`}>
                <span className="font-medium text-sm sm:text-base">{p.title}</span>
                <span className="text-primary font-bold whitespace-nowrap text-sm sm:text-base">{p.price}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10">
            {[
              ["Материалы оплачиваются", "отдельно"],
              ["Подбираются и согласуются", "индивидуально"],
              ["Качество и безопасность —", "в приоритете"],
            ].map(([a, b]) => (
              <div key={a} className="bg-card rounded-2xl p-5 text-center shadow-sm">
                <p className="text-sm text-muted-foreground">{a}</p>
                <p className="font-bold text-lg text-primary mt-1">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Объекты, с которыми работал</h2>
          <p className="text-center text-muted-foreground mt-3">
            Примеры объектов и работ, выполненных в составе бригад и подрядов
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
            {cases.map(c => (
              <article key={c.id} className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                {c.image_url && (
                  <img src={c.image_url} alt={c.title} width={800} height={600} loading="lazy"
                       className="w-full h-52 sm:h-56 object-cover" />
                )}
                <div className="p-5">
                  <h3 className="font-bold text-lg">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-14 sm:py-20 px-4 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Оставить заявку</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 mt-10 sm:mt-12">
            <div>
              <a href="tel:+79183507782" className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary hover:opacity-80">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7" /> +7 918 350-77-82
              </a>
              <p className="mt-4 text-foreground/80">Будни: 9:00–17:00</p>
              <p className="text-muted-foreground">В остальное время — пишите в мессенджеры</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="https://wa.me/79183507782" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <a href="https://t.me/+79183507782" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition">
                  <Send className="w-5 h-5" /> Telegram
                </a>
              </div>
            </div>
            <form onSubmit={submit} className="bg-card rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Имя" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Телефон" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <Textarea placeholder="Сообщение" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              <div>
                <p className="text-sm font-medium mb-2">Как удобнее связаться:</p>
                <RadioGroup value={form.contact} onValueChange={v => setForm({ ...form, contact: v })}>
                  {[
                    ["call-asap", "Позвонить как можно быстрее"],
                    ["call-work", "Позвонить в рабочее время"],
                    ["messenger", "Написать в мессенджер"],
                  ].map(([v, l]) => (
                    <div key={v} className="flex items-center gap-2">
                      <RadioGroupItem value={v} id={v} />
                      <Label htmlFor={v} className="cursor-pointer">{l}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" size="lg">Оставить заявку</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border space-y-2">
        <div>© {new Date().getFullYear()} Михаил Беспалов · Электромонтаж и слаботочные системы</div>
        <Link to="/login" className="inline-block text-xs opacity-50 hover:opacity-100">Вход для администратора</Link>
      </footer>
    </div>
  );
}
