"use client";

import React, { useState, useEffect, useRef } from "react";

const GALLERY_IMAGES = [
  { src: "/images/20240918_103805.jpg.webp", title: "मंदिर निर्माण दृश्य", category: "construction" },
  { src: "/images/20240918_103811.jpg.webp", title: "गर्भगृह बांधकाम", category: "construction" },
  { src: "/images/20240918_103815.jpg.webp", title: "शिखर उभारणी", category: "construction" },
  { src: "/images/20240918_103819.jpg.webp", title: "सभामंडप प्रगती", category: "construction" },
  { src: "/images/IMG-20240723-WA0028.jpg.webp", title: "धार्मिक विधी व पूजन", category: "puja" },
  { src: "/images/IMG-20240723-WA0029.jpg.webp", title: "स्थानिक भाविक सहभाग", category: "events" },
  { src: "/images/IMG-20240723-WA0030.jpg.webp", title: "शिला पूजन सोहळा", category: "puja" },
  { src: "/images/IMG-20240723-WA0031.jpg.webp", title: "श्रमदान सेवा", category: "events" },
  { src: "/images/IMG-20240723-WA0032.jpg.webp", title: "अन्नदान महाप्रसाद", category: "events" },
  { src: "/images/IMG-20240723-WA0033.jpg.webp", title: "गोशाळा संकल्प", category: "events" },
  { src: "/images/IMG-20240723-WA0034.jpg.webp", title: "कीर्तन व हरिनाम", category: "puja" },
  { src: "/images/IMG-20240723-WA0037.jpg.webp", title: "मंदिर परिसर", category: "construction" },
];

