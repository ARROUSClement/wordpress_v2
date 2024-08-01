import{Fragment,h}from"@stencil/core";import{__}from"@wordpress/i18n";import{addQueryArgs}from"@wordpress/url";import apiFetch from"../../../../functions/fetch";import{onFirstVisible}from"../../../../functions/lazy";import{intervalString}from"../../../../functions/price";import{formatTaxDisplay}from"../../../../functions/tax";import{productNameWithPrice}from"../../../../functions/price";export class ScUpcomingInvoice{constructor(){this.heading=void 0,this.successUrl=void 0,this.subscriptionId=void 0,this.priceId=void 0,this.variantId=void 0,this.quantity=void 0,this.discount=void 0,this.payment_method=void 0,this.quantityUpdatesEnabled=!0,this.adHocAmount=void 0,this.loading=void 0,this.busy=void 0,this.error=void 0,this.price=void 0,this.invoice=void 0,this.couponError=void 0}componentWillLoad(){onFirstVisible(this.el,(()=>{this.fetchItems()}))}isFutureInvoice(){return this.invoice.start_at>=(new Date).getTime()/1e3}async fetchItems(){var t,e;try{this.loading=!0,await Promise.all([this.getInvoice(),this.getPrice()])}catch(i){console.error(i),this.error=(null===(e=null===(t=null==i?void 0:i.additional_errors)||void 0===t?void 0:t[0])||void 0===e?void 0:e.message)||(null==i?void 0:i.message)||__("Something went wrong","surecart")}finally{this.loading=!1}}async getPrice(){this.priceId&&(this.price=await apiFetch({path:addQueryArgs(`surecart/v1/prices/${this.priceId}`,{expand:["product"]})}))}async getInvoice(){if(this.subscriptionId)return this.invoice=await apiFetch({method:"PATCH",path:addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId}/upcoming_period/`,{expand:["period.checkout","checkout.line_items","line_item.price","price.product","checkout.payment_method","checkout.manual_payment_method","checkout.discount","discount.promotion","discount.coupon","payment_method.card","payment_method.payment_instrument","payment_method.paypal_account","payment_method.bank_account"]}),data:{price:this.priceId,variant:this.variantId,quantity:this.quantity,...this.adHocAmount?{ad_hoc_amount:this.adHocAmount}:{},...this.discount?{discount:this.discount}:{}}}),this.invoice}async applyCoupon(t){try{this.couponError="",this.busy=!0,this.discount={promotion_code:t.detail},await this.getInvoice()}catch(t){this.couponError=(null==t?void 0:t.message)||__("Something went wrong","surecart")}finally{this.busy=!1}}async updateQuantity(t){try{this.error="",this.busy=!0,this.quantity=t.detail,await this.getInvoice()}catch(t){this.error=(null==t?void 0:t.message)||__("Something went wrong","surecart")}finally{this.busy=!1}}async onSubmit(){try{this.error="",this.busy=!0,await apiFetch({path:`surecart/v1/subscriptions/${this.subscriptionId}`,method:"PATCH",data:{price:this.priceId,quantity:this.quantity,variant:this.variantId,...this.adHocAmount?{ad_hoc_amount:this.adHocAmount}:{},...this.discount?{discount:this.discount}:{}}}),this.successUrl?window.location.assign(this.successUrl):this.busy=!1}catch(t){this.error=(null==t?void 0:t.message)||__("Something went wrong","surecart"),this.busy=!1}}renderName(t){return"string"!=typeof(null==t?void 0:t.product)?productNameWithPrice(t):__("Plan","surecart")}renderRenewalText(){var t;return this.isFutureInvoice()?h("div",null,__("You'll be switched to this plan","surecart")," ",h("strong",null,__("at the end of your billing cycle on","surecart")," ",h("sc-format-date",{type:"timestamp",date:null===(t=this.invoice)||void 0===t?void 0:t.start_at,month:"short",day:"numeric",year:"numeric"}))):h("div",null,__("You'll be switched to this plan","surecart")," ",h("strong",null,__("immediately","surecart")))}renderEmpty(){return h("slot",{name:"empty"},__("Something went wrong.","surecart"))}renderLoading(){return h("div",null,h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}}))}renderContent(){var t;if(this.loading)return this.renderLoading();if(!(null===(t=this.invoice)||void 0===t?void 0:t.checkout))return this.renderEmpty();const e=this.invoice.checkout;return h("div",{class:"new-plan"},h("div",{class:"new-plan__heading"},this.renderName(this.price)),h("div",null,h("sc-format-number",{type:"currency",currency:null==e?void 0:e.currency,value:null==e?void 0:e.total_amount})," ",intervalString(this.price)),h("div",{style:{fontSize:"var(--sc-font-size-small)"}},this.renderRenewalText()))}renderSummary(){var t,e;if(this.loading)return this.renderLoading();if(!this.invoice)return this.renderEmpty();const i=null===(t=this.invoice)||void 0===t?void 0:t.checkout,r=(null==i?void 0:i.manual_payment)?null==i?void 0:i.manual_payment_method:null;return h(Fragment,null,null===(e=null==i?void 0:i.line_items)||void 0===e?void 0:e.data.map((t=>{var e,i,r,n,o,s;return h("sc-product-line-item",{imageUrl:null===(i=null===(e=t.price)||void 0===e?void 0:e.product)||void 0===i?void 0:i.image_url,name:null===(n=null===(r=t.price)||void 0===r?void 0:r.product)||void 0===n?void 0:n.name,priceName:null===(o=null==t?void 0:t.price)||void 0===o?void 0:o.name,variantLabel:((null==t?void 0:t.variant_options)||[]).filter(Boolean).join(" / ")||null,editable:this.quantityUpdatesEnabled,purchasableStatusDisplay:null==t?void 0:t.purchasable_status_display,removable:!1,quantity:null==t?void 0:t.quantity,amount:null==t?void 0:t.total_amount,currency:null===(s=null==t?void 0:t.price)||void 0===s?void 0:s.currency,interval:intervalString(null==t?void 0:t.price),onScUpdateQuantity:t=>this.updateQuantity(t)})})),h("sc-line-item",null,h("span",{slot:"description"},__("Subtotal","surecart")),h("sc-format-number",{slot:"price",type:"currency",currency:null==i?void 0:i.currency,value:null==i?void 0:i.subtotal_amount})),!!i.proration_amount&&h("sc-line-item",null,h("span",{slot:"description"},__("Proration Credit","surecart")),h("sc-format-number",{slot:"price",type:"currency",currency:null==i?void 0:i.currency,value:-(null==i?void 0:i.proration_amount)})),!!i.applied_balance_amount&&h("sc-line-item",null,h("span",{slot:"description"},__("Applied Balance","surecart")),h("sc-format-number",{slot:"price",type:"currency",currency:null==i?void 0:i.currency,value:-(null==i?void 0:i.applied_balance_amount)})),!!i.trial_amount&&h("sc-line-item",null,h("span",{slot:"description"},__("Trial","surecart")),h("sc-format-number",{slot:"price",type:"currency",currency:null==i?void 0:i.currency,value:null==i?void 0:i.trial_amount})),h("sc-coupon-form",{discount:null==i?void 0:i.discount,label:__("Add Coupon Code","surecart"),onScApplyCoupon:t=>this.applyCoupon(t),error:this.couponError,collapsed:!0,buttonText:__("Add Coupon Code","surecart")}),!!i.tax_amount&&h("sc-line-item",null,h("span",{slot:"description"},formatTaxDisplay(null==i?void 0:i.tax_label)),h("sc-format-number",{slot:"price",type:"currency",currency:null==i?void 0:i.currency,value:null==i?void 0:i.tax_amount})),h("sc-divider",{style:{"--spacing":"0"}}),h("sc-line-item",null,h("span",{slot:"description"},__("Payment","surecart")),h("a",{href:addQueryArgs(window.location.href,{action:"payment"}),slot:"price-description"},h("sc-flex",{"justify-content":"flex-start","align-items":"center",style:{"--spacing":"0.5em"}},!!r&&h("sc-manual-payment-method",{paymentMethod:r}),!r&&h("sc-payment-method",{paymentMethod:null==i?void 0:i.payment_method}),h("sc-icon",{name:"edit-3"})))),h("sc-line-item",{style:{"--price-size":"var(--sc-font-size-x-large)"}},h("span",{slot:"title"},__("Total Due","surecart")),h("sc-format-number",{slot:"price",type:"currency",currency:null==i?void 0:i.currency,value:null==i?void 0:i.amount_due}),h("span",{slot:"currency"},i.currency)))}render(){return h("div",{class:"upcoming-invoice"},this.error&&h("sc-alert",{open:!!this.error,type:"danger"},h("span",{slot:"title"},__("Error","surecart")),this.error),h(Fragment,null,h("sc-dashboard-module",{heading:__("New Plan","surecart"),class:"plan-preview",error:this.error},h("sc-card",null,this.renderContent())),h("sc-dashboard-module",{heading:__("Summary","surecart"),class:"plan-summary"},h("sc-form",{onScFormSubmit:()=>this.onSubmit()},h("sc-card",null,this.renderSummary()),h("sc-button",{type:"primary",full:!0,submit:!0,loading:this.loading||this.busy,disabled:this.loading||this.busy},__("Confirm","surecart")))),h("sc-text",{style:{"--text-align":"center","--font-size":"var(--sc-font-size-small)","--line-height":"var(--sc-line-height-normal)"}},h("slot",{name:"terms"}))),this.busy&&h("sc-block-ui",null))}static get is(){return"sc-upcoming-invoice"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-upcoming-invoice.scss"]}}static get styleUrls(){return{$:["sc-upcoming-invoice.css"]}}static get properties(){return{heading:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"heading",reflect:!1},successUrl:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"success-url",reflect:!1},subscriptionId:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"subscription-id",reflect:!1},priceId:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"price-id",reflect:!1},variantId:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"variant-id",reflect:!1},quantity:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"quantity",reflect:!1},discount:{type:"unknown",mutable:!0,complexType:{original:"{\n    promotion_code?: string;\n    coupon?: string;\n  }",resolved:"{ promotion_code?: string; coupon?: string; }",references:{}},required:!1,optional:!1,docs:{tags:[],text:""}},payment_method:{type:"unknown",mutable:!0,complexType:{original:"PaymentMethod",resolved:"PaymentMethod",references:{PaymentMethod:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}},quantityUpdatesEnabled:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"quantity-updates-enabled",reflect:!1,defaultValue:"true"},adHocAmount:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"ad-hoc-amount",reflect:!1}}}static get states(){return{loading:{},busy:{},error:{},price:{},invoice:{},couponError:{}}}static get elementRef(){return"el"}}