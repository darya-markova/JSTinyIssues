class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isLaunched = false;
  }
  
  add(asyncFn, time) {
    this.queue.push({ func: asyncFn, time: time });
    this.queue.sort((item1, item2) => item1.time < item2.time);
    
    if (!this.isLaunched) {
      this.run();
    }
  } 
  
  run() {    
    if (!task) {
      this.isLaunched = false;
      return;
    }

    const task = this.queue.shift();
    this.isLaunched = true;


    task.func.call().then(() => {
      // завершаем задачу и рекурсивно вызываем обработу следующей функции
      this.run();
    });
  }
}

const asyncFn = (value, ms) => () => {
  const start = Date.now();
  console.log("🏎️", value, "запущена в", Date.now() - start);
  return new Promise(resolve => setTimeout(resolve, ms, value))
    .finally(() => console.log("🏁", value, "завершена в", Date.now() - start))
};

const q = new AsyncQueue(); 
q.add(asyncFn("A", 100), 0);
q.add(asyncFn("B", 200), 0);
q.add(asyncFn("C", 50), 100);
q.add(asyncFn("D", 100), 150);
q.add(asyncFn("E", 100), 550);
q.add(asyncFn("F", 200), 600);
q.add(asyncFn("G", 100), 900);

q.run()
