export function safeSteps(result) {
  if (result.score >= 60) {
    return [
      "Do not click any link in the message.",
      "Do not share OTP, PIN, password, ID, or bank details.",
      "Open the official app or website directly instead of using the message link.",
      "Contact the company through an official support channel.",
      "Delete or report the message if the sender cannot be verified.",
    ];
  }

  if (result.score >= 35) {
    return [
      "Avoid clicking links until you verify the sender.",
      "Check the official app or website directly.",
      "Do not share private codes or payment details.",
      "Ask a trusted person to review the message if unsure.",
    ];
  }

  return [
    "Still verify the sender through an official channel.",
    "Do not share OTP, PIN, password, or bank details through chat.",
    "Be careful if the sender later asks for money, links, or urgent action.",
  ];
}

export function warningMessage(result, lang = "en") {
  const risk = `${result.level} risk (${result.score}/100)`;

  const messages = {
    en: `Please don’t click this message yet. I checked it and it looks like ${risk}. Open the official app or website directly instead. Do not share OTP, PIN, password, or payment details.`,
    th: `อย่าเพิ่งกดลิงก์นี้นะครับ/ค่ะ ผมเช็กแล้วดูเสี่ยง: ${risk} ให้เปิดแอปหรือเว็บไซต์ทางการเองโดยตรง อย่าส่ง OTP, PIN, รหัสผ่าน หรือข้อมูลชำระเงินให้ใคร`,
    ms: `Jangan klik mesej ini dahulu. Saya semak dan ia nampak seperti ${risk}. Buka aplikasi atau laman web rasmi secara terus. Jangan kongsi OTP, PIN, kata laluan atau maklumat pembayaran.`,
    id: `Jangan klik pesan ini dulu. Saya cek dan risikonya terlihat ${risk}. Buka aplikasi atau situs resmi secara langsung. Jangan bagikan OTP, PIN, kata sandi, atau detail pembayaran.`,
  };

  return messages[lang] || messages.en;
}
