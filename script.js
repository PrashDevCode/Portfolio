// 1. Lenis Smooth Scroll Engine
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. 3D WebGL Torus Knot
const canvas = document.getElementById('webgl-canvas');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 32;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.TorusKnotGeometry(10, 2.5, 120, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animateWebGL() {
    torusKnot.rotation.x += 0.0015;
    torusKnot.rotation.y += 0.0025;

    torusKnot.rotation.x += (mouseY * 0.35 - torusKnot.rotation.x) * 0.025;
    torusKnot.rotation.y += (mouseX * 0.35 - torusKnot.rotation.y) * 0.025;

    renderer.render(scene, camera);
    requestAnimationFrame(animateWebGL);
  }
  animateWebGL();
}

// 3. Smart Header Scroll Shrink
const navbarContainer = document.getElementById('navbar-container');
const logoSub = document.getElementById('logo-sub');

lenis.on('scroll', (e) => {
  if (e.scroll > 50) {
    navbarContainer.classList.add('scrolled');
    logoSub.classList.add('opacity-0', '-translate-y-2', 'hidden');
  } else {
    navbarContainer.classList.remove('scrolled');
    logoSub.classList.remove('opacity-0', '-translate-y-2', 'hidden');
  }
});

// 4. Spotlight Card Tracking & 3D Card Parallax Tilt
document.querySelectorAll('.spotlight-card, .project-row').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// 5. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.gsap-hero', {
  y: 60,
  opacity: 0,
  duration: 1.2,
  stagger: 0.15,
  ease: 'power3.out',
  delay: 0.2,
});

gsap.from('.spotlight-card', {
  scrollTrigger: {
    trigger: '#experience',
    start: 'top 85%',
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power2.out',
});

// 6. Magnetic Buttons
document.querySelectorAll('.magnetic-btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  });
});

// 7. Clipboard Function
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = btnElement.querySelector('button') || btnElement;
    const originalText = btn.innerText;
    btn.innerText = 'Copied!';
    btn.classList.add('bg-white', 'text-black');
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('bg-white', 'text-black');
    }, 2000);
  });
}

// 8. Enhanced Terminal Logic with Auto-Scroll & Tab Auto-Complete
const terminalDrawer = document.getElementById('terminalDrawer');
const toggleTerminalBtn = document.getElementById('toggleTerminalBtn');
const closeTerminalBtn = document.getElementById('closeTerminalBtn');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const validCommands = ['bio', 'experience', 'skills', 'projects', 'contact', 'hire', 'clear', 'help'];

function toggleTerminal() {
  if (terminalDrawer.classList.contains('translate-y-full')) {
    terminalDrawer.classList.remove('translate-y-full');
    terminalInput.focus();
  } else {
    terminalDrawer.classList.add('translate-y-full');
  }
}

if (toggleTerminalBtn && closeTerminalBtn) {
  toggleTerminalBtn.addEventListener('click', toggleTerminal);
  closeTerminalBtn.addEventListener('click', toggleTerminal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !terminalDrawer.classList.contains('translate-y-full')) {
      toggleTerminal();
    }
  });
}

if (terminalInput) {
  // Tab Auto-Completion
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = terminalInput.value.trim().toLowerCase();
      if (!currentVal) return;

      const match = validCommands.find(cmd => cmd.startsWith(currentVal));
      if (match) {
        terminalInput.value = match;
      }
    }

    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';

      const line = document.createElement('p');
      line.innerHTML = `<span class="text-zinc-500">></span> <span class="text-white">${command}</span>`;
      terminalOutput.appendChild(line);

      let response = '';
      switch (command) {
        case 'help':
          response = 'Commands: bio, experience, skills, projects, contact, hire, clear';
          break;
        case 'bio':
          response = 'Full-Stack Software Engineer focusing on scalable web architectures.';
          lenis.scrollTo('#about');
          break;
        case 'experience':
          response = 'VinraTech (Software Developer) | Sheryians Pvt. Limited (Full Stack Developer)';
          lenis.scrollTo('#experience');
          break;
        case 'skills':
          response = 'Java, Node.js, TypeScript, React, MongoDB, SQL, System Design.';
          lenis.scrollTo('#tools');
          break;
        case 'projects':
          response = 'Jubilo Event Platform, SkyBlog, Contact App, IOVS Voting System.';
          lenis.scrollTo('#projects');
          break;
        case 'contact':
          response = 'Email: prashantsingh4688@gmail.com | Phone: +91 94307 43691';
          lenis.scrollTo('#contact');
          break;
        case 'hire':
          response = '<span class="text-amber-400 font-bold">Awesome! Opening mail app...</span>';
          setTimeout(() => {
            window.location.href = 'mailto:prashantsingh4688@gmail.com?subject=Job%20Opportunity%20for%20Prashant';
          }, 800);
          break;
        case 'clear':
          terminalOutput.innerHTML = '';
          return;
        default:
          response = `Command not found: ${command}. Try 'help' or press Tab to auto-complete.`;
      }

      const resLine = document.createElement('p');
      resLine.className = 'text-zinc-400 ml-3 mb-2 font-light';
      resLine.innerHTML = response;
      terminalOutput.appendChild(resLine);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}