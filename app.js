/**
 * Schlaubi Schlumpf – Gemini AI Alexa Skill Account Linking
 * Static OAuth 2.0 Implicit Grant Handler for GitHub Pages
 */

;(() => {
  'use strict'

  // --- I18n Translations ---
  const TRANSLATIONS = {
    de: {
      brand_badge: 'KI Alexa Skill',
      tab_link: 'Verknüpfen',
      tab_guide: 'Anleitung',
      tab_privacy: 'Datenschutz',
      link_title: 'KI-Modell & API-Key verknüpfen',
      link_subtitle:
        'Wähle deinen Anbieter und gib deinen API-Key ein, um den Alexa Skill <strong>Schlaubi Schlumpf</strong> freizuschalten.',
      label_provider: 'KI-Anbieter',
      label_model: 'Modell',
      label_api_key: 'API-Key',
      get_key_link: 'Key besorgen ↗',
      format_hint: 'Format hängt vom Anbieter ab',
      btn_test_key: 'Key testen',
      btn_testing: 'Prüfe...',
      btn_link_alexa: 'Mit Alexa verknüpfen',
      btn_linking: 'Wird übertragen...',
      toggle_dev_mode: '🛠️ Entwickler- & Test-Modus',
      guide_title: 'So erhältst du deinen API-Key',
      guide_subtitle:
        'In wenigen Schritten erstellst du deinen persönlichen API-Key.',
      step1_heading: 'Entwicklerportal aufrufen',
      step1_desc: 'Öffne die API-Key-Seite deines gewünschten Anbieters.',
      step2_heading: 'Konto erstellen / anmelden',
      step2_desc: 'Logge dich beim gewählten Anbieter ein.',
      step3_heading: 'API-Schlüssel generieren',
      step3_desc: 'Erstelle einen neuen API-Schlüssel im Entwickler-Dashboard.',
      step4_heading: 'Schlüssel kopieren & hier einfügen',
      step4_desc:
        'Kopiere den generierten Schlüssel und füge ihn im Reiter "Verknüpfen" ein.',
      faq_cost_title: '💰 Welche Kosten entstehen?',
      faq_cost_desc:
        'Die anfallenden Kosten hängen vom gewählten Anbieter, Tarif und Modell ab. Bitte informiere dich direkt beim jeweiligen Anbieter über die aktuellen Preise und Konditionen.',
      faq_change_title: '🔄 Kann ich Modell oder Key später ändern?',
      faq_change_desc:
        'Ja! Öffne in der Alexa App einfach Skills & Spiele → Schlaubi Schlumpf → Einstellungen → Konto verknüpfen. Dort kannst du jederzeit ein anderes Modell oder einen neuen Key wählen.',
      privacy_title: 'Datenschutzerklärung & Nutzungsbedingungen',
      privacy_subtitle:
        'Transparenz über den Umgang mit Daten im Rahmen des Alexa Skills Schlaubi Schlumpf.',
      legal_privacy_h3: '1. Datenschutzerklärung (Privacy Policy)',
      legal_terms_h3: '2. Nutzungsbedingungen (Terms of Use)',
      footer_privacy: 'Datenschutz',
      footer_terms: 'Nutzungsbedingungen',
      opt_select_provider: '-- Anbieter wählen --',
      opt_select_model_first: '-- Zuerst Anbieter wählen --',
      opt_select_model: '-- Modell auswählen --',
      error_no_provider: 'Bitte wähle zuerst einen KI-Anbieter aus.',
      error_no_model: 'Bitte wähle ein Modell aus.',
      error_incomplete:
        'Bitte fülle alle Pflichtfelder aus (Anbieter, Modell und API-Key).',
      error_no_key: 'Bitte gib deinen API-Key ein.',
      error_missing_params:
        'Hinweis: Keine Alexa-Sitzung aktiv (redirect_uri / state fehlt). Bitte öffne diese Seite über den Verknüpfen-Button in der Alexa-App oder nutze den Entwickler-Modus unten.',
      key_looks_invalid:
        'Hinweis: Der eingegebene Key hat ein ungewöhnliches Format.',
      test_valid_heading: 'Verbindung erfolgreich!',
      test_valid_text:
        'Dein API-Key ist aktiv und bereit für die Verknüpfung mit Alexa.',
      test_invalid_heading: 'API meldet Fehler',
      test_network_error:
        'Netzwerkprüfung fehlgeschlagen. Der Key kann trotzdem verknüpft werden.',
      clipboard_denied:
        'Zwischenablage konnte nicht gelesen werden. Bitte füge den Key manuell ein.',
    },
    en: {
      brand_badge: 'AI Alexa Skill',
      tab_link: 'Link Key',
      tab_guide: 'Guide',
      tab_privacy: 'Privacy & Terms',
      link_title: 'Link AI Model & Key',
      link_subtitle:
        'Select your provider and enter your API key to activate the <strong>Schlaubi Schlumpf</strong> Alexa skill.',
      label_provider: 'AI Provider',
      label_model: 'Model',
      label_api_key: 'API Key',
      get_key_link: 'Get API Key ↗',
      format_hint: 'Format depends on the provider',
      btn_test_key: 'Test Key',
      btn_testing: 'Checking...',
      btn_link_alexa: 'Link with Alexa',
      btn_linking: 'Transferring...',
      toggle_dev_mode: '🛠️ Developer & Test Mode',
      guide_title: 'How to Get Your API Key',
      guide_subtitle: 'Follow these steps to create your personal AI API key.',
      step1_heading: 'Open Developer Portal',
      step1_desc: 'Open the API key page of your chosen provider.',
      step2_heading: 'Sign in / Create Account',
      step2_desc: 'Log in with your provider account.',
      step3_heading: 'Generate API Key',
      step3_desc: 'Create a new API key in the developer console.',
      step4_heading: 'Copy Key & Paste Here',
      step4_desc: 'Copy the generated key and paste it in the "Link Key" tab.',
      faq_cost_title: '💰 What are the costs?',
      faq_cost_desc:
        'Costs depend on the chosen provider, plan, and model. Please refer directly to the provider for current pricing and terms.',
      faq_change_title: '🔄 Can I change model or key later?',
      faq_change_desc:
        'Yes! Simply go to Alexa App → Skills & Games → Schlaubi Schlumpf → Settings → Link Account. You can switch models or update keys anytime.',
      privacy_title: 'Privacy Policy & Terms of Use',
      privacy_subtitle:
        'Transparency regarding data processing for the Schlaubi Schlumpf Alexa skill.',
      legal_privacy_h3: '1. Privacy Policy',
      legal_terms_h3: '2. Terms of Use',
      footer_privacy: 'Privacy Policy',
      footer_terms: 'Terms of Use',
      // Notifications
      opt_select_provider: '-- Select Provider --',
      opt_select_model_first: '-- Select provider first --',
      opt_select_model: '-- Select a model --',
      error_no_provider: 'Please select an AI provider first.',
      error_no_model: 'Please select a model.',
      error_incomplete:
        'Please fill in all fields (provider, model, and API key).',
      error_no_key: 'Please enter your API key.',
      error_missing_params:
        'Notice: No active Alexa session (missing redirect_uri / state). Please open this link via the Alexa app or use Developer Mode below.',
      key_looks_invalid: 'Notice: Key format looks unusual.',
      test_valid_heading: 'Connection Successful!',
      test_valid_text: 'Your API key is valid and ready to link with Alexa.',
      test_invalid_heading: 'API Error',
      test_network_error:
        'Network check failed. You can still proceed with linking.',
      clipboard_denied:
        'Clipboard could not be accessed. Please paste manually.',
    },
  }

  // --- Providers & Models Configuration ---
  const PROVIDERS = {
    google: {
      name: 'Google (Gemini)',
      keyLabel: 'Google Gemini API-Key',
      keyUrl: 'https://aistudio.google.com/app/apikey',
      placeholder: 'AIzaSy...',
      formatHint: 'Beginnt üblicherweise mit <code>AIzaSy</code> (39 Zeichen)',
      defaultDisplayName: 'Gemini',
      models: [
        {
          id: 'gemini-2.0-flash',
          name: 'Gemini 2.0 Flash (Empfohlen)',
          displayName: 'Gemini',
        },
        {
          id: 'gemini-2.5-flash',
          name: 'Gemini 2.5 Flash',
          displayName: 'Gemini',
        },
        {
          id: 'gemini-2.0-flash-lite',
          name: 'Gemini 2.0 Flash Lite',
          displayName: 'Gemini',
        },
      ],
      testKey: async (apiKey) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}&pageSize=1`
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message || `HTTP ${res.status}`)
        }
      },
    },
    openai: {
      name: 'OpenAI (ChatGPT)',
      keyLabel: 'OpenAI API-Key',
      keyUrl: 'https://platform.openai.com/api-keys',
      placeholder: 'sk-...',
      formatHint: 'Beginnt mit <code>sk-</code> oder <code>sk-proj-</code>',
      defaultDisplayName: 'ChatGPT',
      models: [
        {
          id: 'gpt-4o-mini',
          name: 'GPT-4o Mini (Empfohlen)',
          displayName: 'ChatGPT',
        },
        { id: 'gpt-4o', name: 'GPT-4o', displayName: 'ChatGPT' },
      ],
      testKey: async (apiKey) => {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { Authorization: `Bearer ${apiKey}` },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message || `HTTP ${res.status}`)
        }
      },
    },
    anthropic: {
      name: 'Anthropic (Claude)',
      keyLabel: 'Anthropic API-Key',
      keyUrl: 'https://console.anthropic.com/settings/keys',
      placeholder: 'sk-ant-...',
      formatHint: 'Beginnt mit <code>sk-ant-</code>',
      defaultDisplayName: 'Claude',
      models: [
        {
          id: 'claude-3-5-haiku-latest',
          name: 'Claude 3.5 Haiku (Empfohlen - schnell)',
          displayName: 'Claude',
        },
        {
          id: 'claude-3-5-sonnet-latest',
          name: 'Claude 3.5 Sonnet',
          displayName: 'Claude',
        },
        {
          id: 'claude-3-7-sonnet-latest',
          name: 'Claude 3.7 Sonnet',
          displayName: 'Claude',
        },
      ],
      testKey: async (apiKey) => {
        try {
          const res = await fetch('https://api.anthropic.com/v1/models', {
            headers: {
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
          })
          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err?.error?.message || `HTTP ${res.status}`)
          }
        } catch (e) {
          if (
            e.name === 'TypeError' &&
            e.message?.toLowerCase().includes('fetch')
          ) {
            if (!apiKey.startsWith('sk-ant-')) {
              throw new Error('Key sollte mit sk-ant- beginnen.')
            }
            return
          }
          throw e
        }
      },
    },
    openrouter: {
      name: 'OpenRouter (Multi-Provider)',
      keyLabel: 'OpenRouter API-Key',
      keyUrl: 'https://openrouter.ai/keys',
      placeholder: 'sk-or-...',
      formatHint: 'Beginnt mit <code>sk-or-</code>',
      defaultDisplayName: 'OpenRouter',
      models: [
        {
          id: 'google/gemini-2.0-flash-001',
          name: 'Google Gemini 2.0 Flash (Schnell)',
          displayName: 'Gemini',
        },
        {
          id: 'openai/gpt-4o-mini',
          name: 'OpenAI GPT-4o Mini (Schnell)',
          displayName: 'ChatGPT',
        },
        {
          id: 'anthropic/claude-3.5-haiku',
          name: 'Anthropic Claude 3.5 Haiku (Schnell)',
          displayName: 'Claude',
        },
        {
          id: 'anthropic/claude-3.7-sonnet',
          name: 'Anthropic Claude 3.7 Sonnet',
          displayName: 'Claude',
        },
        {
          id: 'meta-llama/llama-3.3-70b-instruct',
          name: 'Meta Llama 3.3 70B',
          displayName: 'Llama',
        },
        {
          id: 'deepseek/deepseek-chat',
          name: 'DeepSeek V3',
          displayName: 'DeepSeek',
        },
      ],
      testKey: async (apiKey) => {
        const res = await fetch('https://openrouter.ai/api/v1/auth/key', {
          headers: { Authorization: `Bearer ${apiKey}` },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message || `HTTP ${res.status}`)
        }
      },
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
  const providerSelect = document.getElementById('providerSelect')
  const modelSelect = document.getElementById('modelSelect')
  const apiKeyLabel = document.getElementById('apiKeyLabel')
  const getKeyLink = document.getElementById('getKeyLink')
  const formatHint = document.getElementById('formatHint')
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
    updateProviderUI()
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
   * Update Provider UI (models, placeholders, links)
   */
  function updateProviderUI() {
    const providerKey = providerSelect?.value
    if (!providerKey || !PROVIDERS[providerKey]) {
      if (modelSelect) {
        modelSelect.disabled = true
        modelSelect.innerHTML = `<option value="" disabled selected>${t('opt_select_model_first')}</option>`
      }
      if (apiKeyLabel) apiKeyLabel.textContent = t('label_api_key')
      if (getKeyLink) getKeyLink.removeAttribute('href')
      if (apiKeyInput) apiKeyInput.placeholder = 'API-Key eingeben...'
      if (formatHint) formatHint.innerHTML = ''
      updateDevPreview()
      return
    }

    const prov = PROVIDERS[providerKey]

    if (modelSelect) {
      modelSelect.disabled = false
      modelSelect.innerHTML = `<option value="" disabled selected>${t('opt_select_model')}</option>`
      prov.models.forEach((m) => {
        const opt = document.createElement('option')
        opt.value = m.id
        opt.textContent = m.name
        opt.setAttribute('data-display-name', m.displayName)
        modelSelect.appendChild(opt)
      })
    }

    if (apiKeyLabel) {
      apiKeyLabel.textContent = prov.keyLabel
    }
    if (getKeyLink) {
      getKeyLink.href = prov.keyUrl
    }
    if (apiKeyInput) {
      apiKeyInput.placeholder = prov.placeholder
    }
    if (formatHint) {
      formatHint.innerHTML = `<span class="hint-bullet">•</span> <span>${prov.formatHint}</span>`
    }
    updateDevPreview()
  }

  /**
   * Build base64-encoded token containing provider, model, apiKey, and displayName
   */
  function buildTokenPayload(apiKey) {
    const provider = providerSelect?.value
    const model = modelSelect?.value
    if (!provider || !model || !apiKey) {
      return null
    }

    const prov = PROVIDERS[provider]
    const selectedOption = modelSelect?.options[modelSelect?.selectedIndex]
    const displayName =
      selectedOption?.getAttribute('data-display-name') ||
      prov?.defaultDisplayName ||
      'KI'

    const payload = {
      provider,
      model,
      apiKey,
      displayName,
    }

    const jsonStr = JSON.stringify(payload)
    // Base64 encoding with UTF-8 support
    const base64 = btoa(unescape(encodeURIComponent(jsonStr)))
    return `cfg_${base64}`
  }

  /**
   * Test API Key against Provider API
   */
  async function testApiKey() {
    const providerKey = providerSelect?.value
    if (!providerKey || !PROVIDERS[providerKey]) {
      showFeedback('error', t('error_no_provider'), '')
      providerSelect?.focus()
      return
    }

    const apiKey = getSanitizedKey()
    if (!apiKey) {
      showFeedback('error', t('error_no_key'), '')
      apiKeyInput.focus()
      return
    }

    const prov = PROVIDERS[providerKey]

    // Update UI to testing state
    testKeyBtn.disabled = true
    testSpinner.classList.remove('hidden')
    testKeyBtn.querySelector('.btn-text').textContent = t('btn_testing')
    hideFeedback()

    try {
      await prov.testKey(apiKey)
      showFeedback('success', t('test_valid_heading'), t('test_valid_text'))
    } catch (err) {
      showFeedback(
        'error',
        `${prov.name} API-Fehler`,
        err.message || 'Verbindung fehlgeschlagen',
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
    const provider = providerSelect?.value
    const model = modelSelect?.value
    const apiKey = getSanitizedKey()

    if (!provider) {
      showFeedback('error', t('error_no_provider'), '')
      providerSelect?.focus()
      return
    }

    if (!model) {
      showFeedback('error', t('error_no_model'), '')
      modelSelect?.focus()
      return
    }

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

    const token = buildTokenPayload(apiKey)
    if (!token) {
      showFeedback('error', t('error_incomplete'), '')
      return
    }

    // Set submitting UI
    submitBtn.disabled = true
    submitSpinner.classList.remove('hidden')
    submitBtn.querySelector('.btn-text').textContent = t('btn_linking')

    // Build standard OAuth 2.0 Implicit Grant fragment
    const redirectUrl = `${redirectUri}#access_token=${encodeURIComponent(token)}&token_type=Bearer&state=${encodeURIComponent(state)}`

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
    const apiKey = getSanitizedKey()
    const token =
      forcedUrl ||
      (apiKey && providerSelect?.value && modelSelect?.value
        ? buildTokenPayload(apiKey)
        : null)

    const redirectUri =
      authParams.redirectUri ||
      devRedirectUri?.value ||
      'https://layla.amazon.com/api/skill/link/VENDOR_SIMULATION'
    const state =
      authParams.state || devState?.value || 'simulated-state-token-12345'

    const preview =
      forcedUrl ||
      (token
        ? `${redirectUri}#access_token=${encodeURIComponent(token)}&token_type=Bearer&state=${encodeURIComponent(state)}`
        : 'Bitte zuerst Anbieter, Modell und Key eingeben')
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

    // Provider & Model Selection
    if (providerSelect) {
      providerSelect.addEventListener('change', () => {
        updateProviderUI()
        hideFeedback()
      })
    }
    if (modelSelect) {
      modelSelect.addEventListener('change', () => {
        updateDevPreview()
      })
    }

    // Form Events
    authForm.addEventListener('submit', handleFormSubmit)
    testKeyBtn.addEventListener('click', testApiKey)
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
