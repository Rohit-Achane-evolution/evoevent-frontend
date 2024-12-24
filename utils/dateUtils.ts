export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}


// export let AUTHTOKEN: string;

// export function token() {
//     const AUTHTOKEN = localStorage.getItem('authToken');
//     return AUTHTOKEN;

// }


