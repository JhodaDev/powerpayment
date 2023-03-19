import * as dotenv from 'dotenv'
dotenv.config()
import Epayco from './payments/Epayco/index'

interface Config {
  provider: string
  publicKey: string
  privateKey: string
  urlResponse?: string
}


class PaymentIntegration {
  
  private provider: string
  private publicKey: string
  private privateKey: string

  constructor (config: Config) {
    const { provider, publicKey, privateKey } = config
    this.provider = provider
    this.publicKey = publicKey
    this.privateKey = privateKey
  }

  getProviderIntegration () {
    switch (this.provider) {
      case 'epayco':
        return new Epayco(this.publicKey, this.privateKey)
    }
  }
}
