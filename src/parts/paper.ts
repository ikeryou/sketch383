import { MyDisplay } from "../core/myDisplay";
import { Util } from "../libs/util";
import { PaperItem } from "./paperItem";
import { Func } from "../core/func";
import { Color } from "three";

// -----------------------------------------
//
// -----------------------------------------
export class Paper extends MyDisplay {

  private _item: Array<PaperItem> = []
  private _id: number
  private _num: number

  constructor(opt:any) {
    super(opt)

    this._id = opt.id
    this._num = opt.num

    const color = new Color(this.el.dataset.color)
    const num = (this._id + 1) * 4
    // const text = 'ビール🍺ビール🍺ビール🍺ビール🍺ビール🍺'
    let text = ''
    for(let l = 0; l < this._id + 1; l++) {
      text += 'ビール🍺'
    }
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('js-paperItem')
      this.el.appendChild(el)

      const item = new PaperItem({
        el: el,
        text: text,
        num: num,
        id: i,
        color: color,
        parentId: this._id,
      })
      this._item.push(item)
    }
  }

  protected _update(): void {
    super._update()

    // const baseW = this._item[0].size.width
    const baseH = this._item[0].size.height

    let y = (baseH * 1.05) * this._id
    y += Func.instance.sh() * 0.5 - ((baseH * 1.05) * this._num * 0.5)

    this._item.forEach((item, i) => {
      // let x = Func.instance.sw() * 0.5 - baseW * 0.5
      let x = 0
      let z = Math.sin(this._c * 0.1) * 50 * 0
      if(i >= 1) {
        const prevItem = this._item[i - 1]
        x = prevItem.pos.x
        x += prevItem.itemSize.width * Math.cos(Util.radian(prevItem.rot.y))
        z = prevItem.pos.z + prevItem.itemSize.width * Math.sin(Util.radian(prevItem.rot.y)) * -1
      }
      item.pos.set(x, y, z)
    })
  }

  protected  _resize(): void {
    super._resize()
  }
}