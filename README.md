## WeatherBot using NestJS
#### Prerequisites
- Node.js installed
- MongoDB installed
- Telegram Bot token from BotFather
- OpenWeatherMap API key
#### Steps
Clone the Repository
```bash

git clone https://github.com/codecraft26/wheather-bot-server
```
```bash
cd wheather-bot-server
```
#### Install Dependencies

```bash
 npm install
```
### a
##### Set Environment Variables
Create a .env file in the root directory with the following content:

```bash

TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
MONGODB_URI=YOUR_MONGODB_URI
OPENWEATHERMAP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
Replace YOUR_TELEGRAM_BOT_TOKEN, YOUR_MONGODB_URI, and YOUR_OPENWEATHERMAP_API_KEY with your actual values.
```
#### Create Admin User in MongoDB
You can use a MongoDB GUI or shell to insert an admin user manually. Add a document to the users collection:

```json
{
  "username": "admin",
  "password": "adminpassword",
  "isAdmin": true
}

```
#### Run the Application
```bash

npm start
```
The bot will be accessible at http://localhost:8000.

##### Telegram Commands
- /start - Subscribe to daily weather updates.
- /stop - Unsubscribe from daily weather updates.
####  Admin Panel
- Access the admin panel at http://localhost:8000/admin.
- Use Google login to authenticate.
- Update bot settings and manage user accounts.
#### Weather Update
- The bot sends weather updates daily at 9 AM using the OpenWeatherMap API.
