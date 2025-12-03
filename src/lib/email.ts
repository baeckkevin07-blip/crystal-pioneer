import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ConsentEmailData {
  pharmacyName: string
  pharmacyEmail: string
  campaignName: string
  campaignDescription: string
  consentLink: string
}

export async function sendConsentEmail(data: ConsentEmailData) {
  // If no API key, just simulate
  if (!process.env.RESEND_API_KEY) {
    console.log(`[SIMULATION] Email à ${data.pharmacyEmail} - Lien: ${data.consentLink}`)
    return { success: true, simulated: true }
  }

  try {
    const { data: result, error } = await resend.emails.send({
      from: 'iDklic Campagnes <marketing@idklic.com>',
      to: [data.pharmacyEmail],
      subject: `🏥 Participation - ${data.campaignName}`,
      html: getEmailTemplate(data),
    })

    if (error) {
      console.error('Erreur envoi email:', error)
      return { success: false, error }
    }

    console.log(`✅ Email envoyé à ${data.pharmacyEmail}`)
    return { success: true, emailId: result?.id }
  } catch (error) {
    console.error('Erreur:', error)
    return { success: false, error }
  }
}

function getEmailTemplate(data: ConsentEmailData): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.campaignName}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7fafc;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7fafc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 600px;">
              
              <!-- Header avec couleurs iDklic -->
              <tr>
                <td style="background-color: #1C3656; padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; line-height: 1.3;">
                    ${data.campaignName}
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Bonjour <strong>${data.pharmacyName}</strong>,
                  </p>
                  
                  <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Nous lançons une nouvelle campagne de sensibilisation et nous aimerions compter sur votre participation.
                  </p>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                    <tr>
                      <td style="background-color: #edf2f7; border-left: 4px solid #43B2B3; padding: 20px; border-radius: 4px;">
                        <p style="color: #2d3748; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 600;">
                          📋 ${data.campaignDescription || 'Campagne de sensibilisation en officine'}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                    En acceptant, vous recevrez le kit de communication avant le début de la campagne.
                  </p>
                  
                  <!-- CTA Button avec couleur iDklic -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" style="background-color: #43B2B3; border-radius: 6px;">
                              <a href="${data.consentLink}" 
                                 style="background-color: #43B2B3;
                                        color: #ffffff; 
                                        text-decoration: none; 
                                        padding: 16px 40px; 
                                        border-radius: 6px; 
                                        font-size: 16px; 
                                        font-weight: 600; 
                                        display: inline-block;
                                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                                ✅ Répondre à la demande
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 30px 0 0; text-align: center;">
                    Ou copiez ce lien dans votre navigateur :<br/>
                    <a href="${data.consentLink}" style="color: #43B2B3; word-break: break-all; text-decoration: underline;">
                      ${data.consentLink}
                    </a>
                  </p>
                </td>
              </tr>
              
              <!-- Footer avec couleurs iDklic -->
              <tr>
                <td style="background-color: #1C3656; padding: 30px; text-align: center;">
                  <p style="color: #ffffff; font-size: 13px; line-height: 1.6; margin: 0 0 10px; opacity: 0.9;">
                    <strong>iDklic</strong> - Laboratoire Pharmaceutique
                  </p>
                  <p style="color: #43B2B3; font-size: 12px; line-height: 1.6; margin: 0;">
                    Vous recevez cet email car vous êtes partenaire de nos campagnes de sensibilisation.
                  </p>
                </td>
              </tr>
            </table>
            
            <!-- Spacer -->
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px;">
              <tr>
                <td style="padding: 20px 0; text-align: center;">
                  <p style="color: #a0aec0; font-size: 11px; line-height: 1.4; margin: 0;">
                    Ce message est envoyé de manière sécurisée et confidentielle.<br/>
                    Si vous avez des questions, contactez-nous.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
