import Cash from "./Pagos/Cash"
import CreditCart from "./Pagos/CreditCart/index"
import Daviplata from "./Pagos/Daviplata"
import PSE from "./Pagos/PSE/index"
import Subscripciones from "./Pagos/Subscripciones"

class Epayco {

  private publickKey: string
  private privateKey: string
  private token: string
  private jwt: Promise<string>

  constructor (publickKey: string, privateKey: string) {
    this.publickKey = publickKey
    this.privateKey = privateKey
    this.token = this.base64()
    this.jwt = this.login().then((jwt) => {
      return jwt
    })
  }

  private base64 () {
    return Buffer.from(`${this.publickKey}:${this.privateKey}`).toString('base64')
  }

  private async login (): Promise<string> {
    const res = await fetch(`${process.env.URL_APIFY}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.token}`
      }
    })

    const data = await res.json()
    return data.token
  }

  pse () {
    return new PSE(this.jwt)
  }

  creditCart () {
    return new CreditCart(this.jwt)
  }

  cash(){
    return new Cash(this.jwt)
  }

  daviplata(){
    return new Daviplata(this.jwt)
  }

  subscriptions() {
    return new Subscripciones(this.jwt)
  }
}

export default Epayco
