# Expense Tracker Application Readme

## Introduction

Welcome to the Expense Tracker application, a comprehensive tool for managing your expenses. This application is developed using the MEAN stack (MongoDB, Express.js, Angular, Node.js) and utilizes Bootstrap and Angular Material libraries. It offers a range of features to help you keep track of your spending, including user authentication, expense management, dashboard analytics, multi-currency support, viewing receipts, and calendar-based expense tracking.

## Features

1. **User Authentication**: Securely register and log in to your account, ensuring your expenses are protected.

2. **Add Expense**: Easily record new expenses, specifying the amount, category, date, and currency.

3. **Edit Expense**: Modify existing expenses to keep your records up-to-date.

4. **Delete Expense**: Remove expenses you no longer need to track.

5. **Dashboard Page**: Get an overview of your spending with visual graphs and charts.

6. **Multi-Currency Support**: Choose the currency in which you want your expenses to be calculated.

7. **View Bills**: Access a page to view images and information related to all your receipts and expenses.

8. **Calendar View**: Track your expenses on a calendar, providing a clear overview of when and how much you've spent.

## Getting Started

To run the frontend and backend parts of the application, follow these instructions:

### Frontend

1. Navigate to the `frontend/expense-tracker` directory.

2. Run the following command to serve the Angular frontend:
   ```
   ng serve
   ```

3. Open your web browser and go to `http://localhost:4200` to access the application.

### Setting up the Database

To run the Expense Tracker application, you need to set up a MongoDB database and populate it with collections from the "database" directory. Follow these steps to configure the database:

1. **MongoDB Installation**: Ensure you have MongoDB installed on your system. If not, you can download it from the [official MongoDB website](https://www.mongodb.com/try/download/community).

2. **Database Creation**: Create a new MongoDB database for the Expense Tracker application using the MongoDB command-line interface or a graphical client like MongoDB Compass.

3. **Populate Collections**: In the "database" directory, you'll find collections related to expenses and users. Import these collections into your newly created database. You can use the `mongoimport` command or a tool of your choice to achieve this.

   For example, to import a collection using `mongoimport`, you can use the following command:

   ```bash
   mongoimport --db your_database_name --collection your_collection_name --file path/to/collection.json
   ```

4. **Database Connection**: In the backend of the Expense Tracker application, make sure to configure the connection to your MongoDB database. You can typically find this configuration in a file related to your database connection settings (e.g., `config.js` or `mongoose.js`).

With your MongoDB database configured and populated, the Expense Tracker application will be able to store and retrieve expense and user data seamlessly. You are now ready to run the application as described in the previous sections.

### Backend

1. Navigate to the `backend` directory.

2. Build the application by running:
   ```
   npm run build
   ```

3. Start the Node.js server by running:
   ```
   node dist/index.js
   ```

Your backend should now be running, and the application is ready to use. Make sure you have a MongoDB instance set up and configured in your backend.

## Technologies Used

- **MongoDB**: Database to store expense data.
- **Express.js**: Backend framework for routing and handling requests.
- **Angular**: Frontend framework for building the user interface.
- **Node.js**: Backend runtime environment.
- **Bootstrap and Angular Material**: UI components for a clean and responsive design.

## License

This Expense Tracker application is open-source software licensed under the MIT License. You can find the full license text in the `LICENSE` file in the project's root directory.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please feel free to open an issue or contribute to the project by creating a pull request. Your feedback and contributions are greatly appreciated.

Enjoy tracking your expenses with the Expense Tracker application!
