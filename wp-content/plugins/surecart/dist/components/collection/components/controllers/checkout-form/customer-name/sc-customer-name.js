import{createOrUpdateCheckout}from"../../../../services/session";import{h}from"@stencil/core";import{state as userState}from"@store/user";import{state as checkoutState,onChange}from"@store/checkout";import{getValueFromUrl}from"../../../../functions/util";export class ScCustomerName{constructor(){this.size="medium",this.value=null,this.pill=!1,this.label=void 0,this.showLabel=!0,this.help="",this.placeholder=void 0,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1,this.autofocus=void 0,this.hasFocus=void 0}async reportValidity(){return this.input.reportValidity()}async handleChange(){this.value=this.input.value;try{checkoutState.checkout=await createOrUpdateCheckout({id:checkoutState.checkout.id,data:{name:this.input.value}})}catch(e){console.error(e)}}handleSessionChange(){var e,t,o,l,a,s;if(this.value)return;const i=getValueFromUrl("full_name");userState.loggedIn||!i?userState.loggedIn?this.value=(null===(t=null===(e=null==checkoutState?void 0:checkoutState.checkout)||void 0===e?void 0:e.customer)||void 0===t?void 0:t.name)||(null===(o=null==checkoutState?void 0:checkoutState.checkout)||void 0===o?void 0:o.name):this.value=(null===(l=null==checkoutState?void 0:checkoutState.checkout)||void 0===l?void 0:l.name)||(null===(s=null===(a=null==checkoutState?void 0:checkoutState.checkout)||void 0===a?void 0:a.customer)||void 0===s?void 0:s.name):this.value=i}componentWillLoad(){this.handleSessionChange(),this.removeCheckoutListener=onChange("checkout",(()=>this.handleSessionChange()))}disconnectedCallback(){this.removeCheckoutListener()}render(){return h("sc-input",{type:"text",name:"name",ref:e=>this.input=e,value:this.value,label:this.label,help:this.help,autocomplete:"name",placeholder:this.placeholder,readonly:this.readonly,required:this.required,invalid:this.invalid,autofocus:this.autofocus,hasFocus:this.hasFocus,onScChange:()=>this.handleChange(),onScInput:()=>this.scInput.emit(),onScFocus:()=>this.scFocus.emit(),onScBlur:()=>this.scBlur.emit()})}static get is(){return"sc-customer-name"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-customer-name.css"]}}static get styleUrls(){return{$:["sc-customer-name.css"]}}static get properties(){return{size:{type:"string",mutable:!1,complexType:{original:"'small' | 'medium' | 'large'",resolved:'"large" | "medium" | "small"',references:{}},required:!1,optional:!1,docs:{tags:[],text:"The input's size."},attribute:"size",reflect:!0,defaultValue:"'medium'"},value:{type:"any",mutable:!0,complexType:{original:"any",resolved:"any",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The input's value attribute."},attribute:"value",reflect:!1,defaultValue:"null"},pill:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Draws a pill-style input with rounded edges."},attribute:"pill",reflect:!0,defaultValue:"false"},label:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The input's label."},attribute:"label",reflect:!1},showLabel:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Should we show the label"},attribute:"show-label",reflect:!1,defaultValue:"true"},help:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The input's help text."},attribute:"help",reflect:!1,defaultValue:"''"},placeholder:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The input's placeholder text."},attribute:"placeholder",reflect:!1},disabled:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Disables the input."},attribute:"disabled",reflect:!0,defaultValue:"false"},readonly:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Makes the input readonly."},attribute:"readonly",reflect:!0,defaultValue:"false"},required:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Makes the input a required field."},attribute:"required",reflect:!0,defaultValue:"false"},invalid:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"This will be true when the control is in an invalid state. Validity is determined by props such as `type`,\n`required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API."},attribute:"invalid",reflect:!0,defaultValue:"false"},autofocus:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The input's autofocus attribute."},attribute:"autofocus",reflect:!1},hasFocus:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Inputs focus"},attribute:"has-focus",reflect:!0}}}static get events(){return[{method:"scInput",name:"scInput",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Emitted when the control receives input."},complexType:{original:"void",resolved:"void",references:{}}},{method:"scFocus",name:"scFocus",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Emitted when the control gains focus."},complexType:{original:"void",resolved:"void",references:{}}},{method:"scBlur",name:"scBlur",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Emitted when the control loses focus."},complexType:{original:"void",resolved:"void",references:{}}}]}static get methods(){return{reportValidity:{complexType:{signature:"() => Promise<boolean>",parameters:[],references:{Promise:{location:"global"}},return:"Promise<boolean>"},docs:{text:"Don't allow a blank space as an input here.",tags:[]}}}}}