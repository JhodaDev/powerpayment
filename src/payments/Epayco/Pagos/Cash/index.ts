enum PaymentMethod {
  EF = 'Efecty',
  GA = 'Gana',
  PR = 'Punto Red',
  RS = 'Red Servi',
  SR = 'Sured'
}

interface CashInterface {
  value: number
  paymentMethod: keyof typeof PaymentMethod
  ip: string
  cellPhone: string
  email: string
  lastName: string
  name: string
  docNumber: string
  docType: string
  invoice?: string
  description?: string
  tax?: number
  baseTax?: number
  currency?: string
  typePerson?: number
  endDate?: string
  urlResponse?: string
  urlConfirmation?: string
  methodConfirmation?: string
  extra?: string
  testMode?: boolean 
}

class Cash {

  private token: Promise<string>
  private baseURL: string

  constructor (token: Promise<string>) {
    this.token = token
    this.baseURL = process.env.URL_APIFY || ''
  }

  async createTransaction (data: CashInterface) {
    const token = await this.token
    const response = await fetch(`${process.env.URL_APIFY}/payment/process/cash`, {
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

  async getPaymentMethods(){
    const token = await this.token

    const data = await fetch(`${this.baseURL}/payment/cash/entities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const dataResponse = await data.json()
    return dataResponse
  }
}

export default Cash