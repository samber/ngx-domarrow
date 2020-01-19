(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../dist/ngx-domarrow/fesm2015/ngx-domarrow.js":
/*!*****************************************************!*\
  !*** ../dist/ngx-domarrow/fesm2015/ngx-domarrow.js ***!
  \*****************************************************/
/*! exports provided: NgxDomarrowComponent, NgxDomarrowModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDomarrowComponent", function() { return NgxDomarrowComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDomarrowModule", function() { return NgxDomarrowModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../node_modules/@angular/common/fesm2015/common.js");



/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-domarrow.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxDomarrowComponent {
    /**
     * @param {?} elem
     */
    constructor(elem) {
        this.elem = elem;
        this.refreshInterval = 50;
        this.from = null;
        this.to = null;
        this.head = false;
        this.tail = false;
        this.text = null;
        this.color = null;
        this.width = null;
        this.onlyVisible = false;
        this.fromX = null;
        this.fromY = null;
        this.toX = null;
        this.toY = null;
        this.arrowIndices = [];
        this.styleLine = [];
        this.styleArrowFw = [];
        this.styleArrowBw = [];
        this.needSwap = [];
        this.elementPositionBackup = '';
        this.refreshPos = null;
    }
    /**
     * @private
     * @param {?} val
     * @param {?} def
     * @return {?}
     */
    getNumberOrDef(val, def) {
        return typeof val === 'number' && !isNaN(val) ? val : def;
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    isVisible(element) {
        return element && element.style.visibility !== 'hidden';
    }
    /**
     * @private
     * @param {?} minX
     * @param {?} minY
     * @param {?} maxX
     * @param {?} maxY
     * @param {?} x1
     * @param {?} y1
     * @return {?}
     */
    inside(minX, minY, maxX, maxY, x1, y1) {
        return minX <= x1 && x1 <= maxX && minY <= y1 && y1 <= maxY;
    }
    /**
     * @private
     * @param {?} x1
     * @param {?} y1
     * @param {?} x2
     * @param {?} y2
     * @param {?} minX
     * @param {?} minY
     * @param {?} maxX
     * @param {?} maxY
     * @return {?}
     */
    intersectionPoint(x1, y1, x2, y2, minX, minY, maxX, maxY) {
        /** @type {?} */
        const min = Math.min;
        /** @type {?} */
        const max = Math.max;
        /** @type {?} */
        const good = this.inside.bind(null, min(x1, x2), min(y1, y2), max(x1, x2), max(y1, y2));
        if ((x1 <= minX && x2 <= minX)
            || (y1 <= minY && y2 <= minY)
            || (x1 >= maxX && x2 >= maxX)
            || (y1 >= maxY && y2 >= maxY)
            || (this.inside(minX, minY, maxX, maxY, x1, y1) && this.inside(minX, minY, maxX, maxY, x2, y2)))
            return null;
        /** @type {?} */
        const m = (y2 - y1) / (x2 - x1);
        /** @type {?} */
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
        /** @type {?} */
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
    /**
     * @private
     * @param {?} nth
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    adjustLine(nth, from, to) {
        if (to == null || from == null)
            return;
        /** @type {?} */
        const color = this.color || 'black';
        /** @type {?} */
        const W = this.width || 2;
        /** @type {?} */
        const fromB = parseFloat(from.style.top) ? null : from.getBoundingClientRect();
        /** @type {?} */
        const toB = parseFloat(to.style.top) ? null : to.getBoundingClientRect();
        /** @type {?} */
        const fromBStartY = (fromB ? window.scrollY + fromB.top : parseFloat(from.style.top));
        /** @type {?} */
        const fromBStartX = (fromB ? window.scrollX + fromB.left : parseFloat(from.style.left));
        /** @type {?} */
        const toBStartY = (toB ? window.scrollY + toB.top : parseFloat(to.style.top));
        /** @type {?} */
        const toBStartX = (toB ? window.scrollX + toB.left : parseFloat(to.style.left));
        /** @type {?} */
        const fromBWidth = (fromB ? fromB.width : parseFloat(from.style.width) || from.offsetWidth);
        /** @type {?} */
        const fromBHeight = (fromB ? fromB.height : parseFloat(from.style.height) || from.offsetHeight);
        /** @type {?} */
        const toBWidth = (toB ? toB.width : parseFloat(to.style.width) || to.offsetWidth);
        /** @type {?} */
        const toBHeight = (toB ? toB.height : parseFloat(to.style.height) || to.offsetHeight);
        /** @type {?} */
        let fT = fromBStartY + fromBHeight * this.getNumberOrDef(this.fromY, 0.5);
        /** @type {?} */
        let tT = toBStartY + toBHeight * this.getNumberOrDef(this.toY, 0.5);
        /** @type {?} */
        let fL = fromBStartX + fromBWidth * this.getNumberOrDef(this.fromX, 0.5);
        /** @type {?} */
        let tL = toBStartX + toBWidth * this.getNumberOrDef(this.toX, 0.5);
        /** @type {?} */
        let CA = Math.abs(tT - fT);
        /** @type {?} */
        let CO = Math.abs(tL - fL);
        /** @type {?} */
        let H = Math.sqrt(CA * CA + CO * CO);
        /** @type {?} */
        let ANG = 180 / Math.PI * Math.acos(CO / H);
        if ((fT >= tT || fL >= tL) && (tT >= fT || tL >= fL))
            ANG *= -1;
        if (this.onlyVisible) {
            /** @type {?} */
            const arrangeFrom = this.intersectionPoint(fL, fT, tL, tT, fromBStartX, fromBStartY, fromBStartX + fromBWidth, fromBStartY + fromBHeight);
            /** @type {?} */
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
        /** @type {?} */
        const top = (tT + fT) / 2 - W / 2;
        /** @type {?} */
        const left = (tL + fL) / 2 - H / 2;
        /** @type {?} */
        const arrows = this.elem.nativeElement.querySelectorAll('.line-' + nth + ' .arrow');
        this.needSwap[nth] = (fL > tL || (fL === tL && fT < tT));
        /** @type {?} */
        const arrowFw = this.needSwap[nth] && this.isVisible(arrows[0]) && arrows[0] || !this.needSwap[nth] && this.isVisible(arrows[1]) && arrows[1];
        /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    adjustLines() {
        /** @type {?} */
        const pairs = this.getFromToPairs()
        // init values
        ;
        // init values
        this.needSwap = Array(pairs.length).fill(false);
        this.styleLine = Array(pairs.length).fill([]);
        this.styleArrowBw = Array(pairs.length).fill({});
        this.styleArrowFw = Array(pairs.length).fill({});
        this.arrowIndices = Array(pairs.length)
            .fill(null).map((/**
         * @param {?} _
         * @param {?} i
         * @return {?}
         */
        (_, i) => i));
        pairs.map((/**
         * @param {?} pair
         * @param {?} i
         * @return {?}
         */
        (pair, i) => {
            this.adjustLine(i, pair[0], pair[1]);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    getFromToPairs() {
        /** @type {?} */
        const froms = Array.from((/** @type {?} */ (document.querySelectorAll(this.from))));
        /** @type {?} */
        const tos = Array.from((/** @type {?} */ (document.querySelectorAll(this.to))));
        return froms.reduce((/**
         * @param {?} acc1
         * @param {?} cur1
         * @return {?}
         */
        (acc1, cur1) => {
            return tos.reduce((/**
             * @param {?} acc2
             * @param {?} cur2
             * @return {?}
             */
            (acc2, cur2) => {
                acc2.push([cur1, cur2]);
                return acc2;
            }), acc1);
        }), []).filter((/**
         * @param {?} pair
         * @return {?}
         */
        (pair) => !!pair[0] && !!pair[1]));
    }
    /**
     * @private
     * @return {?}
     */
    trackPositionChange() {
        /** @type {?} */
        const pairs = this.getFromToPairs();
        /** @type {?} */
        const currentPos = pairs.map((/**
         * @param {?} pair
         * @return {?}
         */
        (pair) => {
            return JSON.stringify(pair[0].getBoundingClientRect()) + JSON.stringify(pair[1].getBoundingClientRect());
            ;
        })).join(',');
        if (currentPos !== this.elementPositionBackup) {
            this.elementPositionBackup = currentPos;
            this.adjustLines();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.adjustLines();
        this.refreshPos = window.setInterval((/**
         * @return {?}
         */
        () => {
            this.trackPositionChange();
        }), this.refreshInterval);
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.adjustLines();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (!!this.refreshPos)
            window.clearInterval(this.refreshPos);
    }
}
NgxDomarrowComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'ngx-domarrow',
                template: "<ng-container *ngFor=\"let index of arrowIndices\">\n\n  <div class=\"line line-{{ index }}\" [ngStyle]=\"styleLine[index]\">\n\n    <div *ngIf=\"head == true\" class=\"arrow head {{ needSwap[index] ? 'arrow-bw' : 'arrow-fw' }}\"\n      [ngStyle]=\"needSwap[index] ? styleArrowBw[index] : styleArrowFw[index]\"></div>\n    <div *ngIf=\"tail == true\" class=\"arrow tail {{ needSwap[index] ? 'arrow-fw' : 'arrow-bw' }}\"\n      [ngStyle]=\"needSwap[index] ? styleArrowFw[index] : styleArrowBw[index]\"></div>\n    <div *ngIf=\"!!text && text.length > 0\" class=\"text\">{{ text }}</div>\n\n  </div>\n\n</ng-container>\n",
                styles: [".line .arrow{top:-5px;height:0;width:0;position:absolute;border-bottom:6px solid transparent;border-top:6px solid transparent;background-clip:border-box}.line .arrow-fw{border-right:12px solid #000}.line .arrow-bw{left:100%;border-left:12px solid #000;-webkit-transform:translateX(-12px);transform:translateX(-12px)}.line .text{position:absolute;top:100%;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.line{position:absolute;height:2px;background-color:#000}"]
            }] }
];
/** @nocollapse */
NgxDomarrowComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }
];
NgxDomarrowComponent.propDecorators = {
    refreshInterval: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    from: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    to: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    head: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    tail: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    text: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    width: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    onlyVisible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    fromX: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    fromY: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    toX: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    toY: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
};
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-domarrow.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxDomarrowModule {
}
NgxDomarrowModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [NgxDomarrowComponent],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ],
                exports: [NgxDomarrowComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-domarrow.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-domarrow.js.map


/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!***************************************************************************!*\
  !*** ../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"element-1\" class=\"element\"></div>\n<div id=\"element-2\" class=\"element\"></div>\n<div id=\"element-3\" class=\"element\"></div>\n<div id=\"element-4\" class=\"element multiple\"></div>\n<div id=\"element-5\" class=\"element multiple\"></div>\n<div id=\"element-6\" class=\"element multiple\"></div>\n\n<ngx-domarrow from=\"#element-1\" to=\"#element-2\" [tail]=\"true\" [onlyVisible]=\"true\" color=\"blue\" text=\"Hello world\">\n</ngx-domarrow>\n\n<ngx-domarrow from=\"#element-1\" to=\"#element-3\" [head]=\"true\" [tail]=\"true\" color=\"#0000FF\" [width]=\"5\">\n</ngx-domarrow>\n\n<ngx-domarrow from=\"#element-3\" to=\".element.multiple\" [head]=\"false\" [tail]=\"true\" color=\"green\" [width]=\"2\">\n</ngx-domarrow>\n");

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".element {\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  border: 5px solid red;\n}\n\n#element-1 {\n  top: 50px;\n  left: 50px;\n}\n\n#element-2 {\n  top: 600px;\n  left: 250px;\n}\n\n#element-3 {\n  top: 300px;\n  left: 700px;\n}\n\n.element.multiple {\n  width: 50px;\n  height: 50px;\n  border: 3px solid orange;\n}\n\n#element-4 {\n  top: 50px;\n  left: 400px;\n}\n\n#element-5 {\n  top: 250px;\n  left: 300px;\n}\n\n#element-6 {\n  top: 600px;\n  left: 600px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYW1iZXIvcHJvamVjdC9naXRodWIuY29tL3NhbWJlci9uZ3gtZG9tYXJyb3cvbmd4LWRvbWFycm93L2RlbW8vc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJkZW1vL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUVBLHFCQUFBO0FDQUY7O0FER0E7RUFDRSxTQUFBO0VBQ0EsVUFBQTtBQ0FGOztBREdBO0VBQ0UsVUFBQTtFQUNBLFdBQUE7QUNBRjs7QURHQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0FDQUY7O0FER0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUVBLHdCQUFBO0FDREY7O0FESUE7RUFDRSxTQUFBO0VBQ0EsV0FBQTtBQ0RGOztBRElBO0VBQ0UsVUFBQTtFQUNBLFdBQUE7QUNERjs7QURJQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0FDREYiLCJmaWxlIjoiZGVtby9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lbGVtZW50IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMTAwcHg7XG5cbiAgYm9yZGVyOiA1cHggc29saWQgcmVkO1xufVxuXG4jZWxlbWVudC0xIHtcbiAgdG9wOiA1MHB4O1xuICBsZWZ0OiA1MHB4O1xufVxuXG4jZWxlbWVudC0yIHtcbiAgdG9wOiA2MDBweDtcbiAgbGVmdDogMjUwcHg7XG59XG5cbiNlbGVtZW50LTMge1xuICB0b3A6IDMwMHB4O1xuICBsZWZ0OiA3MDBweDtcbn1cblxuLmVsZW1lbnQubXVsdGlwbGUge1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuXG4gIGJvcmRlcjogM3B4IHNvbGlkIG9yYW5nZTtcbn1cblxuI2VsZW1lbnQtNCB7XG4gIHRvcDogNTBweDtcbiAgbGVmdDogNDAwcHg7XG59XG5cbiNlbGVtZW50LTUge1xuICB0b3A6IDI1MHB4O1xuICBsZWZ0OiAzMDBweDtcbn1cblxuI2VsZW1lbnQtNiB7XG4gIHRvcDogNjAwcHg7XG4gIGxlZnQ6IDYwMHB4O1xufVxuIiwiLmVsZW1lbnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgYm9yZGVyOiA1cHggc29saWQgcmVkO1xufVxuXG4jZWxlbWVudC0xIHtcbiAgdG9wOiA1MHB4O1xuICBsZWZ0OiA1MHB4O1xufVxuXG4jZWxlbWVudC0yIHtcbiAgdG9wOiA2MDBweDtcbiAgbGVmdDogMjUwcHg7XG59XG5cbiNlbGVtZW50LTMge1xuICB0b3A6IDMwMHB4O1xuICBsZWZ0OiA3MDBweDtcbn1cblxuLmVsZW1lbnQubXVsdGlwbGUge1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBib3JkZXI6IDNweCBzb2xpZCBvcmFuZ2U7XG59XG5cbiNlbGVtZW50LTQge1xuICB0b3A6IDUwcHg7XG4gIGxlZnQ6IDQwMHB4O1xufVxuXG4jZWxlbWVudC01IHtcbiAgdG9wOiAyNTBweDtcbiAgbGVmdDogMzAwcHg7XG59XG5cbiNlbGVtZW50LTYge1xuICB0b3A6IDYwMHB4O1xuICBsZWZ0OiA2MDBweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_domarrow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-domarrow */ "../dist/ngx-domarrow/fesm2015/ngx-domarrow.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");





let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            ngx_domarrow__WEBPACK_IMPORTED_MODULE_3__["NgxDomarrowModule"],
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production)
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/samber/project/github.com/samber/ngx-domarrow/ngx-domarrow/demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map