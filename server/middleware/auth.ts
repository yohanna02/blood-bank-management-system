import UrlPattern from "url-pattern";
import jwt from "jsonwebtoken";

import prisma from "../db";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const endpoints = [
        "/api/bloodGroup",
        "/api/bloodGroup/:id",
        "/api/donor"
    ];

    const isHandledMyThisMiddleware = endpoints.some(endpoint => {
        const pattern = new UrlPattern(endpoint);

        if (event.req.url)
            return pattern.match(event.req.url);

        return false;
    });

    if (isHandledMyThisMiddleware) {
        const token = event.req.headers.authorization?.split(" ")[1];

        if (token) {
            try {
                const decodedToken: any = jwt.verify(token, config.jwtScecret);

                if (decodedToken) {
                    const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });
                    event.context.user = user;
                }
            } catch (err) {
                event.context.user = null;
            }
        }
    }
});