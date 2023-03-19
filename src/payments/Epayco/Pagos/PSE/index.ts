
interface DataTransaction {
  bank: string
  value: string
  docType: string
  docNumber: string
  name: string
  email: string
  cellphone: string
  ip: string
  urlResponse: string
  phone?: string
  lastName?: string
  tax?: string
  taxBase?: string
  description?: string
  invoice?: string
  currency?: string
  typePerson?: string
  address?: string
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

class PSE {

  private token: Promise<string>
  private baseURL: string

  constructor (token: Promise<string>) {
    this.token = token
    this.baseURL = process.env.URL_APIFY || ''
  }

  async createTransaction (data: DataTransaction) {
    const token = await this.token

    const response = await fetch(`${this.baseURL}/payment/process/pse`, {
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

  async getBanks () {
    const token = await this.token

    const response = await fetch(`${this.baseURL}/payment/pse/banks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const { data } = await response.json()
    return data
  }
}

export default PSE
