# Rise Up Kids – Sales Frontend (`riseupkidssales`)

## 📌 Purpose

This sub-repository is the **public sales and enrollment frontend** for **Rise Up Kids**, complementing the main LMS in the root project.

- **Main repo (`/`)**: Learning Management System (LMS) – Admin, Teacher, Parent, Child dashboards and learning experience.
- **This repo (`/riseupkidssales`)**: Public-facing website focused on:
  - Explaining the **methodology based on natural immersion**.
  - Presenting the **Core + Exploration** learning journey.
  - Inviting **Founding Families** to join early.
  - Guiding families through **plan selection and enrollment checkout**.
  - Connecting new parents to the **LMS backend** for authentication and account creation.

All content is primarily in **Brazilian Portuguese**, while the technical documentation is in **English**.

---

## 🧠 Product Narrative (What the site explains)

The copy you see in this project describes the full **sales story** for Rise Up Kids. Below is an English summary of each major section so developers understand intent and flows.

### 1. Methodology & Hero Section

- **Headline:** *Methodology based on natural immersion* – your child can become bilingual in a year, with English as a natural part of childhood.
- **Promise:** Rise Up Kids creates meaningful English experiences, within a **structured, progressive, tech-supported framework** with **real teachers**.
- **Key pillars highlighted in the hero:**
  - **Immersive English** – meaningful experiences with the language.
  - **Real Teachers** – human-led teaching, not just apps.
  - **Natural Learning** – from understanding to expression.
- **Primary CTA:** “I Want to Be a Founding Family” – leads users into the early-access flow.

### 2. Emotional & Brand Section

- Visual / emotional messaging like **JOY, LEARNING, GROWTH, PLAY, WONDER**.
- Aim: Convey that **happy children** learn better and that English is integrated into a joyful childhood.
- CTA: “See how English becomes natural” / “Discover how children learn English naturally and joyfully.”

### 3. What Science Shows (Early Years)

- Explains that from **0 to 10 years** the brain has high plasticity to absorb languages.
- Early exposure to language makes **understanding and expression more natural and easier**.
- Supports the idea that **now is the window** for parents to act.

### 4. Core + Exploration Methodology

Summarizes the **pedagogical method**:

- **Immersive English (Core):** Constant, natural exposure with **stories, music, meaningful contexts**.
- **Exploration (Non-linear paths):** Children explore **topics of interest**, building vocabulary and comprehension.
- **Integration (Holistic learning):** Natural connection between **comprehension, expression, and confidence**.

### 5. Language Development Journey

Describes how English grows step by step:

1. **Comprehension** – Immersive contact through meaningful experiences.
2. **Interaction** – Guided participation with teachers and activities.
3. **Expression** – Natural beginning of speech once the foundation is ready.
4. **Speaking** – Flows naturally in a structured and safe progression.

This section is ideal for a **timeline or step-by-step visual component**.

### 6. Inside the Rise Up Kids Experience

Highlights broader developmental outcomes beyond language:

- **Active curiosity** – English sparks interest and exploration.
- **Gentle persistence** – Children keep practicing, even while still learning.
- **Growth mindset** – Safe to make mistakes and keep learning.
- **Developing autonomy** – Children increasingly explore and progress independently.

These concepts can be represented as **feature cards** or **pillars**.

---

## 🌟 Founding Families Flow

### 1. Founding Families Benefits

Section “Famílias Fundadoras Rise Up Kids” explains why early adopters get special conditions:

- **Acompanhamento prioritário** – Closer access to the pedagogical team during the initial rollout.
- **Feedback individual frequente** – Personalized orientation and follow-up on each child’s evolution.
- **Valor fundador garantido** – Initial price is preserved for current and future children of that family.
- **Turmas iniciais reduzidas** – Smaller initial classes for more individual attention.

This section should lead naturally to the **invitation form**.

### 2. Social Proof – Testimonials

“O Que Dizem as Famílias” includes verified testimonials from real families (e.g., **Ana Paula, Ricardo, Camila**). These are used as **static or CMS-driven content** to increase trust.

### 3. What’s Included (Program Inclusions)

“O que está incluído” details the **scope of the program**:

- Guided activities for comprehension and interaction.
- Live classes with teachers trained in the Rise Up Kids method.
- Structured progression from comprehension to speech.
- Storytime sessions with visual support and guided language.
- Exclusive tool for children to “play with English”.
- Progress tracking, regularly added content, pronunciation practice.
- Parent support (24h, except Sundays).
- 12-month access with automatic renewal.
- 14-day guarantee.
- Physical box (Brazil only) + full digital version for other countries.

This content explains **what the subscription delivers** and should align with the LMS features.

---

## 📥 Founding Families Invitation Form

The **“EXCLUSIVE INVITATION”** section contains the core lead / enrollment form:

- **Guardian’s name** – Parent’s full name.
- **Email** – Primary contact and login email.
- **WhatsApp (optional)** – Phone number for direct communication.
- **Child’s age (years)** – e.g. “5 years old”.
- **CTA:** “⭐ Receive Founding Families Information – Limited to the first founding families.”

### Expected Backend Integration

When the user submits this form, the frontend should:

1. **Send a lead record** to the LMS backend (e.g., “founding family lead” with parent + child info).
2. Optionally tag the lead as **Founding Family candidate** for special flows (pricing, onboarding).
3. Trigger **email and/or WhatsApp communication** via backend services.

