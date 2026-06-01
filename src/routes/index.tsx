import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Send, Shield, Handshake, Wrench, Scale, Lock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import sHome from "@/assets/s-home.jpg";
import sShop from "@/assets/s-shop.jpg";
import sWiring from "@/assets/s-wiring.jpg";
import sPanel from "@/assets/s-panel.jpg";
import sSocket from "@/assets/s-socket.jpg";
import sLight from "@/assets/s-light.jpg";
import sFire from "@/assets/s-fire.jpg";
import sCam from "@/assets/s-cam.jpg";
import cHospital from "@/assets/c-hospital.jpg";
import cPharma from "@/assets/c-pharma.jpg";
import cSchool from "@/assets/c-school.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Михаил Беспалов — Электромонтаж, ОПС, видеонаблюдение" },
      { name: "description", content: "Электромонтаж, охранно-пожарная сигнализация, видеонаблюдение и сети связи. Работаю по нормам, с гарантией и понятным результатом." },
      { property: "og:title", content: "Михаил Беспалов — Электромонтаж и слаботочные системы" },
      { property: "og:description", content: "Электромонтаж, ОПС, видеонаблюдение, сети связи. По нормам, с гарантией." },
    ],
  }),
  component: Index,
});

const services = [
  { img: sHome, title: "Дома и квартиры", text: "Полный электромонтаж в новых и жилых помещениях — с учётом нагрузки и требований безопасности." },
  { img: sShop, title: "Коммерческие объекты", text: "Офисы, магазины, помещения под бизнес. Работаю с расчётом и согласованием объёма работ." },
  { img: sWiring, title: "Замена проводки", text: "Полная или частичная замена старой проводки с приведением схемы в порядок." },
  { img: sPanel, title: "Щитки и автоматы", text: "Сборка, замена и модернизация электрощитов, установка автоматов и защиты." },
  { img: sSocket, title: "Розетки и выключатели", text: "Установка, перенос и замена розеток, выключателей и точек подключения." },
  { img: sLight, title: "Освещение", text: "Люстры, светильники, подсветка, разводка и подключение освещения." },
  { img: sFire, title: "Пожарная сигнализация", text: "Монтаж и обслуживание систем пожарной сигнализации." },
  { img: sCam, title: "Видеонаблюдение", text: "Установка и подключение камер для домов, квартир и коммерческих объектов." },
];

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

const prices = [
  ["Диагностика электросети", "от 3 000 ₽"],
  ["Установка розетки / выключателя", "от 300 ₽"],
  ["Замена электропроводки (частично)", "от 15 000 ₽"],
  ["Замена проводки под ключ", "от 60 000 ₽"],
  ["Сборка и монтаж электрощита", "от 10 000 ₽"],
  ["Электромонтаж под ключ (квартира / дом)", "от 80 000 ₽"],
];

const cases = [
  { img: cHospital, title: "Благодатенская больница", text: "Электромонтаж всей участковой больницы. Ставропольский край" },
  { img: cPharma, title: "Имбиан (фармацевтика)", text: "Монтаж систем пожарной сигнализации. Славянск-на-Кубани" },
  { img: cSchool, title: "Школа №12 (МАОУ СОШ)", text: "Монтаж системы пожарной сигнализации и автоматики. Славянск-на-Кубани" },
];

