import NetlifyAPI from 'netlify'
import Configstore from 'configstore'
import os from 'os'
import path from 'path'
import uuidv4 from 'uuid/v4'
import merge  from 'lodash.merge'

const CLIENT_ID = 'e93ac36d3d1e176aba82c32a0859ac82b3b56f55af45194cdeab3e9770f7a1c3'
const API_URL = new URL('https://app.netlify.com/authorize');

class AuthHelper {

  constructor() {
    this.ticket = null

    const globalConfigDefaults = {
      /* disable stats from being sent to Netlify */
      telemetryDisabled: false,
      /* cliId */
      cliId: uuidv4()
    }

    const globalConfigOptions = {
      configPath: path.join(os.homedir(), '.netlify', 'config.json')
    }

    this.configStore = new Configstore(null, globalConfigDefaults, globalConfigOptions)
    this.api = new NetlifyAPI(this.configAccessToken)
  }

  async login () {
    if(this.configAccessToken) {
      this.api = new NetlifyAPI(this.configAccessToken)
      return this.configAccessToken
    }

    this.ticket = await this.api.createTicket({
      clientId: CLIENT_ID
    })
    // Open browser for authentication
    const shell = require('electron').shell;
    shell.openExternal(this.ticketURL)
    const accessToken = await this.api.getAccessToken(this.ticket)

    if(!accessToken) {
      throw new Error('Could not retrieve access token')
    }

    const user = await this.api.getCurrentUser()
    const userID = user.id
    const userData = merge(this.configStore.get(`users.${userID}`), {
      id: userID,
      name: user.full_name,
      email: user.email,
      avatar_url: user.avatar_url,
      auth: {
        token: accessToken,
        github: {
          user: undefined,
          token: undefined
        }
      }
    })

    // Set current userId
    this.configStore.set('userId', userID)
    // Set user data
    this.configStore.set(`users.${userID}`, userData)

    this.api = new NetlifyAPI(accessToken)

    // API is also set up to use the returned access token as a side effect
    return accessToken // Save this for later so you can quickly set up an authenticated client
  }

  get isLoggedIn() {
    return !!this.configAccessToken
  }

  get userId() {
    return this.configStore.get('userId')
  }

  get userAvatar() {
    return this.configStore.get(`users.${this.userId}.avatar_url`)
  }

  get configAccessToken() {
    return this.configStore.get(`users.${this.userId}.auth.token`)
  }

  get ticketURL() {
    API_URL.search = ""
    API_URL.searchParams.append("response_type", "ticket")
    API_URL.searchParams.append("ticket", this.ticket.id)
    return API_URL.href
  }
}

// use singleton so we have the same instance everywhere
export default new AuthHelper()
