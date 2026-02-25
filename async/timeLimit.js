function timeLimit(fn, ms) {
  return async function(...args) {
    let timeoutId;

    const originalPromise = fn(...args);

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject('Time Limit Exceeded');
      }, ms)
    });

    try {
      const result = await Promise.race([originalPromise, timeoutPromise]);
      return result;
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }
}

const fn = name => new Promise(resolve => {
  setTimeout(() => resolve(`Hello, ${name}!`), 500);
});

const fn250 = timeLimit(fn, 250);
fn250("World").then(
  value => {
    console.timeEnd("xxx");
    console.log("1 >>", value);
  }, 
  reason => {
    console.timeEnd("xxx");
    console.log("2 >>", reason); // "Time Limit Exceeded"
  },
);