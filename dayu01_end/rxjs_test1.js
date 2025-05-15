import {Observable} from "rxjs";

//类似于迭代器 next 发出通知  complete通知完成
const observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)

    setTimeout(() => {
        subscriber.next(4)
        subscriber.complete()
    }, 1000)
})

observable.subscribe({
    next: (value) => {
        console.log(value)
    }
})