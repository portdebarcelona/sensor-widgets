define("meteo",["i18n","SensorWidget","locale-date","bootstrap"],function(e,r,t){"use strict";t.utc(!1),t.locale("es"),e.setLang("ca");var o={service:function(){return"http://sensors.portdebarcelona.cat/sos/json"},offering:function(e){return"http://sensors.portdebarcelona.cat/def/weather/offerings#"+e},feature:function(e){return"http://sensors.portdebarcelona.cat/def/weather/features#"+e},property:function(e){return"http://sensors.portdebarcelona.cat/def/weather/properties#"+e}},n=new Date,i=new Date(n.getTime()-72e5),a=new Date(n.getTime()-108e5),s=new Date(n.getTime()-612e5),p=new Date(n.getTime()-864e5),f=$(".active a").text();switch(f){case"Sirena":new r("compass",{service:o.service(),offering:o.offering("1m"),feature:o.feature("02"),property:o.property("31"),refresh_interval:15},document.querySelector(".sirena .compass")),new r("thermometer",{service:o.service(),offering:o.offering("1m"),feature:o.feature("02"),property:o.property("32"),refresh_interval:15},document.querySelector(".sirena .meteo-thermometer")),new r("timechart",{title:"Velocitat Vent",service:o.service(),offering:o.offering("10m"),features:[o.feature("02")],properties:[o.property("30M"),o.property("30")],time_start:p.toISOString().substring(0,19)+"Z",time_end:n.toISOString().substring(0,19)+"Z"},document.querySelector(".sirena .timechart")),new r("windrose",{title:"Rosa vents últimes 3h",subtitle:"Sirena, mostres minutals",service:o.service(),offering:o.offering("1m"),feature:o.feature("02"),properties:[o.property("30"),o.property("31")],time_start:a.toISOString().substring(0,19)+"Z",time_end:n.toISOString().substring(0,19)+"Z",refresh_interval:120},document.querySelector(".sirena .windrose")),new r("table",{title:"Taula de dades",service:o.service(),offering:o.offering("30m"),feature:o.feature("02"),properties:[o.property("30"),o.property("30M"),o.property("31"),o.property("32"),o.property("33"),o.property("35"),o.property("36"),o.property("34")],time_start:s.toISOString().substring(0,19)+"Z",time_end:n.toISOString().substring(0,19)+"Z"},document.querySelector(".sirena .tablex"));break;case"XMVQA":new r("compass",{title:"Sirena",service:o.service(),offering:o.offering("1m"),feature:o.feature("02"),property:o.property("31"),refresh_interval:15},document.querySelector(".xmvqa .left .compass")),new r("panel",{title:"Dades minutals",service:o.service(),offering:o.offering("1m"),feature:o.feature("02"),properties:[o.property("30"),o.property("31"),o.property("32"),o.property("33"),o.property("34"),o.property("35"),o.property("36")],refresh_interval:15},document.querySelector(".xmvqa .left .panel-10m")),new r("timechart",{title:"Velocitat Vent",service:o.service(),offering:o.offering("10m"),features:[o.feature("02")],properties:[o.property("30")],time_start:i.toISOString().substring(0,19)+"Z",time_end:n.toISOString().substring(0,19)+"Z"},document.querySelector(".xmvqa .left .timechart")),new r("panel",{title:"Darrers valors 30-minutals",service:o.service(),offering:o.offering("30m"),feature:o.feature("02"),properties:[o.property("30"),o.property("31"),o.property("32"),o.property("33"),o.property("34"),o.property("35"),o.property("36")],refresh_interval:120},document.querySelector(".xmvqa .left .panel-30m"));var l={"01":"Dispensari",P4:"Dic Sud","03":"Adossat",P6:"Contradic",P3:"Unitat Mobil",P5:"Dàrsena Sud B",10:"ZAL2"};for(var c in l)new r("compass",{title:l[c],service:o.service(),offering:o.offering("1m"),feature:o.feature(c),property:o.property("31"),refresh_interval:15},document.querySelector(".xmvqa .x"+c+" .compass")),new r("panel",{title:"Dades minutals",service:o.service(),offering:o.offering("1m"),feature:o.feature(c),properties:[o.property("30"),o.property("31"),o.property("32"),o.property("33"),o.property("34"),o.property("35"),o.property("36")],refresh_interval:15},document.querySelector(".xmvqa .x"+c+" .panel"));break;case"Torre Control":new r("map",{service:o.service(),offering:o.offering("30m"),features:[o.feature("P4")],properties:[],permanent_tooltips:!0,max_initial_zoom:12},document.querySelector(".torrecontrol .p4 .map")),new r("compass",{service:o.service(),offering:o.offering("1m"),feature:o.feature("P4"),property:o.property("31"),refresh_interval:15},document.querySelector(".torrecontrol .p4 .compass")),new r("panel",{title:"Dades minutals",service:o.service(),offering:o.offering("1m"),feature:o.feature("P4"),properties:[o.property("31"),o.property("30")],refresh_interval:15},document.querySelector(".torrecontrol .p4 .panel-10m")),new r("panel",{title:"Dades 30-minutals",service:o.service(),offering:o.offering("30m"),feature:o.feature("P4"),properties:[o.property("31"),o.property("30")],refresh_interval:120},document.querySelector(".torrecontrol .p4 .panel-30m")),new r("map",{service:o.service(),offering:o.offering("30m"),features:[o.feature("02")],properties:[],permanent_tooltips:!0,max_initial_zoom:12},document.querySelector(".torrecontrol .x02 .map")),new r("compass",{service:o.service(),offering:o.offering("1m"),feature:o.feature("02"),property:o.property("31"),refresh_interval:120},document.querySelector(".torrecontrol .x02 .compass")),new r("panel",{title:"Dades minutals",service:o.service(),offering:o.offering("1m"),feature:o.feature("02"),properties:[o.property("31"),o.property("30")],refresh_interval:15},document.querySelector(".torrecontrol .x02 .panel-10m")),new r("panel",{title:"Dades 30-minutals",service:o.service(),offering:o.offering("30m"),feature:o.feature("02"),properties:[o.property("31"),o.property("30")],refresh_interval:120},document.querySelector(".torrecontrol .x02 .panel-30m")),new r("map",{service:o.service(),offering:o.offering("30m"),features:[o.feature("03")],properties:[],permanent_tooltips:!0,max_initial_zoom:12},document.querySelector(".torrecontrol .x03 .map")),new r("compass",{service:o.service(),offering:o.offering("1m"),feature:o.feature("03"),property:o.property("31"),refresh_interval:15},document.querySelector(".torrecontrol .x03 .compass")),new r("panel",{title:"Dades minutals",service:o.service(),offering:o.offering("1m"),feature:o.feature("03"),properties:[o.property("31"),o.property("30")],refresh_interval:15},document.querySelector(".torrecontrol .x03 .panel-10m")),new r("panel",{title:"Dades 30-minutals",service:o.service(),offering:o.offering("30m"),feature:o.feature("03"),properties:[o.property("31"),o.property("30")],refresh_interval:120},document.querySelector(".torrecontrol .x03 .panel-30m"));break;case"Data Browser":var u=["01","02","03","10","P1","P3","P4","P5","P6","P7"],m=["01 - Dispensari","02 - Sirena","03 - Adossat","10 - ZAL2","P1 - ESCU","P3 - Unitat Mobil","P4 - Dic Sud","P5 - Dàrsena sud B","P6 - Contradic","P7 - Torre Control"],v=["1m","10m","30m"],y=["Minutals","10 minutals","30 minutals"],d=$("#item-template").html(),g="";for(var h in u){var S=d.replace(/\{\{id}}/g,u[h]);S=S.replace(/\{\{title}}/g,m[h]),g+=S}$(".databrowser").html(g),$(".panel-collapse").on("show.bs.collapse",function(){$(this).parent().removeClass("panel-default").addClass("panel-primary");for(var e in v){var t=this.id,n=v[e],i=y[e],a=$(this).find(".x"+n)[0];a.children.length||new r("panel",{title:i,service:o.service(),offering:o.offering(n),feature:o.feature(t),properties:[],refresh_interval:60},a)}}),$(".panel-collapse").on("hide.bs.collapse",function(){$(this).parent().removeClass("panel-primary").addClass("panel-default")}),$(".panel").hover(function(){$(this).removeClass("panel-default").addClass("panel-primary")},function(){$(this).find(".in").length||$(this).find(".collapsing").length||$(this).removeClass("panel-primary").addClass("panel-default")})}}),requirejs(["meteo"]);