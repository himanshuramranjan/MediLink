# MediLink 

MediLink is an API designed to facilitate doctors in a hospital responsible for testing, quarantining, and ensuring the well-being of  patients. The API serves two types of users - Doctors and Patients. Doctors can log in to the system and perform the following tasks for each patient:

1. Register the Patient: The doctor can register a patient in the app using the patient's phone number. If the patient already exists, the API will return the patient's information.

2. Create a Report: After the checkup, the doctor can create a report for the patient. The Patient Report contains the following fields:

   - Created by Doctor
   - Status: Can be one of the following - Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit (Enum)
   - Date

## Table of Contents

- [Installation](#installation)
-[Configuration](#configuration)
- [Usage](#usage)
- [Routes](#routes)
  - [Doctor Routes](#doctor-routes)
  - [Patient Routes](#patient-routes)
  - [Report Routes](#report-routes)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

### Installation

1. Clone the repository:

   ```shell
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root directory.
2. Add the following environment variables in the `.env` file:

   ```plaintext
   DATABASE=<your_database_connection_string>
   PASSWORD=<your_database_password>
   JWT_SECRET_KEY=<your_jwt_secret_key>
   JWT_EXPIRES_IN=<your_jwt_expiration_day>

JWT_COOKIE_EXPIRES_IN=90

   ```

### Usage

1. Start the server:

   ```shell
   nodemon server.js
   ```

2. Access the application through the following URL:

   ```plaintext
   https://medi-link.onrender.com
   ```


## Required Routes

The API provides the following routes to interact with the system:

### Doctor Routes

- `POST /doctors/register`: Allows doctors to register with a username and password.

- `POST /doctors/login`: Allows doctors to log in and returns a JSON Web Token (JWT) to be used for authentication.

### Patient Routes

- `POST /patients/register`: Allows patients to register with the app using their phone number.

- `POST /patients/:id/create_report`: Doctors can create a medical report for a specific patient using the patient's ID.

- `GET /patients/:id/all_reports`: Lists all the reports of a patient, sorted from oldest to latest.

### Report Routes

- `GET /reports/:status`: Lists all the reports of all patients filtered by a specific status.

### Dependencies

Certainly! Here are the dependencies mentioned in the package.json file:

- `bcryptjs`: Version 2.4.3
- `dotenv`: Version 16.3.1
- `express`: Version 4.18.2
- `jsonwebtoken`: Version 9.0.0
- `mongoose`: Version 5.13.19
- `nodemon`: Version 2.0.22


## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please create a new issue or submit a pull request.