const translations = {
  mr: {
    nav: {
      about: "संस्था",
      origin: "इतिहास",
      vision: "दृष्टी",
      mandir: "मंदिर",
      initiatives: "संकल्पना",
      structure: "निर्माण",
      gallery: "छायाचित्रे",
      gaushala: "गोशाळा",
      seva: "सेवा",
      contact: "संपर्क",
      donate: "देणगी",
    },
    hero: {
      eyebrow: "|| श्री राधे कृष्ण ||",
      titleMr: "श्री राधाकृष्ण प्रेम मंदिर",
      titleSub: "संस्थान (तामथरे)",
      address: "तामथरे (नामपूर), ता. शिंदखेडा, जि. धुळे — महाराष्ट्र",
      line: "प्रेम, भक्ती आणि सेवेचे पवित्र स्थान — निर्माणाधीन",
      btnProgress: "निर्माण प्रगती पहा",
      btnSeva: "सेवा कार्यात सहभागी व्हा",
      status: "सध्या मंदिराचे बांधकाम सुरू आहे — २ एकर क्षेत्रात भव्य मंदिर साकार होत आहे",
    },
    about: {
      eyebrow: "संस्थेबद्दल · About the Trust",
      title: "भक्ती, सेवा आणि समर्पणाचा संकल्प",
      lede: "श्री राधाकृष्ण प्रेम आश्रम चॅरिटेबल ट्रस्ट (नोंदणी क्र. E-819/Dhule दि. 17/08/2021) ही तामथरे (नामपूर), ता. शिंदखेडा, जि. धुळे येथे स्थापन झालेली धार्मिक व सामाजिक न्यास संस्था आहे. राधा-कृष्णाच्या दिव्य प्रेमाचे तत्त्वज्ञान समाजापर्यंत पोहोचवणे आणि भक्ती, सेवा व संस्कार यांच्या माध्यमातून गावाला व परिसराला जोडणारे एक अध्यात्मिक केंद्र उभारणे, हा या संस्थेचा मूळ उद्देश आहे.",
      body: "दानशूर भूमीदाते श्री पुरूषोत्तम जयराम येवले (वाणी) यांनी मंदिरासाठी २ एकर जमीन दान दिली असून, विश्वस्त मंडळ आणि भाविकांच्या अथक प्रयत्नांतून आज मंदिराचे बांधकाम प्रगतीपथावर आहे. पारंपरिक हेमाडपंती व नागर शैलीचा संगम असलेले हे मंदिर, आगामी काळात परिसरातील एक प्रमुख तीर्थक्षेत्र म्हणून नावारूपास येईल असा विश्वास आहे.",
      fact1Label: "संस्था नोंदणी",
      fact1Val: "रजि. क्र. E-819/Dhule (80G सवलत)",
      fact2Label: "स्थान व भूमी",
      fact2Val: "तामथरे/नामपूर (२ एकर जमीन)",
      fact3Label: "मुख्य दैवत",
      fact3Val: "श्री राधाकृष्ण",
    },
    origin: {
      eyebrow: "मूळ इतिहास · Our Origin",
      title: "श्रद्धेच्या एका बीजातून वटवृक्षाकडे",
      lede: "एका लहान भक्तीसभेपासून सुरू झालेला हा प्रवास, आज हजारो भाविकांच्या श्रद्धेचे केंद्र बनण्याच्या दिशेने वाटचाल करत आहे.",
      item1Year: "सुरुवात",
      item1Title: "भक्तीची सुरुवात",
      item1Desc: "गावातील काही श्रद्धाळू भाविकांनी एकत्र येऊन नियमित हरिनाम सप्ताह व भजन सोहळे सुरू केले. हीच पुढे संस्थेच्या स्थापनेची बीजं ठरली.",
      item2Year: "२०२१",
      item2Title: "न्यास नोंदणी",
      item2Desc: "दिनांक १७/०८/२०२१ रोजी औपचारिक विश्वस्त मंडळ स्थापन करून श्री राधाकृष्ण प्रेम आश्रम चॅरिटेबल ट्रस्टची अधिकृत नोंदणी करण्यात आली.",
      item3Year: "शिलान्यास",
      item3Title: "भूमिपूजन व शिलापूजन",
      item3Desc: "दानशूर भूमीदात्यांनी दिलेल्या २ एकर जागेवर विधिवत भूमिपूजन, शिलान्यास व कटीशिला पूजन सोहळा पार पडला आणि प्रत्यक्ष बांधकामाला सुरुवात झाली.",
      item4Year: "आज",
      item4Title: "निर्माणाधीन मंदिर",
      item4Desc: "सध्या मंदिराचे बांधकाम वेगाने सुरू असून, भाविकांच्या देणगी व श्रमदानाच्या सहकार्याने भव्य २ मजली मंदिर साकार होत आहे.",
    },
    vision: {
      eyebrow: "दृष्टी व ध्येय · Vision & Mission",
      title: "आमचा संकल्प",
      card1Title: "दिव्य प्रेमाचा प्रसार",
      card1Desc: "राधा-कृष्णाच्या निस्सीम भक्ती व प्रेमाच्या तत्त्वज्ञानाचा प्रसार सर्व वयोगटांतील भाविकांपर्यंत पोहोचवणे.",
      card2Title: "सांस्कृतिक व संस्कार केंद्र",
      card2Desc: "मंदिर परिसरात कीर्तन, प्रवचन, भागवत सप्ताह व बाल-संस्कार वर्गांच्या माध्यमातून पुढील पिढीला सुसंस्कारित करणे.",
      card3Title: "निःस्वार्थ सेवा",
      card3Desc: "अन्नदान, गोसेवा व गरजू भाविकांसाठी सेवाकार्य राबवून समाजाशी बांधिलकी जपणे.",
      card4Title: "भव्य व शाश्वत मंदिर",
      card4Desc: "पारंपरिक स्थापत्यशैलीत, पुढील अनेक पिढ्यांसाठी टिकणारे भव्य व पवित्र मंदिर उभारणे.",
    },
    mandir: {
      eyebrow: "मंदिर · अधिकृत माहिती व वैशिष्ट्ये",
      title: "मंदिराविषयी व स्थापत्य वैशिष्ट्ये",
      lede: "श्री राधाकृष्ण प्रेम मंदिर हे २ एकर क्षेत्रात उभारले जात असून, एकूण २१,९१९ चौ. फूट बांधकाम क्षेत्र असलेले २ मजली भव्य मंदिर आहे. गर्भगृहात श्री राधाकृष्णाच्या मनमोहक मूर्तींची प्रतिष्ठापना केली जाणार असून खालील भागात आधुनिक म्युझियम (कलादालन) असेल.",
      item1: "मुख्य दैवत: श्री राधाकृष्ण",
      item2: "स्थापत्य शैली: उत्तर भारतीय नागर व महाराष्ट्रीय हेमाडपंती संगम",
      item3: "रचना: गर्भगृह, सभामंडप, २ मजली इमारत व म्युझियम कलादालन",
      item4: "स्थान: तामथरे (नामपूर), ता. शिंदखेडा, जि. धुळे",
      specsTitle: "मंदिराचे मुख्य वैशिष्ट्ये (Official Specs)",
      spec1Val: "२ एकर",
      spec1Label: "एकूण क्षेत्र",
      spec2Val: "२१,९१९",
      spec2Label: "निर्माण क्षेत्र (चौ.फूट)",
      spec3Val: "१३९.८ × १००",
      spec3Label: "लांबी × रुंदी (फूट)",
      spec4Val: "२ मजली",
      spec4Label: "इमारत मजले",
      spec5Val: "७३.५ फूट",
      spec5Label: "शिखर उंची",
      aartiTitle: "दैनंदिन आरती वेळापत्रक (नियोजित)",
      aarti1: "मंगला आरती",
      aarti1Time: "पहाटे ०६:००",
      aarti2: "शृंगार आरती",
      aarti2Time: "सकाळी ०९:००",
      aarti3: "संध्या आरती",
      aarti3Time: "सायंकाळी ०७:००",
      aarti4: "शयन आरती",
      aarti4Time: "रात्री ०९:००",
      aartiNote: "* मंदिर पूर्ण झाल्यानंतर लागू होणारे वेळापत्रक",
    },
    initiatives: {
      eyebrow: "ट्रस्टच्या संकल्पना · Future Initiatives",
      title: "धर्म, शिक्षण व सेवेचे १३ मुख्य संकल्प",
      lede: "श्री राधाकृष्ण प्रेम आश्रम चॅरिटेबल ट्रस्टद्वारे मंदिर उभारणीसोबतच समाजासाठी खालील १३ मुख्य प्रकल्प राबवले जात आहेत.",
      items: [
        { num: "१", title: "ग्रंथालय व म्युझियम", desc: "आध्यात्मिक ग्रंथसंग्रह व मंदिराच्या खालील भागात भव्य कलादालन." },
        { num: "२", title: "आरोग्य केंद्र", desc: "ग्रामीण व गरजू लोकांसाठी वैद्यकीय मदत व आरोग्य सेवा." },
        { num: "३", title: "यज्ञशाळा", desc: "वैदिक अनुष्ठान, होम-हवन व शांतीसाठी सुसज्ज यज्ञशाळा." },
        { num: "४", title: "सत्संग भवन", desc: "कीर्तन, प्रवचन व धार्मिक सभेसाठी भव्य सभामंडप." },
        { num: "५", title: "भक्त निवास", desc: "दूरवरून येणाऱ्या भाविकांसाठी अल्पदरात राहण्याची उत्तम सोय." },
        { num: "६", title: "गो सेवा व गोशाळा", desc: "वृद्ध व आजारी गोमातेसाठी निवारा, चारा व वैद्यकीय निगा." },
        { num: "७", title: "वारकरी गुरुकुल", desc: "वारकरी संप्रदायाचे शिक्षण व संस्कार देणारे गुरुकुल." },
        { num: "८", title: "वृद्धाश्रम", desc: "निराधार ज्येष्ठांसाठी आदरयुक्त निवारा व सांभाळ." },
        { num: "९", title: "अद्यावत व्यायाम शाळा", desc: "तरुणांच्या शारीरिक आरोग्यासाठी आधुनिक क्रीडा व व्यायाम केंद्र." },
        { num: "१०", title: "अन्नक्षेत्र", desc: "नित्य महाप्रसाद व भुकेलेल्यांसाठी मोफत अन्नदान सेवा." },
        { num: "११", title: "वस्तीगृह", desc: "शिक्षणासाठी येणाऱ्या विद्यार्थ्यांसाठी सुरक्षित वस्तीगृह." },
        { num: "१२", title: "युवक कल्याण केंद्र", desc: "युवकांसाठी रोजगार मार्गदर्शन, कौशल्य व संस्कार वर्ग." },
        { num: "१३", title: "गोर-गरीब शिक्षण सोय", desc: "आर्थिकदृष्ट्या दुर्बल विद्यार्थ्यांसाठी मोफत शिक्षण सहाय्य." },
      ],
    },
    structure: {
      eyebrow: "निर्माण प्रगती · Construction Progress",
      title: "विटांपासून कळसापर्यंत — साक्षात उभारणी",
      lede: "प्रत्येक भाविकाच्या योगदानातून, मंदिर पायापासून कळसापर्यंत साकार होत आहे. सद्यस्थिती पहा.",
      overallLabel: "एकूण काम पूर्ण",
      updatedText: "बांधकाम वेगाने सुरू",
      stage1: "पाया (Foundation)",
      stage2: "गर्भगृह व भिंती (Sanctum & Walls)",
      stage3: "सभामंडप (Mandap)",
      stage4: "शिखर (Shikhara Tower)",
      stage5: "कळस व अंतिम सजावट (Kalash & Finishing)",
      footnote: "* मंदिराचे काम वेगाने सुरू असून आपल्या सहकार्याने मंदिर लवकरच पूर्णत्वास येईल.",
    },
    gallery: {
      eyebrow: "छायाचित्रे · Gallery",
      title: "मंदिर निर्माण व विविध प्रसंगांची छायाचित्रे",
      lede: "मंदिराच्या उभारणीतील महत्त्वाचे क्षण, धार्मिक विधी आणि श्री राधाकृष्ण प्रेम मंदिर संस्थानचे उपक्रम.",
      tabAll: "सर्व (All)",
      tabConst: "बांधकाम (Construction)",
      tabPuja: "पूजा व उत्सव (Puja)",
      tabEvents: "कार्यक्रम व सेवा (Events)",
    },
    gaushala: {
      eyebrow: "गोशाळा · Gaushala",
      title: "गोमातेची सेवा — पुण्यकर्माचा मार्ग",
      lede: "श्रीकृष्णाला अत्यंत प्रिय असलेल्या गोमातेच्या सेवेसाठी मंदिर परिसरात गोशाळा उभारण्यात आली आहे. वृद्ध, आजारी व निराधार गायींना आश्रय, चारा व वैद्यकीय सेवा पुरवणे हे या गोशाळेचे मुख्य उद्दिष्ट आहे.",
      stat1Num: "गोसेवा",
      stat1Label: "नित्य उपक्रम",
      stat2Num: "चारा व निवारा",
      stat2Label: "उत्तम व्यवस्था",
      stat3Num: "वैद्यकीय सेवा",
      stat3Label: "पशुवैद्यक देखरेख",
      item1: "दैनंदिन चारा-पाणी व स्वच्छता व्यवस्था",
      item2: "आजारी व जखमी गायींसाठी पशुवैद्यकीय सेवा",
      item3: "भाविकांसाठी गोग्रास व गोसेवा सहभाग संधी",
      btnSeva: "गोसेवेत सहभागी व्हा",
    },
    seva: {
      eyebrow: "सेवा व देणगी · Seva & Donation",
      title: "आपल्या सहभागाने मंदिर साकार होईल",
      lede: "श्री राधाकृष्ण प्रेम मंदिर निर्माण कार्यात व सेवा उपक्रमात आपले योगदान मोलाचे आहे. आयकर अधिनियम १९६१ च्या कलम 80G अंतर्गत देणगीस कर सवलत उपलब्ध आहे.",
      card1Title: "मंदिर निर्माण निधी",
      card1Desc: "शिखर, गर्भगृह, म्युझियम व सभामंडपाच्या बांधकामासाठी थेट योगदान द्या.",
      card2Title: "अन्नदान सेवा",
      card2Desc: "विशेष उत्सव, एकादशी व नित्य अन्नक्षेत्रासाठी महाप्रसादाचे आयोजन.",
      card3Title: "गोसेवा निधी",
      card3Desc: "गोशाळेतील गायींचा चारा, औषधोपचार व निगेसाठी सहकार्य.",
      card4Title: "८०G कर सवलत",
      card4Desc: "ट्रस्टला दिलेल्या सर्व देणग्यांवर आयकर कलम 80G अंतर्गत सवलत उपलब्ध.",
      donateTitle: "अधिकृत बँक खाते तपशील / Official Bank Details",
      trustNameLabel: "ट्रस्टचे नाव",
      trustNameVal: "श्री राधाकृष्ण प्रेम आश्रम चॅरिटेबल ट्रस्ट, तामथरे",
      bankLabel: "बँक नाव",
      bankVal: "CENTRAL BANK OF INDIA (सेंट्रल बँक ऑफ इंडिया)",
      accLabel: "खाते क्रमांक",
      accVal: "5236840945",
      ifscLabel: "IFSC कोड",
      ifscVal: "CBIN0281752",
      regLabel: "ट्रस्ट नोंदणी",
      regVal: "E-819/Dhule (दि. 17/08/2021) | PAN: ABDTS2161E",
      taxLabel: "80G कर सवलत Reg No.",
      taxVal: "ABDTS2161EF20221 (80G Tax Exemption)",
      note: "* देणगी दिल्यानंतर अधिकृत पावतीसाठी कृपया संपर्क साधावा. 80G पावती उपलब्ध.",
      btnContact: "देणगीसाठी संपर्क साधा",
    },
    contact: {
      eyebrow: "संपर्क व विश्वस्त मंडळ · Contact & Info",
      title: "आमच्याशी संपर्क साधून सेवाकार्यात जोडा",
      card1Title: "पत्ता (Address)",
      card1Desc: "श्री राधाकृष्ण प्रेम मंदिर संस्थान\nतामथरे (नामपूर), ता. शिंदखेडा\nजि. धुळे, महाराष्ट्र — ४२५४०८",
      card2Title: "दूरध्वनी (Phone)",
      card2Desc: "+91 9923417082\n+91 8511005554",
      card3Title: "मुख्य पदाधिकारी",
      card3Desc: "संस्थापक अध्यक्ष: ह.भ.प. महेंद्र महाराज\nउपाध्यक्ष: नानासाहेब देवराम पाटील\nसचिव: सतिष पुरूषोत्तम येवले\nखजिनदार: पुरूषोत्तम जयराम येवले",
      card4Title: "बांधकाम समिती",
      card4Desc: "अध्यक्ष: रवींद्रसिंग भटेसिंग राजपूत (सुरत)\nउपाध्यक्ष: राजर्षि कुँवर राजेंद्रसिंह नरूका",
      mapText: "📍 श्री राधाकृष्ण प्रेम मंदिर संस्थान, तामथरे (नामपूर), ता. शिंदखेडा, जि. धुळे",
    },
    footer: {
      sub: "तामथरे (नामपूर), ता. शिंदखेडा, जि. धुळे — महाराष्ट्र",
      rights: "सर्व हक्क राखीव.",
    },
  },
  en: {
    nav: {
      about: "About",
      origin: "History",
      vision: "Vision",
      mandir: "Temple",
      initiatives: "Initiatives",
      structure: "Construction",
      gallery: "Gallery",
      gaushala: "Gaushala",
      seva: "Seva",
      contact: "Contact",
      donate: "Donate",
    },
    hero: {
      eyebrow: "|| Shri Radhe Krishna ||",
      titleMr: "Shri Radhakrishna Prem Mandir",
      titleSub: "Sansthan (Tamathare)",
      address: "Tamathare (Nampoor), Tal. Shindkheda, Dist. Dhule — Maharashtra",
      line: "A Sacred Abode of Love, Devotion & Service — Under Construction",
      btnProgress: "View Construction Progress",
      btnSeva: "Participate in Seva",
      status: "Temple construction is in progress — Erecting a grand shrine across 2 Acres",
    },
    about: {
      eyebrow: "About the Trust · संस्थेबद्दल",
      title: "Pledge of Devotion, Service & Dedication",
      lede: "Shri Radhakrishna Prem Ashram Charitable Trust (Reg. No. E-819/Dhule dated 17/08/2021) is a religious and social trust located in Tamathare (Nampoor), Shindkheda Taluka, Dhule District. The core mission is to spread the teachings of Radha-Krishna and establish a spiritual haven connecting the community.",
      body: "Generous land donor Shri Purushottam Jairam Yewale donated 2 Acres of land for the temple. Blending traditional Hemadpanti and Nagara architectural styles, the temple is being built dynamically into a premier pilgrimage shrine.",
      fact1Label: "Trust Registration",
      fact1Val: "Reg. E-819/Dhule (80G Eligible)",
      fact2Label: "Land & Location",
      fact2Val: "Tamathare/Nampoor (2 Acres)",
      fact3Label: "Deity",
      fact3Val: "Shri Radhakrishna",
    },
    origin: {
      eyebrow: "Our Origin · मूळ इतिहास",
      title: "From a Seed of Faith to a Sacred Shrine",
      lede: "A spiritual journey that started with a modest devotional assembly is now rising into a center of faith for thousands of devotees.",
      item1Year: "Inception",
      item1Title: "Devotional Inception",
      item1Desc: "Devout villagers gathered regularly for Harinam Saptah and Bhajan assemblies, laying the foundation for the trust.",
      item2Year: "2021",
      item2Title: "Trust Registration",
      item2Desc: "On 17/08/2021, the board of trustees officially registered Shri Radhakrishna Prem Ashram Charitable Trust.",
      item3Year: "Foundation",
      item3Title: "Bhoomi & Shila Pujan",
      item3Desc: "On 2 Acres donated land, formal Bhoomi Pujan, Shilanyas, and Katishila Pujan ceremonies were solemnly celebrated.",
      item4Year: "Present",
      item4Title: "Under Construction",
      item4Desc: "Construction is progressing rapidly with voluntary labor (Shramdaan) and generous donations from devotees.",
    },
    vision: {
      eyebrow: "Vision & Mission · दृष्टी व ध्येय",
      title: "Our Sacred Purpose",
      card1Title: "Spreading Divine Love",
      card1Desc: "Promoting the pure devotion and teachings of Radha-Krishna to devotees across all generations.",
      card2Title: "Cultural & Value Center",
      card2Desc: "Nurturing values in young minds through Keertan, Pravachan, Bhagwat Saptah, and youth character workshops.",
      card3Title: "Selfless Service",
      card3Desc: "Serving society through Mahaprasad (free meals), Gaushala cow care, and community aid.",
      card4Title: "Grand Heritage Temple",
      card4Desc: "Erecting an enduring, magnificent temple in traditional architecture for generations to come.",
    },
    mandir: {
      eyebrow: "Temple Specs · अधिकृत माहिती व वैशिष्ट्ये",
      title: "Architecture & Structural Specifications",
      lede: "Shri Radhakrishna Prem Mandir spans across 2 Acres with a total built-up area of 21,919 Sq. Ft. across 2 storeys, featuring a grand sanctum sanctorum and a lower-level Museum & Cultural Gallery.",
      item1: "Primary Deity: Shri Radhakrishna",
      item2: "Architecture: Nagara & Hemadpanti Fusion",
      item3: "Structure: Garbhagriha, Sabha Mandap, 2-Storey & Museum",
      item4: "Location: Tamathare (Nampoor), Tal. Shindkheda, Dist. Dhule",
      specsTitle: "Official Temple Specifications",
      spec1Val: "2 Acres",
      spec1Label: "Campus Area",
      spec2Val: "21,919",
      spec2Label: "Built-up (Sq. Ft.)",
      spec3Val: "139.8 × 100",
      spec3Label: "Length × Width (Ft.)",
      spec4Val: "2 Storey",
      spec4Label: "Building Height",
      spec5Val: "73.5 Ft.",
      spec5Label: "Shikhara Height",
      aartiTitle: "Daily Aarti Schedule (Proposed)",
      aarti1: "Mangala Aarti",
      aarti1Time: "06:00 AM",
      aarti2: "Shringar Aarti",
      aarti2Time: "09:00 AM",
      aarti3: "Sandhya Aarti",
      aarti3Time: "07:00 PM",
      aarti4: "Shayan Aarti",
      aarti4Time: "09:00 PM",
      aartiNote: "* Schedule applicable upon completion of temple construction",
    },
    initiatives: {
      eyebrow: "Future Initiatives · संकल्पना",
      title: "13 Core Social & Spiritual Initiatives",
      lede: "Alongside temple construction, Shri Radhakrishna Prem Ashram Charitable Trust is executing 13 major welfare projects.",
      items: [
        { num: "1", title: "Library & Museum", desc: "Spiritual archives and lower-deck heritage museum gallery." },
        { num: "2", title: "Healthcare Center", desc: "Medical aid and health services for rural communities." },
        { num: "3", title: "Yagnashala", desc: "Equipped hall for Vedic rituals, Yagna, and peace prayers." },
        { num: "4", title: "Satsang Bhavan", desc: "Grand assembly hall for Keertan, discourses, and assemblies." },
        { num: "5", title: "Bhakta Niwas", desc: "Affordable accommodation for visiting pilgrims." },
        { num: "6", title: "Gaushala & Cow Care", desc: "Shelter, feed, and medical care for elder and needy cows." },
        { num: "7", title: "Warkari Gurukul", desc: "Traditional school instilling Warkari values and education." },
        { num: "8", title: "Old Age Home", desc: "Dignified shelter and care for senior citizens." },
        { num: "9", title: "Modern Gymnasium", desc: "Fitness and sports facility for youth well-being." },
        { num: "10", title: "Annakshetra", desc: "Free meal distribution for devotees and the needy." },
        { num: "11", title: "Student Hostel", desc: "Safe residential hostel for students pursuing education." },
        { num: "12", title: "Youth Welfare Center", desc: "Skill development and career guidance for youth." },
        { num: "13", title: "Free Education Support", desc: "Financial educational aid for underprivileged students." },
      ],
    },
    structure: {
      eyebrow: "Construction Progress · निर्माण प्रगती",
      title: "From Bricks to the Golden Spire",
      lede: "With the contributions of every devotee, the temple is rising from foundation to apex. View current progress.",
      overallLabel: "Overall Completion",
      updatedText: "Work progressing rapidly",
      stage1: "Foundation (पाया)",
      stage2: "Sanctum & Walls (गर्भगृह व भिंती)",
      stage3: "Sabha Mandap (सभामंडप)",
      stage4: "Shikhara Tower (शिखर)",
      stage5: "Kalash & Finishing (कळस व सजावट)",
      footnote: "* Construction is moving ahead swiftly and will reach completion with your continued support.",
    },
    gallery: {
      eyebrow: "Gallery · छायाचित्रे",
      title: "Temple Construction & Event Moments",
      lede: "Memorable milestones, religious rites, and community initiatives of Shri Radhakrishna Prem Mandir Sansthan.",
      tabAll: "All Photos",
      tabConst: "Construction",
      tabPuja: "Puja & Rituals",
      tabEvents: "Events & Seva",
    },
    gaushala: {
      eyebrow: "Gaushala · गोशाळा",
      title: "Service to Mother Cow — Path of Virtue",
      lede: "A dedicated Gaushala is established within the temple precinct to care for cows cherished by Lord Krishna. It provides shelter, fodder, and medical care to elder cows.",
      stat1Num: "Cow Care",
      stat1Label: "Daily Rituals",
      stat2Num: "Fodder & Shelter",
      stat2Label: "Top Quality Facilities",
      stat3Num: "Medical Care",
      stat3Label: "Veterinary Oversight",
      item1: "Daily fresh fodder, water, and hygiene management",
      item2: "Veterinary medical care for sick or injured cows",
      item3: "Opportunities for devotees to offer Gogras and Cow Seva",
      btnSeva: "Participate in Gaushala Seva",
    },
    seva: {
      eyebrow: "Seva & Donation · सेवा व देणगी",
      title: "Build the Temple with Your Contribution",
      lede: "Every devotee's contribution plays a crucial role in constructing the temple. All donations are tax-exempt under Section 80G of the Income Tax Act 1961.",
      card1Title: "Temple Construction Fund",
      card1Desc: "Directly support the construction of the Shikhara, Sanctum, Museum, and Sabha Mandap.",
      card2Title: "Annadaan Seva",
      card2Desc: "Sponsor Mahaprasad distribution for devotees on auspicious festivals and Ekadashi.",
      card3Title: "Gaushala Seva Fund",
      card3Desc: "Contribute towards cow feed, medical treatment, and shelter maintenance.",
      card4Title: "80G Tax Benefit",
      card4Desc: "All donations made to the trust are eligible for tax deduction under Section 80G.",
      donateTitle: "Official Bank Account Details",
      trustNameLabel: "Trust Name",
      trustNameVal: "Shri Radhakrishna Prem Ashram Charitable Trust, Tamathare",
      bankLabel: "Bank Name",
      bankVal: "CENTRAL BANK OF INDIA",
      accLabel: "Account Number",
      accVal: "5236840945",
      ifscLabel: "IFSC Code",
      ifscVal: "CBIN0281752",
      regLabel: "Trust Registration",
      regVal: "E-819/Dhule (17/08/2021) | PAN: ABDTS2161E",
      taxLabel: "80G Tax Exemption Reg No.",
      taxVal: "ABDTS2161EF20221 (80G Tax Exemption)",
      note: "* Please contact us after donating to receive your official 80G tax receipt.",
      btnContact: "Contact for Donation",
    },
    contact: {
      eyebrow: "Contact & Info · संपर्क",
      title: "Get in Touch with Us",
      card1Title: "Address",
      card1Desc: "Shri Radhakrishna Prem Mandir Sansthan\nTamathare (Nampoor), Tal. Shindkheda\nDist. Dhule, Maharashtra — 425408",
      card2Title: "Phone Contacts",
      card2Desc: "+91 9923417082\n+91 8511005554",
      card3Title: "Trust Executive Committee",
      card3Desc: "Founder President: H.B.P. Mahendra Maharaj\nVice President: Nanasaheb Devram Patil\nSecretary: Satish Purushottam Yewale\nTreasurer: Purushottam Jairam Yewale",
      card4Title: "Construction Committee",
      card4Desc: "Chairman: Ravindrasingh Bhatesingh Rajput (Surat)\nVice Chairman: Rajarshi Kunwar Rajendrasingh Naruka",
      mapText: "📍 Shri Radhakrishna Prem Mandir Sansthan, Tamathare (Nampoor), Tal. Shindkheda, Dist. Dhule",
    },
    footer: {
      sub: "Tamathare (Nampoor), Tal. Shindkheda, Dist. Dhule — Maharashtra",
      rights: "All Rights Reserved.",
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<"mr" | "en">("mr");
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [archSlide, setArchSlide] = useState(0);
  const ARCH_SLIDES = [
    { src: "/images/mandir-specs.png",          captionMr: "श्री राधाकृष्ण प्रेम मंदिराचे मुख्य वैशिष्ट्ये — आतील व बाहेरील कलाकृती", captionEn: "Shri Radhakrishna Prem Mandir — Interior & Exterior Dome Art" },
    { src: "/images/mandir-3d-elevation.jpg",   captionMr: "श्री राधाकृष्ण प्रेम मंदिराचा ३डी एलीव्हेशन — चारही बाजू",              captionEn: "Shri Radhakrishna Prem Mandir — 3D Elevation All Sides" },
    { src: "/images/mandir-museum-interior.jpg",captionMr: "मंदिराच्या खालील भागातील म्युझियम व आतील कलाकृती",                      captionEn: "Lower-Level Heritage Museum & Interior Artwork" },
  ];

  const progressRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!progressRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgressAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(progressRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredImages =
    activeTab === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== NAV ===== */}
      <header
        className={`site-header ${scrolled ? "shadow-md" : ""}`}
        id="siteHeader"
      >
        <div className="nav-wrap">
          <a href="#hero" className="brand">
            <img
              src="/assets/logo.webp"
              alt="श्री राधाकृष्ण प्रेम मंदिर संस्थान"
              className="brand-logo"
              decoding="async"
            />
            <span className="brand-text">
              <span className="brand-mr">श्री राधाकृष्ण प्रेम मंदिर संस्थान</span>
            </span>
          </a>

          <nav className={`main-nav ${navOpen ? "open" : ""}`} id="mainNav">
            <a href="#about" onClick={() => setNavOpen(false)}>
              {t.nav.about}
            </a>
            <a href="#vision" onClick={() => setNavOpen(false)}>
              {t.nav.vision}
            </a>
            <a href="#mandir" onClick={() => setNavOpen(false)}>
              {t.nav.mandir}
            </a>
            <a href="#initiatives" onClick={() => setNavOpen(false)}>
              {t.nav.initiatives}
            </a>
            <a href="#gaushala" onClick={() => setNavOpen(false)}>
              {t.nav.gaushala}
            </a>
            <a href="#seva" onClick={() => setNavOpen(false)}>
              {t.nav.seva}
            </a>
          </nav>

          <div className="nav-actions">
            {/* LANGUAGE TOGGLE BUTTON */}
            <button
              onClick={() => setLang(lang === "mr" ? "en" : "mr")}
              className="lang-toggle-btn"
              title="Toggle Language / भाषा बदला"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.6 9h16.8M3.6 15h16.8"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"
                ></path>
              </svg>
              <span className={`lang-option ${lang === "mr" ? "active" : "inactive"}`}>
                मराठी
              </span>
              <span>/</span>
              <span className={`lang-option ${lang === "en" ? "active" : "inactive"}`}>
                EN
              </span>
            </button>

            <a href="#seva" className="btn btn-donate">
              {t.nav.donate}
            </a>
          </div>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-bg-glow"></div>
        <div className="hero-inner">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <img
            src="/assets/logo-hero.webp"
            alt="मंदिर बोधचिन्ह"
            className="hero-logo"
            decoding="async"
          />
          <h1 className="hero-title">
            <span className="hero-title-mr">{t.hero.titleMr}</span>
            <span className="hero-title-sub">{t.hero.titleSub}</span>
          </h1>
          <p className="hero-en">Shri Radhakrishna Prem Mandir Sansthan</p>
          <p className="hero-address">{t.hero.address}</p>
          <p className="hero-line">{t.hero.line}</p>
          <div className="hero-actions">
            <a href="#structure" className="btn btn-primary">
              {t.hero.btnProgress}
            </a>
            <a href="#seva" className="btn btn-outline">
              {t.hero.btnSeva}
            </a>
          </div>
          <div className="hero-status">
            <span className="status-dot"></span>
            {t.hero.status}
          </div>
        </div>

        <div className="hero-diya" aria-hidden="true">
          <svg viewBox="0 0 60 90" className="diya-svg">
            <ellipse cx="30" cy="76" rx="26" ry="8" className="diya-base" />
            <path
              d="M6 70 Q30 90 54 70 Q54 58 30 58 Q6 58 6 70Z"
              className="diya-bowl"
            />
            <path
              className="flame"
              d="M30 8 C 20 24, 22 36, 30 42 C 38 36, 40 24, 30 8Z"
            />
            <path
              className="flame-inner"
              d="M30 20 C 26 28, 27 34, 30 37 C 33 34, 34 28, 30 20Z"
            />
          </svg>
        </div>

        <a href="#about" className="scroll-cue" aria-label="Scroll down">
          <span></span>
        </a>
      </section>

      <div className="divider-feather" aria-hidden="true">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0,20 C 200,0 300,40 500,20 C 700,0 800,40 1000,20 C 1100,10 1150,30 1200,20" />
        </svg>
      </div>

      {/* ===== ABOUT / TRUST ===== */}
      <section className="section" id="about">
        <div className="container two-col">
          <div className="col-text">
            <p className="eyebrow eyebrow-left">{t.about.eyebrow}</p>
            <h2 className="section-title">{t.about.title}</h2>
            <p className="lede">{t.about.lede}</p>
            <p className="body-text">{t.about.body}</p>
            <div className="trust-facts">
              <div className="fact">
                <span className="fact-label">{t.about.fact1Label}</span>
                <span className="fact-value">{t.about.fact1Val}</span>
              </div>
              <div className="fact">
                <span className="fact-label">{t.about.fact2Label}</span>
                <span className="fact-value">{t.about.fact2Val}</span>
              </div>
              <div className="fact">
                <span className="fact-label">{t.about.fact3Label}</span>
                <span className="fact-value">{t.about.fact3Val}</span>
              </div>
            </div>
          </div>
          <div className="col-art">
            <div className="art-frame">
              <img
                src="/assets/logo.webp"
                alt="मंदिर संस्थान"
                className="art-logo"
                decoding="async"
              />
            </div>
            <div className="art-mala" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      <div className="divider-om" aria-hidden="true">
        <span>|| श्री ||</span>
      </div>

      {/* ===== FOUNDERS / FOUNDING MEMBERS ===== */}
      <section className="section founders-section" id="founders">
        <div className="container">
          <p className="eyebrow eyebrow-center">
            {lang === "mr" ? "मार्गदर्शक व संस्थापक · Our Founders" : "Spiritual Gurus & Founding Members"}
          </p>
          <h2 className="section-title center">
            {lang === "mr" ? "श्रद्धास्थान व संस्थापक मंडळ" : "Revered Gurus & Founding Committee"}
          </h2>
          <p className="lede center">
            {lang === "mr"
              ? "श्री राधाकृष्ण प्रेम मंदिर संस्थानाच्या उभारणीमागे या दिग्गज मार्गदर्शकांचे आशीर्वाद व संस्थापक सदस्यांचे अपरंपार योगदान आहे."
              : "The blessed guidance of revered spiritual gurus and the tireless contributions of founding members have made this temple possible."}
          </p>

          {/* Full Founders Composite Image */}
          <div style={{
            margin: "36px auto 48px",
            maxWidth: "860px",
            borderRadius: "22px",
            overflow: "hidden",
            border: "4px solid var(--gold)",
            boxShadow: "0 12px 48px rgba(200,130,0,0.22)",
            background: "linear-gradient(135deg, #FFF3C4, #FFE082)",
          }}>
            <img
              src="/images/founders.png"
              alt="श्री राधाकृष्ण प्रेम मंदिर संस्थान — संस्थापक मंडळ"
              style={{ width: "100%", height: "auto", display: "block" }}
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ===== ORIGIN / HISTORY ===== */}

      <section className="section section-tinted" id="origin">
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.origin.eyebrow}</p>
          <h2 className="section-title center">{t.origin.title}</h2>
          <p className="lede center">{t.origin.lede}</p>

          <div className="timeline">
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-content">
                <span className="tl-year">{t.origin.item1Year}</span>
                <h3>{t.origin.item1Title}</h3>
                <p>{t.origin.item1Desc}</p>
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-content">
                <span className="tl-year">{t.origin.item2Year}</span>
                <h3>{t.origin.item2Title}</h3>
                <p>{t.origin.item2Desc}</p>
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-content">
                <span className="tl-year">{t.origin.item3Year}</span>
                <h3>{t.origin.item3Title}</h3>
                <p>{t.origin.item3Desc}</p>
              </div>
            </div>
            <div className="tl-item tl-current">
              <div className="tl-dot"></div>
              <div className="tl-content">
                <span className="tl-year">{t.origin.item4Year}</span>
                <h3>{t.origin.item4Title}</h3>
                <p>{t.origin.item4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISION ===== */}
      <section className="section" id="vision">
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.vision.eyebrow}</p>
          <h2 className="section-title center">{t.vision.title}</h2>
          <div className="vision-grid">
            <div className="vcard">
              <div className="vcard-icon">
                <svg viewBox="0 0 48 48">
                  <path d="M24 4 C 30 16 40 18 44 24 C 40 30 30 32 24 44 C 18 32 8 30 4 24 C 8 18 18 16 24 4Z" />
                </svg>
              </div>
              <h3>{t.vision.card1Title}</h3>
              <p>{t.vision.card1Desc}</p>
            </div>
            <div className="vcard">
              <div className="vcard-icon">
                <svg viewBox="0 0 48 48">
                  <path d="M24 6 L38 14 V26 C38 36 32 42 24 44 C16 42 10 36 10 26 V14 Z" />
                </svg>
              </div>
              <h3>{t.vision.card2Title}</h3>
              <p>{t.vision.card2Desc}</p>
            </div>
            <div className="vcard">
              <div className="vcard-icon">
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="16" r="8" />
                  <path d="M8 42 C 8 30 16 26 24 26 C 32 26 40 30 40 42Z" />
                </svg>
              </div>
              <h3>{t.vision.card3Title}</h3>
              <p>{t.vision.card3Desc}</p>
            </div>
            <div className="vcard">
              <div className="vcard-icon">
                <svg viewBox="0 0 48 48">
                  <path d="M24 4 L28 18 L44 18 L31 27 L36 42 L24 33 L12 42 L17 27 L4 18 L20 18 Z" />
                </svg>
              </div>
              <h3>{t.vision.card4Title}</h3>
              <p>{t.vision.card4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-om" aria-hidden="true">
        <span>|| राधे कृष्ण ||</span>
      </div>

      {/* ===== MANDIR - OFFICIAL INFO & SPECS ===== */}
      <section className="section section-tinted" id="mandir">
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.mandir.eyebrow}</p>
          <h2 className="section-title center">{t.mandir.title}</h2>
          <p className="lede center">{t.mandir.lede}</p>

          {/* ===== ARCHITECTURE SLIDESHOW (BELOW HEADING) ===== */}
          <div style={{ marginTop: "28px", marginBottom: "40px" }}>
            <div className="arch-slideshow">
              <div
                className="arch-slides-track"
                style={{ transform: `translateX(-${archSlide * 100}%)` }}
              >
                {ARCH_SLIDES.map((slide, i) => (
                  <div className="arch-slide" key={i}>
                    <img src={slide.src} alt={slide.captionEn} loading="lazy" decoding="async" />
                    <div className="arch-slide-caption">
                      {lang === "mr" ? slide.captionMr : slide.captionEn}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev button */}
              <button
                className="arch-btn prev"
                onClick={() => setArchSlide(s => (s - 1 + ARCH_SLIDES.length) % ARCH_SLIDES.length)}
                aria-label="Previous slide"
              >
                &#8592;
              </button>

              {/* Next button */}
              <button
                className="arch-btn next"
                onClick={() => setArchSlide(s => (s + 1) % ARCH_SLIDES.length)}
                aria-label="Next slide"
              >
                &#8594;
              </button>
            </div>

            {/* Dots */}
            <div className="arch-dots">
              {ARCH_SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`arch-dot ${archSlide === i ? "active" : ""}`}
                  onClick={() => setArchSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* OFFICIAL MANDIR SPECS GRID */}
          <div className="mb-10">
            <h3 className="text-center text-xl font-bold text-[var(--maroon-deep)] mb-4 font-serif">
              {t.mandir.specsTitle}
            </h3>
            <div className="specs-grid">
              <div className="spec-card">
                <span className="spec-val">{t.mandir.spec1Val}</span>
                <span className="spec-label">{t.mandir.spec1Label}</span>
              </div>
              <div className="spec-card">
                <span className="spec-val">{t.mandir.spec2Val}</span>
                <span className="spec-label">{t.mandir.spec2Label}</span>
              </div>
              <div className="spec-card">
                <span className="spec-val">{t.mandir.spec3Val}</span>
                <span className="spec-label">{t.mandir.spec3Label}</span>
              </div>
              <div className="spec-card">
                <span className="spec-val">{t.mandir.spec4Val}</span>
                <span className="spec-label">{t.mandir.spec4Label}</span>
              </div>
              <div className="spec-card">
                <span className="spec-val">{t.mandir.spec5Val}</span>
                <span className="spec-label">{t.mandir.spec5Label}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== 13 TRUST INITIATIVES SECTION ===== */}
      <section className="section" id="initiatives">
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.initiatives.eyebrow}</p>
          <h2 className="section-title center">{t.initiatives.title}</h2>
          <p className="lede center">{t.initiatives.lede}</p>

          <div className="initiatives-grid">
            {t.initiatives.items.map((item, idx) => (
              <div className="initiative-card" key={idx}>
                <div className="initiative-num">{item.num}</div>
                <div className="initiative-text">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STRUCTURE / CONSTRUCTION PROGRESS ===== */}
      <section className="section section-tinted" id="structure" ref={progressRef}>
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.structure.eyebrow}</p>
          <h2 className="section-title center">{t.structure.title}</h2>
          <p className="lede center">{t.structure.lede}</p>

          <div className="progress-wrap">
            <div className="progress-badge">
              <div
                className="ring"
                style={{
                  background: progressAnimated
                    ? `conic-gradient(var(--saffron) calc(62 * 1%), var(--cream-dark) 0)`
                    : "var(--cream-dark)",
                }}
              >
                <span className="ring-num">62%</span>
                <span className="ring-label">{t.structure.overallLabel}</span>
              </div>
              <p className="progress-updated">{t.structure.updatedText}</p>
            </div>

            <div className="stage-list">
              {[
                { name: t.structure.stage1, pct: 100 },
                { name: t.structure.stage2, pct: 90 },
                { name: t.structure.stage3, pct: 65 },
                { name: t.structure.stage4, pct: 35 },
                { name: t.structure.stage5, pct: 10 },
              ].map((stage, idx) => (
                <div className="stage" key={idx}>
                  <div className="stage-head">
                    <span className="stage-name">{stage.name}</span>
                    <span className="stage-pct">{stage.pct}%</span>
                  </div>
                  <div className="stage-bar">
                    <div
                      className="stage-fill"
                      style={{
                        width: progressAnimated ? `${stage.pct}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="progress-footnote">{t.structure.footnote}</p>
        </div>
      </section>

      {/* ===== PHOTO GALLERY SECTION ===== */}
      <section className="section" id="gallery">
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.gallery.eyebrow}</p>
          <h2 className="section-title center">{t.gallery.title}</h2>
          <p className="lede center">{t.gallery.lede}</p>

          <div className="gallery-tabs-wrap">
            {[
              { id: "all", label: t.gallery.tabAll },
              { id: "construction", label: t.gallery.tabConst },
              { id: "puja", label: t.gallery.tabPuja },
              { id: "events", label: t.gallery.tabEvents },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`gallery-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredImages.map((img, idx) => (
              <div
                key={idx}
                className="gallery-item shadow-sm hover:shadow-md"
                onClick={() => setLightboxImg(img.src)}
              >
                <img src={img.src} alt={img.title} loading="lazy" decoding="async" />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-icon">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxImg(null)}
        >
          <button className="lightbox-close">&times;</button>
          <img
            src={lightboxImg}
            alt="Enlarged view"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ===== GAUSHALA ===== */}
      <section className="section section-tinted" id="gaushala">
        <div className="container two-col gau-two-col">
          <div className="col-text">
            <p className="eyebrow eyebrow-left">{t.gaushala.eyebrow}</p>
            <h2 className="section-title">{t.gaushala.title}</h2>
            <p className="lede">{t.gaushala.lede}</p>
            <div className="gau-stats">
              <div className="gstat">
                <span className="gnum">{t.gaushala.stat1Num}</span>
                <span className="glabel">{t.gaushala.stat1Label}</span>
              </div>
              <div className="gstat">
                <span className="gnum">{t.gaushala.stat2Num}</span>
                <span className="glabel">{t.gaushala.stat2Label}</span>
              </div>
              <div className="gstat">
                <span className="gnum">{t.gaushala.stat3Num}</span>
                <span className="glabel">{t.gaushala.stat3Label}</span>
              </div>
            </div>
            <ul className="info-list">
              <li>{t.gaushala.item1}</li>
              <li>{t.gaushala.item2}</li>
              <li>{t.gaushala.item3}</li>
            </ul>
            <a href="#seva" className="btn btn-primary mt-4">
              {t.gaushala.btnSeva}
            </a>
          </div>
          <div className="col-art">
            <div className="gau-frame">
              <img
                src="/images/cowseva.jpg"
                alt="गोसेवा - Gaushala Cow Seva"
                className="gau-img"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEVA / DONATION ===== */}
      <section className="section" id="seva">
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.seva.eyebrow}</p>
          <h2 className="section-title center">{t.seva.title}</h2>
          <p className="lede center">{t.seva.lede}</p>

          <div className="seva-grid">
            <div className="seva-card">
              <h3>{t.seva.card1Title}</h3>
              <p>{t.seva.card1Desc}</p>
            </div>
            <div className="seva-card">
              <h3>{t.seva.card2Title}</h3>
              <p>{t.seva.card2Desc}</p>
            </div>
            <div className="seva-card">
              <h3>{t.seva.card3Title}</h3>
              <p>{t.seva.card3Desc}</p>
            </div>
            <div className="seva-card">
              <h3>{t.seva.card4Title}</h3>
              <p>{t.seva.card4Desc}</p>
            </div>
          </div>

          <div className="donate-panel">
            <div className="donate-info">
              <h3>{t.seva.donateTitle}</h3>
              <div className="donate-row">
                <span>{t.seva.trustNameLabel}</span>
                <span>{t.seva.trustNameVal}</span>
              </div>
              <div className="donate-row">
                <span>{t.seva.bankLabel}</span>
                <span>{t.seva.bankVal}</span>
              </div>
              <div className="donate-row">
                <span>{t.seva.accLabel}</span>
                <span>{t.seva.accVal}</span>
              </div>
              <div className="donate-row">
                <span>{t.seva.ifscLabel}</span>
                <span>{t.seva.ifscVal}</span>
              </div>
              <div className="donate-row">
                <span>{t.seva.regLabel}</span>
                <span>{t.seva.regVal}</span>
              </div>
              <div className="donate-row">
                <span>{t.seva.taxLabel}</span>
                <span>{t.seva.taxVal}</span>
              </div>
              <p className="donate-note">{t.seva.note}</p>
            </div>
            <a href="#contact" className="btn btn-donate-panel">
              {t.seva.btnContact}
            </a>
          </div>
        </div>
      </section>

      <div className="divider-feather flip" aria-hidden="true">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0,20 C 200,0 300,40 500,20 C 700,0 800,40 1000,20 C 1100,10 1150,30 1200,20" />
        </svg>
      </div>

      {/* ===== CONTACT ===== */}
      <section className="section section-dark" id="contact">
        <div className="container">
          <p className="eyebrow eyebrow-center">{t.contact.eyebrow}</p>
          <h2 className="section-title center">{t.contact.title}</h2>

          <div className="contact-grid">
            <div className="contact-card">
              <h4>{t.contact.card1Title}</h4>
              <p style={{ whiteSpace: "pre-line" }}>{t.contact.card1Desc}</p>
            </div>
            <div className="contact-card">
              <h4>{t.contact.card2Title}</h4>
              <p style={{ whiteSpace: "pre-line" }}>{t.contact.card2Desc}</p>
            </div>
            <div className="contact-card">
              <h4>{t.contact.card3Title}</h4>
              <p style={{ whiteSpace: "pre-line" }}>{t.contact.card3Desc}</p>
            </div>
            <div className="contact-card">
              <h4>{t.contact.card4Title}</h4>
              <p style={{ whiteSpace: "pre-line" }}>{t.contact.card4Desc}</p>
            </div>
          </div>

          <div className="map-placeholder">
            <span>{t.contact.mapText}</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <img
            src="/assets/logo.webp"
            alt="मंदिर बोधचिन्ह"
            className="footer-logo"
            decoding="async"
          />
          <p className="footer-mr">|| श्री राधाकृष्ण प्रेम मंदिर संस्थान ||</p>
          <p className="footer-sub">{t.footer.sub}</p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Shri Radhakrishna Prem Mandir Sansthan. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
