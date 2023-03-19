interface SubscripcionesInterface {
    cardNumber: string
    cardExpMonth: string
    cardExpYear: string
    cardCvc: string
}

interface CustomerInterface {
    docType: string
    docNumber: string
    name: string
    lastName: string
    email: string
    cellPhone: string
    phone: string
    requireCardToken?: boolean
    cardTokenId?: string
}

class Subscripciones {
    private token: Promise<string>
    constructor(token: Promise<string>){
        this.token = token
    }

    async createTokenCard(data: SubscripcionesInterface) {
        const token = await this.token
        const response = await fetch(`${process.env.URL_APIFY}/token/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })  
        const dataResponse = await response.json()
        return dataResponse
    }

    async createCustomer(data: CustomerInterface){
        const token = await this.token
        const response = await fetch(`${process.env.URL_APIFY}/token/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        const dataResponse = await response.json()
        console.log(dataResponse)
        return dataResponse
    }

    async editCustomer(data: {name: string, customerId: string}){
        console.log('Ejecutando')
        const token = await this.token
        const response = await fetch(`${process.env.URL_APIFY}/subscriptions/customer/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const dataResponse = await response.json()
        console.log(dataResponse.data)
        return dataResponse
    }

    async getCustomer(customerId: string){
        const token = await this.token
        const response = await fetch(`${process.env.URL_APIFY}/subscriptions/customer/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({customerId})
        })
        const dataResponse = await response.json()
        return dataResponse
    }
}

export default Subscripciones