<p align="center">
  <img src="./client/public/Sparkr.svg" alt="Logo" width="200" height="200">
</p>
<h1 align="center">The professional's dating app ✨</h1>


About This App:

- 🔐 **Authentication System** with JWT  
- 🛡️ **Route Protection** for private pages  
- 👤 **User Profile** Creation and Updates  
- 🧑‍💼 **Admin Dashboard** for managing users  
- ✅ **Profile Verification** system  
- 🖼️ **Image Upload** for profile pictures & ID cards  
- 🔄 **Swipe Left/Right** Feature like Tinder  
- 💬 **Real-time Chat Messaging**  
- 🚫 **Chat Blocking** functionality  
- 🔔 **Real-time Notifications**  
- 🤝 **Smart Matching Algorithm**  
- 📱 **Responsive Mobile Design**  
- ⌛ **And a lot more... coming soon!**

### Setup .env file

```bash
PORT=5000
MONGO_URI=<your_mongo_uri>

JWT_SECRET=<your_very_strong_secret>

NODE_ENV=development
CLIENT_URL=http://localhost:5173

CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>

MAIL_PASS=<app_password_of_the_email >
EMAIL_USER=<youremail@gmail.com>

```
[Visit Cloudinary website](https://cloudinary.com/)

### Run this app locally

- Set `NODE_ENV=production` and build the app 👇

```shell
npm run build
```

### Start the app

for sevrver 
```shell
npm run start
```


for client
```shell
cd ./client 
npm run dev
```
