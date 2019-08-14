const filterData = [
  {
    title: `All`,
    get count() {
      return this.countAll;
    },
  },
  {
    title: `Overdue`,
  },
  {
    title: `Today`,
  },
  {
    title: `Favorites`,
  },
  {
    title: `Repeating`,
  },
  {
    title: `Tags`,
  },
  {
    title: `Archive`,
  },
];

export {filterData};
