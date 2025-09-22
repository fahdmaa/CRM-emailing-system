-- Create Database Schema for Event Invitation Dashboard

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
DO $$ BEGIN
    CREATE TYPE "ContactStatus" AS ENUM ('INVITED', 'SIGNED_UP', 'NEED_REMINDER', 'NOT_COMING', 'BLACKLISTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "TemplateType" AS ENUM ('INVITATION', 'REMINDER', 'CONFIRMATION', 'FOLLOW_UP');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "EmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'DELIVERED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create tables
CREATE TABLE IF NOT EXISTS "contacts" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    status "ContactStatus" DEFAULT 'INVITED' NOT NULL,
    notes TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "events" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    title TEXT NOT NULL,
    description TEXT,
    "dateTime" TIMESTAMP(3) NOT NULL,
    location TEXT,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "email_templates" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    type "TemplateType" NOT NULL,
    "isDefault" BOOLEAN DEFAULT false NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "email_logs" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "contactId" TEXT NOT NULL,
    "eventId" TEXT,
    "templateId" TEXT,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    status "EmailStatus" DEFAULT 'PENDING' NOT NULL,
    "sentAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT "email_logs_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "email_logs_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "email_logs_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "email_templates"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "contacts_email_idx" ON "contacts"("email");
CREATE INDEX IF NOT EXISTS "contacts_status_idx" ON "contacts"("status");
CREATE INDEX IF NOT EXISTS "email_logs_contactId_idx" ON "email_logs"("contactId");
CREATE INDEX IF NOT EXISTS "email_logs_eventId_idx" ON "email_logs"("eventId");
CREATE INDEX IF NOT EXISTS "email_logs_status_idx" ON "email_logs"("status");
CREATE INDEX IF NOT EXISTS "email_logs_createdAt_idx" ON "email_logs"("createdAt");

-- Insert default email templates
INSERT INTO "email_templates" (name, subject, body, type, "isDefault") VALUES
('Default Invitation', 'You''re Invited to {{event}}!', 
 '<h2>Hello {{name}}!</h2><p>You''re invited to our upcoming event: <strong>{{event}}</strong></p><p>We''d love to have you join us!</p><p>Best regards,<br>The Event Team</p>', 
 'INVITATION', true),
('Reminder Email', 'Reminder: {{event}} is Coming Up!', 
 '<h2>Hi {{name}},</h2><p>Just a friendly reminder about our upcoming event: <strong>{{event}}</strong></p><p>Don''t forget to join us!</p><p>Best regards,<br>The Event Team</p>', 
 'REMINDER', true),
('Confirmation Email', 'Thanks for Signing Up for {{event}}!', 
 '<h2>Thank you {{name}}!</h2><p>We''ve received your registration for <strong>{{event}}</strong></p><p>We''re excited to see you there!</p><p>Best regards,<br>The Event Team</p>', 
 'CONFIRMATION', true)
ON CONFLICT DO NOTHING;