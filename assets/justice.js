/* Livret des peines — State of San Andreas, Guide de la justice V7 FA
   [article, catégorie(0-5), infraction, amende($|null), détention(min|null), procureur, bracelet, note, zone] */
var CATS = ["Infraction non pénale","Infraction mineure","Délit mineur","Délit","Crime","Crime majeur"];
var PEINES = [
["CR. 3101",0,"Absence d'immatriculation",2500,null,0,0,"",""],
["CR. 3102",0,"Installation de plaque illégale",1000,null,0,0,"",""],
["CR. 3103",0,"Installation de sirène ou klaxon illégal",500,null,0,0,"",""],
["CR. 3104",0,"Conduite sans feu",500,null,0,0,"",""],
["CR. 3105",0,"Circulation dans un véhicule endommagé",500,null,0,0,"",""],
["CR. 3106",0,"Abandon de véhicule",500,null,0,0,"",""],
["CR. 3201",0,"Excès de vitesse inférieur à 20 km/h",1000,null,0,0,"",""],
["CR. 3202",0,"Excès de vitesse de 20 à 40 km/h",1500,null,0,0,"",""],
["CR. 3203",0,"Excès de vitesse de 40 à 60 km/h",2500,null,0,0,"",""],
["CR. 3204",0,"Excès de vitesse supérieur à 60 km/h",5000,null,0,0,"Au bout de 3 arrestations : retrait (avec suspension) du permis et immobilisation du véhicule.",""],
["CR. 3301",0,"Entrave à la circulation",2500,null,0,0,"",""],
["CR. 3302",0,"Stationnement gênant",500,null,0,0,"",""],
["CR. 3303",0,"Franchissement ou chevauchement de ligne continue",500,null,0,0,"",""],
["CR. 3304",0,"Non-respect de panneau de signalisation",500,null,0,0,"",""],
["CR. 3305",0,"Dépassement dangereux",500,null,0,0,"",""],
["CR. 3306",0,"Circulation en sens interdit",500,null,0,0,"",""],
["CR. 3307",0,"Refus de priorité",500,null,0,0,"",""],
["CMC. 4101",0,"Absence d'immatriculation d'embarcation",2500,null,0,0,"",""],
["CMC. 4102",0,"Abandon d'embarcation",1500,null,0,0,"",""],
["CMC. 4103",0,"Entrave au trafic maritime",1500,null,0,0,"",""],
["CMC. 4104",0,"Non-respect des vitesses réglementaires (maritime)",2500,null,0,0,"",""],
["CAC. 4101",0,"Absence d'immatriculation d'aéronef",2500,null,0,0,"",""],
["CAC. 4102",0,"Stationnement interdit (aéronef)",2500,null,0,0,"",""],
["CAC. 4103",0,"Entrave au trafic aérien",5000,null,0,0,"",""],
["CAC. 4104",0,"Abandon d'aéronef",5000,null,0,0,"",""],
["CEnv. 4101",0,"Trouble au calme et à la tranquillité dans un espace protégé",1000,null,0,0,"",""],
["CEnv. 4102",0,"Abandon de détritus ou d'objet dans un espace protégé",1500,null,0,0,"",""],
["CEnv. 4103",0,"Non-respect d'un règlement intérieur d'un espace protégé",2000,null,0,0,"",""],
["CEnv. 4104",0,"Détérioration d'un espace protégé",5000,null,0,0,"",""],
["CEnv. 4201",0,"Chasse sans permis",5000,null,0,0,"Au bout de 3 arrestations : saisie de l'arme.",""],
["CEnv. 4202",0,"Non-respect des règles de sécurité pour la pratique de la chasse",5000,null,0,0,"",""],
["CEnv. 4203",0,"Pêche sans permis",5000,null,0,0,"",""],
["CP. 4201",1,"Exhibition sexuelle",2500,null,0,0,"",""],
["CP. 7401",1,"Mendicité",1000,null,0,0,"",""],
["CP. 7402",1,"Ivresse sur la voie publique",1500,null,0,0,"Placement en cellule de dégrisement.",""],
["CP. 7404",1,"Trouble à l'ordre public",5000,null,0,0,"",""],
["CC. 1501",1,"Non recensement et statut civique",2500,null,0,0,"","LS"],
["CP. 4101",2,"Non-assistance à personne en danger",5000,10,0,0,"",""],
["CP. 4103",2,"Violence",2500,15,1,0,"",""],
["CP. 4401",2,"Discrimination",10000,15,1,0,"",""],
["CP. 4402",2,"Harcèlement",10000,20,1,0,"",""],
["CP. 4407",2,"Harcèlement sexuel",25000,15,1,0,"","LS"],
["CP. 4404",2,"Injure",5000,10,0,0,"",""],
["CP. 4108",2,"Menace et intimidation",3000,10,0,0,"",""],
["CP. 5101",2,"Vol",3500,15,0,0,"",""],
["CP. 5108",2,"Dégradation de bien",5000,0,0,0,"",""],
["CP. 6102",2,"Exhibition d'arme",5000,10,0,0,"",""],
["CP. 6104",2,"Possession illégale de gilet pare-balle",5000,10,0,0,"",""],
["CP. 6107",2,"Détention illégale multiple d'armes légales",15000,20,0,0,"Suspension ou retrait du PPA ou du permis de chasse.",""],
["CP. 6108",2,"Usage d'une arme létale",7500,10,0,0,"","LS"],
["CP. 6109",2,"Usage abusif d'une arme à feu",7500,10,1,0,"","BC"],
["CP. 7101",2,"Refus d'obtempérer",2500,10,0,0,"",""],
["CP. 7102",2,"Refus d'identification",2500,10,0,0,"",""],
["CP. 7104",2,"Non-présentation à une convocation officielle",10000,10,0,0,"",""],
["CP. 7403",2,"Appel abusif aux services d'urgence",10000,10,0,0,"",""],
["CP. 7405",2,"Manifestation illégale",5000,10,0,0,"",""],
["CP. 8103",2,"Possession de produit stupéfiant",2500,10,0,0,"",""],
["CP. 8106",2,"Consommation de produit stupéfiant",2500,null,0,0,"Placement en cellule de dégrisement.",""],
["CP. 9101",2,"Possession d'argent non déclaré",0,10,0,0,"Saisie de la somme et retour sur présentation de justificatif de provenance.",""],
["CP. 9102",2,"Possession d'argent en espèces en quantité illégale",0,10,0,0,"Saisie de la somme et retour sur présentation de justificatif de provenance.",""],
["CP. 10101",2,"Conduite sans permis",5000,0,0,0,"Immobilisation du véhicule.",""],
["CP. 10105",2,"Circulation avec un véhicule faussement immatriculé",10000,10,0,0,"",""],
["CP. 10201",2,"Navigation sans permis",10000,0,0,0,"Immobilisation de l'embarcation.",""],
["CP. 11103",2,"Destruction de la faune",null,10,0,0,"Amende : 300 $ par unité.",""],
["CP. 11108",2,"Destruction de la flore",5000,15,1,0,"","BC"],
["CP. 11104",2,"Pêche ou chasse illégale d'une espèce protégée",10000,10,0,0,"",""],
["CP. 4102",3,"Mise en danger de la vie d'autrui",5000,15,0,0,"",""],
["CP. 4104",3,"Violence avec arme blanche",2500,15,1,0,"Saisie de l'arme.",""],
["CP. 4105",3,"Violence avec arme à feu",10000,15,1,0,"Saisie de l'arme.",""],
["CP. 4403",3,"Abus de faiblesse",10000,15,1,0,"",""],
["CP. 4405",3,"Racisme",15000,15,0,0,"","LS"],
["CP. 4406",3,"Diffamation",10000,10,0,0,"",""],
["CP. 5103",3,"Cambriolage",4000,15,0,0,"",""],
["CP. 5104",3,"Recel",10000,15,0,0,"",""],
["CP. 5105",3,"Extorsion",20000,15,1,0,"",""],
["CP. 5106",3,"Contrefaçon",20000,15,0,0,"",""],
["CP. 5107",3,"Violation de propriété privée",5000,10,0,0,"",""],
["CP. 6101",3,"Défaut de PPA",10000,30,0,0,"Saisie de l'arme.",""],
["CP. 6103.1",3,"Possession illégale d'arme blanche",7500,15,0,0,"Saisie de l'arme.",""],
["CP. 6103.2",3,"Possession illégale d'arme létale",15000,15,0,0,"Saisie de l'arme.",""],
["CP. 7103",3,"Délit de fuite",10000,20,0,0,"",""],
["CP. 7105",3,"Non-respect de contrôle judiciaire",5000,10,1,0,"",""],
["CP. 7201",3,"Obstruction à la justice",20000,20,1,0,"",""],
["CP. 7501",3,"Violation du devoir de réserve",15000,30,0,0,"",""],
["CP. 7502",3,"Violation du secret professionnel",30000,30,0,0,"",""],
["CP. 7302",3,"Entrave à l'intervention des services publics",10000,20,0,0,"",""],
["CP. 8104",3,"Vente de produit stupéfiant",2500,10,0,0,"",""],
["CP. 9103",3,"Fraude",20000,15,1,0,"",""],
["CP. 9201",3,"Abus de confiance",10000,15,1,0,"",""],
["CP. 9301",3,"Non-respect d'un délai de paiement (72 h)",null,15,1,0,"",""],
["CP. 9303",3,"Factures d'un service public impayées au-delà de 30 000 $",null,null,1,0,"Saisie des biens à hauteur des amendes impayées.",""],
["CP. 10102",3,"Conduite dangereuse",1000,0,0,0,"",""],
["CP. 10103",3,"Conduite sous emprise",1000,0,0,0,"Immobilisation du véhicule + placement en cellule de dégrisement.",""],
["CP. 10104",3,"Course illégale",2500,10,0,0,"Immobilisation du véhicule.",""],
["CP. 10202",3,"Navigation dangereuse",5000,10,0,0,"Immobilisation de l'embarcation.",""],
["CP. 10203",3,"Navigation en zone interdite",15000,30,0,0,"",""],
["CP. 10301",3,"Pilotage d'un aéronef sans licence",20000,15,0,0,"Immobilisation de l'aéronef.",""],
["CP. 10302",3,"Pilotage dangereux d'un aéronef",10000,10,0,0,"Retrait de la licence + immobilisation de l'aéronef.",""],
["CP. 10303",3,"Survol en aéronef d'une zone interdite",30000,30,0,0,"",""],
["CP. 11101",3,"Organisation de manifestation illégale dans un espace protégé",20000,15,0,0,"",""],
["CP. 11102",3,"Construction illégale dans un espace protégé",30000,30,0,0,"",""],
["CP. 11105",3,"Vente illégale d'une espèce protégée",20000,15,0,0,"",""],
["CP. 4106",4,"Acte de barbarie",80000,120,1,1,"",""],
["CP. 4107",4,"Torture",80000,120,1,1,"",""],
["CP. 4109",4,"Trafic d'organes",5000,15,0,0,"",""],
["CP. 4202",4,"Agression sexuelle",100000,120,1,1,"",""],
["CP. 4301",4,"Enlèvement et séquestration",30000,30,1,1,"",""],
["CP. 4302",4,"Prise d'otage sans rançon",25000,30,1,1,"Braquage Fleeca, Bijouterie, Human Labs, Train ou Yacht : Procureur non obligatoire si le détenu reconnaît les faits et accepte la peine nominale.",""],
["CP. 4303",4,"Prise d'otage avec rançon",50000,60,1,1,"",""],
["CP. 4502",4,"Homicide involontaire",30000,60,1,1,"",""],
["CP. 4504",4,"Tentative d'homicide",50000,60,1,1,"",""],
["CP. 5102",4,"Braquage (conteneur, supérette, Ammu-Nation, magasin)",3500,20,0,0,"",""],
["CP. 5102",4,"Braquage (train)",60000,60,1,1,"Procureur non obligatoire si le détenu reconnaît les faits et accepte la peine nominale.",""],
["CP. 5102",4,"Braquage (bijouterie, yacht)",50000,60,1,1,"Procureur non obligatoire si le détenu reconnaît les faits et accepte la peine nominale.",""],
["CP. 5102",4,"Braquage (Human Labs, entreprise patronale)",50000,60,1,1,"Human Labs uniquement : Procureur non obligatoire si le détenu reconnaît les faits et accepte la peine nominale.",""],
["CP. 5102",4,"Braquage (Fleeca Bank, convoi des services publics)",100000,60,1,1,"Fleeca Bank uniquement : Procureur non obligatoire si le détenu reconnaît les faits et accepte la peine nominale.",""],
["CP. 5102",4,"Braquage (Pacific Bank, Central Bank)",150000,120,0,1,"Tribunal.",""],
["CP. 7106",4,"Évasion",100000,120,1,1,"",""],
["CP. 7202",4,"Faux ou usage de faux",30000,30,1,1,"",""],
["CP. 7203",4,"Parjure",50000,60,1,1,"",""],
["CP. 7204",4,"Conspiration",100000,60,1,1,"",""],
["CP. 7301",4,"Usurpation d'identité ou de fonction",100000,60,1,1,"",""],
["CP. 7303",4,"Corruption",25000,30,1,1,"",""],
["CP. 7304",4,"Fraude électorale",50000,30,1,1,"",""],
["CP. 7306",4,"Outrage à magistrat",10000,15,1,0,"",""],
["CP. 8105",4,"Trafic de produit stupéfiant",30000,30,1,1,"",""],
["CP. 9104",4,"Évasion fiscale",100000,60,1,1,"",""],
["CP. 9202",4,"Abus de biens sociaux",50000,30,1,1,"",""],
["CP. 9203",4,"Détournement de fonds",null,60,1,1,"",""],
["CP. 11106",4,"Trafic d'espèce protégée",100000,60,1,1,"",""],
["CP. 4204",5,"Proxénétisme",150000,120,0,1,"Tribunal.","LS"],
["CP. 4203",5,"Viol",150000,120,0,1,"Tribunal.",""],
["CP. 4501",5,"Homicide",150000,120,0,1,"Tribunal.",""],
["CP. 4503",5,"Assassinat",200000,120,0,1,"Tribunal.",""],
["CP. 6105",5,"Trafic d'armes",100000,90,0,1,"Tribunal.",""],
["CP. 7305",5,"Acte de terrorisme",250000,90,0,1,"Tribunal.",""],
["CP. 9105",5,"Blanchiment de capitaux",null,90,0,1,"Tribunal.",""],
["CP. 11107",5,"Écocide",175000,90,0,1,"Tribunal.",""]
];


