/**
 * Magische Glaskugel – Multi-Provider Alexa Skill Account Linking
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
        'Wähle deinen Anbieter und gib deinen API-Key ein, um den Alexa Skill <strong>Magische Glaskugel</strong> freizuschalten.',
      label_provider: 'KI-Anbieter',
      label_model: 'Modell',
      label_api_key: 'API-Key',
      get_key_link: 'Key besorgen ↗',
      format_hint: 'Format hängt vom Anbieter ab',
      btn_test_key: 'API-Key testen und Modelle laden',
      btn_testing: 'Prüfe & lade Modelle...',
      btn_link_alexa: 'Mit Alexa verknüpfen',
      btn_linking: 'Wird übertragen...',
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
      faq_change_title: '🔄 Wie kann ich Modell oder Key nachträglich ändern?',
      faq_change_desc:
        'Um Modell oder Key zu wechseln: Deaktiviere den Skill in der Alexa-App (unter Skills & Spiele → Magische Glaskugel), aktiviere ihn anschließend erneut und tippe auf "Konto verknüpfen". So kannst du jederzeit ein anderes KI-Modell oder einen neuen Key hinterlegen.',
      privacy_title: 'Rechtliche Hinweise & Datenschutz',
      privacy_subtitle:
        'Informationen zur Datenverarbeitung und Nutzung des Alexa Skills.',
      legal_privacy_h3: '1. Datenschutzerklärung (Privacy Policy)',
      legal_terms_h3:
        '2. Nutzungsbedingungen & Haftungsausschluss (Terms of Use)',
      footer_privacy: 'Datenschutz',
      footer_terms: 'Nutzungsbedingungen',
      opt_select_provider: '-- Anbieter wählen --',
      opt_select_model_locked:
        '-- Bitte zuerst API-Key testen und Modelle laden --',
      opt_select_model_first: '-- Zuerst Anbieter wählen --',
      opt_select_model: '-- Modell auswählen --',
      opt_custom_model: '✏️ Eigenes Modell manuell eingeben...',
      btn_manual_model: 'Modell manuell eingeben',
      btn_select_from_list: 'Aus Liste wählen',
      check_key_title: 'API-Key:',
      check_key_testing: 'Wird geprüft...',
      check_key_valid: 'API-Key ist gültig und aktiv',
      check_key_invalid: 'API-Key ist ungültig',
      check_models_title: 'Modelle:',
      check_models_testing: 'Werden geladen...',
      check_models_loaded: 'Modelle erfolgreich geladen',
      check_models_failed: 'Modelle konnten nicht geladen werden',
      error_no_provider: 'Bitte wähle zuerst einen KI-Anbieter aus.',
      error_no_model: 'Bitte wähle ein Modell aus oder gib eines manuell ein.',
      error_incomplete:
        'Bitte fülle alle Pflichtfelder aus (Anbieter, Modell und API-Key).',
      error_no_key: 'Bitte gib deinen API-Key ein.',
      error_missing_params:
        'Hinweis: Keine Alexa-Sitzung aktiv (redirect_uri / state fehlt). Bitte öffne diese Seite über den Verknüpfen-Button in der Alexa-App unter Skill-Einstellungen > Konto verknüpfen.',
      key_looks_invalid:
        'Hinweis: Der eingegebene Key hat ein ungewöhnliches Format.',
      test_valid_heading: 'Verbindung erfolgreich!',
      test_valid_text:
        'Dein API-Key ist aktiv und bereit für die Verknüpfung mit Alexa.',
      test_models_loaded:
        'Verbindung erfolgreich! {count} Modelle für {provider} geladen.',
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
        'Select your provider and enter your API key to activate the <strong>Magische Glaskugel</strong> Alexa skill.',
      label_provider: 'AI Provider',
      label_model: 'Model',
      label_api_key: 'API Key',
      get_key_link: 'Get API Key ↗',
      format_hint: 'Format depends on the provider',
      btn_test_key: 'Test API Key & Load Models',
      btn_testing: 'Testing & loading models...',
      btn_link_alexa: 'Link with Alexa',
      btn_linking: 'Transferring...',
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
      faq_change_title: '🔄 How do I change model or key later?',
      faq_change_desc:
        'To change your model or key: In the Alexa app, go to Skills & Games → Magische Glaskugel, deactivate the skill, activate it again, and tap "Link Account". This allows you to choose a new model or API key anytime.',
      privacy_title: 'Legal Information & Privacy Policy',
      privacy_subtitle:
        'Information regarding data processing and use of the Alexa skill.',
      legal_privacy_h3: '1. Privacy Policy',
      legal_terms_h3: '2. Terms of Use & Disclaimer',
      footer_privacy: 'Privacy Policy',
      footer_terms: 'Terms of Use',
      // Notifications
      opt_select_provider: '-- Select Provider --',
      opt_select_model_locked: '-- Please test API key & load models first --',
      opt_select_model_first: '-- Select provider first --',
      opt_select_model: '-- Select a model --',
      opt_custom_model: '✏️ Enter custom model manually...',
      btn_manual_model: 'Enter model manually',
      btn_select_from_list: 'Select from list',
      check_key_title: 'API Key:',
      check_key_testing: 'Checking...',
      check_key_valid: 'API key is valid and active',
      check_key_invalid: 'API key is invalid',
      check_models_title: 'Models:',
      check_models_testing: 'Loading...',
      check_models_loaded: 'models successfully loaded',
      check_models_failed: 'Models could not be loaded',
      error_no_provider: 'Please select an AI provider first.',
      error_no_model: 'Please select a model or enter one manually.',
      error_incomplete:
        'Please fill in all fields (provider, model, and API key).',
      error_no_key: 'Please enter your API key.',
      error_missing_params:
        'Notice: No active Alexa session (missing redirect_uri / state). Please open this page via the Alexa app under Skill Settings > Link Account.',
      key_looks_invalid: 'Notice: Key format looks unusual.',
      test_valid_heading: 'Connection Successful!',
      test_valid_text: 'Your API key is valid and ready to link with Alexa.',
      test_models_loaded:
        'Connection successful! Loaded {count} models for {provider}.',
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
          id: 'gemini-1.5-flash',
          name: 'Gemini 1.5 Flash (Empfohlen)',
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
      loadModels: async (apiKey) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}&pageSize=100`
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message || `HTTP ${res.status}`)
        }
        const data = await res.json()
        const rawList = data.models || []
        const filtered = rawList.filter((m) => {
          const id = (m.name || '').replace(/^models\//, '')
          const methods = m.supportedGenerationMethods || []
          return (
            methods.includes('generateContent') &&
            !id.includes('embedding') &&
            !id.includes('aqa') &&
            !id.includes('imagen')
          )
        })
        if (filtered.length === 0) return null
        return filtered.map((m) => {
          const id = (m.name || '').replace(/^models\//, '')
          let label = m.displayName || id
          if (id.includes('flash') && !label.includes('Flash'))
            label += ' (Flash)'
          return {
            id,
            name: label,
            displayName: 'Gemini',
          }
        })
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
      loadModels: async (apiKey) => {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { Authorization: `Bearer ${apiKey}` },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message || `HTTP ${res.status}`)
        }
        const data = await res.json()
        const rawList = data.data || []
        const chatModels = rawList.filter((m) => {
          const id = m.id || ''
          return (
            (id.startsWith('gpt-4') ||
              id.startsWith('chatgpt-') ||
              id.startsWith('o3-mini') ||
              id.startsWith('o1-mini')) &&
            !id.includes('realtime') &&
            !id.includes('audio') &&
            !id.includes('transcription') &&
            !id.includes('tts') &&
            !id.includes('search')
          )
        })
        if (chatModels.length === 0) return null
        chatModels.sort((a, b) => {
          if (a.id === 'gpt-4o-mini') return -1
          if (b.id === 'gpt-4o-mini') return 1
          if (a.id === 'gpt-4o') return -1
          if (b.id === 'gpt-4o') return 1
          return a.id.localeCompare(b.id)
        })
        return chatModels.map((m) => ({
          id: m.id,
          name:
            m.id === 'gpt-4o-mini' ? 'GPT-4o Mini (Empfohlen - schnell)' : m.id,
          displayName: 'ChatGPT',
        }))
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
      loadModels: async (apiKey) => {
        try {
          const res = await fetch('https://api.anthropic.com/v1/models', {
            headers: {
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true',
            },
          })
          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err?.error?.message || `HTTP ${res.status}`)
          }
          const data = await res.json()
          const rawList = data.data || []
          const filtered = rawList.filter((m) => {
            const id = (m.id || '').toLowerCase()
            return !id.includes('opus')
          })
          if (filtered.length === 0) return null
          filtered.sort((a, b) => {
            const aHaiku = a.id.includes('haiku') ? -1 : 1
            const bHaiku = b.id.includes('haiku') ? -1 : 1
            return aHaiku - bHaiku
          })
          return filtered.map((m) => ({
            id: m.id,
            name: m.display_name ? `${m.display_name} (${m.id})` : m.id,
            displayName: 'Claude',
          }))
        } catch (e) {
          if (
            e.name === 'TypeError' &&
            e.message?.toLowerCase().includes('fetch')
          ) {
            if (!apiKey.startsWith('sk-ant-')) {
              throw new Error('Key sollte mit sk-ant- beginnen.')
            }
            return null
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
          id: 'google/gemini-2.5-flash',
          name: 'Google Gemini 2.5 Flash (Schnell)',
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
      loadModels: async (apiKey) => {
        const authRes = await fetch('https://openrouter.ai/api/v1/auth/key', {
          headers: { Authorization: `Bearer ${apiKey}` },
        })
        if (!authRes.ok) {
          const err = await authRes.json().catch(() => ({}))
          throw new Error(err?.error?.message || `HTTP ${authRes.status}`)
        }
        const res = await fetch('https://openrouter.ai/api/v1/models')
        if (!res.ok) return null
        const data = await res.json()
        const rawList = data.data || []
        const popular = rawList.filter((m) => {
          const id = m.id || ''
          return (
            (id.startsWith('google/') ||
              id.startsWith('openai/') ||
              id.startsWith('anthropic/') ||
              id.startsWith('meta-llama/') ||
              id.startsWith('deepseek/') ||
              id.startsWith('mistralai/')) &&
            !id.toLowerCase().includes('opus') &&
            !id.toLowerCase().includes('embed')
          )
        })
        if (popular.length === 0) return null
        return popular.slice(0, 30).map((m) => {
          const id = m.id
          let providerName = 'KI'
          if (id.startsWith('google/')) providerName = 'Gemini'
          else if (id.startsWith('openai/')) providerName = 'ChatGPT'
          else if (id.startsWith('anthropic/')) providerName = 'Claude'
          else if (id.startsWith('meta-llama/')) providerName = 'Llama'
          else if (id.startsWith('deepseek/')) providerName = 'DeepSeek'
          else if (id.startsWith('mistralai/')) providerName = 'Mistral'
          return {
            id: m.id,
            name: `${m.name || m.id}`,
            displayName: providerName,
          }
        })
      },
    },
  }

  // State
  let currentLang = 'de'
  let currentTheme = 'system'
  let isManualModel = false
  let modelsLoaded = false
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
  const modelSelectWrapper = document.getElementById('modelSelectWrapper')
  const customModelWrapper = document.getElementById('customModelWrapper')
  const customModelInput = document.getElementById('customModelInput')
  const toggleManualModelBtn = document.getElementById('toggleManualModelBtn')
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
  const checksFeedback = document.getElementById('checksFeedback')
  const keyCheckItem = document.getElementById('keyCheckItem')
  const keyCheckIcon = document.getElementById('keyCheckIcon')
  const keyCheckTitle = document.getElementById('keyCheckTitle')
  const keyCheckDesc = document.getElementById('keyCheckDesc')
  const modelsCheckItem = document.getElementById('modelsCheckItem')
  const modelsCheckIcon = document.getElementById('modelsCheckIcon')
  const modelsCheckTitle = document.getElementById('modelsCheckTitle')
  const modelsCheckDesc = document.getElementById('modelsCheckDesc')

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
    const savedTheme = localStorage.getItem('theme_preference') || 'dark'
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
   * Set state of the two-step verification checks
   */
  function setChecksStatus(keyStatus, modelsStatus) {
    if (!checksFeedback) return

    if (!keyStatus && !modelsStatus) {
      checksFeedback.classList.add('hidden')
      return
    }

    checksFeedback.classList.remove('hidden')

    if (keyStatus) {
      keyCheckItem.className = `check-item ${keyStatus.state}`
      keyCheckIcon.textContent =
        keyStatus.state === 'success'
          ? '✅'
          : keyStatus.state === 'error'
            ? '❌'
            : '⏳'
      keyCheckTitle.textContent = t('check_key_title')
      keyCheckDesc.textContent = keyStatus.text
    }

    if (modelsStatus) {
      modelsCheckItem.className = `check-item ${modelsStatus.state}`
      modelsCheckIcon.textContent =
        modelsStatus.state === 'success'
          ? '✅'
          : modelsStatus.state === 'error'
            ? '❌'
            : '⏳'
      modelsCheckTitle.textContent = t('check_models_title')
      modelsCheckDesc.textContent = modelsStatus.text
    }
  }

  /**
   * Toggle between select dropdown and manual model input
   */
  function toggleManualModel(forceManual) {
    if (typeof forceManual === 'boolean') {
      isManualModel = forceManual
    } else {
      isManualModel = !isManualModel
    }

    if (isManualModel) {
      customModelWrapper?.classList.remove('hidden')
      modelSelectWrapper?.classList.add('hidden')
      if (toggleManualModelBtn) {
        toggleManualModelBtn.textContent = t('btn_select_from_list')
      }
      customModelInput?.focus()
    } else {
      customModelWrapper?.classList.add('hidden')
      modelSelectWrapper?.classList.remove('hidden')
      if (toggleManualModelBtn) {
        toggleManualModelBtn.textContent = t('btn_manual_model')
      }
      if (modelSelect && modelSelect.value === '__custom__') {
        modelSelect.selectedIndex = 0
      }
    }
  }

  /**
   * Render model options into modelSelect dropdown
   */
  function renderModelOptions(models, selectedId = null) {
    if (!modelSelect) return
    modelSelect.disabled = false
    modelSelect.innerHTML = `<option value="" disabled ${!selectedId ? 'selected' : ''}>${t('opt_select_model')}</option>`
    models.forEach((m) => {
      const opt = document.createElement('option')
      opt.value = m.id
      opt.textContent = m.name
      opt.setAttribute('data-display-name', m.displayName)
      if (selectedId && m.id === selectedId) {
        opt.selected = true
      }
      modelSelect.appendChild(opt)
    })

    // Always add option to enter model manually
    const customOpt = document.createElement('option')
    customOpt.value = '__custom__'
    customOpt.textContent = t('opt_custom_model')
    modelSelect.appendChild(customOpt)
  }

  /**
   * Update Provider UI (models, placeholders, links)
   */
  function updateProviderUI() {
    const providerKey = providerSelect?.value
    setChecksStatus(null, null)
    hideFeedback()

    if (!providerKey || !PROVIDERS[providerKey]) {
      if (modelSelect) {
        modelSelect.disabled = true
        modelSelect.innerHTML = `<option value="" disabled selected>${t('opt_select_model_locked')}</option>`
      }
      if (apiKeyLabel) apiKeyLabel.textContent = t('label_api_key')
      if (getKeyLink) getKeyLink.removeAttribute('href')
      if (apiKeyInput) apiKeyInput.placeholder = 'API-Key eingeben...'
      if (formatHint) formatHint.innerHTML = ''
      toggleManualModel(false)
      return
    }

    const prov = PROVIDERS[providerKey]

    // Lock models until user clicks test button!
    modelsLoaded = false
    if (modelSelect) {
      modelSelect.disabled = true
      modelSelect.innerHTML = `<option value="" disabled selected>${t('opt_select_model_locked')}</option>`
    }
    toggleManualModel(false)

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
  }

  /**
   * Test API Key and Load Available Models from Provider API
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

    // Show initial checks state
    setChecksStatus(
      { state: 'testing', text: t('check_key_testing') },
      { state: 'testing', text: t('check_models_testing') },
    )

    try {
      const liveModels = await prov.loadModels(apiKey)
      if (liveModels && liveModels.length > 0) {
        modelsLoaded = true
        setChecksStatus(
          { state: 'success', text: t('check_key_valid') },
          {
            state: 'success',
            text: `${liveModels.length} ${t('check_models_loaded')}`,
          },
        )
        renderModelOptions(liveModels, liveModels[0].id)
        toggleManualModel(false)
      } else {
        modelsLoaded = false
        setChecksStatus(
          { state: 'success', text: t('check_key_valid') },
          { state: 'error', text: t('check_models_failed') },
        )
        // Automatically switch to manual input if no models could be loaded
        toggleManualModel(true)
      }
    } catch (err) {
      modelsLoaded = false
      setChecksStatus(
        {
          state: 'error',
          text: `${t('check_key_invalid')} (${err.message || 'Fehler'})`,
        },
        { state: 'error', text: t('check_models_failed') },
      )
      if (modelSelect) {
        modelSelect.disabled = true
      }
    } finally {
      testKeyBtn.disabled = false
      testSpinner.classList.add('hidden')
      testKeyBtn.querySelector('.btn-text').textContent = t('btn_test_key')
    }
  }

  /**
   * Build base64-encoded token containing provider, model, apiKey, and displayName
   */
  function buildTokenPayload(apiKey) {
    const provider = providerSelect?.value
    let model = ''
    if (isManualModel || modelSelect?.value === '__custom__') {
      model = customModelInput?.value?.trim() || ''
    } else {
      model = modelSelect?.value || ''
    }

    if (!provider || !model || !apiKey) {
      return null
    }

    const prov = PROVIDERS[provider]
    let displayName = prov?.defaultDisplayName || 'KI'
    if (!isManualModel && modelSelect?.selectedIndex >= 0) {
      const selectedOption = modelSelect.options[modelSelect.selectedIndex]
      displayName =
        selectedOption?.getAttribute('data-display-name') || displayName
    }

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
   * Handle OAuth Form Submission
   */
  function handleFormSubmit(e) {
    e.preventDefault()
    const provider = providerSelect?.value
    const apiKey = getSanitizedKey()

    let model = ''
    if (isManualModel || modelSelect?.value === '__custom__') {
      model = customModelInput?.value?.trim() || ''
    } else {
      model = modelSelect?.value || ''
    }

    if (!provider) {
      showFeedback('error', t('error_no_provider'), '')
      providerSelect?.focus()
      return
    }

    if (!apiKey) {
      showFeedback('error', t('error_no_key'), '')
      apiKeyInput.focus()
      return
    }

    if (!model) {
      showFeedback('error', t('error_no_model'), '')
      if (isManualModel) {
        customModelInput?.focus()
      } else {
        modelSelect?.focus()
      }
      return
    }

    const { redirectUri, state } = authParams

    if (!redirectUri || !state) {
      showFeedback('error', t('error_missing_params'), '')
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
        if (modelSelect.value === '__custom__') {
          toggleManualModel(true)
        }
      })
    }
    if (toggleManualModelBtn) {
      toggleManualModelBtn.addEventListener('click', () => {
        toggleManualModel()
      })
    }

    // Form Events
    authForm.addEventListener('submit', handleFormSubmit)
    testKeyBtn.addEventListener('click', testApiKey)
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility)
    pasteKeyBtn.addEventListener('click', pasteFromClipboard)

    apiKeyInput.addEventListener('input', () => {
      hideFeedback()
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
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
