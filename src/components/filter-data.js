const filterData = [
  {
    title: `All`,
    count: tasksMockData.length,
    get count() {
      return tasksMockData.length;
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
