const axios = require('axios');
const boom = require('@hapi/boom');

class DepositService {

  async makeDeposit(data){
    try {
      const response = await axios.post('https://192.168.0.72:31198/v1/deposit', {
        ...data
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'secretKey': 'test'
        }
      })

      return response.data

    } catch (error) {
      throw boom.internal();
    }
  }
}

module.exports = { DepositService }
