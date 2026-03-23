# OrionCAF — Website Brief

> **Durum:** Geliştirmeye hazır  
> **Son Güncelleme:** Mart 2026  
> `[ TODO ]` işaretli alanlar takımın doldurması gereken kısımlardır.

***

## 1. Şirket Bilgileri

| Alan | Detay |
|---|---|
| **Şirket Adı** | OrionCAF |
| **Kuruluş** | Mayıs 2025 |
| **Konum** | Manisa, Türkiye (Remote) |
| **LinkedIn** | https://www.linkedin.com/company/107349213 |
| **Hugging Face** | https://huggingface.co/OrionCAF |
| **Domain** | `[ TODO — örn. orioncaf.ai ]` |

***

## 2. Tasarım Konsepti

**Referans:** Zendesk (zendesk.com) — product first, kurumsal, temiz.  
**Ton:** Teknik güvenilirlik. Kişisel bilgi yok, şirket ve ürün ön planda.  
**Tema:** Light mode öncelikli, indigo/mor accent (`#4F46E5`), ince border'lar (0.5px), beyaz yüzeyler.

### Tipografi
* Font: System sans serif veya Geist / Inter (tercih edilirse)
* Başlık: 48px / font weight 500 / letter spacing negative 1px
* Body: 15–17px / line height 1.65

### Renk Paleti

| Rol | Değer |
|---|---|
| Accent / Primary | `#4F46E5` (indigo) |
| Accent hover | `#4338CA` |
| Background | `#FFFFFF` |
| Surface | `#F9FAFB` |
| Border | `rgba(0,0,0,0.12)` — 0.5px |
| Text primary | `#111827` |
| Text secondary | `#6B7280` |
| Text tertiary | `#9CA3AF` |

***

## 3. Sayfa Yapısı / Sitemap

```
/               → Homepage (aşağıda detaylı)
/solutions      → Hizmet detay sayfaları
/projects       → Portfolio / case studies
/research       → Akademik yayınlar + open source modeller
/about          → Şirket hakkında (takım bilgisi YOK — sadece vizyon/misyon)
/contact        → İletişim formu
```

***

## 4. Homepage — Bölüm Bölüm İçerik

### 4.1 Navigation (Sticky)

```
[● OrionCAF]   Solutions · Projects · Research · About   [Sign in] [Contact us →]
```

* Logo: küçük indigo nokta + "OrionCAF" yazısı
* Linkler: Solutions, Projects, Research, About
* CTA: Ghost "Sign in" + Primary "Contact us"

***

### 4.2 Hero

**Badge (üst):**
> AI first engineering from Turkey

**Başlık (h1):**
> Build smarter systems with **AI that actually works**

"AI that actually works" kısmı indigo renkte.

**Alt metin:**
> Speech to speech pipelines, LLM fine tuning, RAG systems, and intelligent automation — designed for production, optimized for your industry.

**CTA Butonları:**
* Primary: `Start a project`
* Secondary: `See our work`

***

### 4.3 Metrics Strip

Sayfanın tam genişliğinde, ince border'larla ayrılmış 5 sütun:

| Rakam | Açıklama |
|---|---|
| **3** | AI engineers on the team |
| **1000+** | Hugging Face model downloads |
| **600+** | Active app users (organic) |
| **1** | Peer reviewed publication (2025) |


`[ TODO: Güncel rakamları onaylayın veya düzeltin ]`

***

### 4.4 Services — "What we build"

**Section tag:** What we build  
**Başlık:** AI solutions across the full stack  
**Alt metin:** From voice pipelines to enterprise automation — we design, train, and deploy systems that run in production.

6 kart, 3×2 grid:

