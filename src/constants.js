const prod = {
    url: {
        API_URL: 'https://pmaiotamuattendance.neat-url.com:5000'
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:5001'
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
