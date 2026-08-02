# QuizArena

QuizArena is a simple full-stack Java quiz application.

The user enters their name, answers 12 Java questions and receives a final score. The result can then be saved to a top 10 leaderboard.

## Features

- 12 Java questions
- Score calculation
- Top 10 leaderboard
- Results saved in an H2 database
- Basic validation
- Responsive page
- Simple JUnit tests

## Technologies

- Java 17
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- H2 Database
- HTML
- CSS
- JavaScript
- Maven
- JUnit

## Requirements

- Java 17
- Internet connection for the first Maven build

Maven does not need to be installed separately because the project includes Maven Wrapper.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/QuizArena.git
cd QuizArena
```

Build the project.

On Windows:

```powershell
.\mvnw.cmd clean install
```

On macOS or Linux:

```bash
./mvnw clean install
```

Run the application.

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

On macOS or Linux:

```bash
./mvnw spring-boot:run
```

Open the application in your browser:

```text
http://localhost:8080
```

## Database

The project uses an H2 file database.

The database is created automatically when the application starts, so no separate database installation is required.

## API

### Get leaderboard results

```http
GET /api/results
```

### Save a result

```http
POST /api/results
```

Example:

```json
{
  "playerName": "Arina",
  "score": 10
}
```

## Testing

Run the tests on Windows:

```powershell
.\mvnw.cmd test
```

Run the tests on macOS or Linux:

```bash
./mvnw test
```