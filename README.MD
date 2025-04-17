# 🌤️ SkyCast ☁️ – Your Magical Weather Companion  
A sleek, real-time weather dashboard built with **TypeScript**, powered by **OpenWeatherMap**, and enhanced with **local search history** and a user-friendly interface. Perfect for checking conditions before takeoff — or just stepping outside.  
![license-badge](https://img.shields.io/badge/License-MIT-yellow.svg)  
---  
## 📚 Table of Contents  
- 📝 [Description](#-description)  
- 💾 [Installation](#-installation)  
- 🚀 [Usage](#-usage)  
- 🤝 [How to Contribute](#-how-to-contribute)  
- 🧪 [Tests](#-tests)  
- ✨ [Features](#-features)  
- 🙌 [Credits](#-credits)  
---  
## 📝 Description  
Say hello to **SkyCast** — your trusty weather co-pilot. ☁️  
Easily check the current weather in any city with beautifully formatted results showing temperature, humidity, wind speed, and matching weather icons. Powered by the **OpenWeatherMap API** and built using modern **TypeScript** and **Node.js** practices, SkyCast keeps your past searches saved and your forecasts fast.  
---  
## 💾 Installation  
Before launching SkyCast into the stratosphere, make sure **Node.js** is installed on your machine.  
👉 [Download Node.js](https://nodejs.org)  
Then follow these steps in your terminal:  
```bash
# 1. Clone the repository
git clone git@github.com:your-username/skycast.git
cd skycast

# 2. Check that Node.js is installed
node -v

# 3. Install dependencies
npm install

# 4. Add your API key
# Create a .env file in the root directory and add:
API_KEY=your_api_key_here

# 5. Run the application
npm start
```  
---  
## 🚀 Usage  
Search for **any city worldwide**, and SkyCast will return:  
- 🌡️ **Temperature** (Fahrenheit)  
- 💧 **Humidity**  
- 🌬️ **Wind Speed**  
- 🌥️ **Icon with Weather Description**  
Recent searches are saved for quick access in future sessions.  
Whether you're planning a trip or just checking the skies before a walk, **SkyCast has you covered.**  
---  
## 🧪 Tests  
The application is functioning correctly if:  
✅ When a user enters a city, the **current weather and 5-day forecast** are displayed.  
✅ The **searched city is saved** in the sidebar for quick access in future sessions.  
If both conditions are met, **SkyCast is cleared for takeoff**. ✈️🌤️  
---  
## ✨ Features  
- Real-time weather data with OpenWeatherMap API  
- Clean UI built with TypeScript and Node.js  
- Local storage for persistent search history  
- Five-day forecast display  
- Weather icons with dynamic data  
---  
## 🤝 How to Contribute  
1. Fork the repo  
2. Create your feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes: `git commit -m 'Add some feature'`  
4. Push to the branch: `git push origin feature/YourFeature`  
5. Open a pull request  
---  
## 🙌 Credits  
Huge thanks to the magic of **Node.js** and **Inquirer** — without them, the engine wouldn’t even start 🔧.  
- 📚 **Xpert Learning** — for helpful coding insights along the journey  
- 🤖 **ChatGPT** — for README magic and code structuring