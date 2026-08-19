/*
============================================================
  CAIMENT - JAVASCRIPT DA LANDING PAGE
============================================================
 
  1. Menu mobile.
  2. Navegação suave entre as seções.
  3. Botão TESTE JÁ abrindo o provador.
  4. Avatar com opção sem roupa ou com calça.
  5. Bloqueio das medidas quando a calça está ativa.
  6. Botão do vídeo pitch abrindo um vídeo MP4 em destaque.
  7. Botões de contato abrindo o WhatsApp.
  8. Animações e efeitos visuais leves.
*/
 
/* ============================================================
   1. CONFIGURAÇÕES PRINCIPAIS
============================================================ */
 
const CONFIG = {
    avatar: 'Avatar CAIMENT.png',
    calca: 'calca.png',
    whatsapp: '5511999999999'
};
   
  /* ============================================================
     2. FUNÇÕES AUXILIARES
  ============================================================ */
   
  function selecionar(seletor, local = document) {
    return local.querySelector(seletor);
  }
   
  function selecionarTodos(seletor, local = document) {
    return Array.from(local.querySelectorAll(seletor));
  }
   
  function abrirWhatsApp(mensagem) {
    const texto = encodeURIComponent(mensagem);
    const link = `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  }
   
  /* ============================================================
     3. MENU MOBILE
  ============================================================ */
   
  function configurarMenu() {
    const botao = selecionar('#button22');
    const menu = selecionar('.nav-links');
   
    if (!botao || !menu) return;
   
    botao.addEventListener('click', function () {
      const menuAberto = menu.classList.toggle('ativo');
      botao.setAttribute('aria-expanded', String(menuAberto));
    });
   
    selecionarTodos('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('ativo');
        botao.setAttribute('aria-expanded', 'false');
      });
    });
  }
   
  /* ============================================================
     4. NAVEGAÇÃO SUAVE
  ============================================================ */
   
  function configurarNavegacao() {
    selecionarTodos('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (evento) {
        const destinoId = link.getAttribute('href');
        const destino = destinoId ? selecionar(destinoId) : null;
   
        if (!destino) return;
   
        evento.preventDefault();
        destino.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }
   
  /* ============================================================
     5. BOTÕES DO HTML
  ============================================================ */
   
  function configurarBotoesPrincipais() {
    /* O primeiro botão .butto é o TESTE JÁ. */
    const botaoTeste = selecionar('.hero .butto');
   
    if (botaoTeste) {
      botaoTeste.addEventListener('click', function (evento) {
        evento.preventDefault();
        abrirTesteAvatar();
      });
    }
   
    /* Os botões de contato levam ao WhatsApp. */
    const botoesContato = selecionarTodos('.nav-cta, #cadastro .butto');
   
    botoesContato.forEach(function (botao) {
      botao.addEventListener('click', function (evento) {
        evento.preventDefault();
        abrirWhatsApp('Olá! Gostaria de conhecer o sistema Caiment.');
      });
    });
  }
 
  /* ============================================================
     ESTILOS DO TESTE DO AVATAR
  ============================================================ */
   
  function adicionarEstilosDoTeste() {
    if (selecionar('#estilos-teste-avatar')) return;
   
    const estilo = document.createElement('style');
    estilo.id = 'estilos-teste-avatar';
    estilo.textContent = `
      .modal-teste-avatar {
        position: fixed;
        inset: 0;
        z-index: 1900;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(20, 12, 35, .8);
        backdrop-filter: blur(6px);
        opacity: 0;
        visibility: hidden;
        transition: opacity .25s ease, visibility .25s ease;
      }
   
      .modal-teste-avatar.aberto {
        opacity: 1;
        visibility: visible;
      }
   
      .caixa-teste-avatar {
        position: relative;
        width: min(980px, 100%);
        max-height: calc(100vh - 2rem);
        overflow-y: auto;
        padding: clamp(1.2rem, 4vw, 2.5rem);
        border-radius: 24px;
        background: #ffffff;
        box-shadow: 0 25px 80px rgba(0, 0, 0, .45);
      }
   
      .caixa-teste-avatar h2 {
        margin: 0 0 1.5rem;
        color: #39215f;
      }
   
      .grade-teste-js {
        display: grid;
        grid-template-columns: minmax(250px, 1fr) minmax(260px, 1fr);
        gap: 2rem;
        align-items: center;
      }
   
      .palco-teste-js {
        position: relative;
        min-height: 430px;
        overflow: hidden;
        border-radius: 22px;
        background: #808384;
      }
   
      .avatar-teste-js {
        position: absolute;
        left: 50%;
        bottom: 12px;
        z-index: 1;
        width: 210px;
        height: 410px;
        object-fit: contain;
        transform: translateX(-50%) rotate(var(--rotacao, 0deg)) scaleX(var(--largura, 1)) scaleY(var(--altura, 1));
        transform-origin: bottom center;
        transition: transform .2s ease, filter .2s ease;
      }
   
      .controles-teste-js {
        display: grid;
        gap: 1rem;
      }
   
      .controles-teste-js label {
        display: flex;
        justify-content: space-between;
        margin-bottom: .3rem;
        color: #39215f;
        font-weight: 700;
      }
   
      .controles-teste-js input,
      .controles-teste-js select {
        width: 100%;
      }
   
      .cores-teste-js {
        display: flex;
        gap: .6rem;
      }
   
      .cor-teste-js {
        width: 28px;
        height: 28px;
        border: 2px solid transparent;
        border-radius: 50%;
        cursor: pointer;
      }
   
      .cor-teste-js.selecionada {
        outline: 3px solid #9852df;
        outline-offset: 2px;
      }
   
      .fechar-teste-js {
        color: #39215f;
      }
   
      @media (max-width: 720px) {
        .grade-teste-js {
          grid-template-columns: 1fr;
        }
   
        .palco-teste-js {
          min-height: 390px;
        }
      }
    `;
   
    document.head.appendChild(estilo);
  }
   
  /* ============================================================
     8. TESTE DO AVATAR
  ============================================================ */
   
  function abrirTesteAvatar() {
    adicionarEstilosDoTeste();
   
    const existente = selecionar('#modal-teste-avatar');
    if (existente) {
      existente.classList.add('aberto');
      return;
    }
   
    const modal = document.createElement('div');
    modal.id = 'modal-teste-avatar';
    modal.className = 'modal-teste-avatar aberto';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="caixa-teste-avatar">
        <button class="fechar-teste-js" type="button" aria-label="Fechar teste">&times;</button>
        <h2>Ajuste seu avatar</h2>
   
        <div class="grade-teste-js">
          <div class="palco-teste-js">
            <img class="avatar-teste-js" src="${CONFIG.avatar}" alt="Avatar para teste">
          </div>
   
          <div class="controles-teste-js">
            <div>
              <label for="teste-busto">Busto <output id="valor-teste-busto">50</output></label>
              <input id="teste-busto" type="range" min="0" max="100" value="50">
            </div>
   
            <div>
              <label for="teste-cintura">Cintura <output id="valor-teste-cintura">50</output></label>
              <input id="teste-cintura" type="range" min="0" max="100" value="50">
            </div>
   
            <div>
              <label for="teste-quadril">Quadril <output id="valor-teste-quadril">50</output></label>
              <input id="teste-quadril" type="range" min="0" max="100" value="50">
            </div>
   
            <div>
              <label for="teste-rotacao">Rotação <output id="valor-teste-rotacao">0°</output></label>
              <input id="teste-rotacao" type="range" min="-15" max="15" value="0">
            </div>
   
            <div>
              <strong>Tom de pele</strong>
              <div class="cores-teste-js">
                <button class="cor-teste-js selecionada" data-filtro="none" style="background:#f6c9a7" aria-label="Pele clara"></button>
                <button class="cor-teste-js" data-filtro="sepia(.25) saturate(1.2)" style="background:#e8aa82" aria-label="Pele média clara"></button>
                <button class="cor-teste-js" data-filtro="sepia(.55) saturate(1.3) brightness(.9)" style="background:#bd784d" aria-label="Pele média"></button>
                <button class="cor-teste-js" data-filtro="sepia(.8) saturate(1.5) brightness(.75)" style="background:#754326" aria-label="Pele escura"></button>
              </div>
            </div>
   
            <button type="button" id="resetar-teste">Redefinir</button>
          </div>
        </div>
      </div>
    `;
   
    document.body.appendChild(modal);
    configurarEventosDoAvatar(modal);
    atualizarAvatar(modal);
  }
   
  function atualizarAvatar(modal) {
    const avatar = selecionar('.avatar-teste-js', modal);
   
    if (!avatar) return;
   
    const busto = Number(selecionar('#teste-busto', modal).value);
    const cintura = Number(selecionar('#teste-cintura', modal).value);
    const quadril = Number(selecionar('#teste-quadril', modal).value);
    const rotacao = Number(selecionar('#teste-rotacao', modal).value);
   
    selecionar('#valor-teste-busto', modal).textContent = busto;
    selecionar('#valor-teste-cintura', modal).textContent = cintura;
    selecionar('#valor-teste-quadril', modal).textContent = quadril;
    selecionar('#valor-teste-rotacao', modal).textContent = `${rotacao}°`;
   
    /* Sem roupa: os atributos do avatar ficam liberados. */
    const largura = 0.85 + ((busto + quadril) / 200) * .3;
    const altura = 0.95 + (cintura / 100) * .1;
   
    avatar.style.setProperty('--largura', largura.toFixed(2));
    avatar.style.setProperty('--altura', altura.toFixed(2));
    avatar.style.setProperty('--rotacao', `${rotacao}deg`);
    avatar.style.filter = avatar.dataset.filtro || 'none';
  }
   
  function configurarEventosDoAvatar(modal) {
    const controlesDeMedida = [
      selecionar('#teste-busto', modal),
      selecionar('#teste-cintura', modal),
      selecionar('#teste-quadril', modal)
    ];
   
    controlesDeMedida.forEach(function (controle) {
      controle.addEventListener('input', function () {
        /* Sem roupa: qualquer medida pode ser alterada. */
        atualizarAvatar(modal);
      });
    });
   
    selecionar('#teste-rotacao', modal).addEventListener('input', function () {
      atualizarAvatar(modal);
    });
   
   
    selecionarTodos('.cor-teste-js', modal).forEach(function (botao) {
      botao.addEventListener('click', function () {
        selecionarTodos('.cor-teste-js', modal).forEach(function (outro) {
          outro.classList.remove('selecionada');
        });
   
        botao.classList.add('selecionada');
        selecionar('.avatar-teste-js', modal).dataset.filtro = botao.dataset.filtro;
        atualizarAvatar(modal);
      });
    });
   
    selecionar('#resetar-teste', modal).addEventListener('click', function () {
      selecionar('#teste-busto', modal).value = 50;
      selecionar('#teste-cintura', modal).value = 50;
      selecionar('#teste-quadril', modal).value = 50;
      selecionar('#teste-rotacao', modal).value = 0;
      atualizarAvatar(modal);
    });
   
    selecionar('.fechar-teste-js', modal).addEventListener('click', function () {
      modal.classList.remove('aberto');
    });
   
    modal.addEventListener('click', function (evento) {
      if (evento.target === modal) modal.classList.remove('aberto');
    });
  }
   
  /* ============================================================
     9. EFEITOS VISUAIS
  ============================================================ */
   
  function configurarEfeitosVisuais() {
    const navbar = selecionar('#navbar');
   
    window.addEventListener('scroll', function () {
      if (navbar) navbar.classList.toggle('rolando', window.scrollY > 30);
    });
   
    /* Elementos aparecem suavemente ao entrar na tela. */
    const elementos = selecionarTodos('.section-title, .team-card, .vmvcard, .mascote-img');
   
    elementos.forEach(function (elemento) {
      elemento.style.transition = 'opacity .6s ease, transform .6s ease';
      elemento.style.opacity = '0';
      elemento.style.transform = 'translateY(18px)';
   
      const observador = new IntersectionObserver(function (entradas, observer) {
        if (entradas[0].isIntersecting) {
          elemento.style.opacity = '1';
          elemento.style.transform = 'translateY(0)';
          observer.unobserve(elemento);
        }
      }, { threshold: .15 });
   
      observador.observe(elemento);
    });
   
    /* Movimento delicado do boneco no hero. */
    const boneco = selecionar('.hero-boneco img');
   
    if (boneco) {
      boneco.style.transition = 'transform .2s ease';
   
      document.addEventListener('mousemove', function (evento) {
        const x = (evento.clientX / window.innerWidth - .5) * 8;
        const y = (evento.clientY / window.innerHeight - .5) * 5;
        boneco.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
   
    /* Cards sobem levemente quando o mouse passa por cima. */
    selecionarTodos('.team-card, .vmvcard').forEach(function (card) {
      card.style.transition = 'transform .25s ease, box-shadow .25s ease';
   
      card.addEventListener('mouseenter', function () {
        card.style.transform = 'translateY(-6px)';
        card.style.boxShadow = '0 14px 30px rgba(56, 33, 95, .16)';
      });
   
      card.addEventListener('mouseleave', function () {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
      });
    });
  }
   
  /* ============================================================
     10. TECLA ESC E INICIALIZAÇÃO
  ============================================================ */
   
  document.addEventListener('keydown', function (evento) {
    if (evento.key !== 'Escape') return;

    const teste = selecionar('#modal-teste-avatar');

    if (teste) {
        teste.classList.remove('aberto');
    }
});

  document.addEventListener('DOMContentLoaded', function () {
    configurarMenu();
    configurarNavegacao();
    configurarBotoesPrincipais();
    configurarEfeitosVisuais();
});
   
