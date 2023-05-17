
# Project Assembler

## Description

Project Assembler is a solution to repetitive project setup tasks, designed to save you time and effort. By simply entering a project description (for example, a Node.js Express server that connects to the Twitter API and tweets at a regular schedule), the server returns a ZIP file containing the appropriate folders and files structure (empty files). The current implementation leverages the GPT-4 API from OpenAI to generate the project structure. It's highly recommended to use the GPT-4 API as previous versions might not yield the desired results.

## Installation

To get started, clone the repository to your local machine. The project is structured into two main directories: `client` and `server`.

To install dependencies for both the client and server, navigate into each directory and run:

`npm install` 

To start the server and client concurrently, you can execute the start script located in the root of the project:

`chmod +x ./start.sh
./start.sh` 

In case you want to run the server and client separately, you can do so with the following commands:

For the server:

`cd server
npm start` 

For the client:

`cd client
npm run dev` 

Remember to insert your own OpenAI key in the appropriate location.

## Usage

Refer to the project description above for an overview of what the project does and how to interact with it.

## Contributing

We currently don't have a contribution guideline. Feel free to raise issues or submit a pull request if you find something that could be improved.

## Dependencies

The server relies on the following dependencies:

-   Express.js
-   Archiver
-   Cors
-   dotenv
-   fs-extra
-   OpenAI
-   TypeScript

The client uses:

-   React.js
-   @emotion/react
-   @emotion/styled
-   @mui/icons-material
-   @mui/material
-   axios

## License

The project currently does not have a specific license. Please use responsibly and ethically.

## Contact

For any questions or concerns, please contact Taro Schenker on [LinkedIn](https://www.linkedin.com/in/taro-schenker/).

----------

Please note that this project is still in its early stages and may undergo significant changes.
