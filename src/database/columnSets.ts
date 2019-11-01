export const cityDataCS = [
  {
    name: 'city',
    prop: 'city',
  },
  {
    name: 'temperature',
    prop: 'temperature',
  },
  {
    name: 'note',
    prop: 'note',
  },
  {
    name: 'time',
    init: () => Math.floor(new Date().getTime() / 1000)
  },
];

export const cityTemperaturesCS = [
  {
    name: 'temperatures',
    prop: 'cityTemperatures',
  },
  {
    name: 'time',
    init: () => Math.floor(new Date().getTime() / 1000)
  },
];
