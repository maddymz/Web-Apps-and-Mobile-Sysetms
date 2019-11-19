API Documentation:

1. eruo/pound
    Method: POST
    URL: "http://localhost:8008/euro"
    request headers: 'Content-Type', 'application/json; charset=UTF-8'
    request payload:
    {
        "usd": value
    }
    response:
    {
        "euro":0.9,
        "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36","ip":"::1",
        "activity":["Operand 1 was converted from USD 0.9 EURO IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36","Operand 1 was converted from USD 0.9 EURO IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"]
    }
2. pound
    Method: POST
    URL: "http://localhost:8008/pound"
    request headers: 'Content-Type', 'application/json; charset=UTF-8'
    request payload:
    {
        "usd":value
    }
    response:
    {
        "pound":0.78,
        "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36","ip":"::1",
        "activity":["Operand 1 was converted from USD 0.78 POUND IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"]
    }

2. pop
    Method: GET
    URL: "http://localhost:8008/pop"
    request headers: 'Content-Type', 'application/json; charset=UTF-8'
    request payload: null
    response:
    {
        {"history":["Operand 1 was converted from USD 0.78 POUND IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"],
        "activity":[]}
    }

3. reset
    Method: GET
    URL: "http://localhost:8008/reset"
    request headers: 'Content-Type', 'application/json; charset=UTF-8'
    request payload: null
    response:
    {
       "history":[],
       "activity":[]
    }

4. history
    Method: GET
    URL: "http://localhost:8008/history"
    request headers: 'Content-Type', 'application/json; charset=UTF-8'
    request payload: null
    response:
    {
        "history":["Operand 1 was converted from USD 0.78 POUND IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36","Operand 1 was converted from USD 0.78 POUND IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"],
        "activity":["Operand 1 was converted from USD 0.78 POUND IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36","Operand 1 was converted from USD 0.78 POUND IP ::1 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"]
    }
