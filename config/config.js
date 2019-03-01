let env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
    let config = require('./config.json');
    //console.log(config);
    let envConfig = config[env];
    //console.log(envConfig);

    Object.keys(envConfig).forEach((doc)=>{
       // console.log(doc)
        process.env[doc] = envConfig[doc];
        //console.log(process.env[doc]);
    });    
}

module.exports = {

}