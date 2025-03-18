# Programming Notes for Angular Observables

## Subscribe and Process Observable
---
```this.payload``` is declared as class level variable of type ``` <any> ``` 

```this.payloadArray``` is a class level variable containing all of the returned ```this.payload``` **observables**

`message` is the observable that is returned

> Everything after/within the arrow function 
> 
> ```
> => {
> doSomething();
> doSomethingAgain();
> }
> ```
> 
> is executed **after** the observable is returned.

Subscriptions and Observables are **always** executed asynchronously

```
this.messageSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        console.log(message.MMSI);
       this.payload = message;
       this.payloadArray.push(message);
      }
    );
```
