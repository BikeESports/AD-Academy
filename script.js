
// Datos: precios fijos por curso
const PRICES = {
  ARS: 80000,
  EUR: 110,
  MXN: 2500,
  USDT: 110
};

// Métodos de pago sugeridos por moneda
const PAYMENT_METHODS = {
  ARS: 'Transferencia bancaria (Alias) - Pesos argentinos',
  EUR: 'Transferencia SEPA - Euros',
  MXN: 'Transferencia SPEI / Oxxo Pay - Pesos mexicanos',
  USDT: 'Cripto (USDT) - Red: Ethereum (ERC20)'
};

// Cursos detallados (subgéneros)
// Nota: este mismo objeto puede mantenerse en un archivo JSON separado si lo querés.
const COURSES_DETAILED = {
  "Electricidad y Electrónica": {
    "Refrigeración": ["Principios de termodinámica aplicada","Instalación y mantenimiento de equipos domésticos","Sistemas de refrigeración comercial","Refrigerantes y normativa ambiental"],
    "Electricista": ["Instalaciones domiciliarias","Tableros y protección diferencial","Mantenimiento eléctrico preventivo","Normas y seguridad (EPP)"],
    "Mantenimiento de computadoras": ["Diagnóstico hardware","Reparación y reemplazo de componentes","Instalación de sistemas operativos","Backup y recuperación"],
    "Mantenimiento de celulares": ["Diagnóstico de pantallas y baterías","Micro soldadura y reemplazo de componentes","Firmware y flasheo","Mantenimiento preventivo"],
    "Calefacción": ["Tipos de sistemas de calefacción","Instalación y mantenimiento de calderas","Control de eficiencia energética","Seguridad y normativa"]
  },
  "Mecánica": {
    "Mecánica automotriz": ["Motor y transmisión","Frenos y suspensión","Diagnóstico con scanner","Mantenimiento preventivo"],
    "Cerrajería automotriz": ["Sistemas de cierre y llaves","Programación de llaves y transponders","Apertura sin daño","Seguridad electrónica"]
  },
  "Construcción": {
    "Carpintería": ["Herramientas y seguridad","Técnicas de ensamblaje","Acabados y barnices","Proyectos: muebles y estructuras"] 
  },
  "Seguridad": {
    "Vigilancia y seguridad privada": ["Protocolos de patrullaje","Control de accesos","Atención al público y reportes","Legislación básica"],
    "Supervisor de seguridad": ["Coordinación de equipos","Planificación de turnos","Gestión de incidentes","Informes y KPI"] 
  },
  "Programación": {
    "Programación": ["Fundamentos","Estructuras de datos básicas","Buenas prácticas"],
    "Programación avanzada": ["Patrones de diseño","Optimización","Testing avanzado"],
    "ChatGPT": ["Prompt engineering","Casos de uso para negocio","Integraciones"],
    "Algoritmos": ["Complejidad","Búsqueda y ordenamiento","Grafos"],
    "Programación orientada a objetos": ["Clases y objetos","Herencia","Polimorfismo"],
    "APIs": ["REST vs GraphQL","Autenticación","Versionado"],
    "Desarrollo web para empresarios": ["Wireframes","MVP web","Monetización"],
    "JavaScript": ["ES6+","DOM","Asincronía"],
    "Desarrollo web Python y Django": ["MVC","Modelos y migraciones","Deploy básico"],
    "Introducción a la web": ["HTTP","Estructura HTML","Client vs Server"],
    "CSS3": ["Layout (Flex/Grid)","Responsive","Animaciones"],
    "HTML5": ["Semántica","Forms","Accesibilidad"],
    "Figma": ["Prototipado","Componentes","Handoff a desarrollo"]
  },
  "Desarrollo de videojuegos": {
    "Videojuegos": ["Fundamentos de game design","Motores (intro)"],
    "Videojuegos intermedio": ["Programación gameplay","IA básica","Física"],
    "Videojuegos avanzado": ["Networking","Optimización","Publicación"] 
  },
  "Gestión de proyecto y software": {
    "Github": ["Flujo de ramas","PRs","Releases"],
    "Tester de Software": ["Tipos de pruebas","Casos de prueba"],
    "Pruebas de Software y CI/CD": ["Pipelines","Automatización","Integración continua"],
    "Viabilidad para proyectos": ["Estudios de mercado","MVP"],
    "Gestión de proyectos": ["Scrum","Kanban","Roadmaps"],
    "Diseño de Software": ["Arquitectura","Documentación","Microservicios"] 
  },
  "Comidas": {
    "Cocina profesional": ["Técnicas de cocción","Higiene profesional"],
    "Manipulación de alimentos": ["Buenas prácticas","Regulación sanitaria"],
    "Recetas de aderezos": ["Vinagretas","Salsas emulsionadas"],
    "Ensaladas gourmet": ["Combinaciones y presentaciones"],
    "Recetas con pescado": ["Cortes","Cocción segura","Maridaje"] 
  },
  "Ingeniería civil": {
    "Arquitectura": ["Conceptos básicos","Dibujo arquitectónico"],
    "Topografías": ["Levantamientos","Instrumentación"],
    "Dibujo técnico": ["Normas ISO","Proyecciones"],
    "Cambio climático": ["Impacto en la construcción","Adaptación"],
    "Hidráulica": ["Redes y dimensionado"],
    "Ecología": ["Sistemas verdes","Integración"],
    "Derecho ambiental": ["Normativa","Permisos"],
    "Maestro de obras": ["Planificación de obra","Control de calidad"],
    "Diseño de redes de gas": ["Cálculos","Seguridad"],
    "Diseño sísmico": ["Normativas sísmicas","Detallado estructural"] 
  },
  "Seguridad informática": {
    "Ciberseguridad": ["Fundamentos","Pentesting básico","Defensa y hardening"] 
  },
  "Idiomas": {
    "Español": ["Conversación","Gramática"],
    "Gallego": ["Conversación","Cultura y vocabulario"],
    "Portugués": ["Conversación","Gramática básica"],
    "Inglés": ["Inglés conversacional","Inglés técnico"],
    "Francés": ["Conversación","Gramática básica"],
    "Italiano": ["Conversación","Pronunciación"],
    "Alemán": ["Niveles A1-B1 (intro)"],
    "Japonés": ["Kana","Introducción al japonés"],
    "Árabe": ["Alfabeto","Frases básicas"] 
  }
};

