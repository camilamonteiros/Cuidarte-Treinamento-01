import { useState, useEffect, useCallback, useRef } from "react";

const C = {
  green2: "#7CB342", green3: "#4A8C3F", green1: "#B8D94E",
  teal: "#3A9E91", blue1: "#2E86C1", blue2: "#1A5276",
  gray: "#8A8A8A", grayDark: "#4A4A4A", grayLight: "#C5C5C5",
  bg: "#F7F9F4", card: "#FFFFFF",
  danger: "#E8734A", warn: "#F5A623",
};
const F = {
  title: "'Cormorant Garamond', Georgia, serif",
  body:  "'Outfit', 'Segoe UI', sans-serif",
};

/* ── canvas fixo 1280×720, escala para preencher a janela ── */
function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return scale;
}

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html, body, #root { width:100%; height:100%; overflow:hidden; background:#111; }
    button { cursor:pointer; border:none; background:none; font-family:inherit; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
  `}</style>
);

function Petals({ size = 100, opacity = 0.12, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
         style={{ ...style, opacity, flexShrink:0, pointerEvents:"none" }}>
      {[0,60,120,180,240,300].map((rot,i) => (
        <ellipse key={i} cx="50" cy="50" rx="12" ry="28"
          transform={`rotate(${rot} 50 50) translate(0 -14)`}
          fill={i%2===0 ? C.green2 : C.blue1} opacity="0.7"/>
      ))}
      <circle cx="50" cy="50" r="7" fill={C.teal} opacity="0.9"/>
    </svg>
  );
}

function Logo({ height=110, style={} }) {
  return <img src="/logo-cuidarte.png" alt="Cuidarte"
              style={{ height, objectFit:"contain", display:"block", ...style }}/>;
}

/* divisor gradiente */
const Div = ({ cx="auto" }) => (
  <div style={{ width:48, height:2, background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                margin:`12px ${cx} 12px 0` }} />
);

/* label de seção */
const Label = ({ children }) => (
  <p style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase",
              color:C.teal, fontWeight:600, fontFamily:F.body, marginBottom:6 }}>
    {children}
  </p>
);

/* ════════════════════════════════════════════
   SLIDES (1280 × 720 px, padding 52 64)
════════════════════════════════════════════ */

/* SLIDE 1 — CAPA */
function Slide01({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.card, position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  textAlign:"center", overflow:"hidden" }}>
      <Petals size={280} opacity={0.07} style={{ position:"absolute", top:-40, right:-20 }}/>
      <Petals size={160} opacity={0.05} style={{ position:"absolute", bottom:-20, left:0 }}/>
      <div style={{ animation: v ? "fadeUp .7s ease both" : "none" }}>
        <Logo height={140} style={{ margin:"0 auto 24px" }}/>
        <Div cx="auto"/>
        <p style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase",
                    color:C.teal, fontWeight:600, marginBottom:10 }}>MIND CORPORATIVO</p>
        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:52, color:C.blue2,
                     lineHeight:1.1, marginBottom:10 }}>Treinamento 1</h1>
        <h2 style={{ fontFamily:F.title, fontWeight:400, fontSize:30, color:C.teal,
                     marginBottom:18 }}>Reconhecimento das Demandas</h2>
        <p style={{ fontSize:15, color:C.gray, maxWidth:480, margin:"0 auto" }}>
          Saúde mental no trabalho · Organização · Sinais de sobrecarga
        </p>
      </div>
    </div>
  );
}

/* SLIDE 2 — PROPÓSITO */
function Slide02({ v }) {
  const items = [
    { icon:"🧠", label:"Entender sinais",      desc:"Reconhecer sobrecarga em si e nos colegas" },
    { icon:"⚠️", label:"Fatores de risco",     desc:"Identificar o que aumenta o estresse" },
    { icon:"✅", label:"Estratégias práticas", desc:"Ferramentas para organizar melhor a rotina" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 52px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Abertura</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Boas-vindas e Propósito</h1>
      <Div/>
      <div style={{ background:C.card, borderRadius:16, padding:"24px 28px",
                    boxShadow:"0 2px 20px rgba(0,0,0,0.06)", flex:1,
                    position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", gap:16 }}>
        <Petals size={140} opacity={0.05} style={{ position:"absolute", right:-10, top:-10 }}/>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:21, color:C.blue2, lineHeight:1.65 }}>
          "Hoje vamos falar sobre saúde mental no trabalho e como podemos fazer
          para melhorar a gestão do ambiente para todos."
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, flex:1 }}>
          {items.map((it,i) => (
            <div key={i} style={{ background:C.bg, borderRadius:14, padding:"18px 20px",
                                  animation: v ? `fadeUp .5s ${.2+i*.12}s ease both` : "none",
                                  opacity: v ? 1 : 0 }}>
              <span style={{ fontSize:30 }}>{it.icon}</span>
              <p style={{ fontWeight:700, fontSize:15, color:C.grayDark, margin:"10px 0 6px" }}>{it.label}</p>
              <p style={{ fontSize:13, color:C.gray, lineHeight:1.5 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop:12, fontSize:13, color:C.gray, fontStyle:"italic", textAlign:"center" }}>
        "Isso enquanto fator que pode prejudicar a sua rotina."
      </p>
    </div>
  );
}

/* SLIDE 3 — FATORES DE RISCO */
function Slide03({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Conceito Central</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        O que são Fatores de Risco no Trabalho?</h1>
      <Div/>
      <div style={{ background:C.card, borderRadius:16, padding:"18px 24px",
                    boxShadow:"0 2px 16px rgba(0,0,0,0.06)", marginBottom:16 }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:19, color:C.blue2, lineHeight:1.6 }}>
          "São elementos na gestão de trabalho que podem aumentar o estresse, a ansiedade
          ou causar problemas de saúde mental."
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, flex:1 }}>
        {[
          { bg:`${C.green2}18`, border:`${C.green2}50`, tc:C.green3, icon:"⚡", title:"Fatores Organizacionais",
            items:["Sobrecarga de tarefas","Falta de clareza nas instruções","Ausência de apoio","Prazos excessivamente curtos"] },
          { bg:`${C.blue1}18`, border:`${C.blue1}50`, tc:C.blue2, icon:"📱", title:"Fatores Comportamentais",
            items:["Uso excessivo do celular","Atrasos e desorganização","Não cumprimento de prazos","Tarefas incompletas ou apressadas"] },
        ].map((col,i) => (
          <div key={i} style={{ background:`linear-gradient(135deg,${col.bg},transparent)`,
                                border:`1.5px solid ${col.border}`, borderRadius:14, padding:"20px 22px" }}>
            <p style={{ fontWeight:700, fontSize:14, color:col.tc, marginBottom:12 }}>{col.icon} {col.title}</p>
            {col.items.map((t,j) => (
              <p key={j} style={{ fontSize:13, color:C.grayDark, padding:"6px 0",
                                  borderBottom: j<3 ? `1px solid ${col.border}` : "none" }}>→ {t}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background:`${C.warn}20`, border:`1.5px solid ${C.warn}60`,
                    borderRadius:12, padding:"12px 20px", marginTop:14 }}>
        <p style={{ fontSize:13, color:C.grayDark }}>
          <strong>Exemplo:</strong> Quando alguém passa muito tempo no celular, perde prazos
          ou demora para concluir tarefas, isso pode afetar toda a equipe.
        </p>
      </div>
    </div>
  );
}

/* SLIDE 4 — SINAIS INTERNOS */
function Slide04({ v }) {
  const signals = [
    { icon:"😴", label:"Cansaço constante",    desc:"mesmo após descanso adequado" },
    { icon:"😰", label:"Ansiedade e irritação", desc:"ou desmotivação frequente" },
    { icon:"🌀", label:"Dificuldade de foco",  desc:"esquecimento ou distração recorrente" },
    { icon:"😞", label:"Frustração",           desc:"sentimentos de baixa autoestima" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Identificação · Parte A</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Sinais Internos de Dificuldades</h1>
      <Div/>
      <p style={{ fontSize:14, color:C.gray, marginBottom:18 }}>
        Como reconhecer o que acontece <strong>dentro de nós</strong> antes que vire sobrecarga:
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, flex:1 }}>
        {signals.map((s,i) => (
          <div key={i} style={{ background:C.card, borderRadius:16, padding:"22px 26px",
                                boxShadow:"0 2px 14px rgba(0,0,0,0.06)",
                                display:"flex", alignItems:"flex-start", gap:18,
                                animation: v ? `fadeUp .5s ${.1+i*.1}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:42 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:700, fontSize:16, color:C.grayDark, marginBottom:6 }}>{s.label}</p>
              <p style={{ fontSize:13, color:C.gray, lineHeight:1.5 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.teal}15`, borderRadius:12, padding:"14px 20px",
                    marginTop:14, borderLeft:`4px solid ${C.teal}` }}>
        <p style={{ fontSize:13, color:C.grayDark }}>
          💡 <strong>Atenção:</strong> Esses sinais são naturais — o importante é reconhecê-los
          cedo para agir antes da sobrecarga se instalar.
        </p>
      </div>
    </div>
  );
}

/* SLIDE 5 — SINAIS NO COMPORTAMENTO */
function Slide05({ v }) {
  const signals = [
    { icon:"📱", label:"Uso excessivo do celular",            desc:"atividades não relacionadas ao trabalho durante o expediente" },
    { icon:"⏰", label:"Atrasos e desorganização",            desc:"chegadas tardias ou dificuldade em manter a ordem das tarefas" },
    { icon:"📋", label:"Prazos não cumpridos",               desc:"tarefas realizadas de forma incompleta ou apressada" },
    { icon:"🌊", label:"Sobrecarga por falta de planejamento", desc:"acúmulo de tarefas por não organizar a rotina" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Identificação · Parte B</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Sinais no Comportamento</h1>
      <Div/>
      <p style={{ fontSize:14, color:C.gray, marginBottom:16 }}>
        O que podemos observar <strong>nas ações do dia a dia</strong>:
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        {signals.map((s,i) => (
          <div key={i} style={{ background:C.card, borderRadius:14, padding:"16px 22px",
                                display:"flex", alignItems:"center", gap:18,
                                boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                                borderLeft:`5px solid ${i%2===0 ? C.green2 : C.blue1}`,
                                animation: v ? `fadeUp .4s ${.1+i*.1}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:30, minWidth:40 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:600, fontSize:15, color:C.grayDark }}>{s.label}</p>
              <p style={{ fontSize:12, color:C.gray, marginTop:3 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.warn}20`, border:`1px solid ${C.warn}50`,
                    borderRadius:12, padding:"12px 20px", marginTop:12 }}>
        <p style={{ fontSize:13, color:C.grayDark }}>
          <strong>Exemplo:</strong> Se alguém chega atrasado, passa muito tempo no celular
          ou deixa tarefas acumularem, pode estar sofrendo de sobrecarga mental.
        </p>
      </div>
    </div>
  );
}

/* SLIDE 6 — IMPACTO DA DESORGANIZAÇÃO */
function Slide06({ v }) {
  const cols = [
    { color:C.danger, icon:"⚡", title:"Na execução",
      items:["Tarefas feitas de forma apressada","Erros por falta de planejamento","Retrabalho constante"] },
    { color:C.warn, icon:"🧠", title:"Na saúde mental",
      items:["Aumento do estresse","Sensação de confusão e caos","Ansiedade crescente"] },
    { color:C.blue1, icon:"👥", title:"Na equipe",
      items:["Conflitos internos","Atrasos coletivos","Sobrecarga distribuída"] },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Efeito em Cascata</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Como a Desorganização Impacta Saúde e Trabalho</h1>
      <Div/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, flex:1 }}>
        {cols.map((col,i) => (
          <div key={i} style={{ background:C.card, borderRadius:16, padding:"22px 20px",
                                boxShadow:"0 2px 14px rgba(0,0,0,0.06)",
                                animation: v ? `fadeUp .5s ${.1+i*.15}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <span style={{ fontSize:26 }}>{col.icon}</span>
              <p style={{ fontWeight:700, fontSize:15, color:col.color }}>{col.title}</p>
            </div>
            {col.items.map((item,j) => (
              <p key={j} style={{ fontSize:13, color:C.grayDark, padding:"7px 0",
                                  borderBottom: j<2 ? `1px solid ${C.bg}` : "none",
                                  lineHeight:1.4 }}>→ {item}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background:C.card, borderRadius:14, padding:"16px 22px", marginTop:16,
                    boxShadow:"0 2px 12px rgba(0,0,0,0.05)", borderLeft:`5px solid ${C.danger}` }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:18, color:C.grayDark, lineHeight:1.6 }}>
          "Perder tempo no celular ou distrações constantes aumentam a sensação de confusão
          e podem gerar ansiedade."
        </p>
      </div>
    </div>
  );
}

