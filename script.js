// ==========================================
// DADOS: CATÁLOGO DA HOME (Index)
// ==========================================
const itensHome = [
    { 
        nome: "Esquadrias", 
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        desc: "Nossas esquadrias oferecem alta performance com vedação acústica e térmica. Ideais para quem busca perfis modernos com acabamento impecável em pintura eletrostática." 
    },
    { 
        nome: "Espelhos", 
        img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800",
        desc: "Espelhos decorativos feitos sob medida para ampliar ambientes. Trabalhamos com modelos orgânicos, lapidados e bisotados para banheiros, salas e closets." 
    },
    { 
        nome: "Vidro Temperado", 
        img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=800",
        desc: "Segurança e resistência superior. O vidro temperado é ideal para portas, janelas e divisórias, sendo até 5 vezes mais resistente que o vidro comum." 
    },
    { 
        nome: "Fachadas", 
        img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
        desc: "Especialistas em fachadas Glazing e Pele de Vidro. Modernidade e sofisticação para prédios comerciais e residências de alto padrão." 
    },
    { 
        nome: "Guarda Corpo", 
        img: "https://images.unsplash.com/photo-1512918766665-cb22d9699435?w=800",
        desc: "Unimos segurança e design. Nossos guarda-corpos atendem todas as normas técnicas, proporcionando proteção para escadas e sacadas sem perder a vista." 
    },
    { 
        nome: "Box", 
        img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
        desc: "Box para banheiro com sistemas modernos, desde roldanas aparentes até designs padrão, garantindo elegância e funcionalidade ao seu banho." 
    },
    { 
        nome: "Cobertura", 
        img: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800",
        desc: "Coberturas em vidro laminado com proteção UV. Solução perfeita para pergolados e áreas externas, garantindo iluminação natural com segurança." 
    },
    { 
        nome: "Portão", 
        img: "https://images.unsplash.com/photo-1516594709413-e7210fe0ddc2?w=800",
        desc: "Portões automatizados em alumínio e vidro. Durabilidade extrema contra o tempo e design que valoriza a entrada do seu imóvel." 
    },
    { 
        nome: "Esquadrias de Alumínio", 
        img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800",
        desc: "Esquadrias personalizadas com perfis de alta qualidade. Oferecemos diversas cores e tipologias para atender exatamente a necessidade do seu projeto." 
    }
];

// ==========================================
// DADOS: FOTOS DA GALERIA INTERNA
// ==========================================
// Configure aqui os nomes exatos das suas fotos dentro de img/nome_da_pasta/
const fotosPorProduto = {
    "Esquadrias": [],
    "Espelhos": ["foto1.jpg", "Espelhos Orgânicos  – Usados para ampliar….jpg"],
    "Box": [],
    "Vidro Temperado": [],
    "Fachadas": [],
    "Guarda Corpo": [],
    "Cobertura": [],
    "Portão": [],
    "Esquadrias de Alumínio": []
};

// ==========================================
// INICIALIZAÇÃO (Roda ao carregar a página)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializa Animações (AOS) globalmente
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    // 2. Verifica se estamos na HOME (index.html)
    const gridHome = document.getElementById('grid-catalogo');
    if (gridHome) {
        initHome(gridHome);
    }

    // 3. Verifica se estamos na GALERIA (galeria.html)
    const gridGaleria = document.getElementById('gallery-grid');
    if (gridGaleria) {
        initGaleria(gridGaleria);
    }

    // 4. Inicializa Banner de Cookies (NOVO)
    initCookies();
});

