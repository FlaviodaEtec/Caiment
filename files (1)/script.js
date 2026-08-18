/*
============================================================
  CAIMENT - SCRIPT DA LANDING PAGE
============================================================

  1. Abrir e fechar o menu no celular.
  2. Fazer a navegação entre seções da mesma página.
  3. Fazer o botão "Get Started" abrir o teste do avatar.
  4. Criar a tela do teste do avatar automaticamente.
  5. Alterar visualmente tamanho, largura, altura e rotação do avatar.
  6. Criar um espaço para o vídeo MP4.
  7. Adicionar efeitos visuais leves.

*/


/* ============================================================
   1. CONFIGURAÇÕES
============================================================ */

const CONFIG = {
  /*
    Vídeo MP4.
  */
    nomeDoVideo: 'Vídeo Pitch - CAIMENT.mp4',

  /* Arquivos reais usados no teste. */
  arquivoAvatar: 'Avatar CAIMENT.png',
  roupas: {
    /* Cada peça tem seu próprio tamanho e posição fixa no palco. */
    nenhuma: null,
    camiseta: {
      arquivo: 'camiseta.png',
      /* A camiseta ocupa somente a parte superior do corpo. */
      largura: 180,
      altura: 130,
      topo: 70
    },
    vestido: {
      arquivo: 'vestido.png',
      /* O vestido cobre o corpo inteiro, mas não o palco inteiro. */
      largura: 190,
      altura: 400,
      topo: 28
    },
    calca: {
      arquivo: 'calca.png',
      /* A calça começa na cintura e termina perto dos pés. */
      largura: 175,
      altura: 275,
      topo: 20
    }
  },

  /*
    Nome da imagem do avatar.
    Neste projeto o avatar principal já é um SVG dentro do HTML.
  */
  imagemDoAvatar: 'boneco.png',

  /*
    Número do WhatsApp.
  */
  numeroWhatsApp: '5511999999999',

  /* Mensagem inicial do WhatsApp. */
  mensagemWhatsApp: 'Olá! Gostaria de conhecer o sistema Caiment.'
};


/* ============================================================
   2. FUNÇÕES AUXILIARES
============================================================ */

/*
  Procura um único elemento na página.

  Exemplo:
  selecionar('#navbar') procura o elemento que tem id="navbar".
*/
function selecionar(seletor, local = document) {
  return local.querySelector(seletor);
}

/*
  Procura vários elementos e transforma o resultado em uma lista comum.
*/
function selecionarTodos(seletor, local = document) {
  return Array.from(local.querySelectorAll(seletor));
}


/* ============================================================
   3. MENU DE NAVEGAÇÃO
============================================================ */

function prepararMenu() {
  const botaoHamburger = selecionar('#hamburger');
  const listaDeLinks = selecionar('.nav-links');

  /* Se o HTML não tiver esses elementos, a função é encerrada. */
  if (!botaoHamburger || !listaDeLinks) {
    return;
  }

  /* Dizemos aos leitores de tela que o menu começa fechado. */
  botaoHamburger.setAttribute('aria-expanded', 'false');

  botaoHamburger.addEventListener('click', function () {
    /*
      A classe "open" já está prevista no CSS.
      Quando ela é adicionada, o menu aparece no celular.
    */
    const menuAberto = listaDeLinks.classList.toggle('open');

    botaoHamburger.setAttribute('aria-expanded', String(menuAberto));
    botaoHamburger.setAttribute(
      'aria-label',
      menuAberto ? 'Fechar menu' : 'Abrir menu'
    );
  });

  /* Fechamos o menu depois que o usuário escolhe uma seção. */
  selecionarTodos('.nav-links a').forEach(function (link) {
    link.addEventListener('click', fecharMenu);
  });
}

