import { logtoClient } from '@/lib/logto';

export default logtoClient.withLogtoApiRoute((request, response) => {
  if (!request.user.isAuthenticated) {
    response.status(401).json({ message: 'Unauthorized' });
    return;
  }

  response.json({
    data: request.user.claims,
  });
});
