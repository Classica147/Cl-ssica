document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const audio = document.getElementById('card-audio');
    const musicBtn = document.getElementById('toggle-music');
    const floatingHearts = document.querySelector('.floating-hearts');
    const loveTimeElement = document.getElementById('love-time');
    const typingText = document.querySelector('.typing-text');

    // Data de início do relacionamento
    const startDate = new Date('2024-12-26');

    // Atualizar contador de tempo juntos
    function updateLoveTime() {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        loveTimeElement.textContent = `${days} dias, ${hours} horas e ${minutes} minutos`;
    }

    // Atualizar a cada minuto
    updateLoveTime();
    setInterval(updateLoveTime, 60000);

    // Mensagens de amor para o efeito de digitação
    const loveMessages = [
        "Você é o amor da minha vida! ",
        "Cada momento com você é especial! ",
        "Te amo mais a cada dia! ",
        "Você me faz muito feliz! ",
        "Meu coração é seu! ",
        "Juntos para sempre! ",
        "Você é minha princesa! ",
        "Nosso amor é infinito! ∞",
        "Você é meu presente mais precioso! ",
        "Cada dia ao seu lado é uma bênção! ",
        "Seu sorriso ilumina meus dias! ",
        "Você é meu porto seguro! ",
        "Nosso amor é único e especial! ",
        "Com você, tudo é mais bonito! ",
        "Você é meu sonho realizado! "
    ];

    let currentMessageIndex = 0;

    function typeMessage(message) {
        let i = 0;
        typingText.textContent = '';
        typingText.style.opacity = '1';
        
        function type() {
            if (i < message.length) {
                typingText.textContent += message.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => {
                    fadeOutText();
                }, 3000);
            }
        }

        type();
    }

    function fadeOutText() {
        typingText.style.opacity = 1;
        let opacity = 1;
        
        function fade() {
            if (opacity > 0) {
                opacity -= 0.1;
                typingText.style.opacity = opacity;
                setTimeout(fade, 50);
            } else {
                typingText.style.opacity = 0;
                setTimeout(() => {
                    currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
                    typeMessage(loveMessages[currentMessageIndex]);
                }, 500);
            }
        }

        fade();
    }

    // Iniciar o efeito de digitação
    setTimeout(() => {
        typeMessage(loveMessages[0]);
    }, 1000);

    // Função para criar corações flutuantes
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = ' ';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.animation = `float-up ${Math.random() * 3 + 2}s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        floatingHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Criar corações periodicamente
    setInterval(createHeart, 500);

    // Controle de música
    let isMusicPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            audio.pause();
            musicBtn.textContent = '';
            musicBtn.style.transform = 'scale(1)';
            musicBtn.classList.remove('animate__infinite');
        } else {
            audio.play();
            musicBtn.textContent = '';
            musicBtn.style.transform = 'scale(1.1)';
            musicBtn.classList.add('animate__infinite');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Efeito de virar o cartão
    card.addEventListener('click', () => {
        card.classList.toggle('open');
        if (!isMusicPlaying) {
            audio.play();
            musicBtn.textContent = '';
            musicBtn.style.transform = 'scale(1.1)';
            musicBtn.classList.add('animate__infinite');
            isMusicPlaying = true;
        }
    });

    // Efeito nas fotos
    const photos = document.querySelectorAll('.photo-item');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            const frame = photo.querySelector('.photo-frame');
            frame.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                frame.style.transform = 'rotateY(0)';
            }, 1000);
        });
    });

    // Prevenir zoom em dispositivos móveis
    document.addEventListener('touchmove', (e) => {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Adicionar efeito de hover touch para dispositivos móveis
    photos.forEach(photo => {
        photo.addEventListener('touchstart', () => {
            const overlay = photo.querySelector('.photo-overlay');
            overlay.style.opacity = '1';
        });
        photo.addEventListener('touchend', () => {
            const overlay = photo.querySelector('.photo-overlay');
            overlay.style.opacity = '0';
        });
    });
});
