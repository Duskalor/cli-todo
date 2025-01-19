https://roadmap.sh/projects/task-tracker

# Task Tracker CLI Project

Welcome to the Task Tracker CLI project! This is a command line interface (CLI) tool to help you manage tasks effectively by allowing you to track what needs to be done, what you've completed, and what's currently in progress. This project focuses on enhancing your programming skills, particularly in filesystem interaction, user input handling, and CLI application development.

## Requirements

The application should be operated from the command line, allowing user actions and inputs as arguments. Task data should be stored in a JSON file. The application capabilities include:

- Adding, updating, and deleting tasks
- Marking a task as in progress or done
- Listing all tasks
- Listing tasks by status: done, not done, and in progress

### Constraints

- Choose any programming language for implementation.
- Use positional arguments for accepting user inputs.
- Store tasks in a JSON file within the current directory.
- Ensure JSON file creation if it doesn't exist.
- Utilize the native filesystem module of your programming language.
- Avoid external libraries or frameworks.
- Handle errors and edge cases gracefully.

## Command Examples

Below are the available commands and their usage:

- **Adding a New Task**

```shell
task-cli add "Buy groceries"
```

Output: Task added successfully (ID: 1)

- **Updating and Deleting Tasks**

```shell
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1
```

- **Marking Task Status**

```shell
task-cli mark-in-progress 1
task-cli mark-done 1
```

- **Listing Tasks**

```shell
task-cli list
```

- **Listing Tasks by Status**

```shell
task-cli list done
task-cli list todo
task-cli list in-progress
```

## Task Properties

Each task should contain the following properties:

- **id**: A unique identifier
- **description**: A short description
- **status**: The task status—todo, in-progress, or done
- **createdAt**: Task creation timestamp
- **updatedAt**: Last update timestamp

Ensure these properties are included in the JSON file upon adding a task, and update them as necessary.

## Getting Started

Here's how you can start building your Task Tracker CLI project:

### Set Up Your Development Environment

- Choose a familiar programming language (e.g., Python, JavaScript).
- Use a preferred code editor or IDE (e.g., VSCode, PyCharm).

### Project Initialization

- Create a project directory for your CLI tool.
- Set up version control (e.g., Git).

### Feature Implementation

- Begin with a basic CLI structure to process user inputs.
- Develop each feature step-by-step; test thoroughly before proceeding.
  - First, implement task addition, then listing, updating, marking status, etc.

### Testing and Debugging

- Individually test each function to ensure reliability.
- Examine the JSON file to confirm correct task storage.
- Debug any issues encountered during development.

### Finalizing the Project

- Complete and verify all functionalities.
- Refine your code and add comments where needed.
- Document usage details in this README file.

Upon completing this project, you'll have a functional tool for task management, providing a strong foundation for advanced programming projects.

Happy coding!
