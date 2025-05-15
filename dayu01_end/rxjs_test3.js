import { Observable, interval, take,of,retry,fromEvent } from "rxjs";
import { map, filter,reduce,find,findIndex } from 'rxjs/operators'

const dom = fromEvent(document,'click').pipe(map(e=>e.target))
dom.subscribe((e)=>{

})