> The exact API endpoints and payloads are defined in the main LMS backend. This sales frontend is a **consumer** of that API.

---

## 📈 Learning Journey – Year 1 & Year 2

Section “A Jornada do Inglês no Rise Up Kids” explains **how children progress over two years**:

### Year 1 – Comprehend and Express

- The child first **understands**, then begins to **communicate**.
- Learns the “skeleton” of English (how sentences work and carry meaning).
- Key outcomes:
  - Listens in meaningful context.
  - Participates in interactive activities.
  - Naturally repeats what they learn.
  - Starts speaking with confidence.
  - Understands English naturally and responds naturally.

### Year 2 – Read, Write, and Expand

- With an oral foundation, **reading emerges naturally**.
- Key outcomes:
  - Starts reading with comprehension.
  - Recognizes words and patterns.
  - Begins writing sentences.
  - Expands vocabulary actively.
  - Reads with comprehension.
  - Writes complete sentences.
  - Continues advancing in English.

This is typically represented with a **two-year timeline** and **highlighted milestones**.

---

## ❓ FAQ (Perguntas Frequentes)

The FAQ answers the most important objections and practical questions:

- **Starting age:** Ideal for ages **5 to 13**; 4-year-olds can join with closer parent support.
- **Daily time requirement:** Focus is on **frequent contact**, not long sessions. Recommended **20–30 minutes per day**, at least **5 days per week**.
- **Beginners:** Program is designed for children with **zero prior English**. They start from comprehension with visual support and guided language.
- **Progress tracking:** Parents follow progress through completed activities, participation, and pedagogical guidance.
- **Physical box availability:** Optional physical box currently available only in **Brazil** at enrollment.
- **Guarantee:** 14-day guarantee on the digital program; physical box is **non-refundable after shipping**.

The end of this section reinforces the urgency:

> Don’t let the developmental window pass – childhood is the best time to build language, confidence, and curiosity.

Final CTA: **“Start My Child's Journey”**.

---

## 💳 Checkout & Enrollment Flow

The **“Complete sua matrícula”** section represents the **checkout experience**:

### 1. Plan Selection

- User selects the **number of children** and sees the corresponding **annual price**, e.g.:
  - `1 Criança – R$750 / year (≈ R$63/month equivalent)`
- Billing is **yearly** with **automatic renewal** (unless cancelled).

### 2. Optional Rise Up Kids Box

- **Rise Up Kids Box (R$297 per child)**:
  - Physical materials to extend immersion.
  - One box per child, covering 12 months.
  - Available **only in Brazil**.
  - **Non-refundable after shipping**.

### 3. Order Summary

- Shows:
  - Number of children.
  - Subtotal.
  - Optional box total.
  - **Grand total**.
- Notes:
  - **Taxes included**.
  - Subscription is **annual with automatic renewal**.
  - 14-day guarantee on the digital program.

### 4. Secure Payment

- Messaging around **secure payment**, **SSL encryption**, and **data protection**.
- Backend is responsible for:
  - Creating the **payment session** with the configured provider.
  - **Associating payment status** with the parent account in the LMS.
  - Handling **webhooks** and **subscription lifecycle**.

> The provider (e.g., Stripe, PagSeguro, or another gateway) and exact API flow are configured in the **main backend**; this sales frontend only initiates the process and responds to success/cancel callbacks.

---

## 🔗 Relationship with the LMS Backend

Although this is a **separate frontend submodule**, it is tightly coupled to the main LMS backend:

- **Authentication:** Parent authentication is shared; a parent created via the sales flow must be recognized by the LMS.
- **Parent accounts:** After successful checkout, the backend:
  - Creates/updates the **Parent user**.
  - Associates **child slots/profiles** based on the number of children purchased.
  - Marks subscription status (e.g., active, cancelled, pending).
- **Redirections:**
  - After checkout, parents may be redirected to the **LMS Parent Dashboard** in the main frontend.
  - Deep links may include a **magic link or login redirect** for a smooth first-time experience.

When implementing, keep in mind:

- This frontend **does not own** business logic for subscription or progress.
- It **presents the story**, **captures data**, and **initiates backend workflows**.

---

## 🧱 Tech & Implementation Notes

This submodule now contains a **Vite + React** app scaffolded under `web/`.

- **Framework:** React with Vite (aligned with the main `frontend/` app).
- **Styling:** Should use responsive layout, semantic HTML, accessible components, and animations that match the Rise Up Kids brand.
- **State management:** Lightweight client state (e.g., React Context, Zustand) for lead forms and checkout UI.
- **API integration:** Use a small HTTP client layer (e.g., Axios or `fetch`) with:
  - Centralized error handling.
  - Environment-based base URLs for the LMS backend.

### Folder Structure (current)

```text
riseupkidssales/
├── web/                # Vite + React sales frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

### Getting Started (dev)

From the `riseupkidssales/` directory:

```bash
cd web
npm install
npm run dev
```

Then open the printed `http://localhost:5173` URL in your browser.

### Environment & Integration

When integrating with the LMS backend, add environment variables to `web/.env` or `web/.env.local`, for example:

- `VITE_API_BASE_URL` – Base URL for the LMS backend API.
- Public keys or IDs for the payment provider, if needed on the frontend.

---

## 👤 Maintainer

**Jejomar Parrilla**  
Email: `jpar1252003@gmail.com`  
GitHub: [`github.com/Je-Joestar24`](https://github.com/Je-Joestar24)
