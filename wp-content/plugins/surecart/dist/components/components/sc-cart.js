import{proxyCustomElement,HTMLElement,h,Fragment}from"@stencil/core/internal/client";import{a as apiFetch}from"./fetch.js";import{b as baseUrl,e as expand}from"./index4.js";import{a as store,g as getCheckout,b as setCheckout,s as state}from"./mutations2.js";import{c as createErrorNotice}from"./mutations3.js";import{u as updateFormState}from"./mutations5.js";import{f as formBusy}from"./getters3.js";import{d as defineCustomElement$9}from"./sc-alert2.js";import{d as defineCustomElement$8}from"./sc-block-ui2.js";import{d as defineCustomElement$7}from"./sc-cart-session-provider2.js";import{d as defineCustomElement$6}from"./sc-drawer2.js";import{d as defineCustomElement$5}from"./sc-error2.js";import{d as defineCustomElement$4}from"./sc-icon2.js";import{d as defineCustomElement$3}from"./sc-line-items-provider2.js";import{d as defineCustomElement$2}from"./sc-spinner2.js";import{a as addQueryArgs}from"./add-query-args.js";const scCartCss=":host{--sc-drawer-header-spacing:var(--sc-spacing-large);--sc-drawer-body-spacing:var(--sc-spacing-large);--sc-drawer-footer-spacing:var(--sc-spacing-large)}.cart{font-size:16px}.cart__header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart__close{opacity:0.75;transition:opacity 0.25s ease;cursor:pointer}.cart__close:hover{opacity:1}::slotted(*){padding:var(--sc-drawer-header-spacing);background:var(--sc-panel-background-color);position:relative}::slotted(sc-line-items){flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch;min-height:200px}::slotted(:last-child){border-bottom:0 !important}sc-drawer::part(body){display:flex;flex-direction:column;box-sizing:border-box;padding:0;overflow:hidden}",ScCart$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.open=null,this.formId=void 0,this.header=void 0,this.checkoutLink=void 0,this.cartTemplate=void 0,this.mode="live",this.checkoutUrl=void 0,this.alwaysShow=void 0,this.floatingIconEnabled=!0,this.uiState="idle"}handleOpenChange(){var e,t,s;store.set("cart",{...store.state.cart,open:this.open}),!0===this.open?this.fetchOrder():null===(s=null===(t=null===(e=null===document||void 0===document?void 0:document.querySelector("sc-cart-icon"))||void 0===e?void 0:e.shadowRoot)||void 0===t?void 0:t.querySelector(".cart"))||void 0===s||s.focus()}order(){return getCheckout(this.formId,this.mode)}setCheckout(e){setCheckout(e,this.formId)}pageHasForm(){return!!document.querySelector("sc-checkout")}getItemsCount(){var e,t;const s=null===(t=null===(e=state.checkout)||void 0===e?void 0:e.line_items)||void 0===t?void 0:t.data;let o=0;return(s||[]).forEach((e=>{o+=null==e?void 0:e.quantity})),o}handleSetState(e){this.uiState=e.detail}handleCloseCart(){this.open=!1}async fetchOrder(){var e,t;if(null===(e=state.checkout)||void 0===e?void 0:e.id)try{updateFormState("FETCH"),state.checkout=await apiFetch({method:"GET",path:addQueryArgs(`${baseUrl}${null===(t=state.checkout)||void 0===t?void 0:t.id}`,{expand:expand})}),updateFormState("RESOLVE")}catch(e){console.error(e),updateFormState("REJECT"),createErrorNotice(e)}}componentWillLoad(){this.open=!!store.state.cart.open,store.onChange("cart",(e=>{this.open=e.open}))}state(){var e,t,s,o,r,a,i,n,c,d,l;return{uiState:this.uiState,checkoutLink:this.checkoutLink,loading:"loading"===this.uiState,busy:"busy"===this.uiState,navigating:"navigating"===this.uiState,empty:!(null===(s=null===(t=null===(e=state.checkout)||void 0===e?void 0:e.line_items)||void 0===t?void 0:t.pagination)||void 0===s?void 0:s.count),order:state.checkout,lineItems:(null===(r=null===(o=state.checkout)||void 0===o?void 0:o.line_items)||void 0===r?void 0:r.data)||[],tax_status:null===(a=state.checkout)||void 0===a?void 0:a.tax_status,customerShippingAddress:"string"!=typeof(null===(i=state.checkout)||void 0===i?void 0:i.customer)?null===(c=null===(n=state.checkout)||void 0===n?void 0:n.customer)||void 0===c?void 0:c.shipping_address:{},shippingAddress:null===(d=state.checkout)||void 0===d?void 0:d.shipping_address,taxStatus:null===(l=state.checkout)||void 0===l?void 0:l.tax_status,formId:this.formId}}render(){return h("sc-cart-session-provider",null,h("sc-drawer",{open:this.open,onScAfterShow:()=>this.open=!0,onScAfterHide:()=>{this.open=!1}},!0===this.open&&h(Fragment,null,h("div",{class:"cart__header-suffix",slot:"header"},h("slot",{name:"cart-header"}),h("sc-error",{style:{"--sc-alert-border-radius":"0"},slot:"header"})),h("slot",null)),formBusy()&&h("sc-block-ui",{"z-index":9})))}get el(){return this}static get watchers(){return{open:["handleOpenChange"]}}static get style(){return scCartCss}},[1,"sc-cart",{formId:[513,"form-id"],header:[1],checkoutLink:[1,"checkout-link"],cartTemplate:[1,"cart-template"],mode:[1],checkoutUrl:[1,"checkout-url"],alwaysShow:[4,"always-show"],floatingIconEnabled:[4,"floating-icon-enabled"],open:[32],uiState:[32]},[[0,"scSetState","handleSetState"],[0,"scCloseCart","handleCloseCart"]]]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-cart","sc-alert","sc-block-ui","sc-cart-session-provider","sc-drawer","sc-error","sc-icon","sc-line-items-provider","sc-spinner"].forEach((e=>{switch(e){case"sc-cart":customElements.get(e)||customElements.define(e,ScCart$1);break;case"sc-alert":customElements.get(e)||defineCustomElement$9();break;case"sc-block-ui":customElements.get(e)||defineCustomElement$8();break;case"sc-cart-session-provider":customElements.get(e)||defineCustomElement$7();break;case"sc-drawer":customElements.get(e)||defineCustomElement$6();break;case"sc-error":customElements.get(e)||defineCustomElement$5();break;case"sc-icon":customElements.get(e)||defineCustomElement$4();break;case"sc-line-items-provider":customElements.get(e)||defineCustomElement$3();break;case"sc-spinner":customElements.get(e)||defineCustomElement$2()}}))}const ScCart=ScCart$1,defineCustomElement=defineCustomElement$1;export{ScCart,defineCustomElement};