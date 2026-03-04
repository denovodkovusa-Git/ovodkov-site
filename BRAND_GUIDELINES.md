# Ovodkov & AI Lab - Brand Guidelines

## BRAND LOGO & TYPOGRAPHY SKILL

The Ovodkov & AI Lab logo is a **purely typographic** construct. It relies entirely on specific strings, casing, and high-contrast color coding to convey the brand's premium, industrial-tech identity. 

**NO IMAGE FILES ARE USED FOR THE LOGO.** You must construct the logo natively in HTML/JSX using text spans.

### Exact Text Rules
The text must **ALWAYS** be written exactly as:
`Ovodkov & [AI Lab]`

- Do not alter the spelling.
- Do not remove the square brackets `[` and `]`.
- The case styling must be preserved exactly unless a specific CSS `uppercase` utility is explicitly applied to the entire block for layout purposes.

### Colors & Styling (UI Implementation)
When implementing this logo in Headers, Footers, or as generated overlay text, you **MUST** strictly adhere to the following color coding:

1. **"Ovodkov & "** 
   - Must ALWAYS be white or a high-contrast light steel.
   - **Tailwind Classes:** `text-white` or `text-zinc-50`

2. **"[AI Lab]"**
   - Must ALWAYS be prominent red.
   - **Tailwind Classes:** `text-red-600`

### Implementation Example (React/Next.js)

```tsx
<div className="font-black tracking-tight leading-none">
  <span className="text-white">Ovodkov & </span>
  <span className="text-red-600">[AI Lab]</span>
</div>
```

**Usage Rule:** This specification acts as the single source of truth. Whenever you create UI components, headers, footers, or generate overlay text for images, you MUST strictly use this exact string and color coding. Never alter the spelling or the brackets.
