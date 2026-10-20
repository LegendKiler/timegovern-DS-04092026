import { execSync } from 'child_process'
import { platform } from 'os'

if (platform() === 'win32') {
  try {
    execSync('powershell -ExecutionPolicy Bypass -File validate-icons.ps1', { stdio: 'inherit' })
  } catch (err) {
    console.error('Icon validation failed on Windows.')
    process.exit(1)
  }
} else {
  console.log('Non-Windows environment detected (Cloudflare/Linux). Skipping Windows-specific icon validation.')
  // If you have a Node.js equivalent for icon validation later, you can run it here.
}