// ==========================================
// LÓGICA DA HOME (index.html)
// ==========================================
function initHome(gridElement) {
    gridElement.innerHTML = ""; // Limpa
    
    itensHome.forEach((item, index) => {
        // Observação: Sem 'data-aos' no card para evitar que suma se o script demorar
        gridElement.innerHTML += `
            <div class="col-md-4 col-sm-6">
                <div class="product-card shadow-sm"
                     onclick="abrirModalHome('${index}')" style="cursor: pointer;">
                    <div class="product-img">
                        <img src="${item.img}" alt="${item.nome}" loading="lazy">
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
}

// Abre o modal de detalhes na Home
function abrirModalHome(index) {
    const item = itensHome[index];
    const modalElement = document.getElementById('productModal');
    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);
    
    document.getElementById('modalTitle').innerText = item.nome;
    document.getElementById('modalImg').src = item.img;
    document.getElementById('modalDesc').innerText = item.desc;
    
    // Botão que leva para a página da galeria
    const btnGallery = document.getElementById('btnGoToGallery');
    if(btnGallery) {
        btnGallery.onclick = function() {
            window.location.href = `galeria.html?item=${encodeURIComponent(item.nome)}`;
        };
    }
    
    modal.show();
}

// ==========================================
// LÓGICA DA GALERIA (galeria.html)
// ==========================================
function initGaleria(gridElement) {
    // 1. Pega o parâmetro da URL (?item=Box)
    const params = new URLSearchParams(window.location.search);
    let itemNome = params.get('item');

    // Fallback se não tiver nome
    if (!itemNome) itemNome = "Nossos Projetos";

    // 2. Atualiza Textos da Página (Título e Link WhatsApp)
    const labelTitulo = document.getElementById('productLabel');
    if (labelTitulo) labelTitulo.innerText = itemNome;

    const waFooter = document.getElementById('waLinkFooter');
    if (waFooter) {
        const msgZap = `Olá! Estava vendo a galeria de *${itemNome}* no site e gostaria de um orçamento.`;
        waFooter.href = `https://wa.me/5514981266008?text=${encodeURIComponent(msgZap)}`;
    }

    // 3. Prepara a lista de fotos
    const listaFotos = fotosPorProduto[itemNome] || [];
    
    // Normaliza o nome para achar a pasta (Ex: "Guarda Corpo" -> "guarda_corpo")
    const pasta = itemNome.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/ /g, "_"); 

    // 4. Renderiza as fotos
    gridElement.innerHTML = ""; // Limpa carregamento

    if(listaFotos.length > 0) {
        listaFotos.forEach((foto, index) => {
            const caminhoImg = `img/${pasta}/${foto}`;
            
            // Adiciona Delay na animação para efeito cascata
            gridElement.innerHTML += `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="gallery-item" onclick="abrirImagemLightbox('${caminhoImg}')">
                        <img src="${caminhoImg}" alt="${itemNome}" 
                             onerror="this.src='https://via.placeholder.com/600x400?text=Imagem+Indisponível'">
                        
                        <div class="gallery-overlay">
                            <i class="fas fa-search-plus gallery-icon"></i>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // SEGURANÇA: Limpa o texto para evitar códigos maliciosos
        const nomeSeguro = itemNome.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // Mensagem caso não tenha fotos cadastradas
        gridElement.innerHTML = `
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
}

// Abre a imagem em tela cheia (Lightbox) na Galeria
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
// FUNÇÃO: BANNER DE COOKIES (LGPD) - NOVO
// ==========================================
function initCookies() {
    const cookieBanner = document.getElementById('cookieBanner');
    const btnAccept = document.getElementById('btnAcceptCookies');

    // 1. Verifica se já aceitou (olhando no armazenamento do navegador)
    if (!localStorage.getItem('cookiesAceitos')) {
        // Se NÃO aceitou ainda, mostra o banner após 2 segundos
        setTimeout(() => {
            if(cookieBanner) cookieBanner.style.display = 'block';
        }, 2000);
    }

    // 2. Evento de Clique no botão
    if(btnAccept) {
        btnAccept.addEventListener('click', () => {
            // Salva a decisão no navegador do usuário
            localStorage.setItem('cookiesAceitos', 'true');
            // Esconde o banner
            cookieBanner.style.display = 'none';
        });
    }
}