| # | Başlık | Açıklama |
|---|---|---|
| 0 | **n8n Automations** | tourism price calculator automation, clinics agents automation(randevu, bilgi alma, fiyat alma),  |
| 1 | **AI Speech to Speech** | End to end real time voice AI — Whisper ASR, custom TTS, LLM reasoning. Sub second latency, production ready pipelines. |
| 2 | **LLM Fine Tuning** | Domain specific model training with LoRA, 4 bit quantization, and Unsloth. Hardware agnostic deployment — cloud, on prem, or edge. |
| 3 | **RAG & Knowledge Systems** | Secure, offline retrieval augmented generation over your private data. FAISS, Pinecone, semantic reranking, guardrails. |
| 4 | **AI Automation (n8n)** | Intelligent workflow automation connecting your APIs, databases, and AI models. No ops pipelines that run themselves. |
| 5 | **Mobile App Development** | AI powered iOS & Android apps — from idea to App Store. We build and ship products with embedded intelligence. |
| 6 | **AI Architecture & Consulting** | System design, tech roadmap, model selection, and on prem GPU deployment. We help you build the right thing, right. |

***

### 4.5 Feature Bölümü 1 — Speech to Speech

**Tag:** Core capability  
**Başlık:** Real time speech AI with sub second latency  
**Metin:** We build full stack voice agents that understand, reason, and respond — in Turkish and English. From ASR to TTS with LLM at the core.

**Bullet listesi:**
* Whisper Large v3 fine tuned for Turkish ASR
* Custom TTS with all of turkish models (llm, ts, stt) and PiperTTS voice cloning
* LiveKit powered real time communication layer
* Pipecat powered real time communication layer
* Deployable on RunPod, on prem A100/H100, or serverless

**Sağ taraf — Pipeline diagram:**
```
Audio in → [ASR: Whisper] → [LLM: Reasoning] → [TTS: all of turkish models (llm, ts, stt)] → Audio out
```

**Latency hedefleri:**
* ASR: <200ms
* LLM: <400ms
* TTS: <150ms
* **Total: <1s**

***

### 4.6 Feature Bölümü 2 — Turkish LLM (ters layout)

**Tag:** Turkish AI  
**Başlık:** Local LLMs. Turkish first. No data leaves your server.  
**Metin:** We train and optimize language models for Turkish — for law, agriculture, education, and enterprise. Everything runs on prem when privacy demands it.

**Bullet listesi:**
* 4 bit quantization (INT4/INT8) without accuracy loss
* LoRA fine tuning with Unsloth for efficient training
* Open source Turkish models on Hugging Face (1000+ downloads)
* Peer reviewed research: Veri Bilimi 2025

**Sol taraf — Metrik kartları:**

| Metrik | Değer | Kaynak |
|---|---|---|
| TTS quality improvement | +30% | Fine tuning & error analysis |
| RAG response accuracy | +50% | Retriever + reranker + semantic cache |
| ASR performance gain | +20% | Whisper fine tuning for Turkish |

***

### 4.7 Projects — "Selected projects"

**Section tag:** Work  
**Başlık:** Selected projects  
**Alt metin:** From high impact projects to open source models with thousands of downloads.

6 proje kartı:

| # | Tag | Başlık | Açıklama | Rozet |
|---|---|---|---|---|
| 1 | Speech AI | **all of turkish models (llm, ts, stt)** | Turkish text to speech with voice cloning. Published on Hugging Face — 1000+ downloads. | 🤗 Hugging Face · Open source |
| 2 | LLM · RAG | **Legal LLM Chatbot** | Retrieval augmented legal Q&A with document indexing, semantic search, and guardrails. | 🏆 Featured project |
| 3 | AI Agents | **TUSAŞ R&D Agent System** | Autonomous agents scanning research papers and patents to propose R&D ideas for Turkish Aerospace Industries. | 🚀 TUSAŞ collaboration |
| 4 | Mobile | **LawBuddy** | Mobile app for law students with analytics and progress insights. 600+ active users through organic reach. | 📱 600+ users |
| 5 | Web · AI | **AI Pulse** | Real time AI news aggregator from Arxiv, Hugging Face, and tech blogs with built in "Spark AI" summarization. | ⚡ aipulseseven.vercel.app |
| 6 | Speech AI · RAG | **Real Time Voice AI Assistant** | Full stack voice AI with streaming audio, RAG for context aware responses, and optimized end to end latency. | 🔊 Sub second pipeline |
| 7 | tourism tour mail replier automation(price calculating and reply the mail) | **tourism company operation manager agent** | tourism company operation manager agent with n8n and llm. price calculating and reply the mail.|
`[ TODO: Her proje için GitHub veya demo linki ekleyin ]`

