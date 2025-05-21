// Fichier: docs/javascripts/retro-crt.js

document.addEventListener('DOMContentLoaded', function () {
    // Ajouter l'effet de démarrage du système
    addBootSequence();

    // Ajouter l'effet d'animation de texte
    addTypingEffect();

    // Ajouter l'effet de glitch pour les titres
    addGlitchEffect();

    // Ajouter des sons rétro CRT
    addRetroSounds();

    // Améliorer les blocs de code pour un look plus terminal
    enhanceCodeBlocks();

    // Créer des badges de difficulté pour les write-ups
    createDifficultyBadges();

    // Ajouter l'animation de scintillement pour le logo
    addLogoFlicker();
});

// Fonction pour ajouter une séquence de démarrage au début de la page
function addBootSequence() {
    // Vérifier si nous sommes sur la page d'accueil
    if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')) {
        const main = document.querySelector('.md-content__inner');
        if (!main) return;

        // Créer la séquence de démarrage
        const bootSequence = document.createElement('div');
        bootSequence.id = 'boot-sequence';
        bootSequence.className = 'terminal-box';
        bootSequence.style.marginBottom = '2rem';
        bootSequence.innerHTML = '<div class="terminal-header">INITIALISATION DU SYSTÈME...</div>';

        // Insérer avant le contenu principal
        main.prepend(bootSequence);

        // Lignes de démarrage
        const bootLines = [
            "CHARGEMENT DU SYSTÈME...",
            "VÉRIFICATION DES MODULES MÉMOIRE... OK",
            "CHARGEMENT DU SYSTÈME DE FICHIERS... OK",
            "MONTAGE DE LA BASE DE DONNÉES DE CYBERSÉCURITÉ... OK",
            "CONNEXION À LA MATRICE... ÉTABLIE",
            "CHARGEMENT DES WRITE-UPS... OK",
            "BIENVENUE SUR LE BLOG DE PICSOU, UTILISATEUR AUTHENTIFIÉ."
        ];

        // Animation de la séquence de démarrage
        let lineIndex = 0;
        const bootInterval = setInterval(() => {
            if (lineIndex < bootLines.length) {
                bootSequence.innerHTML += `<p>> ${bootLines[lineIndex]}</p>`;
                lineIndex++;
                // Faire défiler vers le bas
                bootSequence.scrollTop = bootSequence.scrollHeight;
            } else {
                clearInterval(bootInterval);
                bootSequence.innerHTML += '<p class="blinking-cursor">> SYSTÈME PRÊT.</p>';

                // Après la séquence de démarrage, faire apparaître le reste du contenu
                setTimeout(() => {
                    // Sélectionner tous les éléments sauf la séquence de démarrage
                    const contentElements = Array.from(main.children).filter(el => el.id !== 'boot-sequence');

                    // Révéler progressivement chaque élément
                    contentElements.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transition = 'opacity 0.5s ease';

                        setTimeout(() => {
                            el.style.opacity = '1';
                        }, 100 * (index + 1));
                    });
                }, 500);
            }
        }, 600);
    }
}

// Fonction pour ajouter l'effet de frappe de texte
function addTypingEffect() {
    // Sélectionner les paragraphes à animer
    const firstParagraph = document.querySelector('.md-content__inner > p:first-of-type');
    if (firstParagraph) {
        // Ajouter la classe pour l'effet
        firstParagraph.classList.add('typing-effect');

        // Récupérer le texte original
        const originalText = firstParagraph.textContent;
        firstParagraph.textContent = '';

        // Animer le texte caractère par caractère
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                firstParagraph.textContent += originalText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                // Ajouter un curseur clignotant à la fin
                firstParagraph.innerHTML += '<span class="blinking-cursor"></span>';
            }
        }, 30);
    }
}

// Fonction pour ajouter un effet de glitch aléatoire aux titres
function addGlitchEffect() {
    const titles = document.querySelectorAll('h1, h2');
    titles.forEach(title => {
        // Stocker le texte original
        const originalText = title.textContent;

        // Ajouter un glitch aléatoire
        setInterval(() => {
            if (Math.random() < 0.03) { // 3% de chance d'activer le glitch
                // Créer une version glitchée du texte
                const glitchedText = createGlitchedText(originalText);
                title.textContent = glitchedText;

                // Restaurer le texte original après un court délai
                setTimeout(() => {
                    title.textContent = originalText;
                }, 150);
            }
        }, 3000);
    });
}

// Fonction pour créer du texte glitché
function createGlitchedText(text) {
    const glitchChars = "!@#$%^&*()-_=+{}[];:<>,.?/|";
    let glitchedText = '';

    for (let i = 0; i < text.length; i++) {
        // 30% de chance de remplacer un caractère
        if (Math.random() < 0.3) {
            const randomIndex = Math.floor(Math.random() * glitchChars.length);
            glitchedText += glitchChars[randomIndex];
        } else {
            glitchedText += text[i];
        }
    }

    return glitchedText;
}

