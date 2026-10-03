#!/usr/bin/env node

/**
 * CLI Deployment Script for GitHub Pages
 * Triggered via: npm run deploy
 */

const { execSync } = require('child_process')

function run(command) {
  return execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim()
}

function runInherit(command) {
  execSync(command, { stdio: 'inherit' })
}

function main() {
  console.log('🚀 Preparing deployment to GitHub Pages...')

  // 1. Check if git remote "origin" is configured
  let remotes = ''
  try {
    remotes = run('git remote')
  } catch (error) {
    console.error('❌ Error checking git remotes:', error.message)
    process.exit(1)
  }

  if (!remotes.split('\n').includes('origin')) {
    console.error('\n❌ No git remote "origin" configured.')
    console.error('Please configure your GitHub repository remote first:')
    console.error(
      '  git remote add origin https://github.com/<username>/magische-glaskugel-config.git',
    )
    console.error('or (via SSH):')
    console.error(
      '  git remote add origin git@github.com:<username>/magische-glaskugel-config.git\n',
    )
    process.exit(1)
  }

  const originUrl = run('git remote get-url origin')

  // 2. Check current branch
  let currentBranch = 'main'
  try {
    currentBranch = run('git rev-parse --abbrev-ref HEAD')
  } catch (_) {
    currentBranch = 'main'
  }

  // 3. Check for uncommitted changes
  const status = run('git status --porcelain')
  if (status && !process.argv.includes('--force')) {
    console.warn('\n⚠️ You have uncommitted changes in your repository:')
    console.warn(status)
    console.warn('\nPlease commit your changes first:')
    console.warn('  git add .')
    console.warn('  git commit -m "your commit message"')
    console.warn('  npm run deploy\n')
    process.exit(1)
  }

  // 4. Push to remote
  console.log(`\n📤 Pushing branch "${currentBranch}" to origin (${originUrl})...`)
  try {
    runInherit(`git push origin ${currentBranch}`)
  } catch (error) {
    console.error('\n❌ Failed to push to remote repository.')
    console.error('Ensure that:')
    console.error('  1. The GitHub repository exists.')
    console.error('  2. You have write permissions and valid credentials.')
    process.exit(1)
  }

  // 5. Derive GitHub Pages URL
  let repoName = 'magische-glaskugel-config'
  let username = 'user'
  const matchHttps = originUrl.match(/github\.com\/([^/]+)\/([^/.]+)/)
  const matchSsh = originUrl.match(/github\.com:([^/]+)\/([^/.]+)/)
  const match = matchHttps || matchSsh

  if (match) {
    username = match[1]
    repoName = match[2]
  }

  const pagesUrl = `https://${username}.github.io/${repoName}/`

  console.log('\n✅ Successfully pushed to GitHub!')
  console.log(`✨ GitHub Actions is now deploying your site to GitHub Pages.`)
  console.log(`🌐 Live URL: ${pagesUrl}`)
  console.log(
    `🔍 Track deployment: https://github.com/${username}/${repoName}/actions\n`,
  )
}

main()
