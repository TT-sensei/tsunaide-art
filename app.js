(() => {
'use strict';
const NS='http://www.w3.org/2000/svg', GRID=10, PAD=45, SIZE=710, STEP=(SIZE-PAD*2)/(GRID-1);
const COLORS=['#222222','#d94e4e','#e38b35','#e0bd35','#4d9761','#3c82c4','#6657b8','#c45a91'];
const line=(a,b,color='#222222',width=6)=>({from:a,to:b,color,width});
const p=(r,c)=>r*GRID+c;
const samples=[
 {id:'house',name:'いえ',level:'かんたん',lines:[line(p(7,2),p(7,7)),line(p(7,2),p(4,2)),line(p(4,2),p(2,4)),line(p(2,4),p(4,7)),line(p(4,7),p(7,7)),line(p(7,4),p(5,4)),line(p(5,4),p(5,5)),line(p(5,5),p(7,5))]},
 {id:'star',name:'ほし',level:'かんたん',lines:[line(p(1,4),p(7,6),'#e0bd35'),line(p(7,6),p(3,1),'#e0bd35'),line(p(3,1),p(3,8),'#e0bd35'),line(p(3,8),p(7,2),'#e0bd35'),line(p(7,2),p(1,4),'#e0bd35')]},
 {id:'tree',name:'き',level:'かんたん',lines:[line(p(7,4),p(7,5),'#8b5a34',10),line(p(7,4),p(9,4),'#8b5a34',10),line(p(7,5),p(9,5),'#8b5a34',10),line(p(9,4),p(9,5),'#8b5a34',10),line(p(7,2),p(3,4),'#4d9761'),line(p(3,4),p(1,5),'#4d9761'),line(p(1,5),p(4,7),'#4d9761'),line(p(4,7),p(7,7),'#4d9761'),line(p(7,7),p(7,2),'#4d9761')]},
 {id:'fish',name:'さかな',level:'かんたん',lines:[line(p(4,2),p(2,5),'#3c82c4'),line(p(2,5),p(4,7),'#3c82c4'),line(p(4,7),p(6,5),'#3c82c4'),line(p(6,5),p(4,2),'#3c82c4'),line(p(4,2),p(2,0),'#d94e4e'),line(p(2,0),p(6,0),'#d94e4e'),line(p(6,0),p(4,2),'#d94e4e')]},
 {id:'flower',name:'はな',level:'ふつう',lines:[line(p(4,4),p(1,4),'#d94e4e'),line(p(1,4),p(3,6),'#d94e4e'),line(p(3,6),p(4,4),'#d94e4e'),line(p(4,4),p(6,6),'#d94e4e'),line(p(6,6),p(7,4),'#d94e4e'),line(p(7,4),p(4,4),'#d94e4e'),line(p(4,4),p(5,2),'#d94e4e'),line(p(5,2),p(3,2),'#d94e4e'),line(p(3,2),p(4,4),'#d94e4e'),line(p(4,4),p(9,4),'#4d9761')]},
 {id:'butterfly',name:'ちょうちょ',level:'ふつう',lines:[line(p(2,4),p(7,4),'#222'),line(p(3,4),p(1,1),'#c45a91'),line(p(1,1),p(5,2),'#c45a91'),line(p(5,2),p(6,4),'#c45a91'),line(p(3,4),p(1,8),'#6657b8'),line(p(1,8),p(5,7),'#6657b8'),line(p(5,7),p(6,4),'#6657b8')]},
 {id:'heart',name:'ハート',level:'ふつう',lines:[line(p(3,4),p(1,2),'#d94e4e',10),line(p(1,2),p(1,0),'#d94e4e',10),line(p(1,0),p(4,0),'#d94e4e',10),line(p(4,0),p(8,4),'#d94e4e',10),line(p(8,4),p(4,8),'#d94e4e',10),line(p(4,8),p(1,8),'#d94e4e',10),line(p(1,8),p(1,6),'#d94e4e',10),line(p(1,6),p(3,4),'#d94e4e',10)]},
 {id:'rocket',name:'ロケット',level:'ふつう',lines:[line(p(1,4),p(4,2),'#3c82c4'),line(p(1,4),p(4,6),'#3c82c4'),line(p(4,2),p(7,3),'#3c82c4'),line(p(7,3),p(7,5),'#3c82c4'),line(p(7,5),p(4,6),'#3c82c4'),line(p(7,3),p(9,2),'#d94e4e'),line(p(7,5),p(9,6),'#d94e4e'),line(p(7,4),p(9,4),'#e38b35',10)]},
 {id:'snow',name:'雪のけっしょう',level:'ちょっとむずかしい',lines:[0,1,2,3,4,5,6,7].flatMap((_,i)=>{let ends=[[0,4],[2,7],[4,9],[7,7],[9,4],[7,1],[4,0],[2,1]];return [line(p(4,4),p(...ends[i]),'#3c82c4',3)]})},
 {id:'geo',name:'ひろがるもよう',level:'ちょっとむずかしい',lines:[line(p(0,0),p(9,9),'#d94e4e'),line(p(0,9),p(9,0),'#3c82c4'),line(p(0,0),p(0,9),'#e0bd35'),line(p(0,9),p(9,9),'#4d9761'),line(p(9,9),p(9,0),'#6657b8'),line(p(9,0),p(0,0),'#e38b35'),line(p(0,4),p(4,9),'#c45a91'),line(p(4,9),p(9,4),'#c45a91'),line(p(9,4),p(4,0),'#c45a91'),line(p(4,0),p(0,4),'#c45a91')]}
];
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
function updateMatch(){let n=state.lines.filter(l=>state.sample.lines.some(s=>key(s)===key(l))).length;$('#matchInfo').textContent=state.mode==='trace'?`お手本と同じ線　${n}本`:''}
function setMode(mode){state.mode=mode;$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));$('#workspace').classList.toggle('free',mode==='free');$('#message').textContent=mode==='trace'?'左のお手本を見ながら、点をつないでみよう':mode==='arrange'?'お手本をヒントに、自分の作品をつくろう':'点と線から、自分だけの作品をつくろう';renderArt()}
function toast(t){let el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1700)}
function cardSvg(work,dots=false){return svgFor(work,{dots})}
function populateSamples(){let host=$('#sampleList');samples.forEach(s=>{let c=document.createElement('button');c.className='card';c.type='submit';c.append(cardSvg(s,false));c.insertAdjacentHTML('beforeend',`<strong>${s.name}</strong><small>${s.level}</small>`);c.onclick=()=>{state.sample=s;renderSample();toast(`${s.name}をえらびました`)};host.append(c)})}
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
populateSamples();renderSample();renderArt();
})();
