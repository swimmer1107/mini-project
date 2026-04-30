import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

let commitCount = '0'
try {
  commitCount = execSync('git rev-list --count HEAD').toString().trim()
} catch (e) {
  console.error('Could not get commit count', e)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __COMMIT_COUNT__: JSON.stringify(commitCount),
  }
})

