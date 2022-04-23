import { gsap } from 'gsap';

export const bannerClose = (el) => {
  gsap.to(el, { ease: 'power1.out', opacity: 0, duration: 0.2 });
};

export const bannerEnter = (el) => {
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, delay: 0.8 });
};

export const buttonEnter = (el) => {
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, delay: 2.2 });
};