function fecharMenu() {
  const listaDeLinks = selecionar('.nav-links');
  const botaoHamburger = selecionar('#hamburger');

  if (listaDeLinks) {
    listaDeLinks.classList.remove('open');
  }

  if (botaoHamburger) {
    botaoHamburger.setAttribute('aria-expanded', 'false');
    botaoHamburger.setAttribute('aria-label', 'Abrir menu');
  }
}


/* ============================================================
   4. NAVEGAÇÃO SUAVE ENTRE AS SEÇÕES
============================================================ */

function prepararNavegacaoSuave() {
  const linksInternos = selecionarTodos('a[href^="#"]');

  linksInternos.forEach(function (link) {
    link.addEventListener('click', function (evento) {
      const idDoDestino = link.getAttribute('href');
      const destino = idDoDestino ? selecionar(idDoDestino) : null;

      /*
        O botão principal tem a classe .btn-primary.
        Em vez de ir diretamente ao pré-cadastro,
        ele abrirá o teste do avatar.
      */
      if (link.classList.contains('btn-primary')) {
        evento.preventDefault();
        abrirTesteDoAvatar();
        return;
      }

      /*
        Se o destino existir, rolamos até ele suavemente.
      */
      if (destino) {
        evento.preventDefault();
        destino.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        fecharMenu();
      }
    });
  });
}


/* ============================================================
   5. EFEITO DA NAVBAR AO ROLAR A PÁGINA
============================================================ */

