const size = {
  mobile: '325px',
  tablet: '768px',
  laptop: '1024px',
  largeScreen: '1200px',
};

export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  largeScreen: `(min-width: ${size.largeScreen})`,
};
