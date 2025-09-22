import { Client } from '@microsoft/microsoft-graph-client'
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client'

class TokenAuthProvider implements AuthenticationProvider {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getAccessToken(): Promise<string> {
    return this.accessToken
  }
}

export class EmailService {
  private graphClient: Client

  constructor(accessToken: string) {
    const authProvider = new TokenAuthProvider(accessToken)
    this.graphClient = Client.initWithMiddleware({ authProvider })
  }

  async sendEmail(to: string, subject: string, body: string) {
    try {
      const email = {
        message: {
          subject,
          body: {
            contentType: 'HTML',
            content: body
          },
          toRecipients: [{
            emailAddress: { address: to }
          }]
        }
      }

      const result = await this.graphClient.api('/me/sendMail').post(email)
      return { success: true, result }
    } catch (error) {
      console.error('Failed to send email:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async sendBulkEmails(
    recipients: { email: string; name: string }[], 
    subject: string, 
    body: string,
    batchSize: number = 10
  ) {
    const results = []
    
    // Process emails in batches to avoid rate limiting
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize)
      const batchPromises = batch.map(async (recipient) => {
        // Replace placeholders in email content
        const personalizedSubject = subject.replace(/{{name}}/g, recipient.name)
        const personalizedBody = body.replace(/{{name}}/g, recipient.name)
        
        const result = await this.sendEmail(recipient.email, personalizedSubject, personalizedBody)
        return {
          recipient: recipient.email,
          ...result
        }
      })
      
      const batchResults = await Promise.allSettled(batchPromises)
      results.push(...batchResults.map(result => 
        result.status === 'fulfilled' ? result.value : { 
          recipient: 'unknown', 
          success: false, 
          error: 'Promise rejected' 
        }
      ))
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    return results
  }

  async getUserProfile() {
    try {
      const user = await this.graphClient.api('/me').get()
      return { success: true, user }
    } catch (error) {
      console.error('Failed to get user profile:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}