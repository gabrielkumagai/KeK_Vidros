// ==========================================
// DADOS: CATÁLOGO DA HOME (Index)
// ==========================================
const itensHome = [
    { 
        nome: "Esquadrias", 
        img: "img/esquadrias/foto1.jpg", 
        desc: "Nossas esquadrias oferecem alta performance com vedação acústica e térmica. Ideais para quem busca perfis modernos com acabamento impecável em pintura eletrostática." 
    },
    { 
        nome: "Espelhos", 
        img: "img/espelhos/foto1.png", 
        desc: "Espelhos decorativos feitos sob medida para ampliar ambientes. Trabalhamos com modelos orgânicos, lapidados e bisotados para banheiros, salas e closets." 
    },
    { 
        nome: "Vidro Temperado", 
        img: "img/vidro_temperado/foto1.jpg", 
        desc: "Segurança e resistência superior. O vidro temperado é ideal para portas, janelas e divisórias, sendo até 5 vezes mais resistente que o vidro comum." 
    },
    { 
        nome: "Fachadas", 
        img: "img/fachadas/foto1.jpg", 
        desc: "Especialistas em fachadas Glazing e Pele de Vidro. Modernidade e sofisticação para prédios comerciais e residências de alto padrão." 
    },
    { 
        nome: "Guarda Corpo", 
        img: "img/guarda_corpo/foto2.jpg", 
        desc: "Unimos segurança e design. Nossos guarda-corpos atendem todas as normas técnicas, proporcionando proteção para escadas e sacadas sem perder a vista." 
    },
    { 
        nome: "Box", 
        img: "img/box/foto1.jpg", 
        desc: "Box para banheiro com sistemas modernos, desde roldanas aparentes até designs padrão, garantindo elegância e funcionalidade ao seu banho." 
    },
    { 
        nome: "Cobertura", 
        img: "img/cobertura/foto1.jpg", 
        desc: "Coberturas em vidro laminado com proteção UV. Solução perfeita para pergolados e áreas externas, garantindo iluminação natural com segurança." 
    },
    { 
        nome: "Portão", 
        img: "img/portao/foto1.jpg", 
        desc: "Portões automatizados em alumínio e vidro. Durabilidade extrema contra o tempo e design que valoriza a entrada do seu imóvel." 
    },
    { 
        nome: "Esquadrias de Alumínio", 
        img: "img/esquadrias/foto2.jpg", 
        desc: "Esquadrias personalizadas com perfis de alta qualidade. Oferecemos diversas cores e tipologias para atender exatamente a necessidade do seu projeto." 
    }
];

// ==========================================
// DADOS: FOTOS DA GALERIA INTERNA
// ==========================================
const fotosPorProduto = {
    "Vidro Temperado": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg", 
        "foto6.jpg", "foto7.jpg", "foto8.jpg", "foto9.jpg", "foto10.jpg", 
        "foto11.jpg", "foto12.jpg", "foto13.jpg"
    ],
    "Portão": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"
    ],
    "Guarda Corpo": [
        "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"
    ],
    "Fachadas": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"
    ],
    "Esquadrias": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"
    ],
    "Espelhos": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"
    ],
    "Cobertura": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg",
        "foto6.jpg", "foto7.jpg", "foto9.jpg", "foto10.jpg"
    ],
    "Box": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"
    ],
    "Esquadrias de Alumínio": [
        "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"
    ]
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gera Conteúdo
    const gridHome = document.getElementById('grid-catalogo');
    if (gridHome) initHome(gridHome);

    const gridGaleria = document.getElementById('gallery-grid');
    if (gridGaleria) initGaleria(gridGaleria);

    // 2. Extras
    initCookies();
    initBackToTop();

    // 3. ANIMAÇÃO (Corrigida)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
        
        // Garante que o rodapé apareça
        setTimeout(() => { AOS.refresh(); }, 1000);
        window.addEventListener('load', () => { AOS.refresh(); });
    }
});

// ==========================================
// LÓGICA DA HOME
// ==========================================
function initHome(gridElement) {
    let htmlContent = ""; 
    
    itensHome.forEach((item, index) => {
        htmlContent += `
            <div class="col-md-4 col-sm-6">
                <div class="product-card shadow-sm"
                     onclick="abrirModalHome('${index}')" style="cursor: pointer;">
                    <div class="product-img">
                        <img src="${item.img}" alt="${item.nome}" loading="lazy" 
                             onerror="this.src='img/logo.png'">
                        <div class="overlay-clean">
                            <span class="btn btn-light btn-sm rounded-0 px-4 fw-bold">Ver Detalhes</span>
                        </div>
                    </div>
                    <div class="p-3 text-center bg-white">
                        <h6 class="fw-bold mb-0 text-uppercase text-dark">${item.nome}</h6>
                    </div>
                </div>
            </div>
        `;
    });
    
    gridElement.innerHTML = htmlContent;
}

