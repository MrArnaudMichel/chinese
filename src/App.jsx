import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Code+Pro:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body { 
    background: #080810; 
    font-family: 'Playfair Display', Georgia, serif;
    color: #f0ead6;
    min-height: 100vh;
  }

  :root {
    --red: #c41e2a;
    --red-glow: #e8233280;
    --gold: #c9a84c;
    --ink: #080810;
    --card: #111118;
    --card2: #16161f;
    --border: #2a2a3a;
    --text: #f0ead6;
    --muted: #7a7a9a;
    --rice: #f5f0e8;
  }

  .app { max-width: 430px; margin: 0 auto; min-height: 100vh; position: relative; }

  /* HEADER */
  .header {
    background: linear-gradient(180deg, #0d0d18 0%, transparent 100%);
    padding: 20px 20px 0;
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(20px);
  }
  .header-top { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .header-logo { 
    width: 42px; height: 42px; 
    background: var(--red);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Noto Serif SC', serif;
    font-size: 20px; font-weight: 700; color: white;
    box-shadow: 0 0 20px var(--red-glow);
  }
  .header-title { flex: 1; }
  .header-title h1 { 
    font-size: 18px; font-weight: 700; color: var(--text);
    font-family: 'Noto Serif SC', serif;
  }
  .header-title p { font-size: 11px; color: var(--muted); font-style: italic; }

  /* NAV TABS */
  .nav-tabs {
    display: flex; gap: 4px;
    background: var(--card);
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 0;
    border: 1px solid var(--border);
  }
  .nav-tab {
    flex: 1; padding: 8px 4px;
    background: transparent; border: none;
    border-radius: 10px;
    color: var(--muted); font-size: 11px;
    font-family: inherit; cursor: pointer;
    transition: all 0.2s;
    display: flex; flex-direction: column; align-items: center; gap: 2px;
  }
  .nav-tab.active { background: var(--red); color: white; box-shadow: 0 0 12px var(--red-glow); }
  .nav-tab-icon { font-size: 16px; }

  /* CONTENT */
  .content { padding: 16px; padding-bottom: 100px; }

  /* HOME */
  .home-banner {
    background: linear-gradient(135deg, #1a0a0f 0%, #0d0d1a 100%);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 16px;
    position: relative; overflow: hidden;
  }
  .home-banner::before {
    content: '漢語';
    position: absolute; right: -10px; top: -20px;
    font-family: 'Noto Serif SC', serif;
    font-size: 100px; font-weight: 700;
    color: rgba(196,30,42,0.08);
    line-height: 1;
    pointer-events: none;
  }
  .home-banner h2 {
    font-family: 'Noto Serif SC', serif;
    font-size: 28px; font-weight: 700;
    color: var(--text); margin-bottom: 4px;
  }
  .home-banner p { color: var(--muted); font-size: 13px; font-style: italic; }
  .home-badge {
    display: inline-block; margin-top: 12px;
    background: var(--red); color: white;
    padding: 4px 12px; border-radius: 20px; font-size: 11px;
    font-weight: 600; letter-spacing: 0.5px;
  }

  .stats-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .stat-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 14px 10px; text-align: center;
  }
  .stat-num { font-size: 24px; font-weight: 700; color: var(--gold); }
  .stat-label { font-size: 10px; color: var(--muted); margin-top: 2px; }

  .section-title {
    font-size: 13px; font-weight: 600; color: var(--muted);
    letter-spacing: 1px; text-transform: uppercase;
    margin-bottom: 10px; margin-top: 20px;
  }

  /* LESSON CARDS */
  .lesson-grid { display: flex; flex-direction: column; gap: 10px; }
  .lesson-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 16px;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; gap: 14px;
  }
  .lesson-card:hover { border-color: var(--red); transform: translateX(2px); }
  .lesson-num {
    width: 40px; height: 40px; border-radius: 12px;
    background: linear-gradient(135deg, var(--red), #8b0000);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Noto Serif SC', serif;
    font-size: 16px; color: white; font-weight: 700;
    flex-shrink: 0; box-shadow: 0 4px 12px var(--red-glow);
  }
  .lesson-info { flex: 1; }
  .lesson-info h3 {
    font-family: 'Noto Serif SC', serif;
    font-size: 16px; color: var(--text); font-weight: 600;
  }
  .lesson-info .pinyin { font-size: 11px; color: var(--gold); font-style: italic; margin-top: 2px; }
  .lesson-info .subtitle { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .lesson-arrow { color: var(--muted); font-size: 18px; }

  /* LESSON DETAIL */
  .back-btn {
    display: flex; align-items: center; gap: 8px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 10px 16px;
    color: var(--muted); font-size: 13px; cursor: pointer;
    margin-bottom: 16px; width: fit-content;
    font-family: inherit;
  }

  .lesson-header {
    background: linear-gradient(135deg, #1a0508 0%, #0d0d1a 100%);
    border: 1px solid var(--border);
    border-radius: 20px; padding: 20px; margin-bottom: 16px;
  }
  .lesson-header h2 {
    font-family: 'Noto Serif SC', serif;
    font-size: 26px; font-weight: 700; color: var(--text);
  }
  .lesson-header .pinyin { color: var(--gold); font-size: 13px; margin-top: 4px; font-style: italic; }
  .lesson-header .subtitle { color: var(--muted); font-size: 12px; margin-top: 4px; font-style: italic; }

  /* DIALOGUE */
  .dialogue { display: flex; flex-direction: column; gap: 12px; }
  .dialogue-line {
    display: flex; gap: 10px; align-items: flex-start;
  }
  .speaker-badge {
    width: 28px; height: 28px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0;
    margin-top: 2px;
  }
  .speaker-A { background: #c41e2a22; color: var(--red); border: 1px solid #c41e2a44; }
  .speaker-B { background: #c9a84c22; color: var(--gold); border: 1px solid #c9a84c44; }
  .speaker-C { background: #4a9eff22; color: #4a9eff; border: 1px solid #4a9eff44; }
  .speaker-D { background: #4aff9e22; color: #4aff9e; border: 1px solid #4aff9e44; }

  .dialogue-bubble {
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 14px; padding: 12px 14px; flex: 1;
  }
  .dialogue-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 17px; color: var(--text); line-height: 1.5;
  }
  .dialogue-pinyin { 
    font-size: 11px; color: var(--gold); margin-top: 4px;
    font-style: italic; font-family: 'Source Code Pro', monospace;
  }
  .dialogue-french { 
    font-size: 12px; color: var(--muted); margin-top: 4px; font-style: italic;
  }

  .note-box {
    background: #1a150a; border: 1px solid #c9a84c44;
    border-left: 3px solid var(--gold);
    border-radius: 12px; padding: 14px;
    margin-top: 16px;
  }
  .note-box p { font-size: 12px; color: #c9a84c; font-style: italic; }

  /* VOCABULARY */
  .vocab-filter {
    display: flex; gap: 6px; overflow-x: auto;
    padding-bottom: 6px; margin-bottom: 14px;
    scrollbar-width: none;
  }
  .vocab-filter::-webkit-scrollbar { display: none; }
  .filter-btn {
    white-space: nowrap; padding: 6px 14px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 20px; color: var(--muted); font-size: 11px;
    cursor: pointer; font-family: inherit; transition: all 0.2s;
  }
  .filter-btn.active { background: var(--red); color: white; border-color: var(--red); }

  .vocab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  
  .vocab-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 0;
    cursor: pointer; 
    height: 120px;
    perspective: 1000px;
  }
  .vocab-card-inner {
    width: 100%; height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    position: relative;
    border-radius: 16px;
  }
  .vocab-card.flipped .vocab-card-inner { transform: rotateY(180deg); }
  
  .card-front, .card-back {
    position: absolute; width: 100%; height: 100%;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border-radius: 16px; 
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 12px; text-align: center;
    border: 1px solid var(--border);
  }
  .card-front { background: var(--card); }
  .card-back { background: linear-gradient(135deg, #1a0508, #0d0d1a); transform: rotateY(180deg); border-color: var(--red); }
  
  .card-char {
    font-family: 'Noto Serif SC', serif;
    font-size: 28px; font-weight: 700; color: var(--text);
    line-height: 1;
  }
  .card-lesson-badge {
    font-size: 9px; color: var(--muted); margin-top: 6px;
  }
  .card-tap { font-size: 9px; color: var(--muted); margin-top: 4px; opacity: 0.6; }
  
  .card-pinyin {
    font-size: 13px; color: var(--gold); font-style: italic;
    font-family: 'Source Code Pro', monospace;
    margin-bottom: 6px;
  }
  .card-char-small {
    font-family: 'Noto Serif SC', serif;
    font-size: 20px; color: var(--text); font-weight: 600;
  }
  .card-french {
    font-size: 11px; color: #a0a0c0; margin-top: 6px; font-style: italic;
    line-height: 1.3;
  }

  /* GRAMMAR */
  .grammar-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 18px; margin-bottom: 12px;
  }
  .grammar-title {
    font-size: 14px; font-weight: 700; color: var(--gold); margin-bottom: 8px;
    display: flex; align-items: center; gap: 8px;
  }
  .grammar-badge {
    background: #c9a84c22; border: 1px solid #c9a84c44;
    border-radius: 6px; padding: 2px 8px; font-size: 10px;
  }
  .grammar-rule { font-size: 13px; color: var(--muted); margin-bottom: 10px; font-style: italic; }
  .grammar-example {
    background: var(--card2); border-radius: 10px; padding: 10px 12px; margin-top: 8px;
  }
  .grammar-chinese {
    font-family: 'Noto Serif SC', serif; font-size: 16px; color: var(--text);
  }
  .grammar-pinyin { font-size: 11px; color: var(--gold); margin-top: 3px; font-style: italic; }
  .grammar-fr { font-size: 11px; color: var(--muted); margin-top: 3px; font-style: italic; }

  .highlight { color: var(--red); font-weight: 700; }

  /* PROGRESS INDICATOR */
  .progress-dots { display: flex; gap: 4px; justify-content: center; margin-top: 8px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border); }
  .dot.active { background: var(--red); }
`;

// ===== DATA =====

const LESSONS = [
  {
    id: 1, num: "一",
    title: "这是王老师", pinyin: "zhè shì wáng lǎoshī",
    subtitle: "Présentation",
    dialogue: [
      { s: "A", cn: "这是王老师，这是我爸爸", py: "zhèshì wáng lǎoshī, zhèshì wǒ bàba", fr: "Voici le professeur Wang, voici mon père." },
      { s: "B", cn: "王老师，您好！很高兴认识您！", py: "wáng lǎoshī, nín hǎo! hěn gāoxìng rènshi nín!", fr: "Professeur Wang, bonjour ! Très heureux de vous connaître !" },
      { s: "C", cn: "请进！请坐！请喝茶！", py: "qǐngjìn! qǐngzuò! qǐng hēchá!", fr: "Entrez ! Asseyez-vous ! Prenez du thé !" },
      { s: "B", cn: "谢谢！", py: "xièxie!", fr: "Merci !" },
      { s: "C", cn: "不客气！", py: "bù kèqi!", fr: "De rien !" },
      { s: "C", cn: "工作忙吗？", py: "gōngzuò máng ma?", fr: "Êtes-vous occupé au travail ?" },
      { s: "B", cn: "不太忙。", py: "bù tài máng.", fr: "Pas trop occupé." },
      { s: "C", cn: "身体好吗？", py: "shēntǐ hǎo ma?", fr: "Vous portez-vous bien ?" },
      { s: "B", cn: "很好！", py: "hěn hǎo!", fr: "Très bien !" },
    ],
    note: "您 (nín) est la forme polie de 你 (nǐ), utilisée pour les personnes âgées ou respectables. 吗 (ma) en fin de phrase forme une question simple.",
  },
  {
    id: 2, num: "二",
    title: "今天三号", pinyin: "jīntiān sān hào",
    subtitle: "Dates et jours",
    dialogue: [
      { s: "A", cn: "今天星期四吗？", py: "jīntiān xīngqīsì ma?", fr: "C'est jeudi aujourd'hui ?" },
      { s: "B", cn: "今天不是星期四，昨天星期四。", py: "jīntiān bùshì xīngqīsì, zuótiān xīngqīsì.", fr: "Aujourd'hui ce n'est pas jeudi, hier c'était jeudi." },
      { s: "A", cn: "今天几号？", py: "jīntiān jǐ hào?", fr: "On est le combien aujourd'hui ?" },
      { s: "B", cn: "九月三号，今天是你的生日！", py: "jiǔyuè sān hào, jīntiān shì nǐ de shēngrì!", fr: "Le 3 septembre, aujourd'hui c'est ton anniversaire !" },
      { s: "A", cn: "啊，我忘了！晚上我们一起吃饭吧？！我请客！", py: "ā, wǒ wàng le! wǎnshang wǒmen yīqǐ chīfàn ba?! wǒ qǐngkè!", fr: "Ah, j'avais oublié ! Ce soir on dîne ensemble ? C'est moi qui invite !" },
      { s: "B", cn: "好啊，咱们几点见？", py: "hǎo a, zánmen jǐdiǎn jiàn?", fr: "D'accord, on se retrouve à quelle heure ?" },
      { s: "A", cn: "晚上七点半在学校门口见。", py: "wǎnshang qīdiǎn bàn zài xuéxiào ménkǒu jiàn.", fr: "Ce soir à sept heures et demie à l'entrée de l'école." },
    ],
    note: "Pour les dates : mois + 号 (hào). Pour les jours : 星期 + chiffre (1-6) ou 星期日 pour dimanche. 咱们 (zánmen) = nous (inclusif, vous + moi).",
  },
  {
    id: 3, num: "三",
    title: "这是什么", pinyin: "zhè shì shénme",
    subtitle: "Identifier les objets",
    dialogue: [
      { s: "A", cn: "这是什么？", py: "zhèshì shénme?", fr: "Qu'est-ce que c'est ?" },
      { s: "B", cn: "这是书。", py: "zhèshì shū.", fr: "C'est un livre." },
      { s: "A", cn: "那是什么？", py: "nàshì shénme?", fr: "Qu'est-ce que c'est là-bas ?" },
      { s: "B", cn: "那是一本杂志。", py: "nàshì yī běn zázhì.", fr: "C'est un magazine." },
      { s: "A", cn: "这是什么书？", py: "zhèshì shénme shū?", fr: "C'est quel genre de livre ?" },
      { s: "B", cn: "这是一本中文书。", py: "zhèshì yī běn zhōngwén shū.", fr: "C'est un livre en chinois." },
      { s: "A", cn: "这是谁的书？", py: "zhèshì shuíde shū?", fr: "À qui appartient ce livre ?" },
      { s: "B", cn: "这是老师的书。", py: "zhèshì lǎoshī de shū.", fr: "C'est le livre du professeur." },
      { s: "A", cn: "那是什么杂志？", py: "nàshì shénme zázhì?", fr: "C'est quel magazine ?" },
      { s: "B", cn: "那是一本英文杂志。", py: "nàshì yī běn yīngwén zázhì.", fr: "C'est un magazine en anglais." },
      { s: "A", cn: "那是谁的杂志？", py: "nàshì shuíde zázhì?", fr: "À qui appartient ce magazine ?" },
      { s: "B", cn: "那是我朋友的杂志。", py: "nàshì wǒ péngyou de zázhì.", fr: "C'est le magazine de mon ami." },
    ],
    note: "这 (zhè) = ceci (proche), 那 (nà) = cela (loin). Les classifiants : 本 (běn) pour les livres, 支 (zhī) pour les stylos, 个 (gè) général.",
  },
  {
    id: 4, num: "四",
    title: "学汉语", pinyin: "xué hànyǔ",
    subtitle: "Apprendre le chinois",
    dialogue: [
      { s: "A", cn: "请问，你是哪国人？", py: "qǐngwèn, nǐ shì nǎ guó rén?", fr: "Excusez-moi, vous êtes de quelle nationalité ?" },
      { s: "B", cn: "我是美国人。", py: "wǒ shì měiguórén.", fr: "Je suis américain." },
      { s: "A", cn: "你学什么？", py: "nǐ xué shénme?", fr: "Qu'est-ce que vous étudiez ?" },
      { s: "B", cn: "我学习汉语。", py: "wǒ xuéxí hànyǔ.", fr: "J'étudie le chinois." },
      { s: "A", cn: "汉语难吗？", py: "hànyǔ nán ma?", fr: "Le chinois est-il difficile ?" },
      { s: "B", cn: "汉语很难，但是发音不太难。", py: "hànyǔ hěn nán, dànshì fāyīn bù tài nán.", fr: "Le chinois est très difficile, mais la prononciation n'est pas trop difficile." },
      { s: "A", cn: "现在，你在做什么？", py: "xiànzài, nǐ zài zuò shénme?", fr: "Que faites-vous en ce moment ?" },
      { s: "B", cn: "我在练发音。", py: "wǒ zài liàn fāyīn.", fr: "Je m'entraîne à la prononciation." },
    ],
    note: "在 + verbe = être en train de faire quelque chose. 不太 (bù tài) = pas trop. 汉语 désigne la langue parlée, 中文 désigne la langue écrite.",
  },
  {
    id: 5, num: "五",
    title: "今天天气不好", pinyin: "jīntiān tiānqì bùhǎo",
    subtitle: "La météo",
    dialogue: [
      { s: "A", cn: "今天天气怎么样？", py: "jīntiān tiānqì zěnmeyàng?", fr: "Comment est la météo aujourd'hui ?" },
      { s: "B", cn: "不好，下雨了，很冷。昨天天气很好，很热。", py: "bùhǎo, xiàyǔ le, hěnlěng. zuótiān tiānqì hěnhǎo, hěnrè.", fr: "Pas bien, il pleut, il fait très froid. Hier la météo était belle, très chaud." },
      { s: "A", cn: "哦，你看，现在雨停了，咱们可以出去了！", py: "o, nǐkàn, xiànzài yǔtíng le, zánmen kěyǐ chūqù le!", fr: "Oh, regarde, la pluie s'est arrêtée, on peut sortir !" },
      { s: "B", cn: "是的。咱们去图书馆吧？", py: "shìde. zánmen qù túshūguǎn bā?", fr: "Oui. On va à la bibliothèque ?" },
      { s: "A", cn: "我去过了。", py: "wǒ qù guò le.", fr: "J'y suis déjà allé." },
      { s: "B", cn: "你去过书店吗？", py: "nǐ qù guò shūdiàn ma?", fr: "Es-tu déjà allé à la librairie ?" },
      { s: "A", cn: "没去过。", py: "méi qù guò.", fr: "Je n'y suis jamais allé." },
      { s: "B", cn: "明天是小王的生日，我想送他两本书。", py: "míngtiān shì xiǎowáng de shēngrì, wǒ xiǎng sòng tā liǎngběn shū.", fr: "Demain c'est l'anniversaire de Xiao Wang, je veux lui offrir deux livres." },
      { s: "A", cn: "哦，我也要送他一个礼物。", py: "o, wǒ yě yào sòng tā yīgè lǐwù.", fr: "Oh, moi aussi je veux lui offrir un cadeau." },
      { s: "B", cn: "好，咱们一起去吧！", py: "hǎo, zánmen yīqǐ qù bā!", fr: "Bien, allons-y ensemble !" },
    ],
    note: "过 (guò) après un verbe exprime l'expérience passée. 了 (le) indique un changement d'état. 可以 (kěyǐ) = pouvoir, être permis.",
  },
  {
    id: 6, num: "六",
    title: "现在几点！", pinyin: "xiànzài jǐdiǎn",
    subtitle: "L'heure",
    dialogue: [
      { s: "A", cn: "小马，现在几点了？", py: "xiǎomǎ, xiànzài jǐdiǎn le?", fr: "Xiao Ma, quelle heure est-il ?" },
      { s: "B", cn: "七点一刻。", py: "qīdiǎn yī kè.", fr: "Sept heures et quart." },
      { s: "A", cn: "哎呀，我八点上课！", py: "āiyā, wǒ bādiǎn shàngkè!", fr: "Aïe, j'ai cours à huit heures !" },
      { s: "B", cn: "快起床吧！", py: "kuài qǐchuáng ba!", fr: "Lève-toi vite !" },
      { s: "A", cn: "好，你今天上午有课吗？", py: "hǎo, nǐ jīntiān shàngwǔ yǒukè ma?", fr: "Bien, tu as cours ce matin ?" },
      { s: "B", cn: "有，我十点十分有课。", py: "yǒu, wǒ shídiǎn shífēn yǒukè.", fr: "Oui, j'ai cours à dix heures dix." },
      { s: "A", cn: "明天我妈妈来北京。", py: "míngtiān wǒ māma lái běijīng.", fr: "Demain ma mère vient à Pékin." },
      { s: "B", cn: "飞机几点到？", py: "fēijī jǐdiǎn dào?", fr: "L'avion arrive à quelle heure ?" },
      { s: "A", cn: "下午三点半。", py: "xiàwǔ sān diǎn bàn.", fr: "Trois heures et demie de l'après-midi." },
      { s: "B", cn: "你去机场吗？", py: "nǐ qù jīchǎng ma?", fr: "Tu vas à l'aéroport ?" },
      { s: "A", cn: "去，我两点出发。", py: "qù, wǒ liǎngdiǎn chūfā.", fr: "Oui, je pars à deux heures." },
    ],
    note: "L'heure : 点 (diǎn) = heure, 分 (fēn) = minute, 刻 (kè) = quart, 半 (bàn) = demi. Exemple : 三点四十五分 = 三点三刻 = 15h45.",
  },
  {
    id: 7, num: "七",
    title: "我们的学校", pinyin: "wǒmen de xuéxiào",
    subtitle: "Décrire l'école",
    dialogue: [
      { s: "A", cn: "我们的学校UTBM是一所工程师科技大学，大家一起说说我们的学校。", py: "wǒmen de xuéxiào UTBM shì yī suǒ gōngchéngshī kējì dàxué, dàjiā yīqǐ shuōshuō.", fr: "Notre école UTBM est une université de technologie d'ingénierie, parlez tous ensemble de notre école." },
      { s: "B", cn: "我们的学校在法国的东边，城市叫BELFORT，是一个工业城市。", py: "wǒmen de xuéxiào zài fǎguó de dōngbian, chéngshì jiào BELFORT, shì yīgè gōngyè chéngshì.", fr: "Notre école est dans l'est de la France, la ville s'appelle Belfort, c'est une ville industrielle." },
      { s: "C", cn: "学校里的学生很多，老师也不少，还有很多留学生。", py: "xuéxiào lǐ de xuésheng hěnduō, lǎoshī yě bùshǎo, háiyǒu hěnduō liúxuéshēng.", fr: "Il y a beaucoup d'étudiants dans l'école, pas peu de professeurs non plus, et aussi beaucoup d'étudiants étrangers." },
      { s: "B", cn: "教学楼很新，教室也很干净，是我们上课的地方。", py: "jiàoxué lóu hěnxīn, jiàoshì yě hěn gānjìng, shì wǒmen shàngkè de dìfang.", fr: "Le bâtiment scolaire est très neuf, les salles de classe sont aussi très propres, c'est là où nous avons cours." },
      { s: "C", cn: "当然，教学楼的右边是图书馆，里边有很多书和杂志。食堂餐厅在它的左边，它的前边是操场和体育馆。", py: "dāngrán, jiàoxué lóu de yòubian shì túshūguǎn, lǐbian yǒu hěnduō shū hé zázhì. shítáng cāntīng zài tāde zuǒbian, tā de qiánbian shì cāochǎng hé tǐyùguǎn.", fr: "Bien sûr, à droite du bâtiment il y a la bibliothèque avec beaucoup de livres et magazines. La cantine est à sa gauche, devant il y a le terrain de sport et le gymnase." },
    ],
    note: "Les directions : 东/西/南/北 (est/ouest/sud/nord) + 边 = côté. 右边/左边/前边/后边 = droite/gauche/devant/derrière.",
  },
  {
    id: 8, num: "八",
    title: "买东西", pinyin: "mǎi dōngxi",
    subtitle: "Faire des courses",
    dialogue: [
      { s: "A", cn: "今天你真漂亮。", py: "jīntiān nǐ zhēn piàoliang.", fr: "Tu es vraiment belle aujourd'hui." },
      { s: "B", cn: "谢谢，你的衣服也很不错，在什么地方买的？", py: "xièxie, nǐde yīfu yě hěn bùcuò, zài shénme dìfang mǎide?", fr: "Merci, tes vêtements sont aussi très bien, tu les as achetés où ?" },
      { s: "A", cn: "在老佛爷买的，你想去买吗？", py: "zài Lǎofóyé mǎide, nǐ xiǎng qù mǎi ma?", fr: "Je les ai achetés aux Galeries Lafayette, tu veux y aller acheter ?" },
      { s: "B", cn: "想，可是我的车坏了，不能开车去了，怎么办？", py: "xiǎng, kěshì wǒde chē huài le, bùnéng kāichē qù le, zěnme bàn?", fr: "Oui, mais ma voiture est en panne, je ne peux pas y aller en voiture, que faire ?" },
      { s: "A", cn: "没关系，咱们可以坐出租车。", py: "méi guānxi, zánmen kěyǐ zuò chūzūchē.", fr: "Pas de problème, on peut prendre un taxi." },
      { s: "A", cn: "我真高兴能买到这件上衣。", py: "wǒ zhēn gāoxìng néng mǎidào zhè jiàn shàngyī.", fr: "Je suis vraiment content d'avoir pu acheter ce haut." },
      { s: "B", cn: "这家商场很大，东西物品也很多，你还想买什么？", py: "zhè jiā shāngchǎng hěn dà, dōngxi wùpǐn yě hěnduō, nǐ hái xiǎng mǎi shénme?", fr: "Ce centre commercial est très grand, il y a beaucoup d'articles, que veux-tu encore acheter ?" },
      { s: "A", cn: "我想买些水果和一束花。", py: "wǒ xiǎng mǎixiē shuǐguǒ hé yī shù huā.", fr: "Je veux acheter quelques fruits et un bouquet de fleurs." },
      { s: "B", cn: "对不起，这里只有水果，没有花。", py: "duìbuqǐ, zhèlǐ zhǐyǒu shuǐguǒ, méiyǒu huā.", fr: "Désolé, ici il n'y a que des fruits, pas de fleurs." },
      { s: "A", cn: "好啊，就买些水果吧！我要一斤苹果和两斤香蕉，一共多少钱？", py: "hǎo a, jiù mǎixiē shuǐguǒ ba! wǒ yào yī jīn píngguǒ hé liǎng jīn xiāngjiāo, yīgòng duōshao qián?", fr: "D'accord, j'achète juste des fruits ! Je veux 500g de pommes et 1kg de bananes, combien en tout ?" },
      { s: "B", cn: "一共十块三角五分。", py: "yīgòng shí kuài sān jiǎo wǔ fēn.", fr: "En tout 10 yuans 35 centimes." },
    ],
    note: "Le système monétaire : 块(元)/角(毛)/分. Prix = 十块三角五分 = 10¥35. 在...买的 indique le lieu d'un achat passé.",
  },
];

const VOCAB = [
  // === Leçon 1 ===
  { l: 1, cn: "您好", py: "nín hǎo", fr: "Bonjour (formel)" },
  { l: 1, cn: "你好", py: "nǐ hǎo", fr: "Bonjour (familier)" },
  { l: 1, cn: "请进", py: "qǐng jìn", fr: "Entrez SVP" },
  { l: 1, cn: "请坐", py: "qǐng zuò", fr: "Asseyez-vous SVP" },
  { l: 1, cn: "请喝茶", py: "qǐng hē chá", fr: "Prenez du thé SVP" },
  { l: 1, cn: "认识", py: "rènshi", fr: "Connaître / faire connaissance" },
  { l: 1, cn: "高兴", py: "gāoxìng", fr: "Content, heureux" },
  { l: 1, cn: "谢谢", py: "xièxie", fr: "Merci" },
  { l: 1, cn: "不客气", py: "bù kèqi", fr: "De rien" },
  { l: 1, cn: "工作", py: "gōngzuò", fr: "Travail / travailler" },
  { l: 1, cn: "忙", py: "máng", fr: "Occupé, chargé" },
  { l: 1, cn: "身体", py: "shēntǐ", fr: "Corps, santé" },
  { l: 1, cn: "爸爸", py: "bàba", fr: "Père, papa" },
  { l: 1, cn: "老师", py: "lǎoshī", fr: "Professeur" },
  { l: 1, cn: "很", py: "hěn", fr: "Très" },
  { l: 1, cn: "不太", py: "bù tài", fr: "Pas trop" },
  // === Leçon 2 ===
  { l: 2, cn: "今天", py: "jīntiān", fr: "Aujourd'hui" },
  { l: 2, cn: "明天", py: "míngtiān", fr: "Demain" },
  { l: 2, cn: "昨天", py: "zuótiān", fr: "Hier" },
  { l: 2, cn: "今年", py: "jīnnián", fr: "Cette année" },
  { l: 2, cn: "明年", py: "míngnián", fr: "L'année prochaine" },
  { l: 2, cn: "去年", py: "qùnián", fr: "L'année dernière" },
  { l: 2, cn: "早上", py: "zǎoshang", fr: "Matin (tôt)" },
  { l: 2, cn: "上午", py: "shàngwǔ", fr: "Avant-midi (matin)" },
  { l: 2, cn: "中午", py: "zhōngwǔ", fr: "Midi" },
  { l: 2, cn: "下午", py: "xiàwǔ", fr: "Après-midi" },
  { l: 2, cn: "晚上", py: "wǎnshang", fr: "Soir, nuit" },
  { l: 2, cn: "星期", py: "xīngqī", fr: "Semaine / jour de la semaine" },
  { l: 2, cn: "生日", py: "shēngrì", fr: "Anniversaire" },
  { l: 2, cn: "一起", py: "yīqǐ", fr: "Ensemble" },
  { l: 2, cn: "吃饭", py: "chīfàn", fr: "Manger un repas" },
  { l: 2, cn: "请客", py: "qǐngkè", fr: "Inviter / payer l'addition" },
  { l: 2, cn: "门口", py: "ménkǒu", fr: "Entrée, porte" },
  { l: 2, cn: "见", py: "jiàn", fr: "Se voir, rencontrer" },
  { l: 2, cn: "半", py: "bàn", fr: "Demi, moitié" },
  { l: 2, cn: "忘", py: "wàng", fr: "Oublier" },
  // === Leçon 3 ===
  { l: 3, cn: "这", py: "zhè", fr: "Ceci (proche)" },
  { l: 3, cn: "那", py: "nà", fr: "Cela (loin)" },
  { l: 3, cn: "什么", py: "shénme", fr: "Quoi, quel" },
  { l: 3, cn: "书", py: "shū", fr: "Livre" },
  { l: 3, cn: "杂志", py: "zázhì", fr: "Magazine" },
  { l: 3, cn: "中文", py: "zhōngwén", fr: "Langue chinoise (écrite)" },
  { l: 3, cn: "英文", py: "yīngwén", fr: "Langue anglaise" },
  { l: 3, cn: "谁", py: "shuí", fr: "Qui" },
  { l: 3, cn: "朋友", py: "péngyou", fr: "Ami" },
  { l: 3, cn: "医生", py: "yīshēng", fr: "Médecin" },
  { l: 3, cn: "医院", py: "yīyuàn", fr: "Hôpital" },
  { l: 3, cn: "本", py: "běn", fr: "Classifiant (livres)" },
  { l: 3, cn: "支", py: "zhī", fr: "Classifiant (stylos)" },
  { l: 3, cn: "个", py: "gè", fr: "Classifiant (général)" },
  { l: 3, cn: "张", py: "zhāng", fr: "Classifiant (feuilles/tables)" },
  // === Leçon 4 ===
  { l: 4, cn: "请问", py: "qǐngwèn", fr: "Excusez-moi / Puis-je demander" },
  { l: 4, cn: "哪国人", py: "nǎ guó rén", fr: "De quelle nationalité" },
  { l: 4, cn: "美国人", py: "měiguórén", fr: "Américain(e)" },
  { l: 4, cn: "中国人", py: "zhōngguórén", fr: "Chinois(e)" },
  { l: 4, cn: "法国人", py: "fǎguórén", fr: "Français(e)" },
  { l: 4, cn: "德国人", py: "déguórén", fr: "Allemand(e)" },
  { l: 4, cn: "汉语", py: "hànyǔ", fr: "Chinois (langue parlée)" },
  { l: 4, cn: "难", py: "nán", fr: "Difficile" },
  { l: 4, cn: "但是", py: "dànshì", fr: "Mais, cependant" },
  { l: 4, cn: "发音", py: "fāyīn", fr: "Prononciation" },
  { l: 4, cn: "现在", py: "xiànzài", fr: "Maintenant" },
  { l: 4, cn: "练", py: "liàn", fr: "S'entraîner, pratiquer" },
  { l: 4, cn: "汉字", py: "hànzì", fr: "Caractères chinois" },
  { l: 4, cn: "学习", py: "xuéxí", fr: "Étudier, apprendre" },
  { l: 4, cn: "名字", py: "míngzi", fr: "Prénom, nom" },
  { l: 4, cn: "姓", py: "xìng", fr: "Nom de famille" },
  // === Leçon 5 ===
  { l: 5, cn: "天气", py: "tiānqì", fr: "Météo, temps" },
  { l: 5, cn: "怎么样", py: "zěnmeyàng", fr: "Comment, comment ça va" },
  { l: 5, cn: "下雨", py: "xiàyǔ", fr: "Pleuvoir" },
  { l: 5, cn: "冷", py: "lěng", fr: "Froid" },
  { l: 5, cn: "热", py: "rè", fr: "Chaud" },
  { l: 5, cn: "停", py: "tíng", fr: "S'arrêter" },
  { l: 5, cn: "可以", py: "kěyǐ", fr: "Pouvoir, être permis" },
  { l: 5, cn: "出去", py: "chūqù", fr: "Sortir" },
  { l: 5, cn: "图书馆", py: "túshūguǎn", fr: "Bibliothèque" },
  { l: 5, cn: "书店", py: "shūdiàn", fr: "Librairie" },
  { l: 5, cn: "想", py: "xiǎng", fr: "Vouloir, penser" },
  { l: 5, cn: "送", py: "sòng", fr: "Offrir, donner" },
  { l: 5, cn: "礼物", py: "lǐwù", fr: "Cadeau" },
  { l: 5, cn: "报纸", py: "bàozhǐ", fr: "Journal (quotidien)" },
  // === Leçon 6 ===
  { l: 6, cn: "几点", py: "jǐ diǎn", fr: "Quelle heure" },
  { l: 6, cn: "一刻", py: "yī kè", fr: "Un quart d'heure" },
  { l: 6, cn: "上课", py: "shàngkè", fr: "Avoir cours, aller en classe" },
  { l: 6, cn: "起床", py: "qǐchuáng", fr: "Se lever (du lit)" },
  { l: 6, cn: "飞机", py: "fēijī", fr: "Avion" },
  { l: 6, cn: "机场", py: "jīchǎng", fr: "Aéroport" },
  { l: 6, cn: "出发", py: "chūfā", fr: "Partir, se mettre en route" },
  { l: 6, cn: "到", py: "dào", fr: "Arriver" },
  { l: 6, cn: "妈妈", py: "māma", fr: "Mère, maman" },
  { l: 6, cn: "来", py: "lái", fr: "Venir" },
  { l: 6, cn: "北京", py: "běijīng", fr: "Pékin" },
  // === Leçon 7 ===
  { l: 7, cn: "学校", py: "xuéxiào", fr: "École" },
  { l: 7, cn: "大学", py: "dàxué", fr: "Université" },
  { l: 7, cn: "工程师", py: "gōngchéngshī", fr: "Ingénieur" },
  { l: 7, cn: "科技", py: "kējì", fr: "Science et technologie" },
  { l: 7, cn: "工业", py: "gōngyè", fr: "Industrie" },
  { l: 7, cn: "城市", py: "chéngshì", fr: "Ville" },
  { l: 7, cn: "学生", py: "xuésheng", fr: "Étudiant(e)" },
  { l: 7, cn: "留学生", py: "liúxuéshēng", fr: "Étudiant étranger" },
  { l: 7, cn: "教室", py: "jiàoshì", fr: "Salle de classe" },
  { l: 7, cn: "干净", py: "gānjìng", fr: "Propre, net" },
  { l: 7, cn: "地方", py: "dìfang", fr: "Endroit, lieu" },
  { l: 7, cn: "右边", py: "yòubian", fr: "Côté droit" },
  { l: 7, cn: "左边", py: "zuǒbian", fr: "Côté gauche" },
  { l: 7, cn: "前边", py: "qiánbian", fr: "Devant" },
  { l: 7, cn: "后边", py: "hòubian", fr: "Derrière" },
  { l: 7, cn: "里边", py: "lǐbian", fr: "À l'intérieur" },
  { l: 7, cn: "食堂", py: "shítáng", fr: "Cantine" },
  { l: 7, cn: "体育馆", py: "tǐyùguǎn", fr: "Gymnase" },
  { l: 7, cn: "操场", py: "cāochǎng", fr: "Terrain de sport" },
  { l: 7, cn: "东", py: "dōng", fr: "Est" },
  { l: 7, cn: "西", py: "xī", fr: "Ouest" },
  { l: 7, cn: "南", py: "nán", fr: "Sud" },
  { l: 7, cn: "北", py: "běi", fr: "Nord" },
  // === Leçon 8 ===
  { l: 8, cn: "漂亮", py: "piàoliang", fr: "Beau, jolie, magnifique" },
  { l: 8, cn: "衣服", py: "yīfu", fr: "Vêtements" },
  { l: 8, cn: "不错", py: "bùcuò", fr: "Pas mal, bien" },
  { l: 8, cn: "可是", py: "kěshì", fr: "Mais (opposition)" },
  { l: 8, cn: "没关系", py: "méi guānxi", fr: "Pas de problème, ça ne fait rien" },
  { l: 8, cn: "出租车", py: "chūzūchē", fr: "Taxi" },
  { l: 8, cn: "公交车", py: "gōngjiāochē", fr: "Bus, autobus" },
  { l: 8, cn: "商场", py: "shāngchǎng", fr: "Centre commercial" },
  { l: 8, cn: "水果", py: "shuǐguǒ", fr: "Fruit(s)" },
  { l: 8, cn: "苹果", py: "píngguǒ", fr: "Pomme" },
  { l: 8, cn: "香蕉", py: "xiāngjiāo", fr: "Banane" },
  { l: 8, cn: "桔子", py: "júzi", fr: "Mandarine" },
  { l: 8, cn: "一共", py: "yīgòng", fr: "Au total, en tout" },
  { l: 8, cn: "钱", py: "qián", fr: "Argent, monnaie" },
  { l: 8, cn: "多少钱", py: "duōshao qián", fr: "Combien ça coûte" },
  { l: 8, cn: "对不起", py: "duìbuqǐ", fr: "Désolé, pardon" },
  { l: 8, cn: "只有", py: "zhǐyǒu", fr: "Il n'y a que, seulement" },
];

const GRAMMAR = [
  {
    title: "La question avec 吗 (ma)",
    badge: "Grammaire de base",
    rule: "On ajoute 吗 à la fin d'une phrase affirmative pour former une question simple.",
    examples: [
      { cn: "你好吗？", py: "nǐ hǎo ma?", fr: "Tu vas bien ?" },
      { cn: "他是老师吗？", py: "tā shì lǎoshī ma?", fr: "Est-ce qu'il est professeur ?" },
    ]
  },
  {
    title: "La négation 不 (bù) et 没 (méi)",
    badge: "Négation",
    rule: "不 (bù) nie les verbes et adjectifs au présent/futur. 没 (méi) nie 有 et les actions passées.",
    examples: [
      { cn: "我不忙。", py: "wǒ bù máng.", fr: "Je ne suis pas occupé." },
      { cn: "我没去过中国。", py: "wǒ méi qù guò zhōngguó.", fr: "Je ne suis jamais allé en Chine." },
    ]
  },
  {
    title: "Le progressif 在 (zài)",
    badge: "Aspect",
    rule: "在 + verbe exprime une action en cours (être en train de faire).",
    examples: [
      { cn: "我在学习。", py: "wǒ zài xuéxí.", fr: "Je suis en train d'étudier." },
      { cn: "他在练发音。", py: "tā zài liàn fāyīn.", fr: "Il est en train de s'entraîner à la prononciation." },
    ]
  },
  {
    title: "L'expérience avec 过 (guò)",
    badge: "Aspect",
    rule: "过 après un verbe indique qu'on a eu l'expérience de faire quelque chose.",
    examples: [
      { cn: "我去过北京。", py: "wǒ qù guò běijīng.", fr: "Je suis déjà allé à Pékin." },
      { cn: "你吃过北京烤鸭吗？", py: "nǐ chī guò běijīng kǎoyā ma?", fr: "As-tu déjà mangé du canard laqué ?" },
    ]
  },
  {
    title: "Le changement d'état 了 (le)",
    badge: "Aspect",
    rule: "了 en fin de phrase indique un changement d'état ou de situation.",
    examples: [
      { cn: "雨停了。", py: "yǔ tíng le.", fr: "La pluie s'est arrêtée." },
      { cn: "我忘了。", py: "wǒ wàng le.", fr: "J'ai oublié." },
    ]
  },
  {
    title: "La possession avec 的 (de)",
    badge: "Structure",
    rule: "A + 的 + B = le B de A. 的 marque la possession ou la modification.",
    examples: [
      { cn: "我的书", py: "wǒ de shū", fr: "Mon livre" },
      { cn: "老师的杂志", py: "lǎoshī de zázhì", fr: "Le magazine du professeur" },
    ]
  },
  {
    title: "Les classifiants (量词)",
    badge: "Classifiants",
    rule: "Entre un nombre et un nom, on doit utiliser un classifiant. Chaque nom a son classifiant.",
    examples: [
      { cn: "一本书 / 两本杂志", py: "yī běn shū / liǎng běn zázhì", fr: "Un livre / deux magazines (本 pour livres)" },
      { cn: "一支笔 / 一个人", py: "yī zhī bǐ / yī gè rén", fr: "Un stylo / une personne" },
    ]
  },
  {
    title: "Exprimer l'heure",
    badge: "Heure",
    rule: "点(diǎn)=heure, 分(fēn)=minute, 刻(kè)=quart, 半(bàn)=demi. 差(chà)=moins.",
    examples: [
      { cn: "三点一刻", py: "sān diǎn yī kè", fr: "3h15 (trois heures et quart)" },
      { cn: "七点半", py: "qī diǎn bàn", fr: "7h30 (sept heures et demie)" },
    ]
  },
  {
    title: "Les questions interrogatives",
    badge: "Questions",
    rule: "什么(shénme)=quoi, 哪(nǎ)=lequel, 谁(shuí)=qui, 几(jǐ)=combien, 怎么(zěnme)=comment",
    examples: [
      { cn: "这是什么？", py: "zhèshì shénme?", fr: "Qu'est-ce que c'est ?" },
      { cn: "你是哪国人？", py: "nǐ shì nǎ guó rén?", fr: "Tu es de quelle nationalité ?" },
    ]
  },
];

// ===== COMPONENT =====

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [flipped, setFlipped] = useState({});
  const [vocabFilter, setVocabFilter] = useState(0);

  const toggleCard = (idx) => {
    setFlipped(p => ({ ...p, [idx]: !p[idx] }));
  };

  const filteredVocab = vocabFilter === 0 ? VOCAB : VOCAB.filter(v => v.l === vocabFilter);

  const speakerColor = (s) => {
    const map = { A: "speaker-A", B: "speaker-B", C: "speaker-C", D: "speaker-D" };
    return map[s] || "speaker-A";
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">
        {/* HEADER */}
        <div className="header">
          <div className="header-top">
            <div className="header-logo">汉</div>
            <div className="header-title">
              <h1>学习汉语 · LC01</h1>
              <p>Cours de chinois — Niveau 1</p>
            </div>
          </div>
          <div className="nav-tabs">
            {[
              { key: "home", icon: "🏠", label: "Accueil" },
              { key: "lessons", icon: "📖", label: "Cours" },
              { key: "vocab", icon: "🃏", label: "Vocab" },
              { key: "grammar", icon: "📐", label: "Grammaire" },
            ].map(t => (
              <button
                key={t.key}
                className={`nav-tab ${tab === t.key ? "active" : ""}`}
                onClick={() => { setTab(t.key); setSelectedLesson(null); }}
              >
                <span className="nav-tab-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ height: 12 }} />
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* HOME */}
          {tab === "home" && (
            <>
              <div className="home-banner">
                <h2>中文一级</h2>
                <p>Bienvenue dans votre cours de mandarin</p>
                <div className="home-badge">Printemps 2020 · NiuNiu Duplain</div>
              </div>

              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-num">8</div>
                  <div className="stat-label">Leçons</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">{VOCAB.length}</div>
                  <div className="stat-label">Mots</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">{GRAMMAR.length}</div>
                  <div className="stat-label">Règles</div>
                </div>
              </div>

              <div className="section-title">Accès rapide</div>
              <div className="lesson-grid">
                {LESSONS.map(l => (
                  <div key={l.id} className="lesson-card" onClick={() => { setTab("lessons"); setSelectedLesson(l); }}>
                    <div className="lesson-num">{l.num}</div>
                    <div className="lesson-info">
                      <h3>{l.title}</h3>
                      <div className="pinyin">{l.pinyin}</div>
                      <div className="subtitle">{l.subtitle}</div>
                    </div>
                    <div className="lesson-arrow">›</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* LESSONS LIST */}
          {tab === "lessons" && !selectedLesson && (
            <>
              <div className="section-title">Toutes les leçons</div>
              <div className="lesson-grid">
                {LESSONS.map(l => (
                  <div key={l.id} className="lesson-card" onClick={() => setSelectedLesson(l)}>
                    <div className="lesson-num">{l.num}</div>
                    <div className="lesson-info">
                      <h3>{l.title}</h3>
                      <div className="pinyin">{l.pinyin}</div>
                      <div className="subtitle">{l.subtitle}</div>
                    </div>
                    <div className="lesson-arrow">›</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* LESSON DETAIL */}
          {tab === "lessons" && selectedLesson && (
            <>
              <button className="back-btn" onClick={() => setSelectedLesson(null)}>
                ‹ Retour
              </button>
              <div className="lesson-header">
                <h2>{selectedLesson.title}</h2>
                <div className="pinyin">{selectedLesson.pinyin}</div>
                <div className="subtitle">第{selectedLesson.num}课 — {selectedLesson.subtitle}</div>
              </div>

              <div className="section-title">Dialogue</div>
              <div className="dialogue">
                {selectedLesson.dialogue.map((line, i) => (
                  <div key={i} className="dialogue-line">
                    <div className={`speaker-badge ${speakerColor(line.s)}`}>{line.s}</div>
                    <div className="dialogue-bubble">
                      <div className="dialogue-chinese">{line.cn}</div>
                      <div className="dialogue-pinyin">{line.py}</div>
                      <div className="dialogue-french">{line.fr}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="note-box">
                <p>💡 {selectedLesson.note}</p>
              </div>

              <div className="section-title" style={{ marginTop: 24 }}>Vocabulaire de la leçon</div>
              <div className="vocab-grid">
                {VOCAB.filter(v => v.l === selectedLesson.id).map((v, i) => {
                  const key = `l${selectedLesson.id}-${i}`;
                  return (
                    <div key={key} className={`vocab-card ${flipped[key] ? "flipped" : ""}`} onClick={() => toggleCard(key)}>
                      <div className="vocab-card-inner">
                        <div className="card-front">
                          <div className="card-char">{v.cn}</div>
                          <div className="card-tap">Appuyer pour révéler</div>
                        </div>
                        <div className="card-back">
                          <div className="card-pinyin">{v.py}</div>
                          <div className="card-char-small">{v.cn}</div>
                          <div className="card-french">{v.fr}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* VOCABULARY */}
          {tab === "vocab" && (
            <>
              <div className="section-title">Cartes vocabulaire</div>
              <div className="vocab-filter">
                <button className={`filter-btn ${vocabFilter === 0 ? "active" : ""}`} onClick={() => setVocabFilter(0)}>
                  Tout ({VOCAB.length})
                </button>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <button key={n} className={`filter-btn ${vocabFilter === n ? "active" : ""}`} onClick={() => setVocabFilter(n)}>
                    Leçon {n} ({VOCAB.filter(v => v.l === n).length})
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14, fontStyle: "italic" }}>
                👆 Appuyez sur une carte pour révéler le pinyin et la traduction
              </p>

              <div className="vocab-grid">
                {filteredVocab.map((v, i) => {
                  const key = `v-${v.l}-${v.cn}`;
                  return (
                    <div key={key} className={`vocab-card ${flipped[key] ? "flipped" : ""}`} onClick={() => toggleCard(key)}>
                      <div className="vocab-card-inner">
                        <div className="card-front">
                          <div className="card-char">{v.cn}</div>
                          <div className="card-lesson-badge">Leçon {v.l}</div>
                          <div className="card-tap">Appuyer pour révéler</div>
                        </div>
                        <div className="card-back">
                          <div className="card-pinyin">{v.py}</div>
                          <div className="card-char-small">{v.cn}</div>
                          <div className="card-french">{v.fr}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* GRAMMAR */}
          {tab === "grammar" && (
            <>
              <div className="section-title">Points de grammaire clés</div>
              {GRAMMAR.map((g, i) => (
                <div key={i} className="grammar-card">
                  <div className="grammar-title">
                    {g.title}
                    <span className="grammar-badge">{g.badge}</span>
                  </div>
                  <div className="grammar-rule">{g.rule}</div>
                  {g.examples.map((ex, j) => (
                    <div key={j} className="grammar-example">
                      <div className="grammar-chinese">{ex.cn}</div>
                      <div className="grammar-pinyin">{ex.py}</div>
                      <div className="grammar-fr">{ex.fr}</div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="grammar-card" style={{ background: "linear-gradient(135deg, #1a0a0f, #0d0d1a)", borderColor: "#c9a84c44" }}>
                <div className="grammar-title" style={{ color: "var(--gold)" }}>
                  🇨🇳 Les 4 tons du mandarin
                  <span className="grammar-badge">Phonologie</span>
                </div>
                <div className="grammar-rule">Le mandarin a 4 tons + 1 ton neutre. Le même son avec un ton différent = mot différent !</div>
                {[
                  { cn: "妈 (mā)", fr: "mère — ton montant" },
                  { cn: "麻 (má)", fr: "chanvre — ton montant" },
                  { cn: "马 (mǎ)", fr: "cheval — ton montant-descendant" },
                  { cn: "骂 (mà)", fr: "injurier — ton descendant" },
                ].map((t, j) => (
                  <div key={j} className="grammar-example">
                    <div className="grammar-chinese">{t.cn}</div>
                    <div className="grammar-fr">{t.fr}</div>
                  </div>
                ))}
              </div>

              <div className="grammar-card">
                <div className="grammar-title">Nombres de 0 à 10</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
                  {[
                    ["零", "líng", "0"], ["一", "yī", "1"], ["二", "èr", "2"], ["三", "sān", "3"],
                    ["四", "sì", "4"], ["五", "wǔ", "5"], ["六", "liù", "6"], ["七", "qī", "7"],
                    ["八", "bā", "8"], ["九", "jiǔ", "9"], ["十", "shí", "10"], ["百", "bǎi", "100"],
                  ].map(([cn, py, num]) => (
                    <div key={cn} className="grammar-example" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 22, color: "var(--text)", width: 30 }}>{cn}</span>
                      <span>
                        <div style={{ fontSize: 11, color: "var(--gold)", fontStyle: "italic" }}>{py}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{num}</div>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grammar-card">
                <div className="grammar-title">Jours de la semaine</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                  {[
                    ["星期一", "xīngqī yī", "Lundi"],
                    ["星期二", "xīngqī èr", "Mardi"],
                    ["星期三", "xīngqī sān", "Mercredi"],
                    ["星期四", "xīngqī sì", "Jeudi"],
                    ["星期五", "xīngqī wǔ", "Vendredi"],
                    ["星期六", "xīngqī liù", "Samedi"],
                    ["星期日", "xīngqī rì", "Dimanche"],
                  ].map(([cn, py, fr]) => (
                    <div key={cn} className="grammar-example" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "var(--text)" }}>{cn}</span>
                      <span style={{ fontSize: 11, color: "var(--gold)", fontStyle: "italic" }}>{py}</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{fr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
