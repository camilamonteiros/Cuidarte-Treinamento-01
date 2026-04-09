import { useState, useEffect, useCallback, useRef } from "react";
const QR_CODE = "data:image/jpeg;base64,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";

const C = {
  green2: "#7CB342", green3: "#4A8C3F", green1: "#B8D94E",
  teal: "#3A9E91", blue1: "#2E86C1", blue2: "#1A5276",
  gray: "#8A8A8A", grayDark: "#4A4A4A", grayLight: "#C5C5C5",
  bg: "#F7F9F4", card: "#FFFFFF",
  danger: "#E8734A", warn: "#F5A623",
};
const F = {
  title: "'Cormorant Garamond', Georgia, serif",
  body: "'Outfit', 'Segoe UI', sans-serif",
};

// ── MUDANÇA 1: usa Math.max para preencher toda a tela ──
function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const calc = () =>
      setScale(Math.max(window.innerWidth / 1280, window.innerHeight / 720));
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
    html, body, #root { width:100%; height:100%; overflow:hidden; background:#F7F9F4; }
    button { cursor:pointer; border:none; background:none; font-family:inherit; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    @keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(124,179,66,0.4)} 50%{box-shadow:0 0 0 8px rgba(124,179,66,0)} }
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

// ── MUDANÇA 2: prop `center` centraliza a linha quando necessário ──
const Div = ({ cx="auto", center=false }) => (
  <div style={{
    width:56, height:2,
    background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
    margin: center ? "14px auto" : `14px ${cx} 14px 0`,
  }} />
);

const Label = ({ children }) => (
  <p style={{ fontSize:14, letterSpacing:"0.18em", textTransform:"uppercase",
              color:C.teal, fontWeight:600, fontFamily:F.body, marginBottom:6 }}>
    {children}
  </p>
);

function QrBadge({ dark = false }) {
  return (
    <div style={{
      position:"absolute", bottom:88, right:18, zIndex:100,
      background: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.92)",
      borderRadius:10, padding:"6px 8px",
      boxShadow:"0 2px 12px rgba(0,0,0,0.18)",
      display:"flex", flexDirection:"column", alignItems:"center", gap:4
    }}>
      <img src={QR_CODE} alt="QR Lista" style={{ width:56, height:56, borderRadius:4 }}/>
      <span style={{
        fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase",
        color: dark ? "#ccc" : C.gray, fontFamily:F.body, fontWeight:600
      }}>Lista</span>
    </div>
  );
}

const SLIDE_PAD = "48px 64px 80px 64px";

/* ═══════════════════════════════ SLIDES ═══════════════════════════════ */

