# Event Invitation Dashboard

A comprehensive full-stack application for managing event invitations, tracking RSVPs, and sending automated emails through Microsoft Outlook integration.

## Features

- 📧 **Email Management**: Send bulk emails using Microsoft Graph API
- 📊 **Dashboard Analytics**: Track invitation statistics and responses
- 👥 **Contact Management**: Organize contacts with status tracking
- 📅 **Event Management**: Create and manage events
- 🎨 **Modern UI**: Built with Next.js 14, TypeScript, and Tailwind CSS
- 🔐 **Authentication**: Microsoft Azure AD integration
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Microsoft Provider
- **Email**: Microsoft Graph API
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Microsoft Azure AD application

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth.js
- `NEXTAUTH_URL`: Your application URL
- `AZURE_AD_CLIENT_ID`: Microsoft Azure application client ID
- `AZURE_AD_CLIENT_SECRET`: Microsoft Azure application client secret
- `AZURE_AD_TENANT_ID`: Microsoft Azure tenant ID

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 4. Microsoft Azure Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Register a new application in Azure AD
3. Configure authentication:
   - Add redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
   - Add logout URL: `http://localhost:3000`
4. Add API permissions:
   - Microsoft Graph: `Mail.Send`
   - Microsoft Graph: `Mail.ReadWrite`
   - Microsoft Graph: `User.Read`
5. Generate a client secret
6. Copy the application details to your `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js configuration
│   │   ├── contacts/      # Contact management APIs
│   │   ├── events/        # Event management APIs
│   │   ├── emails/        # Email sending APIs
│   │   └── templates/     # Email template APIs
│   ├── dashboard/         # Dashboard pages
│   ├── contacts/          # Contact management pages
│   ├── events/            # Event management pages
│   └── templates/         # Email template pages
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── dashboard/        # Dashboard-specific components
│   ├── contacts/         # Contact management components
│   ├── email/            # Email-related components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth.js configuration
│   ├── prisma.ts         # Prisma client
│   ├── email-service.ts  # Microsoft Graph email service
│   └── utils.ts          # Utility functions
├── types/                # TypeScript type definitions
└── hooks/                # Custom React hooks
```

## Database Schema

The application uses the following main entities:

- **Contact**: Store contact information and status
- **Event**: Manage events and invitations
- **EmailTemplate**: Reusable email templates
- **EmailLog**: Track all sent emails

Contact statuses:
- 🔵 **INVITED**: Initial invitation sent
- 🟢 **SIGNED_UP**: Confirmed attendance
- 🟡 **NEED_REMINDER**: Requires follow-up
- 🔴 **NOT_COMING**: Declined invitation
- ⚫ **BLACKLISTED**: Excluded from future events

## API Endpoints

### Contacts
- `GET /api/contacts` - List contacts with filtering
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact
- `PATCH /api/contacts/[id]/status` - Update contact status

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create new event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Emails
- `POST /api/emails/send` - Send single email
- `POST /api/emails/bulk` - Send bulk emails
- `GET /api/emails/history` - Email history

### Templates
- `GET /api/templates` - List email templates
- `POST /api/templates` - Create template
- `PUT /api/templates/[id]` - Update template
- `DELETE /api/templates/[id]` - Delete template

## Features in Detail

### Dashboard
- Overview statistics for all contact statuses
- Recent activity feed
- Charts showing invitation trends
- Quick action buttons

### Contact Management
- Import/export contacts via CSV
- Bulk status updates
- Advanced filtering and search
- Contact history tracking

### Email System
- Rich text email composer
- Variable substitution ({{name}}, {{event}}, etc.)
- Bulk email sending with rate limiting
- Email delivery tracking
- Template management

### Event Management
- Create events with date/time
- Associate contacts with events
- Track event-specific statistics

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Update the following for production:
- `NEXTAUTH_URL`: Your production domain
- `DATABASE_URL`: Production database connection string
- Azure AD redirect URIs: Add your production domain

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Adding New Features

1. **Database Changes**: Update `prisma/schema.prisma` and run migrations
2. **API Routes**: Add new routes in `src/app/api/`
3. **UI Components**: Create components in `src/components/`
4. **Pages**: Add new pages in `src/app/`

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check Azure AD configuration and environment variables
2. **Database connection issues**: Verify DATABASE_URL and database accessibility
3. **Email sending fails**: Ensure proper Microsoft Graph API permissions

### Debugging

- Check browser console for client-side errors
- Check server logs for API errors
- Use Prisma Studio to inspect database data
- Test Microsoft Graph API permissions separately

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.