function abrirModalHome(index) {
    const item = itensHome[index];
    const modalElement = document.getElementById('productModal');
    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);
    
    document.getElementById('modalTitle').innerText = item.nome;
    document.getElementById('modalImg').src = item.img;
    document.getElementById('modalDesc').innerText = item.desc;
    
    const btnGallery = document.getElementById('btnGoToGallery');
    if(btnGallery) {
        btnGallery.onclick = function() {
            window.location.href = `galeria.html?item=${encodeURIComponent(item.nome)}`;
        };
    }
    
    modal.show();
}

// ==========================================
// LÓGICA DA GALERIA
// ==========================================
function initGaleria(gridElement) {
    const params = new URLSearchParams(window.location.search);
    let itemNome = params.get('item');

    if (!itemNome) itemNome = "Nossos Projetos";

    // Título e WhatsApp
    const labelTitulo = document.getElementById('productLabel');
    if (labelTitulo) labelTitulo.innerText = itemNome;

    const waFooter = document.getElementById('waLinkFooter');
    if (waFooter) {
        const msgZap = `Olá! Estava vendo a galeria de *${itemNome}* no site e gostaria de um orçamento.`;
        waFooter.href = `https://wa.me/5514981266008?text=${encodeURIComponent(msgZap)}`;
    }

    // Identificação da pasta e lista
    let listaFotos = fotosPorProduto[itemNome] || [];
    let pasta = itemNome.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        .replace(/ /g, "_"); 

    if(itemNome === "Esquadrias de Alumínio") pasta = "esquadrias";

    let htmlContent = "";

    if(listaFotos.length > 0) {
        listaFotos.forEach((foto, index) => {
            const caminhoImg = `img/${pasta}/${foto}`;
            
            // ADICIONADO: loading="lazy" para não travar o site
            // ADICIONADO: width e height para evitar layout shift (opcional, mas bom)
            htmlContent += `
                <div class="col-lg-4 col-md-6 col-6 mb-4">
                    <div class="gallery-item" onclick="abrirImagemLightbox('${caminhoImg}')">
                        <img src="${caminhoImg}" alt="${itemNome}" 
                             loading="lazy"
                             onerror="this.parentElement.parentElement.style.display='none'"> 
                        
                        <div class="gallery-overlay">
                            <i class="fas fa-search-plus gallery-icon"></i>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        const nomeSeguro = itemNome.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        htmlContent = `
            <div class="col-12 text-center py-5">
                <div class="p-5 bg-light-alt rounded shadow-sm d-inline-block border border-secondary border-opacity-10">
                    <i class="fas fa-camera fa-3x mb-3 text-muted"></i>
                    <p class="text-muted mb-0">Em breve adicionaremos fotos de <strong>${nomeSeguro}</strong>.</p>
                    <a href="https://wa.me/5514981266008" class="btn btn-sm btn-outline-dark mt-3 rounded-0">
                        Pedir fotos no WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
    
    gridElement.innerHTML = htmlContent;
}

function abrirImagemLightbox(src) {
    const modalImg = document.getElementById('modalFullImg');
    const modalEl = document.getElementById('imgModal');
    
    if(modalImg && modalEl) {
        modalImg.src = src;
        const myModal = new bootstrap.Modal(modalEl);
        myModal.show();
    }
}

// ==========================================
// FUNÇÕES EXTRAS
// ==========================================
function initCookies() {
    const cookieBanner = document.getElementById('cookieBanner');
    const btnAccept = document.getElementById('btnAcceptCookies');

    if (!localStorage.getItem('cookiesAceitos')) {
        setTimeout(() => {
            if(cookieBanner) cookieBanner.style.display = 'block';
        }, 2000);
    }

    if(btnAccept) {
        btnAccept.addEventListener('click', () => {
            localStorage.setItem('cookiesAceitos', 'true');
            cookieBanner.style.display = 'none';
        });
    }
}

function initBackToTop() {
    const btnTop = document.getElementById('btnBackToTop');
    if(btnTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnTop.style.display = 'block';
            } else {
                btnTop.style.display = 'none';
            }
        });
        btnTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}