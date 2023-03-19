interface DataTransaction {
  value: string
  docType: string
  docNumber: string
  name: string
  lastName: string
  email: string
  cellphone: string
  phone: string
  cardNumber: string
  cardExpMonth: string
  cardExpYear: string
  cardCvc: string
  dues: string,
  cardTokenId?: string
  currency?: string
  ip?: string
  urlResponse?: string
  urlConfirmation?: string
  methodConfirmation?: string
  testMode?: boolean
  extra1?: string
  extra2?: string
  extra3?: string
  extra4?: string
  extra5?: string
  extra6?: string
  extra7?: string
  extra8?: string
  extra9?: string
  extra10?: string
}


class CreditCart {

  private token: Promise<string>
  private baseURL: string

  constructor (token: Promise<string>) {
    this.token = token
    this.baseURL = process.env.URL_APIFY || ''
  }

  async createTransaction (data: DataTransaction) {
    const token = await this.token

    const response = await fetch(`${this.baseURL}/payment/process`, {
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
}

export default CreditCart
