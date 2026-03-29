// =============================================
// MCK ADVOGADOS - JavaScript Principal
// Site Estático - Sem dependência WordPress
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // === MENU MOBILE ===
    const btnMenu = document.getElementById('btn-menu');
    const menuOverlay = document.getElementById('menu-mobile-overlay');
    const btnFecharMenu = document.getElementById('fechar-menu');

    if (btnMenu && menuOverlay) {
        btnMenu.addEventListener('click', function () {
            menuOverlay.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        });
    }

    if (btnFecharMenu && menuOverlay) {
        btnFecharMenu.addEventListener('click', function () {
            menuOverlay.classList.remove('ativo');
            document.body.style.overflow = '';
        });
    }

    // Fechar menu ao clicar em um link
    if (menuOverlay) {
        menuOverlay.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menuOverlay.classList.remove('ativo');
                document.body.style.overflow = '';
            });
        });
    }

    // === CAROUSEL ===
    function iniciarCarousel(carouselId, intervalo) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const items = carousel.querySelectorAll('.carousel-item');
        if (items.length === 0) return;

        let atual = 0;

        function mostrarItem(index) {
            items.forEach(function (item) {
                item.classList.remove('active');
            });
            items[index].classList.add('active');
        }

        function proximo() {
            atual = (atual + 1) % items.length;
            mostrarItem(atual);
        }

        setInterval(proximo, intervalo || 5000);

        // Botões prev/next
        const btnPrev = carousel.querySelector('.carousel-control-prev');
        const btnNext = carousel.querySelector('.carousel-control-next');

        if (btnPrev) {
            btnPrev.addEventListener('click', function () {
                atual = (atual - 1 + items.length) % items.length;
                mostrarItem(atual);
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', function () {
                proximo();
            });
        }

        // Indicadores
        const indicadores = carousel.querySelectorAll('.carousel-indicators button');
        indicadores.forEach(function (btn, i) {
            btn.addEventListener('click', function () {
                atual = i;
                mostrarItem(atual);
                indicadores.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });
    }

    iniciarCarousel('carouselExampleIndicators', 5000);
    iniciarCarousel('carouselExampleIndicators2', 4000);

    // === ACCORDION (SERVIÇOS MOBILE E RODAPÉ) ===
    document.querySelectorAll('.accordion-header button').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            const isAberto = target.classList.contains('aberto');

            // Fecha todos do mesmo accordion pai
            const accordionPai = btn.closest('.accordion');
            if (accordionPai) {
                accordionPai.querySelectorAll('.accordion-body').forEach(function (body) {
                    body.classList.remove('aberto');
                });
            }

            if (!isAberto) {
                target.classList.add('aberto');
            }
        });
    });

    // === FORMULÁRIO DE CONTATO ===
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function (e) {
            e.preventDefault();
            const msgSucesso = document.getElementById('msg-sucesso');
            if (msgSucesso) {
                msgSucesso.style.display = 'block';
                formContato.reset();
                setTimeout(function () {
                    msgSucesso.style.display = 'none';
                }, 5000);
            }
        });
    }

    // === FORMULÁRIO TRABALHE CONOSCO ===
    const formTrabalhe = document.getElementById('form-trabalhe');
    if (formTrabalhe) {
        // Botão de upload customizado
        const btnUpload = document.getElementById('btn-upload');
        const inputFile = document.getElementById('input-curriculo');
        const nomeArquivo = document.getElementById('nome-arquivo');

        if (btnUpload && inputFile) {
            btnUpload.addEventListener('click', function () {
                inputFile.click();
            });

            inputFile.addEventListener('change', function () {
                if (inputFile.files.length > 0) {
                    nomeArquivo.textContent = inputFile.files[0].name;
                }
            });
        }

        formTrabalhe.addEventListener('submit', function (e) {
            e.preventDefault();
            const msgSucesso = document.getElementById('msg-sucesso-trabalhe');
            if (msgSucesso) {
                msgSucesso.style.display = 'block';
                formTrabalhe.reset();
                if (nomeArquivo) nomeArquivo.textContent = 'Nenhum arquivo selecionado';
                setTimeout(function () {
                    msgSucesso.style.display = 'none';
                }, 5000);
            }
        });
    }

    // === ANIMAÇÃO DE ENTRADA (scroll) ===
    const elementos = document.querySelectorAll('.desliza-direita, .desliza-esquerda');
    if (elementos.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visivel');
                }
            });
        }, { threshold: 0.1 });

        elementos.forEach(function (el) {
            observer.observe(el);
        });
    }

});
