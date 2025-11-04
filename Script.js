const button = document.getElementById('confettiButton');
    button.addEventListener('click', () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { 
        startVelocity: 35, 
        spread: 360, 
        ticks: 120, 
        zIndex: 1000
    };

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        for (let i = 0; i < 3; i++) {
            confetti(Object.assign({}, defaults, {
                particleCount: 25,
                origin: {
                 x: Math.random(), 
                 y: Math.random() * 0.2 
                }
            }));
        }
    }, 150);
    });

      let contador = 0;
        let cooldown = false;
        let cooldownTime = 5000; // 5 segundos
        let clickRapidoCount = 0;
        const maxClicksRapidos = 5;

        const boton = document.getElementById('confettiButton');
        const elementoContador = document.getElementById('contador');

        boton.addEventListener('click', function() {
            if (cooldown) {
                mostrarMensaje("No hagas eso!");
                return;
            }

            contador++;
            clickRapidoCount++;
            
            elementoContador.textContent = contador;
            elementoContador.className = 'contador';
            
            console.log(`Clic número: ${contador}, Clicks rápidos: ${clickRapidoCount}`);

            if (clickRapidoCount >= maxClicksRapidos) {
                activarCooldown();
            }
        });

        function activarCooldown() {
            cooldown = true;
            boton.disabled = true;
            elementoContador.textContent = "Wait >:,3!";
            elementoContador.className = 'contador mensaje cooldown-active';
            
        
            let tiempoRestante = cooldownTime / 1000;
            const intervalo = setInterval(() => {
                elementoContador.textContent = `Wait ${tiempoRestante}s...`;
                tiempoRestante--;
                
                if (tiempoRestante < 0) {
                    clearInterval(intervalo);
                    finalizarCooldown();
                }
            }, 1000);

            setTimeout(finalizarCooldown, cooldownTime);
        }

        function finalizarCooldown() {
            cooldown = false;
            clickRapidoCount = 0;
            boton.disabled = false;
            elementoContador.textContent = contador;
            elementoContador.className = 'contador';
            mostrarMensaje("¡don't lag this >:(!", 5000);
        }

        function mostrarMensaje(mensaje, duracion = 3000) {
            const mensajeElement = document.createElement('div');
            mensajeElement.textContent = mensaje;
            mensajeElement.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #ff4444;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 1000;
                animation: fadeInOut 0.5s ease-in-out;
            `;
            
            document.body.appendChild(mensajeElement);
            
            setTimeout(() => {
                mensajeElement.remove();
            }, duracion);
        }

        setInterval(() => {
            if (!cooldown && clickRapidoCount > 0) {
                clickRapidoCount = Math.max(0, clickRapidoCount - 1);
            }
        }, 1000);

        const sonidoClick = document.getElementById('sonidoClick');
    boton.addEventListener('click', () => {
        sonidoClick.currentTime = 0;
        sonidoClick.play();
        });
