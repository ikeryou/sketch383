import { MyDisplay } from "../core/myDisplay";
import { Paper } from "./paper";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  constructor(opt:any) {
    super(opt)

    const num = document.querySelectorAll('.l-main-item').length
    document.querySelectorAll('.l-main-item').forEach((el, i) => {
      new Paper({
        el: el,
        id: i,
        num: num,
      });
    })
  }
}