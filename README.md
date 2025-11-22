# TanStack Start: Top-Level Optional Route Parameter Breaks HMR in Network Mode

## Issue Summary

When using a top-level optional route parameter (e.g., `/{-$locale}/`), Vite HMR requests (like `/@react-refresh`) are incorrectly matched by the route in development mode when accessed via network IP instead of localhost. This breaks HMR when developing on non-localhost addresses.

## Expected Behavior

- Special Vite dev server paths (e.g., `/@react-refresh`, etc.) should not be matched by the route.
- HMR should work consistently regardless of whether the app is accessed via `localhost` or network IP

## Actual Behavior

When accessing the dev server via network IP (e.g., `192.168.1.100:3000`):
- The optional route parameter `{-$locale}` incorrectly captures Vite's special paths
- Browser console logs show `locale: @react-refresh` (see route file: `src/routes/{-$locale}/index.tsx`)
- This prevents HMR from functioning properly in network mode

When accessing via `localhost:3000`:
- Works correctly - only logs `locale: en` as expected
- HMR functions normally

## Reproduction Steps

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Start dev server with network access:**
   ```bash
   bun dev
   ```
   This runs: `vite dev --host --port 3000`
   
   The server will be accessible at both:
   - `http://localhost:3000`
   - `http://[YOUR_IP]:3000` (e.g., `http://192.168.1.100:3000`)

3. **Test localhost (working):**
   - Navigate to `http://localhost:3000/en`
   - Open server console
   - **Observe:** Only one log: `locale: en` ✅

4. **Test network IP (broken):**
   - Navigate to `http://192.168.1.100:3000/en` (use your actual IP)
   - Open server console
   - **Observe:** Multiple logs including `locale: @react-refresh` ❌
   - HMR will not work

## Environment

- TanStack Start: `^1.132.0`
- TanStack Router: `^1.132.0`
- Vite: `^7.1.7`
- React: `^19.2.0`
- Bun: `^1.3.3`

## Use Case

Top-level optional route parameters are commonly used for i18n where routes like `/`, `/en`, `/fr`, etc. all need to work. This issue makes network development (testing on other devices, mobile development) impractical.