***

### 4.8 Research / Publication

**Section tag:** Research  
**Başlık:** Peer reviewed publication

> Bayram, C., Turan, C. A., Kürkçüoğlu, F., & Altıntaş, V. (2025). **Quantization Compensation in Turkish LLMs: An Evaluation of Accuracy, Speed, and Memory Usage.** *Veri Bilimi*, 8(2), 70–80.  
> https://izlik.org/JA77KD25EM

***

### 4.9 CTA Banner

**Başlık:** Ready to build with AI?  
**Metin:** Tell us about your project. We'll design the right system architecture and get it into production.  
**Butonlar:** `Start a conversation` (beyaz) · `Explore services` (outline)  
**Arka plan:** Tam indigo (`#4F46E5`)

***

### 4.10 Footer

**4 kolon:**

| OrionCAF | Solutions | Company | Connect |
|---|---|---|---|
| Tagline | Speech to Speech AI | About | LinkedIn |
| | LLM Fine Tuning | Projects | Hugging Face |
| | RAG Systems | Research | GitHub |
| | AI Automation | Open Source | Contact |
| | Mobile & Web | | |

**Footer bottom:**
> © OrionCAF 2025 — Manisa, Turkey · Built on open source AI

***

## 5. Teknik Stack

| Katman | Öneri | Karar |
|---|---|---|
| Framework | Next.js 14 (App Router) | `[ TODO ]` |
| Styling | Tailwind CSS | `[ TODO ]` |
| Hosting | Vercel | `[ TODO ]` |
| İletişim Formu | Formspree veya Resend | `[ TODO ]` |
| Domain | `[ TODO — orioncaf.ai? ]` | `[ TODO ]` |
| Dil | TR / EN toggle | `[ TODO ]` |

***

## 6. İletişim & Sosyal Linkler

| Platform | URL |
|---|---|
| LinkedIn (Şirket) | https://www.linkedin.com/company/107349213 |
| Hugging Face | https://huggingface.co/OrionCAF |
| GitHub (Cevdet) | https://github.com/Caturan |
| GitHub (Ferhat) | https://github.com/ferhatkurkcuoglu |
| İş E postası | `[ TODO ]` |

***

## 7. Görev Dağılımı

| Görev | Sorumlu | Son Tarih |
|---|---|---|
| Domain kararı | Tüm takım | |
| İngilizce metin revizyonu | `[ TODO ]` | |
| Proje GitHub linkleri ekle | Her kişi | |
| Logo / marka tasarımı | `[ TODO ]` | |
| Frontend geliştirme | `[ TODO ]` | |
| TR dil desteği | `[ TODO ]` | |
| İletişim formu kurulumu | `[ TODO ]` | |
| Test & yayın | Tüm takım | |

***

## 8. Açık Sorular

* [ ] Domain: `orioncaf.ai`, `orioncaf.com` veya `orioncaf.dev`?
* [ ] Site önce sadece İngilizce mi, yoksa baştan TR/EN mi?
* [ ] Proje kartlarında müşteri/kurum isimleri (TUSAŞ vb.) açık yazılsın mı?
* [ ] Siteye entegre AI chat widget olsun mu?
* [ ] Blog / araştırma bölümü açılış gününde hazır olacak mı, yoksa sonraya mı bırakılsın?

***

*Brief, homepage mockup'ından üretilmiştir. Zendesk konseptine uygun — product first, kişisel bilgi yok.*
