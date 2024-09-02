import { logtoClient } from '@/lib/logto';
import { getPublicKey } from '@/app/api/api';
import crypto from 'crypto';

export default logtoClient.withLogtoApiRoute(async (request, response) => {
    // 检查用户是否经过身份验证
    if (!request.user || !request.user.isAuthenticated) {
        // 如果未验证身份，返回401状态码和JSON消息
        response.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        // 获取公钥
        const publicKey = await getPublicKey();

        // 使用公钥加密用户信息
        const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(JSON.stringify(request.user.claims)));

        // 返回加密后的数据
        response.status(200).json({
            success: true,
            data: encryptedData.toString('base64'),
        });
    } catch (error) {
        response.status(500).json({ message: 'Error encrypting data', error: (error as Error).message });
    }
});