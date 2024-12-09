"use strict";(globalThis.webpackChunk_jbrowse_web=globalThis.webpackChunk_jbrowse_web||[]).push([[6834],{6834:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var s=r(93902),a=r(60972),n=r(46377),i=r(99834),o=r(66885),c=r(99546),u=r(4101);class d extends n.BaseFeatureDataAdapter{async configurePre(e){const t=this.pluginManager,r=new s.C({filehandle:(0,i.openLocation)(this.getConf("bigBedLocation"),t)}),n=await r.getHeader(e);return{bigbed:r,header:n,parser:new a.A({autoSql:n.autoSql})}}async configure(e){return this.cached||(this.cached=this.configurePre(e).catch((e=>{throw this.cached=void 0,e}))),this.cached}async getRefNames(e){const{header:t}=await this.configure(e);return Object.keys(t.refsByName)}async getHeader(e){const{parser:t,header:r}=await this.configure(e),{version:s,fileType:a}=r,{fields:n,...i}=t.autoSql;return{version:s,fileType:a,autoSql:{...i},fields:Object.fromEntries(n.map((({name:e,comment:t})=>[e,t])))}}async getFeaturesHelper(e,t,r,s,a=e){const{signal:n}=t,i=this.getConf("scoreColumn"),o=this.getConf("aggregateField"),{parser:d,bigbed:f}=await this.configure(t),h=await f.getFeatures(e.refName,e.start,e.end,{signal:n,basesPerSpan:e.end-e.start});if(s&&h.length){let s=Number.POSITIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(const e of h)e.start<s&&(s=e.start),e.end>a&&(a=e.end);if(a>e.end||s<e.start)return void await this.getFeaturesHelper({...e,start:s,end:a},t,r,!1,e)}const l={};if(h.some((e=>void 0===e.uniqueId)))throw new Error("found uniqueId undefined");for(const t of h){const s=d.parseLine(`${e.refName}\t${t.start}\t${t.end}\t${t.rest}`,{uniqueId:t.uniqueId}),n=s[o];l[n]||(l[n]=[]);const{uniqueId:f,type:h,chromStart:m,chromStarts:p,blockStarts:b,blockCount:S,blockSizes:k,chromEnd:N,thickStart:g,thickEnd:y,chrom:I,score:C,...w}=s,q=S?(0,u.zZ)({chromStarts:p,blockStarts:b,blockCount:S,blockSizes:k,uniqueId:f,refName:e.refName,start:t.start}):[];if((0,u.Vl)(s)){const o=(0,u.BX)({...w,uniqueId:f,type:h,start:t.start,end:t.end,refName:e.refName,score:i?+s[i]:C,chromStarts:p,blockCount:S,blockSizes:k,thickStart:g,thickEnd:y,subfeatures:q});n?l[n].push(o):(0,c.doesIntersect2)(o.start,o.end,a.start,a.end)&&r.next(new c.SimpleFeature({id:`${this.id}-${f}`,data:o}))}else(0,c.doesIntersect2)(t.start,t.end,a.start,a.end)&&r.next(new c.SimpleFeature({id:`${this.id}-${f}`,data:{...w,uniqueId:f,type:h,start:t.start,score:i?+s[i]:C,end:t.end,refName:e.refName,subfeatures:q}}))}Object.entries(l).map((([t,s])=>{const n=(0,c.min)(s.map((e=>e.start))),i=(0,c.max)(s.map((e=>e.end)));if((0,c.doesIntersect2)(n,i,a.start,a.end)){const{uniqueId:a,strand:o}=s[0];r.next(new c.SimpleFeature({id:`${this.id}-${a}-parent`,data:{type:"gene",subfeatures:s,strand:o,name:t,start:n,end:i,refName:e.refName}}))}})),r.complete()}getFeatures(e,t={}){return(0,o.ObservableCreate)((async r=>{try{await this.getFeaturesHelper(e,t,r,!0)}catch(e){r.error(e)}}),t.signal)}freeResources(){}}},4101:(e,t,r)=>{r.d(t,{BX:()=>a,Vl:()=>o,dE:()=>i,zZ:()=>n});var s=r(99546);function a(e){const{subfeatures:t,thickStart:r,thickEnd:s,blockCount:a,blockSizes:n,chromStarts:i,refName:o,strand:c=0,...u}=e;if(!r||!s||!c)return e;const d=[];return t.filter((e=>"block"===e.type)).sort(((e,t)=>e.start-t.start)).forEach((e=>{const t=e.start,a=e.end;if(r>=a){const e=c>0?"five":"three";d.push({type:`${e}_prime_UTR`,start:t,end:a,refName:o})}else if(r>t&&r<a&&s>=a){const e=c>0?"five":"three";d.push({type:`${e}_prime_UTR`,start:t,end:r,refName:o},{type:"CDS",start:r,end:a,refName:o})}else if(r<=t&&s>=a)d.push({type:"CDS",start:t,end:a,refName:o});else if(r>t&&r<a&&s<a){const e=c>0?"five":"three",n=c>0?"three":"five";d.push({type:`${e}_prime_UTR`,start:t,end:r,refName:o},{type:"CDS",start:r,end:s,refName:o},{type:`${n}_prime_UTR`,start:s,end:a,refName:o})}else if(r<=t&&s>t&&s<a){const e=c>0?"three":"five";d.push({type:"CDS",start:t,end:s,refName:o},{type:`${e}_prime_UTR`,start:s,end:a,refName:o})}else if(s<=t){const e=c>0?"three":"five";d.push({type:`${e}_prime_UTR`,start:t,end:a,refName:o})}})),{...u,strand:c,type:"mRNA",refName:o,subfeatures:d}}function n({start:e,uniqueId:t,refName:r,chromStarts:s,blockCount:a,blockSizes:n,blockStarts:i}){const o=[],c=s||i||[];for(let s=0;s<a;s++){const a=(c[s]||0)+e,i=a+(n[s]||0);o.push({uniqueId:`${t}-${s}`,start:a,end:i,refName:r,type:"block"})}return o}function i(e,t,r,i,c,u,d,f){const h=e.split("\t"),l=h[t],m=+h[r],p=r===i?1:0,b=+h[i]+p,S=f?function(e,t){const r=Object.fromEntries(t.split("\t").map(((t,r)=>[e[r],t]))),{blockStarts:s,blockCount:a,chromStarts:n,thickEnd:i,thickStart:o,blockSizes:c,...u}=r;return{...u,blockStarts:s?.split(",").map((e=>+e)),chromStarts:n?.split(",").map((e=>+e)),blockSizes:c?.split(",").map((e=>+e)),thickStart:o?+o:void 0,thickEnd:i?+i:void 0,blockCount:a?+a:void 0}}(f,e):u.parseLine(e,{uniqueId:d}),{blockCount:k,blockSizes:N,blockStarts:g,chromStarts:y,thickStart:I,thickEnd:C,type:w,score:q,chrom:$,chromStart:_,chromEnd:v,...E}=S,T=k?n({start:m,uniqueId:d,refName:l,chromStarts:y,blockCount:k,blockSizes:N,blockStarts:g}):[],F={...E,type:w,score:c?+S[c]:q,start:m,end:b,refName:l,uniqueId:d,subfeatures:T};return new s.SimpleFeature({id:d,data:o(S)?a({thickStart:I,thickEnd:C,blockCount:k,blockSizes:N,chromStarts:y,...F}):F})}function o(e){return e.thickStart&&e.blockCount&&0!==e.strand}}}]);
//# sourceMappingURL=6834.bc9e9f2b.chunk.js.map