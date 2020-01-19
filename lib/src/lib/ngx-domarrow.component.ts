import { Component, Input, OnInit, OnChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'ngx-domarrow',
  templateUrl: './ngx-domarrow.component.html',
  styleUrls: ['./ngx-domarrow.component.scss'],
})
export class NgxDomarrowComponent implements OnInit, OnChanges {

  @Input() public refreshInterval: number = 50;

  @Input() public from: string = null;
  @Input() public to: string = null;

  @Input() public head: boolean = false;
  @Input() public tail: boolean = false;
  @Input() public text: string = null;

  @Input() public color: string = null;
  @Input() public width: number = null;
  @Input() public onlyVisible: boolean = false;

  @Input() public fromX: number = null;
  @Input() public fromY: number = null;
  @Input() public toX: number = null;
  @Input() public toY: number = null;

  public arrowIndices: number[] = [];

  public styleLine: object[] = [];
  public styleArrowFw: object[] = [];
  public styleArrowBw: object[] = [];
  public needSwap: boolean[] = [];

  private elementPositionBackup: string = '';
  private refreshPos: number = null;

  constructor(
    private elem: ElementRef,
  ) { }

  private getNumberOrDef(val, def) {
    return typeof val === 'number' && !isNaN(val) ? val : def;
  }

  private isVisible(element) {
    return element && element.style.visibility !== 'hidden';
  }

  private inside(minX, minY, maxX, maxY, x1, y1) {
    return minX <= x1 && x1 <= maxX && minY <= y1 && y1 <= maxY;
  }

  private intersectionPoint(x1, y1, x2, y2, minX, minY, maxX, maxY) {
    const min = Math.min;
    const max = Math.max;
    const good = this.inside.bind(null, min(x1, x2), min(y1, y2), max(x1, x2), max(y1, y2));

    if ((x1 <= minX && x2 <= minX)
      || (y1 <= minY && y2 <= minY)
      || (x1 >= maxX && x2 >= maxX)
      || (y1 >= maxY && y2 >= maxY)
      || (this.inside(minX, minY, maxX, maxY, x1, y1) && this.inside(minX, minY, maxX, maxY, x2, y2)))
      return null;

    const m = (y2 - y1) / (x2 - x1);
    let y = m * (minX - x1) + y1;
    if (minY < y && y < maxY && good(minX, y))
      return {
        x: minX,
        y: y
      };

    y = m * (maxX - x1) + y1;
    if (minY < y && y < maxY && good(maxX, y))
      return {
        x: maxX,
        y: y
      };

    let x = (minY - y1) / m + x1;
    if (minX < x && x < maxX && good(x, minY))
      return {
        x: x,
        y: minY
      };

    x = (maxY - y1) / m + x1;
    if (minX < x && x < maxX && good(x, maxY))
      return {
        x: x,
        y: maxY
      };

    return null;
  }

