(() => {
'use strict';
const NS='http://www.w3.org/2000/svg', GRID=10, PAD=45, SIZE=710, STEP=(SIZE-PAD*2)/(GRID-1);
const COLORS=['#222222','#d94e4e','#e38b35','#e0bd35','#4d9761','#3c82c4','#6657b8','#c45a91'];
const line=(a,b,color='#222222',width=6)=>({from:a,to:b,color,width});
const p=(r,c)=>r*GRID+c;
const samples=[
 // すべて10×10の点に合わせ、線のつながりと完成形が見て分かるように設計
 {id:'house',name:'いえ',level:'かんたん',lines:[
  line(p(7,1),p(7,8)),line(p(7,1),p(4,1)),line(p(4,1),p(1,4)),line(p(1,4),p(4,8)),line(p(4,8),p(7,8)),
  line(p(4,4),p(7,4)),line(p(4,4),p(4,6)),line(p(4,6),p(5,6)),line(p(5,6),p(5,4)),line(p(5,4),p(4,4)),
  line(p(5,8),p(5,7),'#d94e4e'),line(p(5,7),p(6,7),'#d94e4e'),line(p(6,7),p(6,8),'#d94e4e')
 ]},
 {id:'star',name:'ほし',level:'かんたん',lines:[
  line(p(1,4),p(7,6),'#e0bd35',8),line(p(7,6),p(3,1),'#e0bd35',8),line(p(3,1),p(3,8),'#e0bd35',8),line(p(3,8),p(7,3),'#e0bd35',8),line(p(7,3),p(1,4),'#e0bd35',8)
 ]},
 {id:'tree',name:'き',level:'かんたん',lines:[
  line(p(6,4),p(9,4),'#8b5a34',9),line(p(9,4),p(9,5),'#8b5a34',9),line(p(9,5),p(6,5),'#8b5a34',9),
  line(p(6,5),p(6,4),'#8b5a34',9),
  line(p(6,4),p(6,2),'#4d9761',7),line(p(6,2),p(4,3),'#4d9761',7),line(p(4,3),p(2,3),'#4d9761',7),
  line(p(2,3),p(3,1),'#4d9761',7),line(p(3,1),p(5,1),'#4d9761',7),line(p(5,1),p(6,0),'#4d9761',7),
  line(p(6,0),p(8,2),'#4d9761',7),line(p(8,2),p(7,3),'#4d9761',7),line(p(7,3),p(8,4),'#4d9761',7),line(p(8,4),p(6,4),'#4d9761',7)
 ]},
 {id:'fish',name:'さかな',level:'かんたん',lines:[
  line(p(4,1),p(2,3),'#3c82c4',7),line(p(2,3),p(2,6),'#3c82c4',7),line(p(2,6),p(4,8),'#3c82c4',7),line(p(4,8),p(7,7),'#3c82c4',7),line(p(7,7),p(8,5),'#3c82c4',7),line(p(8,5),p(7,3),'#3c82c4',7),line(p(7,3),p(4,1),'#3c82c4',7),
  line(p(2,3),p(0,1),'#e38b35',7),line(p(0,1),p(0,7),'#e38b35',7),line(p(0,7),p(2,6),'#e38b35',7),
  line(p(4,2),p(4,3),'#222222',5)
 ]},
 {id:'flower',name:'はな',level:'ふつう',lines:[
  line(p(4,4),p(2,3),'#d94e4e',7),line(p(2,3),p(2,1),'#d94e4e',7),line(p(2,1),p(4,2),'#d94e4e',7),line(p(4,2),p(4,4),'#d94e4e',7),
  line(p(4,4),p(6,2),'#d94e4e',7),line(p(6,2),p(8,2),'#d94e4e',7),line(p(8,2),p(7,4),'#d94e4e',7),line(p(7,4),p(4,4),'#d94e4e',7),
  line(p(4,4),p(7,5),'#d94e4e',7),line(p(7,5),p(7,7),'#d94e4e',7),line(p(7,7),p(5,6),'#d94e4e',7),line(p(5,6),p(4,4),'#d94e4e',7),
  line(p(4,4),p(2,6),'#d94e4e',7),line(p(2,6),p(1,5),'#d94e4e',7),line(p(1,5),p(2,4),'#d94e4e',7),line(p(2,4),p(4,4),'#d94e4e',7),
  line(p(4,4),p(4,9),'#4d9761',6),line(p(4,7),p(2,6),'#4d9761',6),line(p(4,8),p(6,7),'#4d9761',6)
 ]},
 {id:'butterfly',name:'ちょうちょ',level:'ふつう',lines:[
  line(p(4,4),p(4,6),'#222222',5),line(p(4,6),p(5,7),'#222222',5),line(p(5,7),p(5,3),'#222222',5),line(p(5,3),p(4,4),'#222222',5),
  line(p(4,4),p(2,1),'#c45a91',7),line(p(2,1),p(0,2),'#c45a91',7),line(p(0,2),p(1,5),'#c45a91',7),line(p(1,5),p(4,5),'#c45a91',7),
  line(p(5,4),p(7,1),'#6657b8',7),line(p(7,1),p(9,2),'#6657b8',7),line(p(9,2),p(8,5),'#6657b8',7),line(p(8,5),p(5,5),'#6657b8',7),
  line(p(4,5),p(2,6),'#c45a91',7),line(p(2,6),p(3,8),'#c45a91',7),line(p(3,8),p(5,6),'#c45a91',7),
  line(p(5,5),p(7,6),'#6657b8',7),line(p(7,6),p(6,8),'#6657b8',7),line(p(6,8),p(5,6),'#6657b8',7)
 ]},
 {id:'heart',name:'ハート',level:'ふつう',lines:[
  line(p(4,8),p(2,6),'#d94e4e',9),line(p(2,6),p(1,4),'#d94e4e',9),line(p(1,4),p(1,2),'#d94e4e',9),line(p(1,2),p(2,1),'#d94e4e',9),line(p(2,1),p(4,3),'#d94e4e',9),
  line(p(4,3),p(6,1),'#d94e4e',9),line(p(6,1),p(7,2),'#d94e4e',9),line(p(7,2),p(7,4),'#d94e4e',9),line(p(7,4),p(6,6),'#d94e4e',9),line(p(6,6),p(4,8),'#d94e4e',9)
 ]},
 {id:'rocket',name:'ロケット',level:'ふつう',lines:[
  line(p(4,1),p(2,4),'#3c82c4',7),line(p(2,4),p(2,6),'#3c82c4',7),line(p(2,6),p(4,8),'#3c82c4',7),line(p(4,8),p(7,6),'#3c82c4',7),line(p(7,6),p(7,4),'#3c82c4',7),line(p(7,4),p(4,1),'#3c82c4',7),
  line(p(4,2),p(4,4),'#e38b35',6),line(p(4,4),p(5,5),'#e38b35',6),line(p(5,5),p(5,3),'#e38b35',6),line(p(5,3),p(4,2),'#e38b35',6),
  line(p(2,5),p(0,4),'#d94e4e',7),line(p(0,4),p(0,6),'#d94e4e',7),line(p(0,6),p(2,6),'#d94e4e',7),
  line(p(7,5),p(9,4),'#d94e4e',7),line(p(9,4),p(9,6),'#d94e4e',7),line(p(9,6),p(7,6),'#d94e4e',7)
 ]},
 {id:'snow',name:'ゆきのけっしょう',level:'ちょっとむずかしい',lines:[
  ...[[0,4],[2,7],[4,9],[7,7],[9,4],[7,1],[4,0],[2,1]].map(([r,c])=>line(p(4,4),p(r,c),'#3c82c4',4)),
  ...[[0,4],[2,7],[4,9],[7,7],[9,4],[7,1],[4,0],[2,1]].flatMap(([r,c])=>{const dr=Math.sign(4-r),dc=Math.sign(4-c);return [line(p(r,c),p(r+dr,c+dc),'#3c82c4',4)]})
 ]},
 {id:'geo',name:'ひろがるもよう',level:'ちょっとむずかしい',lines:[
  line(p(0,0),p(9,9),'#d94e4e',4),line(p(0,9),p(9,0),'#3c82c4',4),line(p(0,0),p(0,9),'#e0bd35',4),line(p(0,9),p(9,9),'#4d9761',4),line(p(9,9),p(9,0),'#6657b8',4),line(p(9,0),p(0,0),'#e38b35',4),
  line(p(0,4),p(4,9),'#c45a91',4),line(p(4,9),p(9,4),'#c45a91',4),line(p(9,4),p(4,0),'#c45a91',4),line(p(4,0),p(0,4),'#c45a91',4)
 ]}
];
const CUSTOM_KEY='tsunaide-art-custom-samples';
function readCustomSamples(){try{const data=JSON.parse(localStorage.getItem(CUSTOM_KEY)||'[]');return Array.isArray(data)?data.filter(validSample):[]}catch(_){return []}}
function validSample(s){return !!s&&typeof s.name==='string'&&Array.isArray(s.lines)&&s.lines.length>0&&s.lines.every(l=>Number.isInteger(l.from)&&Number.isInteger(l.to)&&l.from>=0&&l.from<100&&l.to>=0&&l.to<100&&l.from!==l.to&&typeof l.color==='string'&&Number.isFinite(Number(l.width)))}
function allSamples(){return [...samples,...readCustomSamples()]}
let state={mode:'trace',lines:[],background:'#ffffff',color:COLORS[0],width:6,tool:'draw',selected:null,showDots:true,undo:[],redo:[],sample:samples[0]};
let drag={active:false,start:null,moved:false,pointerId:null,preview:null,suppressClick:false};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function xy(i){return {x:PAD+(i%GRID)*STEP,y:PAD+Math.floor(i/GRID)*STEP}}
function key(l){return [Math.min(l.from,l.to),Math.max(l.from,l.to)].join('-')}
function snapshot(){return JSON.stringify({lines:state.lines,background:state.background})}
function commit(){state.undo.push(snapshot());if(state.undo.length>60)state.undo.shift();state.redo=[]}
function restore(raw){
  let x=JSON.parse(raw);
  state.lines=x.lines;
  state.background=x.background;
  $('#bgColor').value=x.background;
  state.selected=null;
  renderArt();
}
function svgPoint(svg,e){
  let pt=svg.createSVGPoint();
  pt.x=e.clientX;
  pt.y=e.clientY;
  let local=pt.matrixTransform(svg.getScreenCTM().inverse());
  return {x:local.x,y:local.y};
}
function nearestPoint(svg,e,maxDistance=44){
  let q=svgPoint(svg,e),best=null,bestDist=Infinity;
  for(let i=0;i<GRID*GRID;i++){
    let d=xy(i),dist=Math.hypot(q.x-d.x,q.y-d.y);
    if(dist<bestDist){bestDist=dist;best=i}
  }
  return bestDist<=maxDistance?best:null;
}
function makePreview(svg,start,point){
  if(!drag.preview){
    drag.preview=document.createElementNS(NS,'line');
    drag.preview.classList.add('drag-preview');
    svg.append(drag.preview);
  }
  let a=xy(start);
  drag.preview.setAttribute('x1',a.x);
  drag.preview.setAttribute('y1',a.y);
  drag.preview.setAttribute('x2',point.x);
  drag.preview.setAttribute('y2',point.y);
  drag.preview.setAttribute('stroke',state.color);
  drag.preview.setAttribute('stroke-width',state.width);
}
function clearDrag(svg){
  if(drag.preview){drag.preview.remove();drag.preview=null}
  if(svg&&drag.pointerId!==null){try{svg.releasePointerCapture(drag.pointerId)}catch(_){}}
  drag.active=false;
  drag.start=null;
  drag.moved=false;
  drag.pointerId=null;
}
function addLine(from,to){
  if(from===null||to===null||from===to)return;
  let next=line(from,to,state.color,state.width);
  if(!state.lines.some(l=>key(l)===key(next))){commit();state.lines.push(next)}
  state.selected=null;
  renderArt();
}
function startDrag(svg,e){
  if(state.tool!=='draw')return;
  let point=nearestPoint(svg,e,44);
  if(point===null)return;
  drag.active=true;
  drag.start=point;
  drag.moved=false;
  drag.pointerId=e.pointerId;
  try{svg.setPointerCapture(e.pointerId)}catch(_){}
}
function moveDrag(svg,e){
  if(!drag.active||drag.pointerId!==e.pointerId)return;
  let q=svgPoint(svg,e);
  if(Math.hypot(q.x-xy(drag.start).x,q.y-xy(drag.start).y)>7)drag.moved=true;
  makePreview(svg,drag.start,q);
}
function endDrag(svg,e){
  if(!drag.active||drag.pointerId!==e.pointerId)return;
  let end=nearestPoint(svg,e,44);
  let didMove=drag.moved;
  let start=drag.start;
  clearDrag(svg);
  if(end!==null&&end!==start&&didMove){
    addLine(start,end);
    return;
  }
  if(!didMove){
    pointClick(start);
    return;
  }
  state.selected=null;
  renderArt();
}
function svgFor(work,{interactive=false,dots=true}={}){
  let svg=document.createElementNS(NS,'svg');
  svg.setAttribute('viewBox','0 0 '+SIZE+' '+SIZE);
  svg.classList.add('board-svg');
  svg.style.background=work.background||'#fff';

  (work.lines||[]).forEach((l,idx)=>{
    let a=xy(l.from),b=xy(l.to);
    let el=document.createElementNS(NS,'line');
    Object.entries({x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:l.color,'stroke-width':l.width}).forEach(([k,v])=>el.setAttribute(k,v));
    el.classList.add('art-line');
    svg.append(el);

    if(interactive){
      let hit=document.createElementNS(NS,'line');
      Object.entries({x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:'transparent','stroke-width':Math.max(30,l.width+24)}).forEach(([k,v])=>hit.setAttribute(k,v));
      hit.classList.add('line-hit');
      hit.addEventListener('click',e=>{
        e.stopPropagation();
        if(state.tool==='erase'){
          commit();
          state.lines.splice(idx,1);
          state.selected=null;
          renderArt();
        }
      });
      svg.append(hit);
    }
  });

  if(dots)for(let i=0;i<GRID*GRID;i++){
    let q=xy(i),vis=document.createElementNS(NS,'circle');
    vis.setAttribute('cx',q.x);
    vis.setAttribute('cy',q.y);
    vis.setAttribute('r',state.selected===i&&interactive?11:7.5);
    vis.classList.add('dot','visible');
    if(state.selected===i&&interactive)vis.classList.add('selected');
    svg.append(vis);

    if(interactive){
      let hit=document.createElementNS(NS,'circle');
      hit.setAttribute('cx',q.x);
      hit.setAttribute('cy',q.y);
      hit.setAttribute('r',30);
      hit.classList.add('dot','hit');
      hit.dataset.point=i;
      svg.append(hit);
    }
  }

  if(interactive){
    svg.addEventListener('pointerdown',e=>startDrag(svg,e));
    svg.addEventListener('pointermove',e=>moveDrag(svg,e));
    svg.addEventListener('pointerup',e=>endDrag(svg,e));
    svg.addEventListener('pointercancel',e=>{
      if(drag.active&&drag.pointerId===e.pointerId){
        clearDrag(svg);
        state.selected=null;
        renderArt();
      }
    });
  }
  return svg;
}
function pointClick(i){
  if(state.tool!=='draw')return;
  if(state.selected===null){state.selected=i;renderArt();return}
  if(state.selected===i){state.selected=null;renderArt();return}
  addLine(state.selected,i);
}
function renderArt(){let host=$('#artBoard');host.replaceChildren(svgFor(state,{interactive:true,dots:state.showDots}));updateMatch()}
function renderSample(){let host=$('#sampleBoard');host.replaceChildren(svgFor({...state.sample,background:'#fff'},{dots:true}));$('#sampleName').textContent=state.sample.name;updateMatch()}
function updateMatch(){let n=state.lines.filter(l=>state.sample.lines.some(s=>key(s)===key(l))).length;$('#matchInfo').textContent=state.mode==='trace'?`お手本と同じ線　${n} / ${state.sample.lines.length}本`:''}
function setMode(mode){state.mode=mode;$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));$('#workspace').classList.toggle('free',mode==='free');$('#message').classList.toggle('free',mode==='free');$('#message').textContent=mode==='trace'?'点を2つタップして、線でつなごう。ドラッグでもかけるよ':mode==='arrange'?'お手本をヒントに、点を2つタップしてアレンジしよう':'点をつないで、自分だけの作品を自由につくろう';renderArt()}
function toast(t){let el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1700)}
function cardSvg(work,dots=false){return svgFor(work,{dots})}
function populateSamples(){let host=$('#sampleList');host.replaceChildren();allSamples().forEach(s=>{let c=document.createElement('button');c.className='card';c.type='button';c.append(cardSvg(s,false));c.insertAdjacentHTML('beforeend',`<strong></strong><small></small>`);c.querySelector('strong').textContent=s.name;c.querySelector('small').textContent=s.level||'ふつう';c.onclick=()=>{state.sample=s;renderSample();$('#sampleDialog').close();toast(`${s.name}をえらびました`)};host.append(c)})}
function renderTeacherSamples(){let host=$('#teacherSamplesList');host.replaceChildren();let custom=readCustomSamples();if(!custom.length){host.textContent='まだ登録したお手本はありません。';return}custom.forEach(s=>{let row=document.createElement('div');row.className='teacher-sample-row';let label=document.createElement('span');label.textContent=s.name+'（'+(s.level||'ふつう')+'）';let del=document.createElement('button');del.type='button';del.className='button secondary small';del.textContent='削除';del.onclick=()=>{if(!confirm('「'+s.name+'」を登録したお手本から削除しますか？'))return;let next=readCustomSamples().filter(x=>x.id!==s.id);localStorage.setItem(CUSTOM_KEY,JSON.stringify(next));if(state.sample.id===s.id){state.sample=samples[0];renderSample()}populateSamples();renderTeacherSamples();toast('お手本を削除しました')};row.append(label,del);host.append(row)})}
function registerCurrentSample(){let name=$('#teacherName').value.trim();if(!name){toast('お手本の名前を入力してください');$('#teacherName').focus();return}if(!state.lines.length){toast('先に点をつないで作品を作ってください');return}let custom=readCustomSamples();if(custom.length>=100){toast('登録できるお手本は100個までです');return}let item={id:'custom-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name,level:$('#teacherLevel').value,gridSize:GRID,background:state.background,lines:state.lines.map(l=>({from:l.from,to:l.to,color:l.color,width:l.width})),custom:true};custom.push(item);localStorage.setItem(CUSTOM_KEY,JSON.stringify(custom));state.sample=item;renderSample();populateSamples();renderTeacherSamples();toast('お手本に登録しました')}
function exportSamples(){let custom=readCustomSamples();if(!custom.length){toast('書き出すお手本がありません');return}let payload={format:'tsunaide-art-samples',version:1,samples:custom.map(({id,name,level,gridSize,background,lines})=>({id,name,level,gridSize,background,lines}))};let url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));let a=document.createElement('a');a.href=url;a.download='つないでアート_お手本.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('お手本データを書き出しました')}
function importSamplesFile(file){if(!file)return;let reader=new FileReader();reader.onload=()=>{try{let parsed=JSON.parse(reader.result);let incoming=Array.isArray(parsed)?parsed:parsed.samples;if(!Array.isArray(incoming))throw new Error('samples');let accepted=incoming.filter(validSample).map((s,i)=>({...s,id:'custom-'+Date.now()+'-'+i+'-'+Math.random().toString(36).slice(2,6),level:['かんたん','ふつう','ちょっとむずかしい'].includes(s.level)?s.level:'ふつう',custom:true}));if(!accepted.length)throw new Error('empty');let existing=readCustomSamples();let merged=[...existing,...accepted].slice(0,100);localStorage.setItem(CUSTOM_KEY,JSON.stringify(merged));populateSamples();renderTeacherSamples();toast(accepted.length+'個のお手本を読み込みました')}catch(_){toast('このファイルは読み込めません。お手本データのJSONか確認してください')}$('#importSamplesFile').value=''};reader.onerror=()=>toast('ファイルを読み込めませんでした');reader.readAsText(file)}

function saveWork(){let name=prompt('作品の名前を入力してください','わたしの作品');if(name===null)return;name=name.trim()||'名前のない作品';let works=JSON.parse(localStorage.getItem('tsunaide-art-works')||'[]');if(works.length>=20){toast('20こまで保存できます');return}works.unshift({id:Date.now(),name,createdAt:new Date().toISOString(),gridSize:GRID,background:state.background,lines:structuredClone(state.lines)});localStorage.setItem('tsunaide-art-works',JSON.stringify(works));toast('作品をほぞんしました')}
function gallery(){let works=JSON.parse(localStorage.getItem('tsunaide-art-works')||'[]'),host=$('#galleryList');host.innerHTML='';$('#emptyGallery').hidden=works.length>0;works.forEach(w=>{let c=document.createElement('div');c.className='card';c.append(cardSvg(w,false));let title=document.createElement('strong');title.textContent=w.name;c.append(title);let actions=document.createElement('div');actions.className='card-actions';let open=document.createElement('button');open.textContent='見る';open.onclick=()=>showPreview(w);let load=document.createElement('button');load.textContent='つづける';load.onclick=()=>{commit();state.lines=structuredClone(w.lines);state.background=w.background;$('#bgColor').value=w.background;renderArt();$('#galleryDialog').close();toast('作品をひらきました')};let del=document.createElement('button');del.textContent='けす';del.onclick=()=>{if(confirm('この作品をけしますか？')){works=works.filter(x=>x.id!==w.id);localStorage.setItem('tsunaide-art-works',JSON.stringify(works));gallery()}};actions.append(open,load,del);c.append(actions);host.append(c)});$('#galleryDialog').showModal()}
function showPreview(w={name:'わたしの作品',lines:state.lines,background:state.background}){$('#previewTitle').textContent=w.name;$('#previewBoard').replaceChildren(svgFor(w,{dots:false}));$('#previewDialog').showModal()}
function downloadPNG(){let svg=svgFor(state,{dots:false}),xml=new XMLSerializer().serializeToString(svg),blob=new Blob([xml],{type:'image/svg+xml'}),url=URL.createObjectURL(blob),img=new Image();img.onload=()=>{let c=document.createElement('canvas');c.width=c.height=1200;let x=c.getContext('2d');x.fillStyle=state.background;x.fillRect(0,0,1200,1200);x.drawImage(img,0,0,1200,1200);URL.revokeObjectURL(url);c.toBlob(b=>{let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='つないでアート.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},'image/png')};img.src=url}
function clearAll(){if(!state.lines.length)return;if(confirm('かいた線をぜんぶけしますか？')){commit();state.lines=[];state.selected=null;renderArt()}}
COLORS.forEach(c=>{let b=document.createElement('button');b.className='color-btn'+(c===state.color?' active':'');b.style.background=c;b.setAttribute('aria-label',`色 ${c}`);b.onclick=()=>{state.color=c;$$('.color-btn').forEach(x=>x.classList.toggle('active',x===b))};$('#colors').append(b)});
$$('.tab').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));$('#drawBtn').onclick=()=>{state.tool='draw';$('#drawBtn').classList.add('active');$('#eraseBtn').classList.remove('active')};$('#eraseBtn').onclick=()=>{state.tool='erase';state.selected=null;$('#eraseBtn').classList.add('active');$('#drawBtn').classList.remove('active');renderArt()};
$$('.width-btn').forEach(b=>b.onclick=()=>{state.width=+b.dataset.width;$$('.width-btn').forEach(x=>x.classList.toggle('active',x===b))});
$('#undoBtn').onclick=()=>{if(state.undo.length){state.redo.push(snapshot());restore(state.undo.pop())}};$('#redoBtn').onclick=()=>{if(state.redo.length){state.undo.push(snapshot());restore(state.redo.pop())}};$('#bgColor').oninput=e=>{if(state.background!==e.target.value){commit();state.background=e.target.value;renderArt()}};$('#clearBtn').onclick=clearAll;$('#saveBtn').onclick=saveWork;$('#pngBtn').onclick=downloadPNG;$('#chooseSampleBtn').onclick=()=>$('#sampleDialog').showModal();$('#galleryBtn').onclick=gallery;$('#previewBtn').onclick=()=>{state.showDots=!state.showDots;$('#previewBtn').textContent=state.showDots?'点をかくす':'点を見せる';renderArt()};
$$('[data-close="gallery"]').forEach(b=>b.onclick=()=>$('#galleryDialog').close());$$('[data-close="preview"]').forEach(b=>b.onclick=()=>$('#previewDialog').close());
$('#teacherBtn').onclick=()=>{renderTeacherSamples();$('#teacherDialog').showModal()};$('#registerSampleBtn').onclick=registerCurrentSample;$('#exportSamplesBtn').onclick=exportSamples;$('#importSamplesFile').onchange=e=>importSamplesFile(e.target.files[0]);$('[data-close="teacher"]').forEach(b=>b.onclick=()=>$('#teacherDialog').close());
populateSamples();renderSample();renderArt();
})();
