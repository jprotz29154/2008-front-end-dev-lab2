import {ref, set, get, push, child, remove, update} from 'firebase/database'
import {db} from '../lib/firebase/config/firebaseInit'

let observers = []

export function subscribe(fn) {
    observers.push(fn)
    console.log(observers)
}

//data that will be used to render the data for display
export function notify(data) {
    observers.forEach((observer) => observer(data))
}



export async function getToDoData() {
    const dbRef = ref(db, 'todos')
    const response = await get(dbRef)
    let payload = await response.val()
    payload = Object.entries(payload)
    let toDoItems = payload.map((item) => {
        return {...item[1], uid: item[0]}
    })

    notify(toDoItems)
}


