import { Contact, Event, EmailTemplate, EmailLog, ContactStatus, TemplateType, EmailStatus } from '@prisma/client'

export type {
  Contact,
  Event,
  EmailTemplate,
  EmailLog,
  ContactStatus,
  TemplateType,
  EmailStatus
}

export interface ContactWithEmailLogs extends Contact {
  emailLogs: EmailLog[]
}

export interface EventWithEmailLogs extends Event {
  emailLogs: EmailLog[]
}

export interface EmailLogWithRelations extends EmailLog {
  contact: Contact
  event?: Event | null
  template?: EmailTemplate | null
}

export interface DashboardStats {
  totalContacts: number
  signedUp: number
  needReminder: number
  notComing: number
  blacklisted: number
  invited: number
  totalEmailsSent: number
  recentActivity: EmailLogWithRelations[]
}

export interface ContactFilter {
  status?: ContactStatus[]
  search?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface EmailComposerData {
  subject: string
  body: string
  recipients: string[]
  templateId?: string
  eventId?: string
}

export interface BulkEmailResult {
  recipient: string
  success: boolean
  error?: string
}

export interface CSVImportResult {
  imported: number
  failed: number
  errors: string[]
}