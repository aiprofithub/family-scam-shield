# Family Scam Shield 🚨

**Check suspicious messages before they trick your family.**

Family Scam Shield is a tiny privacy-first web tool for detecting suspicious SMS, WhatsApp, Telegram, email, parcel, bank, payment, job, and investment messages.

It is built for a simple real-life loop:

```txt
Parent receives suspicious message
→ Child pastes it into Family Scam Shield
→ Tool explains the risk in plain language
→ Tool generates a warning message to send back to family
```

## Why this exists

Most scam advice is reactive: report hotlines, articles, police notices, bank warnings.

This repo tests a sharper idea:

> People need a 5-second family safety layer before someone clicks a link.

## Demo

Open:

```txt
index.html
```

No install. No login. No tracking. No backend.

## What it does

- Scores suspicious messages from 0–100
- Detects common scam patterns
- Explains red flags in plain language
- Gives safe next steps
- Generates a family warning message
- Creates a copyable result card
- Works fully in-browser

## Example input

```txt
Your parcel is on hold. Pay RM2.99 to release delivery:
http://short-link-example.com
```

## Example output

```txt
Risk: HIGH — 91/100

Why this looks unsafe:
- Payment request through link
- Unknown or suspicious URL
- Urgent delivery wording
- Generic message with no verified identity

Do this:
1. Do not click the link.
2. Open the official courier app directly.
3. Contact support through the official website or app.
4. Delete or report the message.
```

## Market test

Post this repo/demo in:

```txt
- local scam alert groups
- Reddit country communities
- parent/family WhatsApp circles
- cybersecurity communities
- fintech/consumer safety threads
```

Track:

```txt
- GitHub stars
- demo page visits
- copied warning messages
- people submitting real scam examples
- comments like “I sent this to my parents”
```

## Important disclaimer

This tool is an educational safety assistant. It cannot guarantee whether a message is truly safe or unsafe. Always verify through official apps, official websites, or trusted support channels.

## Roadmap if people care

- Add Thai, Malay, Indonesian, Tagalog, Vietnamese, Hindi, Chinese versions
- Add image/screenshot OCR mode
- Add country-specific scam patterns
- Add official report links by country
- Add browser extension
- Add WhatsApp bot / Telegram bot
- Add community scam pattern submissions
