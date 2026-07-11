// Static image registry so content collections (plain JSON) can reference
// photos by string key while astro:assets still gets static imports to optimize.
import dishSteakPicado from '../assets/photos/dish-steak-picado.jpg';
import dishTacosVerdes from '../assets/photos/dish-tacos-verdes.jpg';
import dishCarneAsadaTacos from '../assets/photos/dish-carne-asada-tacos.jpg';
import heroFiresideTacos from '../assets/photos/stock/hero-fireside-tacos.jpg';
import spreadTacosGuacBeer from '../assets/photos/stock/spread-tacos-guac-beer.jpg';
import limes from '../assets/photos/stock/limes.jpg';
import salsaChips from '../assets/photos/stock/salsa-chips.jpg';
import churros from '../assets/photos/stock/churros.jpg';
import margarita from '../assets/photos/stock/margarita.jpg';

export const images = {
  'dish-steak-picado': dishSteakPicado,
  'dish-tacos-verdes': dishTacosVerdes,
  'dish-carne-asada-tacos': dishCarneAsadaTacos,
  'hero-fireside-tacos': heroFiresideTacos,
  'spread-tacos-guac-beer': spreadTacosGuacBeer,
  limes,
  'salsa-chips': salsaChips,
  churros,
  margarita,
} as const;

export type ImageKey = keyof typeof images;
