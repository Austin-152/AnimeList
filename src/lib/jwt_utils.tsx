import jwt from 'jsonwebtoken';

// 使用环境变量中的密钥，实际应用中密钥应当安全存储
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'your-secret-key';  // 从环境变量获取 secretKey，作为签名密钥

// 生成 JWT 令牌
export function generateToken(payload: object, expiresIn: string | number = '1h'): string {
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn }); // 生成 JWT，默认1小时有效
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
}


// 验证 JWT 令牌
export function verifyToken(token: string): object | null {
    try {
        const decoded = jwt.verify(token, secretKey);  // 验证并解码 JWT
        return decoded as object; // 返回解码后的 payload 对象
    } catch (error) {
        console.error('Invalid or expired token:', error);
        return null;
    }
}

// 示例如何使用生成和验证函数
const payloadExample = { userId: 123, role: 'admin' };
const tokenExample = generateToken(payloadExample); // 生成一个示例的 JWT

console.log('Generated Token:', tokenExample); // 输出生成的令牌

const verifiedPayload = verifyToken(tokenExample); // 验证并解码令牌
if (verifiedPayload) {
    console.log('Verified Payload:', verifiedPayload); // 输出解码的 payload
} else {
    console.log('Token verification failed');
}