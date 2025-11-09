# MySchedule Telegram Bot - Appointment Scheduling System

## Overview
This is a Telegram bot-based appointment scheduling and management system built with Node.js, Express.js, MongoDB, and the Telegram Bot API. The application allows businesses to manage appointments, services, schedules, and client communications through Telegram.

## Project Purpose
MySchedule provides a comprehensive scheduling solution where:
- Business owners can create and manage multiple bot instances
- Clients can book appointments through Telegram
- Workers can be assigned to specific services
- Automated notifications keep everyone informed
- Admin panels provide management interfaces

## Current State
- **Status**: Running successfully on Replit
- **Database**: Connected to MongoDB Atlas
- **Bot**: Active and polling for Telegram updates
- **Server**: Backend API running on port 3000 (accessible via Replit's public URL)
- **Last Updated**: November 9, 2025

## Recent Changes
- **2025-11-09**: Initial Replit setup
  - Fixed case sensitivity issues in controller/service imports
  - Configured environment variables for MongoDB and Telegram Bot
  - Set up workflow for backend server
  - Configured server to bind on all interfaces (required for Replit's proxy to route external traffic)
  - Added .env.example for configuration reference
  - Installed all npm dependencies
  - Created comprehensive project documentation

## Project Architecture

### Technology Stack
- **Runtime**: Node.js v20
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Bot API**: node-telegram-bot-api
- **Process Management**: Child process forking for multi-bot support

### Directory Structure
```
.
├── controllers/v.2/        # Route handlers for API endpoints
├── services/v.2/           # Business logic layer
├── models/v.20/            # MongoDB schemas
├── routs/v.2/              # Express route definitions
├── modules/                # Core bot functionality
├── lib/                    # Utility functions
└── index.js                # Main application entry point
```

### Key Components

#### Main Application (index.js)
- Initializes Express server on port 3000
- Connects to MongoDB database
- Sets up the main Telegram bot instance
- Defines API routes for all features
- Launches individual bot panels via PanelsInitialization

#### Bot Panels (modules/Panel.js)
- Each registered bot runs as a separate child process
- Handles bot-specific Telegram interactions
- Runs on sequential ports starting at 3010
- Manages client bookings and interactions

#### API Endpoints
- `/api/bot` - Bot information and management
- `/api/company` - Company/business management
- `/api/service` - Service offerings management
- `/api/user` - Telegram user management
- `/api/appointment` - Appointment booking and management
- `/api/auth` - Authentication and authorization
- `/api/schedule` - Worker schedule management
- `/api/notification` - Notification system
- `/api/worker` - Worker management

### Database Models
- **Bot**: Bot configurations and settings
- **TelegramUser**: User profiles and information
- **CompanyService**: Business service offerings
- **AppointmentRelations**: Appointment bookings
- **WorkerBotSchedule**: Worker availability schedules
- **Notification**: Notification management
- **Auth**: Authentication keys and sessions
- **InviteLink**: Invite links for workers

## Environment Configuration

### Required Environment Variables
The following environment variables must be set (stored in Replit Secrets):

- `MONGO_DB_URL` - MongoDB connection string
- `BOT_TOKEN` - Telegram bot token from @BotFather
- `PORT` - Server port (default: 3000)
- `APP_URL` - Application URL for CORS (optional, defaults to "*")

### Optional Configuration
See `.env.example` for reference configuration.

## Running the Application

### Development
The application runs automatically via the configured workflow:
```bash
npm start
```

### Workflow Configuration
- **Name**: backend
- **Command**: npm start
- **Output**: console
- **Port**: 3000

## Features

### Multi-Bot Architecture
- Support for multiple independent bot instances
- Each bot has its own admin, services, and clients
- Isolated bot panels running on separate ports

### Appointment Management
- Clients can browse available services
- View worker schedules and book appointments
- Receive confirmation notifications
- Manage existing appointments

### Notification System
- New appointment alerts
- Discount announcements
- Appointment cancellation notices
- Customizable notification templates

### Service Management
- Create and manage business services
- Set pricing and discounts
- Assign services to workers
- Track service bookings

### Worker Management
- Assign workers to specific bot instances
- Define worker schedules
- Link workers to service offerings
- Invite new workers via Telegram

## Known Issues & Limitations

### Telegram Bot Polling Conflict
You may see this error in logs:
```
error: [polling_error] 409 Conflict: terminated by other getUpdates request
```
This occurs when multiple instances of the same bot are running (e.g., on your local machine and Replit). Only one instance can poll Telegram at a time. Stop other instances to resolve.

### Case Sensitivity
The project was developed on a case-insensitive filesystem but runs on Linux (case-sensitive). Import paths for controllers and services have been corrected to match actual file names (botController.js, companyService.js, etc.).

## User Preferences
No specific user preferences recorded yet.

## Development Notes

### Code Conventions
- Controllers follow a class-based pattern with instance methods
- Services encapsulate business logic and data operations
- Models define MongoDB schemas using Mongoose
- Routes delegate to controllers
- Modules contain bot interaction logic

### Database Connection
Uses Mongoose to connect to MongoDB Atlas with automatic reconnection.

### Bot Communication
Uses webhook polling (long polling) to receive updates from Telegram. The main bot handles user registration and admin functions, while panel bots handle client interactions.

## Troubleshooting

### Database Connection Issues
- Verify MONGO_DB_URL is correct in Replit Secrets
- Check MongoDB Atlas allows connections from Replit IPs
- Review connection logs in workflow output

### Bot Not Responding
- Ensure BOT_TOKEN is valid and set correctly
- Check only one instance is running (stop other instances)
- Verify bot permissions with @BotFather

### Module Not Found Errors
- Run `npm install` to ensure all dependencies are installed
- Check import paths match actual file names (case-sensitive)

## Next Steps / Future Enhancements
- Add automated tests for core functionality
- Implement rate limiting for API endpoints
- Add request validation middleware
- Consider migrating to TypeScript for better type safety
- Add comprehensive error handling and logging
- Implement bot analytics and reporting
