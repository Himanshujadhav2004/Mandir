"use client";

import React, { useState, useEffect, useRef } from "react";

const GALLERY_IMAGES = [
  { src: "/images/20240918_103805.jpg.jpeg", title: "मंदिर निर्माण दृश्य", category: "construction" },
  { src: "/images/20240918_103811.jpg.jpeg", title: "गर्भगृह बांधकाम", category: "construction" },
  { src: "/images/20240918_103815.jpg.jpeg", title: "शिखर उभारणी", category: "construction" },
  { src: "/images/20240918_103819.jpg.jpeg", title: "सभामंडप प्रगती", category: "construction" },
  { src: "/images/IMG-20240723-WA0028.jpg.jpeg", title: "धार्मिक विधी व पूजन", category: "puja" },
  { src: "/images/IMG-20240723-WA0029.jpg.jpeg", title: "स्थानिक भाविक सहभाग", category: "events" },
  { src: "/images/IMG-20240723-WA0030.jpg.jpeg", title: "शिला पूजन सोहळा", category: "puja" },
  { src: "/images/IMG-20240723-WA0031.jpg.jpeg", title: "श्रमदान सेवा", category: "events" },
  { src: "/images/IMG-20240723-WA0032.jpg.jpeg", title: "अन्नदान महाप्रसाद", category: "events" },
  { src: "/images/IMG-20240723-WA0033.jpg.jpeg", title: "गोशाळा संकल्प", category: "events" },
  { src: "/images/IMG-20240723-WA0034.jpg.jpeg", title: "कीर्तन व हरिनाम", category: "puja" },
  { src: "/images/IMG-20240723-WA0037.jpg.jpeg", title: "मंदिर परिसर", category: "construction" },
];

