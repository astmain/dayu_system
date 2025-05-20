import {Observable, interval, take} from "rxjs";
import {map, filter, reduce, find, findIndex} from 'rxjs/operators'


const subs = interval(500).pipe(map(v => ({num: v})), filter(v => (v.num % 2 == 0))).subscribe((e) => {
    console.log(e)
    if (e.num == 10) {
        subs.unsubscribe()
    }
})