/* SLIDE V1 — VÍDEO 1 */
function SlideVideo1({ v }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (v) { ref.current.currentTime=0; ref.current.play().catch(()=>{}); }
    else ref.current.pause();
  }, [v]);
  return (
    <div style={{ width:1280, height:720, background:"#000",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
      <video ref={ref} src="/video_1.mp4" controls
             style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
    </div>
  );
}

/* SLIDE 7 — POR QUE ACONTECE */
function Slide07({ v }) {
  const reasons = [
    { icon:"🗓️", title:"Falta de organização na rotina",      desc:"Ausência de planejamento diário ou semanal" },
    { icon:"📦", title:"Sobrecarregamento de tarefas",         desc:"Mais demandas do que a capacidade de execução" },
    { icon:"🔀", title:"Dificuldade em priorizar",            desc:"Não saber o que é mais urgente ou importante" },
    { icon:"🗣️", title:"Falta de apoio ou instruções claras", desc:"Ausência de orientação da liderança ou equipe" },
    { icon:"🏃", title:"Fuga do estresse e ansiedade",        desc:"Comportamentos de distração como válvula de escape" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Compreensão</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Por que Essas Atitudes Acontecem?</h1>
      <Div/>
      <p style={{ fontSize:14, color:C.gray, marginBottom:14 }}>
        Antes de julgar, é essencial compreender as causas:
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:8, flex:1 }}>
        {reasons.map((r,i) => (
          <div key={i} style={{ background:C.card, borderRadius:12, padding:"14px 22px",
                                display:"flex", alignItems:"center", gap:16,
                                boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
                                animation: v ? `fadeUp .4s ${.08+i*.09}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:26, minWidth:36 }}>{r.icon}</span>
            <div>
              <p style={{ fontWeight:600, fontSize:15, color:C.grayDark }}>{r.title}</p>
              <p style={{ fontSize:12, color:C.gray }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.green2}18`, borderRadius:12, padding:"12px 20px",
                    marginTop:12, borderLeft:`4px solid ${C.green2}` }}>
        <p style={{ fontSize:13, color:C.grayDark }}>
          💚 Às vezes, é uma forma de escapar do estresse ou da ansiedade — não é falta de vontade.
        </p>
      </div>
    </div>
  );
}

/* SLIDE V2 — VÍDEO 2 */
function SlideVideo2({ v }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (v) { ref.current.currentTime=0; ref.current.play().catch(()=>{}); }
    else ref.current.pause();
  }, [v]);
  return (
    <div style={{ width:1280, height:720, background:"#000",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
      <video ref={ref} src="/video_2.mp4" controls
             style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
    </div>
  );
}

/* SLIDE 8 — ESTRATÉGIAS */
function Slide08({ v }) {
  const st = [
    { icon:"🍅", name:"Técnica Pomodoro",       detail:"25 min focado + 5 min pausa · A cada 4 ciclos, pausa longa de 15–30 min" },
    { icon:"🧮", name:"Matriz de Eisenhower",   detail:"Urgente+Importante → Faça agora · Importante → Planeje · Urgente → Delegue · Nenhum → Elimine" },
    { icon:"📅", name:"Planejamento Semanal",   detail:"10–15 min no início ou fim da semana · Use agendas ou apps (Todoist, Trello, Google Keep)" },
    { icon:"🎨", name:"Visualização por Cores", detail:"Use quadros, notas ou apps com cores para diferenciar atividades por categoria ou prioridade" },
    { icon:"📵", name:"Limite o Celular",       detail:"Defina horários para redes sociais · Modo silencioso durante foco · Apps de bloqueio de distração" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Ferramentas Práticas</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Estratégias de Organização</h1>
      <Div/>
      <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        {st.map((s,i) => (
          <div key={i} style={{ background:C.card, borderRadius:12, padding:"14px 20px",
                                display:"flex", alignItems:"flex-start", gap:16,
                                boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
                                animation: v ? `fadeUp .4s ${.08+i*.09}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:28, minWidth:36, marginTop:2 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:700, fontSize:15, color:C.blue2, marginBottom:4 }}>{s.name}</p>
              <p style={{ fontSize:13, color:C.gray, lineHeight:1.55 }}>{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* SLIDE 9 — COMO AJUDAR */
function Slide09({ v }) {
  const actions = [
    { icon:"📝", text:"Incentivar o planejamento: fazer listas, dividir tarefas e definir prioridades" },
    { icon:"⏸️", text:"Promover pausas curtas para descanso mental" },
    { icon:"🛠️", text:"Ensinar técnicas simples de organização, como uso de agendas ou aplicativos" },
    { icon:"🏛️", text:"Criar um ambiente de trabalho mais estruturado, com regras claras" },
    { icon:"🤝", text:"Oferecer apoio e compreensão — sobrecarga e ansiedade precisam de acolhimento" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Suporte ao Colaborador</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Como Ajudar o Colaborador a Melhorar?</h1>
      <Div/>
      <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        {actions.map((a,i) => (
          <div key={i} style={{ background:C.card, borderRadius:13, padding:"16px 22px",
                                display:"flex", alignItems:"center", gap:16,
                                boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                                borderRight:`5px solid ${i%2===0 ? C.teal : C.green2}`,
                                animation: v ? `fadeUp .4s ${.1+i*.1}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:28, minWidth:36 }}>{a.icon}</span>
            <p style={{ fontSize:14, color:C.grayDark, lineHeight:1.5 }}>{a.text}</p>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.teal}15`, borderRadius:12, padding:"12px 20px", marginTop:12 }}>
        <p style={{ fontSize:13, color:C.grayDark, fontStyle:"italic" }}>
          💚 "É importante oferecer apoio e compreensão, pois a sobrecarga e a ansiedade
          precisam ser enfrentadas de forma saudável."
        </p>
      </div>
    </div>
  );
}

/* SLIDE 10 — PAPEL DO LÍDER */
function Slide10({ v }) {
  const items = [
    { icon:"💬", title:"Conversar com empatia", desc:"Sem julgamentos. Ouvir antes de concluir." },
    { icon:"🧭", title:"Oferecer orientação",   desc:"Ajudar no planejamento e organização das tarefas." },
    { icon:"📌", title:"Incentivar métodos",    desc:"Apresentar técnicas de organização acessíveis." },
    { icon:"❤️", title:"Sinalizar cuidado",     desc:"Destacar a importância de cuidar da saúde mental." },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:"52px 64px 48px",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Liderança e Pares</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36, color:C.blue2, marginBottom:6 }}>
        Como o Líder ou Colega Pode Atuar?</h1>
      <Div/>
      <div style={{ background:C.card, borderRadius:16, padding:"20px 26px",
                    boxShadow:"0 2px 16px rgba(0,0,0,0.06)", marginBottom:16 }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:19, color:C.blue2, lineHeight:1.6 }}>
          "Se perceber que alguém está distraído, desorganizado ou sobrecarregado..."
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, flex:1 }}>
        {items.map((it,i) => (
          <div key={i} style={{ background:C.bg, borderRadius:14, padding:"20px 22px",
                                animation: v ? `fadeUp .5s ${.1+i*.12}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
              <span style={{ fontSize:26 }}>{it.icon}</span>
              <p style={{ fontWeight:700, fontSize:15, color:C.grayDark }}>{it.title}</p>
            </div>
            <p style={{ fontSize:13, color:C.gray, lineHeight:1.5 }}>{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* SLIDE 12 — PERGUNTAS (título + subtítulo + observação) */
function Slide12({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.card, position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  textAlign:"center", overflow:"hidden" }}>
      <Petals size={260} opacity={0.07} style={{ position:"absolute", top:20, right:30 }}/>
      <Petals size={160} opacity={0.04} style={{ position:"absolute", bottom:20, left:30 }}/>
      <div style={{ animation: v ? "fadeUp .7s ease both" : "none", maxWidth:680 }}>
        <p style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase",
                    color:C.teal, fontWeight:600, marginBottom:10 }}>ENGAJAMENTO</p>
        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:56,
                     color:C.blue2, lineHeight:1.1, marginBottom:14 }}>
          Perguntas para<br/>Reflexão e Diálogo
        </h1>
        <div style={{ width:48, height:2, background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                      margin:"0 auto 28px" }}/>
        <p style={{ fontSize:18, color:C.gray, lineHeight:1.75, marginBottom:32 }}>
          Um momento de escuta ativa e troca honesta entre o grupo sobre
          organização, sobrecarga e saúde mental no trabalho.
        </p>
        <div style={{ background:`${C.teal}15`, borderRadius:16,
                      padding:"18px 28px", border:`1px solid ${C.teal}30` }}>
          <p style={{ fontSize:15, color:C.grayDark }}>
            📋 O formulário completo de avaliação da eficácia do treinamento
            é aplicado <strong>após 10 dias</strong> do encontro.
          </p>
        </div>
      </div>
    </div>
  );
}

/* SLIDE 13 — ENCERRAMENTO */
function Slide13({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.card, position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  textAlign:"center", overflow:"hidden" }}>
      <Petals size={260} opacity={0.07} style={{ position:"absolute", top:10, left:30 }}/>
      <Petals size={160} opacity={0.04} style={{ position:"absolute", bottom:10, right:30 }}/>
      <div style={{ animation: v ? "fadeUp .7s ease both" : "none", maxWidth:580 }}>
        <Logo height={90} style={{ margin:"0 auto 22px" }}/>
        <p style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase",
                    color:C.teal, fontWeight:600, marginBottom:10 }}>ENCERRAMENTO</p>
        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:36,
                     color:C.blue2, lineHeight:1.25, marginBottom:16 }}>
          Cuide de si para cuidar do ambiente
        </h1>
        <div style={{ width:48, height:2, background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                      margin:"0 auto 22px" }}/>
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24, textAlign:"left" }}>
          {[
            "Cuidar da saúde mental também envolve organizar melhor a nossa rotina.",
            "Saiba reconhecer sinais de sobrecarga e busque apoio quando necessário.",
            "Comece com pequenas mudanças: planeje o seu dia e converse com alguém de confiança.",
          ].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start",
                                  background:C.bg, borderRadius:12, padding:"14px 18px" }}>
              <span style={{ color:C.green2, fontWeight:700, fontSize:18, marginTop:1 }}>✓</span>
              <p style={{ fontSize:15, color:C.grayDark, lineHeight:1.5 }}>{t}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:20,
                    color:C.teal, lineHeight:1.6 }}>
          "Cada um de nós é responsável por um ambiente mais saudável e produtivo."
        </p>
      </div>
    </div>
  );
}

