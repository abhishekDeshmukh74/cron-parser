
# Cron Parser

A command-line application that parses a cron string and outputs the expanded schedule for each field in a readable format.

---

## **Table of Contents**
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Folder Structure](#folder-structure)
- [Cron String Format](#cron-string-format)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## **Features**
- Parse and expand cron expressions into human-readable schedules.
- Supports lists (`1,2,3`), ranges (`1-5`), and steps (`*/5`).
- Provides detailed error messages for invalid inputs.

---

## **Requirements**
- Node.js (>=16.0.0)
- TypeScript
- `ts-node` (can be installed globally or used via `npm` => `npm i -g ts-node`)

---

## **Installation**
### Clone the Repository
```bash
git clone https://github.com/abhishekDeshmukh74/cron-parser
cd cron-parser
```

### Install Dependencies
```bash
npm install
```

---

## **Usage**
Run the program using the following command:
```bash
ts-node src/index "<cron_string>"
```

- Replace `<cron_string>` with your desired cron expression.
- Enclose the cron string in double quotes to prevent shell splitting.

---

## **Examples**
### Input
```bash
ts-node src/index "*/15 0 1,15 1-6 1-5 /usr/bin/find"
```

### Output
```text
minute         0 15 30 45
hour           0
day of month   1 15
month          1 2 3 4 5 6
day of week    1 2 3 4 5
command        /usr/bin/find
```

### Other Valid Cron Strings
1. Every 5 minutes:
   ```bash
   ts-node src/index "*/5 * * * * /usr/bin/env"
   ```
2. At 12 PM on the first Monday of January:
   ```bash
   ts-node src/index "0 12 1 1 1 /bin/bash script.sh"
   ```
3. At 3:15 AM on the 1st and 15th of June through August, Monday through Friday:
   ```bash
   ts-node src/index "15 3 1,15 6-8 1-5 echo 'Hello'"
   ```
---

## **Folder Structure**
The project follows a simple and organized structure:

```
cron-parser/
├── src/                      # Source code directory
│   ├── configuration.ts      # Data driven configuration for parser
│   ├── index.test.ts         # Test cases for index file and formatting of output
│   ├── index.ts              # Entry point for the application
│   ├── interfaces.ts         # Typings of CronField, SpecialChars
│   ├── operations.test.ts    # Test cases for the operations '*', '/', '-', ','
│   ├── operations.ts         # Code for the operations '*', '/', '-', ','
│   ├── parser.test.ts        # Test cases for the parser logic
│   └── parser.ts             # Core parsing logic for cron expressions
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Documentation (this file)
```

## **Cron String Format**
A valid cron string consists of **six fields**:
1. **Minute** (0-59)
2. **Hour** (0-23)
3. **day of month** (1-31)
4. **Month** (1-12)
5. **day of week** (0-6)
6. **Command** (any valid shell command)

### Supported Features:
- **Lists**: Separate values using commas, e.g., `1,15,30`.
- **Ranges**: Specify a range of values, e.g., `1-5`.
- **Steps**: Use `/` for steps, e.g., `*/5`.

### Notes:
- Wrap your cron string in quotes when running the application.

---

## **Testing**
Run the test suite to validate the parsing logic:
```bash
npm test
```

---

## **Troubleshooting**
### Common Errors:
1. **Error: Invalid cron string. Expected 6 fields.**
   - Ensure your input contains **exactly six fields**: five schedule fields and a command.
   - Wrap the cron string in quotes to pass it as a single argument.

2. **Error: Value out of range.**
   - Verify that the values in your cron fields fall within the allowed ranges.



## **Enjoy parsing your cron expressions! 🎉**
