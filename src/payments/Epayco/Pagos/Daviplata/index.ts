class Daviplata {
    private token: Promise<string>
    constructor(token: Promise<string>){
        this.token = token
    }

    async createTransaction(data: any) {
        const token = await this.token
        const response = await fetch(`${process.env.URL_APIFY}/payment/process/daviplata`, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        const dataResponse = await response.json()
        console.log(dataResponse.data)
    }
}

export default Daviplata