// Fonction pour ajouter des sons rétro
function addRetroSounds() {
    // Créer les éléments audio
    const clickSound = document.createElement('audio');
    clickSound.src = 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3'; // À remplacer par votre son
    clickSound.volume = 0.2;
    document.body.appendChild(clickSound);

    // Associer le son aux liens de navigation
    const navLinks = document.querySelectorAll('.md-nav__link, .md-tabs__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    // Son de changement de page
    window.addEventListener('beforeunload', () => {
        const powerDownSound = new Audio('https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3'); // À remplacer par votre son
        // Continuons le fichier: docs/javascripts/retro-crt.js

        // Son de chargement de page
        document.addEventListener('DOMContentLoaded', () => {
            const bootSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'); // À remplacer par votre son
            bootSound.volume = 0.3;
            bootSound.play();
        });
    });
}

// Fonction pour améliorer les blocs de code
function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        // Trouver le bloc parent
        const preBlock = block.parentElement;

        // Déterminer le langage
        const classesArray = Array.from(block.classList);
        let language = 'bash';

        for (const cls of classesArray) {
            if (cls.startsWith('language-')) {
                language = cls.replace('language-', '');
                break;
            }
        }

        // Créer un en-tête de terminal personnalisé en fonction du langage
        let headerText = '';

        switch (language) {
            case 'bash':
            case 'shell':
            case 'sh':
                headerText = 'root@kali:~# ';
                break;
            case 'sql':
                headerText = 'mysql> ';
                break;
            case 'python':
                headerText = 'python3 exploit.py ';
                break;
            case 'powershell':
                headerText = 'PS C:\\> ';
                break;
            default:
                headerText = `code.${language} `;
        }

        // Créer l'en-tête
        const header = document.createElement('div');
        header.className = 'terminal-header';
        header.textContent = headerText;

        // Insérer l'en-tête avant le code
        preBlock.insertBefore(header, block);

        // Ajouter un effet de clignotement au dernier caractère d'un bloc de code
        const lines = block.innerHTML.split('\n');
        if (lines.length > 0 && lines[lines.length - 1].trim() !== '') {
            lines[lines.length - 1] += '<span class="blinking-cursor"></span>';
            block.innerHTML = lines.join('\n');
        }
    });
}

// Fonction pour créer des badges de difficulté
function createDifficultyBadges() {
    // Rechercher des motifs comme [Difficulté: Facile] dans le texte
    const content = document.querySelector('.md-content__inner');
    if (!content) return;

    const regex = /\[Difficulté:\s*(Facile|Moyenne|Difficile)\]/gi;

    // Parcourir tout le texte à la recherche de ces modèles
    const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToReplace = [];
    let node;

    while (node = walker.nextNode()) {
        const matches = [...node.nodeValue.matchAll(regex)];
        if (matches.length > 0) {
            nodesToReplace.push({ node, matches });
        }
    }

    // Remplacer les textes trouvés par des badges stylisés
    nodesToReplace.forEach(item => {
        const { node, matches } = item;
        let newContent = node.nodeValue;

        matches.forEach(match => {
            const difficulty = match[1].toLowerCase();
            const badgeHTML = `<span class="difficulty-badge difficulty-${difficulty}">${match[1].toUpperCase()}</span>`;
            newContent = newContent.replace(match[0], badgeHTML);
        });

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newContent;

        const fragment = document.createDocumentFragment();
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }

        node.parentNode.replaceChild(fragment, node);
    });
}

// Fonction pour ajouter un scintillement au logo
function addLogoFlicker() {
    const logo = document.querySelector('.md-header-nav__button.md-logo img');
    if (!logo) return;

    // Ajouter une animation de scintillement
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% de chance de scintiller
            logo.style.opacity = (Math.random() * 0.4 + 0.6).toString();

            setTimeout(() => {
                logo.style.opacity = '1';
            }, 100);
        }
    }, 2000);
}

// Fonction pour ajouter des marques de commande aux listes
function enhanceLists() {
    const lists = document.querySelectorAll('.md-content__inner ul li');

    lists.forEach(item => {
        item.style.position = 'relative';

        // Ajouter un prompt avant chaque élément de liste
        const bullet = document.createElement('span');
        bullet.className = 'list-bullet';
        bullet.textContent = '> ';
        bullet.style.position = 'absolute';
        bullet.style.left = '-1.5em';
        bullet.style.color = 'var(--crt-cyan)';

        item.prepend(bullet);
    });
}

