# Gemini Api Real-Time Voice Chat Bot

This is a simple web-based voice chat application that demonstrates a real-time, two-way conversation with Google's Gemini Live API. The application captures microphone input from the user, streams it to the Gemini API, and plays back the AI's audio response in real-time.

## Features

* Real-time, two-way audio streaming.
* Low-latency responses.
* Server-side integration with the Gemini Live API.
* Simple, clean web interface.

## Tech Stack

* **Backend**: Node.js, Express.js
* **Real-time Communication**: `ws` (WebSockets)
* **AI**: Google Gemini Live API (`@google/generative-ai`)
* **Frontend**: HTML, CSS, JavaScript (`MediaRecorder` API)

---

## Setup and Installation

The recommended method for running this project is using Replit, as it provides a clean, pre-configured environment that avoids common local setup issues.

### Recommended Setup: Replit (Guaranteed to Work)

1.  **Create a New Replit Project**
    * Go to **[replit.com](https://replit.com)** and create a new, blank **`Node.js`** Repl.

2.  **Copy Project Files**
    * Copy the `server.js`, `package.json`, `.replit`, `public/index.html`, and `public/script.js` files from this project into your new Repl, maintaining the same folder structure.

3.  **Add API Key**
    * On the left sidebar of your Repl, click the **Secrets** icon (a key 🔑).
    * Create a new secret with the following details:
        * **KEY**: `GEMINI_API_KEY`
        * **VALUE**: `Your_Secret_Gemini_API_Key`

4.  **Install and Run**
    * Go to the **`Shell`** tab.
    * Run the command: `npm install`
    * After it finishes, click the green **`Run`** button at the top.

### Local Machine Setup

> **Note**: Running this project locally can be difficult due to potential environment issues with Node.js and `npm` that can prevent the correct dependencies from being installed. The Replit method is strongly recommended.

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install Node.js**
    * Ensure you have Node.js installed on your machine. The **LTS** version is recommended. You can download it from [nodejs.org](https://nodejs.org/).

3.  **Create `.env` file**
    * Create a file named `.env` in the root of the project folder.
    * Add your Gemini API key to this file:
        ```
        GEMINI_API_KEY=YOUR_SECRET_API_KEY_HERE
        ```

4.  **Install Dependencies**
    * Open your terminal in the project folder and run:
        ```bash
        npm install
        ```

5.  **Run the Application**
    * Start the server with the following command:
        ```bash
        npm start
        ```
    * Open your browser and navigate to `http://localhost:3000`.
