(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{609:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(18),i=a.n(o),c=a(114),s=a(33),l=a(17),d=a(340),p=a(632),u=a(339),b=a(631),g=a(9),m=a(32),j=a(89),h=a.n(j),f=function(e){var t=Object(r.useState)(e),a=Object(l.a)(t,2),n=a[0],o=a[1];return[n,function(e){o(Object(m.a)(Object(m.a)({},n),{},Object(g.a)({},e.target.name,e.target.value)))},function(e){e.preventDefault(),h.a.post("https://imedixbcr.iitkgp.ac.in/api/user/login",{username:n.username,password:n.password}).then((function(e){if("doc"===e.data.type||"rOP"===e.data.type||"pOP"===e.data.type){var t=e.data.jwtToken;localStorage.setItem("token",t),localStorage.setItem("username",n.username),localStorage.setItem("password",n.password),o(Object(m.a)(Object(m.a)({},n),{},{loggedIn:!0}))}else o(Object(m.a)(Object(m.a)({},n),{},{error:"Forbidden"}))})).catch((function(e){e.response?o(Object(m.a)(Object(m.a)({},n),{},{error:e.response.data.error})):e.request?o(Object(m.a)(Object(m.a)({},n),{},{error:e.request})):o(Object(m.a)(Object(m.a)({},n),{},{error:e.message}))}))}]},O=a(338),x=a.p+"static/media/bcrth.cf284928.jpg",v=a(7),y=Object(O.a)({sep:{margin:20},header:{paddingTop:40,textAlign:"center",color:"black",fontSize:40,fontWeight:"bold"}}),S=function(){var e=!1,t=y();localStorage.getItem("token")&&(e=!0);var a=f({username:"",password:"",loggedIn:e,error:""}),r=Object(l.a)(a,3),n=r[0],o=r[1],i=r[2];return!0===n.loggedIn?Object(v.jsx)(s.a,{to:"/dashboard"}):Object(v.jsx)("div",{style:{backgroundImage:"url(".concat(x,")"),backgroundSize:"cover",height:"100vh",margin:0},children:Object(v.jsxs)(b.a,{component:"main",maxWidth:"xs",children:[Object(v.jsx)(p.a,{}),Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{className:t.header,children:"Sign in"}),Object(v.jsxs)("form",{noValidate:!0,children:[Object(v.jsx)(u.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",value:n.username,autoFocus:!0,onChange:o,InputLabelProps:{style:{fontSize:21,fontWeight:"bold"}}}),Object(v.jsx)(u.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",value:n.password,autoComplete:"current-password",onChange:o,InputLabelProps:{style:{fontSize:21,fontWeight:"bold"}}}),Object(v.jsx)(d.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",onClick:i,children:"Sign In"})]}),Object(v.jsx)("div",{children:n.error})]})]})})},k=a(127),w=a.n(k),C=a(210),N=a(150),I=a.n(N),D=a(398),T=a.n(D),z=a(642),W=a(345),F=a(94),M=a(4),P=a(153);var B=Object(M.a)((function(e){return{root:Object(m.a)(Object(m.a)({},e.mixins.gutters()),{},{backgroundColor:"black"}),footer:{backgroundColor:"black",marginTop:e.spacing.unit,padding:"".concat(4*e.spacing.unit,"px 0"),borderRadius:6},textProps:{color:"White"}}}))((function(e){var t=e.classes;return Object(v.jsx)("footer",{className:t.footer,children:Object(v.jsx)(P.a,{className:t.root,elevation:1,children:Object(v.jsxs)(F.a,{align:"center",className:t.textProps,children:["\xa9",Object(v.jsx)("a",{href:"https://github.com/coviapp",children:"CoviApp Organization"}),", All rights reserved"]})})})})),_=a(156),E=function(e,t){return e.spo2-t.spo2},A=Object(O.a)({root:{backgroundColor:"#00C9BC",flexGrow:1,borderRadius:6},menuButton:{marginRight:2,fontSize:18,fontFamily:"Comic sans ms",backgroundColor:"#E0FFFF","&:hover":{backgroundColor:"#FFFDD0"}},title:{flexGrow:1,fontSize:25,fontWeight:"bold"}}),R=function(e){var t=!1;localStorage.getItem("token")&&(t=!0);var a=A(),o=Object(r.useState)({loggedIn:t,rows:[],fetchError:!1}),i=Object(l.a)(o,2),c=i[0],p=i[1];Object(r.useEffect)((function(){var e=function(){var e=Object(C.a)(w.a.mark((function e(){var t,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"https://imedixbcr.iitkgp.ac.in/api/coviapp/get-all-patients",t=localStorage.getItem("token"),a={headers:{Authorization:"Bearer ".concat(t)}},h.a.get("https://imedixbcr.iitkgp.ac.in/api/coviapp/get-all-patients",a).then((function(e){return e.data})).then((function(e){var t=e.data;p({rows:t.sort(E)})})).catch((function(e){console.log("token is expired logging in again for getting jwt"),h.a.post("https://imedixbcr.iitkgp.ac.in/api/user/login",{username:localStorage.getItem("username"),password:localStorage.getItem("password")}).then((function(e){var t=e.data.jwtToken;localStorage.setItem("token",t);var a=localStorage.getItem("token"),r={headers:{Authorization:"Bearer ".concat(a)}};h.a.get("https://imedixbcr.iitkgp.ac.in/api/coviapp/get-all-patients",r).then((function(e){return e.data})).then((function(e){var t=e.data;p({rows:t.sort(E)})})).catch((function(e){console.log("error in fetching get-all-patients"),p({fetchError:!0})}))})).catch((function(e){console.log("error in logging in again from local-storage credentials"),p({fetchError:!0})}))}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e();var t=setInterval((function(){e()}),2e4);return function(){return clearInterval(t)}}),[]);if(!1===c.loggedIn)return Object(v.jsx)(s.a,{to:"/logout"});function u(){return c.fetchError?Object(v.jsx)(n.a.Fragment,{children:Object(v.jsx)("div",{className:a.root,children:Object(v.jsx)(z.a,{position:"static",style:{background:"#ffe6e6"},className:a.root,children:Object(v.jsx)(W.a,{children:Object(v.jsx)(F.a,{color:"error",variant:"h6",className:a.title,children:"Some error occured. Please Logout"})})})})}):Object(v.jsx)(v.Fragment,{})}return Object(v.jsxs)(n.a.Fragment,{children:[Object(v.jsx)(u,{}),Object(v.jsx)("div",{className:a.root,children:Object(v.jsx)(z.a,{position:"static",className:a.root,children:Object(v.jsxs)(W.a,{children:[Object(v.jsx)(F.a,{variant:"h6",className:a.title,children:"Welcome"}),Object(v.jsx)(d.a,{className:a.menuButton,onClick:function(){p({loggedIn:!1})},children:"Logout"})]})})}),Object(v.jsx)(I.a,{title:"CoviApp Dashboard",columns:[{title:"Name",field:"name"},{title:"Category",field:"selected_category"},{title:"Roll No/EC ",field:"ec_rollno"},{title:"Location",field:"isolation_address"},{title:"Temperature \xb0F",field:"fever",type:"numeric",filtering:!1},{title:"SpO2 %",field:"spo2",type:"numeric",customSort:function(e,t){return e.spo2-t.spo2},filtering:!1,cellStyle:function(e){return{backgroundColor:(t=e,t>=95?"white":t>=90?"orange":"red")};var t}},{title:"Pulse Rate",field:"pulse_rate",type:"numeric",filtering:!1},{title:"Condition",field:"patient_condition",filtering:!1},{title:"Last Updated",field:"entrytime",render:function(e){var t=new Date(e.entrytime);return _.a.format(t,"HH:MM DD/MM/YY")}}],data:c.rows,options:{filtering:!0,exportButton:!0,exportAllData:!0,pageSize:10,search:!0,sorting:!0,actionsColumnIndex:1,headerStyle:{fontSize:20},rowStyle:{fontSize:19}},actions:[function(t){return{icon:T.a,tooltip:"Click to monitor",onClick:function(){e.history.push({pathname:"../graphs/".concat(t.ec_rollno),state:t})}}}]}),Object(v.jsx)(B,{})]})},L=a(219),H=a(364),q=a(349),G=a(343),J=a(643),U=a(362),Y=a(350),Z=Object(M.a)((function(e){return{head:{backgroundColor:"#191970",color:e.palette.common.white,fontSize:20,fontWeight:"bold"},body:{fontSize:16}}}))(G.a),V=Object(M.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(Y.a);function K(e,t){return{name:e,details:t}}var Q=Object(O.a)({table:{width:"90vw",maxWidth:700,alignSelf:"center"}});function X(e){var t=Q(),a=[K("Name",(e=e.data).name),K("Roll No / EC Number",e.ec_rollno),K("Phone Number",e.phone),K("Category",e.selected_category),K("Parent's mobile number",e.parent_mobileno)];return Object(v.jsx)(J.a,{component:P.a,className:t.table,children:Object(v.jsxs)(H.a,{"aria-label":"customized table",children:[Object(v.jsx)(U.a,{children:Object(v.jsxs)(Y.a,{children:[Object(v.jsx)(Z,{children:"Patient details"}),Object(v.jsx)(Z,{align:"left"})]})}),Object(v.jsx)(q.a,{children:a.map((function(e){return Object(v.jsxs)(V,{children:[Object(v.jsx)(Z,{component:"th",scope:"row",children:e.name}),Object(v.jsx)(Z,{align:"left",children:e.details})]},e.name)}))})]})})}var $=function(e,t){return e.entryTimeDateObject<t.entryTimeDateObject?1:-1},ee=Object(O.a)({appbar:{backgroundColor:"#00C9BC",borderRadius:6,fontWeight:"bold"},root:{backgroundColor:"#00C9BC"},title:{flexGrow:1,fontSize:25,fontWeight:"bold"},graph:{display:"flex",flexDirection:"column"},indivgraph:{width:"90vw",maxWidth:1200,alignSelf:"center"},sep:{marginTop:40,marginBottom:40},newtable:{display:"flex",flexDirection:"column"}}),te=function(e){var t=!1,a=ee();localStorage.getItem("token")&&(t=!0);var n=Object(r.useState)({loggedIn:t,entryTime:[],entryTimeDateObject:[],spo2Data:[],tempData:[],pulseData:[],rows:[]}),o=Object(l.a)(n,2),i=o[0],c=o[1];if(Object(r.useEffect)((function(){var t=function(){var a=Object(C.a)(w.a.mark((function a(){var r,n,o,i,s,l,d,p,u,b,g,m,j,f,O,x;return w.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return"https://imedixbcr.iitkgp.ac.in/api/coviapp/get-patient-data",r=localStorage.getItem("token"),n=e.location.state.pat_id,o={patid:n},i={headers:{Authorization:"Bearer ".concat(r)}},a.prev=5,a.next=8,h.a.post("https://imedixbcr.iitkgp.ac.in/api/coviapp/get-patient-data",o,i);case 8:for(s=a.sent,l=s.data.data,d=l.map((function(e){var t=new Date(e.entrytime);return _.a.format(t,"HH:MM DD MMM")})),p=l.map((function(e){return new Date(e.entrytime)})),u=l.map((function(e){return e.spo2})),b=l.map((function(e){return e.fever})),g=l.map((function(e){return e.pulse_rate})),m=[],j=0;j<Math.min(b.length,u.length,p.length);j++)(f={}).temperature=b[j],f.spo2=u[j],f.entryTimeDateObject=p[j],f.entryTimeString=_.a.format(p[j],"HH:MM:SS"),f.pulse_rate=g[j],m.push(f);c({entryTime:d,entryTimeDateObject:p,spo2Data:u,tempData:b,rows:m,pulseData:g}),a.next=36;break;case 20:return a.prev=20,a.t0=a.catch(5),console.log("Logging in again!"),a.prev=23,a.next=26,h.a.post("https://imedixbcr.iitkgp.ac.in/api/user/login",{username:localStorage.getItem("username"),password:localStorage.getItem("password")});case 26:O=a.sent,x=O.data.jwtToken,localStorage.setItem("token",x),a.next=35;break;case 31:a.prev=31,a.t1=a.catch(23),console.log("Caught an error in re login!"),console.log(a.t1);case 35:t();case 36:case"end":return a.stop()}}),a,null,[[5,20],[23,31]])})));return function(){return a.apply(this,arguments)}}();t()}),[e.location.state]),!1===i.loggedIn)return Object(v.jsx)(s.a,{to:"/logout"});return Object(v.jsxs)(r.Fragment,{children:[Object(v.jsx)("div",{className:a.appbar,children:Object(v.jsx)(z.a,{position:"static",className:a.appbar,children:Object(v.jsx)(W.a,{children:Object(v.jsxs)(F.a,{variant:"h6",className:a.title,children:["Currently monitoring ",e.location.state.name]})})})}),Object(v.jsx)("div",{className:a.sep}),Object(v.jsx)("div",{className:a.newtable,children:Object(v.jsx)(X,{className:a.table,data:e.location.state})}),Object(v.jsx)("div",{className:a.sep}),Object(v.jsxs)("div",{className:a.graph,children:[Object(v.jsx)("div",{className:a.indivgraph,children:Object(v.jsx)(L.a,{data:{labels:i.entryTime,datasets:[{label:"Temperature",data:i.tempData,backgroundColor:"rgba(0, 0, 255, 0.3)",borderColor:"rgba(0, 0, 255, 1)",borderWidth:1}]},options:{plugins:{title:{display:!0,text:"Temperature v/s time",font:{size:20}}},scales:{y:{ticks:{callback:function(e){return"".concat(e).concat("\xb0"," F")}}}}}})}),Object(v.jsx)("div",{className:a.sep}),Object(v.jsx)("div",{className:a.indivgraph,children:Object(v.jsx)(L.a,{data:{labels:i.entryTime,datasets:[{label:"SpO2",data:i.spo2Data,backgroundColor:"rgba(255, 0, 0, 0.3)",borderColor:"rgba(255, 0, 0, 1)",borderWidth:1}]},options:{plugins:{title:{display:!0,text:"SpO2 v/s time",font:{size:20}}},scales:{x:{beginAtZero:!1}}}})}),Object(v.jsx)("div",{className:a.sep}),Object(v.jsx)("div",{className:a.indivgraph,children:Object(v.jsx)(L.a,{data:{labels:i.entryTime,datasets:[{label:"Pulse",data:i.pulseData,backgroundColor:"rgba(255, 0, 0, 0.3)",borderColor:"rgba(255, 0, 0, 1)",borderWidth:1}]},options:{plugins:{title:{display:!0,text:"Pulse rate v/s time",font:{size:20}}},scales:{x:{beginAtZero:!1}}}})}),Object(v.jsx)("div",{className:a.sep}),Object(v.jsx)("div",{className:a.indivgraph,children:Object(v.jsx)(I.a,{title:"DateWise Data",columns:[{title:"Entry Date",field:"entryTimeDateObject",type:"date",dateSetting:{format:"dd/MM/yyyy",locale:"en-GB"}},{title:"Entry Time",field:"entryTimeString",filtering:!1},{title:"Temperature \xb0F",field:"temperature",type:"numeric",filtering:!1},{title:"SpO2 %",field:"spo2",type:"numeric",filtering:!1,cellStyle:function(e){return{backgroundColor:(t=e,t>=95?"white":t>=90?"orange":"red")};var t}},{title:"Pulse Rate",field:"pulse_rate",type:"numeric",filtering:!1}],data:i.rows.sort($),options:{search:!1,filtering:!0,exportButton:!0,exportAllData:!0,headerStyle:{fontSize:20},rowStyle:{fontSize:19},sorting:!0}})}),Object(v.jsx)("div",{className:a.sep})]}),Object(v.jsx)(B,{})]})},ae=function(){return Object(v.jsx)("div",{children:Object(v.jsx)("h2",{children:" 404 Not Found! "})})},re=function(){return localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("password"),Object(v.jsx)(s.a,{to:"/"})},ne=function(){return Object(v.jsx)(c.a,{children:Object(v.jsxs)(s.d,{children:[Object(v.jsx)(s.b,{exact:!0,path:"/",component:S}),Object(v.jsx)(s.b,{exact:!0,path:"/logout",component:re}),Object(v.jsx)(s.b,{exact:!0,path:"/dashboard",component:R}),Object(v.jsx)(s.b,{exact:!0,path:"/graphs/:username",component:te}),Object(v.jsx)(s.b,{component:ae})]})})};i.a.render(Object(v.jsx)(n.a.StrictMode,{children:Object(v.jsx)(ne,{})}),document.getElementById("root"))}},[[609,1,2]]]);
//# sourceMappingURL=main.84d2017d.chunk.js.map