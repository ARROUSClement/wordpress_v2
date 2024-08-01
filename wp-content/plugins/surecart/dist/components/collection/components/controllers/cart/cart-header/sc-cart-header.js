import{h}from"@stencil/core";import{state as checkoutState}from"@store/checkout";import{__}from"@wordpress/i18n";export class ScCartHeader{getItemsCount(){var t,e;const s=(null===(e=null===(t=checkoutState.checkout)||void 0===t?void 0:t.line_items)||void 0===e?void 0:e.data)||[];let r=0;return s.forEach((t=>{r+=null==t?void 0:t.quantity})),r}render(){var t;return h("div",{class:"cart-header"},h("sc-icon",{class:"cart__close",name:"arrow-right",onClick:()=>this.scCloseCart.emit(),onKeyDown:t=>{"Enter"!==(null==t?void 0:t.code)&&"Space"!==(null==t?void 0:t.code)||this.scCloseCart.emit()},tabIndex:0,role:"button","aria-label":__("Close Cart","surecart")}),h("div",{class:"cart-title"},h("slot",null)),h("sc-tag",{size:"small"},(null===(t=null==this?void 0:this.getItemsCount)||void 0===t?void 0:t.call(this))||0))}static get is(){return"sc-cart-header"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-cart-header.scss"]}}static get styleUrls(){return{$:["sc-cart-header.css"]}}static get events(){return[{method:"scCloseCart",name:"scCloseCart",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"void",resolved:"void",references:{}}}]}}