// Fonction pour ajouter des ASCII art automatiquement
function addAsciiArt() {
    // Vérifier si nous sommes sur une page de write-up
    if (window.location.pathname.includes('/Hack The Box/') ||
        window.location.pathname.includes('/ActiveDirectory/')) {

        const title = document.querySelector('h1');
        if (!title) return;

        // Créer un ASCII art simple basé sur le titre
        const titleText = title.textContent.trim();
        const asciiContainer = document.createElement('div');
        asciiContainer.className = 'ascii-art';

        // ASCII art basique basé sur le titre de la page
        asciiContainer.innerHTML = createSimpleAsciiTitle(titleText);

        // Insérer avant le titre
        title.parentNode.insertBefore(asciiContainer, title);
    }
}

// Fonction pour créer un ASCII art simple
function createSimpleAsciiTitle(text) {
    // Bordure supérieure
    let ascii = '╔';
    for (let i = 0; i < text.length + 8; i++) {
        ascii += '═';
    }
    ascii += '╗\n';

    // Ligne vide
    ascii += '║ ';
    for (let i = 0; i < text.length + 6; i++) {
        ascii += ' ';
    }
    ascii += ' ║\n';

    // Ligne avec texte
    ascii += '║   ' + text.toUpperCase() + '   ║\n';

    // Ligne vide
    ascii += '║ ';
    for (let i = 0; i < text.length + 6; i++) {
        ascii += ' ';
    }
    ascii += ' ║\n';

    // Bordure inférieure
    ascii += '╚';
    for (let i = 0; i < text.length + 8; i++) {
        ascii += '═';
    }
    ascii += '╝';

    return ascii;
}

// Fonction pour ajouter un Easter egg
function addEasterEgg() {
    // Séquence de touches pour l'Easter egg: haut, haut, bas, bas, gauche, droite, gauche, droite, b, a
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        // Vérifier si la touche correspond à la séquence
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;

            // Si toute la séquence est complétée
            if (konamiIndex === konamiCode.length) {
                activateMatrixMode();
                konamiIndex = 0; // Réinitialiser
            }
        } else {
            konamiIndex = 0; // Réinitialiser si mauvaise touche
        }
    });
}

// Activer le mode Matrix (effet pluie de code)
function activateMatrixMode() {
    // Créer un overlay pour l'animation Matrix
    const matrixContainer = document.createElement('div');
    matrixContainer.style.position = 'fixed';
    matrixContainer.style.top = '0';
    matrixContainer.style.left = '0';
    matrixContainer.style.width = '100%';
    matrixContainer.style.height = '100%';
    matrixContainer.style.background = 'rgba(0, 0, 0, 0.9)';
    matrixContainer.style.zIndex = '9999';
    matrixContainer.style.overflow = 'hidden';
    matrixContainer.id = 'matrix-mode';

    document.body.appendChild(matrixContainer);

    // Jouer un son d'activation
    const matrixSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2588/2588-preview.mp3'); // À remplacer par votre son
    matrixSound.volume = 0.3;
    matrixSound.play();

    // Démarrer l'animation Matrix
    startMatrixAnimation(matrixContainer);

    // Ajouter un bouton pour quitter le mode Matrix
    const exitButton = document.createElement('button');
    exitButton.innerText = 'EXIT MATRIX';
    exitButton.style.position = 'fixed';
    exitButton.style.bottom = '20px';
    exitButton.style.right = '20px';
    exitButton.style.zIndex = '10000';
    exitButton.style.background = 'black';
    exitButton.style.color = '#39FF14';
    exitButton.style.border = '2px solid #39FF14';
    exitButton.style.padding = '10px 20px';
    exitButton.style.cursor = 'pointer';
    exitButton.style.fontFamily = "'Press Start 2P', monospace";
    exitButton.style.fontSize = '12px';

    exitButton.addEventListener('click', () => {
        matrixContainer.remove();
        exitButton.remove();
    });

    document.body.appendChild(exitButton);
}

// Animation Matrix
function startMatrixAnimation(container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    // Caractères Matrix
    const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Convertir à un tableau de caractères
    const characters = matrixChars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Un tableau pour stocker la position y de chaque goutte de caractère
    const drops = [];

    // Initialiser toutes les gouttes à la position y=1
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // Fonction de dessin
    function draw() {
        // Fond noir semi-transparent pour créer l'effet de fade
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Couleur verte pour les caractères
        ctx.fillStyle = '#39FF14';
        ctx.font = fontSize + 'px monospace';

        // Pour chaque colonne
        for (let i = 0; i < drops.length; i++) {
            // Caractère aléatoire à afficher
            const text = characters[Math.floor(Math.random() * characters.length)];

            // Dessiner le caractère
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Réinitialiser à la position y=0 après avoir dépassé la fin du canvas
            // Ajouter un caractère aléatoire pour créer un effet de cascade irrégulier
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Incrémenter la position y
            drops[i]++;
        }
    }

    // Animation à 30 FPS
    const interval = setInterval(draw, 33);

    // Nettoyage lorsque le container est retiré
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && !document.contains(canvas)) {
                clearInterval(interval);
                observer.disconnect();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Appeler les fonctions supplémentaires au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    enhanceLists();
    addAsciiArt();
    addEasterEgg();
});