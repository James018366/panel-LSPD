/* L.S.P.D · Tableau de bord — script commun à toutes les pages */
(function(){
  function $(id){return document.getElementById(id)}

  /* Écran de chargement : uniquement à la première ouverture de la session */
  var boot=$('boot');
  if(boot){
    var seen=false; try{seen=sessionStorage.getItem('lspd-boot')==='1'}catch(e){}
    if(seen){boot.remove()}
    else{
      try{sessionStorage.setItem('lspd-boot','1')}catch(e){}
      boot.style.display='flex';
      setTimeout(function(){boot.classList.add('out');setTimeout(function(){boot.remove()},800)},1800);
    }
  }

  /* Horloge */
  var tEl=$('time'), dEl=$('date');
  function tick(){var n=new Date();
    if(tEl) tEl.textContent=n.toLocaleTimeString('fr-FR');
    if(dEl) dEl.textContent=n.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});}
  tick(); setInterval(tick,1000);

  /* Toast + copie */
  var toast=$('toast');
  window.lspdToast=function(m){if(!toast)return;toast.textContent=m;toast.classList.add('on');clearTimeout(window.lspdToast._t);window.lspdToast._t=setTimeout(function(){toast.classList.remove('on')},1700)};
  window.lspdCopy=function(txt,label){
    var done=function(){lspdToast('COPIÉ · '+label)};
    function fb(){var a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove()}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,function(){fb();done()})}else{fb();done()}
  };
  document.querySelectorAll('.freq').forEach(function(b){b.addEventListener('click',function(){lspdCopy(b.dataset.copy,b.querySelector('.n').textContent.trim()+' '+b.dataset.copy)})});
  document.querySelectorAll('.rows li').forEach(function(li){li.addEventListener('click',function(){
    var c=li.querySelector('.c').textContent, d=li.querySelector('.d').childNodes[0].textContent.trim();
    lspdCopy(c+' — '+d,c)})});

  /* Recherche dans la page */
  var q=$('q');
  function norm(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
  if(q){
    q.addEventListener('input',function(){
      var v=norm(q.value.trim()), any=false;
      if(window.filterLivret){ any=filterLivret()>0; }
      document.querySelectorAll('.rows li, .unit, .freq, .proc-card, .tile').forEach(function(el){
        var hit=!v||norm(el.textContent).indexOf(v)>-1;
        el.style.display=hit?'':'none'; if(hit)any=true;
      });
      document.querySelectorAll('.panel').forEach(function(p){
        var items=p.querySelectorAll('.rows li, .unit, .freq');
        if(!items.length) return;
        var vis=[].some.call(items,function(i){return i.style.display!=='none'});
        p.style.display=vis?'':'none';
      });
      document.body.classList.toggle('noresults',!any);
    });
    document.addEventListener('keydown',function(e){
      var tag=document.activeElement.tagName;
      if(e.key==='/'&&tag!=='INPUT'&&tag!=='TEXTAREA'&&tag!=='SELECT'){e.preventDefault();q.focus()}
      if(e.key==='Escape'&&document.activeElement===q){q.value='';q.dispatchEvent(new Event('input'))}
    });
  }

  /* Apparition au défilement */
  if('IntersectionObserver' in window){
    var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}})},{threshold:.05});
    document.querySelectorAll('.reveal').forEach(function(s){rv.observe(s)});
  } else document.querySelectorAll('.reveal').forEach(function(s){s.classList.add('in')});

  /* Onglet actif visible dans la barre */
  var on=document.querySelector('nav.tabs a.on'); if(on&&on.scrollIntoView) on.scrollIntoView({block:'nearest',inline:'center'});

  /* Sélecteur de chefs d'inculpation (recherche + liste déroulante) */
  window.lspdPicker=function(pre,onPick,onFree){
    var inp=$(pre+'-search'), list=$(pre+'-list'), tog=$(pre+'-toggle'), active=-1, shown=[];
    var ZN={LS:'Los Santos',BC:'Blaine County'};
    function nm(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
    function es(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
    function money(v){return v.toLocaleString('fr-FR').replace(/\s/g,' ')+' $'}
    function hl(text,q){if(!q)return es(text);var i=nm(text).indexOf(q);if(i<0)return es(text);return es(text.slice(0,i))+'<mark>'+es(text.slice(i,i+q.length))+'</mark>'+es(text.slice(i+q.length))}
    function open(){
      var q=nm(inp.value.trim()), words=q.split(/\s+/).filter(Boolean), html='', g={}; shown=[];
      PEINES.forEach(function(p,i){
        var hay=nm(p[0]+' '+p[2]+' '+CATS[p[1]]+' '+(p[8]?ZN[p[8]]:''));
        if(words.length&&!words.every(function(w){return hay.indexOf(w)>-1}))return;
        if(!g[p[1]]){g[p[1]]=1;html+='<li class="grp cat-'+p[1]+'" role="presentation">'+p[1]+' · '+CATS[p[1]]+'</li>'}
        var meta=[p[3]==null?'À fixer':money(p[3])]; if(p[4])meta.push(p[4]+' min');
        html+='<li class="opt" role="option" id="'+pre+'-opt-'+shown.length+'" data-i="'+i+'"><span class="a">'+hl(p[0],words[0]||'')+'</span><span>'+hl(p[2],words[0]||'')+(p[8]?'<span class="zone">'+p[8]+'</span>':'')+'</span><span class="m">'+meta.join(' · ')+'</span></li>';
        shown.push(i);
      });
      if(!shown.length) html='<li class="none" role="presentation">Aucune infraction trouvée'+(onFree&&q?' — appuie sur Entrée pour l’ajouter telle quelle.':'.')+'</li>';
      list.innerHTML=html;list.hidden=false;inp.setAttribute('aria-expanded','true');
      active=shown.length&&words.length?0:-1;paint();
    }
    function close(){list.hidden=true;inp.setAttribute('aria-expanded','false');active=-1;inp.removeAttribute('aria-activedescendant')}
    function paint(){
      [].forEach.call(list.querySelectorAll('.opt'),function(li,k){li.classList.toggle('on',k===active);li.setAttribute('aria-selected',k===active?'true':'false')});
      var c=$(pre+'-opt-'+active); if(c){inp.setAttribute('aria-activedescendant',c.id);c.scrollIntoView({block:'nearest'})}
    }
    function pick(i){inp.value='';close();onPick(i);inp.focus()}
    inp.addEventListener('input',open);
    inp.addEventListener('focus',open);
    inp.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'){e.preventDefault();if(list.hidden)open();active=Math.min(active+1,shown.length-1);paint()}
      else if(e.key==='ArrowUp'){e.preventDefault();active=Math.max(active-1,0);paint()}
      else if(e.key==='Enter'){e.preventDefault();
        if(active>=0&&shown[active]!=null)pick(shown[active]);
        else if(shown.length===1)pick(shown[0]);
        else if(!shown.length&&onFree&&inp.value.trim()){onFree(inp.value.trim());inp.value='';close()}}
      else if(e.key==='Escape'&&!list.hidden){e.stopPropagation();close()}
    });
    list.addEventListener('mousedown',function(e){var li=e.target.closest('.opt');if(li){e.preventDefault();pick(+li.dataset.i)}});
    if(tog) tog.addEventListener('click',function(){if(list.hidden){inp.focus();open()}else close()});
    document.addEventListener('click',function(e){if(!inp.closest('.combo').contains(e.target))close()});
  };

  /* Droits Miranda */
  var out=$('script');
  if(out){
    var civ=$('m-civ'), nom=$('m-nom'), stamp=new Date(), charges=[];
    var chipBox=$('m-chips');
    function chargesText(){return charges.map(function(c){return c.n}).join(', ')}
    function paintChips(){
      chipBox.innerHTML='';
      charges.forEach(function(c,k){
        var s=document.createElement('span');s.className='mchip';
        s.innerHTML=(c.a?'<i></i>':'')+'<span></span><button type="button">×</button>';
        if(c.a) s.querySelector('i').textContent=c.a;
        s.querySelector('span').textContent=c.n;
        s.querySelector('button').setAttribute('aria-label','Retirer '+c.n);
        s.querySelector('button').addEventListener('click',function(){charges.splice(k,1);paintChips();render()});
        chipBox.appendChild(s);
      });
    }
    if(window.PEINES){
      lspdPicker('m',function(i){var p=PEINES[i];charges.push({a:p[0],n:p[2]});paintChips();render();lspdToast('AJOUTÉ · '+p[0])},
        function(txt){charges.push({a:'',n:txt});paintChips();render()});
    }
    function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
    function text(){
      var d=stamp.toLocaleDateString('fr-FR'), h=stamp.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}).replace(':','h');
      return [
        (civ.value||'Monsieur/Madame')+' '+(nom.value||'#########')+', nous sommes le '+d+', il est '+h+'.',
        'Vous êtes en état d’arrestation pour les faits suivants : '+(chargesText()||'X')+'.',
        '(Des faits pourront vous être ajoutés, modifiés ou supprimés lors de la procédure.)',
        '',
        'Vous avez le droit de garder le silence. Tout ce que vous direz pourra et sera retenu contre vous devant une cour de justice.',
        'Vous avez le droit à un avocat et d’avoir un avocat présent lors de votre interrogatoire.',
        'Si vous n’en avez pas les moyens, un avocat vous sera commis d’office.',
        'Durant chaque interrogatoire, vous pouvez décider à n’importe quel moment d’exercer vos droits, de ne répondre à aucune question et de ne faire aucune déposition.',
        'Durant votre incarcération, vous avez le droit de demander à voir un médecin et/ou de manger et boire.',
        '',
        '— Avez-vous bien compris les droits que je viens de vous lire ?',
        '— Voulez-vous exercer l’un de vos droits ?'
      ].join('\n');
    }
    function render(){
      var t=esc(text());
      [civ.value,nom.value].concat(charges.map(function(c){return c.n})).forEach(function(v){if(v){t=t.split(esc(v)).join('<mark>'+esc(v)+'</mark>')}});
      out.innerHTML=t;
    }
    [civ,nom].forEach(function(i){i.addEventListener('input',render)});
    $('m-copy').addEventListener('click',function(){lspdCopy(text(),'DROITS MIRANDA')});
    $('m-now').addEventListener('click',function(){stamp=new Date();render();lspdToast('DATE & HEURE ACTUALISÉES')});
    render();
  }
})();