function prepararEfeitoDaNavbar() {
  const navbar = selecionar('#navbar');

  if (!navbar) {
    return;
  }

  function verificarRolagem() {
    /*
      O CSS já possui a classe .scrolled.
      O JavaScript apenas adiciona ou remove essa classe.
    */
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  verificarRolagem();
  window.addEventListener('scroll', verificarRolagem);
}


/* ============================================================
   6. WHATSAPP
============================================================ */

function prepararWhatsApp() {
  const mensagem = encodeURIComponent(CONFIG.mensagemWhatsApp);
  const linkDoWhatsApp =
    'https://wa.me/' + CONFIG.numeroWhatsApp + '?text=' + mensagem;

  /*
    O HTML tem um botão de pré-cadastro.
    Ele será transformado em um link para o WhatsApp.
  */
  const botoesDeContato = selecionarTodos('.nav-cta, .btn-cta-grande');

  botoesDeContato.forEach(function (botao) {
    botao.setAttribute('href', linkDoWhatsApp);
    botao.setAttribute('target', '_blank');
    botao.setAttribute('rel', 'noopener noreferrer');
  });
}


/* ============================================================
   7. VÍDEO MP4
============================================================ */

function criarAreaDoVideo() {
  /*
    Se já houver um vídeo no HTML, não criamos outro.
  */
  if (selecionar('video')) {
    return;
  }

  const hero = selecionar('#home');

  if (!hero) {
    return;
  }

  /* Criamos uma seção nova usando JavaScript. */
  const secaoDoVideo = document.createElement('section');
  secaoDoVideo.id = 'video-caiment';
  secaoDoVideo.setAttribute('aria-label', 'Vídeo de apresentação do Caiment');

  secaoDoVideo.innerHTML = `
    <div class="container">
      <h2>Conheça o CAIMENT</h2>
      <video controls muted playsinline preload="metadata">
        <source src="${CONFIG.nomeDoVideo}" type="video/mp4">
        Seu navegador não consegue reproduzir vídeos MP4.
      </video>
      <p class="mensagem-video">
        Fonte: Os autores.
      </p>
    </div>
  `;

  /* Inserimos a seção logo depois do hero. */
  hero.insertAdjacentElement('afterend', secaoDoVideo);

  /*
    Aplicamos somente os estilos desse novo elemento pelo próprio JavaScript.
  */
  const estiloDoVideo = document.createElement('style');
  estiloDoVideo.textContent = `
    #video-caiment {
      padding: 5rem 0;
      text-align: center;
      background: var(--white);
    }

    #video-caiment h2 {
      margin-bottom: 2rem;
      color: var(--dark);
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3rem);
    }

    #video-caiment video {
      display: block;
      width: min(900px, 100%);
      max-height: 520px;
      margin: 0 auto;
      border-radius: 24px;
      background: #262423;
      box-shadow: 0 20px 50px rgba(37, 15, 97, .18);
    }

    .mensagem-video {
      margin-top: 1rem;
      color: var(--slate);
      font-size: .9rem;
    }
  `;

  document.head.appendChild(estiloDoVideo);

  /*
    Se o navegador não conseguir encontrar ou abrir o vídeo,
    mostramos uma mensagem clara na própria página.
  */
  const video = selecionar('#video-caiment video');
  const mensagemDoVideo = selecionar('.mensagem-video');

  video.addEventListener('error', function () {
    mensagemDoVideo.textContent =
      'Não foi possível carregar o vídeo. Verifique se o arquivo se chama "' +
      CONFIG.nomeDoVideo + '" e está na mesma pasta do index.html.';
    mensagemDoVideo.style.color = '#b00020';
    console.error('Vídeo não encontrado:', CONFIG.nomeDoVideo);
  });
}


/* ============================================================
   8. ESTILOS DA JANELA DO TESTE
============================================================ */

function criarEstilosDoTeste() {
  if (selecionar('#estilos-do-teste')) {
    return;
  }

  const estilo = document.createElement('style');
  estilo.id = 'estilos-do-teste';

  estilo.textContent = `
    .janela-teste {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      overflow-y: auto;
      background: rgba(20, 14, 30, .76);
      backdrop-filter: blur(5px);
      opacity: 0;
      visibility: hidden;
      transition: opacity .3s ease, visibility .3s ease;
    }

    .janela-teste.aberta {
      opacity: 1;
      visibility: visible;
    }

    .caixa-teste {
      position: relative;
      width: min(1000px, 100%);
      max-height: calc(100vh - 2rem);
      overflow-y: auto;
      overflow-x: hidden;
      padding: clamp(1.5rem, 4vw, 3rem);
      border-radius: 28px;
      background: var(--white);
      box-shadow: 0 30px 90px rgba(0, 0, 0, .4);
      transform: translateY(20px) scale(.98);
      transition: transform .3s ease;
    }

    .janela-teste.aberta .caixa-teste {
      transform: translateY(0) scale(1);
    }

    .fechar-teste {
      position: absolute;
      top: 1rem;
      right: 1.2rem;
      border: 0;
      background: transparent;
      color: var(--plum);
      font-size: 2rem;
      cursor: pointer;
    }

    .titulo-teste {
      margin-bottom: 2rem;
      color: var(--plum);
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 4rem);
    }

    .grade-teste {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      align-items: center;
    }

    .palco-do-avatar {
      position: relative;
      width: 100%;
      height: clamp(420px, 62vh, 560px);
      min-height: 420px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      overflow: hidden;
      border-radius: 24px;
      background: #808384;
    }

    .avatar-painel {
      position: absolute;
      left: 50%;
      bottom: 18px;
      z-index: 1;
      width: 280px;
      height: 420px;
      transform: translateX(-50%) rotate(var(--rotacao, 0deg)) scaleX(var(--largura, 1)) scaleY(var(--altura, 1));
      transform-origin: bottom center;
      object-fit: contain;
      transition: transform .2s ease;
    }

    .corpo-do-avatar {
      position: absolute;
      left: 50%;
      bottom: 18px;
      z-index: 1;
      width: 180px;
      height: 420px;
      object-fit: fill;
      transform: translateX(-50%) rotate(var(--rotacao, 0deg)) scale(var(--escala-palco, 1)) scaleX(var(--largura, 1)) scaleY(var(--altura, 1));
      transform-origin: bottom center;
      filter: var(--filtro, none);
      transition: transform .2s ease, filter .2s ease;
    }

    .roupa-da-imagem {
      position: absolute;
      left: 49.8%;
      top: 115px;
      z-index: 2;
      width: 92px;
      height: 220px;
      object-fit: fill;
      transform: translateX(-50%) scale(var(--escala-palco, 1));
      transform-origin: center bottom;
      pointer-events: none;
    }

    .avatar-do-teste {
      width: 230px;
      max-height: 370px;
      object-fit: contain;
      transform: rotate(var(--rotacao, 0deg))
                 scaleX(var(--largura, 1))
                 scaleY(var(--altura, 1));
      transform-origin: bottom center;
      filter: var(--filtro, none);
      transition: transform .2s ease, filter .2s ease;
    }

    .roupa-do-avatar {
      position: absolute;
      bottom: 34px;
      left: 50%;
      z-index: 2;
      width: 150px;
      height: 220px;
      transform: translateX(-50%) rotate(var(--rotacao, 0deg)) scaleX(var(--largura, 1));
      transform-origin: bottom center;
      pointer-events: none;
      transition: transform .2s ease;
    }

    .controles-do-teste {
      display: grid;
      gap: 1.2rem;
    }

    .controle-teste {
      display: grid;
      gap: .4rem;
    }

    .controle-teste label {
      display: flex;
      justify-content: space-between;
      color: var(--plum);
      font-weight: 600;
    }

    .controle-teste input {
      width: 100%;
      accent-color: var(--violet);
    }

    .controle-teste select {
      width: 100%;
      padding: .7rem;
      border: 1px solid #c9e0eb;
      border-radius: 8px;
      background: white;
      color: var(--plum);
      font: inherit;
    }

    .cores-de-pele {
      display: flex;
      gap: .7rem;
      margin-top: .5rem;
    }

    .cor-de-pele {
      width: 30px;
      height: 30px;
      border: 2px solid transparent;
      border-radius: 50%;
      cursor: pointer;
    }

    .cor-de-pele.selecionada {
      outline: 3px solid var(--violet);
      outline-offset: 2px;
    }

    /*
      Em telas pequenas, os controles ficam abaixo do palco.
      Assim o avatar não é esmagado pela coluna de controles.
    */
    @media (max-width: 760px) {
      .janela-teste {
        align-items: flex-start;
        padding: .5rem;
      }

      .caixa-teste {
        width: 100%;
        max-height: calc(100vh - 1rem);
        padding: 1.25rem;
        border-radius: 20px;
      }

      .grade-teste {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .palco-do-avatar {
        height: min(62vh, 500px);
        min-height: 360px;
      }

      .titulo-teste {
        margin-top: 1.5rem;
      }
    }

    @media (max-width: 420px) {
      .palco-do-avatar {
        height: 410px;
        min-height: 340px;
      }
    }

    .acoes-do-teste {
      display: flex;
      flex-wrap: wrap;
      gap: .8rem;
      margin-top: .7rem;
    }

    .acoes-do-teste button {
      padding: .8rem 1.2rem;
      border: 0;
      border-radius: 50px;
      background: var(--violet);
      color: var(--white);
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .acoes-do-teste .botao-reset {
      background: var(--lime);
      color: var(--dark);
    }

    body.teste-aberto {
      overflow: hidden;
    }

    @media (max-width: 700px) {
      .grade-teste {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .palco-do-avatar {
        min-height: 340px;
      }
    }
  `;

  document.head.appendChild(estilo);
}


/* ============================================================
   9. CRIAÇÃO DO TESTE DO AVATAR
============================================================ */

function criarTesteDoAvatar() {
  /* Evitamos criar a mesma janela várias vezes. */
  if (selecionar('#janela-teste-caiment')) {
    return;
  }

  const janela = document.createElement('div');
  janela.id = 'janela-teste-caiment';
  janela.className = 'janela-teste';
  janela.setAttribute('role', 'dialog');
  janela.setAttribute('aria-modal', 'true');
  janela.setAttribute('aria-label', 'Teste do avatar Caiment');

  /*
    Usamos duas imagens separadas:
    - Avatar CAIMENT.png representa o corpo;
    - calca.png representa a calça.

    A calça fica por cima do corpo.
    Assim, ela aparece como uma roupa vestida no avatar.
  */
  /*
    Agora usamos duas imagens separadas:
    - o corpo do avatar;
    - a calça colocada por cima dele.

    A roupa não será redimensionada quando os controles mudarem.
  */
  const avatarHTML = `
    <img
      class="corpo-do-avatar"
      id="corpo-do-avatar"
      src="${CONFIG.arquivoAvatar}"
      alt="Avatar do Caiment"
    >
    <img
      class="roupa-da-imagem"
      id="calca-da-imagem"
      src="calca.png"
      alt="Calça do avatar"
    >
  `;

  janela.innerHTML = `
          <div class="caixa-teste">
      <button class="fechar-teste" type="button" aria-label="Fechar teste">&times;</button>
      <h2 class="titulo-teste">Ajuste seu avatar</h2>

      <div class="grade-teste">
        <div class="palco-do-avatar">
          ${avatarHTML}

        </div>

        <div class="controles-do-teste">
          <div class="controle-teste">
            <label for="controle-busto">
              Busto <output id="valor-busto">50</output>
            </label>
            <input id="controle-busto" type="range" min="0" max="100" value="50">
          </div>

          <div class="controle-teste">
            <label for="controle-cintura">
              Cintura <output id="valor-cintura">50</output>
            </label>
            <input id="controle-cintura" type="range" min="0" max="100" value="50">
          </div>

          <div class="controle-teste">
            <label for="controle-quadril">
              Quadril <output id="valor-quadril">50</output>
            </label>
            <input id="controle-quadril" type="range" min="0" max="100" value="50">
          </div>

          <div class="controle-teste">
            <label for="controle-rotacao">
              Rotação <output id="valor-rotacao">0°</output>
            </label>
            <input id="controle-rotacao" type="range" min="-15" max="15" value="0">
          </div>

          <div>
            <strong>Tom de pele</strong>
            <div class="cores-de-pele">
              <button class="cor-de-pele selecionada" type="button" data-pele="clara" style="background:#f6c9a7" aria-label="Pele clara"></button>
              <button class="cor-de-pele" type="button" data-pele="media-clara" style="background:#e8aa82" aria-label="Pele média clara"></button>
              <button class="cor-de-pele" type="button" data-pele="media" style="background:#bd784d" aria-label="Pele média"></button>
              <button class="cor-de-pele" type="button" data-pele="escura" style="background:#754326" aria-label="Pele escura"></button>
            </div>
          </div>

          <div class="controle-teste">
            <label for="seletor-roupa">Roupa para testar</label>
            <select id="seletor-roupa">
              <option value="nenhuma">Sem roupa adicional</option>
              <option value="camiseta">Camiseta</option>
              <option value="vestido">Vestido</option>
              <option value="calca">Calça</option>
            </select>
          </div>

          <div class="acoes-do-teste">
            <button class="botao-reset" id="redefinir-avatar" type="button">Redefinir</button>
            <button id="continuar-teste" type="button">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(janela);

  /*
    A partir de agora o teste usará somente a calça.
  */
  const seletorDeRoupa = selecionar('#seletor-roupa', janela);
  if (seletorDeRoupa) {
    seletorDeRoupa.innerHTML = `
      <option value="nenhuma">Sem roupa</option>
      <option value="calca">Calça</option>
    `;
    seletorDeRoupa.value = 'nenhuma';
  }

  configurarEventosDoTeste(janela);
}


/* ============================================================
   10. ATUALIZAÇÃO VISUAL DO AVATAR
============================================================ */

function ajustarEscalaDoPalco(tela) {
  /* Encontramos o palco e as duas camadas do avatar. */
  const palco = selecionar('.palco-do-avatar', tela);
  const avatar = selecionar('#corpo-do-avatar', tela);
  const calca = selecionar('#calca-da-imagem', tela);

  if (!palco || !avatar) {
    return;
  }

  /*
    O tamanho de referência foi pensado para um palco de 460px de altura.
    Se o palco ficar menor, reduzimos as duas camadas juntas.
    Assim o avatar continua inteiro e a calça continua proporcional.
  */
  const alturaDisponivel = Math.max(palco.clientHeight - 30, 300);
  const larguraDisponivel = Math.max(palco.clientWidth - 24, 180);
  const escalaPelaAltura = alturaDisponivel / 438;
  const escalaPelaLargura = larguraDisponivel / 210;
  const escala = Math.min(1, escalaPelaAltura, escalaPelaLargura);

  avatar.style.setProperty('--escala-palco', escala.toFixed(3));

  if (calca) {
    calca.style.setProperty('--escala-palco', escala.toFixed(3));
  }
}

function atualizarAvatar(tela) {
  /*
    Selecionamos somente a imagem do corpo.
    A roupa está em outro elemento e não será transformada.
  */
  /* Somente o corpo será alterado pelos controles. */
  const avatar = selecionar('#corpo-do-avatar', tela) || selecionar('.corpo-do-avatar', tela);

  if (!avatar) {
    return;
  }

  const busto = Number(selecionar('#controle-busto', tela).value);
  const cintura = Number(selecionar('#controle-cintura', tela).value);
  const quadril = Number(selecionar('#controle-quadril', tela).value);
  const rotacao = Number(selecionar('#controle-rotacao', tela).value);

  /* Atualizamos os números que aparecem ao lado dos controles. */
  selecionar('#valor-busto', tela).textContent = busto;
  selecionar('#valor-cintura', tela).textContent = cintura;
  selecionar('#valor-quadril', tela).textContent = quadril;
  selecionar('#valor-rotacao', tela).textContent = rotacao + '°';

  /*
    Transformamos os valores dos controles em números entre 0 e 1.

    scaleX altera a largura.
    scaleY altera a altura.
    rotate altera a rotação.

    Isso é uma simulação visual simples, não uma deformação 3D real.
  */
  const largura = 0.85 + ((busto + quadril) / 200) * 0.3;
  const altura = 0.95 + (cintura / 100) * 0.1;

  avatar.style.setProperty('--largura', largura.toFixed(2));
  avatar.style.setProperty('--altura', altura.toFixed(2));
  avatar.style.setProperty('--rotacao', rotacao + 'deg');

  const corSelecionada = selecionar('.cor-de-pele.selecionada', tela);
  const tipoDePele = corSelecionada ? corSelecionada.dataset.pele : 'clara';

  avatar.style.setProperty('--filtro', filtroDaPele(tipoDePele));

  /* Atualizamos também a roupa escolhida. */
  atualizarRoupa(tela);
}

function atualizarRoupa(tela) {
  /* Encontramos a calça e o seletor de roupa. */
  const calca = selecionar('#calca-da-imagem', tela);
  const seletor = selecionar('#seletor-roupa', tela);

  if (!calca || !seletor) {
    return;
  }

  /*
    Se o usuário escolher "Sem roupa", a imagem da calça desaparece.
    Se escolher "Calça", ela aparece novamente.
  */
  const calcaEstaAtiva = seletor.value === 'calca';
  calca.style.display = calcaEstaAtiva ? 'block' : 'none';
  calca.src = 'calca.png';

  /* Atualizamos o estado dos controles de medidas. */
  atualizarEstadoDasMedidas(tela);
}

function atualizarEstadoDasMedidas(tela) {
  const seletor = selecionar('#seletor-roupa', tela);
  const medidas = selecionarTodos(
    '#controle-busto, #controle-cintura, #controle-quadril',
    tela
  );

  if (!seletor) {
    return;
  }

  const calcaEstaAtiva = seletor.value === 'calca';

  medidas.forEach(function (medida) {
    /*
      Não usamos disabled, porque precisamos detectar a tentativa
      de alteração e mostrar a mensagem do WhatsApp.
    */
    medida.setAttribute('aria-disabled', String(calcaEstaAtiva));
    medida.title = calcaEstaAtiva
      ? 'As medidas estão bloqueadas com a calça ativa.'
      : 'Medida liberada porque nenhuma roupa está selecionada.';
  });
}

function filtroDaPele(tipoDePele) {
  /*
    Como o SVG atual é todo preenchido com a mesma cor,
    este filtro muda o tom do desenho inteiro.

    Para separar pele, roupa e cabelo, será necessário editar o SVG
    ou usar um modelo 3D. Isso será explicado separadamente.
  */
  const filtros = {
    clara: 'none',
    'media-clara': 'sepia(.12) saturate(1.15)',
    media: 'sepia(.4) saturate(1.3) brightness(.9)',
    escura: 'sepia(.7) saturate(1.5) brightness(.7)'
  };

  return filtros[tipoDePele] || 'none';
}


/* ============================================================
   11. EVENTOS DA TELA DE TESTE
============================================================ */

function mostrarAvisoDeMedidas() {
  /*
    confirm() cria uma caixinha simples com dois botões:
    - OK: o usuário quer entrar em contato.
    - Cancelar: o usuário nega e volta ao teste.

    É uma função básica do JavaScript, sem biblioteca externa.
  */
  const desejaContinuar = window.confirm(
    'As medidas estão bloqueadas enquanto o avatar usa a calça.\\n\\n' +
    'Para prosseguir com alterações de busto, cintura ou quadril, entre em contato pelo WhatsApp.\\n\\n' +
    'Clique em OK para abrir o WhatsApp ou em Cancelar para voltar ao teste.'
  );

  if (desejaContinuar) {
    const mensagem = encodeURIComponent(
      'Olá! Gostaria de prosseguir com a alteração das medidas do avatar usando a calça.'
    );

    const link =
      'https://wa.me/' + CONFIG.numeroWhatsApp + '?text=' + mensagem;

    window.open(link, '_blank');
  }
}

function configurarEventosDoTeste(tela) {
  /* Ajustamos o avatar assim que a tela de teste aparece. */
  ajustarEscalaDoPalco(tela);

  /* Recalculamos a escala quando a janela muda de tamanho. */
  window.addEventListener('resize', function () {
    ajustarEscalaDoPalco(tela);
  });

  /*
    Busto, cintura e quadril começam em 50.
    Esses valores serão restaurados se o usuário tentar alterá-los.
  */
  const valoresIniciais = {
    'controle-busto': 50,
    'controle-cintura': 50,
    'controle-quadril': 50
  };

  /* Atualizamos o avatar ou bloqueamos a medida. */
  selecionarTodos('input[type="range"]', tela).forEach(function (controle) {
    controle.addEventListener('input', function () {
      const seletor = selecionar('#seletor-roupa', tela);
      const calcaEstaAtiva = seletor && seletor.value === 'calca';
      const eMedidaBloqueada =
        calcaEstaAtiva &&
        Object.prototype.hasOwnProperty.call(valoresIniciais, controle.id);

      if (eMedidaBloqueada) {
        /* Voltamos o controle ao valor inicial. */
        controle.value = valoresIniciais[controle.id];
        mostrarAvisoDeMedidas();
        return;
      }

      /* A rotação continua liberada. */
      atualizarAvatar(tela);
    });
  });

  /* Quando a roupa muda, desenhamos outra roupa no SVG. */
  selecionar('#seletor-roupa', tela).addEventListener('change', function () {
    atualizarRoupa(tela);
    atualizarAvatar(tela);
  });

  /* Seleção do tom de pele. */
  selecionarTodos('.cor-de-pele', tela).forEach(function (botao) {
    botao.addEventListener('click', function () {
      selecionarTodos('.cor-de-pele', tela).forEach(function (outroBotao) {
        outroBotao.classList.remove('selecionada');
      });

      botao.classList.add('selecionada');
      atualizarAvatar(tela);
    });
  });

  /* Botão X para fechar. */
  selecionar('.fechar-teste', tela).addEventListener('click', fecharTesteDoAvatar);

  /* Clique no fundo escuro também fecha a janela. */
  tela.addEventListener('click', function (evento) {
    if (evento.target === tela) {
      fecharTesteDoAvatar();
    }
  });

  /* Botão que restaura todos os valores iniciais. */
  selecionar('#redefinir-avatar', tela).addEventListener('click', function () {
    selecionar('#controle-busto', tela).value = 50;
    selecionar('#controle-cintura', tela).value = 50;
    selecionar('#controle-quadril', tela).value = 50;
    selecionar('#controle-rotacao', tela).value = 0;
    selecionar('#seletor-roupa', tela).value = 'nenhuma';

    selecionarTodos('.cor-de-pele', tela).forEach(function (botao, indice) {
      botao.classList.toggle('selecionada', indice === 0);
    });

    atualizarAvatar(tela);
  });

  /* O botão Continuar leva para o WhatsApp. */
  selecionar('#continuar-teste', tela).addEventListener('click', function () {
    const mensagem = encodeURIComponent(
      'Olá! Gostaria de continuar o teste do avatar Caiment.'
    );

    const link =
      'https://wa.me/' + CONFIG.numeroWhatsApp + '?text=' + mensagem;

    window.open(link, '_blank');
  });
}

function abrirTesteDoAvatar() {
  criarEstilosDoTeste();
  criarTesteDoAvatar();

  const tela = selecionar('#janela-teste-caiment');
  tela.classList.add('aberta');
  document.body.classList.add('teste-aberto');

  atualizarAvatar(tela);
  selecionar('.fechar-teste', tela).focus();
}

function fecharTesteDoAvatar() {
  const tela = selecionar('#janela-teste-caiment');

  if (!tela) {
    return;
  }

  tela.classList.remove('aberta');
  document.body.classList.remove('teste-aberto');
}


/* ============================================================
   12. TECLA ESC
============================================================ */

function prepararTeclaEscape() {
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
      fecharTesteDoAvatar();
      fecharMenu();
    }
  });
}


/* ============================================================
   13. EFEITOS VISUAIS EXTRAS
============================================================ */

function prepararEfeitosVisuais() {
  /* Pequeno efeito de inclinação nos cards ao passar o mouse. */
  selecionarTodos('.feature-card, .team-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* Movimento discreto do avatar principal conforme o mouse. */
  const avatarPrincipal = selecionar('.mannequin-svg');

  if (!avatarPrincipal) {
    return;
  }

  const preferePoucoMovimento = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (preferePoucoMovimento) {
    return;
  }

  window.addEventListener('pointermove', function (evento) {
    const x = (evento.clientX / window.innerWidth - 0.5) * 4;
    const y = (evento.clientY / window.innerHeight - 0.5) * 4;

    avatarPrincipal.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
  });
}


/* ============================================================
   14. INICIALIZAÇÃO
============================================================ */

function iniciarSite() {
  prepararMenu();
  prepararNavegacaoSuave();
  prepararEfeitoDaNavbar();
  prepararWhatsApp();
  criarAreaDoVideo();
  prepararTeclaEscape();
  prepararEfeitosVisuais();
}

/*
  O código só começa depois que o HTML terminar de carregar.
*/
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarSite);
} else {
  iniciarSite();
}