// UTILIDADES
function containerIdFromCategory(category){
  return category.toLowerCase().replace(/\s+/g,'').replace(/[^a-z\u00-\u7f0-9]/gi,'');
}

function formatMoney(value, currency){
  if(currency === 'EUR') return `€ ${Number(value).toLocaleString('de-DE')}`;
  if(currency === 'USDT') return `USDT ${value}`;
  if(currency === 'MXN') return `MXN ${Number(value).toLocaleString('es-MX')}`;
  return `ARS ${Number(value).toLocaleString('es-AR')}`;
}

// RENDER DINÁMICO
const currencyEl = document.getElementById('currency');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const countEl = document.getElementById('count');
const paymentInstructions = document.getElementById('payment-instructions');
const paymentMethodNote = document.getElementById('payment-method-note');

let courseIndex = 0;

// Crea secciones por categoría y agrega cursos
Object.keys(COURSES_DETAILED).forEach(category => {
  const containerId = containerIdFromCategory(category);
  let container = document.getElementById(containerId);
  if(!container){
    // crear container si no existe
    container = document.createElement('div');
    container.id = containerId;
    document.querySelector('.md\\:col-span-2').prepend(container);
  }

  // Header de categoria
  const header = document.createElement('div');
  header.className = 'mb-2';
  header.innerHTML = `<h3 class="text-xl font-semibold mb-1">${category}</h3>`;
  container.appendChild(header);

  // Lista de cursos bajo categoria
  const list = document.createElement('div');
  list.className = 'space-y-2';
  Object.keys(COURSES_DETAILED[category]).forEach(course => {
    const id = `course_${courseIndex++}`;
    const priceMarkup = `<div class="text-sm text-gray-700 mt-1" data-price-id="${id}_price"></div>`;
    const subToggle = `<div class="text-xs text-blue-600 cursor-pointer mt-1" data-target="${id}_sub">Ver subgéneros ▾</div>`;
    const subDiv = `<div id="${id}_sub" class="text-sm text-gray-600 mt-2" style="display:none"></div>`;

    const card = document.createElement('div');
    card.className = 'border rounded p-3 flex flex-col';
    card.innerHTML = `
      <label class="flex items-start gap-3">
        <input type="checkbox" id="${id}" data-course="${course}" data-category="${category}" class="mt-1" />
        <div class="flex-1">
          <div class="font-medium">${course}</div>
          ${priceMarkup}
          ${subToggle}
          ${subDiv}
        </div>
      </label>
    `;

    // Añadir subgéneros
    const subDivEl = card.querySelector(`#${id}_sub`);
    const subs = COURSES_DETAILED[category][course];
    subDivEl.innerHTML = `<strong>Subgéneros:</strong><ul class="list-disc ml-5 mt-1">${subs.map(s=>`<li>${s}</li>`).join('')}</ul>`;

    // Toggle
    card.querySelector('[data-target]').addEventListener('click', (e)=>{
      const t = document.getElementById(e.currentTarget.dataset.target);
      if(t.style.display === 'none'){ t.style.display = 'block'; e.currentTarget.textContent = 'Ocultar subgéneros ▴';}
      else { t.style.display = 'none'; e.currentTarget.textContent = 'Ver subgéneros ▾'; }
    });

    list.appendChild(card);
  });

  container.appendChild(list);
});

