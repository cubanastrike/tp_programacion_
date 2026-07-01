 const mascota = document.getElementById('mascota');
  const WALK = 'img/default_walk_8fps.gif';
  const IDLE = 'img/default_idle_8fps.gif';

  let x = 0;
  let direccion = 1;
  let velocidad = 1;
  let pausado = false;

  mascota.style.right = 'auto';
  mascota.style.left = '0px';

  function animar() {
    if (!pausado) {
      x += velocidad * direccion;
      const maxX = window.innerWidth - 70;

      if (x >= maxX || x <= 0) {
        x = x >= maxX ? maxX : 0;
        pausado = true;
        mascota.src = IDLE;

        setTimeout(() => {
          direccion *= -1;
          mascota.style.transform = direccion === 1 ? 'scaleX(1)' : 'scaleX(-1)';
          mascota.src = WALK;
          pausado = false;
        }, 1500);
      }

      mascota.style.left = x + 'px';
    }

    requestAnimationFrame(animar);
  }

  // ← NUEVO: al hacer click se detiene 2 seg y mira de frente
  mascota.addEventListener('click', () => {
    if (pausado) return; // si ya está pausado no hacer nada
    pausado = true;
    mascota.style.transform = 'scaleX(1)'; // mira de frente
    mascota.src = IDLE;

    setTimeout(() => {
      mascota.style.transform = direccion === 1 ? 'scaleX(1)' : 'scaleX(-1)';
      mascota.src = WALK;
      pausado = false;
    }, 2000); // 2 segundos parado
  });

  mascota.src = WALK;
  animar();