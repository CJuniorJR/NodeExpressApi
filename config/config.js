const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
            return{
                bd_string: 'mongodb://localhost:27017/nodeApi1',   
                jwt_pass: 'seila',
                jwt_expires_in: '30m'
            }
        case 'hml':
            return{
                bd_string: 'mongodb://localhost:27017/nodeApi1'
            }
        case 'prod':
            return{
                bd_string: 'mongodb://localhost:27017/nodeApi1'
            }
    }
}

export default config;