/**
 * Example TypeScript Alexa Skill Handler for "Schlaubi Schlumpf"
 * Demonstrating how to use the account-linked Gemini API key (accessToken).
 */

import { HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core'
import { Response, IntentRequest } from 'ask-sdk-model'

/**
 * Custom Intent Handler (e.g. AskGeminiIntent)
 */
export const AskGeminiIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AskGeminiIntent'
    )
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    // 1. Retrieve the linked access token (Gemini API key) from the Alexa request context
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken

    // 2. If the user hasn't linked their key yet, prompt them with an Account Linking Card
    if (!accessToken) {
      const speechText =
        'Hallo! Um Schlaubi Schlumpf nutzen zu können, hinterlege bitte zuerst deinen persönlichen Google Gemini API-Key in der Alexa-App.'

      return handlerInput.responseBuilder
        .speak(speechText)
        // withLinkAccountCard() sends an interactive card to the user's Alexa App
        // with a direct button "Konto verknüpfen" that opens your GitHub Pages site!
        .withLinkAccountCard()
        .getResponse()
    }

    // 3. Extract the spoken question from the intent slot
    const request = handlerInput.requestEnvelope.request as IntentRequest
    const question =
      request.intent.slots?.question?.value ||
      'Erzähle mir einen kurzen schlumpfigen Witz.'

    try {
      // 4. Call Google Gemini using the user's individual API key
      const geminiAnswer = await queryGeminiApi(question, accessToken)

      const speakOutput = `<lang xml:lang="de-DE">Schlaubi sagt:</lang> ${geminiAnswer}`
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt('Möchtest du Schlaubi noch etwas fragen?')
        .getResponse()
    } catch (error: any) {
      // 5. Handle invalid or revoked API key gracefully
      if (
        error?.status === 400 ||
        error?.status === 403 ||
        error?.message?.includes('API_KEY_INVALID')
      ) {
        return handlerInput.responseBuilder
          .speak(
            'Dein hinterlegter Google API-Key ist leider ungültig oder abgelaufen. Bitte verknüpfe deinen Schlüssel in der Alexa-App erneut.',
          )
          .withLinkAccountCard()
          .getResponse()
      }

      console.error('Gemini API Error:', error)
      return handlerInput.responseBuilder
        .speak(
          'Entschuldigung, bei der Beantwortung deiner Frage durch Google Gemini ist ein technischer Fehler aufgetreten.',
        )
        .getResponse()
    }
  },
}

/**
 * Helper to query Google Gemini REST API
 */
async function queryGeminiApi(prompt: string, apiKey: string): Promise<string> {
  const model = 'gemini-1.5-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const error: any = new Error(
      errorData?.error?.message || `HTTP ${response.status}`,
    )
    error.status = response.status
    throw error
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  return text || 'Ich konnte leider keine Antwort generieren.'
}
