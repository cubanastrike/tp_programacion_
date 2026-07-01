const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  // mover cursor
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';

  // crear rastro
  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.left = e.clientX + 'px';
  trail.style.top  = e.clientY + 'px';
  document.body.appendChild(trail);

  // eliminar rastro al terminar animación
  trail.addEventListener('animationend', () => trail.remove());
});
