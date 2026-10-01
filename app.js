/**
 * Schlaubi Schlumpf – Gemini AI Alexa Skill Account Linking
 * Static OAuth 2.0 Implicit Grant Handler for GitHub Pages
 */

;(() => {
  'use strict'

  // --- I18n Translations ---
  const TRANSLATIONS = {
    de: {
      brand_badge: 'Gemini AI Alexa Skill',
      tab_link: 'Verknüpfen',
      tab_guide: 'Anleitung',
      tab_privacy: 'Datenschutz',
      link_title: 'Gemini API-Key verknüpfen',
      link_subtitle:
        'Gib deinen Google Gemini API-Key ein, um den Alexa Skill <strong>Schlaubi Schlumpf</strong> freizuschalten.',
      label_api_key: 'Google Gemini API-Key',
      get_key_link: 'Key besorgen ↗',
      format_hint: 'Beginnt üblicherweise mit <code>AIzaSy</code> (39 Zeichen)',
      btn_test_key: 'Key testen',
      btn_testing: 'Prüfe...',
      btn_link_alexa: 'Mit Alexa verknüpfen',
      btn_linking: 'Wird übertragen...',
      toggle_dev_mode: '🛠️ Entwickler- & Test-Modus',
      guide_title: 'So erhältst du deinen kostenlosen API-Key',
      guide_subtitle:
        'Google stellt im Free Tier ein kostenloses Kontingent für Gemini zur Verfügung.',
      step1_heading: 'Google AI Studio aufrufen',
      step1_desc: 'Öffne die offizielle Entwicklerplattform von Google.',
      step2_heading: 'Mit Google-Konto anmelden',
      step2_desc:
        'Logge dich mit deinem privaten Google-Konto (@gmail.com) ein. Eine Kreditkarte ist für den kostenlosen Free Tier in der Regel nicht erforderlich.',
      step3_heading: 'API-Schlüssel generieren',
      step3_desc:
        'Klicke auf die blaue Schaltfläche "Create API key" bzw. "API-Schlüssel erstellen".',
      step4_heading: 'Schlüssel kopieren & hier einfügen',
      step4_desc:
        'Kopiere den generierten Schlüssel (beginnt mit AIzaSy...) und füge ihn im Reiter "Verknüpfen" ein.',
      faq_cost_title: '💰 Ist das kostenlos?',
      faq_cost_desc:
        'Google stellt für Gemini im <strong>Free Tier</strong> ein kostenloses Kontingent bereit (z. B. bis zu 15 Anfragen/Min). Solange du den Free Tier nutzt, ist die Verwendung komplett kostenlos. Falls du ein kostenpflichtiges Google Cloud Abrechnungskonto verknüpft hast oder das Kontingent überschreitest, fallen die regulären Kosten des Anbieters (Google) an.',
      privacy_title: 'Datenschutzerklärung & Nutzungsbedingungen',
      privacy_subtitle:
        'Transparenz über den Umgang mit Daten im Rahmen des Alexa Skills Schlaubi Schlumpf.',
      legal_privacy_h3: '1. Datenschutzerklärung (Privacy Policy)',
      legal_terms_h3: '2. Nutzungsbedingungen (Terms of Use)',
      footer_privacy: 'Datenschutz',
      footer_terms: 'Nutzungsbedingungen',
      // Notifications
      error_no_key: 'Bitte gib deinen Google Gemini API-Key ein.',
      error_missing_params:
        'Hinweis: Keine Alexa-Sitzung aktiv (redirect_uri / state fehlt). Bitte öffne diese Seite über den Verknüpfen-Button in der Alexa-App oder nutze den Entwickler-Modus unten.',
      key_looks_invalid:
        'Hinweis: Der eingegebene Key hat ein ungewöhnliches Format (Google-Keys beginnen meist mit "AIzaSy...").',
      test_valid_heading: 'Verbindung erfolgreich!',
      test_valid_text:
        'Dein Google Gemini API-Key ist aktiv und bereit für die Verknüpfung mit Alexa.',
      test_invalid_heading: 'Google API meldet Fehler',
      test_network_error:
        'Netzwerkprüfung fehlgeschlagen. Der Key kann trotzdem verknüpft werden.',
      clipboard_denied:
        'Zwischenablage konnte nicht gelesen werden. Bitte füge den Key manuell ein.',
    },
    en: {
      brand_badge: 'Gemini AI Alexa Skill',
      tab_link: 'Link Key',
      tab_guide: 'Guide',
      tab_privacy: 'Privacy & Terms',
      link_title: 'Link Gemini API Key',
      link_subtitle:
        'Enter your Google Gemini API key to activate the <strong>Schlaubi Schlumpf</strong> Alexa skill.',
      label_api_key: 'Google Gemini API Key',
      get_key_link: 'Get API Key ↗',
      format_hint: 'Usually starts with <code>AIzaSy</code> (39 characters)',
      btn_test_key: 'Test Key',
      btn_testing: 'Checking...',
      btn_link_alexa: 'Link with Alexa',
      btn_linking: 'Transferring...',
      toggle_dev_mode: '🛠️ Developer & Test Mode',
      guide_title: 'How to Get Your Free API Key',
      guide_subtitle:
        'Google provides a free quota for Gemini in the Free Tier.',
      step1_heading: 'Open Google AI Studio',
      step1_desc: 'Go to the official Google developer platform.',
      step2_heading: 'Sign in with Google',
      step2_desc:
        'Sign in with your regular Google account (@gmail.com). A credit card is usually not required for the free tier.',
      step3_heading: 'Generate API Key',
      step3_desc: 'Click on the "Create API key" button.',
      step4_heading: 'Copy Key & Paste Here',
      step4_desc:
        'Copy the generated key (starts with AIzaSy...) and paste it in the "Link Key" tab.',
      faq_cost_title: '💰 Is it free?',
      faq_cost_desc:
        'Google provides a free quota in the Gemini <strong>Free Tier</strong> (e.g. up to 15 requests/min). As long as you use the Free Tier, usage is completely free. If you have a paid Google Cloud billing account linked or exceed the quota, regular provider charges apply.',
      privacy_title: 'Privacy Policy & Terms of Use',
      privacy_subtitle:
        'Transparency regarding data processing for the Schlaubi Schlumpf Alexa skill.',
      legal_privacy_h3: '1. Privacy Policy',
      legal_terms_h3: '2. Terms of Use',
      footer_privacy: 'Privacy Policy',
      footer_terms: 'Terms of Use',
      // Notifications
      error_no_key: 'Please enter your Google Gemini API key.',
      error_missing_params:
        'Notice: No active Alexa session (missing redirect_uri / state). Please open this link via the Alexa app or use Developer Mode below.',
      key_looks_invalid:
        'Notice: Key format looks unusual (Google keys usually start with "AIzaSy...").',
      test_valid_heading: 'Connection Successful!',
      test_valid_text:
        'Your Google Gemini API key is valid and ready to link with Alexa.',
      test_invalid_heading: 'Google API Error',
      test_network_error:
        'Network check failed. You can still proceed with linking.',
      clipboard_denied:
        'Clipboard could not be accessed. Please paste manually.',
    },
  }

  // State
  let currentLang = 'de'
  let currentTheme = 'system'
  let authParams = {
    redirectUri: null,
    state: null,
    clientId: null,
    responseType: null,
  }

  // DOM Elements
  const authForm = document.getElementById('authForm')
  const apiKeyInput = document.getElementById('apiKeyInput')
  const togglePasswordBtn = document.getElementById('togglePasswordBtn')
  const eyeOpenIcon = document.getElementById('eyeOpenIcon')
  const eyeClosedIcon = document.getElementById('eyeClosedIcon')
  const pasteKeyBtn = document.getElementById('pasteKeyBtn')
  const testKeyBtn = document.getElementById('testKeyBtn')
  const testSpinner = document.getElementById('testSpinner')
  const submitBtn = document.getElementById('submitBtn')
  const submitSpinner = document.getElementById('submitSpinner')
  const testFeedback = document.getElementById('testFeedback')
  const feedbackHeading = document.getElementById('feedbackHeading')
  const feedbackText = document.getElementById('feedbackText')
  const feedbackIcon = document.getElementById('feedbackIcon')

  // Theme & Lang Elements
  const langToggleBtn = document.getElementById('langToggleBtn')
  const langLabel = document.getElementById('langLabel')
  const themeToggleBtn = document.getElementById('themeToggleBtn')

  // Tabs
  const tabButtons = document.querySelectorAll('.tab-button')
  const tabPanels = document.querySelectorAll('.tab-panel')
  const backToLinkTab = document.getElementById('backToLinkTab')
  const footerPrivacyLink = document.getElementById('footerPrivacyLink')
  const footerTermsLink = document.getElementById('footerTermsLink')

  // Dev Mode
  const devModeToggleLink = document.getElementById('devModeToggleLink')
  const devSection = document.getElementById('devSection')
  const devRedirectUri = document.getElementById('devRedirectUri')
  const devState = document.getElementById('devState')
  const applyDevParamsBtn = document.getElementById('applyDevParamsBtn')
  const clearDevParamsBtn = document.getElementById('clearDevParamsBtn')
  const devRedirectPreview = document.getElementById('devRedirectPreview')

  /**
   * Initialize Application
   */
  function init() {
    initTheme()
    initLanguage()
    parseUrlParameters()
    setupEventListeners()
    handleHashNavigation()
  }

  /**
   * Theme Management
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme_preference') || 'system'
    setTheme(savedTheme)
  }

  function setTheme(theme) {
    currentTheme = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme_preference', theme)
  }

  function toggleTheme() {
    if (currentTheme === 'light') {
      setTheme('dark')
    } else if (currentTheme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  /**
   * Language Management
   */
  function initLanguage() {
    const savedLang = localStorage.getItem('lang_preference')
    if (savedLang && TRANSLATIONS[savedLang]) {
      currentLang = savedLang
    } else {
      const browserLang = (navigator.language || '').toLowerCase()
      currentLang = browserLang.startsWith('de') ? 'de' : 'en'
    }
    applyLanguage(currentLang)
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return
    currentLang = lang
    localStorage.setItem('lang_preference', lang)
    applyLanguage(lang)
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'de' ? 'en' : 'de')
  }

  function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang]
    document.documentElement.lang = lang
    langLabel.textContent = lang.toUpperCase()

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((elem) => {
      const key = elem.getAttribute('data-i18n')
      if (dict[key]) {
        elem.innerHTML = dict[key]
      }
    })

    updateDevPreview()
  }

  function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['de'][key] || key
  }

  /**
   * Parse Alexa OAuth Parameters from URL
   */
  function parseUrlParameters() {
    const searchParams = new URLSearchParams(window.location.search)
    authParams.redirectUri = searchParams.get('redirect_uri')
    authParams.state = searchParams.get('state')
    authParams.clientId = searchParams.get('client_id')
    authParams.responseType = searchParams.get('response_type')
  }

  /**
   * Sanitize Input API Key
   */
  function getSanitizedKey() {
    if (!apiKeyInput) return ''
    return apiKeyInput.value.trim().replace(/^["']|["']$/g, '')
  }

  /**
   * Feedback Card Display
   */
  function showFeedback(type, heading, text) {
    testFeedback.className = `feedback-card ${type}`
    feedbackHeading.textContent = heading
    feedbackText.textContent = text
    feedbackIcon.textContent =
      type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'
    testFeedback.classList.remove('hidden')
  }

  function hideFeedback() {
    testFeedback.classList.add('hidden')
  }

  /**
   * Test API Key against Google Gemini API
   */
  async function testGeminiApiKey() {
    const apiKey = getSanitizedKey()
    if (!apiKey) {
      showFeedback('error', t('error_no_key'), '')
      apiKeyInput.focus()
      return
    }

    // Update UI to testing state
    testKeyBtn.disabled = true
    testSpinner.classList.remove('hidden')
    testKeyBtn.querySelector('.btn-text').textContent = t('btn_testing')
    hideFeedback()

    try {
      // Query models endpoint with pageSize=1 for minimal payload
      const testUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}&pageSize=1`
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      })

      const data = await response.json()

      if (response.ok) {
        showFeedback('success', t('test_valid_heading'), t('test_valid_text'))
      } else {
        const errorMsg =
          data?.error?.message ||
          `HTTP ${response.status}: ${response.statusText}`
        showFeedback('error', t('test_invalid_heading'), errorMsg)
      }
    } catch (err) {
      showFeedback(
        'error',
        t('test_invalid_heading'),
        `${t('test_network_error')} (${err.message})`,
      )
    } finally {
      testKeyBtn.disabled = false
      testSpinner.classList.add('hidden')
      testKeyBtn.querySelector('.btn-text').textContent = t('btn_test_key')
    }
  }

  /**
   * Handle OAuth Form Submission
   */
  function handleFormSubmit(e) {
    e.preventDefault()
    const apiKey = getSanitizedKey()

    if (!apiKey) {
      showFeedback('error', t('error_no_key'), '')
      apiKeyInput.focus()
      return
    }

    const { redirectUri, state } = authParams

    if (!redirectUri || !state) {
      showFeedback('error', t('error_missing_params'), '')
      // Auto open dev mode to guide developer
      devSection.classList.remove('hidden')
      return
    }

    // Validate redirectUri protocol
    try {
      const parsedUrl = new URL(redirectUri)
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        showFeedback(
          'error',
          'Ungültige redirect_uri',
          'Das Protokoll muss HTTPS sein.',
        )
        return
      }
    } catch (_) {
      showFeedback(
        'error',
        'Ungültige redirect_uri URL',
        'Die Callback-URL von Amazon ist ungültig formatiert.',
      )
      return
    }

    // Set submitting UI
    submitBtn.disabled = true
    submitSpinner.classList.remove('hidden')
    submitBtn.querySelector('.btn-text').textContent = t('btn_linking')

    // Build standard OAuth 2.0 Implicit Grant fragment
    const redirectUrl = `${redirectUri}#access_token=${encodeURIComponent(apiKey)}&token_type=Bearer&state=${encodeURIComponent(state)}`

    updateDevPreview(redirectUrl)

    // Brief transition before navigating
    setTimeout(() => {
      window.location.href = redirectUrl
    }, 450)
  }

  /**
   * Password Visibility Toggle
   */
  function togglePasswordVisibility() {
    const isPassword = apiKeyInput.type === 'password'
    apiKeyInput.type = isPassword ? 'text' : 'password'
    eyeOpenIcon.classList.toggle('hidden', isPassword)
    eyeClosedIcon.classList.toggle('hidden', !isPassword)
  }

  /**
   * Paste from Clipboard
   */
  async function pasteFromClipboard() {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText()
        if (text) {
          apiKeyInput.value = text.trim()
          apiKeyInput.dispatchEvent(new Event('input'))
          showFeedback(
            'info',
            'Eingefügt!',
            'Key aus der Zwischenablage übernommen.',
          )
        }
      } else {
        apiKeyInput.focus()
      }
    } catch (_) {
      apiKeyInput.focus()
    }
  }

  /**
   * Tab Navigation
   */
  function activateTab(tabId) {
    tabButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-tab') === tabId
      btn.classList.toggle('active', isActive)
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false')
    })

    tabPanels.forEach((panel) => {
      const isActive = panel.id === `${tabId}Panel`
      panel.classList.toggle('active', isActive)
    })
  }

  /**
   * Handle Hash Navigation (for #datenschutz, #terms, etc.)
   */
  function handleHashNavigation() {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#datenschutz' || hash === '#privacy') {
      activateTab('privacy')
      setTimeout(() => {
        document.getElementById('datenschutz')?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
    } else if (hash === '#nutzungsbedingungen' || hash === '#terms') {
      activateTab('privacy')
      setTimeout(() => {
        document.getElementById('nutzungsbedingungen')?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
    } else if (hash === '#anleitung' || hash === '#guide') {
      activateTab('guide')
    } else if (hash === '#verknuepfen' || hash === '#link') {
      activateTab('link')
    }
  }

  /**
   * Developer / Test Mode
   */
  function updateDevPreview(forcedUrl) {
    const apiKey = getSanitizedKey() || 'DEIN_GEMINI_API_KEY'
    const redirectUri =
      authParams.redirectUri ||
      devRedirectUri?.value ||
      'https://layla.amazon.com/api/skill/link/VENDOR_SIMULATION'
    const state =
      authParams.state || devState?.value || 'simulated-state-token-12345'

    const preview =
      forcedUrl ||
      `${redirectUri}#access_token=${encodeURIComponent(apiKey)}&token_type=Bearer&state=${encodeURIComponent(state)}`
    if (devRedirectPreview) {
      devRedirectPreview.textContent = preview
    }
  }

  function applyDevParameters() {
    authParams.redirectUri = devRedirectUri.value.trim()
    authParams.state = devState.value.trim()
    updateDevPreview()
    showFeedback(
      'info',
      'Testparameter aktiv',
      'Du kannst die Verknüpfung nun mit Testdaten ausprobieren.',
    )
  }

  function clearDevParameters() {
    parseUrlParameters()
    updateDevPreview()
    hideFeedback()
  }

  /**
   * Register Event Listeners
   */
  function setupEventListeners() {
    // Language and Theme
    langToggleBtn.addEventListener('click', toggleLanguage)
    themeToggleBtn.addEventListener('click', toggleTheme)

    // Form Events
    authForm.addEventListener('submit', handleFormSubmit)
    testKeyBtn.addEventListener('click', testGeminiApiKey)
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility)
    pasteKeyBtn.addEventListener('click', pasteFromClipboard)

    apiKeyInput.addEventListener('input', () => {
      hideFeedback()
      updateDevPreview()
    })

    // Tab Buttons
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab')
        activateTab(tabId)
      })
    })

    // Cross-Tab Links
    if (backToLinkTab) {
      backToLinkTab.addEventListener('click', (e) => {
        e.preventDefault()
        activateTab('link')
      })
    }

    if (footerPrivacyLink) {
      footerPrivacyLink.addEventListener('click', (e) => {
        e.preventDefault()
        activateTab('privacy')
        document.getElementById('datenschutz')?.scrollIntoView({
          behavior: 'smooth',
        })
      })
    }

    if (footerTermsLink) {
      footerTermsLink.addEventListener('click', (e) => {
        e.preventDefault()
        activateTab('privacy')
        document.getElementById('nutzungsbedingungen')?.scrollIntoView({
          behavior: 'smooth',
        })
      })
    }

    window.addEventListener('hashchange', handleHashNavigation)

    // Dev Mode Toggle & Buttons
    devModeToggleLink.addEventListener('click', () => {
      devSection.classList.toggle('hidden')
      updateDevPreview()
    })

    applyDevParamsBtn.addEventListener('click', applyDevParameters)
    clearDevParamsBtn.addEventListener('click', clearDevParameters)
    devRedirectUri.addEventListener('input', () => updateDevPreview())
    devState.addEventListener('input', () => updateDevPreview())
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
