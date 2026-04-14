import { useState, useMemo } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Fira+Code:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{height:100%;overscroll-behavior:none;}
body{background:#04040e;font-family:'Cormorant Garamond',Georgia,serif;color:#ede8d5;overflow-x:hidden;}
:root{
  --red:#d91f2e;--red2:#ff4455;--redg:rgba(217,31,46,.22);
  --gold:#c9a44a;--gold2:#e2bc6e;--goldg:rgba(201,164,74,.15);
  --bg:#04040e;--s0:#080816;--s1:#0e0e22;--s2:#13132c;--s3:#181834;
  --b1:#1c1c38;--b2:#252545;
  --txt:#ede8d5;--txt2:#a09cbe;--txt3:#60608a;
  --r:16px;--r2:12px;--r3:8px;
}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-thumb{background:var(--b2);border-radius:3px;}
.app{max-width:480px;margin:0 auto;min-height:100dvh;display:flex;flex-direction:column;}
.bg-orb{position:fixed;pointer-events:none;border-radius:50%;filter:blur(80px);z-index:0;}
.orb1{width:300px;height:300px;background:radial-gradient(circle,rgba(217,31,46,.06),transparent 70%);top:-80px;left:-80px;}
.orb2{width:250px;height:250px;background:radial-gradient(circle,rgba(201,164,74,.05),transparent 70%);bottom:100px;right:-60px;}

/* HEADER */
.hdr{position:sticky;top:0;z-index:200;background:rgba(4,4,14,.9);backdrop-filter:blur(24px);border-bottom:1px solid var(--b1);}
.hdr-top{display:flex;align-items:center;gap:12px;padding:14px 16px 10px;}
.logo{
  width:42px;height:42px;border-radius:12px;flex-shrink:0;
  background:linear-gradient(145deg,#8b0011,var(--red));
  display:flex;align-items:center;justify-content:center;
  font-family:'Noto Serif SC',serif;font-size:20px;font-weight:700;color:#fff;
  box-shadow:0 0 24px var(--redg),0 4px 12px rgba(0,0,0,.5);
}
.hdr-text h1{font-size:16px;font-weight:600;color:var(--txt);letter-spacing:.2px;}
.hdr-text p{font-size:11px;color:var(--txt3);font-style:italic;margin-top:1px;}
.tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;padding:0 12px 12px;}
.tab{padding:7px 2px;border:none;background:transparent;border-radius:var(--r3);cursor:pointer;color:var(--txt3);font-size:10.5px;font-family:inherit;display:flex;flex-direction:column;align-items:center;gap:3px;transition:all .2s;letter-spacing:.3px;position:relative;}
.tab-i{font-size:16px;line-height:1;}
.tab.on{color:var(--txt);}
.tab.on::after{content:'';position:absolute;bottom:-2px;left:25%;right:25%;height:2px;background:var(--red);border-radius:2px;box-shadow:0 0 8px var(--redg);}

/* CONTENT */
.content{flex:1;padding:14px 14px 100px;position:relative;z-index:1;}

/* SECTION LABEL */
.sl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--txt3);margin:20px 0 10px;display:flex;align-items:center;gap:8px;}
.sl::after{content:'';flex:1;height:1px;background:var(--b1);}

/* HERO */
.hero{
  background:linear-gradient(135deg,#110614 0%,#0a0a20 60%,#0b1218 100%);
  border:1px solid var(--b2);border-radius:22px;padding:22px 20px;margin-bottom:14px;position:relative;overflow:hidden;
}
.hero::before{content:'語';position:absolute;right:-20px;top:-30px;font-family:'Noto Serif SC',serif;font-size:150px;font-weight:700;color:rgba(217,31,46,.05);line-height:1;pointer-events:none;}
.hero-tag{display:inline-block;background:rgba(217,31,46,.1);border:1px solid rgba(217,31,46,.3);border-radius:20px;padding:3px 12px;font-size:10px;color:var(--red2);letter-spacing:.5px;margin-bottom:10px;}
.hero h2{font-family:'Noto Serif SC',serif;font-size:32px;font-weight:600;color:var(--txt);line-height:1.1;margin-bottom:5px;}
.hero p{font-size:13px;color:var(--txt2);font-style:italic;}
.hero-div{height:1px;background:var(--b1);margin:14px 0;}
.hero-meta{display:flex;gap:20px;}
.hero-meta span{font-size:12px;color:var(--txt3);}
.hero-meta strong{color:var(--gold);font-weight:700;}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:6px;}
.stat{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r2);padding:14px 10px;text-align:center;}
.stat-n{font-size:28px;font-weight:700;color:var(--gold);line-height:1;}
.stat-l{font-size:9.5px;color:var(--txt3);margin-top:3px;letter-spacing:.3px;}