const translations = {
  mr: {
    nav: {
      about: "संस्था",
      origin: "इतिहास",
      vision: "दृष्टी",
      mandir: "मंदिर",
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
      titleSub: "संस्थान",
      address: "नामपूर, ता. शिंदखेडा, जि. धुळे — महाराष्ट्र",
      line: "प्रेम, भक्ती आणि सेवेचे पवित्र स्थान — निर्माणाधीन",
      btnProgress: "निर्माण प्रगती पहा",
      btnSeva: "सेवा कार्यात सहभागी व्हा",
      status: "सध्या मंदिराचे बांधकाम सुरू आहे — आपल्या सहकार्याने भव्य मंदिर साकार होत आहे",
    },
    about: {
      eyebrow: "संस्थेबद्दल · About the Trust",
      title: "भक्ती, सेवा आणि समर्पणाचा संकल्प",
      lede: "श्री राधाकृष्ण प्रेम मंदिर संस्थान ही नामपूर, ता. शिंदखेडा, जि. धुळे येथे स्थापन झालेली धार्मिक व सामाजिक न्यास संस्था आहे. राधा-कृष्णाच्या दिव्य प्रेमाचे तत्त्वज्ञान समाजापर्यंत पोहोचवणे आणि भक्ती, सेवा व संस्कार यांच्या माध्यमातून गावाला व परिसराला जोडणारे एक अध्यात्मिक केंद्र उभारणे, हा या संस्थेचा मूळ उद्देश आहे.",
      body: "विश्वस्त मंडळ आणि गावातील भाविकांच्या अथक प्रयत्नांतून आज मंदिराचे बांधकाम प्रगतीपथावर आहे. पारंपरिक हेमाडपंती व नागर शैलीचा संगम असलेले हे मंदिर, आगामी काळात परिसरातील एक प्रमुख तीर्थक्षेत्र म्हणून नावारूपास येईल असा विश्वास आहे.",
      fact1Label: "संस्था नोंदणी",
      fact1Val: "धार्मिक व सामाजिक न्यास",
      fact2Label: "स्थान",
      fact2Val: "नामपूर, शिंदखेडा (धुळे)",
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
      item2Year: "नोंदणी",
      item2Title: "न्यासाची स्थापना",
      item2Desc: "वाढत्या भाविकसंख्येमुळे व गावाच्या मागणीनुसार औपचारिक विश्वस्त मंडळ स्थापन करून श्री राधाकृष्ण प्रेम मंदिर संस्थानची नोंदणी करण्यात आली.",
      item3Year: "शिलान्यास",
      item3Title: "भूमिपूजन",
      item3Desc: "मंदिरासाठी जागा निश्चित करून विधिवत भूमिपूजन व शिलान्यास सोहळा पार पडला, आणि प्रत्यक्ष बांधकामाला सुरुवात झाली.",
      item4Year: "आज",
      item4Title: "निर्माणाधीन मंदिर",
      item4Desc: "सध्या मंदिराचे बांधकाम प्रगतीपथावर असून, भाविकांच्या देणगी व श्रमदानाच्या सहकार्याने काम वेगाने पुढे सुरू आहे.",
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
      eyebrow: "मंदिर · अधिकृत माहिती",
      title: "मंदिराविषयी",
      lede: "श्री राधाकृष्ण प्रेम मंदिर हे पारंपरिक उत्तर भारतीय नागर व महाराष्ट्रीय हेमाडपंती स्थापत्यकलेचा संगम असलेले मंदिर आहे. गर्भगृहात श्री राधाकृष्णाच्या मनमोहक मूर्तींची प्रतिष्ठापना केली जाणार आहे.",
      item1: "मुख्य दैवत: श्री राधाकृष्ण",
      item2: "स्थापत्यशैली: नागर व हेमाडपंती स्थापत्य",
      item3: "रचना: गर्भगृह, सभामंडप व भव्य शिखर",
      item4: "स्थान: नामपूर, ता. शिंदखेडा, जि. धुळे",
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
      lede: "श्रीकृष्णाला अत्यंत प्रिय असलेल्या गोमातेच्या सेवेसाठी मंदिर परिसरात गोशाळा उभारण्यात येत आहे. वृद्ध, आजारी व निराधार गायींना आश्रय, चारा व वैद्यकीय सेवा पुरवणे हे या गोशाळेचे मुख्य उद्दिष्ट आहे.",
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
      lede: "मंदिर निर्माण कार्यात प्रत्येक भाविकाचे योगदान मोलाचे आहे. खालीलपैकी सेवा-प्रकारांत सहभागी होऊ शकता.",
      card1Title: "मंदिर निर्माण निधी",
      card1Desc: "शिखर, गर्भगृह व सभामंडपाच्या बांधकामासाठी थेट योगदान द्या.",
      card2Title: "अन्नदान सेवा",
      card2Desc: "विशेष उत्सव व एकादशी दिनी भाविकांसाठी महाप्रसादाचे आयोजन.",
      card3Title: "गोसेवा निधी",
      card3Desc: "गोशाळेतील गायींचा चारा, औषधोपचार व निगेसाठी सहयोग.",
      card4Title: "वार्षिक उत्सव सेवा",
      card4Desc: "जन्माष्टमी, राधाष्टमी व होळी महोत्सवाच्या आयोजनात सहभाग.",
      donateTitle: "देणगी तपशील / Bank Details",
      trustNameLabel: "संस्थेचे नाव",
      trustNameVal: "श्री राधाकृष्ण प्रेम मंदिर संस्थान",
      bankLabel: "बँक",
      bankVal: "[स्थानिक बँक नाव]",
      accLabel: "खाते क्रमांक",
      accVal: "[बँक खाते क्रमांक]",
      ifscLabel: "IFSC कोड",
      ifscVal: "[IFSC कोड]",
      upiLabel: "UPI आयडी",
      upiVal: "[UPI ID / QR Code]",
      note: "* देणगी पावतीसाठी कृपया देणगी दिल्यानंतर संपर्क साधावा.",
      btnContact: "देणगीसाठी संपर्क साधा",
    },
    contact: {
      eyebrow: "संपर्क · Contact & Info",
      title: "आमच्याशी संपर्क साधा",
      card1Title: "पत्ता",
      card1Desc: "श्री राधाकृष्ण प्रेम मंदिर संस्थान\nनामपूर, ता. शिंदखेडा\nजि. धुळे, महाराष्ट्र",
      card2Title: "दूरध्वनी / संपर्क",
      card2Desc: "+91 [संपर्क क्रमांक]\nनामपूर, शिंदखेडा (धुळे)",
      card3Title: "ईमेल",
      card3Desc: "contact@radhakrishnamandir.org",
      card4Title: "विश्वस्त मंडळ",
      card4Desc: "श्री राधाकृष्ण प्रेम मंदिर संस्थान न्यास\nनामपूर (शिंदखेडा)",
      mapText: "📍 श्री राधाकृष्ण प्रेम मंदिर संस्थान, नामपूर, ता. शिंदखेडा, जि. धुळे",
    },
    footer: {
      sub: "नामपूर, ता. शिंदखेडा, जि. धुळे — महाराष्ट्र",
      rights: "सर्व हक्क राखीव.",
    },
  },
  en: {
    nav: {
      about: "About",
      origin: "History",
      vision: "Vision",
      mandir: "Temple",
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
      titleSub: "Sansthan",
      address: "Nampoor, Tal. Shindkheda, Dist. Dhule — Maharashtra",
      line: "A Sacred Abode of Love, Devotion & Service — Under Construction",
      btnProgress: "View Construction Progress",
      btnSeva: "Participate in Seva",
      status: "Temple construction is currently in progress — Building a divine shrine with your support",
    },
    about: {
      eyebrow: "About the Trust · संस्थेबद्दल",
      title: "Pledge of Devotion, Service & Dedication",
      lede: "Shri Radhakrishna Prem Mandir Sansthan is a religious and social trust registered in Nampoor, Shindkheda Taluka, Dhule District. The core goal of this organization is to spread the philosophy of divine love of Radha-Krishna and establish a spiritual center connecting the village and surrounding regions.",
      body: "Through the relentless efforts of the trust members and village devotees, temple construction is progressing steadily. Blending traditional Hemadpanti and Nagara architectural styles, this temple is envisioned to become a prominent pilgrimage shrine in the region.",
      fact1Label: "Trust Registration",
      fact1Val: "Religious & Social Trust",
      fact2Label: "Location",
      fact2Val: "Nampoor, Shindkheda (Dhule)",
      fact3Label: "Deity",
      fact3Val: "Shri Radhakrishna",
    },
    origin: {
      eyebrow: "Our Origin · मूळ इतिहास",
      title: "From a Seed of Faith to a Sacred Banyan Tree",
      lede: "A journey that began with a modest devotional gathering is now growing into a center of faith for thousands of devotees.",
      item1Year: "Beginning",
      item1Title: "Devotional Inception",
      item1Desc: "A small group of devout villagers gathered regularly for Harinam Saptah and Bhajan assemblies, sowing the seeds for the foundation of the trust.",
      item2Year: "Registration",
      item2Title: "Trust Formation",
      item2Desc: "Responding to growing participation, an official board of trustees was formed and Shri Radhakrishna Prem Mandir Sansthan was formally registered.",
      item3Year: "Foundation",
      item3Title: "Bhoomi Pujan",
      item3Desc: "Land was finalized and solemn foundation-laying ceremonies (Bhoomi Pujan & Shilanyas) were performed, marking the start of construction.",
      item4Year: "Present",
      item4Title: "Under Construction",
      item4Desc: "Construction is progressing dynamically with generous contributions and voluntary labor (Shramdaan) from devotees.",
    },
    vision: {
      eyebrow: "Vision & Mission · दृष्टी व ध्येय",
      title: "Our Sacred Purpose",
      card1Title: "Spreading Divine Love",
      card1Desc: "Promoting the pure devotion and teachings of Radha-Krishna to devotees across all generations.",
      card2Title: "Cultural & Value Center",
      card2Desc: "Nurturing values in young minds through Keertan, Pravachan, Bhagwat Saptah, and youth character workshops.",
      card3Title: "Selfless Service",
      card3Desc: "Serving society through Mahaprasad (food distribution), Gaushala cow care, and community aid.",
      card4Title: "Grand Heritage Temple",
      card4Desc: "Erecting an enduring, magnificent temple in traditional architecture for generations to come.",
    },
    mandir: {
      eyebrow: "Temple Info · मंदिर अधिकृत माहिती",
      title: "About the Temple",
      lede: "Shri Radhakrishna Prem Mandir combines North Indian Nagara and Maharashtrian Hemadpanti architectural styles. The sanctum sanctorum will house divine idols of Shri Radhakrishna.",
      item1: "Primary Deity: Shri Radhakrishna",
      item2: "Architecture: Nagara & Hemadpanti Style",
      item3: "Structure: Garbhagriha, Sabha Mandap & Grand Shikhara",
      item4: "Location: Nampoor, Tal. Shindkheda, Dist. Dhule",
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
      lede: "A dedicated Gaushala is being established within the temple precinct to care for cows cherished by Lord Krishna. It aims to provide shelter, fodder, and medical care to elder and needy cows.",
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
      lede: "Every devotee's contribution plays a crucial role in constructing the temple. Choose your preferred form of service.",
      card1Title: "Temple Construction Fund",
      card1Desc: "Directly support the construction of the Shikhara, Sanctum, and Sabha Mandap.",
      card2Title: "Annadaan Seva",
      card2Desc: "Sponsor Mahaprasad distribution for devotees on auspicious festivals and Ekadashi.",
      card3Title: "Gaushala Seva Fund",
      card3Desc: "Contribute towards cow feed, medical treatment, and shelter maintenance.",
      card4Title: "Annual Festival Seva",
      card4Desc: "Participate in hosting Janmashtami, Radhashtami, and Holi celebrations.",
      donateTitle: "Donation Details / Bank Details",
      trustNameLabel: "Trust Name",
      trustNameVal: "Shri Radhakrishna Prem Mandir Sansthan",
      bankLabel: "Bank Name",
      bankVal: "[Local Bank Name]",
      accLabel: "Account Number",
      accVal: "[Bank Account Number]",
      ifscLabel: "IFSC Code",
      ifscVal: "[IFSC Code]",
      upiLabel: "UPI ID / QR",
      upiVal: "[UPI ID / QR Code]",
      note: "* Please contact us after donating to receive your official donation receipt.",
      btnContact: "Contact for Donation",
    },
    contact: {
      eyebrow: "Contact & Info · संपर्क",
      title: "Get in Touch with Us",
      card1Title: "Address",
      card1Desc: "Shri Radhakrishna Prem Mandir Sansthan\nNampoor, Tal. Shindkheda\nDist. Dhule, Maharashtra",
      card2Title: "Phone / Contact",
      card2Desc: "+91 [Contact Number]\nNampoor, Shindkheda (Dhule)",
      card3Title: "Email",
      card3Desc: "contact@radhakrishnamandir.org",
      card4Title: "Trust Board",
      card4Desc: "Shri Radhakrishna Prem Mandir Sansthan Trust\nNampoor (Shindkheda)",
      mapText: "📍 Shri Radhakrishna Prem Mandir Sansthan, Nampoor, Tal. Shindkheda, Dist. Dhule",
    },
    footer: {
      sub: "Nampoor, Tal. Shindkheda, Dist. Dhule — Maharashtra",
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
              src="/assets/logo.jpg"
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
            src="/assets/logo-hero.jpg"
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
                src="/assets/logo.jpg"
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

      {/* ===== MANDIR - OFFICIAL INFO ===== */}
      <section className="section section-tinted" id="mandir">
        <div className="container two-col reverse">
          <div className="col-art">
            <div className="deity-frame">
              <div className="deity-arch">
                <span className="deity-names">श्री राधाकृष्ण</span>
              </div>
            </div>
          </div>
          <div className="col-text">
            <p className="eyebrow eyebrow-left">{t.mandir.eyebrow}</p>
            <h2 className="section-title">{t.mandir.title}</h2>
            <p className="lede">{t.mandir.lede}</p>

            <ul className="info-list">
              <li>{t.mandir.item1}</li>
              <li>{t.mandir.item2}</li>
              <li>{t.mandir.item3}</li>
              <li>{t.mandir.item4}</li>
            </ul>

            <div className="aarti-card">
              <h4>{t.mandir.aartiTitle}</h4>
              <div className="aarti-row">
                <span>{t.mandir.aarti1}</span>
                <span>{t.mandir.aarti1Time}</span>
              </div>
              <div className="aarti-row">
                <span>{t.mandir.aarti2}</span>
                <span>{t.mandir.aarti2Time}</span>
              </div>
              <div className="aarti-row">
                <span>{t.mandir.aarti3}</span>
                <span>{t.mandir.aarti3Time}</span>
              </div>
              <div className="aarti-row">
                <span>{t.mandir.aarti4}</span>
                <span>{t.mandir.aarti4Time}</span>
              </div>
              <p className="aarti-note">{t.mandir.aartiNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STRUCTURE / CONSTRUCTION PROGRESS ===== */}
      <section className="section" id="structure" ref={progressRef}>
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
      <section className="section section-tinted" id="gallery">
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
      <section className="section" id="gaushala">
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
      <section className="section section-tinted" id="seva">
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
                <span>{t.seva.upiLabel}</span>
                <span>{t.seva.upiVal}</span>
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
            src="/assets/logo.jpg"
            alt="मंदिर बोधचिन्ह"
            className="footer-logo"
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