function Index() {
  const [form, setForm] = useState({ name: "", phone: "", message: "", contact: "call-asap" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Укажите имя и телефон");
      return;
    }
    toast.success("Заявка отправлена! Свяжусь с вами в ближайшее время.");
    setForm({ name: "", phone: "", message: "", contact: "call-asap" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 md:px-10 py-5 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg md:text-xl text-foreground">Михаил Беспалов</div>
          <div className="text-xs md:text-sm text-muted-foreground">Электромонтаж и слаботочные системы</div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a href="https://wa.me/79183507782" target="_blank" rel="noopener noreferrer"
             className="hidden sm:flex flex-col items-center justify-center px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition leading-tight">
            <span className="text-sm font-semibold">WhatsApp</span>
            <span className="text-[11px] opacity-90">Написать</span>
          </a>
          <a href="https://t.me/+79183507782" target="_blank" rel="noopener noreferrer"
             className="hidden sm:flex flex-col items-center justify-center px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition leading-tight">
            <span className="text-sm font-semibold">Telegram</span>
            <span className="text-[11px] opacity-90">Написать</span>
          </a>
          <a href="tel:+79183507782" className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">Позвонить</span>
            <span className="text-[11px] text-muted-foreground">9:00–17:00</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <img src={hero} alt="" width={1920} height={1280}
             className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Электромонтаж, охранно-пожарная сигнализация, видеонаблюдение и сети связи
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/95 drop-shadow">
            Работаю по нормам, с гарантией и понятным результатом
          </p>
          <a href="#contact"
             className="inline-flex mt-10 px-8 py-4 rounded-xl bg-primary text-primary-foreground text-lg font-semibold hover:opacity-90 transition shadow-lg">
            Оставить заявку
          </a>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Кто выполняет работы</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img src={about} alt="Михаил Беспалов" width={800} height={800} loading="lazy"
                 className="rounded-2xl w-full max-w-md mx-auto shadow-xl" />
            <div>
              <h3 className="text-2xl font-bold">Михаил Беспалов</h3>
              <p className="text-muted-foreground mt-2">Частный мастер по электромонтажу и слаботочке</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {["Расчёт заранее", "Гарантия", "Работа по нормам"].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">{t}</span>
                ))}
              </div>
              <p className="mt-6 text-foreground/80 leading-relaxed">
                Работаю как лично, так и с проверенными специалистами при необходимости.
                Электромонтаж в домах, квартирах и коммерческих объектах — по нормам,
                с понятным результатом и ответственностью за работу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Основные работы</h2>
          <p className="text-center text-muted-foreground mt-3 max-w-2xl mx-auto">
            Если не нашли свою задачу — напишите, подскажу и проконсультирую.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {services.map(s => (
              <div key={s.title} className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <img src={s.img} alt={s.title} width={800} height={600} loading="lazy"
                     className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Почему мне доверяют</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
                  <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
                <p className="mt-4 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Как проходит работа</h2>
          <p className="text-center text-muted-foreground mt-3">
            Понятный порядок действий — без сюрпризов по срокам и стоимости.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {steps.map(s => (
              <div key={s.n} className="bg-card rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">{s.n}</div>
                <h3 className="font-bold text-lg mt-4">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Условия работы</h2>
          <p className="text-center text-muted-foreground mt-3">Чтобы цена и сроки были прозрачны</p>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
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

      {/* Prices */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Ориентировочные цены</h2>
          <p className="text-center text-muted-foreground mt-3">
            Точная стоимость определяется после осмотра объекта и согласования объёма работ
          </p>
          <div className="mt-10 bg-card rounded-2xl shadow-sm overflow-hidden">
            {prices.map(([name, price], i) => (
              <div key={name} className={`flex justify-between items-center p-5 ${i !== prices.length - 1 ? "border-b border-border" : ""}`}>
                <span className="font-medium">{name}</span>
                <span className="text-primary font-bold whitespace-nowrap ml-4">{price}</span>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
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

      {/* Cases */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Объекты, с которыми работал</h2>
          <p className="text-center text-muted-foreground mt-3">
            Примеры объектов и работ, выполненных в составе бригад и подрядов
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {cases.map(c => (
              <div key={c.title} className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <img src={c.img} alt={c.title} width={800} height={600} loading="lazy"
                     className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-lg">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Оставить заявку</h2>
          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div>
              <a href="tel:+79183507782" className="flex items-center gap-3 text-2xl font-bold text-primary hover:opacity-80">
                <Phone className="w-7 h-7" /> +7 918 350-77-82
              </a>
              <p className="mt-4 text-foreground/80">Будни: 9:00–17:00</p>
              <p className="text-muted-foreground">В остальное время — пишите в мессенджеры</p>
              <div className="flex gap-3 mt-6">
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
            <form onSubmit={submit} className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
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

      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} Михаил Беспалов · Электромонтаж и слаботочные системы
      </footer>
    </div>
  );
}