/* LESSON CARDS */
.lcard{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all .18s;margin-bottom:8px;position:relative;overflow:hidden;}
.lcard::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--red),transparent);opacity:0;transition:opacity .2s;}
.lcard:hover{border-color:var(--b2);transform:translateX(3px);}
.lcard:hover::before{opacity:1;}
.lcard:active{transform:scale(.99);}
.lnum{width:46px;height:46px;border-radius:13px;flex-shrink:0;background:linear-gradient(145deg,rgba(217,31,46,.12),rgba(217,31,46,.04));border:1px solid rgba(217,31,46,.2);display:flex;align-items:center;justify-content:center;font-family:'Noto Serif SC',serif;font-size:19px;font-weight:700;color:var(--red2);}
.linfo{flex:1;min-width:0;}
.linfo h3{font-family:'Noto Serif SC',serif;font-size:17px;color:var(--txt);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.linfo .py{font-size:11px;color:var(--gold);font-style:italic;margin-top:3px;font-family:'Fira Code',monospace;}
.linfo .sub{font-size:11px;color:var(--txt3);margin-top:2px;}
.larr{color:var(--txt3);font-size:22px;margin-left:auto;flex-shrink:0;}

/* LESSON DETAIL */
.back{display:flex;align-items:center;gap:6px;padding:8px 14px;background:var(--s1);border:1px solid var(--b1);border-radius:30px;width:fit-content;margin-bottom:16px;font-size:12px;color:var(--txt2);cursor:pointer;font-family:inherit;transition:all .2s;}
.back:hover{color:var(--txt);border-color:var(--b2);}
.lhdr{background:linear-gradient(135deg,#1a0408,#0d0d22);border:1px solid var(--b2);border-radius:20px;padding:20px;margin-bottom:14px;}
.lhdr h2{font-family:'Noto Serif SC',serif;font-size:28px;font-weight:600;color:var(--txt);}
.lhdr .py{font-size:12px;color:var(--gold);margin-top:5px;font-style:italic;font-family:'Fira Code',monospace;}
.lhdr .sub{font-size:12px;color:var(--txt3);margin-top:4px;font-style:italic;}

.trow{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
.tbtn{padding:7px 14px;border-radius:30px;border:1px solid var(--b1);background:var(--s1);color:var(--txt3);font-size:11px;cursor:pointer;font-family:inherit;transition:all .2s;}
.tbtn.on{background:var(--goldg);border-color:rgba(201,164,74,.4);color:var(--gold2);}

/* DIALOGUE */
.dlog{display:flex;flex-direction:column;gap:10px;}
.dline{display:flex;gap:10px;align-items:flex-start;}
.spk{width:30px;height:30px;border-radius:9px;flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;font-family:'Fira Code',monospace;}
.spA{background:rgba(217,31,46,.1);color:#ff6070;border:1px solid rgba(217,31,46,.3);}
.spB{background:rgba(201,164,74,.1);color:var(--gold2);border:1px solid rgba(201,164,74,.3);}
.spC{background:rgba(74,158,255,.1);color:#6ab4ff;border:1px solid rgba(74,158,255,.3);}
.spD{background:rgba(74,255,158,.1);color:#6affa0;border:1px solid rgba(74,255,158,.3);}
.dbub{background:var(--s1);border:1px solid var(--b1);border-radius:0 14px 14px 14px;padding:12px 14px;flex:1;}
.dcn{font-family:'Noto Serif SC',serif;font-size:18px;color:var(--txt);line-height:1.6;}
.dpy{font-size:11px;color:var(--gold);margin-top:5px;font-family:'Fira Code',monospace;font-style:italic;line-height:1.5;}
.dfr{font-size:12px;color:var(--txt2);margin-top:4px;font-style:italic;line-height:1.4;}
.notebox{background:rgba(201,164,74,.06);border:1px solid rgba(201,164,74,.2);border-left:3px solid var(--gold);border-radius:var(--r2);padding:14px;margin-top:16px;}
.notebox p{font-size:12px;color:#c0a870;font-style:italic;line-height:1.7;}

/* VOCAB */
.srch-wrap{position:relative;margin-bottom:12px;}
.srch-wrap input{width:100%;padding:12px 16px 12px 44px;background:var(--s1);border:1px solid var(--b1);border-radius:30px;color:var(--txt);font-size:14px;font-family:inherit;outline:none;transition:border-color .2s;}
.srch-wrap input::placeholder{color:var(--txt3);}
.srch-wrap input:focus{border-color:var(--b2);}
.srch-icon{position:absolute;left:15px;top:50%;transform:translateY(-50%);font-size:17px;pointer-events:none;}

.cats{display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none;}
.cats::-webkit-scrollbar{display:none;}
.catbtn{white-space:nowrap;padding:7px 13px;border-radius:30px;border:1px solid var(--b1);background:var(--s1);color:var(--txt3);font-size:11px;cursor:pointer;font-family:inherit;transition:all .2s;flex-shrink:0;}
.catbtn.on{background:var(--redg);border-color:rgba(217,31,46,.4);color:var(--red2);}
.cat-cn{font-family:'Noto Serif SC',serif;margin-right:2px;}

.pbar{height:3px;background:var(--b1);border-radius:3px;margin:10px 0 6px;}
.pfill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--red),var(--gold));transition:width .4s;}
.vcount{font-size:11px;color:var(--txt3);margin-bottom:12px;font-style:italic;}

/* VOCAB GRID */
.vgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.vcard{height:140px;perspective:1200px;cursor:pointer;}
.vinner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.4,0,.2,1);border-radius:var(--r);}
.vcard.flp .vinner{transform:rotateY(180deg);}
.vf,.vb{position:absolute;inset:0;border-radius:var(--r);backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;text-align:center;gap:3px;}
.vf{background:var(--s1);border:1px solid var(--b1);transition:border-color .2s;}
.vcard:hover .vf{border-color:var(--b2);}
.vb{background:linear-gradient(145deg,#150510,#0d0d22);border:1px solid rgba(217,31,46,.3);transform:rotateY(180deg);}
.vcn{font-family:'Noto Serif SC',serif;font-size:32px;font-weight:600;color:var(--txt);line-height:1;}
.vcn.lg{font-size:24px;}
.vcn.xl{font-size:19px;}
.vbdg{font-size:9px;letter-spacing:.4px;padding:2px 8px;border-radius:20px;margin-top:4px;}
.bdg-v{background:rgba(217,31,46,.12);color:var(--red2);border:1px solid rgba(217,31,46,.2);}
.bdg-adj{background:rgba(74,158,255,.12);color:#7ab8ff;border:1px solid rgba(74,158,255,.2);}
.bdg-n{background:rgba(201,164,74,.12);color:var(--gold2);border:1px solid rgba(201,164,74,.2);}
.bdg-int{background:rgba(74,255,158,.12);color:#7affc0;border:1px solid rgba(74,255,158,.2);}
.bdg-p{background:rgba(200,74,255,.12);color:#d07aff;border:1px solid rgba(200,74,255,.2);}
.vtap{font-size:9px;color:var(--txt3);margin-top:3px;}
.vb-py{font-size:12px;color:var(--gold2);font-family:'Fira Code',monospace;font-style:italic;line-height:1.4;}
.vb-cn{font-family:'Noto Serif SC',serif;font-size:22px;color:var(--txt);font-weight:500;}
.vb-cn.lg{font-size:18px;}
.vb-cn.xl{font-size:15px;}
.vb-fr{font-size:11px;color:var(--txt2);font-style:italic;line-height:1.35;margin-top:3px;}

/* GRAMMAR */
.gcard{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:18px;margin-bottom:10px;}
.ghead{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;}
.gi{font-size:22px;line-height:1;flex-shrink:0;margin-top:1px;}
.gtitle{font-size:15px;font-weight:600;color:var(--gold);}
.gbdg{display:inline-block;margin-top:4px;background:var(--goldg);border:1px solid rgba(201,164,74,.25);border-radius:20px;padding:2px 10px;font-size:10px;color:var(--gold2);}
.grule{font-size:12.5px;color:var(--txt2);font-style:italic;line-height:1.65;margin-bottom:10px;}
.gex{background:var(--s2);border-radius:var(--r3);padding:11px 13px;margin-top:7px;border-left:2px solid rgba(217,31,46,.3);}
.gex-cn{font-family:'Noto Serif SC',serif;font-size:17px;color:var(--txt);}
.hl{color:var(--red2);font-weight:700;}
.gex-py{font-size:11px;color:var(--gold);font-family:'Fira Code',monospace;font-style:italic;margin-top:3px;}
.gex-fr{font-size:11px;color:var(--txt2);font-style:italic;margin-top:3px;}

.ngrid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:10px;}
.nc{background:var(--s2);border-radius:var(--r3);padding:10px 6px;text-align:center;}
.nc-c{font-family:'Noto Serif SC',serif;font-size:24px;color:var(--txt);}
.nc-p{font-size:10px;color:var(--gold);font-family:'Fira Code',monospace;margin-top:2px;}
.nc-n{font-size:10px;color:var(--txt3);margin-top:1px;}

.daygrid{display:flex;flex-direction:column;gap:6px;margin-top:10px;}
.dayrow{display:flex;align-items:center;gap:10px;background:var(--s2);border-radius:var(--r3);padding:9px 12px;}
.dy-cn{font-family:'Noto Serif SC',serif;font-size:15px;color:var(--txt);flex:0 0 68px;}
.dy-py{font-size:11px;color:var(--gold);font-family:'Fira Code',monospace;flex:1;font-style:italic;}
.dy-fr{font-size:11px;color:var(--txt3);}

.tonegrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:10px;}
.tone{background:var(--s2);border-radius:var(--r3);padding:14px;text-align:center;}
.tone-c{font-family:'Noto Serif SC',serif;font-size:28px;color:var(--txt);}
.tone-p{font-size:13px;color:var(--gold);font-family:'Fira Code',monospace;margin-top:3px;}
.tone-f{font-size:11px;color:var(--txt3);margin-top:3px;font-style:italic;}
.tone-m{font-size:10px;color:var(--red2);margin-top:3px;font-weight:600;letter-spacing:.3px;}

@keyframes fu{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fu .3s ease both;}
`;

/* ── DATA ── */
const LS=[
  {id:1,num:"一",title:"这是王老师",py:"zhè shì wáng lǎoshī",sub:"Présentations",
    dl:[
      {s:"A",cn:"这是王老师，这是我爸爸",py:"zhèshì wáng lǎoshī, zhèshì wǒ bàba",fr:"Voici le professeur Wang, voici mon père."},
      {s:"B",cn:"王老师，您好！很高兴认识您！",py:"wáng lǎoshī, nín hǎo! hěn gāoxìng rènshi nín!",fr:"Professeur Wang, bonjour ! Très heureux de vous connaître !"},
      {s:"C",cn:"请进！请坐！请喝茶！",py:"qǐngjìn! qǐngzuò! qǐng hēchá!",fr:"Entrez ! Asseyez-vous ! Prenez du thé !"},
      {s:"B",cn:"谢谢！",py:"xièxie!",fr:"Merci !"},
      {s:"C",cn:"不客气！",py:"bù kèqi!",fr:"De rien !"},
      {s:"C",cn:"工作忙吗？",py:"gōngzuò máng ma?",fr:"Êtes-vous occupé au travail ?"},
      {s:"B",cn:"不太忙。",py:"bù tài máng.",fr:"Pas trop occupé."},
      {s:"C",cn:"身体好吗？",py:"shēntǐ hǎo ma?",fr:"Vous portez-vous bien ?"},
      {s:"B",cn:"很好！",py:"hěn hǎo!",fr:"Très bien !"},
    ],
    note:"您 (nín) = forme polie de 你 (nǐ). 吗 (ma) en fin de phrase = question oui/non. 不太 + adjectif = pas trop + adjectif.",
  },
  {id:2,num:"二",title:"今天三号",py:"jīntiān sān hào",sub:"Dates et jours",
    dl:[
      {s:"A",cn:"今天星期四吗？",py:"jīntiān xīngqīsì ma?",fr:"C'est jeudi aujourd'hui ?"},
      {s:"B",cn:"今天不是星期四，昨天星期四。",py:"jīntiān bùshì xīngqīsì, zuótiān xīngqīsì.",fr:"Aujourd'hui ce n'est pas jeudi, hier c'était jeudi."},
      {s:"A",cn:"今天几号？",py:"jīntiān jǐ hào?",fr:"On est le combien aujourd'hui ?"},
      {s:"B",cn:"九月三号，今天是你的生日！",py:"jiǔyuè sān hào, jīntiān shì nǐ de shēngrì!",fr:"Le 3 septembre — aujourd'hui c'est ton anniversaire !"},
      {s:"A",cn:"啊，我忘了！晚上我们一起吃饭吧？！我请客！",py:"ā, wǒ wàng le! wǎnshang wǒmen yīqǐ chīfàn ba?! wǒ qǐngkè!",fr:"Ah j'avais oublié ! Ce soir on dîne ensemble ? C'est moi qui invite !"},
      {s:"B",cn:"好啊，咱们几点见？",py:"hǎo a, zánmen jǐdiǎn jiàn?",fr:"D'accord, on se retrouve à quelle heure ?"},
      {s:"A",cn:"晚上七点半在学校门口见。",py:"wǎnshang qīdiǎn bàn zài xuéxiào ménkǒu jiàn.",fr:"Ce soir à sept heures et demie à l'entrée de l'école."},
    ],
    note:"Dates : mois + 号 (hào). Jours : 星期 + chiffre 1-6, 星期日/天 pour dimanche. 咱们 (zánmen) = nous inclusif. 请客 = inviter et payer l'addition.",
  },
  {id:3,num:"三",title:"这是什么",py:"zhè shì shénme",sub:"Identifier les objets",
    dl:[
      {s:"A",cn:"这是什么？",py:"zhèshì shénme?",fr:"Qu'est-ce que c'est ?"},
      {s:"B",cn:"这是书。",py:"zhèshì shū.",fr:"C'est un livre."},
      {s:"A",cn:"那是什么？",py:"nàshì shénme?",fr:"Qu'est-ce que c'est là-bas ?"},
      {s:"B",cn:"那是一本杂志。",py:"nàshì yī běn zázhì.",fr:"C'est un magazine."},
      {s:"A",cn:"这是什么书？",py:"zhèshì shénme shū?",fr:"Quel genre de livre est-ce ?"},
      {s:"B",cn:"这是一本中文书。",py:"zhèshì yī běn zhōngwén shū.",fr:"C'est un livre en chinois."},
      {s:"A",cn:"这是谁的书？",py:"zhèshì shuíde shū?",fr:"À qui appartient ce livre ?"},
      {s:"B",cn:"这是老师的书。",py:"zhèshì lǎoshī de shū.",fr:"C'est le livre du professeur."},
      {s:"A",cn:"那是谁的杂志？",py:"nàshì shuíde zázhì?",fr:"À qui est ce magazine ?"},
      {s:"B",cn:"那是我朋友的杂志。",py:"nàshì wǒ péngyou de zázhì.",fr:"C'est le magazine de mon ami."},
    ],
    note:"这 (zhè) = ceci (proche) · 那 (nà) = cela (loin). Classifiants : 本 livres · 支 stylos · 个 général · 张 feuilles/tables.",
  },
  {id:4,num:"四",title:"学汉语",py:"xué hànyǔ",sub:"Apprendre le chinois",
    dl:[
      {s:"A",cn:"请问，你是哪国人？",py:"qǐngwèn, nǐ shì nǎ guó rén?",fr:"Excusez-moi, de quelle nationalité êtes-vous ?"},
      {s:"B",cn:"我是美国人。",py:"wǒ shì měiguórén.",fr:"Je suis américain."},
      {s:"A",cn:"你学什么？",py:"nǐ xué shénme?",fr:"Qu'est-ce que vous étudiez ?"},
      {s:"B",cn:"我学习汉语。",py:"wǒ xuéxí hànyǔ.",fr:"J'étudie le chinois."},
      {s:"A",cn:"汉语难吗？",py:"hànyǔ nán ma?",fr:"Le chinois est-il difficile ?"},
      {s:"B",cn:"汉语很难，但是发音不太难。",py:"hànyǔ hěn nán, dànshì fāyīn bù tài nán.",fr:"Le chinois est très difficile, mais la prononciation n'est pas trop difficile."},
      {s:"A",cn:"现在，你在做什么？",py:"xiànzài, nǐ zài zuò shénme?",fr:"Que faites-vous en ce moment ?"},
      {s:"B",cn:"我在练发音。",py:"wǒ zài liàn fāyīn.",fr:"Je m'entraîne à la prononciation."},
    ],
    note:"在 + verbe = être en train de faire. 但是 (dànshì) = mais. 汉语 = langue parlée · 中文 = langue écrite. 请问 = formule polie pour interpeller.",
  },
  {id:5,num:"五",title:"今天天气不好",py:"jīntiān tiānqì bùhǎo",sub:"La météo",
    dl:[
      {s:"A",cn:"今天天气怎么样？",py:"jīntiān tiānqì zěnmeyàng?",fr:"Comment est la météo aujourd'hui ?"},
      {s:"B",cn:"不好，下雨了，很冷。昨天天气很好，很热。",py:"bùhǎo, xiàyǔ le, hěnlěng. zuótiān tiānqì hěnhǎo, hěnrè.",fr:"Pas bien — il pleut, très froid. Hier la météo était belle, très chaud."},
      {s:"A",cn:"哦，你看，现在雨停了，咱们可以出去了！",py:"o, nǐkàn, xiànzài yǔtíng le, zánmen kěyǐ chūqù le!",fr:"Oh regarde, la pluie s'est arrêtée, on peut sortir !"},
      {s:"B",cn:"是的。咱们去图书馆吧？",py:"shìde. zánmen qù túshūguǎn ba?",fr:"Oui. On va à la bibliothèque ?"},
      {s:"A",cn:"我去过了。你去过书店吗？",py:"wǒ qùguò le. nǐ qùguò shūdiàn ma?",fr:"J'y suis déjà allé. Es-tu déjà allé à la librairie ?"},
      {s:"B",cn:"没去过。明天是小王的生日，我想送他两本书。",py:"méi qùguò. míngtiān shì xiǎowáng de shēngrì, wǒ xiǎng sòng tā liǎngběn shū.",fr:"Non jamais. Demain c'est l'anniversaire de Xiao Wang, je veux lui offrir deux livres."},
      {s:"A",cn:"哦，我也要送他一个礼物。好，咱们一起去吧！",py:"o, wǒ yě yào sòng tā yīgè lǐwù. hǎo, zánmen yīqǐ qù ba!",fr:"Moi aussi je veux lui offrir un cadeau. Bien, allons-y ensemble !"},
    ],
    note:"过 (guò) après verbe = expérience passée. 了 (le) = changement d'état. 可以 (kěyǐ) = pouvoir/être permis. 没去过 = je n'y suis jamais allé.",
  },
  {id:6,num:"六",title:"现在几点！",py:"xiànzài jǐdiǎn",sub:"L'heure",
    dl:[
      {s:"A",cn:"小马，现在几点了？",py:"xiǎomǎ, xiànzài jǐdiǎn le?",fr:"Xiao Ma, quelle heure est-il ?"},
      {s:"B",cn:"七点一刻。",py:"qīdiǎn yī kè.",fr:"Sept heures et quart."},
      {s:"A",cn:"哎呀，我八点上课！快起床吧！",py:"āiyā, wǒ bādiǎn shàngkè! kuài qǐchuáng ba!",fr:"Aïe, j'ai cours à huit heures ! Lève-toi vite !"},
      {s:"B",cn:"好，你今天上午有课吗？",py:"hǎo, nǐ jīntiān shàngwǔ yǒukè ma?",fr:"Bien. Tu as cours ce matin ?"},
      {s:"A",cn:"有，我十点十分有课。",py:"yǒu, wǒ shídiǎn shífēn yǒukè.",fr:"Oui, j'ai cours à dix heures dix."},
      {s:"B",cn:"明天我妈妈来北京，飞机下午三点半到。",py:"míngtiān wǒ māma lái běijīng, fēijī xiàwǔ sāndiǎn bàn dào.",fr:"Demain ma mère vient à Pékin, l'avion arrive à 15h30."},
      {s:"A",cn:"你去机场吗？",py:"nǐ qù jīchǎng ma?",fr:"Tu vas à l'aéroport ?"},
      {s:"B",cn:"去，我两点出发。",py:"qù, wǒ liǎngdiǎn chūfā.",fr:"Oui, je pars à deux heures."},
    ],
    note:"Heure : 点 (diǎn) = heure · 分 (fēn) = minute · 一刻 = et quart · 半 = et demie · 差 = moins. Ex : 差一刻三点 = 2h45.",
  },
  {id:7,num:"七",title:"我们的学校",py:"wǒmen de xuéxiào",sub:"L'école — les lieux",
    dl:[
      {s:"A",cn:"我们的学校UTBM是一所工程师科技大学。",py:"wǒmen de xuéxiào shì yī suǒ gōngchéngshī kējì dàxué.",fr:"Notre école UTBM est une université de technologie."},
      {s:"B",cn:"我们的学校在法国的东边，城市叫BELFORT。",py:"wǒmen de xuéxiào zài fǎguó de dōngbian, chéngshì jiào BELFORT.",fr:"Notre école est à l'est de la France, la ville s'appelle Belfort."},
      {s:"C",cn:"学校里的学生很多，老师也不少，还有很多留学生。",py:"xuéxiào lǐ de xuésheng hěnduō, lǎoshī yě bùshǎo, háiyǒu hěnduō liúxuéshēng.",fr:"Beaucoup d'étudiants, pas peu de profs non plus, et beaucoup d'étudiants étrangers."},
      {s:"B",cn:"教学楼很新，教室也很干净，是我们上课的地方。",py:"jiàoxué lóu hěnxīn, jiàoshì yě hěn gānjìng, shì wǒmen shàngkè de dìfang.",fr:"Le bâtiment est très neuf, les salles très propres — c'est là où on a cours."},
      {s:"C",cn:"教学楼的右边是图书馆，左边是食堂，前边是操场和体育馆。",py:"jiàoxué lóu de yòubian shì túshūguǎn, zuǒbian shì shítáng, qiánbian shì cāochǎng.",fr:"À droite la bibliothèque, à gauche la cantine, devant le terrain de sport et le gymnase."},
    ],
    note:"Directions avec 边 : 右边/左边/前边/后边/里边/外边. 还有 (háiyǒu) = il y a aussi. Ordre : sujet + 在 + lieu + verbe.",
  },
  {id:8,num:"八",title:"买东西",py:"mǎi dōngxi",sub:"Faire des courses",
    dl:[
      {s:"A",cn:"今天你真漂亮。",py:"jīntiān nǐ zhēn piàoliang.",fr:"Tu es vraiment belle aujourd'hui."},
      {s:"B",cn:"谢谢，你的衣服也很不错，在什么地方买的？",py:"xièxie, nǐde yīfu yě hěn bùcuò, zài shénme dìfang mǎide?",fr:"Merci, tes vêtements sont très bien aussi — tu les as achetés où ?"},
      {s:"A",cn:"在老佛爷买的，你想去买吗？",py:"zài Lǎofóyé mǎide, nǐ xiǎng qù mǎi ma?",fr:"Aux Galeries Lafayette. Tu veux y aller acheter ?"},
      {s:"B",cn:"想，可是我的车坏了，不能开车去了，怎么办？",py:"xiǎng, kěshì wǒde chē huài le, bùnéng kāichē qù le, zěnme bàn?",fr:"Oui, mais ma voiture est en panne, je ne peux pas conduire. Que faire ?"},
      {s:"A",cn:"没关系，咱们可以坐出租车。",py:"méi guānxi, zánmen kěyǐ zuò chūzūchē.",fr:"Pas de problème, on peut prendre un taxi."},
      {s:"B",cn:"我要一斤苹果和两斤香蕉，一共多少钱？",py:"wǒ yào yī jīn píngguǒ hé liǎng jīn xiāngjiāo, yīgòng duōshao qián?",fr:"Je veux 500g de pommes et 1kg de bananes — combien en tout ?"},
      {s:"A",cn:"一共十块三角五分。",py:"yīgòng shí kuài sān jiǎo wǔ fēn.",fr:"En tout 10 yuans 35 centimes."},
    ],
    note:"在...买的 = acheté à/chez (lieu). Monnaie : 块(元) > 角(毛) > 分. 不能 = ne pas pouvoir. 怎么办 (zěnme bàn) = que faire ?",
  },
];

const VV=[
  // VERBES
  {cn:"是",py:"shì",fr:"Être",cat:"v"},
  {cn:"有",py:"yǒu",fr:"Avoir / il y a",cat:"v"},
  {cn:"去",py:"qù",fr:"Aller",cat:"v"},
  {cn:"学",py:"xué",fr:"Apprendre, étudier",cat:"v"},
  {cn:"工作",py:"gōngzuò",fr:"Travailler / travail",cat:"v"},
  {cn:"姓",py:"xìng",fr:"Avoir pour nom de famille",cat:"v"},
  {cn:"叫",py:"jiào",fr:"S'appeler, crier",cat:"v"},
  {cn:"做",py:"zuò",fr:"Faire",cat:"v"},
  {cn:"会",py:"huì",fr:"Savoir faire, pouvoir",cat:"v"},
  {cn:"知道",py:"zhīdào",fr:"Savoir quelque chose",cat:"v"},
  {cn:"说",py:"shuō",fr:"Dire, parler",cat:"v"},
  {cn:"要",py:"yào",fr:"Vouloir, avoir besoin de",cat:"v"},
  {cn:"喜欢",py:"xǐhuān",fr:"Aimer bien, apprécier",cat:"v"},
  {cn:"爱",py:"ài",fr:"Aimer (fort, amour)",cat:"v"},
  {cn:"认识",py:"rènshi",fr:"Connaître, faire connaissance",cat:"v"},
  {cn:"吃饭",py:"chīfàn",fr:"Manger un repas",cat:"v"},
  {cn:"喝水",py:"hēshuǐ",fr:"Boire de l'eau",cat:"v"},
  {cn:"像",py:"xiàng",fr:"Ressembler à",cat:"v"},
  {cn:"看",py:"kàn",fr:"Regarder, voir, lire",cat:"v"},
  {cn:"听",py:"tīng",fr:"Écouter, entendre",cat:"v"},
  {cn:"写",py:"xiě",fr:"Écrire",cat:"v"},
  {cn:"买",py:"mǎi",fr:"Acheter",cat:"v"},
  {cn:"卖",py:"mài",fr:"Vendre",cat:"v"},
  {cn:"送",py:"sòng",fr:"Offrir, donner, accompagner",cat:"v"},
  {cn:"来",py:"lái",fr:"Venir",cat:"v"},
  {cn:"请",py:"qǐng",fr:"Inviter, prier, s'il vous plaît",cat:"v"},
  {cn:"练",py:"liàn",fr:"S'entraîner, pratiquer",cat:"v"},
  {cn:"开车",py:"kāichē",fr:"Conduire une voiture",cat:"v"},
  {cn:"出发",py:"chūfā",fr:"Partir, se mettre en route",cat:"v"},
  {cn:"出去",py:"chūqù",fr:"Sortir",cat:"v"},
  {cn:"起床",py:"qǐchuáng",fr:"Se lever (du lit)",cat:"v"},
  {cn:"上课",py:"shàngkè",fr:"Aller en classe, avoir cours",cat:"v"},
  {cn:"见",py:"jiàn",fr:"Voir, rencontrer, se retrouver",cat:"v"},
  {cn:"忘",py:"wàng",fr:"Oublier",cat:"v"},
  {cn:"到",py:"dào",fr:"Arriver, atteindre",cat:"v"},
  // ADJECTIFS
  {cn:"好",py:"hǎo",fr:"Bien, bon",cat:"adj"},
  {cn:"大",py:"dà",fr:"Grand, âgé",cat:"adj"},
  {cn:"小",py:"xiǎo",fr:"Petit, jeune",cat:"adj"},
  {cn:"饿",py:"è",fr:"Avoir faim, affamé",cat:"adj"},
  {cn:"累",py:"lèi",fr:"Être fatigué",cat:"adj"},
  {cn:"好吃",py:"hǎochī",fr:"Délicieux (à manger)",cat:"adj"},
  {cn:"好喝",py:"hǎohē",fr:"Bon à boire",cat:"adj"},
  {cn:"多",py:"duō",fr:"Nombreux, beaucoup",cat:"adj"},
  {cn:"少",py:"shǎo",fr:"Peu, rare",cat:"adj"},
  {cn:"贵",py:"guì",fr:"Cher (prix élevé)",cat:"adj"},
  {cn:"难",py:"nán",fr:"Difficile",cat:"adj"},
  {cn:"新",py:"xīn",fr:"Nouveau, neuf",cat:"adj"},
  {cn:"忙",py:"máng",fr:"Occupé, chargé",cat:"adj"},
  {cn:"冷",py:"lěng",fr:"Froid",cat:"adj"},
  {cn:"热",py:"rè",fr:"Chaud",cat:"adj"},
  {cn:"漂亮",py:"piàoliang",fr:"Beau, jolie, magnifique",cat:"adj"},
  {cn:"不错",py:"bùcuò",fr:"Pas mal, bien, correct",cat:"adj"},
  {cn:"干净",py:"gānjìng",fr:"Propre, net",cat:"adj"},
  {cn:"高兴",py:"gāoxìng",fr:"Content, heureux",cat:"adj"},
  {cn:"不三不四",py:"bù sān bù sì",fr:"Louche, équivoque (personne)",cat:"adj"},
  // NOMS
  {cn:"汉语",py:"hànyǔ",fr:"Langue chinoise parlée",cat:"n"},
  {cn:"中文",py:"zhōngwén",fr:"Langue chinoise écrite",cat:"n"},
  {cn:"书",py:"shū",fr:"Livre",cat:"n"},
  {cn:"人",py:"rén",fr:"Homme, personne, humain",cat:"n"},
  {cn:"老师",py:"lǎoshī",fr:"Professeur, enseignant",cat:"n"},
  {cn:"学生",py:"xuésheng",fr:"Élève, étudiant(e)",cat:"n"},
  {cn:"大学生",py:"dàxuéshēng",fr:"Étudiant universitaire",cat:"n"},
  {cn:"中学生",py:"zhōngxuéshēng",fr:"Collégien / lycéen",cat:"n"},
  {cn:"小学生",py:"xiǎoxuéshēng",fr:"Écolier (primaire)",cat:"n"},
  {cn:"大学",py:"dàxué",fr:"Université",cat:"n"},
  {cn:"中学",py:"zhōngxué",fr:"Collège / lycée",cat:"n"},
  {cn:"小学",py:"xiǎoxué",fr:"École primaire",cat:"n"},
  {cn:"男",py:"nán",fr:"Masculin, homme",cat:"n"},
  {cn:"女",py:"nǚ",fr:"Féminin, femme",cat:"n"},
  {cn:"朋友",py:"péngyou",fr:"Ami(e)",cat:"n"},
  {cn:"男朋友",py:"nán péngyou",fr:"Petit ami, copain",cat:"n"},
  {cn:"女朋友",py:"nǚ péngyou",fr:"Petite amie, copine",cat:"n"},
  {cn:"儿子",py:"érzi",fr:"Fils",cat:"n"},
  {cn:"女儿",py:"nǚ'ér",fr:"Fille (enfant)",cat:"n"},
  {cn:"爸爸",py:"bàba",fr:"Père, papa",cat:"n"},
  {cn:"妈妈",py:"māma",fr:"Mère, maman",cat:"n"},
  {cn:"今天",py:"jīntiān",fr:"Aujourd'hui",cat:"n"},
  {cn:"明天",py:"míngtiān",fr:"Demain",cat:"n"},
  {cn:"昨天",py:"zuótiān",fr:"Hier",cat:"n"},
  {cn:"年",py:"nián",fr:"Année",cat:"n"},
  {cn:"月",py:"yuè",fr:"Mois, lune",cat:"n"},
  {cn:"天",py:"tiān",fr:"Jour, ciel",cat:"n"},
  {cn:"日",py:"rì",fr:"Jour (écrit), soleil",cat:"n"},
  {cn:"号",py:"hào",fr:"Numéro, date du mois",cat:"n"},
  {cn:"星期",py:"xīngqī",fr:"Semaine / jour de la semaine",cat:"n"},
  {cn:"菜",py:"cài",fr:"Légume, plat cuisiné",cat:"n"},
  {cn:"白菜",py:"báicài",fr:"Chou chinois",cat:"n"},
  {cn:"肉",py:"ròu",fr:"Viande",cat:"n"},
  {cn:"鸡",py:"jī",fr:"Poulet, poule, coq",cat:"n"},
  {cn:"鱼",py:"yú",fr:"Poisson",cat:"n"},
  {cn:"水",py:"shuǐ",fr:"Eau",cat:"n"},
  {cn:"面条",py:"miàntiáo",fr:"Nouilles",cat:"n"},
  {cn:"水果",py:"shuǐguǒ",fr:"Fruit(s)",cat:"n"},
  {cn:"苹果",py:"píngguǒ",fr:"Pomme",cat:"n"},
  {cn:"香蕉",py:"xiāngjiāo",fr:"Banane",cat:"n"},
  {cn:"桔子",py:"júzi",fr:"Mandarine",cat:"n"},
  {cn:"中国",py:"zhōngguó",fr:"La Chine",cat:"n"},
  {cn:"法国",py:"fǎguó",fr:"La France",cat:"n"},
  {cn:"美国",py:"měiguó",fr:"Les États-Unis",cat:"n"},
  {cn:"英国",py:"yīngguó",fr:"L'Angleterre",cat:"n"},
  {cn:"日本",py:"rìběn",fr:"Le Japon",cat:"n"},
  {cn:"天气",py:"tiānqì",fr:"Météo, temps",cat:"n"},
  {cn:"生日",py:"shēngrì",fr:"Anniversaire",cat:"n"},
  {cn:"礼物",py:"lǐwù",fr:"Cadeau",cat:"n"},
  {cn:"学校",py:"xuéxiào",fr:"École",cat:"n"},
  {cn:"发音",py:"fāyīn",fr:"Prononciation",cat:"n"},
  {cn:"汉字",py:"hànzì",fr:"Caractères chinois",cat:"n"},
  {cn:"工程师",py:"gōngchéngshī",fr:"Ingénieur",cat:"n"},
  {cn:"城市",py:"chéngshì",fr:"Ville",cat:"n"},
  {cn:"教室",py:"jiàoshì",fr:"Salle de classe",cat:"n"},
  {cn:"图书馆",py:"túshūguǎn",fr:"Bibliothèque",cat:"n"},
  {cn:"食堂",py:"shítáng",fr:"Cantine",cat:"n"},
  {cn:"飞机",py:"fēijī",fr:"Avion",cat:"n"},
  {cn:"机场",py:"jīchǎng",fr:"Aéroport",cat:"n"},
  {cn:"出租车",py:"chūzūchē",fr:"Taxi",cat:"n"},
  {cn:"公交车",py:"gōngjiāochē",fr:"Bus, autobus",cat:"n"},
  {cn:"杂志",py:"zázhì",fr:"Magazine",cat:"n"},
  {cn:"衣服",py:"yīfu",fr:"Vêtements",cat:"n"},
  {cn:"钱",py:"qián",fr:"Argent, monnaie",cat:"n"},
  {cn:"报纸",py:"bàozhǐ",fr:"Journal quotidien",cat:"n"},
  {cn:"书店",py:"shūdiàn",fr:"Librairie",cat:"n"},
  {cn:"医生",py:"yīshēng",fr:"Médecin, docteur",cat:"n"},
  {cn:"北京",py:"běijīng",fr:"Pékin (capitale)",cat:"n"},
  {cn:"名字",py:"míngzi",fr:"Prénom, nom complet",cat:"n"},
  {cn:"地方",py:"dìfang",fr:"Endroit, lieu",cat:"n"},
  {cn:"门口",py:"ménkǒu",fr:"Entrée, porte",cat:"n"},
  {cn:"操场",py:"cāochǎng",fr:"Terrain de sport",cat:"n"},
  {cn:"体育馆",py:"tǐyùguǎn",fr:"Gymnase, salle de sport",cat:"n"},
  // INTERROGATIFS
  {cn:"吗",py:"ma",fr:"Est-ce que… ? (question oui/non)",cat:"int"},
  {cn:"呢",py:"ne",fr:"Et toi ? Et… ? (question retour)",cat:"int"},
  {cn:"什么",py:"shénme",fr:"Quoi, que, qu'est-ce que, quel",cat:"int"},
  {cn:"哪",py:"nǎ",fr:"Lequel, laquelle, lesquels",cat:"int"},
  {cn:"哪儿",py:"nǎr",fr:"Où (lieu)",cat:"int"},
  {cn:"几",py:"jǐ",fr:"Combien ? (nombre ≤ 12)",cat:"int"},
  {cn:"多少",py:"duōshǎo",fr:"Combien ? (nombre > 12 ou prix)",cat:"int"},
  {cn:"谁",py:"shuí",fr:"Qui",cat:"int"},
  {cn:"怎么",py:"zěnme",fr:"Comment",cat:"int"},
  {cn:"怎么样",py:"zěnmeyàng",fr:"Comment c'est ? Qu'en penses-tu ?",cat:"int"},
  {cn:"为什么",py:"wèishénme",fr:"Pourquoi",cat:"int"},
  // PARTICULES & AUTRES
  {cn:"不",py:"bù",fr:"Ne pas (négation présent/futur)",cat:"p"},
  {cn:"没",py:"méi",fr:"Ne pas (négation passé/expérience)",cat:"p"},
  {cn:"没有",py:"méiyǒu",fr:"Ne pas avoir / il n'y a pas",cat:"p"},
  {cn:"很",py:"hěn",fr:"Très (intensificateur)",cat:"p"},
  {cn:"也",py:"yě",fr:"Aussi, également",cat:"p"},
  {cn:"这",py:"zhè",fr:"Ceci (proche du locuteur)",cat:"p"},
  {cn:"那",py:"nà",fr:"Cela (éloigné du locuteur)",cat:"p"},
  {cn:"和",py:"hé",fr:"Et (entre noms et pronoms)",cat:"p"},
  {cn:"可是",py:"kěshì",fr:"Mais (opposition, parlé)",cat:"p"},
  {cn:"但是",py:"dànshì",fr:"Mais, cependant (formel)",cat:"p"},
  {cn:"了",py:"le",fr:"Particule : changement d'état / accompli",cat:"p"},
  {cn:"过",py:"guò",fr:"Particule : expérience passée",cat:"p"},
  {cn:"吧",py:"ba",fr:"Particule : suggestion ou supposition",cat:"p"},
  {cn:"在",py:"zài",fr:"Être à / en train de (lieu + progressif)",cat:"p"},
  {cn:"的",py:"de",fr:"Particule de possession et d'attribution",cat:"p"},
  {cn:"都",py:"dōu",fr:"Tous, tout (sans exception)",cat:"p"},
  {cn:"一起",py:"yīqǐ",fr:"Ensemble",cat:"p"},
  {cn:"可以",py:"kěyǐ",fr:"Pouvoir, être autorisé à",cat:"p"},
  {cn:"真",py:"zhēn",fr:"Vraiment, réellement",cat:"p"},
  {cn:"还",py:"hái",fr:"Encore, en plus, aussi",cat:"p"},
  {cn:"不太",py:"bù tài",fr:"Pas trop (+ adjectif)",cat:"p"},
];

const GR=[
  {ic:"❓",t:"Question avec 吗 (ma)",b:"Question basique",r:"On ajoute 吗 à la fin d'une phrase affirmative pour former une question oui/non. Aucun changement dans l'ordre des mots.",
    ex:[{cn:"他是老师<span class='hl'>吗</span>？",py:"tā shì lǎoshī ma?",fr:"Est-ce qu'il est professeur ?"},{cn:"你好<span class='hl'>吗</span>？",py:"nǐ hǎo ma?",fr:"Tu vas bien ?"}]},
  {ic:"🔴",t:"Négation 不 (bù) et 没 (méi)",b:"Négation",r:"不 (bù) nie les verbes et adjectifs au présent/futur. 没 (méi) nie 有 et les verbes d'expérience/action accomplie.",
    ex:[{cn:"我<span class='hl'>不</span>忙。",py:"wǒ bù máng.",fr:"Je ne suis pas occupé."},{cn:"我<span class='hl'>没</span>去过中国。",py:"wǒ méi qù guò zhōngguó.",fr:"Je ne suis jamais allé en Chine."}]},
  {ic:"⏳",t:"Progressif 在 (zài) + verbe",b:"Aspect",r:"在 placé avant un verbe indique qu'une action est en cours. Équivalent du gérondif français.",
    ex:[{cn:"我<span class='hl'>在</span>学习。",py:"wǒ zài xuéxí.",fr:"Je suis en train d'étudier."},{cn:"他<span class='hl'>在</span>练发音。",py:"tā zài liàn fāyīn.",fr:"Il s'entraîne à la prononciation."}]},
  {ic:"📚",t:"Expérience 过 (guò)",b:"Aspect",r:"过 après un verbe = on a vécu l'expérience de faire qq chose. Négatif : 没 + verbe + 过.",
    ex:[{cn:"我去<span class='hl'>过</span>北京。",py:"wǒ qù guò běijīng.",fr:"Je suis déjà allé à Pékin."},{cn:"我<span class='hl'>没</span>吃<span class='hl'>过</span>这个菜。",py:"wǒ méi chī guò zhège cài.",fr:"Je n'ai jamais mangé ce plat."}]},
  {ic:"💡",t:"Changement d'état 了 (le)",b:"Aspect",r:"了 en fin de phrase indique qu'une situation a changé. Il peut aussi marquer une action accomplie.",
    ex:[{cn:"雨停<span class='hl'>了</span>。",py:"yǔ tíng le.",fr:"La pluie s'est arrêtée."},{cn:"我忘<span class='hl'>了</span>。",py:"wǒ wàng le.",fr:"J'ai oublié."}]},
  {ic:"🔗",t:"Possession avec 的 (de)",b:"Structure",r:"A + 的 + B = le B de A. 的 marque la possession, la description ou la modification d'un nom.",
    ex:[{cn:"我<span class='hl'>的</span>书",py:"wǒ de shū",fr:"Mon livre"},{cn:"老师<span class='hl'>的</span>杂志",py:"lǎoshī de zázhì",fr:"Le magazine du professeur"}]},
  {ic:"🔢",t:"Classifiants 量词 (liàngcí)",b:"Obligatoire",r:"Nombre + classifiant + nom. Chaque type de nom a son classifiant spécifique. Le plus général est 个 (gè).",
    ex:[{cn:"一<span class='hl'>本</span>书 / 两<span class='hl'>支</span>笔",py:"yī běn shū / liǎng zhī bǐ",fr:"Un livre / deux stylos"},{cn:"一<span class='hl'>个</span>人 / 一<span class='hl'>张</span>桌子",py:"yī gè rén / yī zhāng zhuōzi",fr:"Une personne / une table"}]},
  {ic:"🕐",t:"Exprimer l'heure",b:"Heure",r:"X点 = Xh · X分 = Xmin · 一刻 = et quart · 半 = et demie · 差 = moins (avant l'heure)",
    ex:[{cn:"三点<span class='hl'>一刻</span>",py:"sān diǎn yī kè",fr:"3h15 (trois heures et quart)"},{cn:"差一刻<span class='hl'>三点</span>",py:"chà yī kè sān diǎn",fr:"2h45 (trois heures moins le quart)"}]},
];

const NUMS=[["零","líng","0"],["一","yī","1"],["二","èr","2"],["三","sān","3"],["四","sì","4"],["五","wǔ","5"],["六","liù","6"],["七","qī","7"],["八","bā","8"],["九","jiǔ","9"],["十","shí","10"],["百","bǎi","100"]];
const DAYS=[["星期一","xīngqī yī","Lundi"],["星期二","xīngqī èr","Mardi"],["星期三","xīngqī sān","Mercredi"],["星期四","xīngqī sì","Jeudi"],["星期五","xīngqī wǔ","Vendredi"],["星期六","xīngqī liù","Samedi"],["星期日","xīngqī rì","Dimanche"]];
const TONES=[["妈","mā","mère","1er ton ▔"],["麻","má","chanvre","2ème ▲"],["马","mǎ","cheval","3ème ▼▲"],["骂","mà","injurier","4ème ▼"]];
const CATS=[{k:"all",l:"Tout",cn:"全部"},{k:"v",l:"Verbes",cn:"动词"},{k:"adj",l:"Adjectifs",cn:"形容词"},{k:"n",l:"Noms",cn:"名词"},{k:"int",l:"Interrogatifs",cn:"疑问词"},{k:"p",l:"Particules",cn:"其他"}];

function bdgCls(c){return{v:"bdg-v",adj:"bdg-adj",n:"bdg-n",int:"bdg-int",p:"bdg-p"}[c]||"bdg-v";}
function bdgLbl(c){return{v:"Verbe",adj:"Adjectif",n:"Nom",int:"Interrogatif",p:"Particule"}[c]||"?";}
function cnCls(s){return s.length>4?"xl":s.length>3?"lg":"";}
function spCls(s){return{A:"spA",B:"spB",C:"spC",D:"spD"}[s]||"spA";}

export default function App(){
  const [tab,setTab]=useState("home");
  const [lesson,setLesson]=useState(null);
  const [flipped,setFlipped]=useState({});
  const [cat,setCat]=useState("all");
  const [search,setSearch]=useState("");
  const [showPy,setShowPy]=useState(true);
  const [showFr,setShowFr]=useState(true);

  const filtered=useMemo(()=>{
    const s=search.toLowerCase().trim();
    return VV.filter(v=>{
      const cm=cat==="all"||v.cat===cat;
      const sm=!s||v.cn.includes(s)||v.py.toLowerCase().includes(s)||v.fr.toLowerCase().includes(s);
      return cm&&sm;
    });
  },[cat,search]);

  const flippedCount=Object.values(flipped).filter(Boolean).length;
  const pct=Math.min(100,Math.round((flippedCount/VV.length)*100));
  const flip=k=>setFlipped(p=>({...p,[k]:!p[k]}));

  return(<>
    <style>{G}</style>
    <div className="bg-orb orb1"/><div className="bg-orb orb2"/>
    <div className="app">

      <div className="hdr">
        <div className="hdr-top">
          <div className="logo">汉</div>
          <div className="hdr-text">
            <h1>学习汉语 · LC01</h1>
            <p>Cours de chinois mandarin — Niveau 1</p>
          </div>
        </div>
        <div className="tabs">
          {[{k:"home",i:"🏛",l:"Accueil"},{k:"lessons",i:"📖",l:"Cours"},{k:"vocab",i:"🃏",l:"Vocab"},{k:"grammar",i:"✍️",l:"Grammaire"}].map(t=>(
            <button key={t.k} className={`tab ${tab===t.k?"on":""}`} onClick={()=>{setTab(t.k);if(t.k!=="lessons")setLesson(null);}}>
              <span className="tab-i">{t.i}</span>{t.l}
            </button>
          ))}
        </div>
      </div>

      <div className="content">

        {/* HOME */}
        {tab==="home"&&<>
          <div className="hero">
            <div className="hero-tag">中文一级 · Printemps 2020 · NiuNiu Duplain</div>
            <h2>学习汉语</h2>
            <p>Maîtrisez le mandarin pas à pas</p>
            <div className="hero-div"/>
            <div className="hero-meta">
              <span><strong>{LS.length}</strong> Leçons</span>
              <span><strong>{VV.length}</strong> Mots</span>
              <span><strong>{GR.length}</strong> Règles</span>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-n">{VV.filter(v=>v.cat==="v").length}</div><div className="stat-l">动词 Verbes</div></div>
            <div className="stat"><div className="stat-n">{VV.filter(v=>v.cat==="adj").length}</div><div className="stat-l">形容词 Adj.</div></div>
            <div className="stat"><div className="stat-n">{VV.filter(v=>v.cat==="n").length}</div><div className="stat-l">名词 Noms</div></div>
          </div>
          <div className="sl">Leçons du cours</div>
          {LS.map(l=>(
            <div key={l.id} className="lcard" onClick={()=>{setLesson(l);setTab("lessons");}}>
              <div className="lnum">{l.num}</div>
              <div className="linfo"><h3>{l.title}</h3><div className="py">{l.py}</div><div className="sub">{l.sub}</div></div>
              <div className="larr">›</div>
            </div>
          ))}
        </>}

        {/* LESSONS LIST */}
        {tab==="lessons"&&!lesson&&<>
          <div className="sl">Toutes les leçons</div>
          {LS.map(l=>(
            <div key={l.id} className="lcard" onClick={()=>setLesson(l)}>
              <div className="lnum">{l.num}</div>
              <div className="linfo"><h3>{l.title}</h3><div className="py">{l.py}</div><div className="sub">{l.sub}</div></div>
              <div className="larr">›</div>
            </div>
          ))}
        </>}

        {/* LESSON DETAIL */}
        {tab==="lessons"&&lesson&&<>
          <button className="back" onClick={()=>setLesson(null)}>‹ Retour aux leçons</button>
          <div className="lhdr">
            <h2>{lesson.title}</h2>
            <div className="py">{lesson.py}</div>
            <div className="sub">第{lesson.num}课 — {lesson.sub}</div>
          </div>
          <div className="trow">
            <button className={`tbtn ${showPy?"on":""}`} onClick={()=>setShowPy(!showPy)}>📍 Pinyin {showPy?"✓":"○"}</button>
            <button className={`tbtn ${showFr?"on":""}`} onClick={()=>setShowFr(!showFr)}>🇫🇷 Traduction {showFr?"✓":"○"}</button>
          </div>
          <div className="sl">Dialogue</div>
          <div className="dlog">
            {lesson.dl.map((d,i)=>(
              <div key={i} className="dline">
                <div className={`spk ${spCls(d.s)}`}>{d.s}</div>
                <div className="dbub">
                  <div className="dcn">{d.cn}</div>
                  {showPy&&<div className="dpy">{d.py}</div>}
                  {showFr&&<div className="dfr">{d.fr}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="notebox"><p>💡 {lesson.note}</p></div>
        </>}

        {/* VOCAB */}
        {tab==="vocab"&&<>
          <div className="srch-wrap">
            <span className="srch-icon">🔍</span>
            <input placeholder="中文, pinyin ou traduction…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div className="cats">
            {CATS.map(c=>(
              <button key={c.k} className={`catbtn ${cat===c.k?"on":""}`} onClick={()=>setCat(c.k)}>
                <span className="cat-cn">{c.cn}</span> {c.l} ({VV.filter(v=>c.k==="all"||v.cat===c.k).length})
              </button>
            ))}
          </div>
          <div className="pbar"><div className="pfill" style={{width:pct+"%"}}/></div>
          <div className="vcount">{filtered.length} mot{filtered.length!==1?"s":""} · {flippedCount} carte{flippedCount!==1?"s":""} retournée{flippedCount!==1?"s":""} ({pct}%)</div>
          {filtered.length===0
            ?<div style={{textAlign:"center",color:"var(--txt3)",padding:"50px 0",fontStyle:"italic"}}>Aucun résultat pour « {search} »</div>
            :<div className="vgrid">
              {filtered.map((v,i)=>{
                const k=v.cn+"_"+v.cat;
                return(
                  <div key={k} className={`vcard ${flipped[k]?"flp":""} fu`} style={{animationDelay:Math.min(i,15)*0.03+"s"}} onClick={()=>flip(k)}>
                    <div className="vinner">
                      <div className="vf">
                        <div className={`vcn ${cnCls(v.cn)}`}>{v.cn}</div>
                        <div className={`vbdg ${bdgCls(v.cat)}`}>{bdgLbl(v.cat)}</div>
                        <div className="vtap">appuyer ↩</div>
                      </div>
                      <div className="vb">
                        <div className="vb-py">{v.py}</div>
                        <div className={`vb-cn ${cnCls(v.cn)}`}>{v.cn}</div>
                        <div className="vb-fr">{v.fr}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </>}

        {/* GRAMMAR */}
        {tab==="grammar"&&<>
          <div className="sl">Points grammaticaux</div>
          {GR.map((g,i)=>(
            <div key={i} className="gcard">
              <div className="ghead"><div className="gi">{g.ic}</div><div><div className="gtitle">{g.t}</div><div className="gbdg">{g.b}</div></div></div>
              <div className="grule">{g.r}</div>
              {g.ex.map((e,j)=>(
                <div key={j} className="gex">
                  <div className="gex-cn" dangerouslySetInnerHTML={{__html:e.cn}}/>
                  <div className="gex-py">{e.py}</div>
                  <div className="gex-fr">{e.fr}</div>
                </div>
              ))}
            </div>
          ))}
          <div className="gcard">
            <div className="ghead"><div className="gi">🎵</div><div><div className="gtitle">Les 4 tons du mandarin</div><div className="gbdg">Phonologie essentielle</div></div></div>
            <div className="grule">Un même syllabe avec un ton différent = un mot différent ! Les tons sont fondamentaux en mandarin.</div>
            <div className="tonegrid">{TONES.map(([c,p,f,m])=><div key={c} className="tone"><div className="tone-c">{c}</div><div className="tone-p">{p}</div><div className="tone-f">{f}</div><div className="tone-m">{m}</div></div>)}</div>
          </div>
          <div className="gcard">
            <div className="ghead"><div className="gi">🔢</div><div><div className="gtitle">Nombres 零—百</div><div className="gbdg">Chiffres</div></div></div>
            <div className="ngrid">{NUMS.map(([c,p,n])=><div key={c} className="nc"><div className="nc-c">{c}</div><div className="nc-p">{p}</div><div className="nc-n">{n}</div></div>)}</div>
          </div>
          <div className="gcard">
            <div className="ghead"><div className="gi">📅</div><div><div className="gtitle">Jours de la semaine</div><div className="gbdg">星期</div></div></div>
            <div className="daygrid">{DAYS.map(([c,p,f])=><div key={c} className="dayrow"><div className="dy-cn">{c}</div><div className="dy-py">{p}</div><div className="dy-fr">{f}</div></div>)}</div>
          </div>
          <div className="gcard">
            <div className="ghead"><div className="gi">🏷️</div><div><div className="gtitle">Classifiants courants 量词</div><div className="gbdg">Obligatoires</div></div></div>
            <div className="grule">Nombre + classifiant + nom. Chaque type de nom a un classifiant spécifique.</div>
            {[["个","gè","Général — personnes, objets courants"],["本","běn","Livres, cahiers, magazines"],["支","zhī","Objets longs et fins — stylos, baguettes"],["张","zhāng","Objets plats — feuilles, tables, billets"],["件","jiàn","Vêtements, affaires personnelles"],["斤","jīn","Poids 500g — fruits, légumes, viande"],["所","suǒ","Bâtiments, écoles, hôpitaux"],["束","shù","Bouquets de fleurs"]].map(([c,p,f])=>(
              <div key={c} className="gex">
                <div className="gex-cn"><span className="hl">{c}</span> <span style={{fontSize:12,color:"var(--txt2)"}}>({p})</span></div>
                <div className="gex-fr">{f}</div>
              </div>
            ))}
          </div>
          <div className="gcard">
            <div className="ghead"><div className="gi">💰</div><div><div className="gtitle">Monnaie chinoise 人民币</div><div className="gbdg">RMB ¥</div></div></div>
            <div className="grule">Le yuan (元/块) se divise en jiao (角/毛) et fen (分). 1元 = 10角 = 100分</div>
            {[["一块","yī kuài","1 yuan (¥1) — oral"],["一元","yī yuán","1 yuan (¥1) — écrit"],["一角","yī jiǎo","0,10 yuan — oral"],["一毛","yī máo","0,10 yuan — familier"],["一分","yī fēn","0,01 yuan (centime)"]].map(([c,p,f])=>(
              <div key={c} className="gex">
                <div className="gex-cn">{c}</div>
                <div className="gex-py">{p}</div>
                <div className="gex-fr">{f}</div>
              </div>
            ))}
          </div>
        </>}

      </div>
    </div>
  </>);
}
