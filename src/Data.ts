import axios from 'axios';

const BASEURL: string = 'http://jservice.io/api/';

export interface Category {
    id: number,
    title: string,
    clues_count: number
}

export interface Question {
    id: number,
    answer: string,
    question: string,
    value: number,
    category: Category
}

export function getData() {
    let promises: Promise<any>[] = [];
    for(let i = 0; i < 6; i++) {
        let promise = new Promise((resolve, reject) => {
            // FIXME: confirm the actual range is within boundaries
            axios.get(BASEURL + 'random') 
                .then(response => resolve(response.data[0]))
                .catch((err) => reject(err));
        })
        promises.push(promise);
    }
    return Promise.all(promises);
}