import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';
import dotenv from 'dotenv';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { registerErrorHandlers } from './errors_handlers'; // <-- import

dotenv.config();

const app = Fastify({ logger: true });

// CORS
app.register(cors, { origin: '*' });

// Swagger
app.register(swagger, {
    swagger: {
        info: {
            title: 'BolaQuiz API',
            description: 'API de Quiz de Futebol',
            version: '1.0.0'
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
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
app.register(authRoutes);
app.register(userRoutes);

registerErrorHandlers(app);

export default app;
