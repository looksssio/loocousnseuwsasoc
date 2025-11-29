<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1vjkL9tTe5OKX3zkBSsF0ba4fJKx7PgPQ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` and set any required keys:
   - `GEMINI_API_KEY` (if you use Gemini features)
   - `VITE_TIKTOK_API_URL` and `VITE_TIKTOK_API_KEY` (optional, for TikTok user details via RapidAPI)

   Example:
   ```env
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
   VITE_TIKTOK_API_URL=https://your-rapidapi-endpoint
   VITE_TIKTOK_API_KEY=YOUR_RAPIDAPI_KEY
   ```

3. Run the app:
   `npm run dev`

### TikTok details via RapidAPI (optional)
- If `VITE_TIKTOK_API_URL` and `VITE_TIKTOK_API_KEY` are provided, the username card under the input will fetch and display the user's display name and follower count.
- The app expects a `GET {VITE_TIKTOK_API_URL}/user/{username}` that returns JSON with fields like `name` and `followers` (or similar aliases such as `full_name`, `followerCount`).
- The avatar is loaded independently via Unavatar and will always attempt to display even without RapidAPI.
