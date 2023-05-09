# Chatpgt in your cli

This repository contains a Node.js CLI (Command Line Interface) ChatGPT application. The application utilizes the power of OpenAI's GPT-3.5 language model to provide interactive chat-based conversations.
It serves as a base for starting your own chat app. It's mainly made for tuning yur models.

## Features

Interactive chat-based conversations with an AI-powered language model.
Easy-to-use command line interface.
Utilizes OpenAI's GPT-3.5 language model for generating responses.
Supports natural language input and provides human-like responses.
Can be used for various purposes like chatbots, conversational agents, or language understanding tasks.
Can be used to train a chatbot on a specific domain or topic.

## Prerequisites

Node.js
OpenAI API credentials

## Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/enyosolutions-team/chatgpt-cli-chat.git
   ```

2. Navigate to the project directory:

   ```
   cd chatgpt-cli-chat
   ```

3. Install the dependencies using npm:

   ```
   npm install
   ```

4. Rename the `.env.example` file to `.env`:

   ```
   mv .env.example .env
   ```

5. Update the `.env` file with your OpenAI API credentials:

   ```
   OPENAI_API_KEY=your-api-key
   ```

6. Save the changes to the `.env` file.

## Usage

To start the ChatGPT CLI application, open your terminal or command prompt, navigate to the project directory, and run the following command:

```
npm run chat
# or
yarn chat
```

You will be prompted to enter your message or question. Type your input and press Enter to receive a response from the AI-powered language model.

You can also fine tune

```
npm run tune
# or
yarn tune
```

You can pass an training file to the model to train.
```
npm run tune <absolute path of the training file>
# or
yarn tune <absolute path of the training file>
```
## Configuration

You can customize the behavior of the ChatGPT application by modifying the following configuration options in the `config.js` file:

- `maxTokens`: The maximum number of tokens to include in the generated response.
- `temperature`: Controls the randomness of the AI's response. Higher values (e.g., 0.8) produce more random outputs, while lower values (e.g., 0.2) make the outputs more deterministic.
- `maxChatMessages`: The maximum number of chat messages to include in the conversation history.

Feel free to tweak these settings to achieve the desired behavior and performance.

## Contributing

Contributions are welcome! If you find any bugs or want to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this code as per the terms of the license.

## Acknowledgments

- This application was built using the power of OpenAI's GPT-3.5 language model.
- Thanks to the open-source community for providing useful libraries and tools.
- Special thanks to the contributors of this project for their valuable inputs and suggestions.

## Contact

If you have any questions, suggestions, or feedback, please feel free to contact the project maintainer at [email protected]

## Getting Started

## Contributing

Contributions are welcome! If you find any bugs or want to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute this code as per the terms of the license.

## Acknowledgments

This application was built using the power of OpenAI's GPT-3.5 language model.
Thanks to the open-source community for providing useful libraries and tools.
Special thanks to the contributors of this project for their valuable inputs and suggestions.

## Contact

If you have any questions, suggestions, or feedback, please feel free to contact the project maintainer at [email protected]

## Backers & Sponsors

Support this project by becoming a [sponsor][sponsor].