  private adjustLine(nth: number, from: HTMLElement, to: HTMLElement) {
    if (to == null || from == null)
      return;

    const color = this.color || 'black';
    const W = this.width || 2;

    const fromB = parseFloat(from.style.top) ? null : from.getBoundingClientRect();
    const toB = parseFloat(to.style.top) ? null : to.getBoundingClientRect();
    const fromBStartY = (fromB ? window.scrollY + fromB.top : parseFloat(from.style.top));
    const fromBStartX = (fromB ? window.scrollX + fromB.left : parseFloat(from.style.left));
    const toBStartY = (toB ? window.scrollY + toB.top : parseFloat(to.style.top));
    const toBStartX = (toB ? window.scrollX + toB.left : parseFloat(to.style.left));
    const fromBWidth = (fromB ? fromB.width : parseFloat(from.style.width) || from.offsetWidth);
    const fromBHeight = (fromB ? fromB.height : parseFloat(from.style.height) || from.offsetHeight);
    const toBWidth = (toB ? toB.width : parseFloat(to.style.width) || to.offsetWidth);
    const toBHeight = (toB ? toB.height : parseFloat(to.style.height) || to.offsetHeight);

    let fT = fromBStartY + fromBHeight * this.getNumberOrDef(this.fromY, 0.5);
    let tT = toBStartY + toBHeight * this.getNumberOrDef(this.toY, 0.5);
    let fL = fromBStartX + fromBWidth * this.getNumberOrDef(this.fromX, 0.5);
    let tL = toBStartX + toBWidth * this.getNumberOrDef(this.toX, 0.5);

    let CA = Math.abs(tT - fT);
    let CO = Math.abs(tL - fL);
    let H = Math.sqrt(CA * CA + CO * CO);
    let ANG = 180 / Math.PI * Math.acos(CO / H);

    if ((fT >= tT || fL >= tL) && (tT >= fT || tL >= fL))
      ANG *= -1;

    if (this.onlyVisible) {
      const arrangeFrom = this.intersectionPoint(fL, fT, tL, tT, fromBStartX, fromBStartY, fromBStartX + fromBWidth, fromBStartY + fromBHeight);
      const arrangeTo = this.intersectionPoint(fL, fT, tL, tT, toBStartX, toBStartY, toBStartX + toBWidth, toBStartY + toBHeight);

      if (arrangeFrom) {
        fL = arrangeFrom.x;
        fT = arrangeFrom.y;
      }
      if (arrangeTo) {
        tL = arrangeTo.x;
        tT = arrangeTo.y;
      }
      CA = Math.abs(tT - fT);
      CO = Math.abs(tL - fL);
      H = Math.sqrt(CA * CA + CO * CO);
    }

    const top = (tT + fT) / 2 - W / 2;
    const left = (tL + fL) / 2 - H / 2;

    const arrows = this.elem.nativeElement.querySelectorAll('.line-' + nth + ' .arrow');

    this.needSwap[nth] = (fL > tL || (fL === tL && fT < tT));
    const arrowFw = this.needSwap[nth] && this.isVisible(arrows[0]) && arrows[0] || !this.needSwap[nth] && this.isVisible(arrows[1]) && arrows[1];
    const arrowBw = !this.needSwap[nth] && this.isVisible(arrows[0]) && arrows[0] || this.needSwap[nth] && this.isVisible(arrows[1]) && arrows[1];

    this.styleArrowFw[nth] = {};
    this.styleArrowBw[nth] = {};
    this.styleLine[nth] = {};

    this.styleArrowFw[nth]['borderRightColor'] = color;
    this.styleArrowFw[nth]['top'] = W / 2 - 6 + 'px';
    this.styleArrowBw[nth]['borderLeftColor'] = color;
    this.styleArrowBw[nth]['top'] = W / 2 - 6 + 'px';

    this.styleLine[nth]['display'] = 'none';
    this.styleLine[nth]['-webkit-transform'] = 'rotate(' + ANG + 'deg)';
    this.styleLine[nth]['-moz-transform'] = 'rotate(' + ANG + 'deg)';
    this.styleLine[nth]['-ms-transform'] = 'rotate(' + ANG + 'deg)';
    this.styleLine[nth]['-o-transform'] = 'rotate(' + ANG + 'deg)';
    this.styleLine[nth]['-transform'] = 'rotate(' + ANG + 'deg)';
    this.styleLine[nth]['top'] = top + 'px';
    this.styleLine[nth]['left'] = left + 'px';
    this.styleLine[nth]['width'] = H + 'px';
    this.styleLine[nth]['height'] = W + 'px';
    this.styleLine[nth]['background'] = 'linear-gradient(to right, ' +
      (arrowFw ? 'transparent' : color) + ' 11px, ' +
      color + ' 11px ' + (H - 11) + 'px, ' +
      (arrowBw ? 'transparent' : color) + ' ' + (H - 11) + 'px 100%)';
    this.styleLine[nth]['display'] = 'initial';
  }

  private adjustLines() {
    this.getFromToPairs()
      .map((pair: HTMLElement[], i: number) => {
        this.adjustLine(i, pair[0], pair[1]);
      });
  }

  private getFromToPairs() {
    const froms = Array.from(document.querySelectorAll(this.from) as NodeListOf<HTMLElement>);
    const tos = Array.from(document.querySelectorAll(this.to) as NodeListOf<HTMLElement>);

    // init values
    this.needSwap = Array(froms.length * tos.length).fill(false);
    this.styleLine = Array(froms.length * tos.length).fill([]);
    this.styleArrowBw = Array(froms.length * tos.length).fill({});
    this.styleArrowFw = Array(froms.length * tos.length).fill({});

    this.arrowIndices = Array(froms.length * tos.length)
      .fill(null).map((_, i) => i);

    return froms.reduce((acc1, cur1) => {
      return tos.reduce((acc2, cur2) => {
        acc2.push([cur1, cur2]);
        return acc2;
      }, acc1);
    }, []);
  }

  private trackPositionChange() {
    const from = document.querySelector(this.from);
    const to = document.querySelector(this.to);
    if (to == null || from == null)
      return;

    const currentPos = JSON.stringify(from.getBoundingClientRect()) + JSON.stringify(to.getBoundingClientRect());
    if (currentPos !== this.elementPositionBackup) {
      this.elementPositionBackup = currentPos;
      this.adjustLines();
    }
  }

  ngOnInit() {
    this.adjustLines();

    this.refreshPos = window.setInterval(() => {
      this.trackPositionChange();
    }, this.refreshInterval);
  }


  ngOnChanges() {
    this.adjustLines();
  }

  ngOnDestroy() {
    if (!!this.refreshPos)
      window.clearInterval(this.refreshPos);
  }

}
