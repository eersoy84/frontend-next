export let API_BASE = "";
if (process.env.NODE_ENV === 'production') {
    // API_BASE = `${api.bizleal.net}/api`
    API_BASE = "https://api.bizleal.net/api"
    console.log("API_BASE2=>", process.env.REACT_APP_PROD_API)
} else {
    API_BASE = `${process.env.NEXT_PUBLIC_DEV_URL}/api`
}
// export const API_BASE='https://api.bizleal.net/api'
// export const API_BASE='http://localhost:5000/api'