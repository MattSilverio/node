import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 100);
  }
}

fetch("http://localhost:2602", {
  method: "POST",
  body: new OneToHundredStream(),
})
  .then((res) => {
    res.text();
  })
  .then((data) => {
    console.log(data);
  });
