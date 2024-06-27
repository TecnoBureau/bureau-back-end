import env from 'env-var';

const config = {
    port: env.get('PORT').required().asPortNumber()
};

export default config;