// SLIDE 01 – Capa  ← linha centralizada com <Div center />
function Slide01({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.card, position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  textAlign:"center", overflow:"hidden", paddingBottom:80 }}>
      <Petals size={280} opacity={0.07} style={{ position:"absolute", top:-40, right:-20 }}/>
      <Petals size={160} opacity={0.05} style={{ position:"absolute", bottom:-20, left:0 }}/>
      <div style={{ animation: v ? "fadeUp .7s ease both" : "none" }}>
        <Logo height={140} style={{ margin:"0 auto 24px" }}/>
        {/* ── MUDANÇA 3: center prop para centralizar na capa ── */}
        <Div center />
        <p style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase",
                    color:C.teal, fontWeight:600, marginBottom:12 }}>MIND CORPORATIVO</p>
        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:62, color:C.blue2,
                     lineHeight:1.1, marginBottom:12 }}>Treinamento 1</h1>
        <h2 style={{ fontFamily:F.title, fontWeight:400, fontSize:36, color:C.teal,
                     marginBottom:20 }}>Reconhecimento das Demandas</h2>
        <p style={{ fontSize:20, color:C.gray, maxWidth:540, margin:"0 auto" }}>
          Saúde mental no trabalho · Organização · Sinais de sobrecarga
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 02 – Lista de Frequência
function Slide02({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.bg, position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  overflow:"hidden", paddingBottom:80 }}>
      <Petals size={220} opacity={0.06} style={{ position:"absolute", top:-30, left:-10 }}/>
      <Petals size={140} opacity={0.04} style={{ position:"absolute", bottom:-10, right:20 }}/>
      <div style={{ display:"flex", gap:80, alignItems:"center", animation: v ? "fadeUp .7s ease both" : "none" }}>
        <div style={{ maxWidth:480 }}>
          <p style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase",
                      color:C.teal, fontWeight:600, marginBottom:12 }}>LISTA DE FREQUÊNCIA</p>
          <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:52, color:C.blue2,
                       lineHeight:1.15, marginBottom:16 }}>
            Registre sua<br/>presença hoje
          </h1>
          <Div/>
          <p style={{ fontSize:22, color:C.gray, lineHeight:1.6, marginBottom:24 }}>
            Aponte a câmera para o QR code ao lado ou acesse o link para confirmar sua participação neste treinamento.
          </p>
          <div style={{ background:`${C.teal}18`, borderLeft:`4px solid ${C.teal}`,
                        borderRadius:12, padding:"14px 20px" }}>
            <p style={{ fontSize:18, color:C.grayDark }}>
              ✅ Sua presença é importante para o nosso registro e acompanhamento.
            </p>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
          <div style={{ background:C.card, borderRadius:20, padding:20,
                        boxShadow:"0 4px 32px rgba(0,0,0,0.12)",
                        animation:"pulseGreen 2.5s infinite" }}>
            <img src={QR_CODE} alt="QR Lista de Frequência"
                 style={{ width:220, height:220, display:"block", borderRadius:8 }}/>
          </div>
          <p style={{ fontSize:16, letterSpacing:"0.15em", textTransform:"uppercase",
                      color:C.teal, fontWeight:700, fontFamily:F.body }}>
            📋 Lista de Presença
          </p>
        </div>
      </div>
    </div>
  );
}

