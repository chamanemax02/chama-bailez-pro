<div align='center'>

![WhatsApp API](https://raw.githubusercontent.com/Bell575/Upload/main/uploads/1742387351904.png)

# ⚡ CHAMA-BAILEZ-PRO v3.3.0 ⚡
### Advanced WhatsApp Web API, Native Flow Buttons, Fullscreen Video/Voice VoIP Calling & WAHA Pro Suite
**Powered by CHAMA OFC (@chamanemax02) • Built on Baileys v7**

[![npm version](https://img.shields.io/npm/v/chama-bailez-pro.svg?color=green)](https://www.npmjs.com/package/chama-bailez-pro)
[![npm downloads](https://img.shields.io/npm/dm/chama-bailez-pro.svg)](https://www.npmjs.com/package/chama-bailez-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

**chama-bailez-pro** is a WebSockets-based TypeScript/JavaScript library for interacting with the WhatsApp Web API.  
This is a **modified, high-performance, and extended version** of Baileys developed independently to add powerful capabilities that developers have long requested — including **Native WhatsApp VoIP Outbound & Inbound Video/Voice Calling**, **Fullscreen 720x1280 Video Streaming**, **Primary Phone Call Log Synchronization**, **WhatsApp Channel (Newsletter) Poll Voting**, WAHA-style Pro Features, Native Flow Interactive Buttons, Album Messages, and robust retry handlers.

---

# Disclaimer  
This project is **not affiliated with, endorsed by, or officially connected to WhatsApp Inc., Meta Platforms, Inc., or any of their subsidiaries**. The official WhatsApp website can be found at [whatsapp.com](https://whatsapp.com). "WhatsApp," along with related names, marks, and logos, are registered trademarks and the intellectual property of their respective owners.

This modified version was created with the intention of empowering developers, but it **must be used responsibly**. The maintainers **strongly discourage** any usage that goes against WhatsApp’s [Terms of Service](https://www.whatsapp.com/legal/terms-of-service). This includes—but is not limited to—spamming, bulk or automated messaging, stalking, scraping user data, or deploying it in any way that violates privacy, consent, or platform integrity.

This project is provided **as-is** and should be used with **extreme caution**.  
**You are solely responsible** for how you choose to use this library. Always ensure your use case is ethical, legal, and respects the rights and privacy of others.

**Use at your own discretion.** Respect platform rules, user boundaries, and stay within legal and moral lines.

---

## 🌟 What's New in v3.3.0?

- 🔘 **Native Flow Interactive Buttons directly in `sock.sendMessage` & `sock.sendButtons`**: Auto-attaches required `<biz>` protocol nodes, supporting URL buttons, 1-tap Copy Code, Call buttons, and Quick Replies.

- 📹 **Fullscreen 720x1280 HD Video Calling**: Outbound WhatsApp video calls stream seamlessly in 9:16 portrait fullscreen (fills entire phone screen without black bars) and landscape (1280x720).
- 🎛️ **Configurable Video Dimensions & FPS**: Pass custom `width`, `height`, and `fps` to `voipClient.call(...)`.
- 📱 **Primary Phone Call History Sync**: Outbound calls initiated from companion/linked bots automatically synchronize to the primary phone's WhatsApp Calls tab.
- 🗳️ **WhatsApp Channel (Newsletter) Poll Voting (`sock.channelVote`)**: Cast votes on WhatsApp Channel polls by option name or index (1, 2, 3...) using channel links, JIDs, or quoted polls.
- 🔘 **Native Flow Interactive Buttons**: Built-in support for sending and parsing modern interactive buttons (`quick_reply`, `cta_url`, `cta_call`, `cta_copy`).
- 📞 **Native WhatsApp Voice & Video Auto-Answer Engine**: Built with WhatsApp's official WebAssembly VoIP stack + WebRTC data transports.
- 🎙️ **Studio-Quality Audio & Video Streaming**: Stream `.wav` audio and `.mp4` video directly into WhatsApp calls with warm-up stabilization and zero jitter.
- 👥 **Advanced Identity & Multi-Device Routing**: Auto-attaches `<device-identity>` and `caller_pn` so unsaved contacts receive calls without being silenced or marked as missed.

---

## 📦 Installation

Use the stable release:
```bash
npm install chama-bailez-pro
```

Or using Yarn / pnpm:
```bash
yarn add chama-bailez-pro
# or
pnpm add chama-bailez-pro
```

### System Requirements
- Node.js `>= 20.0.0`
- [FFmpeg](https://ffmpeg.org/) installed and available in system `PATH` (required for VoIP audio streaming).

---

## 🔗 Official Links & Community

- 📢 **WhatsApp Channel**: [Chama OFC Channel](https://whatsapp.com/channel/0029VbCi5BT5a23yioUIOp1w)
- 🌐 **NPM Package**: [npmjs.com/package/chama-bailez-pro](https://www.npmjs.com/package/chama-bailez-pro)
- 💬 **Discord**: [Join Community Discord](https://discord.gg/WeJM5FP9GG)
- 📖 **Documentation**: [guide.whiskeysockets.io](https://guide.whiskeysockets.io/)

---

# 📑 Index

- [📞 VoIP Calling & Auto-Answer Engine](#-native-whatsapp-voip-calling--auto-answer-engine)
    - [Instant One-Line Auto-Answer](#instant-one-line-auto-answer)
    - [Advanced Call Control & Callbacks](#advanced-call-control--callbacks)
    - [Preloading Voice Audio for 0ms Startup](#preloading-voice-audio-for-0ms-startup)
- [Connecting Account](#connecting-account)
    - [Connect with QR-CODE](#starting-socket-with-qr-code)
    - [Connect with Pairing Code](#starting-socket-with-pairing-code)
    - [Receive Full History](#receive-full-history)
- [Important Notes About Socket Config](#important-notes-about-socket-config)
    - [Caching Group Metadata (Recommended)](#caching-group-metadata-recommended)
    - [Improve Retry System & Decrypt Poll Votes](#improve-retry-system--decrypt-poll-votes)
    - [Receive Notifications in Whatsapp App](#receive-notifications-in-whatsapp-app)
    - [Custom generateMessageID Function](#custom-generatemessageid-function)
- [Saving & Restoring Sessions](#saving--restoring-sessions)
- [Handling Events](#handling-events)
    - [Example to Start](#example-to-start)
    - [Decrypt Poll Votes](#decrypt-poll-votes)
    - [Summary of Events on First Connection](#summary-of-events-on-first-connection)
- [Implementing a Data Store](#implementing-a-data-store)
- [Whatsapp IDs Explained](#whatsapp-ids-explained)
- [Utility Functions](#utility-functions)
- [Sending Messages](#sending-messages)
    - [Non-Media Messages](#non-media-messages)
        - [Buttons Message](#buttons-message)
        - [Buttons Flow](#buttons-flow)
        - [Interactive Message](#interactive-message)
        - [Text Message](#text-message)
        - [Quote Message](#quote-message-works-with-all-types)
        - [Mention User](#mention-user-works-with-most-types)
        - [Mention Status](#mention-status)
        - [Result Poll From Newsletter](#result-poll-from-newsletter)
        - [Send Album Message](#send-album-message)
        - [List Message](#list-message)
        - [Carousel Message](#carousel-message)
        - [Interactive Response](#interactive-response)
        - [Request Payment](#request-payment)
        - [Event Message](#event-message)
        - [Interactive](#interactive)
        - [Forward Messages](#forward-messages)
        - [Location Message](#location-message)
        - [Contact Message](#contact-message)
        - [Reaction Message](#reaction-message)
        - [Pin Message](#pin-message)
        - [Poll Message](#poll-message)
    - [Sending with Link Preview](#sending-messages-with-link-previews)
    - [Media Messages](#media-messages)
        - [Gif Message](#gif-message)
        - [Video Message](#video-message)
        - [Audio Message](#audio-message)
        - [Image Message](#image-message)
        - [ViewOnce Message](#view-once-message)
- [Modify Messages](#modify-messages)
    - [Delete Messages (for everyone)](#deleting-messages-for-everyone)
    - [Edit Messages](#editing-messages)
- [Manipulating Media Messages](#manipulating-media-messages)
    - [Thumbnail in Media Messages](#thumbnail-in-media-messages)
    - [Downloading Media Messages](#downloading-media-messages)
    - [Re-upload Media Message to Whatsapp](#re-upload-media-message-to-whatsapp)
- [Reject Call](#reject-call)
- [Send States in Chat](#send-states-in-chat)
    - [Reading Messages](#reading-messages)
    - [Update Presence](#update-presence)
- [Modifying Chats](#modifying-chats)
    - [Archive a Chat](#archive-a-chat)
    - [Mute/Unmute a Chat](#muteunmute-a-chat)
    - [Mark a Chat Read/Unread](#mark-a-chat-readunread)
    - [Delete a Message for Me](#delete-a-message-for-me)
    - [Delete a Chat](#delete-a-chat)
    - [Star/Unstar a Message](#starunstar-a-message)
    - [Disappearing Messages](#disappearing-messages)
- [User Queries](#user-queries)
    - [Check If ID Exists in Whatsapp](#check-if-id-exists-in-whatsapp)
    - [Query Chat History (groups too)](#query-chat-history-groups-too)
    - [Fetch Status](#fetch-status)
    - [Fetch Profile Picture (groups too)](#fetch-profile-picture-groups-too)
    - [Fetch Business Profile](#fetch-business-profile-such-as-description-or-category)
    - [Fetch Someone's Presence](#fetch-someones-presence-if-theyre-typing-or-online)
- [Change Profile](#change-profile)
    - [Change Profile Status](#change-profile-status)
    - [Change Profile Name](#change-profile-name)
    - [Change Display Picture (groups too)](#change-display-picture-groups-too)
    - [Remove Display Picture](#remove-display-picture-groups-too)
- [Groups](#groups)
- [Newsletter](#newsletter)
- [Privacy](#privacy)
- [Broadcast Lists & Stories](#broadcast-lists--stories)
- [Writing Custom Functionality](#writing-custom-functionality)

---

# 📞 Native WhatsApp VoIP Calling & Auto-Answer Engine

`chama-bailez-pro` features the world's first complete **WhatsApp Web VoIP Calling Stack** for Node.js. It allows your bot to:
- **Auto-answer incoming voice & video calls** and stream custom greetings.
- **Place outbound voice & video calls** to any WhatsApp user.
- **Stream 720x1280 HD Fullscreen portrait video** (fills the recipient's phone screen with zero black bars) or **1280x720 landscape video**.
- **Automatically synchronize outbound calls to your primary phone's Calls tab**.

---

### 1. Instant One-Line Auto-Answer (Inbound Calls)

Turn ANY Baileys socket into an automated voice call hotline:

```javascript
import makeWASocket, { enableCallAutoAnswer, AudioFeeder, Browsers } from 'chama-bailez-pro';

const sock = makeWASocket({
    auth: state,
    browser: Browsers.windows('Chrome'), // Must use Windows Chrome for VoIP call routing!
    markOnlineOnConnect: true
});

sock.ev.on('connection.update', async ({ connection }) => {
    if (connection === 'open') {
        // Preload voice greeting into RAM (WAV or MP3)
        await AudioFeeder.preload('./audio/welcome.wav');

        // Activate voice auto-answering
        await enableCallAutoAnswer(sock, {
            autoAnswer: true,
            audio: './audio/welcome.wav',
            durationMs: 60000,        // Max call duration (60s)
            loop: true,               // Loops audio with 1.5s natural pause
            warmupSilenceMs: 1500,    // 1.5s warm-up silence for WebRTC connection
            onCall: (call) => console.log(`📞 Incoming call from: ${call.peerJid}`),
            onAnswer: (call) => console.log(`🎙️ Call answered! Streaming audio...`),
            onEnd: (call, reason) => console.log(`📴 Call ended: ${reason}`)
        });
    }
});
```

---

### 2. Outbound WhatsApp Video Calling (720x1280 Fullscreen HD)

Stream `.mp4` video and `.wav` audio directly to any WhatsApp user in **portrait fullscreen (9:16)**:

```javascript
import { getActiveVoipClient, VideoFeeder } from 'chama-bailez-pro';

// 1. Preload MP4 video into RAM for instantaneous streaming
await VideoFeeder.preload('./assets/sample.mp4', 720, 1280, 15);

// 2. Obtain active VoIP Client
const voipClient = getActiveVoipClient();

// 3. Initiate outbound video call
const call = await voipClient.call('94703229057', {
    isVideo: true,
    audioSource: './audio/welcome.wav',
    videoSource: './assets/sample.mp4',
    width: 720,             // 720x1280 Fullscreen (9:16 Portrait)
    height: 1280,
    fps: 15,                // 15 FPS (WhatsApp standard for mobile)
    durationMs: 45000       // Call duration in milliseconds (45s)
});

// 4. Listen to call lifecycle events
call.on('ringing', () => {
    console.log('🔔 Call is ringing on recipient phone...');
});

call.on('connected', () => {
    console.log('✨ Call answered! Video & Audio streaming live...');
});

call.on('ended', (reason) => {
    console.log(`📴 Call ended: ${reason}`);
});
```

---

### 3. Outbound WhatsApp Voice Calling (Audio Only)

```javascript
import { getActiveVoipClient, AudioFeeder } from 'chama-bailez-pro';

await AudioFeeder.preload('./audio/welcome.wav');

const voipClient = getActiveVoipClient();
const call = await voipClient.call('94703229057', {
    isVideo: false,
    audioSource: './audio/welcome.wav',
    durationMs: 30000
});

call.on('ringing', () => console.log('🔔 Ringing...'));
call.on('connected', () => console.log('🎙️ Streaming voice audio...'));
call.on('ended', (reason) => console.log(`📴 Call ended: ${reason}`));
```

---

### 4. Landscape (1280x720) Video Calling

To stream in standard 16:9 landscape format instead of portrait:

```javascript
const call = await voipClient.call('94703229057', {
    isVideo: true,
    audioSource: './audio/welcome.wav',
    videoSource: './assets/sample.mp4',
    width: 1280,            // 1280x720 Landscape (16:9)
    height: 720,
    fps: 15
});
```

---

### 5. Primary Phone Call Log Synchronization

When your bot (linked companion device) places an outbound call, `chama-bailez-pro` automatically dispatches synchronization stanzas to your account's primary phone (`device 0`). 

**Result**: The outgoing call appears immediately with proper timestamps and duration in your physical phone's **WhatsApp Calls** tab!

---

## Connecting Account

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code** with WhatsApp on your phone.

### Starting socket with **QR-CODE**

> [!TIP]
> You can customize browser name if you connect with **QR-CODE**, with `Browsers` constant. **Note:** For VoIP voice calls, always use `Browsers.windows('Chrome')`.

```javascript
const { default: makeWASocket, Browsers } = require("chama-bailez-pro");

const sock = makeWASocket({
    browser: Browsers.windows('Chrome'),
    printQRInTerminal: true
});
```

If the connection is successful, you will see a QR code printed on your terminal screen, scan it with WhatsApp on your phone and you'll be logged in!

### Starting socket with **Pairing Code**

> [!IMPORTANT]
> Pairing Code is a method to connect WhatsApp Web without QR-CODE. The phone number must contain only digits including the country code (no `+`, `-`, or spaces).

```javascript
const { default: makeWASocket, Browsers } = require("chama-bailez-pro");

const sock = makeWASocket({
    browser: Browsers.windows('Chrome'),
    printQRInTerminal: false
});

// Normal Pairing
if (!sock.authState.creds.registered) {
    const number = '94703229057';
    const code = await sock.requestPairingCode(number);
    console.log(`Your Pairing Code is: ${code}`);
}

// Custom 8-character Pairing Code
if (!sock.authState.creds.registered) {
    const pair = "CHAMA007"; // 8 alphanumeric characters
    const number = '94703229057';
    const code = await sock.requestPairingCode(number, pair);
    console.log(`Your Custom Code is: ${code}`);
}
```

### Receive Full History

1. Set `syncFullHistory: true`
2. Configure browser emulation:

```javascript
const sock = makeWASocket({
    browser: Browsers.windows('Desktop'),
    syncFullHistory: true
});
```

---

## Important Notes About Socket Config

### Caching Group Metadata (Recommended)

```javascript
const NodeCache = require("node-cache");
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

const sock = makeWASocket({
    cachedGroupMetadata: async (jid) => groupCache.get(jid)
});

sock.ev.on('groups.update', async ([event]) => {
    const metadata = await sock.groupMetadata(event.id);
    groupCache.set(event.id, metadata);
});

sock.ev.on('group-participants.update', async (event) => {
    const metadata = await sock.groupMetadata(event.id);
    groupCache.set(event.id, metadata);
});
```

### Improve Retry System & Decrypt Poll Votes

```javascript
const sock = makeWASocket({
    getMessage: async (key) => await getMessageFromStore(key)
});
```

### Receive Notifications in Whatsapp App
- If you want to receive push notifications on your primary phone, set `markOnlineOnConnect` to `false`:
```javascript
const sock = makeWASocket({
    markOnlineOnConnect: false
});
```

### Custom generateMessageID Function

```javascript
const crypto = require("crypto");

const sock = makeWASocket({
    generateMessageID: () => crypto.randomBytes(11).toString('hex').toUpperCase(),
    generateMessageIDV2: (userId) => {
        const hash = crypto.createHash('sha256').update(userId).digest('hex').toUpperCase();
        const randomPart = crypto.randomBytes(11).toString('hex').toUpperCase();
        const combined = hash + randomPart;
        let result = '';
        for (let i = 0; i < 22; i++) {
            const randomIndex = crypto.randomBytes(1)[0] % combined.length;
            result += combined[randomIndex];
        }
        return result;
    }
});
```

---

## Saving & Restoring Sessions

```javascript
const { default: makeWASocket, useMultiFileAuthState } = require("chama-bailez-pro");

// Load auth state from directory
const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys', { authDebug: true });

const sock = makeWASocket({ auth: state });

// Save credentials whenever updated
sock.ev.on('creds.update', saveCreds);
```

### Cache Synchronization with MultiFileAuthState

```javascript
const { state, saveCreds, cache: authCache } = await useMultiFileAuthState('auth_info_baileys', { syncCache: true });

const sock = makeWASocket({
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(
      state.keys, 
      pino().child({ level: "silent", stream: "store" }),
      authCache
    )
  }
});

sock.ev.on('creds.update', saveCreds);
```

---

## Handling Events

Baileys uses standard EventEmitter syntax:

```javascript
const sock = makeWASocket();

sock.ev.on('messages.upsert', ({ messages }) => {
    console.log('Got messages:', messages);
});
```

### Example to Start

```javascript
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require("chama-bailez-pro");
const Boom = require('@hapi/boom');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed. Reconnecting:', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('Opened connection successfully!');
        }
    });

    sock.ev.on('messages.upsert', async (event) => {
        for (const m of event.messages) {
            if (!m.message) continue;
            console.log('Replying to:', m.key.remoteJid);
            await sock.sendMessage(m.key.remoteJid, { text: 'Hello from Chama Baileys Pro!' });
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

connectToWhatsApp();
```

### Decrypt Poll Votes

```javascript
sock.ev.on('messages.update', async (event) => {
    for (const { key, update } of event) {
        if (update.pollUpdates) {
            const pollCreation = await getMessage(key);
            if (pollCreation) {
                console.log(
                    'Poll update aggregation: ',
                    getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                );
            }
        }
    }
});
```

---

## Implementing a Data Store

```javascript
const { default: makeWASocket, makeInMemoryStore } = require("chama-bailez-pro");

const store = makeInMemoryStore({});
store.readFromFile('./baileys_store.json');

setInterval(() => {
    store.writeToFile('./baileys_store.json');
}, 10_000);

const sock = makeWASocket({});
store.bind(sock.ev);

sock.ev.on('chats.upsert', () => {
    console.log('Chats in store:', store.chats.all());
});

sock.ev.on('contacts.upsert', () => {
    console.log('Contacts in store:', Object.values(store.contacts));
});
```

---

## Whatsapp IDs Explained

- **Individuals**: `[country code][phone number]@s.whatsapp.net` (e.g. `94703229057@s.whatsapp.net`)
- **Groups**: `[creator-timestamp]@g.us` (e.g. `123456789-123345@g.us`)
- **Broadcast Lists**: `[timestamp]@broadcast`
- **WhatsApp Status (Stories)**: `status@broadcast`
- **LID User Identifiers**: `[lid_number]@lid`

---

## Utility Functions

- `getContentType`: Extract the content type for any incoming message.
- `getDevice`: Detect which device sent the message (`android`, `ios`, `web`, `desktop`).
- `makeCacheableSignalKeyStore`: Supercharge Signal key operations with fast in-memory caching.
- `downloadContentFromMessage`: Download streamable buffers from media messages.

---

## Sending Messages

### Non-Media Messages

#### Buttons Message
```javascript
await sock.sendMessage(jid, {
    text: "Hello World!",
    footer: "© Chama Bailez Pro",
    buttons: [
        {
            buttonId: `btn_1`, 
            buttonText: { displayText: '🚀 Explore' },
            type: 1 
        }
    ],
    headerType: 1,
    viewOnce: true
}, { quoted: null });
```

#### Buttons Flow
```javascript
await sock.sendMessage(jid, {
  text: "Welcome to Chama Interactive Flow!", 
  footer: "© Chama Bailez Pro 2026",
  buttons: [
    {
      buttonId: '.ping',
      buttonText: { displayText: '⚡ Check Speed' },
      type: 1,
    },
    {
      buttonId: 'action',
      buttonText: { displayText: 'Select Option' },
      type: 4,
      nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Available Options',
          sections: [
            {
              title: 'Main Services',
              highlight_label: '🔥 HOT',
              rows: [
                { header: 'VOIP', title: 'Voice Call Engine', description: 'WhatsApp Web VoIP caller', id: 'opt_1' },
                { header: 'BOT', title: 'Chama Shield Bot', description: 'Multi-device security bot', id: 'opt_2' }
              ],
            },
          ],
        }),
      },
    },
  ],
  headerType: 1,
  viewOnce: true
}, { quoted: m });
```

#### Interactive Native Flow Buttons (Built-in Support)

In `chama-bailez-pro`, you can send interactive buttons directly using `sock.sendMessage` or `sock.sendButtons` without constructing complex raw protobuf messages:

##### Method 1: Simplified `sock.sendMessage` (Recommended)

```javascript
await sock.sendMessage(jid, {
    title: "✨ *CHAMA Interactive Menu* ✨",
    text: "Please select an action from below:",
    footer: "⚡ Powered by chama-bailez-pro",
    buttons: [
        // 1. Web Link (URL) Button
        { text: "🌐 Visit Website", url: "https://chama.me" },

        // 2. One-Tap Copy Code Button
        { text: "📋 Copy Promo Code", code: "CHAMA2026" },

        // 3. Direct Phone Call Button
        { text: "📞 Call Support", phone: "+94703229057" },

        // 4. Quick Reply Button
        { text: "⚡ Option 1", id: "opt_1" },
        { text: "⚡ Option 2", id: "opt_2" }
    ]
});
```

##### Method 2: Convenience Method `sock.sendButtons`

```javascript
await sock.sendButtons(jid, {
    title: "🔘 *Quick Actions*",
    text: "Tap any button below to proceed:",
    footer: "chama-bailez-pro v3.2.0",
    buttons: [
        { text: "🌐 Join Channel", url: "https://whatsapp.com/channel/0029VbCi5BT5a23yioUIOp1w" },
        { text: "📋 Copy Key", code: "KEY_998877" },
        { text: "📞 Call Helpline", phone: "+94703229057" }
    ]
});
```

##### Method 3: Raw Native Flow (All 5 Types with custom JSON)

```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: {
            title: "🔘 *ADVANCED BUTTONS*",
            hasMediaAttachment: false
        },
        body: { text: "Choose an option below:" },
        footer: { text: "⚡ Powered by chama-bailez-pro" },
        nativeFlowMessage: {
            buttons: [
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({ display_text: "Option A", id: "opt_a" })
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({ display_text: "Visit Site", url: "https://chama.me" })
                },
                {
                    name: "cta_call",
                    buttonParamsJson: JSON.stringify({ display_text: "Call Now", phone_number: "+94703229057" })
                },
                {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({ display_text: "Copy", copy_code: "12345" })
                }
            ]
        }
    }
});
```

> [!NOTE]
> **WhatsApp Platform Compatibility Note (2025/2026):**  
> - `cta_url` (Web links), `cta_copy` (Copy code), and `cta_call` (Phone calls) work reliably across WhatsApp Web, Android, and iOS.
> - On personal WhatsApp accounts (non-business), Meta restricts `quick_reply` in 1-on-1 chats. For 100% universal interactive responses (including radio buttons and surveys) that work without any restrictions on Web, Android, and iOS, use **WhatsApp Polls** (`sock.sendMessage(jid, { poll: { name, values, selectableCount } })`).

#### Handling Button Click Responses in `messages.upsert`

When a user taps any Native Flow button, WhatsApp delivers an `interactiveResponseMessage`. Here is the complete code to extract the button ID and text:

```javascript
sock.ev.on('messages.upsert', async ({ messages }) => {
    for (const msg of messages) {
        if (!msg.message) continue;

        let mContent = msg.message;
        if (mContent.ephemeralMessage) mContent = mContent.ephemeralMessage.message;
        if (mContent.viewOnceMessage) mContent = mContent.viewOnceMessage.message;
        if (mContent.viewOnceMessageV2) mContent = mContent.viewOnceMessageV2.message;

        // 1. Standard text extraction
        let text = (
            mContent.conversation ||
            mContent.extendedTextMessage?.text ||
            mContent.buttonsResponseMessage?.selectedButtonId ||
            mContent.templateButtonReplyMessage?.selectedId ||
            mContent.listResponseMessage?.singleSelectReply?.selectedRowId ||
            ''
        ).trim();

        // 2. Native Flow Button Click Extraction
        if (!text && mContent.interactiveResponseMessage) {
            const irm = mContent.interactiveResponseMessage;
            if (irm.nativeFlowResponseMessage?.paramsJson) {
                try {
                    const params = JSON.parse(irm.nativeFlowResponseMessage.paramsJson);
                    text = (params.id || params.display_text || params.title || '').trim();
                } catch (err) {}
            }
            if (!text && irm.body?.text) {
                text = irm.body.text.trim();
            }
        }

        if (text) {
            console.log(`📩 Received message or button click: "${text}" from ${msg.key.remoteJid}`);
        }
    }
});
```

#### Text Message
```javascript
await sock.sendMessage(jid, { text: 'Hello from Chama Bailez Pro!' });
```

#### Quote Message (works with all types)
```javascript
await sock.sendMessage(jid, { text: 'Quoting your message' }, { quoted: message });
```

#### Mention User
```javascript
await sock.sendMessage(jid, {
    text: 'Hello @94703229057!',
    mentions: ['94703229057@s.whatsapp.net']
});
```

#### Mention Status
```javascript
await sock.sendStatusMentions(
    { text: "Status update with mentions" },
    [
        "120363024829@g.us",
        "94703229057@s.whatsapp.net"
    ]
);
```

#### Send Album Message
```javascript
await sock.sendAlbumMessage(
    jid,
    [
       { image: { url: "https://example.com/photo1.jpg" }, caption: "Photo 1" },
       { video: { url: "https://example.com/clip.mp4" }, caption: "Video 1" }
    ],
    { quoted: message, delay: 2000 }
);
```

#### List Message
```javascript
const sections = [
    {
        title: "Section 1",
        rows: [
            { title: "Option 1", rowId: "option1", description: "First choice" },
            { title: "Option 2", rowId: "option2", description: "Second choice" }
        ]
    }
];

await sock.sendMessage(jid, {
    text: "Please select an option from the list below",
    footer: "Chama OFC",
    title: "Service Selection",
    buttonText: "View Options",
    sections
});
```

#### Carousel Message
```javascript
await sock.sendMessage(jid, {
    text: 'Check out our products',
    footer: 'Chama Store',
    cards: [
        {
            title: 'Product 1',
            image: { url: 'https://example.com/item1.jpg' },
            caption: 'High-performance API'
        },
        {
            title: 'Product 2',
            image: { url: 'https://example.com/item2.jpg' },
            caption: 'Voice Call Engine'
        }
    ],
    viewOnce: true
});
```

#### Request Payment
```javascript
await sock.sendMessage(jid, {
    requestPayment: {      
       currency: "LKR",
       amount: "500000",
       from: "94703229057@s.whatsapp.net",
       note: "Payment for Chama Bot Service"
    }
}, { quoted: message });
```

#### Location Message
```javascript
await sock.sendMessage(jid, {
    location: {
        degreesLatitude: 6.9271,
        degreesLongitude: 79.8612,
        name: "Colombo, Sri Lanka"
    }
});
```

#### Contact Message (vCard)
```javascript
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:CHAMA OFC\n'
            + 'ORG:Chama Mod Team;\n'
            + 'TEL;type=CELL;type=VOICE;waid=94703229057:+94 70 322 9057\n'
            + 'END:VCARD';

await sock.sendMessage(jid, {
    contacts: {
        displayName: 'CHAMA OFC',
        contacts: [{ vcard }]
    }
});
```

#### Reaction Message
```javascript
await sock.sendMessage(jid, {
    react: {
        text: '🔥', // send empty string '' to remove reaction
        key: message.key
    }
});
```

#### Pin Message
```javascript
await sock.sendMessage(jid, {
    pin: {
        type: 1, // 1: Pin, 0: Unpin
        time: 86400, // 24h: 86400, 7d: 604800, 30d: 2592000
        key: message.key
    }
});
```

#### Poll Message
```javascript
await sock.sendMessage(jid, {
    poll: {
        name: 'Do you like Chama Bailez Pro v3.0?',
        values: ['Yes! Amazing 🔥', 'Needs more features 🚀'],
        selectableCount: 1,
        toAnnouncementGroup: false
    }
});
```

---

### Media Messages

#### Video & Audio
```javascript
// Video
await sock.sendMessage(jid, {
    video: { url: './media/sample.mp4' },
    caption: 'Sample Video'
});

// Audio (Voice Note / PTT)
await sock.sendMessage(jid, {
    audio: { url: './media/voice.mp3' },
    mimetype: 'audio/mp4',
    ptt: true // sends as voice note
});
```

#### View Once Message
```javascript
await sock.sendMessage(jid, {
    image: { url: './media/secret.jpg' },
    viewOnce: true,
    caption: 'This image can only be viewed once!'
});
```

---

## Modify Messages

### Delete Messages (For Everyone)
```javascript
const sent = await sock.sendMessage(jid, { text: 'Oops!' });
await sock.sendMessage(jid, { delete: sent.key });
```

### Edit Messages
```javascript
await sock.sendMessage(jid, {
    text: 'Corrected text content',
    edit: sent.key
});
```

---

## Reject Call

```javascript
sock.ev.on('call', async (callEvents) => {
    for (const call of callEvents) {
        if (call.status === 'offer') {
            await sock.rejectCall(call.id, call.from);
        }
    }
});
```

---

## Groups

```javascript
// Create group
const group = await sock.groupCreate('Chama Dev Group', ['94703229057@s.whatsapp.net']);

// Add or remove participants
await sock.groupParticipantsUpdate(jid, ['94703229057@s.whatsapp.net'], 'add'); // 'remove' | 'promote' | 'demote'

// Get invite link
const code = await sock.groupInviteCode(jid);
console.log('Invite link: https://chat.whatsapp.com/' + code);
```

---

## Newsletters (Channels) Pro Suite

`chama-bailez-pro` provides complete support for WhatsApp Channels (Newsletters), including public channel poll voting, search, and reactions:

### 1. WhatsApp Channel (Newsletter) Poll Voting

Cast votes on channel polls easily by option number (1, 2, 3...) or option text. Supports channel links, direct JIDs, and quoted poll messages:

```javascript
// Method A: Vote by Channel URL + Option Number (1-based index)
const result = await sock.channelVote('https://whatsapp.com/channel/0029Va84sN7J93wUd3cWwX2c/123', 1);
console.log('Voted successfully:', result);

// Method B: Vote by Channel JID + Option Text
await sock.channelVote('120363024829@newsletter', 'Yes, definitely!');

// Method C: Vote by replying / quoting a Channel Poll in chat
sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    const quoted = msg.message?.extendedTextMessage?.contextInfo;
    if (quoted?.forwardedNewsletterMessageInfo) {
        // Automatically votes on the quoted poll
        await sock.channelVote(quoted, 1);
    }
});
```

### 2. Search Channels
```javascript
// Search public channels by keyword
const searchResults = await sock.newsletterSearch('tech news');
console.log('Channels found:', searchResults);
```

### 3. Fetch Channel Metadata
```javascript
// Fetch channel details by invite code or JID
const meta = await sock.newsletterMetadata('invite', '0029Va84sN7J93wUd3cWwX2c');
console.log(`Channel Name: ${meta.name}, Subscribers: ${meta.subscribers}`);
```

### 4. Follow & Unfollow Channels
```javascript
// Follow a channel
await sock.newsletterFollow('120363024829@newsletter');

// Unfollow a channel
await sock.newsletterUnfollow('120363024829@newsletter');
```

### 5. React to Channel Messages
```javascript
// Send emoji reaction to a channel update
await sock.newsletterReactMessage('120363024829@newsletter', serverId, '🔥');
```

### 6. WhatsApp Channel Poll Voting (`sock.newsletterSendPollVote`)
Chama Baileys natively supports voting on polls published in WhatsApp Channels (Newsletters) using the official WhatsApp SMAX protocol.

```javascript
import { createHash } from 'crypto';

// 1. Cast a vote using option name (e.g. 'Option 1' or 'Yes')
const { id, ack } = await sock.newsletterSendPollVote(
    '120363427108046852@newsletter', // Channel JID
    '683',                            // Message Server ID
    ['TEST 1']                        // Array of selected option names
);

console.log('Vote submitted, WhatsApp server ack:', ack);

// 2. Fetch recent channel messages to inspect polls
const messages = await sock.newsletterFetchMessages('jid', '120363427108046852@newsletter', 20);

// 3. Inspect registered votes & reactions for your account in a channel
const myAddons = await sock.newsletterMyAddOns('120363427108046852@newsletter');
console.log('My votes & reactions:', myAddons);
```

#### Complete Production `.vote` Bot Command Handler:
Drop this directly into your bot's message handler switch-case (`command` or `msg.body`):

```javascript
import crypto from 'crypto';
import { proto } from 'chama-bailez-pro';

// Fast in-memory caches to optimize RAM and ensure instant <400ms speed
const inviteCache = new Map();
const pollCache = new Map();

case 'nvote':
case 'cvote':
case 'channelvote':
case 'vote': {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const hasQuotedMsg = !!(ctx?.quotedMessage);

    let target = null;
    let option = null;
    let serverId = null;

    // 1. Parse arguments dynamically
    if (args[0] && (args[0].includes('whatsapp.com/channel/') || args[0].endsWith('@newsletter'))) {
        target = args[0].trim();
        if (args.length >= 3 && /^\d+$/.test(args[1].trim()) && !target.match(/\/(\d+)$/)) {
            serverId = args[1].trim();
            option = args.slice(2).join(' ').trim();
        } else {
            option = args.slice(1).join(' ').trim();
        }
    } else if (hasQuotedMsg) {
        target = ctx;
        if (args.length >= 2 && /^\d+$/.test(args[0].trim())) {
            serverId = args[0].trim();
            option = args.slice(1).join(' ').trim();
        } else {
            option = args.join(' ').trim();
        }
    } else if (args.length >= 2) {
        target = args[0].trim();
        if (args.length >= 3 && /^\d+$/.test(args[1].trim())) {
            serverId = args[1].trim();
            option = args.slice(2).join(' ').trim();
        } else {
            option = args.slice(1).join(' ').trim();
        }
    }

    if (!target || !option) {
        return await reply(
            `🗳️ *WhatsApp Channel Poll Vote*\n\n` +
            `*Usage:*\n` +
            `• Link with Option: \`.vote https://whatsapp.com/channel/<inviteCode>/<serverId> <Option>\`\n` +
            `• Link with Number: \`.vote https://whatsapp.com/channel/<inviteCode>/<serverId> 1\`\n` +
            `• Reply to a Poll: \`.vote <Option or Number>\`\n\n` +
            `*Example:*\n` +
            `\`.vote https://whatsapp.com/channel/0029VbCi5BT5a23yioUIOp1w/683 TEST 1\``
        );
    }

    try {
        await reply(`⏳ *Casting vote...*`);

        let jid = null;
        let pollOptions = null;
        let pollTitle = null;

        // 2. Resolve Channel JID & Server ID
        if (typeof target === 'object') {
            jid = target.forwardedNewsletterMessageInfo?.newsletterJid || target.remoteJid;
            serverId = (target.forwardedNewsletterMessageInfo?.serverMessageId || target.stanzaId || target.server_id)?.toString();
            const pMsg = target.quotedMessage?.pollCreationMessage || target.quotedMessage?.pollCreationMessageV3;
            if (pMsg) {
                pollOptions = (pMsg.options || []).map(o => o.optionName);
                pollTitle = pMsg.name;
            }
        } else {
            const linkMatch = target.match(/(?:https?:\/\/)?(?:www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)(?:\/(\d+))?/i);
            if (linkMatch) {
                const inviteCode = linkMatch[1];
                if (linkMatch[2]) serverId = linkMatch[2];
                if (inviteCache.has(inviteCode)) {
                    jid = inviteCache.get(inviteCode);
                } else {
                    const meta = await sock.newsletterMetadata('invite', inviteCode);
                    jid = meta?.id || meta?.jid;
                    if (jid) inviteCache.set(inviteCode, jid);
                }
            } else if (target.endsWith('@newsletter')) {
                jid = target;
            }
        }

        if (!jid || !serverId) {
            return await reply(`❌ *Error:* Could not resolve Channel JID or Poll Message ID (/serverId).`);
        }

        // 3. Strict Verification & Fetch (rejection of non-existent/deleted messages)
        const cacheKey = `${jid}_${serverId}`;
        if (pollCache.has(cacheKey)) {
            const c = pollCache.get(cacheKey);
            pollOptions = c.options;
            pollTitle = c.name;
        } else {
            const fetchRes = await sock.query({
                tag: 'iq',
                attrs: { id: sock.generateMessageTag(), type: 'get', xmlns: 'newsletter', to: 's.whatsapp.net' },
                content: [{ tag: 'messages', attrs: { type: 'jid', jid, count: '40' } }]
            });

            const messagesNode = fetchRes?.content?.[0];
            let found = null;
            if (messagesNode && Array.isArray(messagesNode.content)) {
                found = messagesNode.content.find(m => m.tag === 'message' && String(m.attrs?.server_id) === String(serverId));
            }

            if (!found) {
                return await reply(`❌ *Message Not Found:* Message ID "${serverId}" does not exist in this channel.`);
            }
            if (found.attrs?.edit === '8') {
                return await reply(`❌ *Deleted Message:* Message ID "${serverId}" was deleted by the channel admin.`);
            }

            const pt = found.content?.find(c => c.tag === 'plaintext');
            if (!pt?.content) return await reply(`❌ *Not a Poll:* Message ID "${serverId}" is not a poll.`);

            const buf = typeof pt.content === 'string' ? Buffer.from(pt.content, 'binary') : Buffer.from(pt.content);
            const decoded = proto.Message.decode(buf);
            const pMsg = decoded.pollCreationMessage || decoded.pollCreationMessageV2 || decoded.pollCreationMessageV3;

            if (!pMsg) return await reply(`❌ *Not a Poll:* Message ID "${serverId}" is not a poll.`);

            pollOptions = (pMsg.options || []).map(o => o.optionName);
            pollTitle = pMsg.name || '';
            pollCache.set(cacheKey, { options: pollOptions, name: pollTitle });
        }

        // 4. Match option name or 1-based index (e.g. 1 -> Option 1)
        let selectedOption = null;
        if (/^\d+$/.test(option)) {
            const idx = parseInt(option, 10);
            if (idx >= 1 && idx <= pollOptions.length) {
                selectedOption = pollOptions[idx - 1];
            } else {
                return await reply(`❌ Option #${idx} not found. Available options: ${pollOptions.map((o, i) => `${i + 1}. ${o}`).join(', ')}`);
            }
        } else {
            selectedOption = pollOptions.find(o => o.toLowerCase() === option.toLowerCase()) || option;
        }

        // 5. Send Native SMAX Poll Vote
        const { ack } = await sock.newsletterSendPollVote(jid, serverId, [selectedOption]);

        await reply(
            `✅ *Channel Poll Vote Submitted!* 🎉\n\n` +
            (pollTitle ? `📝 *Poll:* ${pollTitle}\n` : '') +
            `📢 *Channel:* \`${jid}\`\n` +
            `🔢 *Poll ID:* \`${serverId}\`\n` +
            `🔘 *Voted Option:* *${selectedOption}*`
        );
    } catch (err) {
        await reply(`❌ *Vote Error:* ${err.message}`);
    }
    break;
}
```

---

## Privacy Settings

```javascript
// Block or Unblock
await sock.updateBlockStatus(jid, 'block'); // 'unblock'

// Privacy updates
await sock.updateLastSeenPrivacy('all'); // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateOnlinePrivacy('all');
await sock.updateProfilePicturePrivacy('all');
```

---

## 📄 License & Credits

- Developed and maintained by **CHAMA OFC (@chamanemax02)**.
- Licensed under the **MIT License**.
- Built on top of WhiskeySockets Baileys with custom native WebRTC VoIP modifications.
