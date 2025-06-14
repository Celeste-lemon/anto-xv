// ==================== VARIABLES GLOBALES ====================
let audio;
let isPlaying = false;
let currentTime = 0;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeAudio();
    initializeCountdown();
    initializeSwiper();
    initializeFancybox();
    initializeAOS();
    initializeDresscode();
    initializeGifts();
    initializeItinerary();
    initializeNavigation();
});

// ==================== REPRODUCTOR DE MÚSICA ====================
function initializeAudio() {
    audio = document.querySelector('audio');
    const playBtn = document.getElementById('play');
    const pauseBtn = document.getElementById('pause');
    const rewindBtn = document.getElementById('rewind');
    const forwardBtn = document.getElementById('forward');
    const musicImg = document.querySelector('.music__img');
    const playPauseContainer = document.getElementById('playPauseContainer');

    if (!audio) return;

    // Configurar controles
    playPauseContainer.addEventListener('click', togglePlayPause);
    rewindBtn.addEventListener('click', rewindAudio);
    forwardBtn.addEventListener('click', forwardAudio);

    // Event listeners del audio
    audio.addEventListener('loadedmetadata', function() {
        console.log('Audio cargado correctamente');
    });

    audio.addEventListener('error', function(e) {
        console.error('Error al cargar el audio:', e);
    });

    audio.addEventListener('ended', function() {
        resetPlayer();
    });

    function togglePlayPause() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    function playAudio() {
        audio.currentTime = currentTime;
        audio.play().then(() => {
            isPlaying = true;
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            musicImg.classList.add('rotating');
        }).catch(error => {
            console.error('Error al reproducir:', error);
        });
    }

    function pauseAudio() {
        audio.pause();
        currentTime = audio.currentTime;
        isPlaying = false;
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        musicImg.classList.remove('rotating');
    }

    function rewindAudio() {
        if (audio) {
            currentTime = Math.max(0, (audio.currentTime || currentTime) - 10);
            if (isPlaying) {
                audio.currentTime = currentTime;
            }
        }
    }

    function forwardAudio() {
        if (audio) {
            currentTime = Math.min(audio.duration || currentTime + 10, (audio.currentTime || currentTime) + 10);
            if (isPlaying) {
                audio.currentTime = currentTime;
            }
        }
    }

    function resetPlayer() {
        isPlaying = false;
        currentTime = 0;
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        musicImg.classList.remove('rotating');
    }
}

// ==================== TEMPORIZADOR CUENTA REGRESIVA ====================
function initializeCountdown() {
    const targetDate = new Date('December 29, 2024 22:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ==================== SWIPER GALERÍA ====================
function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}

// ==================== FANCYBOX LIGHTBOX ====================
function initializeFancybox() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox="gallery"]', {
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: [
                        "zoomIn",
                        "zoomOut",
                        "toggle1to1",
                        "rotateCCW",
                        "rotateCW",
                        "flipX",
                        "flipY",
                    ],
                    right: ["slideshow", "thumbs", "close"],
                },
            },
            Thumbs: {
                autoStart: false,
            },
        });
    }
}

// ==================== AOS ANIMACIONES ====================
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
        });
    }
}

// ==================== DRESSCODE LIGHTBOX ====================
function initializeDresscode() {
    const showImageBtn = document.getElementById('showImage');
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('closeButton');

    if (showImageBtn && lightbox && closeBtn) {
        showImageBtn.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// ==================== SECCIÓN REGALOS ====================
function initializeGifts() {
    const mostrarBtn = document.getElementById('mostrarBoton');
    const textoDesplegable = document.getElementById('textoDesplegable');

    if (mostrarBtn && textoDesplegable) {
        mostrarBtn.addEventListener('click', function() {
            if (textoDesplegable.classList.contains('escondido')) {
                textoDesplegable.classList.remove('escondido');
                mostrarBtn.textContent = 'Ocultar datos bancarios';
            } else {
                textoDesplegable.classList.add('escondido');
                mostrarBtn.textContent = 'Ver datos bancarios';
            }
        });
    }
}

// ==================== COPIAR TEXTO ====================
function copyText() {
    const aliasText = document.getElementById('alias').textContent;
    const copyMessage = document.getElementById('copyMessage');
    
    navigator.clipboard.writeText(aliasText).then(function() {
        showCopyMessage(copyMessage);
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
        // Fallback para navegadores más antiguos
        fallbackCopyTextToClipboard(aliasText, copyMessage);
    });
}

function copyCbuText() {
    const cbuText = document.getElementById('cbuAlias').textContent;
    const copyMessage = document.getElementById('copyCbuMessage');
    
    navigator.clipboard.writeText(cbuText).then(function() {
        showCopyMessage(copyMessage);
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
        // Fallback para navegadores más antiguos
        fallbackCopyTextToClipboard(cbuText, copyMessage);
    });
}

function fallbackCopyTextToClipboard(text, messageElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyMessage(messageElement);
    } catch (err) {
        console.error('Fallback: No se pudo copiar', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyMessage(messageElement) {
    if (messageElement) {
        messageElement.style.display = 'block';
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 300);
        }, 2000);
    }
}

// ==================== ITINERARIO CON PROGRESO ====================
function initializeItinerary() {
    const progressBar = document.querySelector('.progress');
    const items = document.querySelectorAll('.itinerario__item');
    
    if (!progressBar || !items.length) return;

    // Observador de intersección para animar la barra de progreso
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress();
            }
        });
    }, {
        threshold: 0.3
    });

    // Observar la sección del itinerario
    const itinerarioSection = document.querySelector('.itinerarios');
    if (itinerarioSection) {
        observer.observe(itinerarioSection);
    }

    function animateProgress() {
        let progress = 0;
        const increment = 100 / items.length;
        
        const interval = setInterval(() => {
            progress += increment;
            progressBar.style.height = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 300);
    }

    // Animación en scroll para cada item
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        itemObserver.observe(item);
    });
}

// ==================== NAVEGACIÓN MÓVIL ====================
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav__link');
    const nav = document.getElementById('nav');
    
    // Cerrar menú al hacer click en un enlace (móvil)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remover el target para cerrar el menú móvil
            if (window.innerWidth <= 768) {
                window.location.hash = '';
            }
        });
    });

    // Scroll suave para los enlaces internos
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Cerrar menú móvil
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        window.location.hash = '';
                    }, 100);
                }
            }
        });
    });

    // Cambiar estilo del nav en scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const navElement = document.querySelector('.nav');
        
        if (currentScroll > 100) {
            navElement.style.background = 'rgba(255, 255, 255, 0.98)';
            navElement.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navElement.style.background = 'rgba(255, 255, 255, 0.95)';
            navElement.style.boxShadow = 'none';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// ==================== EFECTOS ADICIONALES ====================

// Efecto parallax suave para el header
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const waves = document.querySelector('.waves');
        
        if (header && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        }
        
        if (waves && scrolled < window.innerHeight) {
            const rate = scrolled * 0.3;
            waves.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Preloader simple
function initializePreloader() {
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
}

// ==================== UTILIDADES ====================

// Función para detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para suavizar el scroll
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ==================== INICIALIZAR EFECTOS ADICIONALES ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeParallax();
    initializePreloader();
});

// ==================== EXPORTS PARA FUNCIONES GLOBALES ====================
// Estas funciones necesitan estar en el scope global para los onclick del HTML
window.copyText = copyText;
window.copyCbuText = copyCbuText;