// FUNCIONALIDAD: actualizar precios por curso y totales
function updateCoursePrices(){
  const cur = currencyEl.value;
  const price = PRICES[cur];

  // Actualizar precios
  document.querySelectorAll('[data-price-id]').forEach(el=>{
    el.textContent = formatMoney(price, cur);
  });

  // Datos de cuenta por moneda
  const ACCOUNT_DETAILS = {
    ARS: `
      <strong>Transferencia en pesos (Argentina)</strong><br>
      Nombre del destinatario: <b>Agustín Dentella</b><br>
      Alias: <b>ad.academy</b>
    `,
    EUR: `
      <strong>Transferencia en euros</strong><br>
      Nombre del destinatario: <b>Bridge Building</b><br>
      IBAN: <b>IE06 MODR 9903 5507 0916 80</b>
    `,
    USDT: `
      <strong>Pago en criptomoneda (USDT)</strong><br>
      Wallet: <b>0x26d59f7b89edafe11d2ee90a978973b5bfa1c2f8</b><br>
      Red: <b>Ethereum (ERC20)</b>
    `,
    MXN: `
      <strong>Transferencia en pesos mexicanos</strong><br>
      Nombre del destinatario: <b>Agustín Dentella</b><br>
      Banco: <b>Arcus</b><br>
      CLABE: <b>706969795295294384</b>
    `
  };

  // Mostrar método y datos bancarios
  const method = PAYMENT_METHODS[cur] || '';
  paymentMethodNote.textContent = method ? `Método sugerido: ${method}` : '';
  paymentInstructions.innerHTML = method
    ? `${method}<hr class="my-2">${ACCOUNT_DETAILS[cur] || ''}`
    : 'Seleccioná moneda para ver método de pago sugerido.';
}

function calculateTotals(){
  const cur = currencyEl.value;
  const price = PRICES[cur];
  const checked = Array.from(document.querySelectorAll('.md\\:col-span-2 input[type=checkbox]')).filter(i=>i.checked);
  const count = checked.length;
  const subtotal = price * count;
  subtotalEl.textContent = formatMoney(subtotal, cur);
  totalEl.textContent = formatMoney(subtotal, cur);
  countEl.textContent = count;
}

// Eventos
document.addEventListener('change', (e)=>{
  if(e.target && e.target.matches('.md\\:col-span-2 input[type=checkbox]')){
    calculateTotals();
  }
});

currencyEl.addEventListener('change', ()=>{
  updateCoursePrices();
  calculateTotals();
});

// Initial
updateCoursePrices();
calculateTotals();

// Checkout handler (básico)
document.getElementById('checkout').addEventListener('click', ()=>{
  const cur = currencyEl.value;
  const totalText = totalEl.textContent;
  alert(`Proceder a pago: ${totalText}\nMétodo sugerido: ${PAYMENT_METHODS[cur]}`);
});
