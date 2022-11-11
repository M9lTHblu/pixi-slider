
const paginate = (page: number, direction: number): number =>
    page + direction;

const getIndex = (page: number, length: number): number =>
    Math.abs(page % length);

export {
  paginate,
  getIndex,
};
