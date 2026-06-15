export const courses = [
  {
    id: "bscs",
    name: "BSCS",
    fullName: "Computer Science",
    description: "Bachelor of Science in Computer Science",
    color: "from-blue-600 to-indigo-700",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50",
    subjects: [
      {
        id: "programming-fundamentals",
        name: "Programming Fundamentals",
        description: "Core concepts of programming and problem solving",
        questions: [
          {
            question: "Which of the following is NOT a programming paradigm?",
            options: ["Object-Oriented", "Functional", "Declarative", "Sequential Relay"],
            correct: 3,
          },
          {
            question: "What does a compiler do?",
            options: [
              "Executes code line by line at runtime",
              "Translates high-level code to machine code before execution",
              "Only checks for syntax errors",
              "Converts machine code to source code",
            ],
            correct: 1,
          },
          {
            question: "Which data type stores a single character in most languages?",
            options: ["String", "Integer", "Char", "Boolean"],
            correct: 2,
          },
          {
            question: "What is the output of: 5 % 2?",
            options: ["2.5", "2", "1", "0"],
            correct: 2,
          },
          {
            question: "What is a variable in programming?",
            options: [
              "A fixed value that cannot change",
              "A named storage location in memory",
              "A type of loop",
              "A function without parameters",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "data-structures",
        name: "Data Structures",
        description: "Arrays, linked lists, stacks, queues, and trees",
        questions: [
          {
            question: "Which data structure uses LIFO (Last In, First Out) order?",
            options: ["Queue", "Stack", "Linked List", "Array"],
            correct: 1,
          },
          {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
            correct: 2,
          },
          {
            question: "In a linked list, each node contains:",
            options: [
              "Only data",
              "Only a pointer",
              "Data and a pointer to the next node",
              "Two pointers and no data",
            ],
            correct: 2,
          },
          {
            question: "Which tree traversal visits the root node first?",
            options: ["In-order", "Post-order", "Pre-order", "Level-order"],
            correct: 2,
          },
          {
            question: "A hash table provides average-case lookup in:",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
            correct: 3,
          },
        ],
      },
      {
        id: "oop",
        name: "Object Oriented Programming",
        description: "Classes, inheritance, polymorphism, and encapsulation",
        questions: [
          {
            question: "Which OOP principle hides internal implementation details?",
            options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
            correct: 2,
          },
          {
            question: "What is a constructor?",
            options: [
              "A method that destroys an object",
              "A special method called when an object is created",
              "A method that returns a value",
              "A static variable",
            ],
            correct: 1,
          },
          {
            question: "Which keyword is used to inherit a class in Java?",
            options: ["implements", "inherits", "extends", "super"],
            correct: 2,
          },
          {
            question: "Polymorphism means:",
            options: [
              "A class can have only one form",
              "Objects of different types can be treated as the same type",
              "A method cannot be overridden",
              "All methods must be static",
            ],
            correct: 1,
          },
          {
            question: "An abstract class in OOP:",
            options: [
              "Can be instantiated directly",
              "Cannot have any methods",
              "Cannot be instantiated and may have abstract methods",
              "Must implement all interfaces",
            ],
            correct: 2,
          },
        ],
      },
      {
        id: "database-systems",
        name: "Database Systems",
        description: "Relational databases, SQL, and database design",
        questions: [
          {
            question: "What does SQL stand for?",
            options: [
              "Structured Query Language",
              "Sequential Query Language",
              "Standard Query Logic",
              "Simple Query Language",
            ],
            correct: 0,
          },
          {
            question: "Which SQL command is used to retrieve data?",
            options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            correct: 2,
          },
          {
            question: "A PRIMARY KEY constraint ensures:",
            options: [
              "Values can be NULL",
              "Values are unique and not NULL",
              "The column is indexed automatically",
              "Foreign key references are valid",
            ],
            correct: 1,
          },
          {
            question: "What is normalization in databases?",
            options: [
              "Increasing data redundancy for performance",
              "Organizing data to reduce redundancy and improve integrity",
              "Converting text to lowercase",
              "Encrypting the database",
            ],
            correct: 1,
          },
          {
            question: "Which JOIN returns all rows from both tables?",
            options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
            correct: 3,
          },
        ],
      },
      {
        id: "computer-networks",
        name: "Computer Networks",
        description: "Network protocols, OSI model, and communication",
        questions: [
          {
            question: "How many layers does the OSI model have?",
            options: ["4", "5", "6", "7"],
            correct: 3,
          },
          {
            question: "Which protocol is used to assign IP addresses automatically?",
            options: ["DNS", "FTP", "DHCP", "HTTP"],
            correct: 2,
          },
          {
            question: "TCP differs from UDP because TCP:",
            options: [
              "Is faster but unreliable",
              "Provides error-checking and guaranteed delivery",
              "Cannot handle large files",
              "Works only on local networks",
            ],
            correct: 1,
          },
          {
            question: "The default port for HTTPS is:",
            options: ["80", "21", "443", "22"],
            correct: 2,
          },
          {
            question: "A subnet mask of 255.255.255.0 corresponds to CIDR notation:",
            options: ["/8", "/16", "/24", "/32"],
            correct: 2,
          },
        ],
      },
    ],
  },
  {
    id: "bs-ai",
    name: "BS AI",
    fullName: "Artificial Intelligence",
    description: "Bachelor of Science in Artificial Intelligence",
    color: "from-violet-600 to-purple-700",
    textColor: "text-violet-600",
    bgLight: "bg-violet-50",
    subjects: [
      {
        id: "machine-learning",
        name: "Machine Learning",
        description: "Supervised, unsupervised, and reinforcement learning",
        questions: [
          {
            question: "Which algorithm is used for classification and regression?",
            options: ["K-Means", "Decision Tree", "PCA", "Apriori"],
            correct: 1,
          },
          {
            question: "Overfitting occurs when a model:",
            options: [
              "Performs well on training and test data",
              "Performs poorly on all data",
              "Memorizes training data but fails on new data",
              "Has too few parameters",
            ],
            correct: 2,
          },
          {
            question: "K-Means is an example of:",
            options: [
              "Supervised learning",
              "Reinforcement learning",
              "Unsupervised learning",
              "Semi-supervised learning",
            ],
            correct: 2,
          },
          {
            question: "What does gradient descent minimize?",
            options: ["Accuracy", "Loss/Cost function", "Number of parameters", "Training time"],
            correct: 1,
          },
          {
            question: "The train/test split is used to:",
            options: [
              "Speed up training",
              "Evaluate model generalization on unseen data",
              "Increase training data size",
              "Remove outliers",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "neural-networks",
        name: "Neural Networks",
        description: "Deep learning, backpropagation, and architectures",
        questions: [
          {
            question: "What is the activation function that outputs values between 0 and 1?",
            options: ["ReLU", "Tanh", "Sigmoid", "Softmax"],
            correct: 2,
          },
          {
            question: "Backpropagation is used to:",
            options: [
              "Feed data forward through the network",
              "Calculate and propagate gradients for weight updates",
              "Normalize input data",
              "Add more layers to the network",
            ],
            correct: 1,
          },
          {
            question: "CNNs (Convolutional Neural Networks) are best suited for:",
            options: ["Text classification", "Time-series data", "Image recognition", "Tabular data"],
            correct: 2,
          },
          {
            question: "What is dropout in neural networks?",
            options: [
              "Removing neurons permanently",
              "Randomly disabling neurons during training to prevent overfitting",
              "A type of activation function",
              "Reducing the learning rate",
            ],
            correct: 1,
          },
          {
            question: "ReLU activation function returns:",
            options: ["max(0, x)", "1/(1+e^-x)", "tanh(x)", "x²"],
            correct: 0,
          },
        ],
      },
      {
        id: "nlp",
        name: "Natural Language Processing",
        description: "Text processing, tokenization, and language models",
        questions: [
          {
            question: "What is tokenization in NLP?",
            options: [
              "Converting text to numerical vectors",
              "Breaking text into individual words or subwords",
              "Removing punctuation only",
              "Classifying sentence sentiment",
            ],
            correct: 1,
          },
          {
            question: "TF-IDF stands for:",
            options: [
              "Text Frequency – Inverse Document Frequency",
              "Term Frequency – Inverse Document Frequency",
              "Total Frequency – Integrated Document Filter",
              "Token Frequency – Indexed Document Feature",
            ],
            correct: 1,
          },
          {
            question: "Which model architecture powers most modern LLMs?",
            options: ["RNN", "LSTM", "Transformer", "CNN"],
            correct: 2,
          },
          {
            question: "Named Entity Recognition (NER) identifies:",
            options: [
              "Grammar errors",
              "Entities like names, places, and organizations in text",
              "Sentence length",
              "Language of the text",
            ],
            correct: 1,
          },
          {
            question: "Stop words in NLP are:",
            options: [
              "Important keywords",
              "Rare technical terms",
              "Common words (the, is, at) often removed before processing",
              "Misspelled words",
            ],
            correct: 2,
          },
        ],
      },
      {
        id: "computer-vision",
        name: "Computer Vision",
        description: "Image processing, object detection, and recognition",
        questions: [
          {
            question: "What does an edge detection algorithm find?",
            options: [
              "The dominant color in an image",
              "Boundaries between regions of different intensity",
              "The center of an image",
              "Text within images",
            ],
            correct: 1,
          },
          {
            question: "YOLO in object detection stands for:",
            options: [
              "You Only Look Once",
              "Your Object Learning Outcome",
              "Yield Oriented Layer Operations",
              "You Often Lose Objectives",
            ],
            correct: 0,
          },
          {
            question: "Image augmentation is used to:",
            options: [
              "Reduce image quality",
              "Artificially expand training data by applying transformations",
              "Convert images to text",
              "Increase image resolution",
            ],
            correct: 1,
          },
          {
            question: "A pixel in a grayscale image has how many channels?",
            options: ["3", "4", "1", "2"],
            correct: 2,
          },
          {
            question: "Semantic segmentation assigns:",
            options: [
              "A bounding box to each object",
              "A class label to every pixel in an image",
              "A caption to the whole image",
              "A confidence score to detected objects",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "ai-ethics",
        name: "AI Ethics",
        description: "Bias, fairness, transparency, and responsible AI",
        questions: [
          {
            question: "Algorithmic bias in AI models primarily arises from:",
            options: [
              "Too much computing power",
              "Biased or unrepresentative training data",
              "Using Python as the programming language",
              "Open-source development",
            ],
            correct: 1,
          },
          {
            question: "Explainability in AI refers to:",
            options: [
              "Making code comments longer",
              "The ability to understand and interpret how a model makes decisions",
              "Increasing model accuracy",
              "Using simpler datasets",
            ],
            correct: 1,
          },
          {
            question: "The GDPR regulation directly impacts AI by:",
            options: [
              "Banning AI development in Europe",
              "Requiring all AI to be open-source",
              "Giving individuals rights over their personal data used in AI systems",
              "Mandating that all AI decisions be made by humans",
            ],
            correct: 2,
          },
          {
            question: "Differential privacy is a technique that:",
            options: [
              "Encrypts model weights",
              "Adds mathematical noise to data to protect individual privacy",
              "Separates training and test sets",
              "Deletes sensitive columns from datasets",
            ],
            correct: 1,
          },
          {
            question: "A 'black box' AI model means:",
            options: [
              "The model uses dark-colored hardware",
              "The model's internal decision process is not transparent",
              "The model only processes image data",
              "The model has no training data",
            ],
            correct: 1,
          },
        ],
      },
    ],
  },
  {
    id: "bs-cyber",
    name: "BS Cyber Security",
    fullName: "Cyber Security",
    description: "Bachelor of Science in Cyber Security",
    color: "from-red-600 to-rose-700",
    textColor: "text-red-600",
    bgLight: "bg-red-50",
    subjects: [
      {
        id: "network-security",
        name: "Network Security",
        description: "Firewalls, intrusion detection, and VPNs",
        questions: [
          {
            question: "A firewall primarily works by:",
            options: [
              "Encrypting all network traffic",
              "Scanning for viruses in files",
              "Filtering incoming and outgoing network packets by rules",
              "Authenticating users with passwords",
            ],
            correct: 2,
          },
          {
            question: "A DDoS attack aims to:",
            options: [
              "Steal user passwords",
              "Encrypt files for ransom",
              "Overwhelm a service with traffic to make it unavailable",
              "Inject malicious code into a database",
            ],
            correct: 2,
          },
          {
            question: "A VPN provides security by:",
            options: [
              "Blocking all external websites",
              "Creating an encrypted tunnel for data transmission",
              "Assigning a new MAC address",
              "Disabling unused ports",
            ],
            correct: 1,
          },
          {
            question: "What is an Intrusion Detection System (IDS)?",
            options: [
              "A system that prevents all network connections",
              "A system that monitors network traffic for suspicious activity",
              "A type of firewall",
              "A password manager",
            ],
            correct: 1,
          },
          {
            question: "Port scanning is used to:",
            options: [
              "Speed up internet connection",
              "Discover open ports and services on a network host",
              "Block specific websites",
              "Assign IP addresses",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "cryptography",
        name: "Cryptography",
        description: "Encryption, hashing, and digital signatures",
        questions: [
          {
            question: "AES (Advanced Encryption Standard) is a:",
            options: [
              "Asymmetric encryption algorithm",
              "Hashing algorithm",
              "Symmetric encryption algorithm",
              "Digital signature scheme",
            ],
            correct: 2,
          },
          {
            question: "Which is an asymmetric encryption algorithm?",
            options: ["AES", "DES", "RSA", "Blowfish"],
            correct: 2,
          },
          {
            question: "A hash function's main property is:",
            options: [
              "It is reversible",
              "It produces variable-length output",
              "It produces a fixed-length output that cannot be reversed",
              "It requires a key",
            ],
            correct: 2,
          },
          {
            question: "Digital signatures provide:",
            options: [
              "Confidentiality only",
              "Authentication and non-repudiation",
              "Data compression",
              "Symmetric key exchange",
            ],
            correct: 1,
          },
          {
            question: "In a public key infrastructure, the public key is used to:",
            options: [
              "Decrypt data",
              "Sign documents",
              "Encrypt data intended for the key owner",
              "Generate the private key",
            ],
            correct: 2,
          },
        ],
      },
      {
        id: "ethical-hacking",
        name: "Ethical Hacking",
        description: "Penetration testing, vulnerability assessment",
        questions: [
          {
            question: "Ethical hacking is also called:",
            options: ["Black-box testing", "Penetration testing", "Fuzz testing", "Regression testing"],
            correct: 1,
          },
          {
            question: "SQL injection attacks target:",
            options: [
              "Operating system vulnerabilities",
              "Web application input fields to manipulate database queries",
              "Wireless network protocols",
              "Physical server access",
            ],
            correct: 1,
          },
          {
            question: "The reconnaissance phase in ethical hacking involves:",
            options: [
              "Exploiting vulnerabilities",
              "Installing backdoors",
              "Gathering information about the target system",
              "Cleaning up evidence",
            ],
            correct: 2,
          },
          {
            question: "Cross-Site Scripting (XSS) injects:",
            options: [
              "SQL code into databases",
              "Malicious scripts into web pages viewed by other users",
              "Viruses into executable files",
              "Packets into network streams",
            ],
            correct: 1,
          },
          {
            question: "A 'white hat' hacker is:",
            options: [
              "A hacker who works for criminal organizations",
              "A security professional who hacks with permission to find vulnerabilities",
              "A hacker who only attacks government systems",
              "An anonymous hacker",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "digital-forensics",
        name: "Digital Forensics",
        description: "Evidence collection, analysis, and incident response",
        questions: [
          {
            question: "The chain of custody in digital forensics ensures:",
            options: [
              "Data is encrypted",
              "Evidence integrity and proper handling documentation",
              "Deleted files are recovered",
              "Network logs are archived",
            ],
            correct: 1,
          },
          {
            question: "Disk imaging in forensics means:",
            options: [
              "Taking a screenshot of the screen",
              "Creating an exact bit-for-bit copy of a storage device",
              "Formatting the drive",
              "Encrypting the hard disk",
            ],
            correct: 1,
          },
          {
            question: "Volatile data in a computer system refers to:",
            options: [
              "Data stored on hard drives",
              "Encrypted files",
              "Data in RAM that is lost when power is removed",
              "Log files",
            ],
            correct: 2,
          },
          {
            question: "File carving is a technique used to:",
            options: [
              "Encrypt sensitive files",
              "Recover deleted files based on file signatures",
              "Compress files for storage",
              "Identify file owners",
            ],
            correct: 1,
          },
          {
            question: "Steganography is the practice of:",
            options: [
              "Encrypting data with a public key",
              "Hiding data within other data (e.g., images)",
              "Compressing files to reduce size",
              "Signing documents digitally",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "malware-analysis",
        name: "Malware Analysis",
        description: "Types of malware, analysis techniques, and defense",
        questions: [
          {
            question: "A Trojan horse malware disguises itself as:",
            options: [
              "An operating system update",
              "Legitimate software to trick users into installing it",
              "A network packet",
              "A hardware driver",
            ],
            correct: 1,
          },
          {
            question: "Ransomware encrypts victim files and:",
            options: [
              "Sends them to a remote server",
              "Deletes them permanently",
              "Demands payment for the decryption key",
              "Shares them publicly",
            ],
            correct: 2,
          },
          {
            question: "Static malware analysis involves:",
            options: [
              "Running the malware in a sandbox",
              "Examining the malware code without executing it",
              "Monitoring system calls at runtime",
              "Network traffic analysis",
            ],
            correct: 1,
          },
          {
            question: "A keylogger is designed to:",
            options: [
              "Lock the user's keyboard",
              "Record keystrokes to steal credentials",
              "Speed up keyboard input",
              "Map keyboard shortcuts",
            ],
            correct: 1,
          },
          {
            question: "A sandbox environment is used in malware analysis to:",
            options: [
              "Permanently remove malware",
              "Safely execute and observe malware behavior in isolation",
              "Encrypt the malware file",
              "Recover encrypted files",
            ],
            correct: 1,
          },
        ],
      },
    ],
  },
  {
    id: "bs-se",
    name: "BS Software Engineering",
    fullName: "Software Engineering",
    description: "Bachelor of Science in Software Engineering",
    color: "from-emerald-600 to-teal-700",
    textColor: "text-emerald-600",
    bgLight: "bg-emerald-50",
    subjects: [
      {
        id: "design-patterns",
        name: "Software Design Patterns",
        description: "Creational, structural, and behavioral patterns",
        questions: [
          {
            question: "The Singleton pattern ensures:",
            options: [
              "Multiple instances of a class exist",
              "Only one instance of a class exists throughout the application",
              "A class cannot be instantiated",
              "Objects are created by a factory",
            ],
            correct: 1,
          },
          {
            question: "The Observer pattern is used when:",
            options: [
              "A class should only be subclassed once",
              "Multiple objects need to be notified of state changes in another object",
              "An object needs to be copied",
              "A complex object needs to be simplified",
            ],
            correct: 1,
          },
          {
            question: "Which pattern separates object construction from representation?",
            options: ["Adapter", "Builder", "Proxy", "Flyweight"],
            correct: 1,
          },
          {
            question: "The MVC pattern stands for:",
            options: [
              "Module-View-Controller",
              "Model-View-Controller",
              "Model-Validate-Control",
              "Method-Variable-Class",
            ],
            correct: 1,
          },
          {
            question: "The Facade pattern provides:",
            options: [
              "An interface to extend class functionality",
              "A simplified interface to a complex subsystem",
              "A way to clone objects",
              "Dynamic algorithm selection",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "agile",
        name: "Agile Methodology",
        description: "Scrum, sprints, and iterative development",
        questions: [
          {
            question: "A Sprint in Scrum typically lasts:",
            options: ["1 day", "1–4 weeks", "6 months", "1 year"],
            correct: 1,
          },
          {
            question: "The Product Backlog in Scrum contains:",
            options: [
              "Completed features",
              "Bug reports only",
              "A prioritized list of features and requirements",
              "Daily stand-up notes",
            ],
            correct: 2,
          },
          {
            question: "A Daily Stand-up meeting in Scrum should last:",
            options: ["1 hour", "30 minutes", "15 minutes", "2 hours"],
            correct: 2,
          },
          {
            question: "The Agile Manifesto values individuals and interactions over:",
            options: ["Customer collaboration", "Processes and tools", "Working software", "Responding to change"],
            correct: 1,
          },
          {
            question: "Who prioritizes the Product Backlog in Scrum?",
            options: ["Scrum Master", "Development Team", "Product Owner", "Stakeholders"],
            correct: 2,
          },
        ],
      },
      {
        id: "software-testing",
        name: "Software Testing",
        description: "Unit testing, integration testing, and QA",
        questions: [
          {
            question: "Unit testing tests:",
            options: [
              "The entire application end-to-end",
              "Individual functions or components in isolation",
              "Integration between modules",
              "User interface interactions",
            ],
            correct: 1,
          },
          {
            question: "Black-box testing means the tester:",
            options: [
              "Knows the full source code",
              "Only knows the input/output specification, not internal code",
              "Tests only the database layer",
              "Has access to system logs",
            ],
            correct: 1,
          },
          {
            question: "Regression testing ensures:",
            options: [
              "New features work correctly",
              "Previously working features still work after changes",
              "The UI is responsive",
              "Performance benchmarks are met",
            ],
            correct: 1,
          },
          {
            question: "Test-Driven Development (TDD) means:",
            options: [
              "Testing is done after all code is written",
              "Tests are written before the production code",
              "Tests are written by a separate QA team",
              "Only manual testing is used",
            ],
            correct: 1,
          },
          {
            question: "The purpose of code coverage is to:",
            options: [
              "Measure application speed",
              "Measure how much of the code is executed by tests",
              "Count the number of bugs",
              "Track developer productivity",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "requirements-engineering",
        name: "Requirements Engineering",
        description: "Elicitation, analysis, and specification",
        questions: [
          {
            question: "Functional requirements describe:",
            options: [
              "System performance constraints",
              "What the system should do",
              "Security requirements",
              "Hardware specifications",
            ],
            correct: 1,
          },
          {
            question: "A Use Case diagram shows:",
            options: [
              "Database schema",
              "System architecture",
              "Interactions between users (actors) and the system",
              "Class relationships",
            ],
            correct: 2,
          },
          {
            question: "Non-functional requirements include:",
            options: [
              "User login feature",
              "Data export functionality",
              "System performance, scalability, and security",
              "Payment processing",
            ],
            correct: 2,
          },
          {
            question: "Requirements elicitation techniques include:",
            options: [
              "Code reviews and unit testing",
              "Interviews, surveys, and workshops with stakeholders",
              "Database normalization",
              "Sprint retrospectives",
            ],
            correct: 1,
          },
          {
            question: "An SRS document stands for:",
            options: [
              "Software Requirement Specification",
              "System Release Schedule",
              "Software Resource Summary",
              "Source Repository Structure",
            ],
            correct: 0,
          },
        ],
      },
      {
        id: "project-management",
        name: "Software Project Management",
        description: "Planning, estimation, risk, and team management",
        questions: [
          {
            question: "A Gantt chart is used to:",
            options: [
              "Track budget expenses",
              "Visualize project schedule and task timelines",
              "Measure code quality",
              "Document API endpoints",
            ],
            correct: 1,
          },
          {
            question: "Risk mitigation in project management means:",
            options: [
              "Ignoring low-probability risks",
              "Taking actions to reduce the probability or impact of risks",
              "Documenting risks after they occur",
              "Transferring all project tasks",
            ],
            correct: 1,
          },
          {
            question: "The critical path in project management is:",
            options: [
              "The most expensive task sequence",
              "The longest sequence of tasks that determines minimum project duration",
              "The tasks assigned to the team lead",
              "The first tasks to be completed",
            ],
            correct: 1,
          },
          {
            question: "Earned Value Management (EVM) is used to:",
            options: [
              "Pay developer salaries",
              "Measure project performance against scope, schedule, and cost",
              "Evaluate code quality metrics",
              "Manage version control",
            ],
            correct: 1,
          },
          {
            question: "A project milestone represents:",
            options: [
              "A task that takes more than a week",
              "A significant achievement or checkpoint in the project",
              "The total project budget",
              "A recurring team meeting",
            ],
            correct: 1,
          },
        ],
      },
    ],
  },
  {
    id: "bs-it",
    name: "BS IT",
    fullName: "Information Technology",
    description: "Bachelor of Science in Information Technology",
    color: "from-orange-600 to-amber-700",
    textColor: "text-orange-600",
    bgLight: "bg-orange-50",
    subjects: [
      {
        id: "web-technologies",
        name: "Web Technologies",
        description: "HTML, CSS, JavaScript, and web frameworks",
        questions: [
          {
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High-Level Text Management Language",
              "Hyper Transfer Markup Logic",
              "Hyperlink Text Modeling Language",
            ],
            correct: 0,
          },
          {
            question: "CSS is used to:",
            options: [
              "Add interactivity to web pages",
              "Define the structure of HTML",
              "Style and visually format HTML elements",
              "Connect to databases",
            ],
            correct: 2,
          },
          {
            question: "Which HTTP method is used to submit form data?",
            options: ["GET", "DELETE", "POST", "PUT"],
            correct: 2,
          },
          {
            question: "REST APIs communicate using:",
            options: ["Binary protocols", "HTTP methods and JSON/XML data", "Proprietary sockets", "SOAP only"],
            correct: 1,
          },
          {
            question: "Responsive web design ensures:",
            options: [
              "Websites load faster",
              "Websites look good across different screen sizes",
              "Websites are secured with HTTPS",
              "Websites can be translated automatically",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "cloud-computing",
        name: "Cloud Computing",
        description: "AWS, Azure, deployment models, and services",
        questions: [
          {
            question: "IaaS in cloud computing stands for:",
            options: [
              "Internet as a Service",
              "Infrastructure as a Service",
              "Integration as a Service",
              "Information as a System",
            ],
            correct: 1,
          },
          {
            question: "Which cloud model is dedicated to a single organization?",
            options: ["Public cloud", "Community cloud", "Hybrid cloud", "Private cloud"],
            correct: 3,
          },
          {
            question: "Scalability in cloud computing refers to:",
            options: [
              "Reducing costs permanently",
              "Ability to increase or decrease resources on demand",
              "Backing up data to multiple locations",
              "Encrypting all stored data",
            ],
            correct: 1,
          },
          {
            question: "Serverless computing means the developer:",
            options: [
              "Manages physical servers themselves",
              "Does not use any servers",
              "Writes code without managing server infrastructure",
              "Uses only local computers",
            ],
            correct: 2,
          },
          {
            question: "SLA in cloud services stands for:",
            options: [
              "System Load Average",
              "Software Licensing Agreement",
              "Service Level Agreement",
              "Scalable Layer Architecture",
            ],
            correct: 2,
          },
        ],
      },
      {
        id: "it-infrastructure",
        name: "IT Infrastructure",
        description: "Servers, storage, virtualization, and hardware",
        questions: [
          {
            question: "Virtualization allows:",
            options: [
              "Multiple operating systems to run on one physical machine",
              "Faster internet connections",
              "Wireless charging of devices",
              "Automatic software updates",
            ],
            correct: 0,
          },
          {
            question: "RAID stands for:",
            options: [
              "Redundant Array of Independent Disks",
              "Remote Access Internet Device",
              "Random Array of Integrated Data",
              "Rapid Access Information Drive",
            ],
            correct: 0,
          },
          {
            question: "A DNS server translates:",
            options: [
              "IP addresses to MAC addresses",
              "Domain names to IP addresses",
              "HTTP to HTTPS",
              "Data packets to text",
            ],
            correct: 1,
          },
          {
            question: "Load balancing distributes:",
            options: [
              "Storage across multiple drives",
              "Network traffic across multiple servers to prevent overload",
              "Software licenses among users",
              "Backup tasks across time zones",
            ],
            correct: 1,
          },
          {
            question: "UPS in IT infrastructure stands for:",
            options: [
              "Universal Port Switch",
              "Unified Processing System",
              "Uninterruptible Power Supply",
              "Unified Proxy Server",
            ],
            correct: 2,
          },
        ],
      },
      {
        id: "information-systems",
        name: "Information Systems",
        description: "ERP, MIS, decision support, and data management",
        questions: [
          {
            question: "MIS stands for:",
            options: [
              "Managed Internet Service",
              "Management Information System",
              "Manual Input System",
              "Modular Integration Software",
            ],
            correct: 1,
          },
          {
            question: "ERP systems are used to:",
            options: [
              "Manage only financial transactions",
              "Integrate and manage core business processes across departments",
              "Handle only customer support tickets",
              "Design user interfaces",
            ],
            correct: 1,
          },
          {
            question: "A Decision Support System (DSS) helps managers:",
            options: [
              "Automate routine data entry tasks",
              "Make informed decisions by analyzing data",
              "Train new employees",
              "Send automated emails",
            ],
            correct: 1,
          },
          {
            question: "Data warehousing is used for:",
            options: [
              "Storing data in physical warehouses",
              "Real-time transaction processing",
              "Centralized storage for reporting and analytics",
              "Encrypting production databases",
            ],
            correct: 2,
          },
          {
            question: "Business Intelligence (BI) tools primarily help with:",
            options: [
              "Writing software code",
              "Analyzing data to support business decisions",
              "Network monitoring",
              "User authentication",
            ],
            correct: 1,
          },
        ],
      },
      {
        id: "technical-support",
        name: "Technical Support",
        description: "Help desk, troubleshooting, and IT service management",
        questions: [
          {
            question: "ITIL stands for:",
            options: [
              "Information Technology Infrastructure Library",
              "Integrated Technical Implementation Layer",
              "Internet Tools and Interface Language",
              "IT Incident Logging",
            ],
            correct: 0,
          },
          {
            question: "An IT help desk ticket typically includes:",
            options: [
              "The user's password",
              "Problem description, priority, and affected user details",
              "The server's IP address only",
              "Application source code",
            ],
            correct: 1,
          },
          {
            question: "SLA response time refers to:",
            options: [
              "How long it takes to install software",
              "The guaranteed time to acknowledge or resolve a support ticket",
              "Network latency measurement",
              "How long a server has been running",
            ],
            correct: 1,
          },
          {
            question: "Remote desktop tools allow technicians to:",
            options: [
              "Physically repair a computer",
              "Access and control a user's computer over the network",
              "Back up user data to cloud storage",
              "Monitor network bandwidth",
            ],
            correct: 1,
          },
          {
            question: "The first step in troubleshooting is typically:",
            options: [
              "Replace all hardware",
              "Reinstall the operating system",
              "Identify and define the problem clearly",
              "Check the server logs",
            ],
            correct: 2,
          },
        ],
      },
    ],
  },
];

export function getCourseById(id) {
  return courses.find((c) => c.id === id) || null;
}

export function getSubjectById(courseId, subjectId) {
  const course = getCourseById(courseId);
  if (!course) return null;
  return course.subjects.find((s) => s.id === subjectId) || null;
}