(function(){
  function $(id){return document.getElementById(id)}
  function money(v){return v==null?'—':v.toLocaleString('fr-FR').replace(/ | /g,' ')+' $'}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var ZONES={LS:'Los Santos',BC:'Blaine County'};
  function toast(m){var t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(function(){t.classList.remove('on')},1700)}
  function copyText(txt,label){
    var ok=function(){toast('COPIÉ · '+label)};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,function(){fb();ok()})}else{fb();ok()}
    function fb(){var a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove()}
  }

  if($('cp-search')){
  /* ---------- Recherche + liste déroulante des chefs ---------- */
  function norm(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
  var inp=$('cp-search'), list=$('cp-list'), active=-1, shown=[];
  function hl(text,q){
    if(!q) return esc(text);
    var n=norm(text), i=n.indexOf(q);
    if(i<0) return esc(text);
    return esc(text.slice(0,i))+'<mark>'+esc(text.slice(i,i+q.length))+'</mark>'+esc(text.slice(i+q.length));
  }
  function openList(){
    var q=norm(inp.value.trim()), html='', grpDone={}; shown=[];
    var words=q.split(/\s+/).filter(Boolean);
    PEINES.forEach(function(p,i){
      var hay=norm(p[0]+' '+p[2]+' '+CATS[p[1]]+' '+(p[8]?ZONES[p[8]]:''));
      if(words.length&&!words.every(function(w){return hay.indexOf(w)>-1})) return;
      if(!grpDone[p[1]]){grpDone[p[1]]=1;html+='<li class="grp cat-'+p[1]+'" role="presentation">'+p[1]+' · '+CATS[p[1]]+'</li>'}
      var meta=[p[3]==null?(p[7].indexOf('300')>-1?'300 $/u':'À fixer'):money(p[3])];
      if(p[4]) meta.push(p[4]+' min');
      html+='<li class="opt" role="option" id="opt-'+shown.length+'" data-i="'+i+'"><span class="a">'+hl(p[0],words[0]||'')+'</span><span>'+hl(p[2],words[0]||'')+(p[8]?'<span class="zone">'+p[8]+'</span>':'')+'</span><span class="m">'+meta.join(' · ')+'</span></li>';
      shown.push(i);
    });
    if(!shown.length) html='<li class="none" role="presentation">Aucune infraction ne correspond.</li>';
    list.innerHTML=html; list.hidden=false; inp.setAttribute('aria-expanded','true');
    active=shown.length&&words.length?0:-1; paint();
  }
  function closeList(){list.hidden=true;inp.setAttribute('aria-expanded','false');active=-1;inp.removeAttribute('aria-activedescendant')}
  function paint(){
    [].forEach.call(list.querySelectorAll('.opt'),function(li,k){li.classList.toggle('on',k===active);li.setAttribute('aria-selected',k===active?'true':'false')});
    var cur=list.querySelector('#opt-'+active);
    if(cur){inp.setAttribute('aria-activedescendant',cur.id);cur.scrollIntoView({block:'nearest'})}
  }
  function pick(i){rows.push({i:i,ag:false,co:false});inp.value='';closeList();render();toast('AJOUTÉ · '+PEINES[i][0]);inp.focus()}
  inp.addEventListener('input',openList);
  inp.addEventListener('focus',function(){openList()});
  inp.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'){e.preventDefault();if(list.hidden)openList();active=Math.min(active+1,shown.length-1);paint()}
    else if(e.key==='ArrowUp'){e.preventDefault();active=Math.max(active-1,0);paint()}
    else if(e.key==='Enter'){e.preventDefault();if(active>=0&&shown[active]!=null)pick(shown[active]);else if(shown.length===1)pick(shown[0])}
    else if(e.key==='Escape'){if(!list.hidden){e.stopPropagation();closeList()}}
  });
  list.addEventListener('mousedown',function(e){var li=e.target.closest('.opt');if(li){e.preventDefault();pick(+li.dataset.i)}});
  $('cp-toggle').addEventListener('click',function(){if(list.hidden){inp.focus();openList()}else closeList()});
  document.addEventListener('click',function(e){if(!e.target.closest('.combo'))closeList()});

  /* ---------- Comparution ---------- */
  var rows=[]; var level=3;
  var LEVELS=[
    {k:'MIN 3',f:.25,c:'min',who:'Circonstances atténuantes.'},
    {k:'MIN 2',f:.5,c:'min',who:'Circonstances atténuantes.'},
    {k:'MIN 1',f:.75,c:'min',who:'Circonstances atténuantes.'},
    {k:'NOMINALE',f:1,c:'nom',who:'Peine(s) inscrite(s) au Code pénal.'},
    {k:'MAX 1',f:1.25,c:'max',who:'Applicable par l’<b>État-Major</b>, le <b>Procureur</b> ou le <b>Juge</b>.'},
    {k:'MAX 2',f:1.5,c:'max',who:'Applicable par le <b>Procureur</b> ou le <b>Juge</b>.'},
    {k:'MAX 3',f:2,c:'max',who:'Applicable par le <b>Juge</b> uniquement.'}
  ];
  var lvBox=$('cp-levels');
  LEVELS.forEach(function(l,i){
    var b=document.createElement('button');b.type='button';b.className=l.c;b.setAttribute('role','radio');
    b.innerHTML=l.k+'<small>×'+String(l.f).replace('.',',')+'</small>';b.setAttribute('aria-label',l.k);
    b.addEventListener('click',function(){level=i;fineTouched=false;jailTouched=false;paintLevels();render()});lvBox.appendChild(b);
  });
  function paintLevels(){
    [].forEach.call(lvBox.children,function(b,i){b.setAttribute('aria-checked',i===level?'true':'false')});
    $('cp-who').innerHTML='<b>'+LEVELS[level].k+'</b> — '+LEVELS[level].who+' Coefficient <b>×'+String(LEVELS[level].f).replace('.',',')+'</b> appliqué au total nominal (amende et détention).';
  }

  var fineTouched=false, jailTouched=false;
  $('cp-fine-k').addEventListener('input',function(){fineTouched=true});
  $('cp-jail-k').addEventListener('input',function(){jailTouched=true});

  function add(){
    if(list.hidden||!shown.length){inp.focus();openList();toast('TAPE OU CHOISIS UNE INFRACTION');return}
    if(active>=0) pick(shown[active]); else if(shown.length===1) pick(shown[0]); else {inp.focus();toast('CHOISIS DANS LA LISTE')}
  }
  $('cp-add').addEventListener('click',add);

  function render(){
    var body=$('cp-rows'); body.innerHTML='';
    $('cp-empty').style.display=rows.length?'none':'';
    var fine=0, jail=0, unknownFine=false, bracelet=false, proc=false, tribunal=false, notes=[], zones={};
    rows.forEach(function(r,idx){
      var p=PEINES[r.i];
      if(p[3]==null) unknownFine=true; else fine+=p[3];
      if(p[4]&&p[4]>jail) jail=p[4];
      if(p[5]) proc=true; if(p[6]) bracelet=true;
      if(/Tribunal/.test(p[7])) tribunal=true; else if(p[7]) notes.push(p[2]+' : '+p[7]);
      if(p[8]) zones[p[8]]=1;
      var tr=document.createElement('tr');
      tr.innerHTML='<td><span class="art">'+esc(p[0])+'</span><br><span class="cat cat-'+p[1]+'">'+CATS[p[1]]+'</span></td>'+
        '<td>'+esc(p[2])+(p[8]?'<span class="zone">'+p[8]+'</span>':'')+'</td>'+
        '<td class="c"><input type="checkbox" aria-label="Aggravante"'+(r.ag?' checked':'')+'></td>'+
        '<td class="c"><input type="checkbox" aria-label="Complicité"'+(r.co?' checked':'')+'></td>'+
        '<td class="r num">'+(p[3]==null?(p[7].indexOf('300')>-1?'300 $/u':'À fixer'):money(p[3]))+'</td>'+
        '<td class="r num">'+(p[4]?p[4]+' min':'—')+'</td>'+
        '<td class="c"><button class="del" type="button" aria-label="Retirer '+esc(p[2])+'">×</button></td>';
      var cb=tr.querySelectorAll('input');
      cb[0].addEventListener('change',function(){r.ag=this.checked;render()});
      cb[1].addEventListener('change',function(){r.co=this.checked;render()});
      tr.querySelector('.del').addEventListener('click',function(){rows.splice(idx,1);render()});
      body.appendChild(tr);
    });
    $('cp-fine').textContent=money(fine)+(unknownFine?' +':'');
    $('cp-jail').textContent=jail+' min';
    var F=LEVELS[level].f;
    if(!fineTouched) $('cp-fine-k').value=Math.round(fine*F);
    if(!jailTouched) $('cp-jail-k').value=Math.round(jail*F);
    var f=[];
    if(!rows.length) f.push(['ok','En attente','Ajoute les chefs d’inculpation pour calculer la peine.']);
    else{
      if(tribunal) f.push(['red','Tribunal','Au moins un chef relève du Tribunal.']);
      if(proc) f.push(['amber','Procureur requis','Au moins un chef nécessite l’intervention d’un Procureur.']);
      if(bracelet) f.push(['blue','Bracelet électronique','Au moins un chef prévoit le bracelet électronique.']);
      if(rows.some(function(r){return r.ag})) f.push(['red','Circonstance aggravante','Cochée sur au moins un chef.']);
      if(rows.some(function(r){return r.co})) f.push(['amber','Complicité','Cochée sur au moins un chef.']);
      Object.keys(zones).forEach(function(z){f.push(['blue','Zone','Chef applicable uniquement : '+ZONES[z]+'.'])});
      if(unknownFine) f.push(['amber','Amende à fixer','Un chef n’a pas de montant fixe au livret.']);
      notes.forEach(function(n){f.push(['ok','Autre sanction',n])});
      if(f.length===0) f.push(['ok','Comparution simple','Aucun Procureur ni bracelet requis.']);
    }
    $('cp-flags').innerHTML=f.map(function(x){return '<div class="flag '+x[0]+'"><div><b>'+x[1]+'</b>'+esc(x[2])+'</div></div>'}).join('');
  }

  function stamp(){
    var n=new Date();
    var s=n.toLocaleDateString('fr-FR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
    s=s.replace(/(^|\s)([a-zà-ÿ])/g,function(m,a,b){return a+b.toUpperCase()});
    $('cp-stamp').textContent='Fait le '+s+' à '+n.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})+' · Département de la Justice de San Andreas';
  }
  stamp(); setInterval(stamp,30000);

  $('cp-copy').addEventListener('click',function(){
    if(!rows.length){toast('AUCUN CHEF AJOUTÉ');return}
    var L=[];
    L.push('COMPARUTION IMMÉDIATE');
    L.push($('cp-stamp').textContent);
    L.push('Service : '+$('cp-service').value+' | Agent : '+($('cp-agent').value||'—')+' | '+$('cp-avocat').value);
    L.push('Prévenu : '+(($('cp-nom').value+' '+$('cp-prenom').value).trim()||'—'));
    L.push('');
    L.push('Chef(s) d’inculpation :');
    rows.forEach(function(r){var p=PEINES[r.i];
      L.push('- '+p[0]+' · '+p[2]+' ('+CATS[p[1]]+') — '+(p[3]==null?'à fixer':money(p[3]))+' / '+(p[4]?p[4]+' min':'—')+(r.ag?' [AGGRAVANTE]':'')+(r.co?' [COMPLICITÉ]':''));
    });
    L.push('');
    L.push('Niveau de sanction : '+LEVELS[level].k+' (×'+String(LEVELS[level].f).replace('.',',')+')');
    L.push('Total nominal : '+$('cp-fine').textContent+' · '+$('cp-jail').textContent);
    L.push('PEINE RETENUE : '+money(+$('cp-fine-k').value||0)+' · '+(+$('cp-jail-k').value||0)+' min');
    var fl=[].map.call(document.querySelectorAll('#cp-flags .flag'),function(e){return e.innerText.replace(/\n/,' : ')});
    if(fl.length){L.push('');L.push('Notes :');fl.forEach(function(x){L.push('- '+x)})}
    copyText(L.join('\n'),'FICHE DE COMPARUTION');
  });
  $('cp-reset').addEventListener('click',function(){
    rows=[];level=3;fineTouched=false;jailTouched=false;
    ['cp-agent','cp-nom','cp-prenom'].forEach(function(id){$(id).value=''});
    paintLevels();render();toast('FICHE RÉINITIALISÉE');
  });
  paintLevels(); render();

  }
  if($('lv-body')){
  /* ---------- Livret des peines ---------- */
  var body=$('lv-body'), activeCat=-1;
  PEINES.forEach(function(p){
    var tr=document.createElement('tr');tr.className='pen-row';tr.dataset.cat=p[1];
    tr.innerHTML='<td class="art">'+esc(p[0])+'</td><td>'+esc(p[2])+(p[8]?'<span class="zone">'+p[8]+'</span>':'')+'</td>'+
      '<td><span class="cat cat-'+p[1]+'">'+CATS[p[1]]+'</span></td>'+
      '<td class="r num">'+(p[3]==null?'—':money(p[3]))+'</td><td class="r num">'+(p[4]?p[4]+' min':'—')+'</td>'+
      '<td class="c">'+(p[5]?'<span class="yes">OUI</span>':'<span class="no">non</span>')+'</td>'+
      '<td class="c">'+(p[6]?'<span class="yes">OUI</span>':'<span class="no">non</span>')+'</td>'+
      '<td class="n">'+esc(p[7])+'</td>';
    body.appendChild(tr);
  });
  var chips=$('lv-chips');
  ['Tout'].concat(CATS).forEach(function(c,i){
    var b=document.createElement('button');b.type='button';b.textContent=c;b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){activeCat=i-1;[].forEach.call(chips.children,function(x,j){x.setAttribute('aria-pressed',j===i?'true':'false')});filterLivret()});
    chips.appendChild(b);
  });
  window.filterLivret=function(){
    var qe=document.getElementById('q'), q=(qe&&qe.value||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim(), n=0;
    [].forEach.call(body.children,function(tr){
      var ok=(activeCat<0||+tr.dataset.cat===activeCat)&&(!q||tr.textContent.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().indexOf(q)>-1);
      tr.classList.toggle('hidden',!ok); if(ok)n++;
    });
    $('lv-count').textContent=n+' INFRACTION'+(n>1?'S':'');
    return n;
  };
  filterLivret();
  }
})();
