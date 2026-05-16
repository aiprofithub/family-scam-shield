const rules = [
  {
    id: "unknown-link",
    weight: 25,
    label: "Contains an unknown or suspicious link",
    test: (t) => /(https?:\/\/|www\.|bit\.ly|tinyurl|t\.co|shorturl|cutt\.ly|rebrand\.ly|grabify|\.top|\.xyz|\.click|\.work)/i.test(t),
  },
  {
    id: "urgent-pressure",
    weight: 18,
    label: "Creates urgency or pressure to act fast",
    test: (t) => /(urgent|immediately|today only|within 24 hours|final notice|last warning|account will be|expire|suspended|blocked|limited|act now|ด่วน|ทันที|ภายในวันนี้|บัญชีจะถูก|ระงับ)/i.test(t),
  },
  {
    id: "payment-request",
    weight: 18,
    label: "Asks for payment, fee, refund, deposit, or wallet action",
    test: (t) => /(pay|payment|fee|refund|deposit|transfer|wallet|bank account|rm\s?\d+|฿\s?\d+|rp\s?\d+|sgd\s?\d+|php\s?\d+|ชำระ|ค่าธรรมเนียม|โอนเงิน|คืนเงิน)/i.test(t),
  },
  {
    id: "parcel-pattern",
    weight: 14,
    label: "Uses common fake parcel or delivery wording",
    test: (t) => /(parcel|package|delivery|courier|shipment|customs|on hold|redelivery|พัสดุ|ขนส่ง|จัดส่ง|ศุลกากร)/i.test(t),
  },
  {
    id: "credential-request",
    weight: 25,
    label: "Requests login, password, OTP, PIN, or verification code",
    test: (t) => /(password|otp|pin|verification code|login|sign in|verify your account|confirm your identity|รหัสผ่าน|รหัส otp|ยืนยันตัวตน|เข้าสู่ระบบ)/i.test(t),
  },
  {
    id: "too-good",
    weight: 18,
    label: "Promises money, reward, prize, job, investment return, or giveaway",
    test: (t) => /(winner|prize|reward|bonus|giveaway|investment|guaranteed return|easy money|work from home|job offer|earn\s?\$|earn money|free money|รางวัล|โบนัส|ลงทุน|ผลตอบแทน|งานออนไลน์|รายได้เสริม)/i.test(t),
  },
  {
    id: "generic-greeting",
    weight: 8,
    label: "Uses generic greeting or vague identity",
    test: (t) => /(dear customer|dear user|valued customer|hello user|เรียนลูกค้า|ลูกค้าท่านใด|ผู้ใช้บริการ)/i.test(t),
  },
  {
    id: "threat",
    weight: 16,
    label: "Threatens account closure, penalty, legal action, or loss",
    test: (t) => /(legal action|penalty|fine|arrest|lawsuit|account closure|permanently closed|blacklist|ค่าปรับ|ดำเนินคดี|ปิดบัญชี|ขึ้นบัญชีดำ)/i.test(t),
  },
  {
    id: "contact-off-platform",
    weight: 12,
    label: "Pushes you to contact through an unusual number, chat, or external link",
    test: (t) => /(telegram|whatsapp only|line id|contact agent|private chat|แอดไลน์|ติดต่อเจ้าหน้าที่|ทักแชท)/i.test(t),
  },
];

export function analyzeMessage(text) {
  const normalized = text.trim();
  const hits = rules.filter((rule) => rule.test(normalized));

  let score = hits.reduce((sum, rule) => sum + rule.weight, 0);

  // Combinations are more dangerous than isolated signals.
  const hasLink = hits.some((h) => h.id === "unknown-link");
  const hasPayment = hits.some((h) => h.id === "payment-request");
  const hasUrgency = hits.some((h) => h.id === "urgent-pressure");
  const hasCredential = hits.some((h) => h.id === "credential-request");

  if (hasLink && hasPayment) score += 12;
  if (hasLink && hasCredential) score += 15;
  if (hasUrgency && (hasPayment || hasCredential)) score += 10;

  score = Math.min(100, score);

  const level = score >= 80 ? "Critical" : score >= 60 ? "High" : score >= 35 ? "Medium" : "Low";

  const flags = hits.length
    ? hits.map((hit) => hit.label)
    : ["No major scam pattern detected by this simple rule-based MVP"];

  const summary = summaryFor(score, level);

  return {
    score,
    level,
    flags,
    summary,
  };
}

function summaryFor(score, level) {
  if (score >= 80) {
    return `<strong>This message looks highly unsafe.</strong> Do not click links, pay fees, or share codes. Verify only through official channels.`;
  }

  if (score >= 60) {
    return `<strong>This message has multiple warning signs.</strong> Treat it as suspicious until verified through an official app, website, or support channel.`;
  }

  if (score >= 35) {
    return `<strong>This message has some suspicious signs.</strong> Be careful, especially with links, payment requests, or account verification.`;
  }

  return `<strong>No strong scam pattern was found.</strong> That does not prove it is safe. Verify the sender before taking action.`;
}