// SLIDE ENQUETE
function SlideEnquete({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.card, position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  textAlign:"center", overflow:"hidden", paddingBottom:80 }}>
      <Petals size={260} opacity={0.07} style={{ position:"absolute", top:20, right:30 }}/>
      <Petals size={160} opacity={0.04} style={{ position:"absolute", bottom:20, left:30 }}/>
      <div style={{ animation: v ? "fadeUp .7s ease both" : "none", maxWidth:740 }}>
        <p style={{ fontSize:14, letterSpacing:"0.18em", textTransform:"uppercase",
                    color:C.teal, fontWeight:600, marginBottom:12 }}>ENGAJAMENTO</p>
        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:64,
                     color:C.blue2, lineHeight:1.1, marginBottom:16 }}>
          Reflexão e Diálogo
        </h1>
        <div style={{ width:56, height:2, background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                      margin:"0 auto 28px" }}/>
        <p style={{ fontSize:26, color:C.gray, lineHeight:1.7 }}>
          Um momento de escuta ativa e troca honesta entre o grupo sobre
          organização, sobrecarga e saúde mental no trabalho.
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 04 – Boas-vindas e Propósito
function Slide04({ v }) {
  const items = [
    { icon:"🧠", label:"Entender sinais",      desc:"Reconhecer sobrecarga em si e nos colegas" },
    { icon:"⚠️", label:"Fatores de risco",     desc:"Identificar o que aumenta o estresse" },
    { icon:"✅", label:"Estratégias práticas", desc:"Ferramentas para organizar melhor a rotina" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Abertura</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        Boas-vindas e Propósito</h1>
      <Div/>
      <div style={{ background:C.card, borderRadius:16, padding:"22px 28px",
                    boxShadow:"0 2px 20px rgba(0,0,0,0.06)", flex:1,
                    position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", gap:14 }}>
        <Petals size={140} opacity={0.05} style={{ position:"absolute", right:-10, top:-10 }}/>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:28, color:C.blue2, lineHeight:1.6 }}>
          "Hoje vamos falar sobre saúde mental no trabalho e como podemos fazer
          para melhorar a gestão do ambiente para todos."
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, flex:1 }}>
          {items.map((it,i) => (
            <div key={i} style={{ background:C.bg, borderRadius:14, padding:"16px 18px",
                                  animation: v ? `fadeUp .5s ${.2+i*.12}s ease both` : "none",
                                  opacity: v ? 1 : 0 }}>
              <span style={{ fontSize:36 }}>{it.icon}</span>
              <p style={{ fontWeight:700, fontSize:20, color:C.grayDark, margin:"10px 0 8px" }}>{it.label}</p>
              <p style={{ fontSize:18, color:C.gray, lineHeight:1.5 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop:10, fontSize:17, color:C.gray, fontStyle:"italic", textAlign:"center" }}>
        "Isso enquanto fator que pode prejudicar a sua rotina."
      </p>
      <QrBadge />
    </div>
  );
}

// SLIDE 06 – O que são Fatores de Risco?
function Slide06({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Conceito Central</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        O que são Fatores de Risco no Trabalho?</h1>
      <Div/>
      <div style={{ background:C.card, borderRadius:16, padding:"16px 24px",
                    boxShadow:"0 2px 16px rgba(0,0,0,0.06)", marginBottom:14 }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:28, color:C.blue2, lineHeight:1.55 }}>
          "São elementos na gestão de trabalho que podem aumentar o estresse, a ansiedade
          ou causar problemas de saúde mental."
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, flex:1 }}>
        {[
          { bg:`${C.green2}18`, border:`${C.green2}50`, tc:C.green3, icon:"⚡", title:"Fatores Organizacionais",
            items:["Sobrecarga de tarefas","Falta de clareza nas instruções","Ausência de apoio","Prazos excessivamente curtos"] },
          { bg:`${C.blue1}18`, border:`${C.blue1}50`, tc:C.blue2, icon:"📱", title:"Fatores Comportamentais",
            items:["Uso excessivo do celular","Atrasos e desorganização","Não cumprimento de prazos","Tarefas incompletas ou apressadas"] },
        ].map((col,i) => (
          <div key={i} style={{ background:`linear-gradient(135deg,${col.bg},transparent)`,
                                border:`1.5px solid ${col.border}`, borderRadius:14, padding:"18px 22px" }}>
            <p style={{ fontWeight:700, fontSize:19, color:col.tc, marginBottom:12 }}>{col.icon} {col.title}</p>
            {col.items.map((t,j) => (
              <p key={j} style={{ fontSize:19, color:C.grayDark, padding:"7px 0",
                                  borderBottom: j<3 ? `1px solid ${col.border}` : "none" }}>→ {t}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background:`${C.warn}20`, border:`1.5px solid ${C.warn}60`,
                    borderRadius:12, padding:"11px 20px", marginTop:12 }}>
        <p style={{ fontSize:18, color:C.grayDark }}>
          <strong>Exemplo:</strong> Quando alguém passa muito tempo no celular, perde prazos
          ou demora para concluir tarefas, isso pode afetar toda a equipe.
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 07 – Sinais Internos
function Slide07({ v }) {
  const signals = [
    { icon:"😴", label:"Cansaço constante",    desc:"mesmo após descanso adequado" },
    { icon:"😰", label:"Ansiedade e irritação", desc:"ou desmotivação frequente" },
    { icon:"🌀", label:"Dificuldade de foco",  desc:"esquecimento ou distração recorrente" },
    { icon:"😞", label:"Frustração",           desc:"sentimentos de baixa autoestima" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Identificação · Parte A</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        Sinais Internos de Dificuldades</h1>
      <Div/>
      <p style={{ fontSize:20, color:C.gray, marginBottom:14 }}>
        Como reconhecer o que acontece <strong>dentro de nós</strong> antes que vire sobrecarga:
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, flex:1 }}>
        {signals.map((s,i) => (
          <div key={i} style={{ background:C.card, borderRadius:16, padding:"20px 24px",
                                boxShadow:"0 2px 14px rgba(0,0,0,0.06)",
                                display:"flex", alignItems:"flex-start", gap:18,
                                animation: v ? `fadeUp .5s ${.1+i*.1}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:52 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:700, fontSize:22, color:C.grayDark, marginBottom:8 }}>{s.label}</p>
              <p style={{ fontSize:19, color:C.gray, lineHeight:1.5 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.teal}15`, borderRadius:12, padding:"12px 20px",
                    marginTop:12, borderLeft:`4px solid ${C.teal}` }}>
        <p style={{ fontSize:18, color:C.grayDark }}>
          💡 <strong>Atenção:</strong> Esses sinais são naturais — o importante é reconhecê-los
          cedo para agir antes da sobrecarga se instalar.
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 08 – Sinais no Comportamento
function Slide08({ v }) {
  const signals = [
    { icon:"📱", label:"Uso excessivo do celular",             desc:"atividades não relacionadas ao trabalho durante o expediente" },
    { icon:"⏰", label:"Atrasos e desorganização",             desc:"chegadas tardias ou dificuldade em manter a ordem das tarefas" },
    { icon:"📋", label:"Prazos não cumpridos",                desc:"tarefas realizadas de forma incompleta ou apressada" },
    { icon:"🌊", label:"Sobrecarga por falta de planejamento", desc:"acúmulo de tarefas por não organizar a rotina" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Identificação · Parte B</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        Sinais no Comportamento</h1>
      <Div/>
      <p style={{ fontSize:20, color:C.gray, marginBottom:14 }}>
        O que podemos observar <strong>nas ações do dia a dia</strong>:
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:9, flex:1 }}>
        {signals.map((s,i) => (
          <div key={i} style={{ background:C.card, borderRadius:14, padding:"14px 22px",
                                display:"flex", alignItems:"center", gap:18,
                                boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                                borderLeft:`5px solid ${i%2===0 ? C.green2 : C.blue1}`,
                                animation: v ? `fadeUp .4s ${.1+i*.1}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:36, minWidth:46 }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:600, fontSize:21, color:C.grayDark }}>{s.label}</p>
              <p style={{ fontSize:18, color:C.gray, marginTop:4 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.warn}20`, border:`1px solid ${C.warn}50`,
                    borderRadius:12, padding:"11px 20px", marginTop:10 }}>
        <p style={{ fontSize:18, color:C.grayDark }}>
          <strong>Exemplo:</strong> Se alguém chega atrasado, passa muito tempo no celular
          ou deixa tarefas acumularem, pode estar sofrendo de sobrecarga mental.
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE VIDEO
function SlideVideo({ src, label, v }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (v) { ref.current.currentTime=0; ref.current.play().catch(()=>{}); }
    else ref.current.pause();
  }, [v]);
  return (
    <div style={{ width:1280, height:720, background:"#000", position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
      <video ref={ref} src={src} controls
             style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
      <QrBadge dark />
    </div>
  );
}

// SLIDE 11 – Como a Desorganização Impacta
function Slide11({ v }) {
  const cols = [
    { color:C.danger, icon:"⚡", title:"Na execução",
      items:["Tarefas feitas de forma apressada","Erros por falta de planejamento","Retrabalho constante"] },
    { color:C.warn, icon:"🧠", title:"Na saúde mental",
      items:["Aumento do estresse","Sensação de confusão e caos","Ansiedade crescente"] },
    { color:C.blue1, icon:"👥", title:"Na equipe",
      items:["Conflitos internos","Atrasos coletivos","Sobrecarga distribuída"] },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Efeito em Cascata</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        Como a Desorganização Impacta Saúde e Trabalho</h1>
      <Div/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, flex:1 }}>
        {cols.map((col,i) => (
          <div key={i} style={{ background:C.card, borderRadius:16, padding:"20px 18px",
                                boxShadow:"0 2px 14px rgba(0,0,0,0.06)",
                                animation: v ? `fadeUp .5s ${.1+i*.15}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <span style={{ fontSize:32 }}>{col.icon}</span>
              <p style={{ fontWeight:700, fontSize:20, color:col.color }}>{col.title}</p>
            </div>
            {col.items.map((item,j) => (
              <p key={j} style={{ fontSize:19, color:C.grayDark, padding:"9px 0",
                                  borderBottom: j<2 ? `1px solid ${C.bg}` : "none",
                                  lineHeight:1.4 }}>→ {item}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background:C.card, borderRadius:14, padding:"14px 22px", marginTop:12,
                    boxShadow:"0 2px 12px rgba(0,0,0,0.05)", borderLeft:`5px solid ${C.danger}` }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:26, color:C.grayDark, lineHeight:1.55 }}>
          "Perder tempo no celular ou distrações constantes aumentam a sensação de confusão
          e podem gerar ansiedade."
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 12 – Por que Essas Atitudes Acontecem?
function Slide12({ v }) {
  const reasons = [
    { icon:"🗓️", title:"Falta de organização na rotina",      desc:"Ausência de planejamento diário ou semanal" },
    { icon:"📦", title:"Sobrecarregamento de tarefas",         desc:"Mais demandas do que a capacidade de execução" },
    { icon:"🔀", title:"Dificuldade em priorizar",            desc:"Não saber o que é mais urgente ou importante" },
    { icon:"🗣️", title:"Falta de apoio ou instruções claras", desc:"Ausência de orientação da liderança ou equipe" },
    { icon:"🏃", title:"Fuga do estresse e ansiedade",        desc:"Comportamentos de distração como válvula de escape" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Compreensão</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        Por que Essas Atitudes Acontecem?</h1>
      <Div/>
      <p style={{ fontSize:20, color:C.gray, marginBottom:12 }}>
        Antes de julgar, é essencial compreender as causas:
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:7, flex:1 }}>
        {reasons.map((r,i) => (
          <div key={i} style={{ background:C.card, borderRadius:12, padding:"13px 22px",
                                display:"flex", alignItems:"center", gap:16,
                                boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
                                animation: v ? `fadeUp .4s ${.08+i*.09}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:28, minWidth:38 }}>{r.icon}</span>
            <div>
              <p style={{ fontWeight:600, fontSize:21, color:C.grayDark }}>{r.title}</p>
              <p style={{ fontSize:18, color:C.gray }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.green2}18`, borderRadius:12, padding:"11px 20px",
                    marginTop:10, borderLeft:`4px solid ${C.green2}` }}>
        <p style={{ fontSize:18, color:C.grayDark }}>
          💚 Às vezes, é uma forma de escapar do estresse ou da ansiedade — não é falta de vontade.
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 15 – Como Ajudar o Colaborador?
function Slide15({ v }) {
  const actions = [
    { icon:"📝", text:"Incentivar o planejamento: fazer listas, dividir tarefas e definir prioridades" },
    { icon:"⏸️", text:"Promover pausas curtas para descanso mental" },
    { icon:"🛠️", text:"Ensinar técnicas simples de organização, como uso de agendas ou aplicativos" },
    { icon:"🏛️", text:"Criar um ambiente de trabalho mais estruturado, com regras claras" },
    { icon:"🤝", text:"Oferecer apoio e compreensão — sobrecarga e ansiedade precisam de acolhimento" },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Suporte ao Colaborador</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        Como Ajudar o Colaborador a Melhorar?</h1>
      <Div/>
      <div style={{ display:"flex", flexDirection:"column", gap:9, flex:1 }}>
        {actions.map((a,i) => (
          <div key={i} style={{ background:C.card, borderRadius:13, padding:"14px 22px",
                                display:"flex", alignItems:"center", gap:16,
                                boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                                borderRight:`5px solid ${i%2===0 ? C.teal : C.green2}`,
                                animation: v ? `fadeUp .4s ${.1+i*.1}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <span style={{ fontSize:32, minWidth:40 }}>{a.icon}</span>
            <p style={{ fontSize:20, color:C.grayDark, lineHeight:1.5 }}>{a.text}</p>
          </div>
        ))}
      </div>
      <div style={{ background:`${C.teal}15`, borderRadius:12, padding:"11px 20px", marginTop:10 }}>
        <p style={{ fontSize:22, color:C.grayDark, fontStyle:"italic" }}>
          💚 "É importante oferecer apoio e compreensão, pois a sobrecarga e a ansiedade
          precisam ser enfrentadas de forma saudável."
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 20 – Como o Líder ou Colega Pode Atuar?
function Slide20({ v }) {
  const items = [
    { icon:"💬", title:"Conversar com empatia", desc:"Sem julgamentos. Ouvir antes de concluir." },
    { icon:"🧭", title:"Oferecer orientação",   desc:"Ajudar no planejamento e organização das tarefas." },
    { icon:"📌", title:"Incentivar métodos",    desc:"Apresentar técnicas de organização acessíveis." },
    { icon:"❤️", title:"Sinalizar cuidado",     desc:"Destacar a importância de cuidar da saúde mental." },
  ];
  return (
    <div style={{ width:1280, height:720, background:C.bg, padding:SLIDE_PAD, position:"relative",
                  display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <Label>Liderança e Pares</Label>
      <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42, color:C.blue2, marginBottom:6 }}>
        Como o Líder ou Colega Pode Atuar?</h1>
      <Div/>
      <div style={{ background:C.card, borderRadius:16, padding:"18px 26px",
                    boxShadow:"0 2px 16px rgba(0,0,0,0.06)", marginBottom:14 }}>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:28, color:C.blue2, lineHeight:1.55 }}>
          "Se perceber que alguém está distraído, desorganizado ou sobrecarregado..."
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, flex:1 }}>
        {items.map((it,i) => (
          <div key={i} style={{ background:C.bg, borderRadius:14, padding:"18px 22px",
                                animation: v ? `fadeUp .5s ${.1+i*.12}s ease both` : "none",
                                opacity: v ? 1 : 0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
              <span style={{ fontSize:30 }}>{it.icon}</span>
              <p style={{ fontWeight:700, fontSize:21, color:C.grayDark }}>{it.title}</p>
            </div>
            <p style={{ fontSize:19, color:C.gray, lineHeight:1.5 }}>{it.desc}</p>
          </div>
        ))}
      </div>
      <QrBadge />
    </div>
  );
}

// SLIDE 21 – Conclusão
function Slide21({ v }) {
  return (
    <div style={{ width:1280, height:720, background:C.card, position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  textAlign:"center", overflow:"hidden", paddingBottom:80 }}>
      <Petals size={260} opacity={0.07} style={{ position:"absolute", top:10, left:30 }}/>
      <Petals size={160} opacity={0.04} style={{ position:"absolute", bottom:10, right:30 }}/>
      <div style={{ animation: v ? "fadeUp .7s ease both" : "none", maxWidth:640 }}>
        <Logo height={90} style={{ margin:"0 auto 20px" }}/>
        <p style={{ fontSize:14, letterSpacing:"0.18em", textTransform:"uppercase",
                    color:C.teal, fontWeight:600, marginBottom:12 }}>ENCERRAMENTO</p>
        <h1 style={{ fontFamily:F.title, fontWeight:700, fontSize:42,
                     color:C.blue2, lineHeight:1.25, marginBottom:16 }}>
          Cuide de si para cuidar do ambiente
        </h1>
        <div style={{ width:56, height:2, background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                      margin:"0 auto 20px" }}/>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22, textAlign:"left" }}>
          {[
            "Cuidar da saúde mental também envolve organizar melhor a nossa rotina.",
            "Saiba reconhecer sinais de sobrecarga e busque apoio quando necessário.",
            "Comece com pequenas mudanças: planeje o seu dia e converse com alguém de confiança.",
          ].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start",
                                  background:C.bg, borderRadius:12, padding:"12px 18px" }}>
              <span style={{ color:C.green2, fontWeight:700, fontSize:22, marginTop:1 }}>✓</span>
              <p style={{ fontSize:21, color:C.grayDark, lineHeight:1.5 }}>{t}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily:F.title, fontStyle:"italic", fontSize:28,
                    color:C.teal, lineHeight:1.6 }}>
          "Cada um de nós é responsável por um ambiente mais saudável e produtivo."
        </p>
      </div>
      <QrBadge />
    </div>
  );
}

/* ═════════════════════ LISTA DE 21 SLIDES ═════════════════════ */
const SLIDES = [
  { comp: (p) => <Slide01 {...p}/>,        title:"Capa",                          video:false },
  { comp: (p) => <Slide02 {...p}/>,        title:"Lista de Frequência",            video:false },
  { comp: (p) => <SlideEnquete {...p}/>,   title:"Enquete",                        video:false },
  { comp: (p) => <Slide04 {...p}/>,        title:"Boas-vindas e Propósito",        video:false },
  { comp: (p) => <SlideEnquete {...p}/>,   title:"Enquete",                        video:false },
  { comp: (p) => <Slide06 {...p}/>,        title:"O que são Fatores de Risco?",    video:false },
  { comp: (p) => <Slide07 {...p}/>,        title:"Sinais Internos",                video:false },
  { comp: (p) => <Slide08 {...p}/>,        title:"Sinais no Comportamento",        video:false },
  { comp: (p) => <SlideEnquete {...p}/>,   title:"Enquete",                        video:false },
  { comp: (p) => <SlideVideo src="/video-1.mp4" label="Vídeo 1" {...p}/>, title:"▶ Vídeo 01", video:true },
  { comp: (p) => <Slide11 {...p}/>,        title:"Impacto da Desorganização",      video:false },
  { comp: (p) => <Slide12 {...p}/>,        title:"Por que Essas Atitudes?",        video:false },
  { comp: (p) => <SlideVideo src="/video-2.mp4" label="Vídeo 2" {...p}/>, title:"▶ Vídeo 02", video:true },
  { comp: (p) => <SlideEnquete {...p}/>,   title:"Enquete",                        video:false },
  { comp: (p) => <Slide15 {...p}/>,        title:"Como Ajudar o Colaborador?",     video:false },
  { comp: (p) => <SlideVideo src="/video-3.mp4" label="Vídeo 3" {...p}/>, title:"▶ Vídeo 03", video:true },
  { comp: (p) => <SlideEnquete {...p}/>,   title:"Enquete",                        video:false },
  { comp: (p) => <SlideVideo src="/video-4.mp4" label="Vídeo 4" {...p}/>, title:"▶ Vídeo 04", video:true },
  { comp: (p) => <SlideEnquete {...p}/>,   title:"Enquete",                        video:false },
  { comp: (p) => <Slide20 {...p}/>,        title:"Como o Líder Pode Atuar?",       video:false },
  { comp: (p) => <Slide21 {...p}/>,        title:"Conclusão",                      video:false },
];

/* ═════════════════════ APP ═════════════════════ */
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
      {/*
        ── MUDANÇA 4: fundo sem preto, overflow hidden para clipar o conteúdo
           que ultrapassa ao escalar com Math.max
      */}
      <div style={{
        width:"100vw", height:"100vh",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden",
        background: C.bg,           // ← sem fundo preto
      }}>
        <div style={{
          width:1280, height:720, position:"relative", overflow:"hidden",
          transform:`scale(${scale})`, transformOrigin:"center center",
          flexShrink:0,
          // ── sem boxShadow: elimina borda escura visível ao preencher a tela
        }}>
          {/* barra de progresso */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, zIndex:200,
                        background:"#E8EDE0" }}>
            <div style={{ height:"100%", background:`linear-gradient(90deg,${C.green2},${C.blue1})`,
                          width:`${((cur+1)/SLIDES.length)*100}%`, transition:"width .4s ease" }}/>
          </div>

          {/* slides */}
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
                        title={`${i+1}. ${SLIDES[i].title}`}/>
              ))}
            </div>
            <button onClick={() => go(1)}
                    style={{ width:34, height:34, borderRadius:"50%", fontSize:20,
                             color: isVideo ? "#fff" : C.blue2,
                             display:"flex", alignItems:"center", justifyContent:"center",
                             opacity: cur===SLIDES.length-1 ? .3 : 1 }}
                    disabled={cur===SLIDES.length-1}>›</button>
            <span style={{ fontSize:12, color: isVideo ? "#ccc" : C.gray,
                           marginLeft:8, fontFamily:F.body }}>
              {cur+1}/{SLIDES.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
