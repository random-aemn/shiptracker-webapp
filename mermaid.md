```mermaid
    graph TD;
        A[Start] --> B{Is it true?};
        B -- Yes --> C[Do something];
        B -- No --> D[Do something else];
        C --> E[End];
        D --> E;
```
