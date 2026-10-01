const drawer = document.querySelector('#explorer');
const title = document.querySelector('#panel-title');
const sections = ['catalogue', 'resources', 'futures'];
const titles = { catalogue: 'Le catalogue des possibles', resources: 'Des ressources pour commencer', futures: 'Futures : le projet Elle arrive' };
let opener;
function selectSection(section) {
  if (!sections.includes(section)) return;
  sections.forEach(id => { document.getElementById(id).hidden = id !== section; });
  document.querySelectorAll('[data-section]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.section === section)));
  title.textContent = titles[section];
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  selectSection(button.dataset.open);
  drawer.showModal();
  window.dispatchEvent(new Event('ea:motion'));
  document.querySelector('.catalogue-handle').setAttribute('aria-expanded', 'true');
}));
document.querySelector('.close').addEventListener('click', () => drawer.close());
drawer.addEventListener('close', () => {
  window.dispatchEvent(new Event('ea:motion'));
  document.querySelector('.catalogue-handle').setAttribute('aria-expanded', 'false');
  opener?.focus();
});
drawer.addEventListener('click', event => {
  if (event.target !== drawer) return;
  const rect = drawer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) drawer.close();
});
document.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => selectSection(button.dataset.section)));
document.querySelectorAll('[data-switch]').forEach(button => button.addEventListener('click', () => {
  selectSection(button.dataset.switch);
  document.querySelector(`[data-section="${button.dataset.switch}"]`).focus();
}));
const paths = {
  decouvrir: ['Découvrir des chemins inattendus', 'Explore des métiers et des parcours auxquels tu n’avais pas encore pensé.'],
  rencontrer: ['Élargir ton cercle', 'Le réseau de rencontres est en préparation. Tu peux déjà découvrir JobIRL dans les ressources.'],
  apprendre: ['Apprendre à ton rythme', 'Commence par explorer les cours de FUN MOOC. Vérifie les conditions et prérequis de chaque formation.'],
  essayer: ['Tester une envie', 'Les premières expériences locales sont en préparation. En attendant, explore une nouvelle piste avec les ressources publiques.'],
};
document.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-path]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const [heading, copy] = paths[button.dataset.path];
  document.getElementById('path-title').textContent = heading;
  document.getElementById('path-copy').textContent = copy;
}));
const motion = document.getElementById('motion');
motion.addEventListener('click', () => {
  const paused = document.documentElement.classList.toggle('paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.textContent = paused ? 'Reprendre le mouvement' : 'Mettre en pause le mouvement';
  window.dispatchEvent(new Event('ea:motion'));
});
