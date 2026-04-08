import { useState, useEffect, useCallback, useRef } from "react";

// ─── BRAND COLORS ───
const C = {
  green1: "#B8D94E",
  green2: "#7CB342",
  green3: "#4A8C3F",
  teal:   "#3A9E91",
  blue1:  "#2E86C1",
  blue2:  "#1A5276",
  gray:      "#8A8A8A",
  grayDark:  "#4A4A4A",
  grayLight: "#C5C5C5",
  bg:     "#F7F9F4",
  bgCard: "#FFFFFF",
  danger: "#E8734A",
  warn:   "#F5A623",
};

const F = {
  title: "'Cormorant Garamond', 'Georgia', serif",
  body:  "'Outfit', 'Segoe UI', sans-serif",
};

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { width: 100%; height: 100%; overflow: hidden; background: ${C.bg}; }
    button { cursor: pointer; border: none; background: none; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  `}</style>
);

// Pétalas apenas decorativas (fundo dos slides)
function Petals({ size = 100, opacity = 0.12, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
         style={{ ...style, opacity, flexShrink: 0, pointerEvents: "none" }}>
      {[0,60,120,180,240,300].map((rot, i) => (
        <ellipse key={i} cx="50" cy="50" rx="12" ry="28"
          transform={`rotate(${rot} 50 50) translate(0 -14)`}
          fill={i % 2 === 0 ? C.green2 : C.blue1} opacity="0.7" />
      ))}
      <circle cx="50" cy="50" r="7" fill={C.teal} opacity="0.9" />
    </svg>
  );
}

// Logo oficial Cuidarte
function Logo({ height = 110, style = {} }) {
  return (
    <img src="/logo-cuidarte.png" alt="Cuidarte Terapias Integradas"
         style={{ height, objectFit: "contain", display: "block", ...style }} />
  );
}

// ─── ESTILOS COMPARTILHADOS ───
const SS = {
  slide: (bg = C.bg) => ({
    position: "absolute", inset: 0, background: bg,
    padding: "52px 64px 70px",
    display: "flex", flexDirection: "column",
    overflow: "hidden",
    transition: "opacity 0.45s ease",
  }),
  h1: {
    fontFamily: F.title, fontWeight: 700, fontSize: 30,
    color: C.blue2, marginBottom: 18, lineHeight: 1.2,
  },
  label: {
    fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
    color: C.teal, fontWeight: 600, marginBottom: 6, fontFamily: F.body,
  },
  divider: {
    width: 48, height: 2,
    background: `linear-gradient(90deg, ${C.green2}, ${C.blue1})`,
    margin: "12px 0",
  },
  nav: {
    position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
    display: "flex", alignItems: "center", gap: 6,
    borderRadius: 40, padding: "8px 16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.13)", zIndex: 300,
  },
  navBtn: (dark) => ({
    width: 36, height: 36, borderRadius: "50%", fontSize: 20,
    color: dark ? "#fff" : C.blue2, background: "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
  }),
  dot: (active) => ({
    width: active ? 22 : 8, height: 8, borderRadius: 4,
    background: active ? C.blue1 : C.grayLight,
    transition: "all 0.3s", border: "none", cursor: "pointer", padding: 0,
  }),
};

/* ══════════════════════════════════════════
   SLIDE 1 — CAPA
══════════════════════════════════════════ */
function Slide01({ visible }) {
  return (
    <div style={{
      ...SS.slide(C.bgCard), opacity: visible ? 1 : 0,
      alignItems: "center", justifyContent: "center", textAlign: "center",
    }}>
      <Petals size={220} opacity={0.07} style={{ position:"absolute", top:10, right:30 }} />
      <Petals size={130} opacity={0.05} style={{ position:"absolute", bottom:70, left:20 }} />

      <div style={{ animation: visible ? "fadeUp 0.7s ease both" : "none" }}>
        <Logo height={130} style={{ margin: "0 auto 28px" }} />
        <div style={{ ...SS.divider, margin: "0 auto 20px" }} />
        <p style={{ ...SS.label, justifyContent:"center" }}>MIND CORPORATIVO</p>
        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:40, color:C.blue2, lineHeight:1.2, margin:"10px 0 10px" }}>
          Treinamento 1
        </h1>
        <h2 style={{ fontFamily:F.title, fontWeight:400, fontSize:26, color:C.teal, marginBottom:18 }}>
          Reconhecimento das Demandas
        </h2>
        <p style={{ fontSize:13, color:C.gray, maxWidth:420, margin:"0 auto" }}>
          Saúde mental no trabalho · Organização · Sinais de sobrecarga
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 2 — PROPÓSITO
══════════════════════════════════════════ */
function Slide02({ visible }) {
  const items = [
    { icon:"🧠", label:"Entender sinais",      desc:"Reconhecer sobrecarga em si e nos colegas" },
    { icon:"⚠️", label:"Fatores de risco",     desc:"Identificar o que aumenta o estresse" },
    { icon:"✅", label:"Estratégias práticas", desc:"Ferramentas para organizar melhor a rotina" },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Abertura</p>
      <h1 style={SS.h1}>Boas-vindas e Propósito</h1>
      <div style={SS.divider} />

      <div style={{ background:C.bgCard, borderRadius:16, padding:"24px 28px",
                    boxShadow:"0 2px 20px rgba(0,0,0,0.06)", marginTop:12,
                    position:"relative", overflow:"hidden", flex:1 }}>
        <Petals size={130} opacity={0.05} style={{ position:"absolute", right:-10, top:-10 }} />
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:19,
                    color:C.blue2, lineHeight:1.7, marginBottom:20 }}>
          "Hoje vamos falar sobre saúde mental no trabalho e como podemos fazer
          para melhorar a gestão do ambiente para todos."
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
          {items.map((it, i) => (
            <div key={i} style={{ background:C.bg, borderRadius:12, padding:"14px 16px",
                                  animation: visible ? `fadeUp 0.5s ${0.2+i*0.12}s ease both` : "none",
                                  opacity: visible ? 1 : 0 }}>
              <span style={{ fontSize:24 }}>{it.icon}</span>
              <p style={{ fontWeight:600, fontSize:13, color:C.grayDark, margin:"8px 0 4px" }}>{it.label}</p>
              <p style={{ fontSize:11, color:C.gray, lineHeight:1.5 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <p style={{ marginTop:16, fontSize:12, color:C.gray, fontStyle:"italic", textAlign:"center" }}>
        "Isso enquanto fator que pode prejudicar a sua rotina."
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 3 — FATORES DE RISCO
══════════════════════════════════════════ */
function Slide03({ visible }) {
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Conceito Central</p>
      <h1 style={SS.h1}>O que são Fatores de Risco no Trabalho?</h1>
      <div style={SS.divider} />

      <div style={{ background:C.bgCard, borderRadius:16, padding:"18px 24px",
                    boxShadow:"0 2px 16px rgba(0,0,0,0.06)", marginBottom:16 }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:17, color:C.blue2, lineHeight:1.6 }}>
          "São elementos na gestão de trabalho que podem aumentar o estresse, a ansiedade
          ou causar problemas de saúde mental."
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, flex:1 }}>
        {[
          { bg:`${C.green2}18`, border:`${C.green2}40`, titleColor:C.green3, icon:"⚡",
            title:"Fatores Organizacionais",
            items:["Sobrecarga de tarefas","Falta de clareza nas instruções","Ausência de apoio","Prazos excessivamente curtos"] },
          { bg:`${C.blue1}18`, border:`${C.blue1}40`, titleColor:C.blue2, icon:"📱",
            title:"Fatores Comportamentais",
            items:["Uso excessivo do celular","Atrasos e desorganização","Não cumprimento de prazos","Tarefas incompletas ou apressadas"] },
        ].map((col, i) => (
          <div key={i} style={{ background:`linear-gradient(135deg,${col.bg},transparent)`,
                                border:`1.5px solid ${col.border}`, borderRadius:14, padding:"18px 20px" }}>
            <p style={{ fontWeight:700, fontSize:13, color:col.titleColor, marginBottom:10 }}>
              {col.icon} {col.title}
            </p>
            {col.items.map((t, j) => (
              <p key={j} style={{ fontSize:12, color:C.grayDark, padding:"5px 0",
                                  borderBottom: j<3 ? `1px solid ${col.border}` : "none" }}>→ {t}</p>
            ))}
          </div>
        ))}
      </div>

      <div style={{ background:`${C.warn}18`, border:`1.5px solid ${C.warn}50`,
                    borderRadius:12, padding:"11px 18px", marginTop:14 }}>
        <p style={{ fontSize:12, color:C.grayDark }}>
          <strong>Exemplo:</strong> Quando alguém passa muito tempo no celular, perde prazos
          ou demora para concluir tarefas, isso pode afetar toda a equipe.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 4 — SINAIS INTERNOS
══════════════════════════════════════════ */
function Slide04({ visible }) {
  const signals = [
    { icon:"😴", label:"Cansaço constante",   desc:"mesmo após descanso adequado" },
    { icon:"😰", label:"Ansiedade e irritação", desc:"ou desmotivação frequente" },
    { icon:"🌀", label:"Dificuldade de foco",  desc:"esquecimento ou distração recorrente" },
    { icon:"😞", label:"Frustração",           desc:"sentimentos de baixa autoestima" },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Identificação · Parte A</p>
      <h1 style={SS.h1}>Sinais Internos de Dificuldades</h1>
      <div style={SS.divider} />
      <p style={{ fontSize:13, color:C.gray, marginBottom:18 }}>
        Como reconhecer o que acontece <strong>dentro de nós</strong> antes que vire sobrecarga:
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, flex:1 }}>
        {signals.map((s, i) => (
          <div key={i} style={{ background:C.bgCard, borderRadius:16, padding:"20px 22px",
                                boxShadow:"0 2px 14px rgba(0,0,0,0.06)",
                                display:"flex", alignItems:"flex-start", gap:14,
                                animation: visible ? `fadeUp 0.5s ${0.1+i*0.1}s ease both` : "none",
                                opacity: visible ? 1 : 0 }}>
            <span style={{ fontSize:34 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:700, fontSize:14, color:C.grayDark, marginBottom:4 }}>{s.label}</p>
              <p style={{ fontSize:12, color:C.gray, lineHeight:1.5 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:`${C.teal}15`, borderRadius:12, padding:"12px 18px",
                    marginTop:14, borderLeft:`4px solid ${C.teal}` }}>
        <p style={{ fontSize:12, color:C.grayDark }}>
          💡 <strong>Atenção:</strong> Esses sinais são naturais — o importante é reconhecê-los
          cedo para agir antes da sobrecarga se instalar.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 5 — SINAIS NO COMPORTAMENTO
══════════════════════════════════════════ */
function Slide05({ visible }) {
  const signals = [
    { icon:"📱", label:"Uso excessivo do celular",           desc:"atividades não relacionadas ao trabalho durante o expediente" },
    { icon:"⏰", label:"Atrasos e desorganização",           desc:"chegadas tardias ou dificuldade em manter a ordem das tarefas" },
    { icon:"📋", label:"Prazos não cumpridos",              desc:"tarefas realizadas de forma incompleta ou apressada" },
    { icon:"🌊", label:"Sobrecarga por falta de planejamento", desc:"acúmulo de tarefas por não organizar a rotina" },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Identificação · Parte B</p>
      <h1 style={SS.h1}>Sinais no Comportamento</h1>
      <div style={SS.divider} />
      <p style={{ fontSize:13, color:C.gray, marginBottom:16 }}>
        O que podemos observar <strong>nas ações do dia a dia</strong>:
      </p>

      <div style={{ display:"flex", flexDirection:"column", gap:11, flex:1 }}>
        {signals.map((s, i) => (
          <div key={i} style={{ background:C.bgCard, borderRadius:14, padding:"14px 20px",
                                display:"flex", alignItems:"center", gap:16,
                                boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                                borderLeft:`4px solid ${i%2===0 ? C.green2 : C.blue1}`,
                                animation: visible ? `fadeUp 0.4s ${0.1+i*0.1}s ease both` : "none",
                                opacity: visible ? 1 : 0 }}>
            <span style={{ fontSize:26, minWidth:36 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:600, fontSize:13, color:C.grayDark }}>{s.label}</p>
              <p style={{ fontSize:11, color:C.gray, marginTop:2 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:`${C.warn}18`, border:`1px solid ${C.warn}40`,
                    borderRadius:12, padding:"11px 18px", marginTop:10 }}>
        <p style={{ fontSize:12, color:C.grayDark }}>
          <strong>Exemplo:</strong> Se alguém chega atrasado, passa muito tempo no celular
          ou deixa tarefas acumularem, pode estar sofrendo de dificuldades de organização
          ou de sobrecarga mental.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 6 — IMPACTO DA DESORGANIZAÇÃO
══════════════════════════════════════════ */
function Slide06({ visible }) {
  const cols = [
    { color:C.danger, icon:"⚡", title:"Na execução",
      items:["Tarefas feitas de forma apressada","Erros por falta de planejamento","Retrabalho constante"] },
    { color:C.warn,   icon:"🧠", title:"Na saúde mental",
      items:["Aumento do estresse","Sensação de confusão e caos","Ansiedade crescente"] },
    { color:C.blue1,  icon:"👥", title:"Na equipe",
      items:["Conflitos internos","Atrasos coletivos","Sobrecarga distribuída"] },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Efeito em Cascata</p>
      <h1 style={SS.h1}>Como a Desorganização Impacta Saúde e Trabalho</h1>
      <div style={SS.divider} />

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginTop:6 }}>
        {cols.map((col, i) => (
          <div key={i} style={{ background:C.bgCard, borderRadius:16, padding:"18px",
                                boxShadow:"0 2px 14px rgba(0,0,0,0.06)",
                                animation: visible ? `fadeUp 0.5s ${0.1+i*0.15}s ease both` : "none",
                                opacity: visible ? 1 : 0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <span style={{ fontSize:22 }}>{col.icon}</span>
              <p style={{ fontWeight:700, fontSize:13, color:col.color }}>{col.title}</p>
            </div>
            {col.items.map((item, j) => (
              <p key={j} style={{ fontSize:12, color:C.grayDark, padding:"5px 0",
                                  borderBottom: j<2 ? `1px solid ${C.bg}` : "none",
                                  lineHeight:1.4 }}>→ {item}</p>
            ))}
          </div>
        ))}
      </div>

      <div style={{ background:C.bgCard, borderRadius:14, padding:"16px 22px", marginTop:16,
                    boxShadow:"0 2px 12px rgba(0,0,0,0.05)", borderLeft:`4px solid ${C.danger}` }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:16, color:C.grayDark, lineHeight:1.6 }}>
          "Perder tempo no celular ou distrações constantes aumentam a sensação de confusão
          e podem gerar ansiedade."
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE V1 — VÍDEO 1 (TELA CHEIA)
══════════════════════════════════════════ */
function SlideVideo1({ visible }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (visible) { ref.current.currentTime = 0; ref.current.play().catch(() => {}); }
    else          { ref.current.pause(); }
  }, [visible]);

  return (
    <div style={{ position:"absolute", inset:0, background:"#000",
                  opacity: visible ? 1 : 0, transition:"opacity 0.45s ease",
                  pointerEvents: visible ? "auto" : "none",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
      <video ref={ref} src="/video_1.mp4" controls
             style={{ width:"100%", height:"100%", objectFit:"contain" }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 7 — POR QUE ACONTECE
══════════════════════════════════════════ */
function Slide07({ visible }) {
  const reasons = [
    { icon:"🗓️", title:"Falta de organização na rotina",    desc:"Ausência de planejamento diário ou semanal" },
    { icon:"📦", title:"Sobrecarregamento de tarefas",       desc:"Mais demandas do que a capacidade de execução" },
    { icon:"🔀", title:"Dificuldade em priorizar",          desc:"Não saber o que é mais urgente ou importante" },
    { icon:"🗣️", title:"Falta de apoio ou instruções claras", desc:"Ausência de orientação da liderança ou equipe" },
    { icon:"🏃", title:"Fuga do estresse e ansiedade",      desc:"Comportamentos de distração como válvula de escape" },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Compreensão</p>
      <h1 style={SS.h1}>Por que Essas Atitudes Acontecem?</h1>
      <div style={SS.divider} />
      <p style={{ fontSize:13, color:C.gray, marginBottom:16 }}>
        Antes de julgar, é essencial compreender as causas:
      </p>

      <div style={{ display:"flex", flexDirection:"column", gap:9, flex:1 }}>
        {reasons.map((r, i) => (
          <div key={i} style={{ background:C.bgCard, borderRadius:12, padding:"13px 20px",
                                display:"flex", alignItems:"center", gap:14,
                                boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                                animation: visible ? `fadeUp 0.4s ${0.08+i*0.09}s ease both` : "none",
                                opacity: visible ? 1 : 0 }}>
            <span style={{ fontSize:22, minWidth:32 }}>{r.icon}</span>
            <div>
              <p style={{ fontWeight:600, fontSize:13, color:C.grayDark }}>{r.title}</p>
              <p style={{ fontSize:11, color:C.gray }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:`${C.green2}18`, borderRadius:12, padding:"11px 18px",
                    marginTop:12, borderLeft:`4px solid ${C.green2}` }}>
        <p style={{ fontSize:12, color:C.grayDark }}>
          💚 Às vezes, é uma forma de escapar do estresse ou da ansiedade — não é falta de vontade.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE V2 — VÍDEO 2 (TELA CHEIA)
══════════════════════════════════════════ */
function SlideVideo2({ visible }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (visible) { ref.current.currentTime = 0; ref.current.play().catch(() => {}); }
    else          { ref.current.pause(); }
  }, [visible]);

  return (
    <div style={{ position:"absolute", inset:0, background:"#000",
                  opacity: visible ? 1 : 0, transition:"opacity 0.45s ease",
                  pointerEvents: visible ? "auto" : "none",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
      <video ref={ref} src="/video_2.mp4" controls
             style={{ width:"100%", height:"100%", objectFit:"contain" }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 8 — ESTRATÉGIAS
══════════════════════════════════════════ */
function Slide08({ visible }) {
  const strategies = [
    { icon:"🍅", name:"Técnica Pomodoro",       detail:"25 min focado + 5 min pausa · A cada 4 ciclos, pausa longa de 15–30 min" },
    { icon:"🧮", name:"Matriz de Eisenhower",   detail:"Urgente+Importante → Faça agora · Importante → Planeje · Urgente → Delegue · Nenhum → Elimine" },
    { icon:"📅", name:"Planejamento Semanal",   detail:"10–15 min no início ou fim da semana · Use agendas ou apps (Todoist, Trello, Google Keep)" },
    { icon:"🎨", name:"Visualização por Cores", detail:"Use quadros, notas ou apps com cores para diferenciar atividades por categoria ou prioridade" },
    { icon:"📵", name:"Limite o Celular",       detail:"Defina horários para redes sociais · Modo silencioso durante foco · Apps de bloqueio de distração" },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Ferramentas Práticas</p>
      <h1 style={SS.h1}>Estratégias de Organização</h1>
      <div style={SS.divider} />

      <div style={{ display:"flex", flexDirection:"column", gap:9, flex:1 }}>
        {strategies.map((s, i) => (
          <div key={i} style={{ background:C.bgCard, borderRadius:12, padding:"12px 18px",
                                display:"flex", alignItems:"flex-start", gap:14,
                                boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
                                animation: visible ? `fadeUp 0.4s ${0.08+i*0.09}s ease both` : "none",
                                opacity: visible ? 1 : 0 }}>
            <span style={{ fontSize:24, minWidth:32, marginTop:2 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:700, fontSize:13, color:C.blue2, marginBottom:3 }}>{s.name}</p>
              <p style={{ fontSize:11, color:C.gray, lineHeight:1.55 }}>{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 9 — COMO AJUDAR
══════════════════════════════════════════ */
function Slide09({ visible }) {
  const actions = [
    { icon:"📝", text:"Incentivar o planejamento: fazer listas, dividir tarefas e definir prioridades" },
    { icon:"⏸️", text:"Promover pausas curtas para descanso mental" },
    { icon:"🛠️", text:"Ensinar técnicas simples de organização, como uso de agendas ou aplicativos" },
    { icon:"🏛️", text:"Criar um ambiente de trabalho mais estruturado, com regras claras" },
    { icon:"🤝", text:"Oferecer apoio e compreensão — sobrecarga e ansiedade precisam de acolhimento" },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Suporte ao Colaborador</p>
      <h1 style={SS.h1}>Como Ajudar o Colaborador a Melhorar?</h1>
      <div style={SS.divider} />

      <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        {actions.map((a, i) => (
          <div key={i} style={{ background:C.bgCard, borderRadius:13, padding:"14px 20px",
                                display:"flex", alignItems:"center", gap:14,
                                boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                                borderRight:`4px solid ${i%2===0 ? C.teal : C.green2}`,
                                animation: visible ? `fadeUp 0.4s ${0.1+i*0.1}s ease both` : "none",
                                opacity: visible ? 1 : 0 }}>
            <span style={{ fontSize:24, minWidth:32 }}>{a.icon}</span>
            <p style={{ fontSize:13, color:C.grayDark, lineHeight:1.5 }}>{a.text}</p>
          </div>
        ))}
      </div>

      <div style={{ background:`${C.teal}15`, borderRadius:12, padding:"11px 18px", marginTop:10 }}>
        <p style={{ fontSize:12, color:C.grayDark, fontStyle:"italic" }}>
          💚 "É importante oferecer apoio e compreensão, pois a sobrecarga e a ansiedade
          precisam ser enfrentadas de forma saudável."
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 10 — PAPEL DO LÍDER
══════════════════════════════════════════ */
function Slide10({ visible }) {
  const items = [
    { icon:"💬", title:"Conversar com empatia",    desc:"Sem julgamentos. Ouvir antes de concluir." },
    { icon:"🧭", title:"Oferecer orientação",      desc:"Ajudar no planejamento e organização das tarefas." },
    { icon:"📌", title:"Incentivar métodos",       desc:"Apresentar técnicas de organização acessíveis." },
    { icon:"❤️", title:"Sinalizar cuidado",        desc:"Destacar a importância de cuidar da saúde mental." },
  ];
  return (
    <div style={{ ...SS.slide(), opacity: visible ? 1 : 0 }}>
      <p style={SS.label}>Liderança e Pares</p>
      <h1 style={SS.h1}>Como o Líder ou Colega Pode Atuar?</h1>
      <div style={SS.divider} />

      <div style={{ background:C.bgCard, borderRadius:16, padding:"18px 24px",
                    boxShadow:"0 2px 16px rgba(0,0,0,0.06)", marginBottom:16 }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:16, color:C.blue2, lineHeight:1.6 }}>
          "Se perceber que alguém está distraído, desorganizado ou sobrecarregado..."
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, flex:1 }}>
        {items.map((it, i) => (
          <div key={i} style={{ background:C.bg, borderRadius:14, padding:"16px 18px",
                                animation: visible ? `fadeUp 0.5s ${0.1+i*0.12}s ease both` : "none",
                                opacity: visible ? 1 : 0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <span style={{ fontSize:22 }}>{it.icon}</span>
              <p style={{ fontWeight:700, fontSize:13, color:C.grayDark }}>{it.title}</p>
            </div>
            <p style={{ fontSize:12, color:C.gray, lineHeight:1.5 }}>{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 12 — PERGUNTAS (só título + subtítulo + observação)
══════════════════════════════════════════ */
function Slide12({ visible }) {
  return (
    <div style={{ ...SS.slide(C.bgCard), opacity: visible ? 1 : 0,
                  alignItems:"center", justifyContent:"center", textAlign:"center" }}>
      <Petals size={200} opacity={0.07} style={{ position:"absolute", top:20, right:40 }} />
      <Petals size={130} opacity={0.04} style={{ position:"absolute", bottom:60, left:30 }} />

      <div style={{ animation: visible ? "fadeUp 0.7s ease both" : "none", maxWidth:560 }}>
        <p style={{ ...SS.label, justifyContent:"center" }}>Engajamento</p>

        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:44,
                     color:C.blue2, lineHeight:1.15, margin:"12px 0 10px" }}>
          Perguntas para<br />Reflexão e Diálogo
        </h1>

        <div style={{ ...SS.divider, margin:"0 auto 24px" }} />

        <p style={{ fontSize:16, color:C.gray, lineHeight:1.75,
                    fontFamily:F.body, marginBottom:28 }}>
          Um momento de escuta ativa e troca honesta entre o grupo sobre
          organização, sobrecarga e saúde mental no trabalho.
        </p>

        <div style={{ background:`${C.teal}15`, borderRadius:14,
                      padding:"16px 24px", border:`1px solid ${C.teal}30` }}>
          <p style={{ fontSize:13, color:C.grayDark }}>
            📋 O formulário completo de avaliação da eficácia do treinamento
            é aplicado <strong>após 10 dias</strong> do encontro.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SLIDE 13 — ENCERRAMENTO
══════════════════════════════════════════ */
function Slide13({ visible }) {
  return (
    <div style={{ ...SS.slide(C.bgCard), opacity: visible ? 1 : 0,
                  alignItems:"center", justifyContent:"center", textAlign:"center" }}>
      <Petals size={200} opacity={0.07} style={{ position:"absolute", top:10, left:40 }} />
      <Petals size={130} opacity={0.04} style={{ position:"absolute", bottom:60, right:40 }} />

      <div style={{ animation: visible ? "fadeUp 0.7s ease both" : "none", maxWidth:540 }}>
        <Logo height={80} style={{ margin:"0 auto 22px" }} />
        <p style={SS.label}>Encerramento</p>

        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:30,
                     color:C.blue2, lineHeight:1.3, marginBottom:14 }}>
          Cuide de si para cuidar do ambiente
        </h1>

        <div style={{ ...SS.divider, margin:"0 auto 20px" }} />

        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22, textAlign:"left" }}>
          {[
            "Cuidar da saúde mental também envolve organizar melhor a nossa rotina.",
            "Saiba reconhecer sinais de sobrecarga e busque apoio quando necessário.",
            "Comece com pequenas mudanças: planeje o seu dia e converse com alguém de confiança.",
          ].map((t, i) => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start",
                                  background:C.bg, borderRadius:12, padding:"12px 16px" }}>
              <span style={{ color:C.green2, fontWeight:700, fontSize:16, marginTop:1 }}>✓</span>
              <p style={{ fontSize:13, color:C.grayDark, lineHeight:1.5 }}>{t}</p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:18,
                    color:C.teal, lineHeight:1.6 }}>
          "Cada um de nós é responsável por um ambiente mais saudável e produtivo."
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DEFINIÇÃO DOS SLIDES (ordem final)
══════════════════════════════════════════ */
const SLIDES = [
  { comp: Slide01,     title: "Capa",                              video: false },
  { comp: Slide02,     title: "1. Propósito",                      video: false },
  { comp: Slide03,     title: "2. Fatores de Risco",               video: false },
  { comp: Slide04,     title: "3a. Sinais Internos",               video: false },
  { comp: Slide05,     title: "3b. Sinais no Comportamento",       video: false },
  { comp: Slide06,     title: "4. Impacto da Desorganização",      video: false },
  { comp: SlideVideo1, title: "▶ Vídeo 1",                         video: true  },
  { comp: Slide07,     title: "5. Por que Acontece?",              video: false },
  { comp: SlideVideo2, title: "▶ Vídeo 2",                         video: true  },
  { comp: Slide08,     title: "6. Estratégias de Organização",     video: false },
  { comp: Slide09,     title: "7. Como Ajudar",                    video: false },
  { comp: Slide10,     title: "8. Papel do Líder",                 video: false },
  { comp: Slide12,     title: "9. Reflexão e Diálogo",             video: false },
  { comp: Slide13,     title: "Encerramento",                      video: false },
];

/* ══════════════════════════════════════════
   APP PRINCIPAL
══════════════════════════════════════════ */
export default function App() {
  const [cur, setCur] = useState(0);
  const go = useCallback(
    (d) => setCur(c => Math.max(0, Math.min(SLIDES.length - 1, c + d))),
    []
  );

  useEffect(() => {
    const h = (e) => {
      if (["ArrowRight","ArrowDown"," "].includes(e.key)) { e.preventDefault(); go(1); }
      if (["ArrowLeft","ArrowUp"].includes(e.key))        { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  const isVideo = SLIDES[cur].video;

  return (
    <>
      <FontLoader />
      <div style={SS.app}>

        {/* Barra de progresso */}
        <div style={{ position:"fixed", top:0, left:0, right:0, height:3, zIndex:201, background:"#E8EDE0" }}>
          <div style={{ height:"100%", background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                        width:`${((cur+1)/SLIDES.length)*100}%`, transition:"width 0.4s ease" }} />
        </div>

        {/* Contador (oculto nos vídeos) */}
        {!isVideo && (
          <div style={{ position:"fixed", top:10, right:20, zIndex:201, textAlign:"right",
                        fontFamily:F.body, fontWeight:500 }}>
            <div style={{ fontSize:11, color:C.grayLight }}>{cur+1} / {SLIDES.length}</div>
            <div style={{ fontSize:10, color:C.grayLight, opacity:0.7 }}>{SLIDES[cur].title}</div>
          </div>
        )}

        {/* Slides */}
        <div style={{ position:"relative", width:"100%", height:"100%" }}>
          {SLIDES.map((sd, i) => {
            const Comp = sd.comp;
            return (
              <div key={i} style={{ pointerEvents: i === cur ? "auto" : "none" }}>
                <Comp visible={i === cur} />
              </div>
            );
          })}
        </div>

        {/* Navegação */}
        <div style={{ ...SS.nav,
                      background: isVideo ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.93)" }}>
          <button onClick={() => go(-1)}
                  style={{ ...SS.navBtn(isVideo), opacity: cur===0 ? 0.3 : 1 }}
                  disabled={cur===0}>‹</button>

          <div style={{ display:"flex", gap:4, margin:"0 10px", alignItems:"center" }}>
            {SLIDES.map((sd, i) => (
              <button key={i} onClick={() => setCur(i)}
                      style={SS.dot(i===cur)} title={sd.title} />
            ))}
          </div>

          <button onClick={() => go(1)}
                  style={{ ...SS.navBtn(isVideo), opacity: cur===SLIDES.length-1 ? 0.3 : 1 }}
                  disabled={cur===SLIDES.length-1}>›</button>
        </div>

      </div>
    </>
  );
}
