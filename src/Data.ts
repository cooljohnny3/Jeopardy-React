import axios from 'axios';

const BASEURL: string = 'https://jservice.io/api/';
const MAX_CATEGORY_ID = 18418;

export interface Category {
    id: number,
    title: string,
    clues: Question[]
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
            axios.get(BASEURL + 'category', { params: { id: Math.floor(Math.random() * Math.floor(MAX_CATEGORY_ID)) + 1 }}) 
                .then(response => resolve(response.data))
                .catch((err) => reject(err));
        })
        promises.push(promise);
    }
    return Promise.all(promises);
}