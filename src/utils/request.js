const {mergeDeep} = require('./index')
const axios       = require('axios')
const querystring = require('querystring')

export default async function (data, callback){
    let defaultConfig = {
        }

    defaultConfig = mergeDeep(defaultConfig, data)

    if(!data.method){
        defaultConfig.method = 'get'
        if(data.data){
            defaultConfig.method = 'post'
        }
    }

    if(data.data){
        defaultConfig.data   = querystring.stringify(data.data)
    }
    // console.log('request', defaultConfig, data)
    if(callback){
        axios(defaultConfig)
        .then(function(response){
            callback(response)
        })
        .catch(function (error) {
            if (error.response) {
                console.log('abc')
            }
        });
    }else{
        return await axios(defaultConfig)
    }
}