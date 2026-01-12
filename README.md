# Smart Waiter
[![CI](https://github.com/REPLACE_OWNER/REPLACE_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/REPLACE_OWNER/REPLACE_REPO/actions/workflows/ci.yml)

## AI Capabilities
- Tool calling via `streamText` with explicit tools (`addToCart`, `removeFromCart`, `getMenu`, `getCart`).
- UI message streaming with `toUIMessageStreamResponse()` and `@ai-sdk/react` transport.
- Real-time cart mutations driven by tool results in the chat stream.
- OpenAI `gpt-4o` with full menu context and a system waiter persona.

## Quick Start
1. Install dependencies: `npm install`
2. Add `OPENAI_API_KEY` to `.env`
3. Run: `npm run dev`