/* ── LISTA DE SLIDES ── */
const SLIDES = [
  { comp:Slide01,    title:"Capa",                         video:false },
  { comp:Slide02,    title:"1. Propósito",                  video:false },
  { comp:Slide03,    title:"2. Fatores de Risco",           video:false },
  { comp:Slide04,    title:"3a. Sinais Internos",           video:false },
  { comp:Slide05,    title:"3b. Sinais no Comportamento",   video:false },
  { comp:Slide06,    title:"4. Impacto da Desorganização",  video:false },
  { comp:SlideVideo1,title:"▶ Vídeo 1",                    video:true  },
  { comp:Slide07,    title:"5. Por que Acontece?",          video:false },
  { comp:SlideVideo2,title:"▶ Vídeo 2",                    video:true  },
  { comp:Slide08,    title:"6. Estratégias",                video:false },
  { comp:Slide09,    title:"7. Como Ajudar",                video:false },
  { comp:Slide10,    title:"8. Papel do Líder",             video:false },
  { comp:Slide12,    title:"9. Reflexão e Diálogo",         video:false },
  { comp:Slide13,    title:"Encerramento",                  video:false },
];

/* ── APP ── */
export default function App() {
  const [cur, setCur] = useState(0);
  const scale = useScale();
  const go = useCallback(
    (d) => setCur(c => Math.max(0, Math.min(SLIDES.length-1, c+d))), []
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
      <FontLoader/>
      {/* Wrapper centraliza e escala o canvas 1280×720 */}
      <div style={{ width:"100vw", height:"100vh", display:"flex",
                    alignItems:"center", justifyContent:"center",
                    background:"#111", position:"relative" }}>

        <div style={{ width:1280, height:720, position:"relative", overflow:"hidden",
                      transform:`scale(${scale})`, transformOrigin:"center center",
                      boxShadow:"0 8px 60px rgba(0,0,0,0.5)" }}>

          {/* barra de progresso */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, zIndex:200,
                        background:"#E8EDE0" }}>
            <div style={{ height:"100%", background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                          width:`${((cur+1)/SLIDES.length)*100}%`, transition:"width .4s ease" }}/>
          </div>

          {/* contador */}
          {!isVideo && (
            <div style={{ position:"absolute", top:12, right:22, zIndex:200,
                          textAlign:"right", fontFamily:F.body }}>
              <div style={{ fontSize:12, color:C.grayLight }}>{cur+1} / {SLIDES.length}</div>
              <div style={{ fontSize:11, color:C.grayLight, opacity:.7 }}>{SLIDES[cur].title}</div>
            </div>
          )}

          {/* slides — todos montados, só o atual visível */}
          {SLIDES.map((sd,i) => {
            const Comp = sd.comp;
            return (
              <div key={i} style={{ position:"absolute", inset:0,
                                    opacity: i===cur ? 1 : 0,
                                    transition:"opacity .45s ease",
                                    pointerEvents: i===cur ? "auto" : "none" }}>
                <Comp v={i===cur}/>
              </div>
            );
          })}

          {/* navegação */}
          <div style={{ position:"absolute", bottom:18, left:"50%",
                        transform:"translateX(-50%)", zIndex:200,
                        display:"flex", alignItems:"center", gap:6,
                        background: isVideo ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.93)",
                        borderRadius:40, padding:"7px 16px",
                        boxShadow:"0 4px 24px rgba(0,0,0,0.15)" }}>
            <button onClick={() => go(-1)}
                    style={{ width:34, height:34, borderRadius:"50%", fontSize:20,
                             color: isVideo ? "#fff" : C.blue2,
                             display:"flex", alignItems:"center", justifyContent:"center",
                             opacity: cur===0 ? .3 : 1 }} disabled={cur===0}>‹</button>
            <div style={{ display:"flex", gap:4, alignItems:"center" }}>
              {SLIDES.map((_,i) => (
                <button key={i} onClick={() => setCur(i)}
                        style={{ width: i===cur ? 22 : 8, height:8, borderRadius:4, padding:0,
                                 background: i===cur ? C.blue1 : C.grayLight,
                                 transition:"all .3s", border:"none", cursor:"pointer" }}
                        title={SLIDES[i].title}/>
              ))}
            </div>
            <button onClick={() => go(1)}
                    style={{ width:34, height:34, borderRadius:"50%", fontSize:20,
                             color: isVideo ? "#fff" : C.blue2,
                             display:"flex", alignItems:"center", justifyContent:"center",
                             opacity: cur===SLIDES.length-1 ? .3 : 1 }}
                    disabled={cur===SLIDES.length-1}>›</button>
          </div>

        </div>
      </div>
    </>
  );
}
