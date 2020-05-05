export default{
    jwtSecret: process.env.JWT_SECRET || 'SomeSecretToken',
    DB: {
        URI: process.env.URI || 'mongodb://localhost/ietzz',
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD
    }
}