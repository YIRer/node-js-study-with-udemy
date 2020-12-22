// setTimeout(() => {
//   console.log("콜백");
// }, 2000);

// const names = ["Anne", "jen", "jess"];
// const shortNames = names.filter((name) => {
//   return name.length <= 4;
// });

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    };

    callback(data);
  }, 2000);
};

const data = geocode("Philadelphia", (data) => {
  console.log(data);
});

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

add(1, 2, (sum) => {
  console.log(sum);
});
