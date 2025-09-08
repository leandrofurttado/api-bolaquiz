import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/user.routes';
import dotenv from 'dotenv';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

dotenv.config();

const app = Fastify({ logger: true });

// CORS
app.register(cors, { origin: '*' });

// Swagger
app.register(swagger, {
    openapi: {
        info: {
            title: 'BolaQuiz API',
            description: 'API de Quiz de Futebol',
            version: '1.0.0'
        }
    }
});

app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    }
});

// Routes
app.register(userRoutes);


export default app;
